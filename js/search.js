// ===== MÂY YOGA — SEARCH + SHARED CHROME ENTRY =====
// Preserve the existing search implementation in search-base.js while guaranteeing
// that fallback pages load the same canonical Header runtime as every other page.
(function loadSearchAndCanonicalChrome() {
  'use strict';

  function resolveCurrentScript() {
    if (document.currentScript && document.currentScript.src) return document.currentScript;
    var scripts = document.querySelectorAll('script[src]');
    for (var i = scripts.length - 1; i >= 0; i--) {
      if (/\/js\/search\.js(?:\?|$)/.test(scripts[i].src)) return scripts[i];
    }
    return null;
  }

  var currentScript = resolveCurrentScript();
  var siteRoot = currentScript && currentScript.src
    ? new URL('../', currentScript.src)
    : new URL(window.MAY_YOGA_SITE_ROOT || '/', window.location.href);

  function siteUrl(path) {
    return new URL(path, siteRoot).href;
  }

  window.MAY_YOGA_SITE_ROOT = siteRoot.href;

  function markSharedStyleEntry() {
    var sentinel = window.getComputedStyle(document.documentElement)
      .getPropertyValue('--may-yoga-canonical-style-entry')
      .trim();
    if (sentinel !== '1') return;

    var styleLink = Array.prototype.find.call(document.querySelectorAll('link[rel="stylesheet"][href]'), function(link) {
      return /\/css\/style\.css(?:\?|$)/.test(link.href);
    });
    if (!styleLink) return;

    styleLink.setAttribute('data-header-first-paint', 'true');
    styleLink.setAttribute('data-header-index-canonical', 'true');
    styleLink.setAttribute('data-site-navigation-canonical', 'true');
    styleLink.setAttribute('data-page-entry-motion-off', 'true');
  }

  function removeLegacyNavigationLoaders() {
    document.querySelectorAll('script[src*="/js/site-navigation-canonical-v2.js"]').forEach(function(script) {
      script.remove();
    });
  }

  function ensureCanonicalNavigation() {
    if (document.querySelector('script[data-site-navigation-canonical-v3]')) return;
    removeLegacyNavigationLoaders();

    var script = document.createElement('script');
    script.src = siteUrl('js/site-navigation-canonical-v3.js?v=20260726a');
    script.async = false;
    script.setAttribute('data-site-navigation-canonical', 'true');
    script.setAttribute('data-site-navigation-canonical-v3', 'true');
    document.head.appendChild(script);
  }

  function ensureSiteChrome() {
    if (document.querySelector('script[data-site-chrome-standard]')) return;
    var script = document.createElement('script');
    script.src = siteUrl('js/site-chrome.js?v=20260726d');
    script.async = false;
    script.setAttribute('data-site-chrome-standard', 'true');
    document.head.appendChild(script);
  }

  function loadSearchBase() {
    if (document.querySelector('script[data-search-base]')) return;
    var script = document.createElement('script');
    script.src = siteUrl('js/search-base.js?v=20260726a');
    script.async = false;
    script.setAttribute('data-search-base', 'true');
    document.head.appendChild(script);
  }

  markSharedStyleEntry();
  ensureCanonicalNavigation();
  ensureSiteChrome();
  loadSearchBase();
})();
