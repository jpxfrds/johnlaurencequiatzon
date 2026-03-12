/* ============================================
   JLQ Portfolio – script.js
   ============================================ */

'use strict';

// ─── NAVBAR SCROLL EFFECT ───
const navbar = document.getElementById('navbar');
const onScroll = () => {
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  }
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ─── HAMBURGER MENU ───
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

hamburger?.addEventListener('click', () => {
  if (!mobileMenu) return;
  mobileMenu.classList.toggle('open');
  const isOpen = mobileMenu.classList.contains('open');
  hamburger.setAttribute('aria-expanded', isOpen);
  const bars = hamburger.querySelectorAll('span');
  if (isOpen) {
    bars[0].style.transform = 'rotate(45deg) translate(4px, 5px)';
    bars[1].style.opacity = '0';
    bars[2].style.transform = 'rotate(-45deg) translate(4px, -5px)';
  } else {
    bars[0].style.transform = '';
    bars[1].style.opacity = '';
    bars[2].style.transform = '';
  }
});

// Close mobile menu on link click
mobileMenu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    const bars = hamburger?.querySelectorAll('span');
    if (bars) {
      bars[0].style.transform = '';
      bars[1].style.opacity = '';
      bars[2].style.transform = '';
    }
  });
});

// ─── SCROLL REVEAL ───
const revealEls = document.querySelectorAll('.reveal, .reveal-delay-1, .reveal-delay-2, .reveal-delay-3, .reveal-delay-4');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// ─── SMOOTH ANCHOR SCROLLING ───
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const href = anchor.getAttribute('href');
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const navH = navbar?.offsetHeight || 0;
    const top = target.getBoundingClientRect().top + window.scrollY - navH - 12;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ─── ACTIVE NAV LINK HIGHLIGHT ───
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        const isActive = link.getAttribute('href') === '#' + entry.target.id;
        link.style.color = isActive ? 'var(--gold-lite)' : '';
      });
    }
  });
}, { rootMargin: '-40% 0px -40% 0px' });

sections.forEach(s => activeObserver.observe(s));