// ===== MÂY YOGA — INDEX NAVIGATION V2 =====
// Desktop: hover/focus reveals submenus; parent click opens the first child.
// Mobile/tablet/touch: parent tap toggles the submenu so users can choose deliberately.
(function initIndexNavigationV2() {
  'use strict';

  function isCompactInteraction() {
    return window.matchMedia('(max-width: 980px)').matches ||
      window.matchMedia('(hover: none)').matches ||
      window.matchMedia('(pointer: coarse)').matches;
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

  function closeDropdown(dropdown) {
    if (!dropdown) return;
    dropdown.classList.remove('active');
    var toggle = dropdown.querySelector(':scope > .dropdown-toggle');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  }

  function closeSiblingDropdowns(current) {
    document.querySelectorAll('#navLinks > .nav-dropdown.active').forEach(function(dropdown) {
      if (dropdown !== current) closeDropdown(dropdown);
    });
  }

  function markCurrentNavigation(navLinks) {
    var currentPath = normalizePath(window.location.href);

    navLinks.querySelectorAll('a[href]').forEach(function(link) {
      if (link.classList.contains('dropdown-toggle')) return;
      var linkPath = normalizePath(link.href);
      if (!linkPath || linkPath !== currentPath) return;

      link.setAttribute('aria-current', 'page');
      var dropdown = link.closest('.nav-dropdown');
      if (dropdown) dropdown.classList.add('has-current-child');
    });
  }

  function init() {
    var navLinks = document.getElementById('navLinks');
    if (!navLinks) return;

    var dropdowns = Array.prototype.slice.call(navLinks.querySelectorAll(':scope > .nav-dropdown'));
    if (!dropdowns.length) return;

    markCurrentNavigation(navLinks);

    dropdowns.forEach(function(dropdown) {
      var toggle = dropdown.querySelector(':scope > .dropdown-toggle');
      var menu = dropdown.querySelector(':scope > .dropdown-menu');
      var firstItem = menu && menu.querySelector('a[href]');
      if (!toggle || !menu) return;

      toggle.setAttribute('aria-haspopup', 'true');
      toggle.setAttribute('aria-expanded', 'false');

      // Keep the parent URL useful even without JS and make desktop click predictable.
      if (firstItem && (!toggle.getAttribute('href') || toggle.getAttribute('href') === '#')) {
        toggle.setAttribute('href', firstItem.getAttribute('href'));
      }

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
          if (!dropdown.contains(document.activeElement) && !isCompactInteraction()) {
            toggle.setAttribute('aria-expanded', 'false');
          }
        }, 0);
      });

      toggle.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowDown' && firstItem) {
          event.preventDefault();
          dropdown.classList.add('active');
          toggle.setAttribute('aria-expanded', 'true');
          firstItem.focus();
        }

        if (event.key === 'Escape') {
          event.preventDefault();
          closeDropdown(dropdown);
          toggle.focus();
        }
      });
    });

    // Capture phase intentionally runs before the legacy main.js click handler.
    document.addEventListener('click', function(event) {
      var toggle = event.target.closest('#navLinks > .nav-dropdown > .dropdown-toggle');
      if (!toggle) return;

      var dropdown = toggle.parentElement;
      var menu = dropdown && dropdown.querySelector(':scope > .dropdown-menu');
      var firstItem = menu && menu.querySelector('a[href]');
      if (!dropdown || !firstItem) return;

      // Prevent the older click-to-toggle listener from applying desktop behavior to mobile.
      event.stopPropagation();

      if (isCompactInteraction()) {
        event.preventDefault();
        var willOpen = !dropdown.classList.contains('active');
        closeSiblingDropdowns(dropdown);
        dropdown.classList.toggle('active', willOpen);
        toggle.setAttribute('aria-expanded', String(willOpen));
        return;
      }

      // Desktop/precision pointer: clicking a category should enter its first useful item.
      // The parent href already points to that item, so browser-native modifier-click behavior is preserved.
      closeDropdown(dropdown);
    }, true);

    document.addEventListener('keydown', function(event) {
      if (event.key !== 'Escape') return;
      dropdowns.forEach(closeDropdown);
    });

    document.addEventListener('click', function(event) {
      if (event.target.closest('#navLinks')) return;
      dropdowns.forEach(closeDropdown);
    });

    window.addEventListener('resize', function() {
      dropdowns.forEach(closeDropdown);
    }, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
