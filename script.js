// Preloader logic
window.addEventListener('load', () => {
   const preloader = document.getElementById('preloader');
   if (preloader) {
      setTimeout(() => {
         preloader.classList.add('fade-out');
         setTimeout(() => {
            preloader.style.display = 'none';
         }, 300); // 300ms for the CSS fade-out transition to complete
      }, 400); // Wait 0.4 seconds before starting the fade-out
   }
});

document.addEventListener('DOMContentLoaded', () => {
   // 1. Mobile Menu Toggle
   const hamburger = document.querySelector('.hamburger');
   const navLinks = document.querySelector('.nav-links');
   const links = document.querySelectorAll('.nav-links li a');

   if (hamburger) {
      hamburger.addEventListener('click', () => {
         hamburger.classList.toggle('active');
         navLinks.classList.toggle('active');
      });
   }

   // Close mobile menu when a link is clicked
   links.forEach(link => {
      link.addEventListener('click', () => {
         if (hamburger) hamburger.classList.remove('active');
         if (navLinks) navLinks.classList.remove('active');
      });
   });

   // 2. Sticky Navbar Update
   const navbar = document.getElementById('navbar');

   window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
         navbar.classList.add('scrolled');
      } else {
         navbar.classList.remove('scrolled');
      }
   });

   // 3. Scroll Reveal Animations (Intersection Observer)
   const revealElements = document.querySelectorAll('.reveal');

   const revealOptions = {
      root: null,
      rootMargin: '0px 0px -100px 0px', /* Trigger offset */
      threshold: 0.15 /* Percentage of item visible */
   };

   const revealCallback = (entries, observer) => {
      entries.forEach(entry => {
         if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Optional: Stop observing once revealed to keep it visible
            observer.unobserve(entry.target);
         }
      });
   };

   const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

   revealElements.forEach(el => {
      revealObserver.observe(el);
   });

   // 4. Active Section Highlighting
   const sections = document.querySelectorAll('section, header');

   window.addEventListener('scroll', () => {
      let current = '';

      sections.forEach(section => {
         const sectionTop = section.offsetTop;
         // Add a small offset to trigger active state slightly earlier
         if (pageYOffset >= (sectionTop - window.innerHeight / 3)) {
            current = section.getAttribute('id');
         }
      });

      links.forEach(link => {
         link.classList.remove('active');
         if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
         }
      });
   });

   // 5. Write-ups Filter
   const filterBtns = document.querySelectorAll('.filter-btn');
   const writeupCards = document.querySelectorAll('.writeup-card');

   filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
         filterBtns.forEach(b => b.classList.remove('active'));
         btn.classList.add('active');
         const filter = btn.getAttribute('data-filter');
         writeupCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
               card.classList.remove('hidden');
            } else {
               card.classList.add('hidden');
            }
         });
      });
   });

   // 6. Update Footer Year dynamically
   const yearSpan = document.getElementById('year');
   if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
   }
});

// ==========================================================================
// Blog Post Data (bilingual — drives the writeups grid)
// ==========================================================================
const blogPosts = [
   {
      href: 'writeup-2.html',
      image: 'imgs/blog2.png',
      date: '2026-03-14',
      category: { ar: 'تقرير تقني', en: 'Write-up', zh: 'Write-up' },
      title: {
         ar: 'كيف خليت الذكاء الاصطناعي يسوي اختبار اختراق للكود حقي',
         en: 'Using AI to Pentest My Own Code',
         zh: 'Using AI to Pentest My Own Code'
      },
      description: {
         ar: 'خليت الذكاء الاصطناعي يقرأ المشروع كامل ويسوي مراجعة أمنية للكود وطلع ثغرات ما كنت منتبه لها.',
         en: 'I let an AI read my full codebase and perform a security review that found vulnerabilities I had not noticed before.',
         zh: 'I let an AI read my full codebase and perform a security review that found vulnerabilities I had not noticed before.'
      }
   },
   {
      href: 'writeup-1.html',
      image: 'imgs/blog1.png',
      date: '2026-03-13',
      category: { ar: 'تقرير تقني', en: 'Write-up', zh: 'Write-up' },
      title: {
         ar: 'كيف بنيت مشروع هاكاثون طويق باستخدام 8 أدوات ذكاء اصطناعي',
         en: 'How I Built a Tuwaiq Hackathon Project Using 8 AI Tools',
         zh: 'How I Built a Tuwaiq Hackathon Project Using 8 AI Tools'
      },
      description: {
         ar: 'في هاكاثون طويق استخدمت 8 أدوات ذكاء اصطناعي تغطي كل المراحل: الفكرة، البحث، البرمجة، التصميم، والاختبار.',
         en: 'In Tuwaiq Hackathon, I used 8 AI tools to cover every stage — idea, research, coding, design, and testing.',
         zh: 'In Tuwaiq Hackathon, I used 8 AI tools to cover every stage — idea, research, coding, design, and testing.'
      }
   }
];

