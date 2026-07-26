// ===== MÂY YOGA — NAVIGATION V2 COMPATIBILITY SHIM =====
// Legacy HTML may still request this filename. Forward it to the single v3 runtime
// and load narrowly scoped page dependencies required by those legacy documents.
(function forwardToCanonicalNavigationV3() {
  'use strict';

  var current = document.currentScript;
  if (!current || !current.src) {
    var scripts = document.querySelectorAll('script[src]');
    for (var i = scripts.length - 1; i >= 0; i--) {
      if (/\/js\/site-navigation-canonical-v2\.js(?:\?|$)/.test(scripts[i].src)) {
        current = scripts[i];
        break;
      }
    }
  }

  var siteRoot = current && current.src
    ? new URL('../', current.src)
    : new URL(window.MAY_YOGA_SITE_ROOT || '/', window.location.href);

  function siteUrl(path) {
    return new URL(path, siteRoot).href;
  }

  function loadLegacyPageDependencies() {
    var path = window.location.pathname.replace(/\/+$/, '');

    if (/\/dao-tao-huan-luyen-vien-200h\.html$/i.test(path) &&
        !document.querySelector('link[data-ytt200-mobile-hero]')) {
      var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = siteUrl('css/ytt-200h-mobile-hero-v1.css?v=20260726a');
      link.media = '(max-width: 768px)';
      link.setAttribute('data-ytt200-mobile-hero', 'true');
      document.head.appendChild(link);
    }
  }

  loadLegacyPageDependencies();

  if (document.querySelector('script[data-site-navigation-canonical-v3]')) return;

  var script = document.createElement('script');
  script.src = siteUrl('js/site-navigation-canonical-v3.js?v=20260726a');
  script.async = false;
  script.setAttribute('data-site-navigation-canonical', 'true');
  script.setAttribute('data-site-navigation-canonical-v3', 'true');
  document.head.appendChild(script);
})();
