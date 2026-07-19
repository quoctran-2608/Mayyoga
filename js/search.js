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
