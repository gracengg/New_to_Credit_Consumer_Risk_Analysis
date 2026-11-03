/* Small, optional enhancements. Core content and case disclosures work without JS. */
(() => {
  'use strict';

  function initNavigation() {
    const navbar = document.getElementById('navbar');
    const toggle = document.getElementById('nav-toggle');
    const menu = document.getElementById('nav-menu');
    if (!navbar || !toggle || !menu) return;

    const mobile = window.matchMedia('(max-width: 700px)');
    const setOpen = (open) => {
      menu.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      menu.inert = mobile.matches && !open;
    };
    navbar.classList.add('js-nav');
    setOpen(false);
    toggle.addEventListener('click', () => {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    menu.addEventListener('click', (event) => {
      if (event.target.closest('a')) setOpen(false);
    });
    navbar.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });
    document.addEventListener('click', (event) => {
      if (!navbar.contains(event.target)) setOpen(false);
    });
    mobile.addEventListener('change', () => setOpen(false));
    const updateScrolled = () => navbar.classList.toggle('scrolled', window.scrollY > 60);
    updateScrolled();
    window.addEventListener('scroll', updateScrolled, { passive: true });
  }

  function initSectionTracking() {
    if (!('IntersectionObserver' in window)) return;
    const links = [...document.querySelectorAll('.nav-link')];
    if (!links.length) return;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      links.forEach((link) => {
        const active = link.hash === `#${visible.target.id}`;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }, { rootMargin: '-15% 0px -45% 0px', threshold: [0, .1, .3] });
    document.querySelectorAll('main section[id]').forEach((section) => observer.observe(section));
  }

  function initReveals() {
    if (!('IntersectionObserver' in window) ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.remove('reveal-pending');
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0, rootMargin: '0px 0px 60px 0px' });
    document.querySelectorAll('.reveal').forEach((element) => {
      observer.observe(element);
      element.classList.add('reveal-pending');
    });
  }

  function initImageFallbacks() {
    document.querySelectorAll('img[data-fallback]').forEach((image) => {
      const useFallback = () => {
        const fallback = image.dataset.fallback;
        if (!fallback) return;
        delete image.dataset.fallback;
        image.src = fallback;
      };
      image.addEventListener('error', useFallback, { once: true });
      if (image.complete && image.naturalWidth === 0) useFallback();
    });
  }

  function initContactDraft() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const fields = new FormData(form);
      const name = String(fields.get('name') || '').trim();
      const email = String(fields.get('email') || '').trim();
      const message = String(fields.get('body') || '').trim();
      if (!name || !email || !message) return;
      const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
      const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nReply to: ${email}`);
      window.location.href = `${form.getAttribute('action')}?subject=${subject}&body=${body}`;
    });
  }

  function initialize() {
    initNavigation();
    initSectionTracking();
    initReveals();
    initImageFallbacks();
    initContactDraft();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize, { once: true });
  } else {
    initialize();
  }
})();
