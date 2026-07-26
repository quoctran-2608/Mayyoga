// ===== Mây Yoga — Main Bootstrap =====
// Header/menu ownership belongs exclusively to site-navigation-canonical-v3.js.
(function bootstrapMayYoga() {
  'use strict';

  function resolveCurrentScript() {
    if (document.currentScript && document.currentScript.src) return document.currentScript;
    var scripts = document.querySelectorAll('script[src]');
    for (var i = scripts.length - 1; i >= 0; i--) {
      if (/\/js\/main\.js(?:\?|$)/.test(scripts[i].src)) return scripts[i];
    }
    return null;
  }

  var currentScript = resolveCurrentScript();
  var siteRoot = currentScript && currentScript.src
    ? new URL('../', currentScript.src)
    : new URL('/', window.location.href);

  function siteUrl(path) {
    return new URL(path, siteRoot).href;
  }

  window.MAY_YOGA_SITE_ROOT = siteRoot.href;

  function hasCanonicalStyleEntry() {
    return window.getComputedStyle(document.documentElement)
      .getPropertyValue('--may-yoga-canonical-style-entry')
      .trim() === '1';
  }

  function markSharedStyleEntry() {
    if (!hasCanonicalStyleEntry()) return false;

    var styleLink = Array.prototype.find.call(document.querySelectorAll('link[rel="stylesheet"][href]'), function(link) {
      return /\/css\/style\.css(?:\?|$)/.test(link.href);
    });
    if (!styleLink) return false;

    styleLink.setAttribute('data-header-first-paint', 'true');
    styleLink.setAttribute('data-header-index-canonical', 'true');
    styleLink.setAttribute('data-site-navigation-canonical', 'true');
    styleLink.setAttribute('data-page-entry-motion-off', 'true');
    return true;
  }

  function primeHeaderShell() {
    var navbar = document.getElementById('navbar');
    if (!navbar) return;
    navbar.classList.add('site-header-standard', 'scrolled');
    navbar.setAttribute('data-site-header-standard', 'true');
  }

  function removeLegacyNavigationLoaders() {
    document.querySelectorAll('script[src*="/js/site-navigation-canonical-v2.js"]').forEach(function(script) {
      script.remove();
    });
  }

  function loadCanonicalNavigation() {
    if (document.querySelector('script[data-site-navigation-canonical-v3]')) return;
    removeLegacyNavigationLoaders();

    var script = document.createElement('script');
    script.src = siteUrl('js/site-navigation-canonical-v3.js?v=20260726a');
    script.async = false;
    script.setAttribute('data-site-navigation-canonical', 'true');
    script.setAttribute('data-site-navigation-canonical-v3', 'true');
    document.head.appendChild(script);
  }

  function loadSiteChrome() {
    if (document.querySelector('script[data-site-chrome-standard]')) return;
    var script = document.createElement('script');
    script.src = siteUrl('js/site-chrome.js?v=20260726f');
    script.async = false;
    script.setAttribute('data-site-chrome-standard', 'true');
    document.head.appendChild(script);
  }

  function onReady(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback, { once: true });
    } else {
      callback();
    }
  }

  function initSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
      anchor.addEventListener('click', function(event) {
        var href = anchor.getAttribute('href');
        if (!href || href === '#') return;

        var target;
        try {
          target = document.querySelector(href);
        } catch (error) {
          return;
        }
        if (!target) return;

        event.preventDefault();
        var navbar = document.getElementById('navbar');
        var offset = (navbar ? navbar.offsetHeight : 0) + 20;
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      });
    });
  }

  function initHoverHints() {
    document.querySelectorAll('.category-card, .course-card, .pose-card, .blog-card').forEach(function(card) {
      card.addEventListener('mouseenter', function() { card.style.willChange = 'transform'; });
      card.addEventListener('mouseleave', function() { card.style.willChange = 'auto'; });
    });
  }

  function initNewsletter() {
    var form = document.querySelector('.newsletter-form');
    if (!form) return;

    form.addEventListener('submit', function(event) {
      event.preventDefault();
      var input = form.querySelector('input');
      var button = form.querySelector('button');
      var email = input ? input.value.trim() : '';
      if (!input || !button || email.indexOf('@') === -1) return;

      button.textContent = '✓ Đã đăng ký!';
      button.style.background = 'var(--mint-400)';
      input.value = '';
      window.setTimeout(function() {
        button.textContent = 'Đăng ký';
        button.style.background = '';
      }, 3000);
    });
  }

  markSharedStyleEntry();
  primeHeaderShell();
  loadCanonicalNavigation();
  loadSiteChrome();

  onReady(function() {
    initSmoothAnchors();
    initHoverHints();
    initNewsletter();
  });
})();
