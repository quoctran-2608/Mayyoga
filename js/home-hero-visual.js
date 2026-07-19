(function () {
  var hero = document.getElementById('hero');
  if (!hero) return;

  document.body.classList.add('home-hero-redesign');

  // Load the final geometry/content overrides after the base hero stylesheet.
  if (!document.querySelector('link[data-home-hero-fix]')) {
    var fixLink = document.createElement('link');
    fixLink.rel = 'stylesheet';
    fixLink.href = 'css/hero-fix-v4.css?v=20260719e';
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
  var visualSrc = 'assets/images/hero-visual.webp?v=20260719e';
  if (image.getAttribute('src') !== visualSrc) image.src = visualSrc;
  image.classList.add('hero-visual-ready');

  // Honest, non-numeric value propositions for a newly launched website.
  var statData = [
    ['Tư thế chuẩn', 'Định tuyến rõ ràng'],
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

  // Replace unverifiable rating/student claims with a compact learning promise.
  var trustCard = hero.querySelector('.floating-card.card-2');
  if (trustCard) {
    var trustIcon = trustCard.querySelector('.card-icon');
    var trustTitle = trustCard.querySelector('.card-title');
    var trustSub = trustCard.querySelector('.card-sub');
    if (trustIcon) trustIcon.textContent = '✓';
    if (trustTitle) trustTitle.textContent = 'Học đúng từ nền tảng';
    if (trustSub) trustSub.textContent = 'Tư thế • Hơi thở • Định tuyến';
  }
})();