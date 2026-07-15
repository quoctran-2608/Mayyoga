import os
import json

root_dir = '/Users/phanthumay/Desktop/mayyoga.health/web'
out_dir = os.path.join(root_dir, "bai-viet")

base_html = """<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title} | YTT Insight</title>
  <meta name="description" content="{desc}">
  <link rel="stylesheet" href="../css/style.css?v=6">
  <link rel="icon" type="image/x-icon" href="../favicon.ico">
  <style>
    .article-tag { background: rgba(212,175,55,0.1); color: #d4af37; border: 1px solid rgba(212,175,55,0.3); }
    .callout-box.ytt-insight { background: #fffcf5; border-left: 4px solid #d4af37; border-radius: 8px; padding: 20px; margin: 24px 0; }
    .ytt-insight .callout-title { color: #8c7324; font-weight: 700; margin-bottom: 8px; display: flex; align-items: center; gap: 8px; }
  </style>
</head>
<body>

  <!-- ===== NAVBAR ===== -->
  <nav class="navbar scrolled" id="navbar">
    <div class="container">
      <a href="../index.html" class="nav-logo"><img src="../assets/images/logo.webp" alt="Mây Yoga" class="logo-img"></a>
      <ul class="nav-links" id="navLinks">
        <li><a href="../index.html">Trang chủ</a></li>
        <li><a href="../ve-may-yoga.html">Về Mây Yoga</a></li>
        <li class="nav-dropdown">
          <a href="#" class="dropdown-toggle">Kiến thức Yoga <span class="chevron">▾</span></a>
          <ul class="dropdown-menu">
            <li><a href="../bai-viet/yoga-cho-nguoi-moi.html">🌱 Yoga cho người mới</a></li>
            <li><a href="../tu-the-yoga.html">🧘 90 Tư thế Yoga</a></li>
            <li><a href="../bai-viet/pranayama-ky-thuat-tho.html">🌬️ Pranayama</a></li>
            <li><a href="../bai-viet/thien-cho-nguoi-moi.html">🕊️ Thiền định</a></li>
            <li><a href="../giai-phau-yoga.html">🫀 Giải phẫu Yoga</a></li>
          </ul>
        </li>
        <li><a href="../goc-huan-luyen-vien.html">Góc Huấn Luyện</a></li>
        <li><a href="../trac-nghiem.html">Trắc nghiệm</a></li>
      </ul>
      <div class="nav-search" id="navSearch">
        <input type="text" id="globalSearch" placeholder="🔍 Tìm tư thế, bài viết..." autocomplete="off">
        <div class="search-dropdown" id="searchDropdown"></div>
      </div>
      <div class="nav-cta"><a href="../goc-huan-luyen-vien.html#ytt-register" class="btn" style="background:#d4af37;color:#1a2419;">Nhận tư vấn YTT</a></div>
      <button class="mobile-toggle" id="mobileToggle" aria-label="Menu"><span></span><span></span><span></span></button>
    </div>
  </nav>

  <!-- ARTICLE HEADER -->
  <header class="article-header">
    <div class="container">
      <div class="breadcrumb">
        <a href="../index.html">Trang chủ</a>
        <span class="sep">›</span>
        <a href="../goc-huan-luyen-vien.html">Góc Huấn Luyện</a>
        <span class="sep">›</span>
        <span>{category}</span>
      </div>
      <span class="article-tag">{tag}</span>
      <h1>{title}</h1>
      <div class="article-meta">
        <span class="meta-item">📅 14/04/2026</span>
        <span class="meta-item">⏱ 10 phút đọc</span>
        <span class="meta-item">👤 Biên soạn: Mây — Ban Giảng Huấn YTT 200h</span>
      </div>
    </div>
  </header>

  <!-- ARTICLE BODY -->
  <main class="article-body">
    <div class="container">

      <div class="callout-box ytt-insight">
        <div class="callout-title">💡 Dành Riêng Cho Giáo Viên Yoga</div>
        <p style="margin:0; font-size:0.95rem; line-height:1.6; color:#555;">Tài liệu nằm trong thư viện chuyên sâu của khóa đào tạo YTT 200h tại Giang Metta Yoga Academy, cung cấp kiến thức nền tảng chuẩn xác cho các HLV tương lai.</p>
      </div>

      {content}

      <!-- CTA -->
      <div style="background: linear-gradient(to right, #1a2419, #2e3b2d); border-radius: 16px; padding: 40px; margin-top: 48px; text-align: center; color: white;">
        <h3 style="color: #d4af37; font-size: 1.6rem; margin-bottom: 12px;">Bạn muốn trở thành một HLV chuyên môn sâu?</h3>
        <p style="color: rgba(255,255,255,0.8); margin-bottom: 24px; font-size: 1.05rem; line-height: 1.6; max-width: 600px; margin-left: auto; margin-right: auto;">Tham gia chương trình Đào tạo Giáo viên YTT 200h quốc tế cùng Giang Metta Academy để nắm vững những kiến thức này.</p>
        <a href="../goc-huan-luyen-vien.html#ytt-register" style="display: inline-block; background: #d4af37; color: #1a2419; padding: 14px 28px; border-radius: 8px; font-weight: 700; text-decoration: none; font-size: 1rem; transition: transform 0.2s;">Nhận Lộ Trình 200H</a>
      </div>

    </div>
  </main>

  <script src="../js/main.js"></script>
  <script src="../js/search-index.js"></script>
  <script src="../js/search.js"></script>
  <script>
    // Add floating buttons if they aren't generated manually
    document.body.insertAdjacentHTML('beforeend', `
    <div class="floating-contact" id="floatingContact">
      <a href="https://zalo.me/0326808864" target="_blank" class="fc-zalo" data-tooltip="Chat Zalo" aria-label="Liên hệ Zalo">
        <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M24 4C12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20S35.046 4 24 4zm-2.2 28.8h-2.6c-3.8 0-6.8-1.2-9-3.4l.6-2.4c2 2.2 4.8 3.4 8.4 3.4h2.6v2.4zm10.6-4.8c-.6 1-1.6 1.6-2.8 1.6H27v-2.4h2.6c.4 0 .8-.2 1-.6.2-.4.2-.8 0-1.2l-3.4-6.8c-.4-.8-.2-1.8.4-2.4.6-.6 1.6-.8 2.4-.4l5 2.8c.8.4 1.2 1.2 1.2 2.2 0 0-.2 5.2-2.8 7.2z"/></svg>
      </a>
      <a href="https://wa.me/84326808864" target="_blank" class="fc-whatsapp" data-tooltip="Chat WhatsApp" aria-label="Liên hệ WhatsApp">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>
    </div>
    `);
  </script>
</body>
</html>
"""

