// 岡田音楽教室 — shared behaviour
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.site-nav');
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  const setScrolled = () => {
    if (!nav) return;
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  setScrolled();
  window.addEventListener('scroll', setScrolled, { passive: true });

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      toggle.classList.remove('open');
      links.classList.remove('open');
    }));
  }

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  // Contact form: basic client-side validation + friendly confirmation.
  // NOTE: this demo does not send email on its own — see the comment
  // near the <form> tag in contact.html for how to connect a real
  // form backend (Formspree / formsubmit.co / your own server).
  const form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      const feedback = form.querySelector('.form-feedback');
      if (!form.checkValidity()) return; // let native validation messages show
      // If the action still points at the placeholder, intercept and explain,
      // rather than silently failing.
      if (form.action.includes('YOUR-FORM-ENDPOINT')) {
        e.preventDefault();
        if (feedback) {
          feedback.textContent = 'フォームの送信先が未設定です。サイト管理者向けメモ: contact.html 内の <form action> を実際のフォーム送信先に置き換えてください。';
          feedback.style.color = '#8C4650';
        }
      }
    });
  }
});