// ==========================================================================
// Translation Data & Logic
// ==========================================================================
const translations = {
   ar: {
      nav_home: "الرئيسية",
      nav_about: "من أنا",
      nav_skills: "المهارات",
      nav_achievements: "الإنجازات",
      nav_contact: "تواصل معي",
      
      hero_subtitle: "مرحباً، أنا",
      hero_title: "عبدالعزيز العودان",
      hero_role: "مبرمج Full-Stack AI ومختبر اختراق",
      hero_desc: "أجمع بين بناء المنتجات التقنية، <strong>الذكاء الاصطناعي العميق</strong>، والأمن السيبراني. أقوم حالياً ببناء وتطوير منصة <strong>PWN TH3 CITY</strong>، ومهتم ببناء ذكاء اصطناعي متكامل يحل أعقد المشكلات ويصنع الفارق.",
      hero_btn_about: "اكتشف هويتي",
      hero_btn_contact: "تواصل معي",
      
      about_title: "من أنا",
      about_p1: "بدأت رحلتي في عالم التقنية من باب <strong>الأمن السيبراني</strong> كساعٍ لاكتشاف الثغرات وفهم كيف تعمل الأنظمة من الداخل. هذا الشغف قادني للمشاركة في تحديات (CTF) وتطوير عقلية هجومية ودفاعية حادة.",
      about_p2: "مع الوقت، أدركت أن الشغف الحقيقي لا يقتصر على اكتشاف الثغرات، بل يمتد إلى <strong>بناء الأنظمة</strong>. عندها انتقلت للبرمجة وتطوير الواجهات، حيث أصبحت أجمع بين التصميم الأنيق والهندسة البرمجية المتينة.",
      about_p3: "اليوم، أعمل كمطور Full-Stack ومهتم بتطبيقات <strong>الذكاء الاصطناعي</strong>. وكتتويج لهذه الرحلة، أسست منصة <strong>PWN TH3 CITY</strong> لتكون بيئة تجمع بين التحديات الأمنية والبرمجة بمفهوم حديث ومبتكر.",
      
      skills_title: "المهارات",
      skill_1_title: "البرمجة والتطوير",
      skill_1_desc: "تطوير تطبيقات ويب حديثة (Full-Stack) مع التركيز على الأداء النظيف، كتابة كود منظم (Clean Code)، وبناء واجهات تفاعلية تدعم تجربة مستخدم استثنائية.",
      skill_2_title: "الأمن السيبراني",
      skill_2_desc: "فحص ثغرات (Bug Bounty)، اختبار اختراق الأنظمة، وتحليل أمني. خبرة قوية في تحديات الـ CTF وعقلية المهاجم والمدافع.",
      skill_3_title: "الذكاء الاصطناعي",
      skill_3_desc: "توظيف نماذج وتقنيات الذكاء الاصطناعي في بناء منتجات رقمية ذكية تعزز من تجربة المستخدم وتحل المشاكل المعقدة بكفاءة.",
      
      achievements_title: "الإنجازات",
      achiev_1_title: "المركز 1",
      achiev_1_desc: "كودر هب - ليب 25",
      achiev_1_date: "13/2/2025",
      achiev_2_title: "المركز الـ 6 - على مستوى السعودية",
      achiev_2_desc: "Bug Bounty Junior - Black Hat MEA 25",
      achiev_2_date: "3/12/2025",
      achiev_3_title: "المركز الأول",
      achiev_3_desc: "Cyber Yard - Coder Hub",
      achiev_3_date: "11/10/2025",
      achiev_4_title: "المركز الثالث",
      achiev_4_desc: "HackHubCTF - على مستوى المملكة",
      achiev_4_date: "20/2/2025",

      nav_writeups: "التقارير",
      writeups_title: "التقارير التقنية",
      writeups_desc: "تقارير تقنية تعجبني وكتابتها",
      writeups_empty: "قريبًا — التقارير قيد الإعداد",
      read_more: "اقرأ التقرير",

      contact_title: "تواصل معي",
      contact_desc: "أنا دائمًا منفتح لمناقشة المشاريع الجديدة، الأفكار الابتكارية، أو حتى لتبادل الحديث حول التقنية والذكاء الاصطناعي.",
      contact_email: "البريد الإلكتروني:",
      contact_location_label: "الموقع الجغرافي:",
      contact_location: "المملكة العربية السعودية",
      
      form_name: "الاسم",
      form_name_ph: "أدخل اسمك الكريم",
      form_email: "البريد الإلكتروني",
      form_msg: "الرسالة",
      form_msg_ph: "اكتب رسالتك هنا...",
      form_submit: "إرسال الرسالة",
      
      footer_copy: "عبدالعزيز العودان. جميع الحقوق محفوظة."
   },
   en: {
      nav_home: "Home",
      nav_about: "About Me",
      nav_skills: "Skills",
      nav_achievements: "Achievements",
      nav_contact: "Contact",
      
      hero_subtitle: "Hello, I am",
      hero_title: "Abdulaziz Alodan",
      hero_role: "Full-Stack AI Developer & Penetration Tester",
      hero_desc: "I combine technical product building, <strong>Deep Artificial Intelligence</strong>, and Cyber Security. Currently building and developing the <strong>PWN TH3 CITY</strong> platform, and focused on building integrated AI that solves complex problems and makes a difference.",
      hero_btn_about: "Discover My Identity",
      hero_btn_contact: "Contact Me",
      
      about_title: "About Me",
      about_p1: "My journey in the tech world started through the door of <strong>Cyber Security</strong> as a seeker discovering vulnerabilities and understanding how systems work from within. This passion led me to participate in CTF challenges and develop a sharp offensive and defensive mindset.",
      about_p2: "Over time, I realized true passion isn't just about finding flaws, but extends to <strong>building systems</strong>. That's when I transitioned into programming and frontend development, combining elegant design with solid software engineering.",
      about_p3: "Today, I work as a Full-Stack developer heavily focused on <strong>AI applications</strong>. As a culmination of this journey, I founded the <strong>PWN TH3 CITY</strong> platform to be an environment that mixes security challenges and programming with a modern and innovative concept.",
      
      skills_title: "Skills",
      skill_1_title: "Programming & Development",
      skill_1_desc: "Modern web application development (Full-Stack) with a focus on clean performance, writing organized code, and building interactive interfaces that support an exceptional user experience.",
      skill_2_title: "Cyber Security",
      skill_2_desc: "Bug Bounty hunting, penetration testing, and security analysis. Strong experience in CTF challenges with an attacker/defender mindset.",
      skill_3_title: "Artificial Intelligence",
      skill_3_desc: "Deploying AI models and technologies to build smart digital products that enhance user experience and solve complex problems efficiently.",
      
      achievements_title: "Achievements",
      achiev_1_title: "1st Place",
      achiev_1_desc: "Coder Hub - LEAP 25",
      achiev_1_date: "13/2/2025",
      achiev_2_title: "6th Place - Kingdom Wide",
      achiev_2_desc: "Bug Bounty Junior - Black Hat MEA 25",
      achiev_2_date: "3/12/2025",
      achiev_3_title: "1st Place",
      achiev_3_desc: "Cyber Yard - Coder Hub",
      achiev_3_date: "11/10/2025",
      achiev_4_title: "3rd Place",
      achiev_4_desc: "HackHubCTF - Kingdom Wide",
      achiev_4_date: "20/2/2025",

      nav_writeups: "Write-ups",
      writeups_title: "Technical Write-ups",
      writeups_desc: "Documenting CTF challenge solutions and Bug Bounty research",
      writeups_empty: "Coming soon — write-ups in progress",
      read_more: "Read Article",

      contact_title: "Contact Me",
      contact_desc: "I am always open to discussing new projects, innovative ideas, or just chatting about tech and AI.",
      contact_email: "Email:",
      contact_location_label: "Location:",
      contact_location: "Saudi Arabia",
      
      form_name: "Name",
      form_name_ph: "Enter your full name",
      form_email: "Email Address",
      form_msg: "Message",
      form_msg_ph: "Type your message here...",
      form_submit: "Send Message",
      
      footer_copy: "Abdulaziz Alodan. All rights reserved."
   },
   zh: {
      nav_home: "首页",
      nav_about: "关于我",
      nav_skills: "技能专长",
      nav_achievements: "成就",
      nav_contact: "联系我",
      
      hero_subtitle: "你好，我是",
      hero_title: "阿卜杜勒阿齐兹·奥丹 (Abdulaziz)",
      hero_role: "全栈 AI 开发者与渗透测试员",
      hero_desc: "我将技术产品开发、<strong>深度人工智能</strong>与网络安全结合在一起。目前正在建设 <strong>PWN TH3 CITY</strong> 平台，致力于构建解决复杂问题的人工智能技术。",
      hero_btn_about: "了解我",
      hero_btn_contact: "联系我",
      
      about_title: "关于我",
      about_p1: "我在科技领域的旅程始于<strong>网络安全</strong>，最初作为一个寻找漏洞并了解系统内部运作机制的探索者。这份热情驱使我参与了多次 CTF（夺旗）挑战，培养了敏锐的攻防思维。",
      about_p2: "随着时间的推移，我意识到真正的热情不仅仅在于发现漏洞，更延伸到<strong>构建系统</strong>。那时我转向了编程和前端开发，将设计与坚实的软件工程结合起来。",
      about_p3: "如今，作为一名全栈开发者，我重点关注<strong>人工智能应用</strong>。作为这段旅程的总结，我创立了 <strong>PWN TH3 CITY</strong> 平台，致力于打造一个以现代创新概念融合安全挑战与编程的环境。",
      
      skills_title: "技能专长",
      skill_1_title: "编程与开发",
      skill_1_desc: "现代全栈Web应用程序开发，专注于高性能、编写清晰规范的代码以及构建提供卓越用户体验的交互式界面。",
      skill_2_title: "网络安全",
      skill_2_desc: "漏洞赏金 (Bug Bounty) 挖掘、系统渗透测试与安全分析。在 CTF 挑战中拥有丰富经验，具备攻防双向思维。",
      skill_3_title: "人工智能",
      skill_3_desc: "运用 AI 模型和技术打造智能数字产品，从而提升用户体验并高效解决复杂难题。",
      
      achievements_title: "成就",
      achiev_1_title: "第一名",
      achiev_1_desc: "Coder Hub - LEAP 25",
      achiev_1_date: "13/2/2025",
      achiev_2_title: "第六名 - 沙特全国",
      achiev_2_desc: "Bug Bounty Junior - Black Hat MEA 25",
      achiev_2_date: "3/12/2025",
      achiev_3_title: "第一名",
      achiev_3_desc: "Cyber Yard - Coder Hub",
      achiev_3_date: "11/10/2025",
      achiev_4_title: "第三名",
      achiev_4_desc: "HackHubCTF - 沙特全国",
      achiev_4_date: "20/2/2025",

      nav_writeups: "技术文章",
      writeups_title: "技术报告",
      writeups_desc: "记录CTF挑战解题过程与漏洞赏金研究",
      writeups_empty: "即将推出 — 文章整理中",
      read_more: "阅读文章",

      contact_title: "联系我",
      contact_desc: "我始终乐于探讨新项目、创新想法，或仅仅是聊聊科技与人工智能技术。",
      contact_email: "电子邮箱:",
      contact_location_label: "地理位置:",
      contact_location: "沙特阿拉伯",
      
      form_name: "姓名",
      form_name_ph: "请输入您的全名",
      form_email: "电子邮箱",
      form_msg: "留言",
      form_msg_ph: "在此输入您的留言...",
      form_submit: "发送留言",
      
      footer_copy: "Abdulaziz Alodan. 保留所有权利."
   }
};

