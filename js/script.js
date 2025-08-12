// Loading Screen
window.addEventListener("load", () => {
  const loadingOverlay = document.getElementById("loadingOverlay");
  setTimeout(() => {
    loadingOverlay.classList.add("hidden");
  }, 1000);
});

// Theme Toggle Functionality
const themeToggle = document.getElementById("themeToggle");
const body = document.body;
const themeIcon = themeToggle.querySelector("i");

const savedTheme = localStorage.getItem("theme") || "dark";
if (savedTheme === "dark") {
  body.setAttribute("data-theme", "dark");
  themeIcon.classList.replace("fa-moon", "fa-sun");
}

themeToggle.addEventListener("click", () => {
  const currentTheme = body.getAttribute("data-theme");
  if (currentTheme === "dark") {
    body.removeAttribute("data-theme");
    themeIcon.classList.replace("fa-sun", "fa-moon");
    localStorage.setItem("theme", "light");
  } else {
    body.setAttribute("data-theme", "dark");
    themeIcon.classList.replace("fa-moon", "fa-sun");
    localStorage.setItem("theme", "dark");
  }
});

// Mobile Navigation
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  });
});

// Header Scroll Effect
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Active Navigation
const sections = document.querySelectorAll("section[id]");
const navLinksArray = document.querySelectorAll(".nav-links a");

function updateActiveNav() {
  const scrollPos = window.scrollY + 200;

  sections.forEach((section) => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute("id");

    if (scrollPos >= top && scrollPos <= bottom) {
      navLinksArray.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${id}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

window.addEventListener("scroll", updateActiveNav);

// Scroll Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

document.querySelectorAll(".fade-up, .fade-left, .fade-right").forEach((el) => {
  observer.observe(el);
});

// Counter Animation
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number");

  counters.forEach((counter) => {
    const target = parseInt(counter.textContent.replace(/[^\d]/g, ""));
    const isPercentage = counter.textContent.includes("%");
    const isPlus = counter.textContent.includes("+");
    let current = 0;
    const increment = target / 50;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }

      let displayValue = Math.floor(current);
      if (isPercentage) displayValue += "%";
      if (isPlus) displayValue += "+";

      counter.textContent = displayValue;
    }, 40);
  });
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateCounters();
      statsObserver.unobserve(entry.target);
    }
  });
});

const statsGrid = document.querySelector(".stats-grid");
if (statsGrid) {
  statsObserver.observe(statsGrid);
}

// Resume Download Functionality
function openResume() {
  window.open("resume/Kutub_Uddin_Resume.pdf", "_blank");
}

// Add open functionality to both buttons
const heroDownloadBtn = document.getElementById("heroDownloadBtn");
const contactDownloadBtn = document.getElementById("contactDownloadBtn");

function handleResumeOpen(button) {
  const originalText = button.innerHTML;
  button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Opening...';
  button.disabled = true;

  setTimeout(() => {
    openResume();
    button.innerHTML = '<i class="fas fa-check"></i> Opened!';
    button.style.background = "var(--success-gradient)";

    setTimeout(() => {
      button.innerHTML = originalText;
      button.style.background = "";
      button.disabled = false;
    }, 3000);
  }, 1000);
}

heroDownloadBtn.addEventListener("click", function (e) {
  e.preventDefault();
  handleResumeOpen(this); // ✅ Calls PDF opening function instead of text file download
});

contactDownloadBtn.addEventListener("click", function (e) {
  e.preventDefault();
  handleDownload(this);
});

// Typing Effect for Hero Title
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";

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
  const heroTitle = document.querySelector(".hero h1");
  if (heroTitle) {
    const text = heroTitle.textContent;
    typeWriter(heroTitle, text, 120);
  }
}, 1000);

// Parallax effect for floating shapes
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const shapes = document.querySelectorAll(".shape");

  shapes.forEach((shape, index) => {
    const speed = (index + 1) * 0.3;
    shape.style.transform = `translateY(${scrolled * speed}px) rotate(${
      scrolled * 0.05
    }deg)`;
  });
});

// Skill items hover effects
document.querySelectorAll(".skill-item").forEach((item) => {
  item.addEventListener("mouseenter", function () {
    this.style.transform = "translateX(15px) scale(1.05)";
  });

  item.addEventListener("mouseleave", function () {
    this.style.transform = "";
  });
});

// Project cards entrance animation
const projectCards = document.querySelectorAll(".project-card");
const projectObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }, index * 200);
    }
  });
});

projectCards.forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(50px)";
  card.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
  projectObserver.observe(card);
});

// Add click ripple effect to buttons
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.classList.add("ripple");

    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add CSS for ripple effect
const style = document.createElement("style");
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
const timelineItems = document.querySelectorAll(".timeline-item");
const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateX(0)";
    }
  });
});

timelineItems.forEach((item, index) => {
  item.style.opacity = "0";
  item.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";

  if (index % 2 === 0) {
    item.style.transform = "translateX(-50px)";
  } else {
    item.style.transform = "translateX(50px)";
  }

  timelineObserver.observe(item);
});

// Smooth reveal for education cards
const educationCards = document.querySelectorAll(".education-card");
const educationObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0) scale(1)";
      }, index * 150);
    }
  });
});

educationCards.forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(30px) scale(0.9)";
  card.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
  educationObserver.observe(card);
});

// Contact links hover effects
document.querySelectorAll(".contact-link").forEach((link) => {
  link.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-8px) scale(1.02)";
    this.style.boxShadow = "var(--shadow-hover)";
  });

  link.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(-5px)";
    this.style.boxShadow = "var(--shadow)";
  });
});

// Add custom cursor trail effect
let trail = [];
let trailLength = 10;

document.addEventListener("mousemove", function (e) {
  trail.push({ x: e.clientX, y: e.clientY });
  if (trail.length > trailLength) trail.shift();
});

// Performance optimization: only run animations when page is visible
let isPageVisible = true;
document.addEventListener("visibilitychange", function () {
  isPageVisible = !document.hidden;
});

// Debounce scroll events for better performance
let scrollTimeout;
window.addEventListener(
  "scroll",
  () => {
    if (scrollTimeout) {
      cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = requestAnimationFrame(() => {
      updateActiveNav();
    });
  },
  { passive: true }
);

function adjustHeroHeight() {
  const header = document.querySelector("header");
  const hero = document.querySelector(".hero");

  if (header && hero) {
    const headerHeight = header.offsetHeight;
    hero.style.minHeight = `calc(100vh - ${headerHeight}px)`;
    hero.style.paddingTop = `${headerHeight}px`;
  }
}

window.addEventListener("load", adjustHeroHeight);
window.addEventListener("resize", adjustHeroHeight);
