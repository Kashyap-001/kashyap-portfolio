// Kashyap Patel — Portfolio
// Vanilla JS, no dependencies. Four small behaviors.

// 1. Smooth scroll for in-page nav links (and close mobile nav on click)
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// 2. Nav background on scroll + active-link-on-scroll
const nav = document.getElementById('nav');
const navAnchors = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id], header[id]');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navAnchors.forEach((a) => a.classList.remove('active'));
      const match = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (match) match.classList.add('active');
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);
sections.forEach((s) => sectionObserver.observe(s));

// 3. One-shot fade-in-on-scroll for project cards (staggered children via CSS)
const cardObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll('.project-card').forEach((card) => cardObserver.observe(card));

// 3b. Generic reveal-on-scroll for section labels, about text, skills strip,
// education items, and the contact block — same one-shot pattern, separate
// class so it doesn't collide with the project-card system above.
const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// 5. Scroll progress bar — rAF-throttled so it only recalculates once per frame
const progressBar = document.getElementById('scrollProgress');
let progressTicking = false;

function updateProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = pct + '%';
  progressTicking = false;
}

window.addEventListener('scroll', () => {
  if (progressTicking) return;
  progressTicking = true;
  requestAnimationFrame(updateProgress);
}, { passive: true });

updateProgress();

// 4. Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

// 6. Word-by-word scroll-linked text reveal for the About honesty paragraph.
// Splits the paragraph into one <span class="word"> per word, then lights
// them up progressively as the paragraph scrolls through the viewport.
const honestyText = document.getElementById('honestyText');
if (honestyText) {
  const words = honestyText.textContent.trim().split(/\s+/);
  honestyText.textContent = '';
  words.forEach((word, i) => {
    const span = document.createElement('span');
    span.className = 'word';
    span.textContent = word;
    honestyText.appendChild(span);
    if (i < words.length - 1) honestyText.appendChild(document.createTextNode(' '));
  });

  const wordSpans = honestyText.querySelectorAll('.word');
  let textRevealTicking = false;

  function updateTextReveal() {
    const rect = honestyText.getBoundingClientRect();
    // Trigger zone: from the paragraph entering 80% down the viewport
    // to its bottom passing 30% down the viewport.
    const start = window.innerHeight * 0.8;
    const end = window.innerHeight * 0.3;
    const total = rect.height + (start - end);
    const scrolled = start - rect.top;
    const progress = Math.min(1, Math.max(0, scrolled / total));
    const activeCount = Math.floor(progress * wordSpans.length);

    wordSpans.forEach((span, i) => {
      span.classList.toggle('active', i < activeCount);
    });
    textRevealTicking = false;
  }

  window.addEventListener('scroll', () => {
    if (textRevealTicking) return;
    textRevealTicking = true;
    requestAnimationFrame(updateTextReveal);
  }, { passive: true });

  updateTextReveal();
}

// 7. Scroll-scrubbed diagram assembly: each diagram's pieces light up in
// step with the card's own position in the viewport — 0% assembled when
// the card is entering at the bottom of the screen, 100% assembled just
// before the card's top reaches the top of the screen. Continuous, tied to
// actual scroll position, not a fixed-duration animation that plays once.
const diagramCards = Array.from(document.querySelectorAll('.diagram-card')).map((diagram) => ({
  diagram,
  pieces: diagram.querySelectorAll('svg > *'),
}));
let diagramTicking = false;

function updateDiagramAssembly() {
  diagramCards.forEach(({ diagram, pieces }) => {
    if (!pieces.length) return;
    // Measure the diagram itself, not the whole (much taller) project card —
    // otherwise a tall card's text can push the math out of sync with when
    // the diagram is actually visible on screen.
    const rect = diagram.getBoundingClientRect();
    // 0% assembled when the diagram enters at the bottom of the screen,
    // 100% assembled just before its top reaches the very top of the screen.
    const start = window.innerHeight;
    const end = window.innerHeight * 0.15;
    const progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
    const activeCount = Math.floor(progress * pieces.length);
    pieces.forEach((piece, i) => {
      piece.classList.toggle('piece-active', i < activeCount);
    });
  });
  diagramTicking = false;
}

window.addEventListener('scroll', () => {
  if (diagramTicking) return;
  diagramTicking = true;
  requestAnimationFrame(updateDiagramAssembly);
}, { passive: true });

updateDiagramAssembly();

// 7b. Auto-play the demo video only while it's actually visible on screen
// (not the instant the page loads) — saves bandwidth for visitors who never
// scroll to it, and pauses again once it scrolls out of view.
const mcpDemoVideo = document.getElementById('mcpDemoVideo');
if (mcpDemoVideo) {
  const videoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          mcpDemoVideo.play().catch(() => {}); // ignore browsers that still block it
        } else {
          mcpDemoVideo.pause();
        }
      });
    },
    { threshold: 0.4 }
  );
  videoObserver.observe(mcpDemoVideo);
}

// 8. Full-site cursor-follow ripple — moves the .cursor-glow container to
// the mouse position via transform (cheap: no layout reflow, unlike
// updating left/top). The rippling rings themselves are pure CSS animation.
const cursorGlow = document.getElementById('cursorGlow');
if (cursorGlow) {
  window.addEventListener('mousemove', (e) => {
    cursorGlow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  }, { passive: true });
}
