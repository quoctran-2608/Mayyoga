(function () {
  var hero = document.getElementById('hero');
  if (!hero) return;

  document.body.classList.add('home-hero-redesign');

  // Load the final geometry/content overrides after the base hero stylesheet.
  if (!document.querySelector('link[data-home-hero-fix]')) {
    var fixLink = document.createElement('link');
    fixLink.rel = 'stylesheet';
    fixLink.href = 'css/hero-fix-v4.css?v=20260719f';
    fixLink.setAttribute('data-home-hero-fix', 'true');
    document.head.appendChild(fixLink);
  }

  var image = hero.querySelector('.hero-image > img');
  if (!image) return;

  image.alt = 'Mây Yoga - Hatha Yoga';
  image.loading = 'eager';
  image.decoding = 'async';
  image.removeAttribute('width');
  image.removeAttribute('height');

  // Use the real repository asset directly so no legacy payload can overwrite it.
  var visualSrc = 'assets/images/hero-visual.webp?v=20260719f';
  if (image.getAttribute('src') !== visualSrc) image.src = visualSrc;
  image.classList.add('hero-visual-ready');

  // Final homepage-only refinements. Content creation/removal lives in main.js;
  // this file is intentionally limited to geometry and visual presentation.
  if (!document.querySelector('style[data-home-hero-final-refinement]')) {
    var finalStyle = document.createElement('style');
    finalStyle.setAttribute('data-home-hero-final-refinement', 'true');
    finalStyle.textContent = [
      'body.home-hero-redesign .hero-content { padding-top: 0 !important; padding-bottom: 50px !important; }',
      'body.home-hero-redesign .hero { margin-bottom: 0 !important; }',

      // Do not change opacity on the whole badge: that would fade text/icons too.
      // Use a genuinely translucent glass background with only a light blur.
      'body.home-hero-redesign .hero-image .floating-card.card-1 {',
      '  background: rgba(255, 255, 255, 0.66) !important;',
      '  -webkit-backdrop-filter: blur(4px) saturate(106%) !important;',
      '  backdrop-filter: blur(4px) saturate(106%) !important;',
      '  border: 1px solid rgba(255, 255, 255, 0.46) !important;',
      '  box-shadow: 0 10px 28px rgba(34, 61, 43, 0.09) !important;',
      '}',
      'body.home-hero-redesign .hero-image .hero-trust-card {',
      '  background: rgba(255, 255, 255, 0.70) !important;',
      '  -webkit-backdrop-filter: blur(4px) saturate(106%) !important;',
      '  backdrop-filter: blur(4px) saturate(106%) !important;',
      '  border: 1px solid rgba(255, 255, 255, 0.50) !important;',
      '  box-shadow: 0 10px 28px rgba(34, 61, 43, 0.10) !important;',
      '}',

      '@media (min-width: 1181px) {',
      '  body.home-hero-redesign .hero .container { grid-template-columns: 45% 55% !important; }',
      '  #hero .hero-principles { left: -81.8181818% !important; }',
      '}',
      '@media (min-width: 1025px) and (max-width: 1180px) {',
      '  #hero .hero-principles { left: -85.1851852% !important; }',
      '}',
      '@media (min-width: 1025px) {',
      '  body.home-hero-redesign .hero { padding-bottom: 52px !important; }',
      '  body.home-hero-redesign .hero-image > img {',
      '    top: 0 !important;',
      '    right: 0 !important;',
      '    bottom: -52px !important;',
      '    left: 0 !important;',
      '    width: 100% !important;',
      '    max-width: 100% !important;',
      '    height: calc(100% + 52px) !important;',
      '    max-height: none !important;',
      '    object-fit: cover !important;',
      '    object-position: right center !important;',
      '  }',
      '  body.home-hero-redesign .hero-image .hero-trust-card { bottom: 44px !important; }',
      '  body.home-hero-redesign .navbar, body.home-hero-redesign .navbar.scrolled {',
      '    height: 96px !important;',
      '    min-height: 96px !important;',
      '    margin-bottom: 0 !important;',
      '    padding-top: 0 !important;',
      '    padding-bottom: 0 !important;',
      '  }',
      '  body.home-hero-redesign .nav-logo .logo-img { height: 84px !important; }',
      '  body.home-hero-redesign .nav-links { gap: clamp(26px, 2.3vw, 42px) !important; }',
      '  body.home-hero-redesign .nav-links > li:first-child > a::after { bottom: -18px !important; }',
      '  body.home-hero-redesign .nav-search input { height: 52px !important; }',
      '  body.home-hero-redesign .nav-cta .btn { height: 54px !important; min-width: 190px !important; }',
      '  #hero .hero-principle-title {',
      '    font-size: clamp(23px, 1.38vw, 27px) !important;',
      '    font-weight: 550 !important;',
      '  }',
      '  #hero .hero-principles { bottom: 10px !important; }',
      '  #hero .hero-principle-icon { width: 46px !important; height: 46px !important; flex-basis: 46px !important; }',
      '}',
      '@media (min-width: 769px) and (max-width: 1024px) {',
      '  body.home-hero-redesign .nav-logo .logo-img { height: 62px !important; }',
      '  #hero .hero-principle-title { font-size: 22px !important; font-weight: 550 !important; }',
      '  #hero .hero-principle-icon { width: 46px !important; height: 46px !important; flex-basis: 46px !important; }',
      '}',
      '@media (max-width: 768px) {',
      '  #hero .hero-principle-title { font-size: clamp(16px, 4.2vw, 19px) !important; font-weight: 550 !important; }',
      '  #hero .hero-principles { margin-top: 30px !important; }',
      '  #hero .hero-principle-icon { width: 36px !important; height: 36px !important; flex-basis: 36px !important; }',
      '}',
      '@media (max-width: 640px) {',
      '  body.home-hero-redesign .nav-logo .logo-img { height: 56px !important; }',
      '}',
      '@media (max-width: 560px) {',
      '  #hero .hero-principle-title { font-size: 19px !important; }',
      '  #hero .hero-principles { margin-top: 28px !important; }',
      '  #hero .hero-principle-icon { width: 38px !important; height: 38px !important; flex-basis: 38px !important; }',
      '}',
      '@media (max-width: 380px) {',
      '  #hero .hero-principle-title { font-size: 18px !important; }',
      '  #hero .hero-principle-icon { width: 36px !important; height: 36px !important; flex-basis: 36px !important; }',
      '}'
    ].join('\n');
    document.head.appendChild(finalStyle);
  }
})();
