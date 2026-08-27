/* ==========================================================================
   PORTFOLIO SCRIPT.JS
   Modular vanilla JavaScript — organized by feature
   (unchanged logic — works with the new light theme)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initMobileMenu();
  initSmoothScroll();
  initActiveNavHighlight();
  initTypingEffect();
  initScrollReveal();
  initBackToTop();
  initRippleEffect();
  setFooterYear();
});

/* 1. NAVBAR SCROLL EFFECT */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll();
}

/* 2. MOBILE MENU TOGGLE */
function initMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
}

/* 3. SMOOTH SCROLLING */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);

      if (target) {
        e.preventDefault();
        const navbarHeight = document.getElementById('navbar').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight;

        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });
}

/* 4. ACTIVE NAVIGATION HIGHLIGHT */
function initActiveNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.dataset.section === id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { root: null, rootMargin: '-50% 0px -50% 0px', threshold: 0 });

  sections.forEach(section => observer.observe(section));
}

/* 5. TYPING EFFECT (Hero Subtitle) */
function initTypingEffect() {
  const typedTextEl = document.getElementById('typedText');
  const phrases = ['Pelajar SMK', 'Frontend Developer', 'UI Designer'];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const TYPE_SPEED = 90;
  const DELETE_SPEED = 45;
  const PAUSE_AFTER_TYPE = 1500;
  const PAUSE_AFTER_DELETE = 400;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      charIndex--;
      typedTextEl.textContent = currentPhrase.substring(0, charIndex);
    } else {
      charIndex++;
      typedTextEl.textContent = currentPhrase.substring(0, charIndex);
    }

    let delay = isDeleting ? DELETE_SPEED : TYPE_SPEED;

    if (!isDeleting && charIndex === currentPhrase.length) {
      delay = PAUSE_AFTER_TYPE;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = PAUSE_AFTER_DELETE;
    }

    setTimeout(type, delay);
  }

  type();
}

/* 6. SCROLL REVEAL ANIMATION */
function initScrollReveal() {
  const fadeElements = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  fadeElements.forEach(el => observer.observe(el));
}

/* 8. BACK TO TOP BUTTON */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* 9. BUTTON RIPPLE EFFECT */
function initRippleEffect() {
  const buttons = document.querySelectorAll('.btn');

  buttons.forEach(button => {
    button.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');

      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);

      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

/* 10. FOOTER YEAR */
function setFooterYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
