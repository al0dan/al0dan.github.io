/**
 * 3M Automotive Services - Premium Linktree Landing Page Logic
 * Handles interactive features: Loader, Ripple, Long-press to Copy, Toast, and Animations.
 */

function init() {
    initEntranceAnimations();
    initWhatsAppButtons();
    triggerEntranceAnimations();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

/**
 * Triggers staggered entry animations for content
 */
function initEntranceAnimations() {
    // Make sure elements start hidden (done in CSS under .fade-in-element)
    const elements = document.querySelectorAll('.fade-in-element');
    elements.forEach(el => el.classList.remove('active'));
}

function triggerEntranceAnimations() {
    const elements = document.querySelectorAll('.fade-in-element');
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('active');
        }, index * 150); // Stagger interval (150ms)
    });
}

/**
 * Manages click ripple, long-press detection, copy, and navigation on WhatsApp buttons
 */
function initWhatsAppButtons() {
    const buttons = document.querySelectorAll('.whatsapp-btn');
    
    buttons.forEach(btn => {
        let pressTimer = null;
        let isLongPress = false;
        const phone = btn.getAttribute('data-phone');

        // --- RIPPLE EFFECT ON CLICK ---
        btn.addEventListener('click', (e) => {
            createRipple(e, btn);
            
            // If it was triggered as a long press, block the default redirect
            if (isLongPress) {
                isLongPress = false; // Reset state
                return;
            }

            // Normal click navigation
            const whatsappUrl = `https://api.whatsapp.com/send/?phone=${phone}`;
            // Small timeout to let ripple play slightly before redirect
            setTimeout(() => {
                window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
            }, 150);
        });

        // --- LONG-PRESS TO COPY PHONE NUMBER (1 second) ---
        
        // Start holding
        const startPress = (e) => {
            // Prevent context menus on mobile devices from blocking our press
            if (e.type === 'touchstart') {
                // We don't preventDefault here to allow normal scroll behavior,
                // but we flag that we are listening.
            }
            
            isLongPress = false;
            btn.classList.add('holding');
            
            // Set timer for 1 second (1000ms)
            pressTimer = setTimeout(() => {
                isLongPress = true;
                copyToClipboard(phone);
                showToast();
                cancelPress(); // Clean up visual state
                
                // Haptic feedback (Vibrate) for mobile devices
                if ('vibrate' in navigator) {
                    navigator.vibrate(50); 
                }
            }, 1000);
        };

        // Cancel holding
        const cancelPress = () => {
            btn.classList.remove('holding');
            if (pressTimer) {
                clearTimeout(pressTimer);
                pressTimer = null;
            }
        };

        // Bind events for both Desktop and Mobile
        btn.addEventListener('mousedown', startPress);
        btn.addEventListener('mouseup', (e) => {
            // Only cancel if timer was running
            if (!isLongPress) {
                cancelPress();
            }
        });
        
        btn.addEventListener('mouseleave', cancelPress);
        
        // Touch events for mobile devices
        btn.addEventListener('touchstart', startPress, { passive: true });
        btn.addEventListener('touchend', (e) => {
            if (isLongPress) {
                // Prevent trigger click mapping on touch end for long presses
                e.preventDefault(); 
            }
            cancelPress();
        });
        btn.addEventListener('touchcancel', cancelPress);
        btn.addEventListener('touchmove', cancelPress);
    });
}

/**
 * Creates a circular wave expanding from mouse/touch point
 */
function createRipple(event, button) {
    const rippleContainer = button.querySelector('.btn-ripple-container');
    if (!rippleContainer) return;

    const circle = document.createElement('span');
    circle.classList.add('ripple-circle');

    const rect = button.getBoundingClientRect();
    
    // Get click coords relative to button (support touch events or standard mouse click)
    let clientX, clientY;
    if (event.touches && event.touches.length > 0) {
        clientX = event.touches[0].clientX;
        clientY = event.touches[0].clientY;
    } else {
        clientX = event.clientX;
        clientY = event.clientY;
    }
    
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // Size of the ripple should cover the button diagonally
    const size = Math.max(rect.width, rect.height) * 2;

    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.left = `${x - size / 2}px`;
    circle.style.top = `${y - size / 2}px`;

    // Remove previous ripples to keep DOM clean
    const oldRipple = rippleContainer.querySelector('.ripple-circle');
    if (oldRipple) oldRipple.remove();

    rippleContainer.appendChild(circle);

    // Clean up animation elements
    circle.addEventListener('animationend', () => {
        circle.remove();
    });
}

/**
 * Copies numeric string to clipboard
 */
function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).catch(err => {
            fallbackCopyToClipboard(text);
        });
    } else {
        fallbackCopyToClipboard(text);
    }
}

/**
 * Fallback clipboard copy for older browsers or non-secure contexts
 */
function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    // Hide text area off screen
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        document.execCommand('copy');
    } catch (err) {
        console.error('Fallback copy failed', err);
    }
    document.body.removeChild(textArea);
}

/**
 * Displays toast notification and auto-hides after delay
 */
let toastTimeout = null;
function showToast() {
    const toast = document.getElementById('toast');
    if (!toast) return;

    // Reset timer and animations if already visible
    toast.classList.remove('show');
    clearTimeout(toastTimeout);
    
    // Trigger redraw
    void toast.offsetWidth;

    // Show toast
    toast.classList.add('show');

    // Auto hide after 3 seconds
    toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}
