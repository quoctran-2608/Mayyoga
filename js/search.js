// ===== MâyYoga — Full-text Search Engine =====
(function() {
  'use strict';

  function initSearch() {
    var searchInput = document.getElementById('globalSearch');
    var searchDropdown = document.getElementById('searchDropdown');
    if (!searchInput || !searchDropdown || typeof SEARCH_INDEX === 'undefined') return;

    var basePath = '';
    var path = window.location.pathname;
    if (path.indexOf('/bai-viet/') !== -1 || path.indexOf('/trac-nghiem/') !== -1) basePath = '../';

    function removeDiacritics(str) {
      return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');
    }

    function performSearch(query) {
      if (!query || query.length < 2) {
        searchDropdown.innerHTML = '';
        searchDropdown.style.display = 'none';
        return;
      }

      var q = query.toLowerCase().trim();
      var qNorm = removeDiacritics(q);
      var results = [];

      SEARCH_INDEX.forEach(function(item) {
        var titleLower = item.title.toLowerCase();
        var tagLower = item.tag.toLowerCase();
        var contentLower = item.content.toLowerCase();
        var titleNorm = removeDiacritics(titleLower);
        var tagNorm = removeDiacritics(tagLower);
        var contentNorm = removeDiacritics(contentLower);
        var score = 0;
        var snippet = '';

        if (titleLower.indexOf(q) !== -1 || titleNorm.indexOf(qNorm) !== -1) {
          score += 100;
          snippet = item.title;
        }
        if (tagLower.indexOf(q) !== -1 || tagNorm.indexOf(qNorm) !== -1) score += 50;

        var contentIdx = contentLower.indexOf(q);
        if (contentIdx === -1) contentIdx = contentNorm.indexOf(qNorm);
        if (contentIdx !== -1) {
          score += 30;
          var start = Math.max(0, contentIdx - 40);
          var end = Math.min(item.content.length, contentIdx + q.length + 60);
          snippet = (start > 0 ? '...' : '') + item.content.substring(start, end) + (end < item.content.length ? '...' : '');
        }

        var words = q.split(/\s+/);
        if (words.length > 1) {
          var wordMatches = 0;
          words.forEach(function(w) {
            if (w.length < 2) return;
            var wNorm = removeDiacritics(w);
            if (contentLower.indexOf(w) !== -1 || contentNorm.indexOf(wNorm) !== -1) wordMatches++;
            if (titleLower.indexOf(w) !== -1 || titleNorm.indexOf(wNorm) !== -1) wordMatches += 2;
          });
          score += wordMatches * 10;
        }

        if (score > 0) {
          results.push({
            title: item.title,
            tag: item.tag,
            url: basePath + item.url,
            img: basePath + item.img,
            time: item.time,
            score: score,
            snippet: snippet || item.content.substring(0, 80) + '...'
          });
        }
      });

      results.sort(function(a, b) { return b.score - a.score; });
      renderResults(results.slice(0, 6), q);
    }

    function highlightMatch(text, query) {
      if (!query || query.length < 2) return text;
      var regex = new RegExp('(' + query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
      return text.replace(regex, '<mark>$1</mark>');
    }

    function renderResults(results, query) {
      if (results.length === 0) {
        searchDropdown.innerHTML = '<div class="search-no-result">🔍 Không tìm thấy kết quả cho "<strong>' + query + '</strong>"</div>';
        searchDropdown.style.display = 'block';
        return;
      }

      var html = '<div class="search-results-header">📖 Tìm thấy ' + results.length + ' kết quả</div>';
      results.forEach(function(r) {
        html += '<a href="' + r.url + '" class="search-result-item">' +
          '<div class="search-result-img"><img src="' + r.img + '" alt="" loading="lazy"></div>' +
          '<div class="search-result-info"><span class="search-result-tag">' + r.tag + '</span>' +
          '<div class="search-result-title">' + highlightMatch(r.title, query) + '</div>' +
          '<div class="search-result-snippet">' + highlightMatch(r.snippet, query) + '</div></div></a>';
      });
      searchDropdown.innerHTML = html;
      searchDropdown.style.display = 'block';
    }

    var debounceTimer;
    searchInput.addEventListener('input', function() {
      clearTimeout(debounceTimer);
      var val = this.value;
      debounceTimer = setTimeout(function() { performSearch(val); }, 200);
    });

    document.addEventListener('click', function(e) {
      if (!e.target.closest('#navSearch')) searchDropdown.style.display = 'none';
    });

    searchInput.addEventListener('focus', function() {
      if (this.value.length >= 2) performSearch(this.value);
    });

    searchInput.addEventListener('keydown', function(e) {
      var items = searchDropdown.querySelectorAll('.search-result-item');
      var active = searchDropdown.querySelector('.search-result-item.active');
      var idx = -1;
      if (active) items.forEach(function(item, i) { if (item === active) idx = i; });

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (active) active.classList.remove('active');
        idx = (idx + 1) % items.length;
        if (items[idx]) items[idx].classList.add('active');
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (active) active.classList.remove('active');
        idx = idx <= 0 ? items.length - 1 : idx - 1;
        if (items[idx]) items[idx].classList.add('active');
      } else if (e.key === 'Enter' && active) {
        e.preventDefault();
        active.click();
      } else if (e.key === 'Escape') {
        searchDropdown.style.display = 'none';
        searchInput.blur();
      }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initSearch);
  else initSearch();
})();

// ===== HOMEPAGE HERO — refined visual/content v11 =====
(function initHomeHeroRedesign() {
  var hero = document.getElementById('hero');
  if (!hero) return;
  document.body.classList.add('home-hero-redesign');

  if (!document.querySelector('link[data-home-hero-redesign]')) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'css/hero-redesign-v2.css?v=20260719g';
    link.setAttribute('data-home-hero-redesign', 'true');
    document.head.appendChild(link);
  }

  if (!document.querySelector('script[data-home-hero-visual]')) {
    var script = document.createElement('script');
    script.src = 'js/home-hero-visual.js?v=20260719f';
    script.async = false;
    script.setAttribute('data-home-hero-visual', 'true');
    document.head.appendChild(script);
  }
})();

// ===== HOMEPAGE HERO PRINCIPLE TITLE REFINEMENT =====
(function refineHeroPrincipleTitles() {
  function applyRefinement() {
    var hero = document.getElementById('hero');
    if (!hero) return;

    var titles = hero.querySelectorAll('.hero-principle-title');
    if (!titles.length) return;

    // Updated wording requested for the first principle.
    titles[0].textContent = 'Tư thế chuẩn';

    if (!document.querySelector('style[data-hero-principle-title-refinement]')) {
      var style = document.createElement('style');
      style.setAttribute('data-hero-principle-title-refinement', 'true');
      style.textContent = [
        '#hero .hero-principle-title {',
        '  font-size: clamp(21px, 1.28vw, 25px) !important;',
        '  font-weight: 550 !important;',
        '  line-height: 1.04 !important;',
        '}',
        '@media (min-width: 1025px) {',
        '  #hero .hero-principles { bottom: 4px !important; }',
        '  body.home-hero-redesign .navbar, body.home-hero-redesign .navbar.scrolled {',
        '    min-height: 94px !important;',
        '    padding: 4px 0 !important;',
        '  }',
        '  body.home-hero-redesign .nav-logo .logo-img { height: 68px !important; }',
        '  body.home-hero-redesign .nav-links { gap: clamp(22px, 2vw, 36px) !important; }',
        '  body.home-hero-redesign .nav-links > li:first-child > a::after { bottom: -14px !important; }',
        '  body.home-hero-redesign .nav-search input { height: 46px !important; }',
        '  body.home-hero-redesign .nav-cta .btn { height: 48px !important; min-width: 180px !important; }',
        '  body.home-hero-redesign .hero { padding-top: 94px !important; }',
        '  body.home-hero-redesign .hero .container { min-height: calc(100svh - 94px) !important; }',
        '}',
        '@media (min-width: 769px) and (max-width: 1024px) {',
        '  #hero .hero-principle-title { font-size: 21px !important; }',
        '  body.home-hero-redesign .navbar, body.home-hero-redesign .navbar.scrolled { min-height: 72px !important; padding: 3px 0 !important; }',
        '  body.home-hero-redesign .nav-logo .logo-img { height: 54px !important; }',
        '}',
        '@media (max-width: 768px) {',
        '  #hero .hero-principle-title { font-size: clamp(15px, 4vw, 18px) !important; }',
        '  #hero .hero-principles { margin-top: 26px !important; }',
        '}',
        '@media (max-width: 640px) {',
        '  body.home-hero-redesign .navbar, body.home-hero-redesign .navbar.scrolled { min-height: 64px !important; padding: 2px 0 !important; }',
        '  body.home-hero-redesign .nav-logo .logo-img { height: 48px !important; }',
        '}',
        '@media (max-width: 560px) {',
        '  #hero .hero-principle-title { font-size: 18px !important; }',
        '  #hero .hero-principles { margin-top: 24px !important; }',
        '}',
        '@media (max-width: 380px) {',
        '  #hero .hero-principle-title { font-size: 17px !important; }',
        '}'
      ].join('\n');
      document.head.appendChild(style);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyRefinement);
  } else {
    applyRefinement();
  }
})();