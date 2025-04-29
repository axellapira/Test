// index.js
(function(){
  // ── NAVBAR SHOW/HIDE ON SCROLL ─────────────────────────────────────────────
  const navbar   = document.getElementById('navbar');
  let   lastScroll = window.pageYOffset;
  const threshold  = 15; // px before toggling

  window.addEventListener('scroll', () => {
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
