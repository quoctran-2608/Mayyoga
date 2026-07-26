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

  // Apply the canonical state before any structural checks. When the geometry CSS is
  // already in <head>, this prevents the legacy 85px logo from becoming a painted frame.
  function primeHeaderState() {
    var navbar = document.getElementById('navbar');
    if (!navbar) return null;
    navbar.classList.add('site-header-standard', 'scrolled');
    navbar.setAttribute('data-site-header-standard', 'true');
    return navbar;
  }

  primeHeaderState();

  function ensureStylesheet(selector, href, attribute) {
    if (document.querySelector(selector)) return;
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = siteUrl(href);
    link.setAttribute(attribute, 'true');
    document.head.appendChild(link);
  }

  function ensureStyles() {
    ensureStylesheet(
      'link[data-header-first-paint]',
      'css/header-first-paint-v1.css?v=20260726a',
      'data-header-first-paint'
    );
    ensureStylesheet(
      'link[data-header-index-canonical]',
      'css/header-index-canonical-v3.css?v=20260726c',
      'data-header-index-canonical'
    );
    ensureStylesheet(
      'link[data-site-navigation-canonical]',
      'css/site-navigation-canonical-v4.css?v=20260722a',
      'data-site-navigation-canonical'
    );
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

    var expectedHref = siteUrl('index.html');
    if (normalizePath(logo.href) !== normalizePath(expectedHref)) logo.href = expectedHref;

    var image = logo.querySelector('.logo-img');
    if (!image) {
      image = document.createElement('img');
      image.className = 'logo-img';
      image.alt = 'Mây Yoga';
      logo.replaceChildren(image);
    }

    var expectedSrc = siteUrl('assets/images/logo.webp');
    if (image.src !== expectedSrc) image.src = expectedSrc;
    if (!image.alt) image.alt = 'Mây Yoga';
    return logo;
  }

  function hasUsableNavMarkup(navLinks) {
    if (!navLinks) return false;
    var expected = [
      siteUrl('index.html'),
      siteUrl('ve-may-yoga.html'),
      siteUrl('hoc-yoga-online.html'),
      siteUrl('goc-huan-luyen-vien.html'),
      siteUrl('bai-viet/yoga-cho-nguoi-moi.html'),
      siteUrl('tu-the-yoga.html'),
      siteUrl('giai-phau-yoga.html'),
      siteUrl('trac-nghiem.html')
    ].map(normalizePath);
    var actual = Array.prototype.map.call(navLinks.querySelectorAll('a[href]'), function(link) {
      return normalizePath(link.href);
    });
    return expected.every(function(path) { return actual.indexOf(path) !== -1; }) &&
      navLinks.querySelectorAll(':scope > li').length >= 5;
  }

  function normalizeDropdownSemantics(navLinks) {
    navLinks.querySelectorAll(':scope > .nav-dropdown > .dropdown-toggle').forEach(function(toggle) {
      toggle.setAttribute('aria-haspopup', 'true');
      if (!toggle.hasAttribute('aria-expanded')) toggle.setAttribute('aria-expanded', 'false');
    });
  }

  function ensureNavLinks(container, logo) {
    var navLinks = container.querySelector('#navLinks');
    if (!navLinks) {
      navLinks = document.createElement('ul');
      navLinks.id = 'navLinks';
      container.insertBefore(navLinks, logo.nextSibling);
    }
    navLinks.className = 'nav-links';

    // Most pages already ship the canonical links. Preserve those nodes so the browser
    // does not repaint the menu and so previously attached state is not discarded.
    if (!hasUsableNavMarkup(navLinks)) navLinks.innerHTML = navMarkup();
    normalizeDropdownSemantics(navLinks);
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
    if (!input.placeholder) input.placeholder = '🔍 Tìm tư thế, bài viết...';
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
    if (!wrap) {
      wrap = document.createElement('div');
      wrap.className = 'nav-cta';
    } else {
      wrap.className = 'nav-cta';
    }

    var cta = wrap.querySelector('a.btn');
    if (!cta) {
      cta = document.createElement('a');
      cta.className = 'btn btn-primary btn-sm';
      cta.href = siteUrl('index.html#categories');
      cta.textContent = 'Khám phá ngay';
      wrap.replaceChildren(cta);
    }

    // Existing page-level CTAs are kept intact. Geometry is canonicalized in CSS,
    // while preserving the initial text/href avoids another visible startup mutation.
    return wrap;
  }

  function ensureToggle(container) {
    var toggle = container.querySelector('#mobileToggle');
    if (!toggle) {
      toggle = document.createElement('button');
      toggle.id = 'mobileToggle';
      toggle.innerHTML = '<span></span><span></span><span></span>';
    } else if (toggle.querySelectorAll(':scope > span').length !== 3) {
      toggle.innerHTML = '<span></span><span></span><span></span>';
    }
    toggle.className = 'mobile-toggle';
    toggle.type = 'button';
    toggle.setAttribute('aria-label', 'Menu');
    if (!toggle.hasAttribute('aria-expanded')) toggle.setAttribute('aria-expanded', 'false');
    return toggle;
  }

  function orderChrome(container, logo, navLinks, search, cta, toggle) {
    var desired = [logo, navLinks, search, cta, toggle].filter(Boolean);
    var current = Array.prototype.filter.call(container.children, function(node) {
      return desired.indexOf(node) !== -1;
    });
    var alreadyOrdered = desired.length === current.length && desired.every(function(node, index) {
      return current[index] === node;
    });
    if (alreadyOrdered) return;
    desired.forEach(function(node) { container.appendChild(node); });
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
      searchScript.async = false;
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
    indexScript.async = false;
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
    var navbar = primeHeaderState();
    if (!navbar) return;
    ensureStyles();

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
    navbar.setAttribute('data-canonical-header-applied', 'true');
  }

  // Defer scripts and dynamically injected scripts normally execute after #navbar exists.
  // Apply immediately instead of waiting for DOMContentLoaded and creating another paint.
  if (document.getElementById('navbar')) {
    applyHeader();
  } else if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyHeader, { once: true });
  } else {
    applyHeader();
  }
})();
