 // Theme Toggle Functionality
        const themeToggle = document.getElementById('themeToggle');
        const body = document.body;
        const themeIcon = themeToggle.querySelector('i');

        // Check for saved theme preference
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

        // Smooth Scrolling for Navigation
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

        // Update Active Navigation Link
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');

        function updateActiveNav() {
            const scrollPos = window.scrollY + 200;
            
            sections.forEach(section => {
                const top = section.offsetTop;
                const bottom = top + section.offsetHeight;
                const id = section.getAttribute('id');
                
                if (scrollPos >= top && scrollPos <= bottom) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }

        window.addEventListener('scroll', updateActiveNav);

        // Fade Up Animation on Scroll
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

        document.querySelectorAll('.fade-up').forEach(el => {
            observer.observe(el);
        });

        // Resume Download Functionality
        document.getElementById('downloadResume').addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create resume content
            const resumeContent = `
KUTUB UDDIN TIPU
Senior Software Engineer

Email: kutubuddin.net@hotmail.com
Phone: +880 1517-173752
Location: Mohakhali, Dhaka, Bangladesh
LinkedIn: linkedin.com/in/kutubuddin-tipu
GitHub: github.com/kutubuddintipu

PROFESSIONAL SUMMARY
Senior Software Engineer with 4+ years of experience in building scalable, secure, and efficient web applications. Currently working at Technohaven Company Ltd., specializing in translating complex client requirements into robust software solutions. Proficient in ASP.NET Core, Angular, PostgreSQL, and software architecture following SOLID principles.

WORK EXPERIENCE

SENIOR SOFTWARE ENGINEER | Technohaven Company Ltd. | April 2023 – Present
• Supervised and lead a team of 3 junior software engineers during development of robust upgrade version
• Developed and maintained VATPrompt (Automated VAT accounts management) web application
• Built VATPrompt API with external endpoints for ERP, SAP, Tally software integration
• Achieved 34% revenue increase within 6 months through enhanced features and optimization
• Developed and maintained THRM (Technohaven Human Resource Management) software

SOFTWARE ENGINEER | Oner Systems Limited | June 2021 – March 2023
• Designed, developed, and maintained Oner ERP Suite web applications using ASP.NET technologies
• Worked with Microsoft Entity Framework and SQL Server for data framework enhancement
• Enhanced application features to fix bugs and optimize performance, reliability, and efficiency
• Proficiently troubleshot simple and complex technological issues

TECHNICAL SKILLS
• Backend: ASP.NET Core, ASP.NET MVC, ASP.NET Web Forms, C#, Web API, REST API, Entity Framework
• Frontend: Angular, AngularJS, JavaScript, HTML5, CSS3, Bootstrap 5
• Databases: PostgreSQL, SQL Server, MySQL
• Tools & Others: Git, SVN, Unit Testing, Visual Studio, VS Code

EDUCATION
• B.Sc in Computer Science & Engineering | Bangladesh University
• Diploma in Engineering, Computer Technology | Feni Polytechnic Institute

TRAINING & CERTIFICATIONS
• Web Application Development | ISDB-BISEW IT Scholarship Program | 8 months
• Web Design & Development | Learning & Earning Development Project, ICT Division | 3 months
• IT Support Technician | Skills for Employment Investment Program (SEIP) | 6 months

AREAS OF EXPERTISE
• Web Application Design & Development
• Software Development Lifecycle
• Scrum & Agile Methodologies
• Team Leadership & Supervision
• Technical Process Improvement
• Proficient Troubleshooting
            `;

            // Create and download the resume
            const blob = new Blob([resumeContent], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'Kutub_Uddin_Tipu_Resume.txt';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            // Show download feedback
            const btn = this;
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
            btn.style.background = 'var(--success-gradient)';
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = 'var(--success-gradient)';
            }, 2000);
        });

        // Add subtle parallax effect to floating shapes
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const shapes = document.querySelectorAll('.shape');
            
            shapes.forEach((shape, index) => {
                const speed = (index + 1) * 0.5;
                shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
            });
        });

        // Add typing effect to hero title
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
            
            setTimeout(type, 1000);
        }

        // Initialize typing effect after page load
        window.addEventListener('load', () => {
            const heroTitle = document.querySelector('.hero h1');
            if (heroTitle) {
                const text = heroTitle.textContent;
                typeWriter(heroTitle, text, 150);
            }
        });

        // Add hover effect to skill items
        document.querySelectorAll('.skill-item').forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(10px) scale(1.05)';
                this.style.background = 'rgba(102, 126, 234, 0.1)';
                this.style.borderRadius = '10px';
                this.style.padding = '10px 15px';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = '';
                this.style.background = '';
                this.style.borderRadius = '';
                this.style.padding = '10px 0';
            });
        });

        // Add counter animation to stats
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

        // Trigger counter animation when stats section is visible
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
        