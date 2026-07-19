(function () {
  var hero = document.getElementById('hero');
  if (!hero) return;

  document.body.classList.add('home-hero-redesign');

  var image = hero.querySelector('.hero-image > img');
  if (!image) return;

  image.alt = 'Mây Yoga - Hatha Yoga';
  image.loading = 'eager';
  image.decoding = 'async';

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

  var partUrls = [
    'assets/hero-data/v4/part1.txt?v=20260719c',
    'assets/hero-data/v4/part2.txt?v=20260719c',
    'assets/hero-data/v4/part3a.txt?v=20260719c',
    'assets/hero-data/v4/part3b.txt?v=20260719c',
    'assets/hero-data/v4/part3c.txt?v=20260719c',
    'assets/hero-data/v4/part3d.txt?v=20260719c',
    'assets/hero-data/v4/part4a.txt?v=20260719c',
    'assets/hero-data/v4/part4b.txt?v=20260719c',
    'assets/hero-data/v4/part4c.txt?v=20260719c',
    'assets/hero-data/v4/part4d.txt?v=20260719c'
  ];

  Promise.all(partUrls.map(function (url) {
    return fetch(url, { cache: 'force-cache' }).then(function (response) {
      if (!response.ok) throw new Error('Cannot load ' + url);
      return response.text();
    });
  })).then(function (parts) {
    var dataUri = 'data:image/webp;base64,' + parts.join('');
    var preloader = new Image();

    preloader.onload = function () {
      image.removeAttribute('width');
      image.removeAttribute('height');
      image.src = dataUri;
      image.classList.add('hero-visual-ready');
    };

    preloader.onerror = function () {
      console.error('[Mây Yoga hero] Exact uploaded hero_visual4 payload could not be decoded.');
    };

    preloader.src = dataUri;
  }).catch(function (error) {
    console.error('[Mây Yoga hero]', error);
  });
})();
