(function () {
  var hero = document.getElementById('hero');
  if (!hero) return;

  document.body.classList.add('home-hero-redesign');

  if (!document.querySelector('link[data-home-hero-fix]')) {
    var fixCss = document.createElement('link');
    fixCss.rel = 'stylesheet';
    fixCss.href = 'css/hero-fix-v4.css?v=20260718k';
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

  image.alt = 'Mây Yoga - Hatha Yoga';
  image.loading = 'eager';
  image.decoding = 'async';

  var fallbackSrc = 'assets/images/hero-real.jpg';

  // Verified chunks of the transparent visual supplied by the user.
  // Each chunk is integrity-checked in the repository before being referenced.
  var partUrls = [
    'assets/hero-data/v2/part1?v=20260718k',
    'assets/hero-data/v2/part2?v=20260718k',
    'assets/hero-data/v2/part3?v=20260718k',
    'assets/hero-data/v2/part4?v=20260718k',
    'assets/hero-data/v2/part5?v=20260718k',
    'assets/hero-data/v2/part6_1?v=20260718k',
    'assets/hero-data/v2/part6_2?v=20260718k',
    'assets/hero-data/v2/part6_3?v=20260718k',
    'assets/hero-data/v2/part7_1?v=20260718k',
    'assets/hero-data/v2/part7_2?v=20260718k',
    'assets/hero-data/v2/part7_3?v=20260718k',
    'assets/hero-data/v2/part8_1?v=20260718k',
    'assets/hero-data/v2/part8_2?v=20260718k',
    'assets/hero-data/v2/part8_3?v=20260718k',
    'assets/hero-data/v2/part9_1?v=20260718k',
    'assets/hero-data/v2/part9_2?v=20260718k',
    'assets/hero-data/v2/part9_3?v=20260718k'
  ];

  Promise.all(partUrls.map(function (url) {
    return fetch(url, { cache: 'force-cache' }).then(function (response) {
      if (!response.ok) throw new Error('Unable to load hero visual part: ' + url);
      return response.text();
    });
  })).then(function (parts) {
    var dataUri = 'data:image/webp;base64,' + parts.join('');

    // Decode off-DOM first. The visible fallback remains on screen until the
    // final visual is confirmed valid, so the hero can never turn blank.
    var preloader = new Image();
    preloader.onload = function () {
      image.src = dataUri;
      image.width = 600;
      image.height = 600;
      image.classList.add('hero-visual-ready');
    };
    preloader.onerror = function () {
      console.error('[Mây Yoga hero] Verified visual payload could not be decoded.');
      image.src = fallbackSrc;
    };
    preloader.src = dataUri;
  }).catch(function (error) {
    console.error('[Mây Yoga hero]', error);
    image.src = fallbackSrc;
  });
})();
