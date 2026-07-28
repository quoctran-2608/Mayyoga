// ===== MÂY YOGA — LEGACY SEARCH SHIM =====
// Kept for cached or legacy HTML. Search behavior now lives only in search.js.
(function forwardLegacySearchBase() {
  'use strict';

  if (window.MAY_YOGA_SEARCH_VERSION || document.querySelector('script[data-search-engine-v2]')) return;

  var current = document.currentScript;
  var siteRoot = current && current.src
    ? new URL('../', current.src)
    : new URL(window.MAY_YOGA_SITE_ROOT || '/', window.location.href);

  var script = document.createElement('script');
  script.src = new URL('js/search.js?v=20260728b', siteRoot).href;
  script.async = false;
  script.setAttribute('data-search-engine-v2', 'true');
  document.head.appendChild(script);
})();
