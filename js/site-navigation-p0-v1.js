// ===== MÂY YOGA — NAVIGATION P0 PATCH V1 =====
// Corrects course information architecture and restores contextual Header CTAs
// after the canonical navigation runtime has normalized the shared Header.
(function applyNavigationP0Patch() {
  'use strict';

  function resolveCurrentScript() {
    if (document.currentScript && document.currentScript.src) return document.currentScript;
    var scripts = document.querySelectorAll('script[src]');
    for (var index = scripts.length - 1; index >= 0; index -= 1) {
      if (/\/js\/site-navigation-p0-v1\.js(?:\?|$)/.test(scripts[index].src)) return scripts[index];
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

  function normalizePath(url) {
    try {
      var path = new URL(url, window.location.href).pathname;
      path = path.replace(/\/index\.html$/, '/');
      return path.replace(/\/{2,}/g, '/');
    } catch (error) {
      return '';
    }
  }

  function createMenuItem(href, label, className) {
    var item = document.createElement('li');
    if (className) item.className = className;

    var link = document.createElement('a');
    link.href = siteUrl(href);
    link.textContent = label;
    item.appendChild(link);
    return item;
  }

  function updateCourseMenu(navbar) {
    var courseDropdown = navbar.querySelector('#navLinks > .nav-dropdown');
    var menu = courseDropdown && courseDropdown.querySelector(':scope > .dropdown-menu');
    if (!courseDropdown || !menu) return;

    menu.replaceChildren(
      createMenuItem('hoc-yoga-online.html', '🌿 Yoga Online 1:1'),
      createMenuItem('dao-tao-huan-luyen-vien-200h.html', '🎓 Đào tạo YTT 200H'),
      createMenuItem('goc-huan-luyen-vien.html', '🦉 Góc Huấn Luyện Viên', 'nav-menu-divider')
    );

    var current = normalizePath(window.location.href);
    var coursePaths = [
      normalizePath(siteUrl('hoc-yoga-online.html')),
      normalizePath(siteUrl('dao-tao-huan-luyen-vien-200h.html')),
      normalizePath(siteUrl('goc-huan-luyen-vien.html'))
    ];

    courseDropdown.classList.toggle('has-current-child', coursePaths.indexOf(current) !== -1);
    menu.querySelectorAll('a[href]').forEach(function(link) {
      link.removeAttribute('aria-current');
      if (normalizePath(link.href) === current) link.setAttribute('aria-current', 'page');
    });

    var navLinks = navbar.querySelector('#navLinks');
    if (navLinks) navLinks.setAttribute('data-canonical-nav-version', '4-p0');
  }

  function pageCtaConfig() {
    var body = document.body;
    var explicitLabel = body && body.getAttribute('data-nav-cta-label');
    var explicitHref = body && body.getAttribute('data-nav-cta-href');
    var explicitTarget = body && body.getAttribute('data-nav-cta-target');
    var explicitRel = body && body.getAttribute('data-nav-cta-rel');

    if (explicitLabel || explicitHref) {
      return {
        label: explicitLabel || 'Khám phá ngay',
        href: explicitHref || siteUrl('index.html#categories'),
        target: explicitTarget || '',
        rel: explicitRel || ''
      };
    }

    var current = normalizePath(window.location.href);
    var routes = {};
    routes[normalizePath(siteUrl('hoc-yoga-online.html'))] = {
      label: 'Xem bảng giá',
      href: '#bang-gia'
    };
    routes[normalizePath(siteUrl('dao-tao-huan-luyen-vien-200h.html'))] = {
      label: 'Nhận tư vấn',
      href: '#lien-he'
    };
    routes[normalizePath(siteUrl('goc-huan-luyen-vien.html'))] = {
      label: 'Nhận tư vấn',
      href: '#ytt-register'
    };

    return routes[current] || null;
  }

  function updatePageCta(navbar) {
    var config = pageCtaConfig();
    if (!config) return;

    var wrap = navbar.querySelector('.nav-cta');
    if (!wrap) return;

    var link = wrap.querySelector('a');
    if (!link) {
      link = document.createElement('a');
      wrap.replaceChildren(link);
    }

    link.className = 'btn btn-primary btn-sm';
    link.removeAttribute('style');
    link.setAttribute('href', config.href);
    link.textContent = config.label;

    if (config.target) link.setAttribute('target', config.target);
    else link.removeAttribute('target');

    if (config.rel) link.setAttribute('rel', config.rel);
    else link.removeAttribute('rel');

    if (config.target === '_blank' && !config.rel) link.setAttribute('rel', 'noopener');
    wrap.setAttribute('data-contextual-cta', 'true');
  }

  function applyPatch() {
    var navbar = document.getElementById('navbar');
    if (!navbar || navbar.getAttribute('data-canonical-header-applied') !== 'true') return false;

    updateCourseMenu(navbar);
    updatePageCta(navbar);
    navbar.setAttribute('data-navigation-p0-applied', 'true');
    window.MAY_YOGA_NAVIGATION_P0_VERSION = '1';
    return true;
  }

  function applyWhenReady() {
    if (applyPatch()) return;

    var attempts = 0;
    function retry() {
      attempts += 1;
      if (applyPatch() || attempts >= 80) return;
      window.setTimeout(retry, 25);
    }
    retry();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyWhenReady, { once: true });
  } else {
    applyWhenReady();
  }
})();
