// ===== MÂY YOGA — NAVIGATION PRIORITY PATCH V2 =====
// Applies the approved P0/P1 information architecture after the canonical
// navigation runtime has normalized the shared Header.
(function applyNavigationPriorityPatch() {
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

  function markMenuState(dropdown, current, sectionActive) {
    if (!dropdown) return;
    dropdown.classList.toggle('has-current-child', Boolean(sectionActive));
    dropdown.querySelectorAll('.dropdown-menu a[href]').forEach(function(link) {
      link.removeAttribute('aria-current');
      if (normalizePath(link.href) === current) link.setAttribute('aria-current', 'page');
    });
  }

  function updateCourseMenu(navbar) {
    var dropdowns = navbar.querySelectorAll('#navLinks > .nav-dropdown');
    var courseDropdown = dropdowns[0];
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
    markMenuState(courseDropdown, current, coursePaths.indexOf(current) !== -1);
  }

  function updateKnowledgeMenu(navbar) {
    var dropdowns = navbar.querySelectorAll('#navLinks > .nav-dropdown');
    var knowledgeDropdown = dropdowns[1];
    var menu = knowledgeDropdown && knowledgeDropdown.querySelector(':scope > .dropdown-menu');
    if (!knowledgeDropdown || !menu) return;

    menu.replaceChildren(
      createMenuItem('bai-viet/yoga-cho-nguoi-moi.html', '🌱 Yoga cho người mới'),
      createMenuItem('hatha-yoga.html', '🌿 Hatha Yoga'),
      createMenuItem('tu-the-yoga.html', '🧘 88 Tư thế Yoga'),
      createMenuItem('pranayama.html', '🌬️ Pranayama'),
      createMenuItem('thien-dinh.html', '🕊️ Thiền định'),
      createMenuItem('giai-phau-yoga.html', '🫀 Giải phẫu Yoga'),
      createMenuItem('tu-tap-tai-nha.html', '🏠 Tự tập tại nhà', 'nav-menu-divider')
    );

    var current = normalizePath(window.location.href);
    var articleRoot = normalizePath(siteUrl('bai-viet/'));
    var poseRoot = normalizePath(siteUrl('tu-the/'));
    var hubPaths = [
      'tu-the-yoga.html',
      'hatha-yoga.html',
      'pranayama.html',
      'thien-dinh.html',
      'giai-phau-yoga.html',
      'tu-tap-tai-nha.html'
    ].map(function(path) { return normalizePath(siteUrl(path)); });

    var sectionActive = current.indexOf(articleRoot) === 0 ||
      current.indexOf(poseRoot) === 0 ||
      hubPaths.indexOf(current) !== -1;
    markMenuState(knowledgeDropdown, current, sectionActive);

    var navLinks = navbar.querySelector('#navLinks');
    if (navLinks) navLinks.setAttribute('data-canonical-nav-version', '5-p1');
  }

  function normalizePoseCountText(value) {
    if (!value || value.indexOf('90') === -1) return value;
    return value
      .replace(/\b90\+\s+([Tt]ư thế(?:\s+Yoga)?)/g, '88 $1')
      .replace(/\b90\s+([Tt]ư thế(?:\s+Yoga)?)/g, '88 $1');
  }

  function syncPoseCount() {
    document.title = normalizePoseCountText(document.title);

    document.querySelectorAll('meta[content]').forEach(function(meta) {
      var content = meta.getAttribute('content');
      var normalized = normalizePoseCountText(content);
      if (normalized !== content) meta.setAttribute('content', normalized);
    });

    if (document.body) {
      var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
        acceptNode: function(node) {
          var parent = node.parentElement;
          if (!parent || parent.closest('script, style, noscript, textarea')) return NodeFilter.FILTER_REJECT;
          return node.data.indexOf('90') === -1 ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
        }
      });
      var nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);
      nodes.forEach(function(node) {
        node.data = normalizePoseCountText(node.data);
      });
    }

    document.querySelectorAll('[aria-label], [title], img[alt]').forEach(function(element) {
      ['aria-label', 'title', 'alt'].forEach(function(attribute) {
        if (!element.hasAttribute(attribute)) return;
        var value = element.getAttribute(attribute);
        var normalized = normalizePoseCountText(value);
        if (normalized !== value) element.setAttribute(attribute, normalized);
      });
    });

    if (normalizePath(window.location.href) === normalizePath(siteUrl('tu-the-yoga.html'))) {
      var poseTotal = document.querySelector('.poses-hero .stat-row .stat:first-child .stat-num');
      if (poseTotal) poseTotal.textContent = '88';
    }
  }

  function syncQuizMetadata() {
    if (normalizePath(window.location.href) !== normalizePath(siteUrl('trac-nghiem.html'))) return;
    var description = 'Khám phá 5 bài trắc nghiệm Yoga giúp tự đánh giá thể trạng, luân xa, sức khỏe và tiến trình Yoga trị liệu.';
    var selectors = [
      'meta[name="description"]',
      'meta[property="og:description"]',
      'meta[name="twitter:description"]'
    ];
    selectors.forEach(function(selector) {
      var meta = document.querySelector(selector);
      if (meta) meta.setAttribute('content', description);
    });
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
    updateKnowledgeMenu(navbar);
    updatePageCta(navbar);
    syncPoseCount();
    syncQuizMetadata();
    navbar.setAttribute('data-navigation-priority-applied', 'true');
    window.MAY_YOGA_NAVIGATION_P0_VERSION = '2';
    window.MAY_YOGA_NAVIGATION_PRIORITY_VERSION = '2';
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