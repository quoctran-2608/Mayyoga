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

  // Friendly, non-technical value propositions for both new and experienced learners.
  var statData = [
    ['Tư thế chuẩn', 'Căn chỉnh an toàn'],
    ['Hơi thở đúng', 'Thực hành có nền tảng'],
    ['Hiểu cơ thể', 'An toàn & bền vững']
  ];

  hero.querySelectorAll('.hero-stat').forEach(function (item, index) {
    if (!statData[index]) return;
    var number = item.querySelector('.number');
    var label = item.querySelector('.label');
    if (number) number.textContent = statData[index][0];
    if (label) label.textContent = statData[index][1];
  });

  // Keep the trust badge concise and easy to understand for first-time visitors.
  var trustCard = hero.querySelector('.floating-card.card-2');
  if (trustCard) {
    var trustIcon = trustCard.querySelector('.card-icon');
    var trustTitle = trustCard.querySelector('.card-title');
    var trustSub = trustCard.querySelector('.card-sub');
    if (trustIcon) trustIcon.textContent = '✓';
    if (trustTitle) trustTitle.textContent = 'Học đúng từ nền tảng';
    if (trustSub) trustSub.textContent = 'Tư thế • Hơi thở • Hiểu cơ thể';
  }

  // Final homepage-only refinements. These load after the earlier experimental
  // overrides so the approved logo/search/CTA sizing is restored. Header compactness
  // comes only from the navbar box itself; child controls keep their intended size.
  if (!document.querySelector('style[data-home-hero-final-refinement]')) {
    var finalStyle = document.createElement('style');
    finalStyle.setAttribute('data-home-hero-final-refinement', 'true');
    finalStyle.textContent = [
      'body.home-hero-redesign .hero-content { padding-top: 0 !important; }',
      'body.home-hero-redesign .hero { margin-bottom: 10px !important; }',
      '@media (min-width: 1025px) {',
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
      '  #hero .hero-principles { bottom: -6px !important; }',
      '}',
      '@media (min-width: 769px) and (max-width: 1024px) {',
      '  body.home-hero-redesign .nav-logo .logo-img { height: 62px !important; }',
      '  #hero .hero-principle-title { font-size: 22px !important; font-weight: 550 !important; }',
      '}',
      '@media (max-width: 768px) {',
      '  #hero .hero-principle-title { font-size: clamp(16px, 4.2vw, 19px) !important; font-weight: 550 !important; }',
      '  #hero .hero-principles { margin-top: 30px !important; }',
      '}',
      '@media (max-width: 640px) {',
      '  body.home-hero-redesign .nav-logo .logo-img { height: 56px !important; }',
      '}',
      '@media (max-width: 560px) {',
      '  #hero .hero-principle-title { font-size: 19px !important; }',
      '  #hero .hero-principles { margin-top: 28px !important; }',
      '}',
      '@media (max-width: 380px) {',
      '  #hero .hero-principle-title { font-size: 18px !important; }',
      '}'
    ].join('\n');
    document.head.appendChild(finalStyle);
  }
})();