document.addEventListener('DOMContentLoaded', () => {
   const switcher  = document.getElementById('langSwitcher');
   const btn       = document.getElementById('langSelected');
   const dropdown  = document.getElementById('langDropdown');
   const flagImg   = document.getElementById('selectedFlag');
   const labelEl   = document.getElementById('selectedLangText');
   if (!switcher) return;

   const langMeta = {
      ar: { label: 'العربية', flag: 'imgs/flag-saudi-arabia_1f1f8-1f1e6.png' },
      en: { label: 'English',  flag: 'imgs/flag-united-kingdom_1f1ec-1f1e7.png' },
      zh: { label: '中文',     flag: 'imgs/flag-china_1f1e8-1f1f3.png' },
   };

   function applyLang(lang) {
      const meta = langMeta[lang];
      flagImg.src = meta.flag;
      labelEl.textContent = meta.label;
      dropdown.querySelectorAll('.lang-option').forEach(opt => {
         opt.classList.toggle('active', opt.dataset.lang === lang);
      });
      setLanguage(lang);
      localStorage.setItem('siteLang', lang);
   }

   function toggleOpen(state) {
      const open = state !== undefined ? state : !switcher.classList.contains('open');
      switcher.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', open);
   }

   btn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleOpen();
   });

   dropdown.querySelectorAll('.lang-option').forEach(opt => {
      opt.addEventListener('click', () => {
         applyLang(opt.dataset.lang);
         toggleOpen(false);
      });
   });

   document.addEventListener('click', () => toggleOpen(false));

   // Init
   const savedLang = localStorage.getItem('siteLang') || 'ar';
   applyLang(savedLang);
});

