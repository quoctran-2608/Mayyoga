// ===== MayYoga.health — Main JS =====

// Homepage-only responsive layer. Keeping these rules in a separate file prevents
// legacy homepage overrides from affecting article and course pages that share style.css.
(function loadHomepageResponsiveStyles() {
  const isHomepage = Boolean(
    document.getElementById('hero') &&
    document.getElementById('hanh-trinh') &&
    document.getElementById('categories')
  );

  if (!isHomepage || document.querySelector('link[data-index-responsive]')) return;

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'css/index-responsive.css?v=1';
  link.dataset.indexResponsive = 'true';
  document.head.appendChild(link);
})();

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
      document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
        dropdown.classList.remove('active');
      });
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

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
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

        window.setTimeout(() => {
          entry.target.classList.add('visible');
        }, Math.min(delay, 500));

        revealObserver.unobserve(entry.target);
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

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

    window.addEventListener('scroll', highlightNav, { passive: true });
  }

  // ===== Hero counters =====
  const heroStats = document.querySelector('.hero-stats');

  if (heroStats) {
    const animateCounters = () => {
      document.querySelectorAll('.hero-stat .number').forEach(counter => {
        const target = counter.textContent;
        const numMatch = target.match(/[\d.]+/);
        if (!numMatch) return;

        const number = parseFloat(numMatch[0]);
        const suffix = target.replace(numMatch[0], '');
        const duration = 1600;
        const steps = 48;
        const increment = number / steps;
        let current = 0;
        let step = 0;

        const timer = window.setInterval(() => {
          step += 1;
          current += increment;

          if (step >= steps) {
            counter.textContent = target;
            window.clearInterval(timer);
            return;
          }

          const displayNumber = number >= 1000
            ? Math.floor(current / 1000) + 'K'
            : Math.floor(current);

          counter.textContent = displayNumber + suffix;
        }, duration / steps);
      });
    };

    if ('IntersectionObserver' in window) {
      const heroObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          animateCounters();
          heroObserver.unobserve(entry.target);
        });
      }, { threshold: 0.35 });

      heroObserver.observe(heroStats);
    } else {
      animateCounters();
    }
  }

  // ===== Hover performance hint =====
  document.querySelectorAll('.category-card, .course-card, .pose-card, .blog-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.willChange = 'transform';
    });
    card.addEventListener('mouseleave', () => {
      card.style.willChange = 'auto';
    });
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
      if (scrolled < 800) {
        heroImage.style.transform = `translateY(${scrolled * 0.05}px)`;
      }
    }, { passive: true });
  }

  console.log('🧘 MayYoga.health — Loaded successfully');
});

