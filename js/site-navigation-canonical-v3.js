// ===== MÂY YOGA — CANONICAL SITE NAVIGATION V6 =====
// The only structural and behavioral source of truth for the public site header.
(function canonicalSiteNavigation() {
  'use strict';

  if (window.__mayYogaCanonicalNavigationV6Loaded) return;
  window.__mayYogaCanonicalNavigationV6Loaded = true;

  function resolveCurrentScript() {
    if (document.currentScript && document.currentScript.src) return document.currentScript;
    var scripts = document.querySelectorAll('script[src]');
    for (var index = scripts.length - 1; index >= 0; index -= 1) {
      if (/\/js\/site-navigation-canonical-v(?:2|3)\.js(?:\?|$)/.test(scripts[index].src)) return scripts[index];
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

  var NAV_ITEMS = [
    { label: 'Trang chủ', href: 'index.html' },
    { label: 'Về Mây Yoga', href: 've-may-yoga.html' },
    {
      label: 'Các khoá học',
      href: 'hoc-yoga-online.html',
      children: [
        { label: 'Yoga Online 1:1', href: 'hoc-yoga-online.html' },
        { label: 'Đào tạo YTT 200H', href: 'dao-tao-huan-luyen-vien-200h.html' },
        { label: 'Góc Huấn Luyện Viên', href: 'goc-huan-luyen-vien.html', divider: true }
      ]
    },
    {
      label: 'Kiến thức Yoga',
      href: 'bai-viet/yoga-cho-nguoi-moi.html',
      children: [
        { label: 'Yoga cho người mới', href: 'bai-viet/yoga-cho-nguoi-moi.html' },
        { label: 'Hatha Yoga', href: 'hatha-yoga.html' },
        { label: '88 Tư thế Yoga', href: 'tu-the-yoga.html' },
        { label: 'Pranayama', href: 'pranayama.html' },
        { label: 'Thiền định', href: 'thien-dinh.html' },
        { label: 'Giải phẫu Yoga', href: 'giai-phau-yoga.html' },
        { label: 'Tự tập tại nhà', href: 'tu-tap-tai-nha.html', divider: true }
      ]
    },
    { label: 'Trắc nghiệm', href: 'trac-nghiem.html' }
  ];

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

  function createLogo() {
    var logo = document.createElement('a');
    logo.className = 'nav-logo';
    logo.href = siteUrl('index.html');
    logo.setAttribute('aria-label', 'Mây Yoga — Trang chủ');

    var image = document.createElement('img');
    image.className = 'logo-img';
    image.src = siteUrl('assets/images/logo.webp');
    image.alt = 'Mây Yoga';
    image.width = 120;
    image.height = 84;
    logo.appendChild(image);
    return logo;
  }

  function createLink(config, className) {
    var link = document.createElement('a');
    link.href = siteUrl(config.href);
    link.textContent = config.label;
    if (className) link.className = className;
    return link;
  }

  function createNavItem(config) {
    var item = document.createElement('li');

    if (!config.children) {
      item.appendChild(createLink(config));
      return item;
    }

    item.className = 'nav-dropdown';
    var toggle = createLink(config, 'dropdown-toggle');
    toggle.setAttribute('aria-haspopup', 'true');
    toggle.setAttribute('aria-expanded', 'false');

    var chevron = document.createElement('span');
    chevron.className = 'chevron';
    chevron.setAttribute('aria-hidden', 'true');
    chevron.textContent = '▾';
    toggle.appendChild(document.createTextNode(' '));
    toggle.appendChild(chevron);

    var submenu = document.createElement('ul');
    submenu.className = 'dropdown-menu';
    config.children.forEach(function(childConfig) {
      var child = document.createElement('li');
      if (childConfig.divider) child.className = 'nav-menu-divider';
      child.appendChild(createLink(childConfig));
      submenu.appendChild(child);
    });

    item.append(toggle, submenu);
    return item;
  }

  function createNavLinks() {
    var navLinks = document.createElement('ul');
    navLinks.id = 'navLinks';
    navLinks.className = 'nav-links';
    navLinks.setAttribute('data-canonical-nav-version', '6');
    NAV_ITEMS.forEach(function(config) {
      navLinks.appendChild(createNavItem(config));
    });
    return navLinks;
  }

  function createSearch() {
    var search = document.createElement('div');
    search.id = 'navSearch';
    search.className = 'nav-search';
    search.setAttribute('data-site-search-standard', 'true');

    var input = document.createElement('input');
    input.id = 'globalSearch';
    input.type = 'search';
    input.placeholder = 'Tìm tư thế, bài viết...';
    input.autocomplete = 'off';
    input.setAttribute('aria-label', 'Tìm kiếm trên Mây Yoga');

    var dropdown = document.createElement('div');
    dropdown.id = 'searchDropdown';
    dropdown.className = 'search-dropdown';

    search.append(input, dropdown);
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

  function createCta() {
    var config = pageCtaConfig();
    var wrap = document.createElement('div');
    wrap.className = 'nav-cta';
    wrap.setAttribute('data-contextual-cta', 'true');

    var link = document.createElement('a');
    link.className = 'btn btn-primary btn-sm';
    link.href = config.href;
    link.textContent = config.label;
    if (config.target) link.target = config.target;
    if (config.rel) link.rel = config.rel;
    else if (config.target === '_blank') link.rel = 'noopener';

    wrap.appendChild(link);
    return wrap;
  }

  function createToggle() {
    var toggle = document.createElement('button');
    toggle.id = 'mobileToggle';
    toggle.className = 'mobile-toggle';
    toggle.type = 'button';
    toggle.setAttribute('aria-label', 'Mở menu chính');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.append(document.createElement('span'), document.createElement('span'), document.createElement('span'));
    return toggle;
  }

  function buildHeader() {
    var navbar = document.getElementById('navbar');
    if (!navbar) {
      navbar = document.createElement('nav');
      navbar.id = 'navbar';
      document.body.insertBefore(navbar, document.body.firstChild);
    }

    navbar.className = 'navbar site-header-standard scrolled';
    navbar.setAttribute('data-site-header-standard', 'true');

    var container = document.createElement('div');
    container.className = 'container';
    container.append(createLogo(), createNavLinks(), createSearch(), createCta(), createToggle());

    // Replacing the entire subtree removes every legacy menu, inline style and listener.
    navbar.replaceChildren(container);
    return navbar;
  }

  function markActive(navbar) {
    var navLinks = navbar.querySelector('#navLinks');
    if (!navLinks) return;

    var current = normalizePath(window.location.href);
    var articleRoot = normalizePath(siteUrl('bai-viet/'));
    var poseRoot = normalizePath(siteUrl('tu-the/'));
    var quizRoot = normalizePath(siteUrl('trac-nghiem/'));
    var knowledgePages = [
      'tu-the-yoga.html',
      'hatha-yoga.html',
      'pranayama.html',
      'thien-dinh.html',
      'giai-phau-yoga.html',
      'tu-tap-tai-nha.html'
    ].map(function(path) { return normalizePath(siteUrl(path)); });
    var coursePages = [
      'hoc-yoga-online.html',
      'dao-tao-huan-luyen-vien-200h.html',
      'goc-huan-luyen-vien.html'
    ].map(function(path) { return normalizePath(siteUrl(path)); });

    navLinks.querySelectorAll('a[href]').forEach(function(link) {
      if (link.classList.contains('dropdown-toggle')) return;
      if (normalizePath(link.href) !== current) return;
      link.setAttribute('aria-current', 'page');
      var dropdown = link.closest('.nav-dropdown');
      if (dropdown) dropdown.classList.add('has-current-child');
    });

    var dropdowns = navLinks.querySelectorAll(':scope > .nav-dropdown');
    var isKnowledge = current.indexOf(articleRoot) === 0 ||
      current.indexOf(poseRoot) === 0 ||
      knowledgePages.indexOf(current) !== -1;
    if (isKnowledge && dropdowns[1]) dropdowns[1].classList.add('has-current-child');
    if (coursePages.indexOf(current) !== -1 && dropdowns[0]) dropdowns[0].classList.add('has-current-child');

    if (current.indexOf(quizRoot) === 0) {
      var quizLink = navLinks.querySelector(':scope > li:last-child > a');
      if (quizLink) quizLink.setAttribute('aria-current', 'page');
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
          var willExpand = !dropdown.classList.contains('active');
          navbar.querySelectorAll('#navLinks > .nav-dropdown').forEach(function(item) {
            if (item !== dropdown) closeDropdown(item);
          });
          dropdown.classList.toggle('active', willExpand);
          dropdownToggle.setAttribute('aria-expanded', String(willExpand));
        }
        return;
      }

      if (event.target.closest('#navbar.site-header-standard #navLinks a[href]')) {
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

  function loadScript(filename, version, marker, callback) {
    var existing = Array.prototype.find.call(document.querySelectorAll('script[src]'), function(script) {
      return script.src.indexOf('/js/' + filename) !== -1;
    });

    if (existing) {
      if (callback) window.setTimeout(callback, 0);
      return existing;
    }

    var script = document.createElement('script');
    script.src = siteUrl('js/' + filename + '?v=' + version);
    script.async = false;
    if (marker) script.setAttribute(marker, 'true');
    if (callback) script.addEventListener('load', callback, { once: true });
    document.head.appendChild(script);
    return script;
  }

  function loadSearchAssets() {
    if (!document.getElementById('globalSearch') || !document.getElementById('searchDropdown')) return;

    function ensureSearchEngine() {
      if (window.MAY_YOGA_SEARCH_VERSION || hasScript('search.js')) return;
      loadScript('search.js', '20260728b', 'data-search-engine-v2');
    }

    function ensureSearchIndex() {
      if (window.MAY_YOGA_SEARCH_INDEX_VERSION || hasScript('search-index.js')) {
        ensureSearchEngine();
        return;
      }
      loadScript('search-index.js', '20260728b', 'data-site-search-index', ensureSearchEngine);
    }

    if (window.MAY_YOGA_POSE_CATALOG || hasScript('pose-catalog.js')) {
      ensureSearchIndex();
      return;
    }

    loadScript('pose-catalog.js', '20260728a', 'data-pose-catalog', ensureSearchIndex);
  }

  function applyCanonicalHeader() {
    if (!document.body || document.body.getAttribute('data-site-navigation') === 'off') return;
    ensureStyles();
    var navbar = buildHeader();
    markActive(navbar);
    bindInteractions();
    loadSearchAssets();
    navbar.setAttribute('data-canonical-header-applied', 'true');
    window.MAY_YOGA_HEADER_VERSION = '6';
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
