
/* ── Language toggle ── */
const langBtn = document.getElementById('lang-toggle');
let lang = 'en';

function applyLang(l) {
  document.querySelectorAll('[data-en][data-pl]').forEach(el => {
    el.textContent = l === 'pl' ? el.dataset.pl : el.dataset.en;
  });

  if (langBtn) {
    langBtn.textContent = l === 'pl' ? 'EN' : 'PL';
  }
}

if (langBtn) {
  langBtn.addEventListener('click', () => {
    lang = lang === 'pl' ? 'en' : 'pl';
    applyLang(lang);
  });
}

applyLang(lang);


/* ── Header color on footer ── */
const header = document.querySelector('.header');

if (header) {
  const logoLink = header.querySelector('.logo a');
  const navLinks = header.querySelectorAll('.nav a, .nav-links svg');
  const navLangToggle = header.querySelector('#lang-toggle');
  const targetBlock = document.querySelector('.contact-section');

  function updateHeaderColor() {
    if (!targetBlock) return;

    const headerBottom = header.getBoundingClientRect().bottom;
    const blockTop = targetBlock.getBoundingClientRect().top;
    const blockBottom = targetBlock.getBoundingClientRect().bottom;

    const isOverFooter =
      headerBottom > blockTop && headerBottom < blockBottom;

    if (isOverFooter) {
      header.style.backgroundColor = 'var(--gray-100)';
      header.style.borderColor = 'var(--gray-200)';

      if (logoLink) {
        logoLink.style.color = '#000';
      }

      navLinks.forEach(el => {
        if (el.tagName.toLowerCase() === 'svg') {
          el.style.filter = 'invert(1)';
        } else {
          el.style.color = '#000';
          el.style.borderColor = '#000';
        }
      });

      if (navLangToggle) {
        navLangToggle.style.color = '#000';
        navLangToggle.style.borderColor = '#000';
      }

    } else {
      header.style.backgroundColor = 'rgba(0,0,0,0.85)';
      header.style.borderColor = 'rgba(255,255,255,0.1)';

      if (logoLink) {
        logoLink.style.color = '#fff';
      }

      navLinks.forEach(el => {
        if (el.tagName.toLowerCase() === 'svg') {
          el.style.filter = 'invert(0)';
        } else {
          el.style.color = '#fff';

        }
      });

      if (navLangToggle) {
        navLangToggle.style.color = '#fff';
        navLangToggle.style.borderColor = '#fff';
      }
    }
  }

  window.addEventListener('scroll', updateHeaderColor, { passive: true });
  window.addEventListener('resize', updateHeaderColor);

  updateHeaderColor();
}


/* ── Scroll reveal ── */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => {
  revealObs.observe(el);
});


/* ── Stack bar animation ── */
const stackObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stack-fill').forEach(fill => {
        const width = fill.dataset.w;

        setTimeout(() => {
          fill.style.width = width + '%';
        }, 200);
      });

      stackObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.stack-section').forEach(section => {
  stackObs.observe(section);
});


/* ── Hero code typing animation ── */
const codeLines = document.querySelectorAll('.code-line');
const cursor = document.getElementById('cursor');
const heroButtons = document.getElementById('hero-buttons');

if (codeLines.length && cursor) {
  let lineIndex = 0;
  let stopped = false;

  function showNextLine() {
    if (lineIndex < codeLines.length) {
      codeLines[lineIndex].classList.add('show');
      lineIndex++;

      const delay = lineIndex < codeLines.length ? 220 : 600;

      setTimeout(showNextLine, delay);

    } else {
      setTimeout(() => {
        if (heroButtons) {
          heroButtons.classList.add('show');
        }
      }, 400);
    }
  }

  setTimeout(showNextLine, 600);

  /* Stop typing cursor on scroll */
  window.addEventListener('scroll', () => {
    if (!stopped && window.scrollY > 80) {
      stopped = true;
      cursor.classList.add('stopped');
    }
  }, { passive: true });
}


/* ── Hero parallax on scroll ── */
const heroContent = document.getElementById('hero-content');

if (heroContent) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    const max = window.innerHeight;

    if (y > max) return;

    const progress = y / max;

    heroContent.style.transform = `translateY(${y * 0.28}px)`;
    heroContent.style.opacity = String(1 - progress * 1.4);

  }, { passive: true });
}


/* ── Year ── */
const yearEl = document.getElementById('year');

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}


/* ── Index page overlay ── */
const overlay = document.getElementById('overlay');
const iframe = overlay ? overlay.querySelector('iframe') : null;
const hint = document.getElementById('fullscreen-hint');
const closeBtn = document.getElementById('close-btn');

if (overlay && iframe) {

  document.querySelectorAll('.project-thumb').forEach(card => {
    card.addEventListener('click', () => {
      const url = card.dataset.url;

      if (!url) return;

      iframe.src = url;
      overlay.classList.add('active');

      if (hint) {
        hint.style.animation = 'none';

        void hint.offsetWidth;

        hint.style.animation = 'fadeInOut 4s forwards';
      }
    });
  });

  function closeOverlay() {
    overlay.classList.remove('active');

    setTimeout(() => {
      iframe.src = '';
    }, 400);
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeOverlay);
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeOverlay();
    }
  });
}

