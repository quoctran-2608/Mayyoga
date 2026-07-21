// ===== MÂY YOGA — MOBILE PRACTICE CAROUSEL DISCOVERY V3 =====
// Adds a compact swipe hint + live progress indicator without intercepting native scrolling.
(function initPracticeMobileDiscovery() {
  'use strict';

  function init() {
    var carousel = document.querySelector('#hanh-trinh .practice-carousel');
    var track = carousel && carousel.querySelector('#carouselTrack');
    if (!carousel || !track) return;

    var cards = Array.prototype.slice.call(track.querySelectorAll('.carousel-card'));
    if (cards.length < 2) return;

    var meta = carousel.querySelector('.practice-mobile-meta');
    if (!meta) {
      meta = document.createElement('div');
      meta.className = 'practice-mobile-meta';
      meta.setAttribute('aria-label', 'Tiến trình danh sách bài tập');
      meta.innerHTML =
        '<span class="practice-swipe-hint">Vuốt để xem thêm <span class="practice-hint-arrow" aria-hidden="true">→</span></span>' +
        '<span class="practice-progress" aria-hidden="true"><span class="practice-progress-bar"></span></span>' +
        '<span class="practice-progress-count" aria-live="polite"></span>';
      carousel.appendChild(meta);
    }

    var hint = meta.querySelector('.practice-swipe-hint');
    var bar = meta.querySelector('.practice-progress-bar');
    var count = meta.querySelector('.practice-progress-count');
    var media = window.matchMedia('(max-width: 768px)');
    var raf = 0;

    function nearestCardIndex() {
      var target = track.scrollLeft + 16;
      var bestIndex = 0;
      var bestDistance = Infinity;

      cards.forEach(function(card, index) {
        var distance = Math.abs(card.offsetLeft - target);
        if (distance < bestDistance) {
          bestDistance = distance;
          bestIndex = index;
        }
      });

      return bestIndex;
    }

    function update() {
      raf = 0;
      var index = nearestCardIndex();
      var seen = index + 1;
      var percent = Math.max((seen / cards.length) * 100, 8);

      if (count) count.textContent = seen + ' / ' + cards.length;
      if (bar) bar.style.width = percent + '%';

      carousel.classList.toggle('is-scrolled', track.scrollLeft > 8);
      carousel.classList.toggle('is-at-end', seen >= cards.length);

      if (hint) {
        hint.firstChild.nodeValue = seen >= cards.length ? 'Đã xem hết ' : 'Vuốt để xem thêm ';
      }
    }

    function requestUpdate() {
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    }

    function syncMode() {
      meta.style.display = media.matches ? '' : 'none';
      if (media.matches) requestUpdate();
    }

    track.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate, { passive: true });

    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', syncMode);
    } else if (typeof media.addListener === 'function') {
      media.addListener(syncMode);
    }

    syncMode();
    update();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
