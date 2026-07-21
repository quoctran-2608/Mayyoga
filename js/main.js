// ===== MayYoga.health — Main JS =====

// Homepage-only assets. Keep homepage experiments isolated from shared pages.
(function loadHomepageAssets() {
  const isHomepage = Boolean(
    document.getElementById('hero') &&
    document.getElementById('hanh-trinh') &&
    document.getElementById('categories')
  );

  if (!isHomepage) return;

  const stylesheets = [
    {
      href: 'css/index-responsive.css?v=1',
      selector: 'link[data-index-responsive]',
      attribute: 'indexResponsive'
    },
    {
      href: 'css/index-hero-principles.css?v=1',
      selector: 'link[data-index-hero-principles]',
      attribute: 'indexHeroPrinciples'
    }
  ];

  stylesheets.forEach(stylesheet => {
    if (document.querySelector(stylesheet.selector)) return;

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = stylesheet.href;
    link.dataset[stylesheet.attribute] = 'true';
    document.head.appendChild(link);
  });

  // Explicitly load the final hero geometry layer for fresh visitors too.
  // Versioned URL avoids stale GitHub Pages/browser cache after hero refinements.
  if (!document.querySelector('script[data-home-hero-visual]')) {
    const script = document.createElement('script');
    script.src = 'js/home-hero-visual.js?v=20260721a';
    script.dataset.homeHeroVisual = 'true';
    document.head.appendChild(script);
  }
})();

function createHeroPrinciples() {
  const principles = document.createElement('div');
  principles.className = 'hero-principles';
  principles.setAttribute('aria-label', 'Ba nguyên tắc nền tảng của Mây Yoga');
  principles.innerHTML = `
    <div class="hero-principle">
      <span class="hero-principle-icon" aria-hidden="true">
        <img src="assets/images/icons/tu_the_chuan_icon.webp" alt="" width="50" height="50">
      </span>
      <div class="hero-principle-copy">
        <div class="hero-principle-title">Tư thế chuẩn</div>
        <div class="hero-principle-subtitle">Căn chỉnh an toàn</div>
      </div>
    </div>

    <div class="hero-principle">
      <span class="hero-principle-icon" aria-hidden="true">
        <img src="assets/images/icons/hoi_tho_dung_icon.webp" alt="" width="50" height="50">
      </span>
      <div class="hero-principle-copy">
        <div class="hero-principle-title">Hơi thở đúng</div>
        <div class="hero-principle-subtitle">Thực hành có nền tảng</div>
      </div>
    </div>

    <div class="hero-principle">
      <span class="hero-principle-icon" aria-hidden="true">
        <img src="assets/images/icons/hieu_co_the_icon.webp" alt="" width="50" height="50">
      </span>
      <div class="hero-principle-copy">
        <div class="hero-principle-title">Hiểu cơ thể</div>
        <div class="hero-principle-subtitle">An toàn & bền vững</div>
      </div>
    </div>
  `;
  return principles;
}

function createHeroTrustCard() {
  const card = document.createElement('div');
  card.className = 'floating-card card-2 hero-trust-card';
  card.setAttribute('aria-label', 'Học đúng từ nền tảng: Tư thế, Hơi thở, Hiểu cơ thể');
  card.innerHTML = `
    <div class="card-icon hero-trust-icon" aria-hidden="true">✓</div>
    <div class="card-text">
      <div class="card-title">Học đúng từ nền tảng</div>
      <div class="card-sub">Tư thế • Hơi thở • Hiểu cơ thể</div>
    </div>
  `;
  return card;
}

function initHomepageHeroEnhancements() {
  const hero = document.getElementById('hero');
  const heroImage = hero?.querySelector('.hero-image');
  if (!hero || !heroImage) return;

  // Retired numeric design: remove 90+ / 10K+ / 30+ completely from the rendered DOM.
  hero.querySelectorAll('.hero-stats').forEach(element => element.remove());

  // Retired rating badge: remove the old 4.9/5 / 2,000+ node instead of reusing/mutating it.
  heroImage.querySelectorAll('.floating-card.card-2').forEach(card => {
    if (!card.classList.contains('hero-trust-card')) card.remove();
  });

  let principles = heroImage.querySelector('.hero-principles');
  if (!principles) {
    principles = createHeroPrinciples();
    heroImage.appendChild(principles);
  } else {
    // Keep the current approved copy even if an older cached DOM/script created the row.
    const titles = principles.querySelectorAll('.hero-principle-title');
    const subtitles = principles.querySelectorAll('.hero-principle-subtitle');
    const copy = [
      ['Tư thế chuẩn', 'Căn chỉnh an toàn'],
      ['Hơi thở đúng', 'Thực hành có nền tảng'],
      ['Hiểu cơ thể', 'An toàn & bền vững']
    ];
    copy.forEach((item, index) => {
      if (titles[index]) titles[index].textContent = item[0];
      if (subtitles[index]) subtitles[index].textContent = item[1];
    });
  }

  if (!heroImage.querySelector('.hero-trust-card')) {
    heroImage.appendChild(createHeroTrustCard());
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHomepageHeroEnhancements, { once: true });
} else {
  initHomepageHeroEnhancements();
}

