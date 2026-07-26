// ===== MÂY YOGA — HOMEPAGE V1 =====
// Owns only the homepage practice carousel controls.
(function initHomepageCarousel() {
  'use strict';

  function setupCarousel(root) {
    var track = root.querySelector('[data-home-carousel-track]');
    var previous = root.querySelector('[data-home-carousel-direction="previous"]');
    var next = root.querySelector('[data-home-carousel-direction="next"]');
    if (!track || !previous || !next) return;

    function scrollAmount() {
      var card = track.querySelector('.home-practice-card');
      if (!card) return Math.max(280, track.clientWidth * 0.82);

      var styles = window.getComputedStyle(track);
      var gap = parseFloat(styles.columnGap || styles.gap) || 0;
      return card.getBoundingClientRect().width + gap;
    }

    function updateControls() {
      var maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
      previous.disabled = track.scrollLeft <= 2;
      next.disabled = track.scrollLeft >= maxScroll - 2;
    }

    previous.addEventListener('click', function () {
      track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
    });

    next.addEventListener('click', function () {
      track.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
    });

    track.addEventListener('scroll', updateControls, { passive: true });
    window.addEventListener('resize', updateControls, { passive: true });
    updateControls();
  }

  function initialize() {
    document.querySelectorAll('[data-home-carousel]').forEach(setupCarousel);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize, { once: true });
  } else {
    initialize();
  }
})();
