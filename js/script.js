// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS only if it exists
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }

    // Smooth scrolling for navigation links
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

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // Check for saved theme preference or respect OS preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
        body.classList.add('dark-mode');
        if (darkModeToggle) {
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    } else {
        body.classList.remove('dark-mode');
        if (darkModeToggle) {
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                localStorage.setItem('theme', 'light');
                darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            }
        });
    }

    // Project Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.classList.contains(filterValue)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Formspree will handle the submission
            const submitBtn = this.querySelector('button[type="submit"]');
            if (submitBtn) {
                const originalText = submitBtn.textContent;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                // Reset button after form submission
                setTimeout(() => {
                    if (submitBtn) {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    }
                }, 3000);
            }
        });
    }

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 100) {
                header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
                header.style.background = 'rgba(255,255,255,0.95)';
            } else {
                header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                header.style.background = 'white';
            }
        }
    });

    // Mobile menu toggle
    const mobileMenuToggle = document.createElement('div');
    mobileMenuToggle.innerHTML = '☰';
    mobileMenuToggle.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        font-size: 1.5rem;
        cursor: pointer;
        z-index: 1001;
        display: none;
    `;

    document.body.appendChild(mobileMenuToggle);

    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // Show/hide mobile menu toggle based on screen size
    function handleMobileMenu() {
        if (window.innerWidth <= 768) {
            if (mobileMenuToggle) mobileMenuToggle.style.display = 'block';
        } else {
            if (mobileMenuToggle) mobileMenuToggle.style.display = 'none';
            if (navLinks) navLinks.classList.remove('active');
        }
    }

    window.addEventListener('resize', handleMobileMenu);
    handleMobileMenu();

    // Add scroll-to-top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #0078d7;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        cursor: pointer;
        display: none;
        z-index: 1000;
        font-size: 1.2rem;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    `;

    document.body.appendChild(scrollToTopBtn);

    window.addEventListener('scroll', function() {
        if (scrollToTopBtn) {
            if (window.scrollY > 300) {
                scrollToTopBtn.style.display = 'block';
            } else {
                scrollToTopBtn.style.display = 'none';
            }
        }
    });

    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});