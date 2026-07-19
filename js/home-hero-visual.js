(function () {
  var hero = document.getElementById('hero');
  if (!hero) return;

  document.body.classList.add('home-hero-redesign');

  if (!document.querySelector('link[data-home-hero-fix]')) {
    var fixCss = document.createElement('link');
    fixCss.rel = 'stylesheet';
    fixCss.href = 'css/hero-fix-v4.css?v=20260719a';
    fixCss.setAttribute('data-home-hero-fix', 'true');
    document.head.appendChild(fixCss);
  }

  var statData = [
    ['16+', 'Tư thế Yoga'],
    ['1K+', 'Học viên'],
    ['5+', 'Năm kinh nghiệm']
  ];

  hero.querySelectorAll('.hero-stat').forEach(function (item, index) {
    if (!statData[index]) return;
    var number = item.querySelector('.number');
    var label = item.querySelector('.label');
    if (number) number.textContent = statData[index][0];
    if (label) label.textContent = statData[index][1];
  });

  var ratingSub = hero.querySelector('.card-2 .card-sub');
  if (ratingSub) ratingSub.textContent = 'Từ 2.000+ học viên';

  var image = hero.querySelector('.hero-image > img');
  if (!image) return;

  var visualSrc = 'assets/images/hero_visual4.webp?v=20260719a';
  var fallbackSrc = 'assets/images/hero-real.jpg';

  image.alt = 'Mây Yoga - Hatha Yoga';
  image.loading = 'eager';
  image.decoding = 'async';

  // Load the uploaded visual off-DOM first so the existing image remains visible
  // until the replacement is fully ready. This prevents a blank hero on deploy.
  var preloader = new Image();
  preloader.onload = function () {
    image.removeAttribute('width');
    image.removeAttribute('height');
    image.src = visualSrc;
    image.classList.add('hero-visual-ready');
  };
  preloader.onerror = function () {
    console.error('[Mây Yoga hero] hero_visual4.webp could not be loaded.');
    image.src = fallbackSrc;
  };
  preloader.src = visualSrc;
})();
