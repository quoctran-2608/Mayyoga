// ===== Mây Yoga — Main Bootstrap =====
// Header/menu ownership belongs exclusively to site-navigation-canonical-v3.js.
(function bootstrapMayYoga() {
  'use strict';

  function resolveCurrentScript() {
    if (document.currentScript && document.currentScript.src) return document.currentScript;
    var scripts = document.querySelectorAll('script[src]');
    for (var i = scripts.length - 1; i >= 0; i--) {
      if (/\/js\/main\.js(?:\?|$)/.test(scripts[i].src)) return scripts[i];
    }
    return null;
  }

  var currentScript = resolveCurrentScript();
  var siteRoot = currentScript && currentScript.src
    ? new URL('../', currentScript.src)
    : new URL('/', window.location.href);

  function siteUrl(path) {
    return new URL(path, siteRoot).href;
  }

  window.MAY_YOGA_SITE_ROOT = siteRoot.href;

  function hasCanonicalStyleEntry() {
    return window.getComputedStyle(document.documentElement)
      .getPropertyValue('--may-yoga-canonical-style-entry')
      .trim() === '1';
  }

  function markSharedStyleEntry() {
    if (!hasCanonicalStyleEntry()) return false;

    var styleLink = Array.prototype.find.call(document.querySelectorAll('link[rel="stylesheet"][href]'), function(link) {
      return /\/css\/style\.css(?:\?|$)/.test(link.href);
    });
    if (!styleLink) return false;

    styleLink.setAttribute('data-header-first-paint', 'true');
    styleLink.setAttribute('data-header-index-canonical', 'true');
    styleLink.setAttribute('data-site-navigation-canonical', 'true');
    styleLink.setAttribute('data-page-entry-motion-off', 'true');
    return true;
  }

  function primeHeaderShell() {
    var navbar = document.getElementById('navbar');
    if (!navbar) return;
    navbar.classList.add('site-header-standard', 'scrolled');
    navbar.setAttribute('data-site-header-standard', 'true');
  }

  function removeLegacyNavigationLoaders() {
    document.querySelectorAll('script[src*="/js/site-navigation-canonical-v2.js"]').forEach(function(script) {
      script.remove();
    });
  }

  function loadCanonicalNavigation() {
    if (document.querySelector('script[data-site-navigation-canonical-v3]')) return;
    removeLegacyNavigationLoaders();

    var script = document.createElement('script');
    script.src = siteUrl('js/site-navigation-canonical-v3.js?v=20260726a');
    script.async = false;
    script.setAttribute('data-site-navigation-canonical', 'true');
    script.setAttribute('data-site-navigation-canonical-v3', 'true');
    document.head.appendChild(script);
  }

  function loadSiteChrome() {
    if (document.querySelector('script[data-site-chrome-standard]')) return;
    var script = document.createElement('script');
    script.src = siteUrl('js/site-chrome.js?v=20260726d');
    script.async = false;
    script.setAttribute('data-site-chrome-standard', 'true');
    document.head.appendChild(script);
  }

  markSharedStyleEntry();
  primeHeaderShell();
  loadCanonicalNavigation();
  loadSiteChrome();

  function onReady(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback, { once: true });
    } else {
      callback();
    }
  }

  function createHeroPrinciples() {
    var principles = document.createElement('div');
    principles.className = 'hero-principles';
    principles.setAttribute('aria-label', 'Ba nguyên tắc nền tảng của Mây Yoga');
    principles.innerHTML = [
      '<div class="hero-principle">',
      '  <span class="hero-principle-icon" aria-hidden="true"><img src="' + siteUrl('assets/images/icons/tu_the_chuan_icon.webp') + '" alt="" width="50" height="50"></span>',
      '  <div class="hero-principle-copy"><div class="hero-principle-title">Tư thế chuẩn</div><div class="hero-principle-subtitle">Căn chỉnh an toàn</div></div>',
      '</div>',
      '<div class="hero-principle">',
      '  <span class="hero-principle-icon" aria-hidden="true"><img src="' + siteUrl('assets/images/icons/hoi_tho_dung_icon.webp') + '" alt="" width="50" height="50"></span>',
      '  <div class="hero-principle-copy"><div class="hero-principle-title">Hơi thở đúng</div><div class="hero-principle-subtitle">Thực hành có nền tảng</div></div>',
      '</div>',
      '<div class="hero-principle">',
      '  <span class="hero-principle-icon" aria-hidden="true"><img src="' + siteUrl('assets/images/icons/hieu_co_the_icon.webp') + '" alt="" width="50" height="50"></span>',
      '  <div class="hero-principle-copy"><div class="hero-principle-title">Hiểu cơ thể</div><div class="hero-principle-subtitle">An toàn &amp; bền vững</div></div>',
      '</div>'
    ].join('');
    return principles;
  }

  function createHeroTrustCard() {
    var card = document.createElement('div');
    card.className = 'floating-card card-2 hero-trust-card';
    card.setAttribute('aria-label', 'Học đúng từ nền tảng: Tư thế, Hơi thở, Hiểu cơ thể');
    card.innerHTML = [
      '<div class="card-icon hero-trust-icon" aria-hidden="true">✓</div>',
      '<div class="card-text"><div class="card-title">Học đúng từ nền tảng</div><div class="card-sub">Tư thế • Hơi thở • Hiểu cơ thể</div></div>'
    ].join('');
    return card;
  }

  function initHomepageHero() {
    var hero = document.getElementById('hero');
    var heroImage = hero && hero.querySelector('.hero-image');
    if (!hero || !heroImage) return;

    hero.querySelectorAll('.hero-stats').forEach(function(node) { node.remove(); });
    heroImage.querySelectorAll('.floating-card.card-2').forEach(function(card) {
      if (!card.classList.contains('hero-trust-card')) card.remove();
    });

    var principles = heroImage.querySelector('.hero-principles');
    if (!principles) heroImage.appendChild(createHeroPrinciples());
    if (!heroImage.querySelector('.hero-trust-card')) heroImage.appendChild(createHeroTrustCard());
  }

  function initSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
      anchor.addEventListener('click', function(event) {
        var href = anchor.getAttribute('href');
        if (!href || href === '#') return;

        var target;
        try {
          target = document.querySelector(href);
        } catch (error) {
          return;
        }
        if (!target) return;

        event.preventDefault();
        var navbar = document.getElementById('navbar');
        var offset = (navbar ? navbar.offsetHeight : 0) + 20;
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      });
    });
  }

  function initHoverHints() {
    document.querySelectorAll('.category-card, .course-card, .pose-card, .blog-card').forEach(function(card) {
      card.addEventListener('mouseenter', function() { card.style.willChange = 'transform'; });
      card.addEventListener('mouseleave', function() { card.style.willChange = 'auto'; });
    });
  }

  function initNewsletter() {
    var form = document.querySelector('.newsletter-form');
    if (!form) return;

    form.addEventListener('submit', function(event) {
      event.preventDefault();
      var input = form.querySelector('input');
      var button = form.querySelector('button');
      var email = input ? input.value.trim() : '';
      if (!input || !button || email.indexOf('@') === -1) return;

      button.textContent = '✓ Đã đăng ký!';
      button.style.background = 'var(--mint-400)';
      input.value = '';
      window.setTimeout(function() {
        button.textContent = 'Đăng ký';
        button.style.background = '';
      }, 3000);
    });
  }

  function initHeroParallax() {
    var heroImage = document.querySelector('.hero-image');
    if (!heroImage || window.innerWidth <= 768 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    window.addEventListener('scroll', function() {
      var scrolled = window.scrollY;
      if (scrolled < 800) heroImage.style.transform = 'translateY(' + (scrolled * 0.05) + 'px)';
    }, { passive: true });
  }

  onReady(function() {
    initHomepageHero();
    initSmoothAnchors();
    initHoverHints();
    initNewsletter();
    initHeroParallax();
  });
})();
