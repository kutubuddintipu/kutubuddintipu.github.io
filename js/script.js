        // Loading Screen
        window.addEventListener('load', () => {
            const loadingOverlay = document.getElementById('loadingOverlay');
            setTimeout(() => {
                loadingOverlay.classList.add('hidden');
            }, 1000);
        });

        // Theme Toggle Functionality
        const themeToggle = document.getElementById('themeToggle');
        const body = document.body;
        const themeIcon = themeToggle.querySelector('i');

        const savedTheme = localStorage.getItem('theme') || 'light';
        if (savedTheme === 'dark') {
            body.setAttribute('data-theme', 'dark');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        }

        themeToggle.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme');
            if (currentTheme === 'dark') {
                body.removeAttribute('data-theme');
                themeIcon.classList.replace('fa-sun', 'fa-moon');
                localStorage.setItem('theme', 'light');
            } else {
                body.setAttribute('data-theme', 'dark');
                themeIcon.classList.replace('fa-moon', 'fa-sun');
                localStorage.setItem('theme', 'dark');
            }
        });

        // Mobile Navigation
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('navLinks');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Header Scroll Effect
        const header = document.getElementById('header');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Smooth Scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Active Navigation
        const sections = document.querySelectorAll('section[id]');
        const navLinksArray = document.querySelectorAll('.nav-links a');

        function updateActiveNav() {
            const scrollPos = window.scrollY + 200;
            
            sections.forEach(section => {
                const top = section.offsetTop;
                const bottom = top + section.offsetHeight;
                const id = section.getAttribute('id');
                
                if (scrollPos >= top && scrollPos <= bottom) {
                    navLinksArray.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }

        window.addEventListener('scroll', updateActiveNav);

        // Scroll Animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-up, .fade-left, .fade-right').forEach(el => {
            observer.observe(el);
        });

        // Counter Animation
        function animateCounters() {
            const counters = document.querySelectorAll('.stat-number');
            
            counters.forEach(counter => {
                const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
                const isPercentage = counter.textContent.includes('%');
                const isPlus = counter.textContent.includes('+');
                let current = 0;
                const increment = target / 50;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    
                    let displayValue = Math.floor(current);
                    if (isPercentage) displayValue += '%';
                    if (isPlus) displayValue += '+';
                    
                    counter.textContent = displayValue;
                }, 40);
            });
        }

        const statsObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        });

        const statsGrid = document.querySelector('.stats-grid');
        if (statsGrid) {
            statsObserver.observe(statsGrid);
        }

        // Resume Download Functionality
        function downloadResume() {
            const resumeContent = `KUTUB UDDIN TIPU
Senior Software Engineer

CONTACT INFORMATION
Email: kutubuddin.net@hotmail.com
Phone: +880 1517-173752
Location: Mohakhali, Dhaka, Bangladesh
LinkedIn: linkedin.com/in/kutubuddin-tipu
GitHub: github.com/kutubuddintipu

PROFESSIONAL SUMMARY
Senior Software Engineer with 4+ years of experience in building scalable, secure, and efficient web applications. Currently working at Technohaven Company Ltd., specializing in translating complex client requirements into robust software solutions. Proficient in ASP.NET Core, Angular, PostgreSQL, and software architecture following SOLID principles. Passionate about clean code, agile methodologies, and product-focused development.

AREAS OF EXPERTISE
• Web Application Design & Development
• Software Development Lifecycle
• Scrum & Agile Methodologies
• Team Leadership & Supervision
• Technical Process Improvement
• Proficient Troubleshooting

WORK EXPERIENCE

SENIOR SOFTWARE ENGINEER | Technohaven Company Ltd. | April 2023 – Present
Mohakhali DOHS, Road #03, House #169, Dhaka

• Supervised and led a team of 3 junior software engineers during development of robust upgrade version of company's software application
• Achieved 34% revenue increase within 6 months through enhanced features and optimization
• Developed and maintained VATPrompt (Automated VAT accounts management for taxpayers) web application using ASP.NET Technologies (C#, ASP.NET Web Form, HTML, CSS, Bootstrap, PostgreSQL)
• Developed and maintained VATPrompt_API with external API endpoints for integration with ERP, SAP, Tally software (using C#, ASP.NET Core Web API)
• Developed and maintained THRM software (Technohaven Human Resource Management Software)
• Enhanced application features to effectively fix bugs and optimize overall performance, reliability, and efficiency
• Proficiently troubleshot simple and complex technological issues for different assigned projects

SOFTWARE ENGINEER | Oner Systems Limited | June 2021 – March 2023
Mohakhali DOHS, Road #30, House #419, Dhaka

• Designed, developed, and maintained Oner ERP Suite web applications in ASP.NET technologies – both frontend and backend (using C#, ASP.NET MVC, REST API, AngularJS, HTML, Bootstrap)
• Worked with Microsoft Entity Framework and SQL Server to maintain and enhance data Framework
• Enhanced application features to effectively fix bugs and optimize overall performance, reliability, and efficiency
• Proficiently troubleshot simple and complex technological issues

TECHNICAL SKILLS

Backend Technologies:
• C#, ASP.NET Core, ASP.NET Web Form, ASP.NET MVC
• Web API, REST API, Entity Framework

Frontend Technologies:
• Angular, AngularJS, JavaScript, HTML5/CSS3, Bootstrap 5

Databases & Tools:
• PostgreSQL, MySQL, MS SQL Server
• Git, SVN, Visual Studio, VS Code, Unit Testing

EDUCATION

Bachelor of Science in CSE
Bangladesh University
Computer Science & Engineering

Diploma in Engineering
Feni Polytechnic Institute
Computer Technology

COURSES & TRAINING

Web Application Development
ISDB-BISEW IT Scholarship Program
Duration: 8 months
IDB Bhaban (4th Floor), E/8-A, Rokeya Sharani, Sher-e-Bangla Nagar, Dhaka-1207

Web Design & Development
Learning & Earning Development Project, ICT DIVISION
Duration: 3 months

IT-Support Technician
Skills for Employment Investment Program (SEIP)
Feni Computer Institute
Duration: 6 months

ADDRESSES

Present Address:
Arjotpara, Mohakhali
Dhaka-1212, Bangladesh

Permanent Address:
Village: Aladi Nagar
Post Office: Rayer Hat
Police Station: Begumganj
District: Noakhali, Bangladesh

ACHIEVEMENTS
• Led team of 3 junior developers to successful project completion
• Achieved 34% revenue increase for company within 6 months
• Successfully integrated complex ERP systems with custom APIs
• Optimized application performance resulting in improved user experience
• Implemented clean code practices and SOLID principles across projects`;

            const blob = new Blob([resumeContent], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'Kutub_Uddin_Tipu_Resume.txt';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            return true;
        }

        // Add download functionality to both buttons
        const heroDownloadBtn = document.getElementById('heroDownloadBtn');
        const contactDownloadBtn = document.getElementById('contactDownloadBtn');

        function handleDownload(button) {
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing...';
            button.disabled = true;

            setTimeout(() => {
                if (downloadResume()) {
                    button.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
                    button.style.background = 'var(--success-gradient)';
                    
                    setTimeout(() => {
                        button.innerHTML = originalText;
                        button.style.background = '';
                        button.disabled = false;
                    }, 3000);
                }
            }, 1000);
        }

        heroDownloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            handleDownload(this);
        });

        contactDownloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            handleDownload(this);
        });

        // Typing Effect for Hero Title
        function typeWriter(element, text, speed = 100) {
            let i = 0;
            element.innerHTML = '';
            
            function type() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            
            setTimeout(type, 1500);
        }

        // Initialize typing effect after page load
        setTimeout(() => {
            const heroTitle = document.querySelector('.hero h1');
            if (heroTitle) {
                const text = heroTitle.textContent;
                typeWriter(heroTitle, text, 120);
            }
        }, 1000);

        // Parallax effect for floating shapes
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const shapes = document.querySelectorAll('.shape');
            
            shapes.forEach((shape, index) => {
                const speed = (index + 1) * 0.3;
                shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.05}deg)`;
            });
        });

        // Skill items hover effects
        document.querySelectorAll('.skill-item').forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(15px) scale(1.05)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });

        // Project cards entrance animation
        const projectCards = document.querySelectorAll('.project-card');
        const projectObserver = new IntersectionObserver(entries => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 200);
                }
            });
        });

        projectCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px)';
            card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            projectObserver.observe(card);
        });

        // Add click ripple effect to buttons
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });

        // Add CSS for ripple effect
        const style = document.createElement('style');
        style.textContent = `
            .btn {
                position: relative;
                overflow: hidden;
            }
            
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.4);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                pointer-events: none;
            }
            
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);

        // Timeline items animation
        const timelineItems = document.querySelectorAll('.timeline-item');
        const timelineObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }
            });
        });

        timelineItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            
            if (index % 2 === 0) {
                item.style.transform = 'translateX(-50px)';
            } else {
                item.style.transform = 'translateX(50px)';
            }
            
            timelineObserver.observe(item);
        });

        // Smooth reveal for education cards
        const educationCards = document.querySelectorAll('.education-card');
        const educationObserver = new IntersectionObserver(entries => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0) scale(1)';
                    }, index * 150);
                }
            });
        });

        educationCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px) scale(0.9)';
            card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            educationObserver.observe(card);
        });

        // Contact links hover effects
        document.querySelectorAll('.contact-link').forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
                this.style.boxShadow = 'var(--shadow-hover)';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = 'var(--shadow)';
            });
        });

        // Add custom cursor trail effect
        let trail = [];
        let trailLength = 10;

        document.addEventListener('mousemove', function(e) {
            trail.push({x: e.clientX, y: e.clientY});
            if (trail.length > trailLength) trail.shift();
        });

        // Performance optimization: only run animations when page is visible
        let isPageVisible = true;
        document.addEventListener('visibilitychange', function() {
            isPageVisible = !document.hidden;
        });

        // Debounce scroll events for better performance
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (scrollTimeout) {
                cancelAnimationFrame(scrollTimeout);
            }
            scrollTimeout = requestAnimationFrame(() => {
                updateActiveNav();
            });
        }, { passive: true });
        