document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  // ===== Navbar scroll effect =====
  if (navbar) {
    const handleScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  // ===== Mobile menu =====
  if (mobileToggle && navLinks) {
    const closeMobileMenu = () => {
      navLinks.classList.remove('active');
      mobileToggle.classList.remove('active');
      mobileToggle.setAttribute('aria-expanded', 'false');
    };

    mobileToggle.setAttribute('aria-expanded', 'false');

    mobileToggle.addEventListener('click', () => {
      const willOpen = !navLinks.classList.contains('active');
      navLinks.classList.toggle('active', willOpen);
      mobileToggle.classList.toggle('active', willOpen);
      mobileToggle.setAttribute('aria-expanded', String(willOpen));
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (link.classList.contains('dropdown-toggle')) return;
        closeMobileMenu();
      });
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') closeMobileMenu();
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) closeMobileMenu();
    }, { passive: true });
  }

  // ===== Click-based dropdown toggle =====
  document.querySelectorAll('.nav-dropdown .dropdown-toggle').forEach(toggle => {
    toggle.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      const parent = toggle.closest('.nav-dropdown');
      if (!parent) return;

      document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
        if (dropdown !== parent) dropdown.classList.remove('active');
      });
      parent.classList.toggle('active');
    });
  });

  document.addEventListener('click', event => {
    if (!event.target.closest('.nav-dropdown')) {
      document.querySelectorAll('.nav-dropdown').forEach(dropdown => dropdown.classList.remove('active'));
    }
  });

  // ===== Smooth scroll for valid page anchors =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (event) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;

      let target;
      try {
        target = document.querySelector(href);
      } catch (error) {
        return;
      }
      if (!target) return;

      event.preventDefault();
      const offset = (navbar?.offsetHeight || 0) + 20;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    });
  });

  // ===== Scroll reveal =====
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealElements.length) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const siblings = entry.target.parentElement?.querySelectorAll('.reveal') || [];
        let delay = 0;
        siblings.forEach((sibling, index) => {
          if (sibling === entry.target) delay = index * 100;
        });
        window.setTimeout(() => entry.target.classList.add('visible'), Math.min(delay, 500));
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
    revealElements.forEach(element => revealObserver.observe(element));
  } else {
    revealElements.forEach(element => element.classList.add('visible'));
  }

  // ===== Active nav link highlight =====
  const sections = document.querySelectorAll('section[id]');
  if (sections.length) {
    const highlightNav = () => {
      const scrollY = window.scrollY + 100;
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
          });
        }
      });
    };
    highlightNav();
    window.addEventListener('scroll', highlightNav, { passive: true });
  }

  // ===== Hover performance hint =====
  document.querySelectorAll('.category-card, .course-card, .pose-card, .blog-card').forEach(card => {
    card.addEventListener('mouseenter', () => { card.style.willChange = 'transform'; });
    card.addEventListener('mouseleave', () => { card.style.willChange = 'auto'; });
  });

  // ===== Newsletter =====
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', event => {
      event.preventDefault();
      const input = newsletterForm.querySelector('input');
      const button = newsletterForm.querySelector('button');
      const email = input?.value.trim() || '';
      if (!input || !button || !email.includes('@')) return;

      button.textContent = '✓ Đã đăng ký!';
      button.style.background = 'var(--mint-400)';
      input.value = '';
      window.setTimeout(() => {
        button.textContent = 'Đăng ký';
        button.style.background = '';
      }, 3000);
    });
  }

  // ===== Desktop-only hero parallax =====
  const heroImage = document.querySelector('.hero-image');
  if (heroImage && window.innerWidth > 768 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < 800) heroImage.style.transform = `translateY(${scrolled * 0.05}px)`;
    }, { passive: true });
  }

  console.log('🧘 MayYoga.health — Loaded successfully');
});

// Site-wide footer/contact standard. Loaded from main.js so every page that already
// uses the shared site script receives the exact homepage/index footer and sticky buttons.
(function loadCanonicalSiteChrome() {
  if (document.querySelector('script[data-site-chrome-standard]')) return;

  var current = document.currentScript;
  if (!current || !current.src) {
    var scripts = document.querySelectorAll('script[src]');
    for (var i = scripts.length - 1; i >= 0; i--) {
      if (/\/js\/main\.js(?:\?|$)/.test(scripts[i].src)) {
        current = scripts[i];
        break;
      }
    }
  }

  var src = current && current.src
    ? new URL('site-chrome.js?v=20260721c', current.src).href
    : 'js/site-chrome.js?v=20260721c';

  var script = document.createElement('script');
  script.src = src;
  script.defer = true;
  script.setAttribute('data-site-chrome-standard', 'true');
  document.head.appendChild(script);
})();
