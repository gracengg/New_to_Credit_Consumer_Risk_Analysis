document.addEventListener('DOMContentLoaded', () => {

  /* ── Mobile nav ── */
  const toggle = document.getElementById('nav-toggle');
  const menu   = document.getElementById('nav-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      const bars = toggle.querySelectorAll('.bar');
      bars[0].style.transform = open ? 'translateY(6.5px) rotate(45deg)' : '';
      bars[1].style.opacity   = open ? '0' : '';
      bars[2].style.transform = open ? 'translateY(-6.5px) rotate(-45deg)' : '';
    });
    document.querySelectorAll('.nav-link').forEach(l => {
      l.addEventListener('click', () => {
        menu.classList.remove('open');
        toggle.querySelectorAll('.bar').forEach(b => {
          b.style.transform = '';
          b.style.opacity   = '';
        });
      });
    });
  }

  /* ── Navbar scroll ── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  /* ── Scroll reveal ── */
  const revealObs = new IntersectionObserver((entries, obs) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add('visible');
        obs.unobserve(en.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  /* ── Active nav ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const activeObs = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const a = document.querySelector(`.nav-link[href="#${en.target.id}"]`);
        if (a) a.classList.add('active');
      }
    });
  }, { threshold: 0.35 });
  sections.forEach(s => activeObs.observe(s));

  /* ── Cursor dot ── */
  const dot = document.getElementById('cursor-dot');
  if (dot && window.matchMedia('(pointer:fine)').matches) {
    dot.style.opacity = '.85';
    window.addEventListener('mousemove', e => {
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    }, { passive: true });
  }

  /* ── Expand / collapse case studies ── */
  document.querySelectorAll('.expand-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const el = document.getElementById(btn.dataset.target);
      el.classList.toggle('open');
      btn.textContent = el.classList.contains('open') ? 'Close case study ↑' : 'Open case study ↓';
    });
  });

  /* ── Contact form → mailto ── */
  const cf = document.getElementById('contact-form');
  if (cf) {
    cf.addEventListener('submit', e => {
      e.preventDefault();
      const name  = (document.getElementById('cf-name').value  || '').trim();
      const email = (document.getElementById('cf-email').value || '').trim();
      const msg   = (document.getElementById('cf-msg').value   || '').trim();
      if (!msg) return;
      const subject = encodeURIComponent('Portfolio message' + (name ? ' from ' + name : ''));
      const body    = encodeURIComponent(msg + (email ? '\n\nReply to: ' + email : ''));
      window.location.href = `mailto:gracengggggg@gmail.com?subject=${subject}&body=${body}`;
    });
  }

});
