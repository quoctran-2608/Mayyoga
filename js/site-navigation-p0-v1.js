// ===== MÂY YOGA — RETIRED NAVIGATION PATCH SHIM =====
// Kept only for cached or legacy HTML. All navigation logic lives in the V6 canonical component.
(function forwardLegacyNavigationPatch() {
  'use strict';

  if (document.querySelector('script[data-site-navigation-canonical-v3]')) return;

  var current = document.currentScript;
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