articles = [
    {
        "filename": "xuong-chau-chuyen-dong-xoay.html",
        "title": "Xương chậu & Chuyển động xoay — Giải mã góc mở khớp háng trong Yoga",
        "desc": "Phân tích cơ sinh học xương chậu, góc xoay trong, xoay ngoài và sự thật tại sao nhiều người không bao giờ ngồi được tư thế Hoa Sen.",
        "category": "Giải phẫu ứng dụng",
        "tag": "🦴 Cơ Sinh Học",
        "content": """
      <p>Trong các lớp Yoga hiện đại, chúng ta thường nghe HLV hô hào "Cố gắng ép đầu gối xuống sàn" trong tư thế Hoa Sen (Padmasana) hoặc Góc Cố Định (Baddha Konasana). Nhưng sự thật là, khả năng mở hông phần lớn được <b>kết cấu xương chậu của bạn quyết định từ khi chào đời</b>, chứ không chỉ là do nhóm cơ hay dây chằng cứng giãn.</p>

      <h2>1. Giải phẫu cấu trúc khớp háng (Hip Joint)</h2>
      <p>Khớp háng là một khớp chỏm cầu (Ball-and-Socket joint). Chỏm xương đùi (Femoral Head) nằm lọt trong ổ cối (Acetabulum) của xương chậu.</p>
      <ul>
        <li><strong>Ổ cối hướng về phía trước:</strong> Học viên có xu hướng xoay trong (Internal Rotation) tốt, như tư thế Anh Hùng (Virasana).</li>
        <li><strong>Ổ cối hướng sang hai bên:</strong> Học viên có biên độ xoay ngoài (External Rotation) tuyệt vời, dễ dàng vào tư thế Hoa Sen (Padmasana).</li>
      </ul>

      <h2>2. Góc nghiêng cổ xương đùi (Femoral Neck Angle)</h2>
      <p>Cổ xương đùi không phải ai cũng giống nhau. Góc nghiêng (Angle of Torsion) trung bình là 15 độ. Nếu góc này lớn quá (Anteversion), người đó xoay đùi vào trong dễ dàng nhưng rất khó banh đùi ra ngoài. Ngược lại (Retroversion), xoay đùi ra ngoài là bản năng.</p>
      
      <h2>3. Ứng dụng khi giảng dạy: Đừng ép Hoa Sen!</h2>
      <p>Việc cố ép một học viên có cấu trúc xương Anteversion vào tư thế Hoa Sen sẽ gây ra hậu quả tàn khốc cho <strong>Meniscus (sụn chêm)</strong> và <strong>Dây chằng chéo</strong> ở đầu gối. Do hông không xoay được, lực xoắn sẽ dồn thẳng xuống đầu gối - một khớp bản lề vốn không được thiết kế để xoay vặn mạnh.</p>
      
      <div style="background:#f4f7f4; padding:24px; border-radius:12px; margin:24px 0;">
        <h4 style="color:#2d4a2e; margin-bottom:8px;">✅ Cueing (Khẩu lệnh an toàn):</h4>
        <p style="font-size:0.95rem; color:#555;">"Hãy gác một chân lên bắp chân kia (Half-lotus) hoặc sử dụng 2 viên gạch kê dưới 2 đầu gối nếu bạn thấy căng nhức ở nhượng chân. Chúng ta tôn trọng biên độ xoay bẩm sinh của ổ khớp."</p>
      </div>
        """
    },
    {
        "filename": "vinyasa-krama.html",
        "title": "Vinyasa Krama Sequencing — Nghệ thuật sắp xếp chuỗi Yoga logic",
        "desc": "Tìm hiểu Vinyasa Krama là gì và 5 bước thiết kế một chuỗi Hatha Yoga đạt chuẩn quốc tế dựa trên đỉnh tư thế (Peak Pose).",
        "category": "Nghệ thuật Sư phạm",
        "tag": "🗣️ Sequencing",
        "content": """
      <p><strong>Vinyasa</strong> thường bị hiểu lầm là môn Yoga chuyển động nhanh, nhảy từ tư thế này sang tư thế khác. Nguồn gốc của từ Vinyasa trong tiếng Phạn: "Vi" nghĩa là "một cách đặc biệt", và "Nyasa" nghĩa là "đặt/để". <strong>Vinyasa Krama</strong> là nghệ thuật đặt từng bước tiến một cách thông minh hướng tới một mục tiêu nhất định (Peak Pose).</p>

      <h2>1. Đỉnh tư thế (Peak Pose) là gì?</h2>
      <p>Đây là tư thế khó nhất trong buổi tập. Mọi tư thế trước đó được tính toán để "làm ấm" (Warm-up) và "mở" các nhóm cơ cần thiết. Mọi tư thế sau đó dùng để "trả cơ" (Counter-pose) nhằm đưa cơ thể về lại trạng thái trung lập an toàn.</p>

      <h2>2. Mô hình 5 bước thiết kế cuỗi theo Vinyasa Krama</h2>
      <ol style="line-height:1.8; margin-bottom:24px;">
        <li><strong>Đánh thức (Awakening):</strong> Ngồi thiền, thở, kết nối tâm trí (Centering). Đánh thức cột sống nhẹ nhàng với Cat-Cow.</li>
        <li><strong>Làm nóng toàn thân (Warming System):</strong> Dùng chuỗi Chào mặt trời (Surya Namaskar) A & B để bơm máu đến toàn bộ các khớp, tăng nhịp tim.</li>
        <li><strong>Xây dựng sức mạnh (Building):</strong> Các tư thế đứng (Chiến binh, Tam giác) nhằm kích hoạt cơ mông, đùi, cơ core chuẩn bị cho phần nâng cao.</li>
        <li><strong>Đỉnh tư thế (Peak Phase):</strong> Tại đây cơ thể đã đủ nhiệt và biên độ mở. Học viên chinh phục tư thế mục tiêu (vd: Chim Bồ Câu, Cây Cung).</li>
        <li><strong>Trả cơ và Thư giãn sâu (Integration):</strong> Đừng bao giờ bỏ qua phần này. Dùng xoay vặn ngồi (Seated Twist), nghiêng nhẹ để làm mát hệ thần kinh, chốt lại bằng 10 phút Savasana.</li>
      </ol>

      <div style="background:#f4f7f4; padding:24px; border-radius:12px; margin:24px 0;">
        <h4 style="color:#2d4a2e; margin-bottom:8px;">💡 Mẹo cho Giáo viên:</h4>
        <p style="font-size:0.95rem; color:#555;">Luôn luôn ghi nhớ <strong>Counter-pose (Trả cơ)</strong>. Quy tắc vàng: Nếu đã gập sau (Backbend) ở đỉnh cao, hãy theo sau bằng một tư thế vặn xoắn nhẹ (Twist) để giải mỏi trước khi cho gập trước (Forward fold). Gập trước đột ngột ngay sau khi gập sau sâu rất dễ gây co thắt cơ lưng dưới (Spasm).</p>
      </div>
        """
    },
    {
        "filename": "case-study-vong-that-lung.html",
        "title": "Lỗi võng thắt lưng trong Chó Úp Mặt — Nguyên nhân và Điều chỉnh",
        "desc": "Case study lâm sàng: Phân tích nguyên nhân khiến học viên bị võng thắt lưng trong Adho Mukha Svanasana và khẩu lệnh khắc phục.",
        "category": "Case Study",
        "tag": "🔍 Lâm Sàng",
        "content": """
      <p>Chó Úp Mặt (Downward Facing Dog - Adho Mukha Svanasana) được mệnh danh là "Tư thế nghỉ ngơi" trong Yoga động. Nhưng với rất nhiều học viên, đặc biệt là nữ giới dẻo dai, đó là một cực hình cho vùng lưng dưới và vai.</p>

      <h2>1. Nhận diện lỗi: Võng thắt lưng và Sụp vai (Banana Back)</h2>
      <p>Học viên cố nhấn ngực và nách xuống sát thảm để ép dãn vai, điều này kéo theo khung lồng ngực sụp xuống. Kết quả: <strong>Cột sống thắt lưng (Lumbar spine) đổ sụp xuống một đường cong sâu như quả chuối</strong>. Lực lúc này không được xả qua chân, mà đè nén toàn bộ hệ thống đĩa đệm (L4-S1).</p>

      <h2>2. Phân tích nguyên nhân Cơ Sinh Học</h2>
      <ul style="line-height:1.8;">
        <li><strong>Cơ Core hoàn toàn ngủ quên:</strong> Không có sự hỗ trợ tĩnh từ nhóm cơ bụng ngang để giữ khung chậu trung lập.</li>
        <li><strong>Cơ xô và Cơ răng trước (Serratus Anterior) yếu:</strong> Hai bàn tay không đẩy mạnh xuống thảm, khiến khớp vai sập xuống.</li>
        <li><strong>Nỗ lực sai mục đích:</strong> Nghĩ rằng ngực chạm sàn là dấu hiệu của người tập tốt.</li>
      </ul>

      <h2>3. Khẩu lệnh điều chỉnh (Cueing) không cần chạm</h2>
      <p>Thay vì đến ấn vai họ lên, hãy dùng 3 câu lệnh (Cue) tuần tự:</p>
      <div style="background:#f4f7f4; padding:24px; border-radius:12px; margin:24px 0;">
        <ol style="margin:0; padding-left:16px;">
          <li>"Hơi co nhẹ đầu gối lại và kiễng gót chân lên, hãy ưu tiên kéo thẳng vùng thắt lưng thay vì ép gân kheo."</li>
          <li>"Dùng lực 10 đầu ngón tay đẩy mạnh thảm về trước, cuộn lồng ngực lên một chút, đừng nhấn nách sâu xuống."</li>
          <li>"Hóp nhẹ rốn lại, tưởng tượng bạn đang kéo xương sườn hướng về hông để lấp đầy phần thắt lưng đang bị võng."</li>
        </ol>
      </div>
      <p>Chỉ cần 3 lệnh này, phần lưng võng sẽ tự động được làm đầy lại, phân bổ lực chuẩn xác qua cả tay và chân.</p>
        """
    },
    {
        "filename": "thuong-hieu-yoga.html",
        "title": "5 Bước xây dựng thương hiệu cá nhân cho Giáo viên Yoga",
        "desc": "Chiến lược Marketing và xây dựng thương hiệu cá nhân chuyên nghiệp từ số 0 để thu hút học viên Private và cộng đồng.",
        "category": "Kinh Doanh Yoga",
        "tag": "💼 Kinh Doanh",
        "content": """
      <p>Thị trường Yoga đang ngày càng bão hòa với hàng ngàn HLV mới tốt nghiệp mỗi năm. Làm thế nào để bạn sống được với nghề và thu hút một tệp học viên (Tribe) sẵn sàng trung thành với bạn?</p>

      <h2>1. Tìm ra Niche (Thị trường ngách) của riêng bạn</h2>
      <p>Đừng dạy tất cả mọi thứ cho mọi người. Bạn sẽ bị hòa tan. Hãy chọn 1-2 thế mạnh cốt lõi. Bạn giỏi về <strong>Yoga phục hồi xương khớp</strong>? <strong>Vinyasa cường độ cao giảm mỡ</strong>? Hay <strong>Yoga cho mẹ bầu</strong>? Một chuyên gia giải quyết 1 vấn đề luôn có giá trị cao hơn người dạy "mọi môn".</p>

      <h2>2. Xây dựng Avatar (Hình ảnh trên MXH) chuyên nghiệp</h2>
      <p>Trang cá nhân của giáo viên không phải chỗ để than vãn. Nó là một Portfolio để học viên thẩm định "Năng lượng" của bạn. Hãy chia sẻ:
      <ul>
        <li>Phong cách sống và quy trình tập luyện (Sadhana) của bạn.</li>
        <li>Kiến thức Mini: "Ngồi máy tính thế này để không đau cổ", "Thở sao cho dễ ngủ".</li>
        <li>Phản hồi (Feedback) tiến bộ của học viên thực tế.</li>
      </ul></p>

      <h2>3. Dạy 1 Workshop Cộng đồng (Phễu Thu Hút)</h2>
      <p>Marketing tốt nhất thời kỳ đầu là trải nghiệm thực tế. Mở một series 3 buổi dạy Yoga cộng đồng miễn phí (thậm chí tài trợ luôn tiền hội trường). Nếu học viên <strong>cảm nhận được giọng nói, sự tận tâm và năng lượng chữa lành</strong> của bạn, họ sẽ tự xin đóng tiền để học PT 1 kèm 1 dài hạn.</p>

      <h2>4. Đóng Gói Khóa Học (Packaging)</h2>
      <p>Thay vì bán "lẻ" từng buổi 300k, hãy bán <strong>Gói giải pháp hoàn thiện</strong>: "Lộ trình 24 buổi Phục hồi Cổ vai gáy", hoặc "3 tháng Yoga tái tạo vóc dáng sau sinh". Bán kết quả cuối cùng, chứ không bán thời gian đứng lớp.</p>

      <div style="background:#f4f7f4; padding:24px; border-radius:12px; margin:24px 0;">
        <h4 style="color:#2d4a2e; margin-bottom:8px;">💡 Chìa khóa: Sự Hiện Diện Liên Tục (Consistency)</h4>
        <p style="font-size:0.95rem; color:#555;">Hành trình cá nhân không "viral" sau 1 đêm. Bạn cần xuất hiện đủ 6 tháng, lan tỏa giá trị lõi đều đặn mỗi tuần. Đó là cách để định vị bạn là chuyên gia thay vì một HLV nghiệp dư.</p>
      </div>
        """
    },
    {
        "filename": "nghe-thuat-cueing.html",
        "title": "Nghệ thuật Cueing — Cách dùng giọng nói thay cho Hands-on",
        "desc": "Kỹ thuật dùng khẩu lệnh để hướng dẫn lớp đông, thiết lập năng lượng và chỉnh sửa định tuyến bằng giọng nói.",
        "category": "Nghệ thuật Sư phạm",
        "tag": "🗣️ Khẩu Lệnh",
        "content": """
      <p>Trong một lớp học 20 người, HLV không thể có 20 đôi tay để chỉnh sửa (Hands-on) cho từng người. Lúc này, <strong>Khẩu lệnh (Verbal Cueing)</strong> chính là nhạc trưởng điều phối toàn bộ lớp học.</p>

      <h2>1. Cấu trúc 1 lượt Cueing tiêu chuẩn</h2>
      <p>Học viên đang di chuyển nên não không thể nghe những câu dài dòng phức tạp. Hãy dùng cấu trúc: <strong>Hành Động + Bộ Phận + Phương Hướng</strong>.</p>
      <ul>
        <li><strong>Ngắn gọn:</strong> "Hít vào — bước nhẹ chân phải — lên giữa hai tay."</li>
        <li><strong>Chỉnh sửa tinh tế:</strong> "Khóa nhẹ cơ lõi — hạ hai vai ra xa tai — rút rốn về sau."</li>
      </ul>

      <h2>2. Sức mạnh của Âm điệu (Tone of Voice)</h2>
      <p>Nhịp tim của học viên phụ thuộc vào tốc độ nói của HLV. Ở phần Warm-up và Vinyasa (đẩy nhịp tim lên), giọng nói cần có độ nảy, cường độ dứt khoát. Nhưng khi lớp vào phần Phục hồi và Savasana, âm điệu cần chậm lại gấp đôi, trầm xuống để đưa hệ thần kinh học viên vào trạng thái thiền sâu.</p>

      <h2>3. Ngôn từ Gợi Hình (Imagery & Metaphors)</h2>
      <p>Đừng dùng toàn thuật ngữ y khoa khô khan. Hãy giúp học viên tưởng tượng thông qua các hình ảnh ẩn dụ sinh động:</p>
      <div style="background:#f4f7f4; padding:24px; border-radius:12px; margin:24px 0;">
        <ul style="margin:0; padding-left:16px; line-height:1.7;">
          <li>❌ Giới từ khô khan: "Nhíu bả vai lại và đẩy sternum (xương ức) lên trên."</li>
          <li>✅ Hình ảnh hóa: <strong>"Tưởng tượng ngực bạn nở bung ra như đóa sen đang đón ánh nắng, hai bả vai kẹp chặt lấy một quả chanh nhỏ sau lưng."</strong></li>
          <li>❌ Khái niệm chung: "Siết cơ sàn chậu."</li>
          <li>✅ Hình ảnh hóa: <strong>"Kéo nhẹ bụng dưới hướng lên trên như thể bạn vừa kéo một chiếc khóa quần jeans hơi chật."</strong></li>
        </ul>
      </div>

      <h2>4. Sức mạnh của Sự Im Lặng</h2>
      <p>Giáo viên mới thường sợ không khí im lặng nên họ nói liên tục (Over-cueing). Tuy nhiên, khi đang giữ một tư thế tĩnh 2 phút, <strong>sự tĩnh lặng của giáo viên chính là khoảnh khắc vàng để học viên đưa tâm trí quay về bên trong quan sát chính mình.</strong> Đừng đắp chữ lấp đầy khoảng trống, hãy rèn luyện việc làm bạn với sự tĩnh lặng cùng học viên.</p>
        """
    }
]

for a in articles:
    path = os.path.join(out_dir, a['filename'])
    with open(path, 'w', encoding='utf-8') as f:
        
        html = base_html.replace("{title}", a['title']).replace("{desc}", a['desc']).replace("{category}", a['category']).replace("{tag}", a['tag']).replace("{content}", a['content'])
        f.write(html)
    print(f"Created {a['filename']}")