function renderBlogCards(lang) {
   const grid = document.getElementById('writeups-grid');
   if (!grid) return;

   const isAr = lang === 'ar';
   const dir = isAr ? 'rtl' : 'ltr';
   const t = translations[lang] || translations.ar;
   const readMoreText = t.read_more || 'Read Article';

   grid.innerHTML = blogPosts.map(post => {
      const title = post.title[lang] || post.title.en;
      const desc  = post.description[lang] || post.description.en;
      const cat   = post.category[lang] || post.category.en;

      return `<article class="writeup-card reveal active" dir="${dir}">
         <a href="${post.href}" class="writeup-cover">
            <img src="${post.image}" alt="${title}">
         </a>
         <div class="card-accent ctf"></div>
         <div class="writeup-body">
            <div class="writeup-meta">
               <span class="writeup-tag ctf">${cat}</span>
            </div>
            <h3>${title}</h3>
            <p>${desc}</p>
            <div class="writeup-footer">
               <span class="writeup-date">${post.date}</span>
               <a href="${post.href}" class="writeup-link">${readMoreText}</a>
            </div>
         </div>
      </article>`;
   }).join('');
}

function setLanguage(lang) {
   // Update document dir and lang attributes
   if (lang === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
   } else if (lang === 'zh') {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = 'zh';
   } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = 'en';
   }

   if (lang !== 'ar') {
      document.body.style.fontFamily = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
   } else {
      document.body.style.fontFamily = "var(--font-main)";
   }

   const elements = document.querySelectorAll('[data-i18n]');
   elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
         el.innerHTML = translations[lang][key];
      }
   });

   const placeholders = document.querySelectorAll('[data-i18n-ph]');
   placeholders.forEach(el => {
      const key = el.getAttribute('data-i18n-ph');
      if (translations[lang] && translations[lang][key]) {
         el.placeholder = translations[lang][key];
      }
   });

   // Re-render blog cards in the active language
   renderBlogCards(lang);
}
