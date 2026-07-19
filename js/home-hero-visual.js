(function () {
  var hero = document.getElementById('hero');
  if (!hero) return;

  document.body.classList.add('home-hero-redesign');

  // Load the final geometry overrides after the base hero stylesheet.
  // This removes the desktop right gutter and makes the visual fill the
  // entire right column from the very top to the viewport edge.
  if (!document.querySelector('link[data-home-hero-fix]')) {
    var fixLink = document.createElement('link');
    fixLink.rel = 'stylesheet';
    fixLink.href = 'css/hero-fix-v4.css?v=20260719d';
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

  // Use the real repository asset directly. The old loader rebuilt an older
  // visual from multiple base64 text fragments and could overwrite the newer
  // hero-visual.webp after the page had already rendered.
  var visualSrc = 'assets/images/hero-visual.webp?v=20260719d';
  if (image.getAttribute('src') !== visualSrc) image.src = visualSrc;
  image.classList.add('hero-visual-ready');

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
})();
