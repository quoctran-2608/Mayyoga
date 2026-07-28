// ===== MÂY YOGA — CANONICAL SITE NAVIGATION V5 =====
// Single structural and behavioral source of truth for every public page.
(function canonicalSiteNavigation() {
  'use strict';

  function resolveCurrentScript() {
    if (document.currentScript && document.currentScript.src) return document.currentScript;
    var scripts = document.querySelectorAll('script[src]');
    for (var i = scripts.length - 1; i >= 0; i--) {
      if (/\/js\/site-navigation-canonical-v(?:2|3)\.js(?:\?|$)/.test(scripts[i].src)) return scripts[i];
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

  function hasStylesheet(filename) {
    return Array.prototype.some.call(document.querySelectorAll('link[rel="stylesheet"][href]'), function(link) {
      return link.href.indexOf('/css/' + filename) !== -1;
    });
  }

  function ensureStylesheet(filename, version, marker) {
    if (hasStylesheet(filename) || document.querySelector('link[' + marker + ']')) return;
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = siteUrl('css/' + filename + '?v=' + version);
    link.setAttribute(marker, 'true');
    document.head.appendChild(link);
  }

  function ensureStyles() {
    ensureStylesheet('header-first-paint-v1.css', '20260726a', 'data-header-first-paint');
    ensureStylesheet('header-index-canonical-v3.css', '20260726d', 'data-header-index-canonical');
    ensureStylesheet('site-navigation-canonical-v4.css', '20260726b', 'data-site-navigation-canonical');
  }

  function ensureNavbar() {
    var navbar = document.getElementById('navbar');
    if (!navbar) {
      navbar = document.createElement('nav');
      navbar.id = 'navbar';
      document.body.insertBefore(navbar, document.body.firstChild);
    }
    navbar.className = 'navbar site-header-standard scrolled';
    navbar.setAttribute('data-site-header-standard', 'true');
    return navbar;
  }

  function ensureContainer(navbar) {
    var container = navbar.querySelector(':scope > .container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'container';
      navbar.replaceChildren(container);
    }
    container.classList.remove('nav-container');
    return container;
  }

  function ensureLogo(container) {
    var logo = container.querySelector('.nav-logo');
    if (!logo) logo = document.createElement('a');
    logo.href = siteUrl('index.html');
    logo.className = 'nav-logo';
    logo.removeAttribute('style');

    var image = logo.querySelector('.logo-img');
    if (!image) {
      image = document.createElement('img');
      logo.replaceChildren(image);
    }
    image.className = 'logo-img';
    image.src = siteUrl('assets/images/logo.webp');
    image.alt = 'Mây Yoga';
    image.width = 120;
    image.height = 84;
    return logo;
  }

  function canonicalNavMarkup() {
    return [
      '<li><a href="' + siteUrl('index.html') + '">Trang chủ</a></li>',
      '<li><a href="' + siteUrl('ve-may-yoga.html') + '">Về Mây Yoga</a></li>',
      '<li class="nav-dropdown">',
      '  <a href="' + siteUrl('hoc-yoga-online.html') + '" class="dropdown-toggle" aria-haspopup="true" aria-expanded="false">Các khoá học <span class="chevron" aria-hidden="true">▾</span></a>',
      '  <ul class="dropdown-menu">',
      '    <li><a href="' + siteUrl('hoc-yoga-online.html') + '">🌿 Yoga Online 1:1</a></li>',
      '    <li><a href="' + siteUrl('dao-tao-huan-luyen-vien-200h.html') + '">🎓 Đào tạo YTT 200H</a></li>',
      '    <li class="nav-menu-divider"><a href="' + siteUrl('goc-huan-luyen-vien.html') + '">🦉 Góc Huấn Luyện Viên</a></li>',
      '  </ul>',
      '</li>',
      '<li class="nav-dropdown">',
      '  <a href="' + siteUrl('bai-viet/yoga-cho-nguoi-moi.html') + '" class="dropdown-toggle" aria-haspopup="true" aria-expanded="false">Kiến thức Yoga <span class="chevron" aria-hidden="true">▾</span></a>',
      '  <ul class="dropdown-menu">',
      '    <li><a href="' + siteUrl('bai-viet/yoga-cho-nguoi-moi.html') + '">🌱 Yoga cho người mới</a></li>',
      '    <li><a href="' + siteUrl('hatha-yoga.html') + '">🌿 Hatha Yoga</a></li>',
      '    <li><a href="' + siteUrl('tu-the-yoga.html') + '">🧘 88 Tư thế Yoga</a></li>',
      '    <li><a href="' + siteUrl('pranayama.html') + '">🌬️ Pranayama</a></li>',
      '    <li><a href="' + siteUrl('thien-dinh.html') + '">🕊️ Thiền định</a></li>',
      '    <li><a href="' + siteUrl('giai-phau-yoga.html') + '">🫀 Giải phẫu Yoga</a></li>',
      '    <li class="nav-menu-divider"><a href="' + siteUrl('tu-tap-tai-nha.html') + '">🏠 Tự tập tại nhà</a></li>',
      '  </ul>',
      '</li>',
      '<li><a href="' + siteUrl('trac-nghiem.html') + '">Trắc nghiệm</a></li>'
    ].join('');
  }

  function ensureNavLinks(container) {
    var navLinks = container.querySelector('#navLinks');
    if (!navLinks) {
      navLinks = document.createElement('ul');
      navLinks.id = 'navLinks';
    }
    navLinks.className = 'nav-links';
    navLinks.innerHTML = canonicalNavMarkup();
    navLinks.setAttribute('data-canonical-nav-version', '5');
    return navLinks;
  }

  function ensureSearch(container) {
    var search = container.querySelector('#navSearch');
    if (!search) {
      search = document.createElement('div');
      search.id = 'navSearch';
    }
    search.className = 'nav-search';
    search.setAttribute('data-site-search-standard', 'true');

    var input = search.querySelector('#globalSearch');
    if (!input) {
      input = document.createElement('input');
      input.id = 'globalSearch';
      input.type = 'text';
      search.prepend(input);
    }
    input.placeholder = '🔍 Tìm tư thế, bài viết...';
    input.autocomplete = 'off';

    var dropdown = search.querySelector('#searchDropdown');
    if (!dropdown) {
      dropdown = document.createElement('div');
      dropdown.id = 'searchDropdown';
      search.appendChild(dropdown);
    }
    dropdown.className = 'search-dropdown';
    return search;
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
    routes[normalizePath(siteUrl('hoc-yoga-online.html'))] = { label: 'Xem bảng giá', href: '#bang-gia' };
    routes[normalizePath(siteUrl('dao-tao-huan-luyen-vien-200h.html'))] = { label: 'Nhận tư vấn', href: '#lien-he' };
    routes[normalizePath(siteUrl('goc-huan-luyen-vien.html'))] = { label: 'Nhận tư vấn', href: '#ytt-register' };

    return routes[current] || {
      label: 'Khám phá ngay',
      href: siteUrl('index.html#categories'),
      target: '',
      rel: ''
    };
  }

  function ensureCta(container) {
    var ctaWrap = container.querySelector('.nav-cta');
    if (!ctaWrap) ctaWrap = document.createElement('div');
    ctaWrap.className = 'nav-cta';

    var config = pageCtaConfig();
    var link = ctaWrap.querySelector('a');
    if (!link) {
      link = document.createElement('a');
      ctaWrap.replaceChildren(link);
    }
    link.className = 'btn btn-primary btn-sm';
    link.removeAttribute('style');
    link.href = config.href;
    link.textContent = config.label;

    if (config.target) link.setAttribute('target', config.target);
    else link.removeAttribute('target');
    if (config.rel) link.setAttribute('rel', config.rel);
    else link.removeAttribute('rel');
    if (config.target === '_blank' && !config.rel) link.setAttribute('rel', 'noopener');

    ctaWrap.setAttribute('data-contextual-cta', 'true');
    return ctaWrap;
  }

  function ensureToggle(container) {
    var oldToggle = container.querySelector('#mobileToggle');
    var toggle = oldToggle ? oldToggle.cloneNode(false) : document.createElement('button');
    toggle.id = 'mobileToggle';
    toggle.className = 'mobile-toggle';
    toggle.type = 'button';
    toggle.setAttribute('aria-label', 'Mở menu chính');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.innerHTML = '<span></span><span></span><span></span>';
    return toggle;
  }

  function orderHeader(container, nodes) {
    var keep = nodes.filter(Boolean);
    Array.prototype.slice.call(container.children).forEach(function(child) {
      if (keep.indexOf(child) === -1) child.remove();
    });
    keep.forEach(function(node) { container.appendChild(node); });
  }

  function markActive(navLinks) {
    var current = normalizePath(window.location.href);
    var knowledgeRoot = normalizePath(siteUrl('bai-viet/'));
    var poseRoot = normalizePath(siteUrl('tu-the/'));
    var quizRoot = normalizePath(siteUrl('trac-nghiem/'));
    var knowledgePages = [
      'tu-the-yoga.html', 'hatha-yoga.html', 'thien-dinh.html', 'pranayama.html',
      'giai-phau-yoga.html', 'tu-tap-tai-nha.html'
    ].map(function(path) { return normalizePath(siteUrl(path)); });
    var coursePages = [
      'hoc-yoga-online.html', 'goc-huan-luyen-vien.html', 'dao-tao-huan-luyen-vien-200h.html'
    ].map(function(path) { return normalizePath(siteUrl(path)); });

    navLinks.querySelectorAll('a[aria-current]').forEach(function(link) { link.removeAttribute('aria-current'); });
    navLinks.querySelectorAll('.has-current-child').forEach(function(item) { item.classList.remove('has-current-child'); });

    navLinks.querySelectorAll('a[href]').forEach(function(link) {
      if (link.classList.contains('dropdown-toggle')) return;
      if (normalizePath(link.href) === current) {
        link.setAttribute('aria-current', 'page');
        var parent = link.closest('.nav-dropdown');
        if (parent) parent.classList.add('has-current-child');
      }
    });

    var dropdowns = navLinks.querySelectorAll(':scope > .nav-dropdown');
    if (current.indexOf(knowledgeRoot) === 0 || current.indexOf(poseRoot) === 0 || knowledgePages.indexOf(current) !== -1) {
      if (dropdowns[1]) dropdowns[1].classList.add('has-current-child');
    }
    if (coursePages.indexOf(current) !== -1 && dropdowns[0]) dropdowns[0].classList.add('has-current-child');

    if (current.indexOf(quizRoot) === 0) {
      var quizLink = navLinks.querySelector(':scope > li:last-child > a');
      if (quizLink) quizLink.setAttribute('aria-current', 'page');
    }
  }

  function normalizePoseCountText(value) {
    if (!value || value.indexOf('90') === -1) return value;
    return value
      .replace(/\b90\+\s+([Tt]ư thế(?:\s+Yoga)?)/g, '88 $1')
      .replace(/\b90\s+([Tt]ư thế(?:\s+Yoga)?)/g, '88 $1');
  }

  function syncPublicContentMetadata() {
    document.title = normalizePoseCountText(document.title);
    document.querySelectorAll('meta[content]').forEach(function(meta) {
      var value = meta.getAttribute('content');
      var normalized = normalizePoseCountText(value);
      if (normalized !== value) meta.setAttribute('content', normalized);
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
      nodes.forEach(function(node) { node.data = normalizePoseCountText(node.data); });
    }

    if (normalizePath(window.location.href) === normalizePath(siteUrl('tu-the-yoga.html'))) {
      var poseTotal = document.querySelector('.poses-hero .stat-row .stat:first-child .stat-num');
      if (poseTotal) poseTotal.textContent = '88';
    }

    if (normalizePath(window.location.href) === normalizePath(siteUrl('trac-nghiem.html'))) {
      var description = 'Khám phá 5 bài trắc nghiệm Yoga giúp tự đánh giá thể trạng, luân xa, sức khỏe và tiến trình Yoga trị liệu.';
      ['meta[name="description"]', 'meta[property="og:description"]', 'meta[name="twitter:description"]'].forEach(function(selector) {
        var meta = document.querySelector(selector);
        if (meta) meta.setAttribute('content', description);
      });
    }
  }

  function isCompactInteraction() {
    return window.matchMedia('(max-width:980px)').matches ||
      window.matchMedia('(hover:none)').matches ||
      window.matchMedia('(pointer:coarse)').matches;
  }

  function closeDropdown(dropdown) {
    if (!dropdown) return;
    dropdown.classList.remove('active');
    var toggle = dropdown.querySelector(':scope > .dropdown-toggle');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  }

  function closeHeaderMenus(navbar) {
    if (!navbar) return;
    var navLinks = navbar.querySelector('#navLinks');
    var menuButton = navbar.querySelector('#mobileToggle');
    if (navLinks) navLinks.classList.remove('active');
    if (menuButton) {
      menuButton.classList.remove('active');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Mở menu chính');
    }
    navbar.querySelectorAll('#navLinks > .nav-dropdown').forEach(closeDropdown);
  }

  function bindInteractions() {
    if (window.__mayYogaCanonicalNavigationBound) return;
    window.__mayYogaCanonicalNavigationBound = true;

    document.addEventListener('click', function(event) {
      var navbar = event.target.closest('#navbar.site-header-standard');
      var menuButton = event.target.closest('#navbar.site-header-standard #mobileToggle');

      if (menuButton) {
        event.preventDefault();
        event.stopPropagation();
        var navLinks = navbar.querySelector('#navLinks');
        var willOpen = !navLinks.classList.contains('active');
        navLinks.classList.toggle('active', willOpen);
        menuButton.classList.toggle('active', willOpen);
        menuButton.setAttribute('aria-expanded', String(willOpen));
        menuButton.setAttribute('aria-label', willOpen ? 'Đóng menu chính' : 'Mở menu chính');
        if (!willOpen) navbar.querySelectorAll('#navLinks > .nav-dropdown').forEach(closeDropdown);
        return;
      }

      var dropdownToggle = event.target.closest('#navbar.site-header-standard #navLinks > .nav-dropdown > .dropdown-toggle');
      if (dropdownToggle) {
        var dropdown = dropdownToggle.parentElement;
        if (isCompactInteraction()) {
          event.preventDefault();
          event.stopPropagation();
          var open = !dropdown.classList.contains('active');
          navbar.querySelectorAll('#navLinks > .nav-dropdown').forEach(function(item) {
            if (item !== dropdown) closeDropdown(item);
          });
          dropdown.classList.toggle('active', open);
          dropdownToggle.setAttribute('aria-expanded', String(open));
        }
        return;
      }

      var navigationLink = event.target.closest('#navbar.site-header-standard #navLinks a[href]');
      if (navigationLink) {
        closeHeaderMenus(navbar);
        return;
      }

      if (!navbar) document.querySelectorAll('#navbar.site-header-standard').forEach(closeHeaderMenus);
    }, true);

    document.addEventListener('keydown', function(event) {
      if (event.key !== 'Escape') return;
      document.querySelectorAll('#navbar.site-header-standard').forEach(closeHeaderMenus);
    });

    window.addEventListener('resize', function() {
      document.querySelectorAll('#navbar.site-header-standard').forEach(closeHeaderMenus);
    }, { passive: true });
  }

  function hasScript(filename) {
    return Array.prototype.some.call(document.querySelectorAll('script[src]'), function(script) {
      return script.src.indexOf('/js/' + filename) !== -1;
    });
  }

  function loadSearchAssets() {
    if (!document.getElementById('globalSearch') || !document.getElementById('searchDropdown')) return;

    function loadSearchEngine() {
      if (hasScript('search.js')) return;
      var searchScript = document.createElement('script');
      searchScript.src = siteUrl('js/search.js?v=20260726a');
      searchScript.async = false;
      searchScript.setAttribute('data-site-search-engine', 'true');
      document.head.appendChild(searchScript);
    }

    if (typeof window.SEARCH_INDEX !== 'undefined') {
      loadSearchEngine();
      return;
    }

    var existingIndex = Array.prototype.find.call(document.querySelectorAll('script[src]'), function(script) {
      return script.src.indexOf('/js/search-index.js') !== -1;
    });
    if (existingIndex) {
      existingIndex.addEventListener('load', loadSearchEngine, { once: true });
      window.setTimeout(function() {
        if (typeof window.SEARCH_INDEX !== 'undefined') loadSearchEngine();
      }, 0);
      return;
    }

    var indexScript = document.createElement('script');
    indexScript.src = siteUrl('js/search-index.js?v=20260721a');
    indexScript.async = false;
    indexScript.setAttribute('data-site-search-index', 'true');
    indexScript.addEventListener('load', loadSearchEngine, { once: true });
    document.head.appendChild(indexScript);
  }

  function applyCanonicalHeader() {
    ensureStyles();
    var navbar = ensureNavbar();
    var container = ensureContainer(navbar);
    var logo = ensureLogo(container);
    var navLinks = ensureNavLinks(container);
    var search = ensureSearch(container);
    var cta = ensureCta(container);
    var toggle = ensureToggle(container);

    orderHeader(container, [logo, navLinks, search, cta, toggle]);
    markActive(navLinks);
    syncPublicContentMetadata();
    bindInteractions();
    loadSearchAssets();
    navbar.setAttribute('data-canonical-header-applied', 'true');
    window.MAY_YOGA_HEADER_VERSION = '5';
  }

  ensureStyles();
  var initialNavbar = document.getElementById('navbar');
  if (initialNavbar) {
    initialNavbar.classList.add('site-header-standard', 'scrolled');
    initialNavbar.setAttribute('data-site-header-standard', 'true');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyCanonicalHeader, { once: true });
  } else {
    applyCanonicalHeader();
  }
})();
