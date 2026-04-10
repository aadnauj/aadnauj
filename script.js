/* ═══════════════════════════════════════════════════
   PORTFOLIO — script.js
   Vanilla JavaScript, no dependencies
═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─────────────────────────────────
     1. NAVBAR — scroll glassmorphism
     ───────────────────────────────── */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    updateActiveNav();
  }, { passive: true });

  function updateActiveNav() {
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 100;
      if (window.scrollY >= top) current = sec.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  }

  /* ─────────────────────────────────
     2. HAMBURGER MENU
     ───────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const navLinksContainer = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinksContainer.classList.toggle('open');
  });

  // Close menu when a link is clicked
  navLinksContainer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinksContainer.classList.remove('open');
    });
  });

  /* ─────────────────────────────────
     3. TYPEWRITER ROLE ANIMATION
     ───────────────────────────────── */
  const roles = [
    'Machine Learning Enthusiast',
    'Software Developer',
    'Problem Solver',
    'AI Explorer',
  ];
  const roleEl = document.getElementById('roleText');
  let roleIdx = 0, charIdx = 0, deleting = false;
  const typeSpeed = 80, deleteSpeed = 40, pauseAfter = 1800, pauseStart = 400;

  function typeRole() {
    const current = roles[roleIdx];
    if (!deleting) {
      roleEl.textContent = current.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(typeRole, pauseAfter);
        return;
      }
      setTimeout(typeRole, typeSpeed);
    } else {
      roleEl.textContent = current.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        setTimeout(typeRole, pauseStart);
        return;
      }
      setTimeout(typeRole, deleteSpeed);
    }
  }
  setTimeout(typeRole, 800);

  /* ─────────────────────────────────
     4. SCROLL REVEAL (IntersectionObserver)
     ───────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObs.unobserve(entry.target); // fire once
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObs.observe(el));

  /* ─────────────────────────────────
     5. TIMELINE LINE ANIMATION
     ───────────────────────────────── */
  const timelineLine = document.getElementById('timelineLine');
  if (timelineLine) {
    const lineObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          timelineLine.classList.add('animated');
          lineObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    lineObs.observe(timelineLine.parentElement);
  }

  /* ─────────────────────────────────
     6. SKILL BAR ANIMATION
     ───────────────────────────────── */
  const skillFills = document.querySelectorAll('.skill-fill');

  const skillObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const targetWidth = fill.getAttribute('data-width');
        // Delay slightly for visual delight
        setTimeout(() => {
          fill.style.width = targetWidth + '%';
        }, 150);
        skillObs.unobserve(fill);
      }
    });
  }, { threshold: 0.3 });

  skillFills.forEach(fill => skillObs.observe(fill));

  /* ─────────────────────────────────
     7. SMOOTH PARALLAX HERO
     ───────────────────────────────── */
  const heroBg = document.querySelector('.hero-bg');
  const heroPhoto = document.querySelector('.hero-photo');

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
      if (heroBg)  heroBg.style.transform  = `translateY(${scrolled * 0.3}px)`;
      if (heroPhoto) heroPhoto.style.transform = `translateY(${scrolled * 0.08}px)`;
    }
  }, { passive: true });

  /* ─────────────────────────────────
     8. CONTACT FORM SUBMIT
     ───────────────────────────────── */
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      btn.textContent = 'Sending...';
      btn.disabled = true;

      // Simulate send delay (replace with real API call)
      setTimeout(() => {
        contactForm.reset();
        formSuccess.classList.add('show');
        btn.innerHTML = '<span>Send Message</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';
        btn.disabled = false;
        setTimeout(() => formSuccess.classList.remove('show'), 5000);
      }, 1200);
    });
  }

  /* ─────────────────────────────────
     9. SMOOTH SCROLL FOR ALL ANCHOR LINKS
     ───────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ─────────────────────────────────
     10. HIGHLIGHT CARDS STAGGER
     ───────────────────────────────── */
  const hCards = document.querySelectorAll('.highlight-card');
  hCards.forEach((card, i) => {
    card.style.setProperty('--d', `${i * 0.1}s`);
    card.classList.add('reveal-up');
    revealObs.observe(card);
  });

  /* ─────────────────────────────────
     11. PROJECT CARD TILT (subtle)
     ───────────────────────────────── */
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      card.style.transform = `translateY(-6px) rotateX(${-dy * 3}deg) rotateY(${dx * 3}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ─────────────────────────────────
     12. BACK-TO-TOP VISIBILITY
     ───────────────────────────────── */
  const backTop = document.getElementById('backTop');
  if (backTop) {
    window.addEventListener('scroll', () => {
      backTop.style.opacity = window.scrollY > 400 ? '1' : '0.3';
    }, { passive: true });
  }

  /* ─────────────────────────────────
     13. INIT: active nav on load
     ───────────────────────────────── */
  updateActiveNav();

  /* ─────────────────────────────────
     14. COUNTER ANIMATION (stats)
     ───────────────────────────────── */
  function animateCounter(el, end, suffix) {
    let start = 0;
    const duration = 1800;
    const step = 16;
    const increment = end / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        el.textContent = end + suffix;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(start) + suffix;
      }
    }, step);
  }

  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const numEl = entry.target;
        const raw = numEl.textContent.trim();
        const num = parseInt(raw);
        const suffix = raw.replace(/[0-9]/g, '');
        animateCounter(numEl, num, suffix);
        counterObs.unobserve(numEl);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-num').forEach(el => counterObs.observe(el));

});