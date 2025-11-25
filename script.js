// script.js — Versão super minimalista
// Apenas:
// - Rolagem suave
// - Realce do menu conforme rolagem

const SELECTORS = {
  navLinks: '.navbar a',
  sections: 'main .section'
};

const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => [...r.querySelectorAll(s)];

function init() {
  document.documentElement.style.scrollBehavior = 'smooth';
  setupNavHighlight();
}

// Realce automático no menu
function setupNavHighlight() {
  const links = $$(SELECTORS.navLinks);
  const sections = $$(SELECTORS.sections);

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(sec => io.observe(sec));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}