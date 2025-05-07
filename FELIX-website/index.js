//index.js
(function(){
  const navbar        = document.getElementById('navbar');
  let   lastScroll    = window.pageYOffset;
  const threshold     = 15;   // px before toggling
  let   ignoreScroll  = false;

  // 1) YOUR OVERRIDDEN NAVIGATION
  // --------------------------------
  // instead of letting the <a href="#foo"> do native scrolling,
  // we intercept it so we can disable our scroll-handler temporarily
  document
    .querySelectorAll('#navbar a[href^="#"]')
    .forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = link.getAttribute('href').slice(1);
        const targetEl = document.getElementById(targetId);
        if (!targetEl) return;

        // make sure the bar is visible
        navbar.classList.replace('nav-hidden','nav-visible');

        // disable hide/show logic
        ignoreScroll = true;

        // do the smooth scroll
        targetEl.scrollIntoView({ behavior: 'smooth' });

        // after a short delay, re-enable scroll logic and reset lastScroll
        setTimeout(() => {
          lastScroll   = window.pageYOffset;
          ignoreScroll = false;
        }, 600);  // tweak this to match your smooth-scroll duration
      });
    });

  // 2) THE SCROLL HANDLER
  // --------------------------------
  window.addEventListener('scroll', () => {
    if (ignoreScroll) return;    // skip if we’re auto-scrolling

    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
      navbar.classList.replace('nav-hidden','nav-visible');
      lastScroll = currentScroll;
      return;
    }
    if (Math.abs(currentScroll - lastScroll) < threshold) return;

    if (currentScroll > lastScroll) {
      navbar.classList.replace('nav-visible','nav-hidden');
    } else {
      navbar.classList.replace('nav-hidden','nav-visible');
    }
    lastScroll = currentScroll;
  });

  // ── NO MORE AJAX FORM CODE ─────────────────────────────────────────────────
})();
// ── SECTION HIGHLIGHT ON SCROLL ────────────────────────────────────────────
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav__link, .nav__button');

const observerOptions = {
  root: null,            // viewport
  threshold: 0.6,        // 60% of the section must be visible
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.id;
    const link = document.querySelector(`.nav__link[href="#${id}"],
                                         .nav__button[href="#${id}"]`);
    if (!link) return;
    if (entry.isIntersecting) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}, observerOptions);

// start observing each section
sections.forEach(section => sectionObserver.observe(section));
