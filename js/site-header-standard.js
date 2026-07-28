// ===== MÂY YOGA — RETIRED SITE HEADER SHIM =====
// Kept only for cached or legacy HTML. Canonical navigation now lives in V6.
(function forwardRetiredSiteHeaderStandard() {
  'use strict';

  if (document.querySelector('script[data-site-navigation-canonical-v3]')) return;

  var current = document.currentScript;
  if (!current || !current.src) {
    var scripts = document.querySelectorAll('script[src]');
    for (var index = scripts.length - 1; index >= 0; index -= 1) {
      if (/\/js\/site-header-standard\.js(?:\?|$)/.test(scripts[index].src)) {
        current = scripts[index];
        break;
      }
    }
  }

  var siteRoot = current && current.src
    ? new URL('../', current.src)
    : new URL(window.MAY_YOGA_SITE_ROOT || '/', window.location.href);

  var script = document.createElement('script');
  script.src = new URL('js/site-navigation-canonical-v3.js?v=20260728b', siteRoot).href;
  script.async = false;
  script.setAttribute('data-site-navigation-canonical', 'true');
  script.setAttribute('data-site-navigation-canonical-v3', 'true');
  document.head.appendChild(script);
})();
