// ===== MÂY YOGA — GLOBAL SEARCH V2 =====
// Search owns only search behavior. Navigation and page chrome are separate components.
(function initGlobalSearch() {
  'use strict';

  if (window.__mayYogaSearchEngineLoaded) return;
  window.__mayYogaSearchEngineLoaded = true;

  function resolveCurrentScript() {
    if (document.currentScript && document.currentScript.src) return document.currentScript;
    var scripts = document.querySelectorAll('script[src]');
    for (var index = scripts.length - 1; index >= 0; index -= 1) {
      if (/\/js\/search\.js(?:\?|$)/.test(scripts[index].src)) return scripts[index];
    }
    return null;
  }

  var currentScript = resolveCurrentScript();
  var siteRoot = currentScript && currentScript.src
    ? new URL('../', currentScript.src)
    : new URL(window.MAY_YOGA_SITE_ROOT || '/', window.location.href);

  function absoluteUrl(path) {
    return new URL(path, siteRoot).href;
  }

  function normalize(value) {
    return String(value || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .toLowerCase();
  }

  function clearResults(dropdown) {
    dropdown.replaceChildren();
    dropdown.style.display = 'none';
  }

  function scoreItem(item, query) {
    var title = normalize(item.title);
    var tag = normalize(item.tag);
    var content = normalize(item.content);
    var normalizedQuery = normalize(query.trim());
    var words = normalizedQuery.split(/\s+/).filter(function(word) { return word.length >= 2; });
    var score = 0;

    if (title === normalizedQuery) score += 220;
    else if (title.indexOf(normalizedQuery) !== -1) score += 120;
    if (tag.indexOf(normalizedQuery) !== -1) score += 55;
    if (content.indexOf(normalizedQuery) !== -1) score += 35;

    words.forEach(function(word) {
      if (title.indexOf(word) !== -1) score += 30;
      if (tag.indexOf(word) !== -1) score += 14;
      if (content.indexOf(word) !== -1) score += 7;
    });

    return score;
  }

  function snippetFor(item, query) {
    var content = String(item.content || item.title || '');
    var normalizedContent = normalize(content);
    var normalizedQuery = normalize(query);
    var index = normalizedContent.indexOf(normalizedQuery);
    if (index < 0) return content.slice(0, 130) + (content.length > 130 ? '…' : '');

    var start = Math.max(0, index - 42);
    var end = Math.min(content.length, index + query.length + 82);
    return (start ? '…' : '') + content.slice(start, end) + (end < content.length ? '…' : '');
  }

  function resultNode(result) {
    var link = document.createElement('a');
    link.className = 'search-result-item';
    link.href = absoluteUrl(result.item.url);

    var imageWrap = document.createElement('div');
    imageWrap.className = 'search-result-img';
    var image = document.createElement('img');
    image.src = absoluteUrl(result.item.img || 'assets/images/hero.webp');
    image.alt = '';
    image.loading = 'lazy';
    imageWrap.appendChild(image);

    var info = document.createElement('div');
    info.className = 'search-result-info';

    var tag = document.createElement('span');
    tag.className = 'search-result-tag';
    tag.textContent = result.item.tag;

    var title = document.createElement('div');
    title.className = 'search-result-title';
    title.textContent = result.item.title;

    var snippet = document.createElement('div');
    snippet.className = 'search-result-snippet';
    snippet.textContent = result.snippet;

    info.append(tag, title, snippet);
    link.append(imageWrap, info);
    return link;
  }

  function render(dropdown, results, query) {
    dropdown.replaceChildren();

    var header = document.createElement('div');
    header.className = 'search-results-header';
    header.textContent = results.length
      ? 'Tìm thấy ' + results.length + ' kết quả phù hợp'
      : 'Không tìm thấy kết quả cho “' + query + '”';
    dropdown.appendChild(header);

    results.forEach(function(result) {
      dropdown.appendChild(resultNode(result));
    });

    dropdown.style.display = 'block';
  }

  function bind() {
    var input = document.getElementById('globalSearch');
    var dropdown = document.getElementById('searchDropdown');
    if (!input || !dropdown) return false;
    if (input.dataset.mayYogaSearchBound === 'true') return true;

    input.dataset.mayYogaSearchBound = 'true';
    input.setAttribute('aria-label', 'Tìm kiếm trên Mây Yoga');
    input.setAttribute('aria-controls', 'searchDropdown');
    input.setAttribute('aria-autocomplete', 'list');
    dropdown.setAttribute('role', 'listbox');

    function search(query) {
      var value = query.trim();
      if (value.length < 2) {
        clearResults(dropdown);
        return;
      }

      var index = Array.isArray(window.SEARCH_INDEX) ? window.SEARCH_INDEX : [];
      var results = index
        .map(function(item) {
          return {
            item: item,
            score: scoreItem(item, value),
            snippet: snippetFor(item, value)
          };
        })
        .filter(function(result) { return result.score > 0; })
        .sort(function(a, b) { return b.score - a.score; })
        .slice(0, 8);

      render(dropdown, results, value);
    }

    var debounceTimer = 0;
    input.addEventListener('input', function() {
      window.clearTimeout(debounceTimer);
      var value = input.value;
      debounceTimer = window.setTimeout(function() { search(value); }, 160);
    });

    input.addEventListener('focus', function() {
      if (input.value.trim().length >= 2) search(input.value);
    });

    input.addEventListener('keydown', function(event) {
      var items = Array.prototype.slice.call(dropdown.querySelectorAll('.search-result-item'));
      var activeIndex = items.findIndex(function(item) { return item.classList.contains('active'); });

      if (event.key === 'Escape') {
        clearResults(dropdown);
        input.blur();
        return;
      }

      if (!items.length || (event.key !== 'ArrowDown' && event.key !== 'ArrowUp' && event.key !== 'Enter')) return;

      if (event.key === 'Enter' && activeIndex >= 0) {
        event.preventDefault();
        items[activeIndex].click();
        return;
      }

      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        items.forEach(function(item) { item.classList.remove('active'); });
        activeIndex = event.key === 'ArrowDown'
          ? (activeIndex + 1) % items.length
          : (activeIndex <= 0 ? items.length - 1 : activeIndex - 1);
        items[activeIndex].classList.add('active');
        items[activeIndex].scrollIntoView({ block: 'nearest' });
      }
    });

    document.addEventListener('click', function(event) {
      if (!event.target.closest('#navSearch')) clearResults(dropdown);
    });

    return true;
  }

  function bindWhenReady() {
    if (bind()) return;
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', bind, { once: true });
    }
  }

  bindWhenReady();

  var observer = new MutationObserver(function() {
    if (!bind()) return;
    var navbar = document.getElementById('navbar');
    if (navbar && navbar.getAttribute('data-canonical-header-applied') === 'true') observer.disconnect();
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });

  window.MAY_YOGA_SEARCH_VERSION = '2';
})();
