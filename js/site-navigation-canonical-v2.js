// ===== MÂY YOGA — CANONICAL SITE NAVIGATION V2 =====
// Single structural + behavioral source of truth for homepage and every child page.
// Visual geometry remains owned by css/header-index-canonical-v3.css.
(function syncCanonicalSiteNavigation() {
  'use strict';

  function currentScriptRoot() {
    var script = document.currentScript;
    if (!script || !script.src) {
      var scripts = document.querySelectorAll('script[src]');
      for (var i = scripts.length - 1; i >= 0; i--) {
        if (/\/js\/site-navigation-canonical-v2\.js(?:\?|$)/.test(scripts[i].src)) {
          script = scripts[i];
          break;
        }
      }
    }
    return script && script.src ? new URL('../', script.src) : new URL('./', window.location.href);
  }

  var siteRoot = currentScriptRoot();
  function siteUrl(path) { return new URL(path, siteRoot).href; }

  function normalizePath(url) {
    try {
      var path = new URL(url, window.location.href).pathname;
      path = path.replace(/\/index\.html$/, '/');
      return path.replace(/\/{2,}/g, '/');
    } catch (error) {
      return '';
    }
  }

  function ensureStyles() {
    if (!document.querySelector('link[data-header-index-canonical]')) {
      var geometry = document.createElement('link');
      geometry.rel = 'stylesheet';
      geometry.href = siteUrl('css/header-index-canonical-v3.css?v=20260722b');
      geometry.setAttribute('data-header-index-canonical', 'true');
      document.head.appendChild(geometry);
    }
    if (!document.querySelector('link[data-site-navigation-canonical]')) {
      var navigation = document.createElement('link');
      navigation.rel = 'stylesheet';
      navigation.href = siteUrl('css/site-navigation-canonical-v4.css?v=20260722a');
      navigation.setAttribute('data-site-navigation-canonical', 'true');
      document.head.appendChild(navigation);
    }
  }

  function navMarkup() {
    return [
      '<li><a href="' + siteUrl('index.html') + '">Trang chủ</a></li>',
      '<li><a href="' + siteUrl('ve-may-yoga.html') + '">Về Mây Yoga</a></li>',
      '<li class="nav-dropdown">',
      '  <a href="' + siteUrl('hoc-yoga-online.html') + '" class="dropdown-toggle" aria-haspopup="true" aria-expanded="false">Các khoá học <span class="chevron">▾</span></a>',
      '  <ul class="dropdown-menu">',
      '    <li><a href="' + siteUrl('hoc-yoga-online.html') + '">🌿 Yoga Online 1:1</a></li>',
      '    <li><a href="' + siteUrl('goc-huan-luyen-vien.html') + '">🦉 Đào tạo YTT 200H</a></li>',
      '  </ul>',
      '</li>',
      '<li class="nav-dropdown">',
      '  <a href="' + siteUrl('bai-viet/yoga-cho-nguoi-moi.html') + '" class="dropdown-toggle" aria-haspopup="true" aria-expanded="false">Kiến thức Yoga <span class="chevron">▾</span></a>',
      '  <ul class="dropdown-menu">',
      '    <li><a href="' + siteUrl('bai-viet/yoga-cho-nguoi-moi.html') + '">🌱 Yoga cho người mới</a></li>',
      '    <li><a href="' + siteUrl('tu-the-yoga.html') + '">🧘 90 Tư thế Yoga</a></li>',
      '    <li><a href="' + siteUrl('bai-viet/pranayama-ky-thuat-tho.html') + '">🌬️ Pranayama</a></li>',
      '    <li><a href="' + siteUrl('bai-viet/thien-cho-nguoi-moi.html') + '">🕊️ Thiền định</a></li>',
      '    <li><a href="' + siteUrl('giai-phau-yoga.html') + '">🫀 Giải phẫu Yoga</a></li>',
      '    <li style="border-top:1px solid rgba(61,90,58,.1);margin-top:4px;padding-top:4px"><a href="' + siteUrl('tu-tap-tai-nha.html') + '">🏠 Tự tập tại nhà</a></li>',
      '  </ul>',
      '</li>',
      '<li><a href="' + siteUrl('trac-nghiem.html') + '">Trắc nghiệm</a></li>'
    ].join('');
  }

  function ensureContainer(navbar) {
    var container = navbar.querySelector(':scope > .container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'container';
      while (navbar.firstChild) container.appendChild(navbar.firstChild);
      navbar.appendChild(container);
    }
    return container;
  }

  function ensureLogo(container) {
    var logo = container.querySelector('.nav-logo');
    if (!logo) {
      logo = document.createElement('a');
      logo.className = 'nav-logo';
      container.insertBefore(logo, container.firstChild);
    }
    logo.href = siteUrl('index.html');
    var image = logo.querySelector('.logo-img');
    if (!image) {
      image = document.createElement('img');
      image.className = 'logo-img';
      image.alt = 'Mây Yoga';
      logo.replaceChildren(image);
    }
    image.src = siteUrl('assets/images/logo.webp');
    return logo;
  }

  function ensureNavLinks(container, logo) {
    var navLinks = container.querySelector('#navLinks');
    if (!navLinks) {
      navLinks = document.createElement('ul');
      navLinks.id = 'navLinks';
      container.insertBefore(navLinks, logo.nextSibling);
    }
    navLinks.className = 'nav-links';
    navLinks.innerHTML = navMarkup();
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

  function ensureCta(container) {
    var wrap = container.querySelector('.nav-cta');
    if (!wrap) wrap = document.createElement('div');
    wrap.className = 'nav-cta';

    var cta = wrap.querySelector('a.btn');
    if (!cta) {
      cta = document.createElement('a');
      cta.className = 'btn btn-primary btn-sm';
      wrap.replaceChildren(cta);
    }
    // “Khám phá ngay” should land on the broad discovery hub, not the specialist YTT/blog block.
    cta.href = siteUrl('index.html#categories');
    cta.innerHTML = 'Khám phá ngay <img class="leaf-icon" src="' + siteUrl('assets/images/icons/leaf_button.svg') + '" alt="" aria-hidden="true" width="14" height="18">';
    return wrap;
  }

  function ensureToggle(container) {
    var toggle = container.querySelector('#mobileToggle');
    if (!toggle) {
      toggle = document.createElement('button');
      toggle.id = 'mobileToggle';
      toggle.innerHTML = '<span></span><span></span><span></span>';
    }
    toggle.className = 'mobile-toggle';
    toggle.type = 'button';
    toggle.setAttribute('aria-label', 'Menu');
    toggle.setAttribute('aria-expanded', 'false');
    return toggle;
  }

  function orderChrome(container, logo, navLinks, search, cta, toggle) {
    [logo, navLinks, search, cta, toggle].forEach(function(node) {
      if (node) container.appendChild(node);
    });
  }

  function hasScript(filename) {
    return Array.prototype.some.call(document.querySelectorAll('script[src]'), function(script) {
      return new RegExp('/js/' + filename.replace('.', '\\.') + '(?:\\?|$)').test(script.src);
    });
  }

  function loadSearchEngine() {
    if (!document.getElementById('globalSearch') || !document.getElementById('searchDropdown') || hasScript('search.js')) return;

    function loadSearch() {
      if (hasScript('search.js')) return;
      var searchScript = document.createElement('script');
      searchScript.src = siteUrl('js/search.js?v=20260722b');
      searchScript.setAttribute('data-site-search-engine', 'true');
      document.head.appendChild(searchScript);
    }

    if (typeof window.SEARCH_INDEX !== 'undefined') {
      loadSearch();
      return;
    }

    var existing = Array.prototype.find.call(document.querySelectorAll('script[src]'), function(script) {
      return /\/js\/search-index\.js(?:\?|$)/.test(script.src);
    });
    if (existing) {
      existing.addEventListener('load', loadSearch, { once: true });
      window.setTimeout(function() {
        if (typeof window.SEARCH_INDEX !== 'undefined') loadSearch();
      }, 0);
      return;
    }

    var indexScript = document.createElement('script');
    indexScript.src = siteUrl('js/search-index.js?v=20260721a');
    indexScript.setAttribute('data-site-search-index', 'true');
    indexScript.addEventListener('load', loadSearch, { once: true });
    document.head.appendChild(indexScript);
  }

  function markActive(navLinks) {
    var current = normalizePath(window.location.href);
    var knowledgeRoot = normalizePath(siteUrl('bai-viet/'));
    var knowledgePages = [
      siteUrl('tu-the-yoga.html'),
      siteUrl('giai-phau-yoga.html'),
      siteUrl('tu-tap-tai-nha.html')
    ].map(normalizePath);
    var coursePages = [siteUrl('hoc-yoga-online.html'), siteUrl('goc-huan-luyen-vien.html')].map(normalizePath);

    navLinks.querySelectorAll('a[aria-current]').forEach(function(link) { link.removeAttribute('aria-current'); });
    navLinks.querySelectorAll('.has-current-child').forEach(function(item) { item.classList.remove('has-current-child'); });

    navLinks.querySelectorAll('a[href]').forEach(function(link) {
      if (link.classList.contains('dropdown-toggle') || normalizePath(link.href) !== current) return;
      link.setAttribute('aria-current', 'page');
      var parent = link.closest('.nav-dropdown');
      if (parent) parent.classList.add('has-current-child');
    });

    if (current.indexOf(knowledgeRoot) === 0 || knowledgePages.indexOf(current) !== -1) {
      var knowledge = navLinks.querySelectorAll(':scope > .nav-dropdown')[1];
      if (knowledge) knowledge.classList.add('has-current-child');
    }
    if (coursePages.indexOf(current) !== -1) {
      var courses = navLinks.querySelectorAll(':scope > .nav-dropdown')[0];
      if (courses) courses.classList.add('has-current-child');
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

  function closeMobile(navbar) {
    var navLinks = navbar.querySelector('#navLinks');
    var toggle = navbar.querySelector('#mobileToggle');
    if (navLinks) navLinks.classList.remove('active');
    if (toggle) {
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
    }
  }

  function bindNavigation(navbar, navLinks) {
    if (navbar.dataset.canonicalNavigationBound === 'true') return;
    navbar.dataset.canonicalNavigationBound = 'true';
    var dropdowns = Array.prototype.slice.call(navLinks.querySelectorAll(':scope > .nav-dropdown'));

    dropdowns.forEach(function(dropdown) {
      var toggle = dropdown.querySelector(':scope > .dropdown-toggle');
      var firstItem = dropdown.querySelector(':scope > .dropdown-menu a[href]');
      if (!toggle) return;
      dropdown.addEventListener('mouseenter', function() {
        if (!isCompactInteraction()) toggle.setAttribute('aria-expanded', 'true');
      });
      dropdown.addEventListener('mouseleave', function() {
        if (!isCompactInteraction()) toggle.setAttribute('aria-expanded', 'false');
      });
      dropdown.addEventListener('focusin', function() {
        if (!isCompactInteraction()) toggle.setAttribute('aria-expanded', 'true');
      });
      dropdown.addEventListener('focusout', function() {
        window.setTimeout(function() {
          if (!dropdown.contains(document.activeElement) && !isCompactInteraction()) toggle.setAttribute('aria-expanded', 'false');
        }, 0);
      });
      toggle.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowDown' && firstItem) {
          event.preventDefault();
          dropdown.classList.add('active');
          toggle.setAttribute('aria-expanded', 'true');
          firstItem.focus();
        } else if (event.key === 'Escape') {
          event.preventDefault();
          closeDropdown(dropdown);
          toggle.focus();
        }
      });
    });

    document.addEventListener('click', function(event) {
      var menuButton = event.target.closest('.navbar.site-header-standard #mobileToggle');
      if (menuButton) {
        event.preventDefault();
        event.stopPropagation();
        if (typeof event.stopImmediatePropagation === 'function') event.stopImmediatePropagation();
        var willOpen = !navLinks.classList.contains('active');
        navLinks.classList.toggle('active', willOpen);
        menuButton.classList.toggle('active', willOpen);
        menuButton.setAttribute('aria-expanded', String(willOpen));
        if (!willOpen) dropdowns.forEach(closeDropdown);
        return;
      }

      var dropdownToggle = event.target.closest('.navbar.site-header-standard #navLinks > .nav-dropdown > .dropdown-toggle');
      if (!dropdownToggle) return;
      var dropdown = dropdownToggle.parentElement;
      event.stopPropagation();
      if (isCompactInteraction()) {
        event.preventDefault();
        var open = !dropdown.classList.contains('active');
        dropdowns.forEach(function(item) { if (item !== dropdown) closeDropdown(item); });
        dropdown.classList.toggle('active', open);
        dropdownToggle.setAttribute('aria-expanded', String(open));
      } else {
        closeDropdown(dropdown);
      }
    }, true);

    navLinks.addEventListener('click', function(event) {
      var link = event.target.closest('a[href]');
      if (!link || link.classList.contains('dropdown-toggle')) return;
      closeMobile(navbar);
      dropdowns.forEach(closeDropdown);
    });

    document.addEventListener('click', function(event) {
      if (!navbar.contains(event.target)) {
        closeMobile(navbar);
        dropdowns.forEach(closeDropdown);
      }
    });

    document.addEventListener('keydown', function(event) {
      if (event.key !== 'Escape') return;
      closeMobile(navbar);
      dropdowns.forEach(closeDropdown);
    });

    window.addEventListener('resize', function() {
      closeMobile(navbar);
      dropdowns.forEach(closeDropdown);
    }, { passive: true });
  }

  function applyHeader() {
    var navbar = document.getElementById('navbar');
    if (!navbar) return;
    ensureStyles();
    navbar.classList.add('site-header-standard', 'scrolled');
    navbar.setAttribute('data-site-header-standard', 'true');

    var container = ensureContainer(navbar);
    var logo = ensureLogo(container);
    var navLinks = ensureNavLinks(container, logo);
    var search = ensureSearch(container);
    var cta = ensureCta(container);
    var toggle = ensureToggle(container);
    orderChrome(container, logo, navLinks, search, cta, toggle);
    markActive(navLinks);
    bindNavigation(navbar, navLinks);
    loadSearchEngine();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyHeader, { once: true });
  } else {
    applyHeader();
  }
})();