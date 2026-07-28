// ===== MÂY YOGA — POSE LIBRARY PAGE =====
(function initPoseLibraryPage() {
  'use strict';

  if (window.__mayYogaPoseLibraryBound) return;

  function levelClass(level) {
    if (level === 'Cơ bản') return 'basic';
    if (level === 'Trung cấp') return 'intermediate';
    return 'advanced';
  }

  function createCategoryButton(category, index) {
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'cat-btn' + (index === 0 ? ' active' : '');
    button.dataset.category = category.id;

    var image = document.createElement('img');
    image.className = 'cat-icon-img';
    image.src = category.iconImg;
    image.alt = '';
    image.loading = 'lazy';

    button.append(image, document.createTextNode(category.name));
    return button;
  }

  function createPoseCard(pose, catalog) {
    var link = document.createElement('a');
    link.className = 'pose-card-full';
    link.href = catalog.urlFor(pose.vn);

    var imageWrap = document.createElement('div');
    imageWrap.className = 'pose-img-wrap';
    var image = document.createElement('img');
    image.src = pose.img;
    image.alt = pose.vn;
    image.loading = 'lazy';
    imageWrap.appendChild(image);

    var body = document.createElement('div');
    body.className = 'pose-card-body';

    var top = document.createElement('div');
    top.className = 'pose-top';
    var names = document.createElement('div');
    var name = document.createElement('div');
    name.className = 'pose-name';
    name.textContent = pose.vn;
    var sanskrit = document.createElement('p');
    sanskrit.className = 'pose-sanskrit';
    sanskrit.textContent = pose.san;
    names.append(name, sanskrit);

    var level = document.createElement('span');
    level.className = 'pose-level ' + levelClass(pose.level);
    level.textContent = pose.level;
    top.append(names, level);

    var summary = document.createElement('p');
    summary.className = 'pose-summary';
    summary.textContent = pose.benefits.split('.')[0] + '.';

    var arrow = document.createElement('div');
    arrow.className = 'pose-card-arrow';
    arrow.textContent = 'Xem chi tiết →';

    body.append(top, summary, arrow);
    link.append(imageWrap, body);
    return link;
  }

  function createCategorySection(category, poses, catalog) {
    var section = document.createElement('section');
    section.className = 'category-section';
    section.id = 'cat-' + category.id;

    var container = document.createElement('div');
    container.className = 'container';

    var header = document.createElement('div');
    header.className = 'cat-header';
    var image = document.createElement('img');
    image.src = category.img;
    image.alt = category.name;
    image.loading = 'lazy';

    var copy = document.createElement('div');
    copy.className = 'cat-header-text';
    var heading = document.createElement('h2');
    var icon = document.createElement('img');
    icon.className = 'cat-h2-icon';
    icon.src = category.iconImg;
    icon.alt = '';
    icon.loading = 'lazy';
    heading.append(icon, document.createTextNode(category.name));

    var description = document.createElement('p');
    description.textContent = category.desc;
    var count = document.createElement('p');
    count.className = 'cat-count';
    count.textContent = poses.length + ' tư thế';
    copy.append(heading, description, count);
    header.append(image, copy);

    var grid = document.createElement('div');
    grid.className = 'poses-grid';
    poses.forEach(function(pose) {
      grid.appendChild(createPoseCard(pose, catalog));
    });

    container.append(header, grid);
    section.appendChild(container);
    return section;
  }

  function bindCategoryNav(catNav, main) {
    catNav.addEventListener('click', function(event) {
      var button = event.target.closest('.cat-btn');
      if (!button) return;
      var target = document.getElementById('cat-' + button.dataset.category);
      if (!target) return;

      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      catNav.querySelectorAll('.cat-btn').forEach(function(item) { item.classList.remove('active'); });
      button.classList.add('active');
      button.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    });

    var ticking = false;
    window.addEventListener('scroll', function() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function() {
        var sections = main.querySelectorAll('.category-section');
        var current = 0;
        sections.forEach(function(section, index) {
          if (window.scrollY >= section.offsetTop - 200) current = index;
        });
        catNav.querySelectorAll('.cat-btn').forEach(function(button, index) {
          button.classList.toggle('active', index === current);
        });
        ticking = false;
      });
    }, { passive: true });
  }

  function bindCategoryArrows(catNav) {
    var left = document.getElementById('catScrollLeft');
    var right = document.getElementById('catScrollRight');
    if (!left || !right) return;

    function update() {
      left.classList.toggle('hidden', catNav.scrollLeft <= 8);
      right.classList.toggle('hidden', catNav.scrollLeft >= catNav.scrollWidth - catNav.clientWidth - 8);
    }

    left.addEventListener('click', function() {
      catNav.scrollBy({ left: -220, behavior: 'smooth' });
    });
    right.addEventListener('click', function() {
      catNav.scrollBy({ left: 220, behavior: 'smooth' });
    });
    catNav.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();
  }

  function bindStickyOffset() {
    var navbar = document.getElementById('navbar');
    var catNav = document.querySelector('.cat-nav');
    if (!navbar || !catNav) return;

    function sync() {
      catNav.style.top = navbar.getBoundingClientRect().height + 'px';
    }

    sync();
    window.addEventListener('resize', sync, { passive: true });
    if ('ResizeObserver' in window) new ResizeObserver(sync).observe(navbar);
  }

  function bindBackToTop() {
    var button = document.getElementById('backTop');
    if (!button) return;

    button.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', function() {
      button.style.display = window.scrollY > 600 ? 'block' : 'none';
    }, { passive: true });
  }

  function render() {
    var catalog = window.MAY_YOGA_POSE_CATALOG;
    var catNav = document.getElementById('catNav');
    var main = document.getElementById('posesMain');
    if (!catalog || !catNav || !main) return false;

    window.__mayYogaPoseLibraryBound = true;
    catNav.replaceChildren();
    main.replaceChildren();

    catalog.categories.forEach(function(category, index) {
      catNav.appendChild(createCategoryButton(category, index));
      var poses = catalog.poses.filter(function(pose) { return pose.cat === category.id; });
      main.appendChild(createCategorySection(category, poses, catalog));
    });

    var total = document.querySelector('.poses-hero .stat:first-child .stat-num');
    if (total) total.textContent = String(catalog.count);

    bindCategoryNav(catNav, main);
    bindCategoryArrows(catNav);
    bindStickyOffset();
    bindBackToTop();

    if (window.location.hash) {
      var target = document.querySelector(window.location.hash);
      if (target) window.setTimeout(function() {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }

    window.MAY_YOGA_POSE_LIBRARY_VERSION = '1';
    return true;
  }

  if (!render()) {
    window.addEventListener('mayyoga:pose-catalog-ready', render, { once: true });
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render, { once: true });
  }
})();
