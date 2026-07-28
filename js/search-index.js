// ===== MÂY YOGA — SEARCH CONTENT INDEX V2 =====
// Articles and hub pages are maintained here. Pose entries are generated from
// MAY_YOGA_POSE_CATALOG so search can never drift from the public pose library.
(function buildMayYogaSearchIndex() {
  'use strict';

  function entry(title, tag, url, img, keywords, time) {
    return {
      title: title,
      tag: tag,
      url: url,
      img: img || 'assets/images/hero.webp',
      time: time || '5 phút đọc',
      content: [title, tag, keywords || ''].join(' ')
    };
  }

  var contentEntries = [
    entry('Yoga cho người mới — Hướng dẫn toàn tập', 'Người mới', 'bai-viet/yoga-cho-nguoi-moi.html', 'assets/images/articles/blog-featured/yoga-beginner.jpg', 'bắt đầu tập yoga nền tảng lộ trình tư thế cơ bản'),
    entry('Hatha Yoga — Kiến thức từ cơ bản đến nâng cao', 'Hatha Yoga', 'hatha-yoga.html', 'assets/images/blog-hatha.webp', 'asana hơi thở triết lý thực hành'),
    entry('88 Tư thế Yoga chi tiết', 'Thư viện tư thế', 'tu-the-yoga.html', 'assets/images/hero.webp', 'Sanskrit lợi ích chống chỉ định hướng dẫn định tuyến'),
    entry('Pranayama — Thư viện kỹ thuật thở', 'Pranayama', 'pranayama.html', 'assets/images/blog-pranayama.webp', 'hơi thở năng lượng nadi ujjayi giảm stress'),
    entry('Thiền định — Hướng dẫn thực hành', 'Thiền định', 'thien-dinh.html', 'assets/images/articles/blog-featured/meditation.jpg', 'chánh niệm mindfulness ngủ ngon giảm stress'),
    entry('Giải phẫu Yoga', 'Giải phẫu', 'giai-phau-yoga.html', 'assets/images/articles/cot-song.webp', 'cột sống khớp cơ sinh học định tuyến an toàn'),
    entry('Tự tập Yoga tại nhà', 'Luyện tập', 'tu-tap-tai-nha.html', 'assets/images/articles/yoga-tai-nha/hero.webp', 'bài tập chuỗi tập mục tiêu người mới'),
    entry('Yoga Online 1:1 cùng Mây', 'Khoá học', 'hoc-yoga-online.html', 'assets/images/hero.webp', 'lớp riêng trực tuyến bảng giá tư vấn'),
    entry('Đào tạo Giáo viên Yoga YTT 200H', 'Khoá học', 'dao-tao-huan-luyen-vien-200h.html', 'assets/images/hero.webp', 'đào tạo huấn luyện viên chứng chỉ mentor'),
    entry('Góc Huấn Luyện Viên Yoga', 'Huấn luyện viên', 'goc-huan-luyen-vien.html', 'assets/images/hero.webp', 'cueing sequencing giải phẫu thương hiệu giáo viên'),
    entry('Trắc nghiệm Yoga và sức khỏe', 'Trắc nghiệm', 'trac-nghiem.html', 'assets/images/hero.webp', 'dosha luân xa sức khỏe trị liệu SNAPS'),

    entry('Hatha Yoga là gì? Hướng dẫn toàn diện cho người mới', 'Hatha Yoga', 'bai-viet/hatha-yoga-la-gi.html', 'assets/images/blog-hatha.webp', 'nguồn gốc triết lý asana pranayama lợi ích'),
    entry('Hatha Yoga — Gốc rễ của Yoga hiện đại', 'Hatha Yoga', 'bai-viet/hatha-yoga-goc-re.html', 'assets/images/articles/hatha-goc-re.webp', 'Vinyasa Ashtanga Iyengar Yin cân bằng thân tâm'),
    entry('5 lỗi định tuyến phổ biến khi tập Yoga', 'Định tuyến', 'bai-viet/5-loi-dinh-tuyen.html', 'assets/images/articles/dinh-tuyen-dung-sai.webp', 'alignment gối vai hông lưng cổ tay chấn thương'),
    entry('Định tuyến đúng và sai trong Yoga', 'Định tuyến', 'bai-viet/dinh-tuyen-dung-sai.html', 'assets/images/articles/dinh-tuyen-dung-sai.webp', 'chiến binh chó úp mặt tam giác tư thế cây'),
    entry('5 tư thế Yoga cơ bản ai cũng nên biết', 'Tư thế', 'bai-viet/5-tu-the-co-ban.html', 'assets/images/articles/hatha-co-ban.webp', 'Tadasana chó úp mặt chiến binh cây em bé'),
    entry('Chuỗi Chào Mặt Trời — Surya Namaskar', 'Chuỗi động tác', 'bai-viet/surya-namaskar.html', 'assets/images/articles/surya-namaskar.webp', '12 bước mặt trời flow khởi động'),
    entry('Yoga buổi sáng 15 phút', 'Luyện tập', 'bai-viet/yoga-buoi-sang.html', 'assets/images/articles/yoga-buoi-sang.webp', 'năng lượng thức dậy cat cow chào mặt trời'),
    entry('6 tư thế Yoga sau khi thức dậy', 'Yoga tại nhà', 'bai-viet/yoga-tai-nha.html', 'assets/images/articles/yoga-tai-nha/hero.webp', 'mèo bò chó úp mặt gập người rắn hổ mang'),
    entry('Lộ trình Yoga 30 ngày cho người mới', 'Người mới', 'bai-viet/lo-trinh-30-ngay.html', 'assets/images/articles/lo-trinh-30-ngay.webp', 'kế hoạch từng tuần thói quen thực hành'),
    entry('Bài tập Yoga theo mục tiêu', 'Theo mục tiêu', 'bai-viet/bai-tap-theo-muc-tieu.html', 'assets/images/articles/bai-tap-theo-muc-tieu.webp', 'đau lưng stress linh hoạt ngủ ngon giảm cân'),
    entry('FAQ — Câu hỏi thường gặp về Yoga', 'FAQ', 'bai-viet/faq.html', 'assets/images/articles/faq-yoga.webp', 'người cứng giảm cân thời gian tập dụng cụ an toàn'),

    entry('Pranayama — Kỹ thuật thở giảm stress', 'Pranayama', 'bai-viet/pranayama-ky-thuat-tho.html', 'assets/images/blog-pranayama.webp', 'thở bụng 4-7-8 nadi shodhana'),
    entry('Thở bụng đúng cách', 'Pranayama', 'bai-viet/tho-bung.html', 'assets/images/articles/tho-bung.webp', 'cơ hoành diaphragmatic breathing phó giao cảm'),
    entry('Nadi Shodhana — Thở luân phiên', 'Pranayama', 'bai-viet/nadi-shodhana.html', 'assets/images/articles/nadi-shodhana.webp', 'Ida Pingala Sushumna cân bằng năng lượng'),
    entry('Ujjayi — Hơi thở chiến thắng', 'Pranayama', 'bai-viet/ujjayi.html', 'assets/images/articles/ujjayi.webp', 'ocean breath vinyasa ashtanga tạo nhiệt'),
    entry('Thở 4-7-8 chống lo âu', 'Pranayama', 'bai-viet/tho-4-7-8.html', 'assets/images/articles/tho-4-7-8.webp', 'ngủ ngon phó giao cảm giảm nhịp tim'),
    entry('Cơ hoành và hơi thở', 'Giải phẫu', 'bai-viet/co-hoanh-hoi-tho.html', 'assets/images/articles/co-hoanh/hero.webp', 'diaphragm dung tích phổi bandha hô hấp'),

    entry('Thiền cho người mới từ A đến Z', 'Thiền định', 'bai-viet/thien-cho-nguoi-moi.html', 'assets/images/articles/thien-nguoi-moi.webp', 'meditation tập trung hơi thở 5 phút'),
    entry('7 loại thiền phổ biến', 'Thiền định', 'bai-viet/7-loai-thien.html', 'assets/images/articles/7-loai-thien.webp', 'mindfulness vipassana zen metta yoga nidra'),
    entry('Thiền trước khi ngủ', 'Thiền định', 'bai-viet/thien-truoc-ngu.html', 'assets/images/articles/thien-truoc-ngu.webp', 'body scan 4-7-8 giấc ngủ sâu'),
    entry('Thiền chánh niệm', 'Thiền định', 'bai-viet/thien-chanh-niem.html', 'assets/images/articles/thien-chanh-niem.webp', 'mindfulness MBSR hiện tại không phán xét'),
    entry('Thiền và khoa học', 'Thiền và khoa học', 'bai-viet/thien-va-khoa-hoc.html', 'assets/images/articles/thien-khoa-hoc.webp', 'MRI não bộ neuroplasticity cortisol amygdala'),

    entry('Cột sống và Yoga', 'Giải phẫu', 'bai-viet/cot-song-yoga.html', 'assets/images/articles/cot-song.webp', 'đốt sống đĩa đệm neutral spine an toàn'),
    entry('Bảo vệ đầu gối khi tập Yoga', 'Giải phẫu', 'bai-viet/bao-ve-dau-goi.html', 'assets/images/articles/khop-goi.webp', 'khớp gối sụn chêm dây chằng Padmasana Virasana'),
    entry('Cơ Core trong Yoga', 'Giải phẫu', 'bai-viet/co-core.html', 'assets/images/articles/co-core.webp', 'cơ bụng lưng cơ hoành sàn chậu ổn định'),
    entry('Giải phóng vai gáy', 'Giải phẫu', 'bai-viet/giai-phong-vai-gay.html', 'assets/images/articles/vai-co.webp', 'dân văn phòng cơ thang mở ngực'),
    entry('Mở hông an toàn trong Yoga', 'Giải phẫu', 'bai-viet/mo-hong-an-toan.html', 'assets/images/articles/hong-xuong-chau.webp', 'khớp hông ổ chảo bồ câu bướm malasana'),
    entry('Xương chậu và chuyển động xoay', 'Cơ sinh học', 'bai-viet/xuong-chau-chuyen-dong-xoay.html', 'assets/images/articles/hong-xuong-chau.webp', 'khớp háng xoay trong xoay ngoài hoa sen'),
    entry('Yoga và hệ thần kinh', 'Thần kinh', 'bai-viet/than-kinh-yoga.html', 'assets/images/articles/than-kinh-yoga/hero.webp', 'vagus phó giao cảm cortisol phục hồi'),

    entry('Yoga giảm đau lưng', 'Giảm đau', 'bai-viet/yoga-giam-dau-lung.html', 'assets/images/articles/yoga-giam-dau-lung.webp', 'cat cow em bé nhân sư cầu vặn xoắn'),
    entry('Yoga văn phòng tại bàn làm việc', 'Văn phòng', 'bai-viet/yoga-van-phong.html', 'assets/images/articles/yoga-van-phong.webp', 'cổ vai cổ tay ngồi nhiều desk yoga'),
    entry('Yoga cho cổ vai gáy', 'Cổ vai gáy', 'bai-viet/yoga-co-vai-gay.html', 'assets/images/articles/yoga-co-vai-gay.webp', 'text neck cơ thang luồn kim cá hỗ trợ'),
    entry('Yoga cho đau thần kinh tọa', 'Yoga trị liệu', 'bai-viet/yoga-cho-dau-than-kinh-toa.html', 'assets/images/articles/sciatica/hero.png', 'sciatica piriformis lỗ kim vặn xoắn em bé'),

    entry('Vinyasa Krama Sequencing', 'Sequencing', 'bai-viet/vinyasa-krama.html', 'assets/images/articles/lo-trinh-30-ngay.webp', 'xếp chuỗi peak pose warm up counter pose'),
    entry('Lỗi võng thắt lưng trong Chó Úp Mặt', 'Lâm sàng', 'bai-viet/case-study-vong-that-lung.html', 'assets/images/articles/cot-song.webp', 'banana back core serratus cueing'),
    entry('5 bước xây dựng thương hiệu giáo viên Yoga', 'Kinh doanh', 'bai-viet/thuong-hieu-yoga.html', 'assets/images/articles/bai-tap-theo-muc-tieu.webp', 'niche học viên cộng đồng khóa học'),
    entry('Nghệ thuật Cueing trong Yoga', 'Khẩu lệnh', 'bai-viet/nghe-thuat-cueing.html', 'assets/images/hero.webp', 'verbal cueing giọng nói imagery over cueing'),

    entry('Kiểm tra Dosha Ayurveda', 'Trắc nghiệm', 'trac-nghiem/kiem-tra-dosha.html', 'assets/images/hero.webp', 'Vata Pitta Kapha thể trạng Ayurveda'),
    entry('Kiểm tra luân xa', 'Trắc nghiệm', 'trac-nghiem/kiem-tra-luan-xa.html', 'assets/images/hero.webp', 'chakra năng lượng cân bằng'),
    entry('Đánh giá sức khỏe trước khi tập Yoga', 'Trắc nghiệm', 'trac-nghiem/danh-gia-suc-khoe.html', 'assets/images/hero.webp', 'bệnh lý chấn thương mục tiêu sức khỏe'),
    entry('Đánh giá sau buổi tập Yoga trị liệu', 'Trắc nghiệm', 'trac-nghiem/danh-gia-sau-buoi-tap.html', 'assets/images/hero.webp', 'mức đau vận động cảm xúc tiến trình'),
    entry('Đánh giá SNAPS', 'Trắc nghiệm', 'trac-nghiem/danh-gia-snaps.html', 'assets/images/hero.webp', 'giấc ngủ dinh dưỡng hoạt động tâm lý stress')
  ];

  function poseEntries() {
    var catalog = window.MAY_YOGA_POSE_CATALOG;
    if (!catalog || !Array.isArray(catalog.poses)) return [];

    return catalog.poses.map(function(pose) {
      var categoryName = catalog.categoryNames[pose.cat] || 'Tư thế Yoga';
      return {
        title: pose.vn + ' — ' + pose.san,
        tag: categoryName,
        url: catalog.urlFor(pose.vn),
        img: pose.img,
        time: '5 phút đọc',
        content: [
          pose.vn,
          pose.san,
          pose.level,
          categoryName,
          pose.benefits,
          pose.howto,
          pose.contra
        ].join(' ')
      };
    });
  }

  function publish() {
    var byUrl = new Map();
    contentEntries.concat(poseEntries()).forEach(function(item) {
      byUrl.set(item.url, item);
    });

    window.SEARCH_INDEX = Array.from(byUrl.values());
    window.MAY_YOGA_SEARCH_INDEX_VERSION = '2';
    window.MAY_YOGA_SEARCH_POSE_COUNT = poseEntries().length;
    window.dispatchEvent(new CustomEvent('mayyoga:search-index-ready', {
      detail: {
        total: window.SEARCH_INDEX.length,
        poses: window.MAY_YOGA_SEARCH_POSE_COUNT
      }
    }));
  }

  publish();
  window.addEventListener('mayyoga:pose-catalog-ready', publish, { once: true });
})();
