// ===== MÂY YOGA — CANONICAL SITE HEADER =====
// The homepage/index header is the source of truth for every non-homepage document.
(function syncCanonicalHeader() {
  'use strict';

  // Index already owns the canonical first-paint header and dedicated navigation layer.
  if (document.body.classList.contains('home-hero-redesign') && document.getElementById('hero')) return;

  function currentScriptRoot() {
    var script = document.currentScript;
    if (!script || !script.src) {
      var scripts = document.querySelectorAll('script[src]');
      for (var i = scripts.length - 1; i >= 0; i--) {
        if (/\/js\/site-header-standard\.js(?:\?|$)/.test(scripts[i].src)) {
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
      var path = new URL(url, window.location.href).pathname.replace(/\/index\.html$/, '/');
      return path.replace(/\/{2,}/g, '/');
    } catch (error) {
      return '';
    }
  }

  function ensureStyles() {
    if (document.getElementById('may-yoga-site-header-standard')) return;
    var style = document.createElement('style');
    style.id = 'may-yoga-site-header-standard';
    style.textContent = `
      html body .navbar.site-header-standard,
      html body .navbar.site-header-standard.scrolled {
        position: fixed !important; top: 0 !important; left: 0 !important; right: 0 !important;
        z-index: 1000 !important; height: 96px !important; min-height: 96px !important;
        padding: 0 !important; margin: 0 !important; background: rgba(255,255,255,.985) !important;
        box-shadow: 0 1px 0 rgba(39,78,48,.09) !important;
      }
      html body .navbar.site-header-standard .container {
        width: 100% !important; max-width: none !important; min-height: 96px !important;
        padding: 0 clamp(34px,4.3vw,74px) !important; display: flex !important;
        align-items: center !important; justify-content: flex-start !important;
        gap: clamp(18px,2vw,34px) !important;
      }
      html body .navbar.site-header-standard .nav-logo { display:flex !important; align-items:center !important; flex:0 0 auto !important; }
      html body .navbar.site-header-standard .nav-logo .logo-img {
        width:auto !important; height:84px !important; max-width:none !important; object-fit:contain !important;
      }
      html body .navbar.site-header-standard .nav-links {
        display:flex; align-items:center; margin-left:auto !important; gap:clamp(26px,2.3vw,42px) !important;
      }
      html body .navbar.site-header-standard .nav-links > li > a {
        position:relative; display:flex; align-items:center; gap:4px; padding:4px 0;
        color:#23324a !important; font-size:.95rem !important; font-weight:500 !important;
        white-space:nowrap; transition:color .18s ease,background-color .18s ease,transform .18s ease !important;
      }
      html body .navbar.site-header-standard .nav-links > li > a::after {
        content:''; position:absolute; left:50% !important; bottom:-18px !important;
        width:0 !important; height:2px !important; border-radius:999px; background:#2f6f42 !important;
        opacity:0; transform:translateX(-50%) !important; transition:width .2s ease,opacity .2s ease !important;
      }
      html body .navbar.site-header-standard .nav-links > li > a:hover,
      html body .navbar.site-header-standard .nav-links > li > a:focus-visible,
      html body .navbar.site-header-standard .nav-dropdown:hover > .dropdown-toggle,
      html body .navbar.site-header-standard .nav-dropdown:focus-within > .dropdown-toggle,
      html body .navbar.site-header-standard .nav-dropdown.active > .dropdown-toggle,
      html body .navbar.site-header-standard .nav-links > li > a[aria-current="page"],
      html body .navbar.site-header-standard .nav-links > li.has-current-child > .dropdown-toggle { color:#2f6f42 !important; }
      html body .navbar.site-header-standard .nav-links > li > a[aria-current="page"],
      html body .navbar.site-header-standard .nav-links > li.has-current-child > .dropdown-toggle { font-weight:650 !important; }
      html body .navbar.site-header-standard .nav-links > li > a:hover::after,
      html body .navbar.site-header-standard .nav-links > li > a:focus-visible::after,
      html body .navbar.site-header-standard .nav-links > li > a[aria-current="page"]::after,
      html body .navbar.site-header-standard .nav-dropdown:hover > .dropdown-toggle::after,
      html body .navbar.site-header-standard .nav-dropdown:focus-within > .dropdown-toggle::after,
      html body .navbar.site-header-standard .nav-dropdown.has-current-child > .dropdown-toggle::after {
        width:24px !important; opacity:1 !important;
      }
      html body .navbar.site-header-standard .nav-links > li > a:focus-visible {
        outline:2px solid rgba(47,111,66,.28); outline-offset:7px; border-radius:8px;
      }
      html body .navbar.site-header-standard .nav-dropdown { position:relative; }
      html body .navbar.site-header-standard .nav-dropdown .chevron {
        display:inline-block; margin-left:3px; color:#66776c; font-size:.66rem;
        transition:transform .18s ease,color .18s ease; transform-origin:50% 48%;
      }
      html body .navbar.site-header-standard .nav-dropdown:hover > .dropdown-toggle .chevron,
      html body .navbar.site-header-standard .nav-dropdown:focus-within > .dropdown-toggle .chevron,
      html body .navbar.site-header-standard .nav-dropdown.active > .dropdown-toggle .chevron {
        color:#2f6f42; transform:rotate(180deg);
      }
      html body .navbar.site-header-standard .nav-search { position:relative !important; display:flex !important; align-items:center !important; }
      html body .navbar.site-header-standard .nav-search input {
        width:clamp(210px,15vw,250px) !important; height:52px !important; padding:8px 16px !important;
        border:1.5px solid rgba(74,116,63,.22) !important; border-radius:999px !important;
        color:#4b5d77 !important; font-size:.92rem !important; background:#fff !important; box-shadow:none !important;
      }
      html body .navbar.site-header-standard .nav-search input:focus {
        width:clamp(230px,17vw,280px) !important; border-color:#6b8e6b !important;
        box-shadow:0 0 0 3px rgba(107,142,107,.12) !important;
      }
      html body .navbar.site-header-standard .search-dropdown { min-width:420px; }
      html body .navbar.site-header-standard .nav-cta { display:block; flex:0 0 auto; }
      html body .navbar.site-header-standard .nav-cta .btn {
        min-width:190px !important; height:54px !important; padding:0 30px !important; border:0 !important;
        border-radius:999px !important; background:linear-gradient(180deg,#397334,#2f662b) !important;
        box-shadow:0 10px 22px rgba(47,102,43,.2) !important; color:#fff !important;
      }
      html body .navbar.site-header-standard .nav-cta .btn::after { content:none; }
      html body .navbar.site-header-standard .nav-cta .btn .leaf-icon { display:inline-block; width:18px; height:18px; margin-left:7px; vertical-align:middle; }
      html body .navbar.site-header-standard .mobile-toggle { display:none !important; }

      @media (min-width:981px) {
        html body .navbar.site-header-standard .nav-dropdown::before {
          content:''; position:absolute; z-index:1998; top:100%; left:-14px; right:-14px; height:18px;
        }
        html body .navbar.site-header-standard .nav-dropdown > .dropdown-menu {
          display:block !important; position:absolute !important; top:calc(100% + 14px) !important; left:50% !important;
          min-width:252px !important; padding:8px !important; border:1px solid rgba(68,103,67,.14) !important;
          border-radius:16px !important; background:rgba(255,255,255,.985) !important;
          box-shadow:0 18px 48px rgba(31,61,42,.14) !important; opacity:0; visibility:hidden;
          pointer-events:none; transform:translate(-50%,8px) !important;
          transition:opacity .16s ease,transform .16s ease,visibility 0s linear .16s !important;
        }
        html body .navbar.site-header-standard .nav-dropdown:hover > .dropdown-menu,
        html body .navbar.site-header-standard .nav-dropdown:focus-within > .dropdown-menu,
        html body .navbar.site-header-standard .nav-dropdown.active > .dropdown-menu {
          opacity:1; visibility:visible; pointer-events:auto; transform:translate(-50%,0) !important; transition-delay:0s !important;
        }
        html body .navbar.site-header-standard .dropdown-menu li a {
          display:flex !important; align-items:center; min-height:42px; margin:2px 0 !important; padding:10px 12px !important;
          border-radius:10px !important; color:#34445a !important; font-size:.87rem !important; font-weight:500 !important;
          line-height:1.35; white-space:nowrap; transition:color .16s ease,background-color .16s ease,transform .16s ease !important;
        }
        html body .navbar.site-header-standard .dropdown-menu li a:hover,
        html body .navbar.site-header-standard .dropdown-menu li a:focus-visible,
        html body .navbar.site-header-standard .dropdown-menu li a[aria-current="page"] {
          color:#255c36 !important; background:#eef5ea !important; transform:translateX(2px);
        }
      }

      @media (max-width:1200px) and (min-width:981px) {
        html body .navbar.site-header-standard .nav-search { display:none !important; }
      }

      @media (max-width:980px) {
        html body .navbar.site-header-standard,
        html body .navbar.site-header-standard.scrolled {
          position:sticky !important; height:84px !important; min-height:84px !important;
        }
        html body .navbar.site-header-standard .container { min-height:84px !important; padding:0 18px !important; }
        html body .navbar.site-header-standard .nav-logo { margin-right:auto !important; }
        html body .navbar.site-header-standard .nav-logo .logo-img { height:62px !important; }
        html body .navbar.site-header-standard .nav-links,
        html body .navbar.site-header-standard .nav-cta,
        html body .navbar.site-header-standard .nav-search { display:none !important; }
        html body .navbar.site-header-standard .mobile-toggle {
          display:flex !important; align-items:center !important; justify-content:center !important;
          width:40px !important; height:40px !important; padding:9px !important; border:1px solid rgba(86,124,78,.14) !important;
          border-radius:999px !important; background:rgba(247,249,244,.92) !important;
        }
        html body .navbar.site-header-standard .nav-links.active {
          position:absolute !important; top:100% !important; left:0 !important; right:0 !important;
          display:flex !important; flex-direction:column !important; align-items:stretch !important; gap:2px !important;
          max-height:calc(100dvh - 84px) !important; overflow-y:auto !important; padding:10px 14px 16px !important;
          background:rgba(255,255,255,.99) !important; border-radius:0 0 20px 20px !important;
          box-shadow:0 20px 42px rgba(35,62,43,.14) !important; z-index:2100 !important;
        }
        html body .navbar.site-header-standard .nav-links.active > li,
        html body .navbar.site-header-standard .nav-links.active > li > a { width:100% !important; }
        html body .navbar.site-header-standard .nav-links.active > li > a {
          min-height:46px !important; padding:11px 12px !important; border-radius:12px !important;
          color:#2d3c50 !important; font-size:14px !important; font-weight:520 !important; justify-content:space-between !important;
        }
        html body .navbar.site-header-standard .nav-links.active > li > a::after { display:none !important; }
        html body .navbar.site-header-standard .nav-links.active > li > a:hover,
        html body .navbar.site-header-standard .nav-links.active > li > a:focus-visible,
        html body .navbar.site-header-standard .nav-links.active > li > a[aria-current="page"],
        html body .navbar.site-header-standard .nav-links.active > li.has-current-child > .dropdown-toggle,
        html body .navbar.site-header-standard .nav-links.active > li.nav-dropdown.active > .dropdown-toggle {
          color:#255c36 !important; background:#eef5ea !important;
        }
        html body .navbar.site-header-standard .nav-dropdown > .dropdown-menu {
          display:none !important; position:static !important; width:auto !important; min-width:0 !important;
          margin:2px 6px 8px !important; padding:6px !important; border:1px solid rgba(68,103,67,.10) !important;
          border-radius:12px !important; background:#f7f9f4 !important; box-shadow:none !important;
          opacity:1 !important; visibility:visible !important; transform:none !important;
        }
        html body .navbar.site-header-standard .nav-dropdown.active > .dropdown-menu { display:block !important; }
        html body .navbar.site-header-standard .dropdown-menu li a {
          display:flex !important; align-items:center; min-height:40px; margin:1px 0 !important; padding:9px 11px !important;
          border-radius:9px !important; color:#4a5868 !important; font-size:.84rem !important; line-height:1.35; white-space:normal !important;
        }
        html body .navbar.site-header-standard .dropdown-menu li a:hover,
        html body .navbar.site-header-standard .dropdown-menu li a:focus-visible,
        html body .navbar.site-header-standard .dropdown-menu li a:active,
        html body .navbar.site-header-standard .dropdown-menu li a[aria-current="page"] {
          color:#255c36 !important; background:#fff !important;
        }
      }

      @media (max-width:768px) {
        html body .navbar.site-header-standard,
        html body .navbar.site-header-standard.scrolled { height:60px !important; min-height:60px !important; }
        html body .navbar.site-header-standard .container { min-height:60px !important; padding:0 10px !important; gap:6px !important; }
        html body .navbar.site-header-standard .nav-logo .logo-img { height:46px !important; max-width:82px !important; }
        html body .navbar.site-header-standard .nav-search {
          position:relative !important; display:block !important; width:36px !important; flex:0 0 36px !important; margin:0 !important; z-index:2200 !important;
        }
        html body .navbar.site-header-standard .nav-search input {
          display:block !important; width:36px !important; height:36px !important; min-width:36px !important; padding:0 !important;
          border:1px solid rgba(86,124,78,.18) !important; border-radius:999px !important; font-size:0 !important;
          color:transparent !important; caret-color:transparent !important; cursor:pointer;
          background-color:rgba(255,255,255,.92) !important;
          background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23265f49' stroke-width='2' stroke-linecap='round'%3E%3Ccircle cx='11' cy='11' r='6.5'/%3E%3Cpath d='m16 16 4 4'/%3E%3C/svg%3E") !important;
          background-repeat:no-repeat !important; background-position:center !important; background-size:16px 16px !important; box-shadow:none !important;
        }
        html body .navbar.site-header-standard .nav-search:focus-within {
          position:absolute !important; top:calc(100% + 6px) !important; left:10px !important; right:10px !important; width:auto !important;
        }
        html body .navbar.site-header-standard .nav-search:focus-within input {
          width:100% !important; min-width:0 !important; height:44px !important; padding:0 16px 0 42px !important;
          font-size:14px !important; color:#27465f !important; caret-color:#27465f !important; cursor:text;
          background-position:14px center !important; box-shadow:0 14px 34px rgba(35,62,43,.14) !important;
        }
        html body .navbar.site-header-standard .search-dropdown {
          top:calc(100% + 6px) !important; left:0 !important; right:0 !important; width:100% !important; min-width:0 !important;
          max-width:100% !important; max-height:min(62vh,480px) !important; overflow-y:auto !important;
          border-radius:16px !important; box-shadow:0 18px 42px rgba(35,62,43,.16) !important;
        }
        html body .navbar.site-header-standard .nav-cta { display:block !important; flex:0 0 auto !important; }
        html body .navbar.site-header-standard .nav-cta .btn {
          width:auto !important; min-width:0 !important; height:36px !important; min-height:36px !important;
          padding:0 11px !important; gap:5px !important; font-size:0 !important; white-space:nowrap !important;
        }
        html body .navbar.site-header-standard .nav-cta .btn::before {
          content:'Khám phá'; font-family:var(--font-body,'DM Sans',sans-serif); font-size:11.5px; font-weight:600;
        }
        html body .navbar.site-header-standard .nav-cta .btn::after { content:none !important; }
        html body .navbar.site-header-standard .nav-cta .btn .leaf-icon { width:14px !important; height:14px !important; margin-left:4px !important; }
        html body .navbar.site-header-standard .mobile-toggle {
          width:36px !important; height:36px !important; flex:0 0 36px !important; padding:8px !important;
        }
        html body .navbar.site-header-standard .mobile-toggle span { width:18px !important; height:1.8px !important; }
        html body .navbar.site-header-standard .nav-links.active { max-height:calc(100dvh - 60px) !important; }
      }

      @media (prefers-reduced-motion:reduce) {
        html body .navbar.site-header-standard .nav-links *,
        html body .navbar.site-header-standard .dropdown-menu { transition:none !important; animation:none !important; }
      }
    `;
    document.head.appendChild(style);
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

  function createSearch() {
    var search = document.createElement('div');
    search.className = 'nav-search';
    search.id = 'navSearch';
    search.setAttribute('data-site-search-standard', 'true');
    search.innerHTML = '<input type="text" id="globalSearch" placeholder="🔍 Tìm tư thế, bài viết..." autocomplete="off">' +
      '<div class="search-dropdown" id="searchDropdown"></div>';
    return search;
  }

  function ensureSearchMarkup(navbar) {
    var container = navbar.querySelector('.container');
    if (!container) return null;

    var search = navbar.querySelector('#navSearch');
    if (!search) {
      search = createSearch();
      var cta = navbar.querySelector('.nav-cta');
      var toggle = navbar.querySelector('#mobileToggle');
      container.insertBefore(search, cta || toggle || null);
    }

    if (!search.querySelector('#globalSearch')) {
      var input = document.createElement('input');
      input.type = 'text';
      input.id = 'globalSearch';
      input.placeholder = '🔍 Tìm tư thế, bài viết...';
      input.autocomplete = 'off';
      search.insertBefore(input, search.firstChild);
    }

    if (!search.querySelector('#searchDropdown')) {
      var dropdown = document.createElement('div');
      dropdown.className = 'search-dropdown';
      dropdown.id = 'searchDropdown';
      search.appendChild(dropdown);
    }

    search.querySelector('#globalSearch').placeholder = '🔍 Tìm tư thế, bài viết...';
    return search;
  }

  function hasScript(filename) {
    return Array.prototype.some.call(document.querySelectorAll('script[src]'), function(script) {
      return new RegExp('/js/' + filename.replace('.', '\\.') + '(?:\\?|$)').test(script.src);
    });
  }

  function loadSearchScript() {
    if (hasScript('search.js')) return;
    var script = document.createElement('script');
    script.src = siteUrl('js/search.js?v=20260721d');
    script.setAttribute('data-site-search-engine', 'true');
    document.head.appendChild(script);
  }

  function ensureSearchEngine() {
    if (!document.getElementById('globalSearch') || !document.getElementById('searchDropdown')) return;
    if (hasScript('search.js')) return;

    if (typeof window.SEARCH_INDEX !== 'undefined') {
      loadSearchScript();
      return;
    }

    var existingIndex = Array.prototype.find.call(document.querySelectorAll('script[src]'), function(script) {
      return /\/js\/search-index\.js(?:\?|$)/.test(script.src);
    });

    if (existingIndex) {
      existingIndex.addEventListener('load', loadSearchScript, { once: true });
      window.setTimeout(function() {
        if (typeof window.SEARCH_INDEX !== 'undefined') loadSearchScript();
      }, 0);
      return;
    }

    var indexScript = document.createElement('script');
    indexScript.src = siteUrl('js/search-index.js?v=20260721a');
    indexScript.setAttribute('data-site-search-index', 'true');
    indexScript.addEventListener('load', loadSearchScript, { once: true });
    document.head.appendChild(indexScript);
  }

  function ensureCta(navbar) {
    var container = navbar.querySelector('.container');
    if (!container) return null;
    var ctaWrap = navbar.querySelector('.nav-cta');
    if (!ctaWrap) {
      ctaWrap = document.createElement('div');
      ctaWrap.className = 'nav-cta';
      var toggle = navbar.querySelector('#mobileToggle');
      container.insertBefore(ctaWrap, toggle || null);
    }
    var cta = ctaWrap.querySelector('.btn');
    if (!cta) {
      cta = document.createElement('a');
      cta.className = 'btn btn-primary btn-sm';
      ctaWrap.appendChild(cta);
    }
    cta.href = siteUrl('index.html#blog');
    cta.innerHTML = 'Khám phá ngay <img class="leaf-icon" src="' + siteUrl('assets/images/icons/leaf_button.svg') + '" alt="" width="18" height="18">';
    return cta;
  }

  function ensureMobileToggle(navbar) {
    var container = navbar.querySelector('.container');
    if (!container) return null;
    var toggle = navbar.querySelector('#mobileToggle');
    if (!toggle) {
      toggle = document.createElement('button');
      toggle.className = 'mobile-toggle';
      toggle.id = 'mobileToggle';
      toggle.type = 'button';
      toggle.innerHTML = '<span></span><span></span><span></span>';
      container.appendChild(toggle);
    }
    toggle.setAttribute('aria-label', 'Menu');
    toggle.setAttribute('aria-expanded', 'false');
    return toggle;
  }

  function isCompactInteraction() {
    return window.matchMedia('(max-width:980px)').matches ||
      window.matchMedia('(hover:none)').matches ||
      window.matchMedia('(pointer:coarse)').matches;
  }

  function markActive(navLinks) {
    var current = normalizePath(window.location.href);
    var knowledgeRoot = normalizePath(siteUrl('bai-viet/'));
    var knowledgePages = [
      siteUrl('tu-the-yoga.html'), siteUrl('giai-phau-yoga.html'), siteUrl('tu-tap-tai-nha.html')
    ].map(normalizePath);
    var coursePages = [siteUrl('hoc-yoga-online.html'), siteUrl('goc-huan-luyen-vien.html')].map(normalizePath);

    navLinks.querySelectorAll('a[aria-current]').forEach(function(link) { link.removeAttribute('aria-current'); });
    navLinks.querySelectorAll('.has-current-child').forEach(function(item) { item.classList.remove('has-current-child'); });

    navLinks.querySelectorAll('a[href]').forEach(function(link) {
      if (link.classList.contains('dropdown-toggle')) return;
      if (normalizePath(link.href) !== current) return;
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

  function closeDropdown(dropdown) {
    if (!dropdown) return;
    dropdown.classList.remove('active');
    var toggle = dropdown.querySelector(':scope > .dropdown-toggle');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  }

  function bindNavigation(navbar, navLinks) {
    if (navbar.dataset.standardNavBound === 'true') return;
    navbar.dataset.standardNavBound = 'true';

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
        setTimeout(function() {
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
      var toggle = event.target.closest('.navbar.site-header-standard #navLinks > .nav-dropdown > .dropdown-toggle');
      if (!toggle) return;
      var dropdown = toggle.parentElement;
      event.stopPropagation();

      if (isCompactInteraction()) {
        event.preventDefault();
        var willOpen = !dropdown.classList.contains('active');
        dropdowns.forEach(function(item) { if (item !== dropdown) closeDropdown(item); });
        dropdown.classList.toggle('active', willOpen);
        toggle.setAttribute('aria-expanded', String(willOpen));
      } else {
        closeDropdown(dropdown);
      }
    }, true);

    navLinks.addEventListener('click', function(event) {
      var link = event.target.closest('a[href]');
      if (!link || link.classList.contains('dropdown-toggle')) return;
      navLinks.classList.remove('active');
      var mobileToggle = document.getElementById('mobileToggle');
      if (mobileToggle) {
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
      dropdowns.forEach(closeDropdown);
    });

    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape') dropdowns.forEach(closeDropdown);
    });
    window.addEventListener('resize', function() { dropdowns.forEach(closeDropdown); }, { passive: true });
  }

  function applyHeader() {
    var navbar = document.getElementById('navbar');
    if (!navbar) return;

    ensureStyles();
    navbar.classList.add('site-header-standard');

    var logo = navbar.querySelector('.nav-logo');
    if (logo) {
      logo.href = siteUrl('index.html');
      var logoImg = logo.querySelector('.logo-img');
      if (logoImg) logoImg.src = siteUrl('assets/images/logo.webp');
    }

    var navLinks = navbar.querySelector('#navLinks');
    if (!navLinks) {
      navLinks = document.createElement('ul');
      navLinks.className = 'nav-links';
      navLinks.id = 'navLinks';
      var container = navbar.querySelector('.container');
      if (container) {
        var logoNode = navbar.querySelector('.nav-logo');
        if (logoNode && logoNode.nextSibling) container.insertBefore(navLinks, logoNode.nextSibling);
        else container.appendChild(navLinks);
      }
    }
    if (navLinks) navLinks.innerHTML = navMarkup();

    ensureSearchMarkup(navbar);
    ensureCta(navbar);
    ensureMobileToggle(navbar);

    if (navLinks) {
      markActive(navLinks);
      bindNavigation(navbar, navLinks);
    }

    ensureSearchEngine();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyHeader, { once: true });
  } else {
    applyHeader();
  }
})();
