// ===== MÂY YOGA — NAVIGATION V2 COMPATIBILITY SHIM =====
// Legacy HTML may still request this filename. Forward it to the single v3 runtime;
// no Header markup, interaction logic or page-specific dependency lives here.
(function forwardToCanonicalNavigationV3() {
  'use strict';

  if (document.querySelector('script[data-site-navigation-canonical-v3]')) return;

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

  var script = document.createElement('script');
  script.src = new URL('js/site-navigation-canonical-v3.js?v=20260726a', siteRoot).href;
  script.async = false;
  script.setAttribute('data-site-navigation-canonical', 'true');
  script.setAttribute('data-site-navigation-canonical-v3', 'true');
  document.head.appendChild(script);
})();