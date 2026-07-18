(function () {
  var hero = document.getElementById('hero');
  if (!hero) return;

  document.body.classList.add('home-hero-redesign');

  if (!document.querySelector('link[data-home-hero-fix]')) {
    var fixCss = document.createElement('link');
    fixCss.rel = 'stylesheet';
    fixCss.href = 'css/hero-fix-v4.css?v=20260718h';
    fixCss.setAttribute('data-home-hero-fix', 'true');
    document.head.appendChild(fixCss);
  }

  // Keep hero numbers/text deterministic even when the image is still loading.
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

  image.alt = 'Mây Yoga - Hatha Yoga';
  image.loading = 'eager';
  image.decoding = 'async';

  // Rebuild the supplied transparent WebP from compact repository text parts.
  // This avoids the binary truncation that caused the previous blank visual.
  var partUrls = [
    'assets/hero-data/hero600.part1?v=20260718h',
    'assets/hero-data/hero600.part2?v=20260718h',
    'assets/hero-data/hero600.part3?v=20260718h',
    'assets/hero-data/hero600.part4?v=20260718h'
  ];

  Promise.all(partUrls.map(function (url) {
    return fetch(url, { cache: 'force-cache' }).then(function (response) {
      if (!response.ok) throw new Error('Unable to load hero visual part: ' + url);
      return response.text();
    });
  })).then(function (parts) {
    image.src = 'data:image/webp;base64,' + parts.join('');
    image.width = 600;
    image.height = 600;
    image.classList.add('hero-visual-ready');
  }).catch(function (error) {
    // Never leave the hero blank if a deployment/CDN request fails.
    console.error('[Mây Yoga hero]', error);
    image.src = 'assets/images/hero-real.jpg';
  });
})();
