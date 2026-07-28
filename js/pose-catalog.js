// ===== MÂY YOGA — SHARED POSE CATALOG =====
// Exposes the pose dataset and URL helpers from one source for the library and search.
(function initPoseCatalog() {
  'use strict';

  if (window.MAY_YOGA_POSE_CATALOG) return;

  function resolveCurrentScript() {
    if (document.currentScript && document.currentScript.src) return document.currentScript;
    var scripts = document.querySelectorAll('script[src]');
    for (var index = scripts.length - 1; index >= 0; index -= 1) {
      if (/\/js\/pose-catalog\.js(?:\?|$)/.test(scripts[index].src)) return scripts[index];
    }
    return null;
  }

  var currentScript = resolveCurrentScript();
  var siteRoot = currentScript && currentScript.src
    ? new URL('../', currentScript.src)
    : new URL(window.MAY_YOGA_SITE_ROOT || '/', window.location.href);

  var slugOverrides = {
    'Tư thế Cày': 'tu-the-cay-halasana'
  };

  function slugifyVietnamese(value) {
    return String(value || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }

  function slugForPose(name) {
    return slugOverrides[name] || slugifyVietnamese(name);
  }

  function publishCatalog() {
    if (typeof POSES === 'undefined' || typeof POSE_CATEGORIES === 'undefined') return false;

    var categories = Array.prototype.slice.call(POSE_CATEGORIES);
    var poses = Array.prototype.slice.call(POSES);
    var categoryNames = {};
    categories.forEach(function(category) {
      categoryNames[category.id] = category.name;
    });

    window.MAY_YOGA_POSE_CATALOG = {
      categories: categories,
      poses: poses,
      count: poses.length,
      categoryNames: categoryNames,
      slugFor: slugForPose,
      urlFor: function(name) {
        return 'tu-the/' + slugForPose(name) + '.html';
      }
    };

    window.dispatchEvent(new CustomEvent('mayyoga:pose-catalog-ready', {
      detail: { count: poses.length }
    }));
    return true;
  }

  if (publishCatalog()) return;

  var existingDataScript = Array.prototype.find.call(document.querySelectorAll('script[src]'), function(script) {
    return /\/js\/poses-data\.js(?:\?|$)/.test(script.src);
  });

  function handleDataReady() {
    if (!publishCatalog()) {
      console.error('Mây Yoga: poses-data.js loaded without a usable pose dataset.');
    }
  }

  if (existingDataScript) {
    existingDataScript.addEventListener('load', handleDataReady, { once: true });
    window.setTimeout(handleDataReady, 0);
    return;
  }

  var dataScript = document.createElement('script');
  dataScript.src = new URL('js/poses-data.js?v=20260728a', siteRoot).href;
  dataScript.async = false;
  dataScript.setAttribute('data-pose-data-source', 'true');
  dataScript.addEventListener('load', handleDataReady, { once: true });
  document.head.appendChild(dataScript);
})();