/* ===== RANDOM BLOG ARTICLES ===== */
(function () {
  var allArticles = [
    {
      img: 'assets/images/blog-hatha.webp',
      tag: 'Hatha Yoga',
      title: 'Hatha Yoga là gì? Hướng dẫn toàn diện cho người mới',
      desc: 'Tìm hiểu nguồn gốc, triết lý và lợi ích của Hatha Yoga — nền tảng của mọi trường phái yoga hiện đại.',
      url: 'bai-viet/hatha-yoga-la-gi.html',
      time: '8 phút đọc'
    },
    {
      img: 'assets/images/articles/dinh-tuyen-dung-sai.webp',
      tag: 'Định tuyến',
      title: '5 lỗi định tuyến phổ biến khi tập Yoga và cách khắc phục',
      desc: 'Tập yoga sai tư thế có thể gây chấn thương. Học cách nhận biết và điều chỉnh 5 lỗi phổ biến nhất.',
      url: 'bai-viet/5-loi-dinh-tuyen.html',
      time: '10 phút đọc'
    },
    {
      img: 'assets/images/blog-pranayama.webp',
      tag: 'Pranayama',
      title: 'Pranayama: 3 kỹ thuật thở giúp giảm stress ngay lập tức',
      desc: 'Hơi thở là cầu nối giữa cơ thể và tâm trí. Khám phá 3 kỹ thuật pranayama đơn giản nhưng hiệu quả.',
      url: 'bai-viet/pranayama-ky-thuat-tho.html',
      time: '7 phút đọc'
    },
    {
      img: 'assets/images/articles/hatha-co-ban.webp',
      tag: 'Tư thế',
      title: '5 tư thế Yoga cơ bản ai cũng nên biết',
      desc: 'Nắm vững 5 tư thế nền tảng để xây dựng nền tảng yoga vững chắc và an toàn.',
      url: 'bai-viet/5-tu-the-co-ban.html',
      time: '8 phút đọc'
    },
    {
      img: 'assets/images/articles/thien-nguoi-moi.webp',
      tag: 'Thiền định',
      title: 'Thiền cho người mới: Hướng dẫn từ A đến Z',
      desc: 'Bắt đầu hành trình thiền định với các bước đơn giản, dễ thực hành ngay tại nhà.',
      url: 'bai-viet/thien-cho-nguoi-moi.html',
      time: '9 phút đọc'
    },
    {
      img: 'assets/images/articles/surya-namaskar.webp',
      tag: 'Chuỗi động tác',
      title: 'Chuỗi Chào Mặt Trời — Surya Namaskar toàn diện',
      desc: 'Hướng dẫn chi tiết 12 bước Chào Mặt Trời cùng lợi ích cho cơ thể và tinh thần.',
      url: 'bai-viet/surya-namaskar.html',
      time: '10 phút đọc'
    },
    {
      img: 'assets/images/articles/yoga-buoi-sang.webp',
      tag: 'Luyện tập',
      title: 'Yoga buổi sáng 15 phút cho ngày mới tràn năng lượng',
      desc: 'Bài tập yoga ngắn gọn giúp đánh thức cơ thể, tỉnh táo và sẵn sàng cho ngày mới.',
      url: 'bai-viet/yoga-buoi-sang.html',
      time: '6 phút đọc'
    },
    {
      img: 'assets/images/articles/7-loai-thien.webp',
      tag: 'Thiền định',
      title: '7 loại thiền phổ biến nhất và cách chọn phù hợp',
      desc: 'Tìm hiểu các phương pháp thiền từ chánh niệm đến thiền mantra để chọn loại phù hợp nhất.',
      url: 'bai-viet/7-loai-thien.html',
      time: '9 phút đọc'
    },
    {
      img: 'assets/images/articles/cot-song.webp',
      tag: 'Giải phẫu',
      title: 'Cột sống & Yoga: Hiểu để tập đúng, tập an toàn',
      desc: 'Kiến thức giải phẫu cột sống giúp bạn hiểu tại sao định tuyến đúng lại quan trọng.',
      url: 'bai-viet/cot-song-yoga.html',
      time: '11 phút đọc'
    },
    {
      img: 'assets/images/articles/tho-bung.webp',
      tag: 'Pranayama',
      title: 'Thở bụng đúng cách — nền tảng của mọi kỹ thuật thở',
      desc: 'Hướng dẫn thở bụng đúng kỹ thuật để giảm stress và cải thiện sức khỏe toàn diện.',
      url: 'bai-viet/tho-bung.html',
      time: '6 phút đọc'
    },
    {
      img: 'assets/images/articles/thien-truoc-ngu.webp',
      tag: 'Thiền định',
      title: 'Thiền trước khi ngủ: 5 phút cho giấc ngủ sâu',
      desc: 'Kỹ thuật thiền đơn giản giúp bạn thư giãn hoàn toàn và đi vào giấc ngủ nhanh chóng.',
      url: 'bai-viet/thien-truoc-ngu.html',
      time: '5 phút đọc'
    },
    {
      img: 'assets/images/articles/khop-goi.webp',
      tag: 'Giải phẫu',
      title: 'Bảo vệ đầu gối khi tập Yoga',
      desc: 'Cách bảo vệ khớp gối trong các tư thế yoga phổ biến để tránh chấn thương.',
      url: 'bai-viet/bao-ve-dau-goi.html',
      time: '8 phút đọc'
    },
    {
      img: 'assets/images/articles/nadi-shodhana.webp',
      tag: 'Pranayama',
      title: 'Nadi Shodhana — Thở luân phiên cân bằng năng lượng',
      desc: 'Kỹ thuật thở luân phiên qua hai bên mũi giúp cân bằng hệ thần kinh và tĩnh tâm.',
      url: 'bai-viet/nadi-shodhana.html',
      time: '7 phút đọc'
    },
    {
      img: 'assets/images/articles/ujjayi.webp',
      tag: 'Pranayama',
      title: 'Ujjayi — Hơi thở chiến thắng trong Yoga',
      desc: 'Tìm hiểu kỹ thuật thở Ujjayi giúp tăng sức tập trung và kiểm soát năng lượng.',
      url: 'bai-viet/ujjayi.html',
      time: '7 phút đọc'
    },
    {
      img: 'assets/images/articles/co-core.webp',
      tag: 'Giải phẫu',
      title: 'Cơ Core trong Yoga — Sức mạnh từ trung tâm',
      desc: 'Hiểu vai trò của cơ core và cách kích hoạt đúng trong mỗi tư thế yoga.',
      url: 'bai-viet/co-core.html',
      time: '9 phút đọc'
    },
    {
      img: 'assets/images/articles/thien-chanh-niem.webp',
      tag: 'Thiền định',
      title: 'Thiền chánh niệm — sống trọn vẹn từng khoảnh khắc',
      desc: 'Phương pháp thiền chánh niệm giúp giảm lo âu, tăng sự tập trung và nhận thức.',
      url: 'bai-viet/thien-chanh-niem.html',
      time: '8 phút đọc'
    },
    {
      img: 'assets/images/articles/vai-co.webp',
      tag: 'Giải phẫu',
      title: 'Giải phóng vai gáy — Yoga cho dân văn phòng',
      desc: 'Chuỗi tư thế yoga đơn giản giúp giảm đau vai gáy cho người ngồi nhiều.',
      url: 'bai-viet/giai-phong-vai-gay.html',
      time: '7 phút đọc'
    },
    {
      img: 'assets/images/articles/hong-xuong-chau.webp',
      tag: 'Giải phẫu',
      title: 'Mở hông an toàn trong Yoga',
      desc: 'Hướng dẫn mở khớp hông đúng cách, tránh chấn thương và tăng linh hoạt.',
      url: 'bai-viet/mo-hong-an-toan.html',
      time: '8 phút đọc'
    },
    {
      img: 'assets/images/articles/tho-4-7-8.webp',
      tag: 'Pranayama',
      title: 'Thở 4-7-8 — Kỹ thuật chống lo âu hiệu quả',
      desc: 'Phương pháp thở 4-7-8 giúp giảm lo âu, hạ huyết áp và cải thiện giấc ngủ.',
      url: 'bai-viet/tho-4-7-8.html',
      time: '5 phút đọc'
    },
    {
      img: 'assets/images/articles/thien-khoa-hoc.webp',
      tag: 'Thiền & Khoa học',
      title: 'Thiền và khoa học — Bằng chứng từ nghiên cứu',
      desc: 'Những nghiên cứu khoa học chứng minh lợi ích của thiền định đối với não bộ và sức khỏe.',
      url: 'bai-viet/thien-va-khoa-hoc.html',
      time: '10 phút đọc'
    },
    {
      img: 'assets/images/articles/hatha-goc-re.webp',
      tag: 'Hatha Yoga',
      title: 'Hatha Yoga — Gốc Rễ Của Mọi Hình Thức Yoga Hiện Đại',
      desc: 'Nếu Yoga là một cây đại thụ, thì Hatha chính là thân cây — nơi mọi trường phái đều mọc ra từ đó.',
      url: 'bai-viet/hatha-yoga-goc-re.html',
      time: '6 phút đọc'
    },
    {
      img: 'assets/images/articles/yoga-tai-nha/hero.webp',
      tag: 'Yoga tại nhà',
      title: '6 tư thế Yoga nên tập ngay sau khi thức dậy',
      desc: 'Tư thế nhẹ nhàng giúp đánh thức cơ thể, giải phóng cột sống, tạo năng lượng tích cực — có hình minh hoạ chi tiết.',
      url: 'bai-viet/yoga-tai-nha.html',
      time: '7 phút đọc'
    },
    {
      img: 'assets/images/articles/co-hoanh/hero.webp',
      tag: 'Giải phẫu',
      title: 'Cơ hoành & Hơi thở — Giải phẫu cơ thở quan trọng nhất',
      desc: 'Tại sao 90% người lớn thở sai? Giải phẫu cơ hoành, cơ chế thở đúng, và 4 bài tập luyện cơ thở.',
      url: 'bai-viet/co-hoanh-hoi-tho.html',
      time: '9 phút đọc'
    }
  ];

  function shuffle(array) {
    for (var index = array.length - 1; index > 0; index -= 1) {
      var randomIndex = Math.floor(Math.random() * (index + 1));
      var temporary = array[index];
      array[index] = array[randomIndex];
      array[randomIndex] = temporary;
    }
    return array;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function renderRandomArticles() {
    var grid = document.getElementById('randomBlogGrid');
    if (!grid) return;

    var picked = shuffle(allArticles.slice()).slice(0, 3);
    var html = '';

    picked.forEach(function (article) {
      html += '<div class="blog-card">' +
        '<div class="blog-image"><img loading="lazy" src="' + escapeHtml(article.img) + '" alt="' + escapeHtml(article.tag) + '"></div>' +
        '<div class="blog-body">' +
        '<span class="blog-tag">' + escapeHtml(article.tag) + '</span>' +
        '<h3><a href="' + escapeHtml(article.url) + '">' + escapeHtml(article.title) + '</a></h3>' +
        '<p>' + escapeHtml(article.desc) + '</p>' +
        '<div class="blog-footer">' +
        '<span>' + escapeHtml(article.time) + '</span>' +
        '<a href="' + escapeHtml(article.url) + '" class="read-more">Đọc tiếp →</a>' +
        '</div></div></div>';
    });

    grid.innerHTML = html;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderRandomArticles);
  } else {
    renderRandomArticles();
  }
})();
