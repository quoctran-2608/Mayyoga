import os

root_dir = '/Users/phanthumay/Desktop/mayyoga.health/web'

# 1. Base template for the new policies
policy_template = """<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title} — Mây Yoga</title>
  <meta name="description" content="{title} của nền tảng Mây Yoga.">
  <link rel="stylesheet" href="css/style.css?v=6">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
  <nav class="navbar scrolled" id="navbar">
    <div class="container">
      <a href="index.html" class="nav-logo"><img src="assets/images/logo.webp" alt="Mây Yoga" class="logo-img"></a>
      <ul class="nav-links" id="navLinks">
        <li><a href="index.html">Trang chủ</a></li>
        <li><a href="ve-may-yoga.html">Về Mây Yoga</a></li>
        <li class="nav-dropdown">
          <a href="#" class="dropdown-toggle">Kiến thức Yoga <span class="chevron">▾</span></a>
          <ul class="dropdown-menu">
            <li><a href="bai-viet/yoga-cho-nguoi-moi.html">🌱 Yoga cho người mới</a></li>
            <li><a href="tu-the-yoga.html">🧘 90 Tư thế Yoga</a></li>
            <li><a href="bai-viet/pranayama-ky-thuat-tho.html">🌬️ Pranayama</a></li>
            <li><a href="bai-viet/thien-cho-nguoi-moi.html">🕊️ Thiền định</a></li>
            <li><a href="giai-phau-yoga.html">🫀 Giải phẫu Yoga</a></li>
          </ul>
        </li>
        <li><a href="goc-huan-luyen-vien.html">Góc Huấn Luyện</a></li>
        <li><a href="trac-nghiem.html">Trắc nghiệm</a></li>
      </ul>
      <button class="mobile-toggle" id="mobileToggle" aria-label="Menu"><span></span><span></span><span></span></button>
    </div>
  </nav>

  <header class="article-header">
    <div class="container">
      <div class="breadcrumb"><a href="index.html">Trang chủ</a><span class="sep">›</span><span>{title}</span></div>
      <span class="article-tag">📋 Chính sách BCT</span>
      <h1>{title}</h1>
    </div>
  </header>

  <main class="article-body">
    <div class="container">
      {content}
    </div>
  </main>

  <footer class="footer">
    <div class="container" style="text-align:center; padding: 40px 0 20px;">
      <a href="index.html" class="nav-logo" style="display:inline-flex; justify-content:center; margin-bottom:16px;">
        <img src="assets/images/logo.webp" alt="Mây Yoga" class="logo-img" style="height:56px; border-radius:10px; padding:6px; background:rgba(255,255,255,0.12); backdrop-filter:blur(6px);">
      </a>
      <!-- FOOTER LEGAL BLOCK -->
      <div style="color:rgba(255,255,255,0.7); font-size: 0.85rem; line-height: 1.8; margin-bottom: 24px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 24px; max-width: 500px; margin-left: auto; margin-right: auto;">
        <strong style="color:#fff;">Chủ quản website:</strong> Cá nhân Phan Thu Mây<br>
        <strong style="color:#fff;">Mã số thuế cá nhân:</strong> [Chờ bổ sung]<br>
        <strong style="color:#fff;">Địa chỉ:</strong> [Chờ bổ sung]<br>
        <strong style="color:#fff;">SĐT:</strong> 0326 808 864 &nbsp;|&nbsp; <strong style="color:#fff;">Email:</strong> phanthumay.yoga500@gmail.com
      </div>
      
      <div style="display:flex; gap:16px; justify-content:center; flex-wrap:wrap; margin-bottom:16px; font-size:0.82rem;">
        <a href="chinh-sach-bao-mat.html" style="color:rgba(255,255,255,0.7); text-decoration:none;">Chính sách bảo mật</a>
        <a href="dieu-khoan-su-dung.html" style="color:rgba(255,255,255,0.7); text-decoration:none;">Điều khoản sử dụng</a>
        <a href="chinh-sach-thanh-toan.html" style="color:rgba(255,255,255,0.7); text-decoration:none;">Chính sách thanh toán</a>
        <a href="chinh-sach-doi-tra.html" style="color:rgba(255,255,255,0.7); text-decoration:none;">Chính sách khiếu nại & Hoàn tiền</a>
      </div>
      <div style="max-width:400px; margin:0 auto;">
        <p style="color:rgba(255,255,255,0.5); font-size:0.82rem; margin:0;">© 2026 MâyYoga.health 🍀</p>
      </div>
    </div>
  </footer>
</body>
</html>"""

thanh_toan_content = """
      <h2>1. Các hình thức thanh toán</h2>
      <p>Đối với các khoá học Yoga từ xa, Workshop trực tuyến hoặc khi đăng ký tư vấn lộ trình <strong>YTT 200h</strong> tại Mây Yoga, chúng tôi áp dụng duy nhất hình thức thanh toán:</p>
      <ul>
        <li><strong>Chuyển khoản qua Ngân hàng:</strong> Khách hàng thanh toán chuyển khoản trực tiếp vào tài khoản cá nhân của chủ quản website (Phan Thu Mây). Số tài khoản và nội dung chuyển khoản sẽ được cung cấp riêng qua Email hoặc Zalo cho từng học viên sau khi được tư vấn lộ trình học phù hợp.</li>
      </ul>
      <p><em>*Lưu ý: Chúng tôi không tích hợp cổng thanh toán trực tuyến tự động (như VNPay, MoMo, thẻ tín dụng) cắt tiền tự động trên website. Mọi giao dịch đều được thực hiện dựa trên sự đồng thuận và xác nhận tay giữa hai bên.</em></p>

      <h2>2. Quy định đóng học phí</h2>
      <ul>
        <li>Học viên có thể đóng toàn bộ học phí 1 lần trước khi khoá học khai giảng để nhận ưu đãi (nếu có).</li>
        <li>Hoặc đóng theo từng giai đoạn (trả góp) với thoả thuận được ký kết bằng văn bản điện tử giữa Mây Yoga và học viên.</li>
      </ul>

      <h2>3. Chứng từ giao dịch</h2>
      <p>Sau khi nhận được thanh toán, Mây Yoga sẽ xác nhận biên lai điện tử qua Email hoặc tin nhắn Zalo kèm theo mã số học viên và đường dẫn tham gia lớp học ngay lập tức để làm bằng chứng giao dịch hợp pháp.</p>
"""

khieu_nai_content = """
      <h2>1. Quy định về Hoàn tiền / Bảo lưu khoá học</h2>
      <p>Chúng tôi hiểu rằng lịch trình cá nhân của học viên có thể thay đổi. Do đó, Mây Yoga áp dụng chính sách như sau:</p>
      <ul>
        <li><strong>Hoàn tiền 100%:</strong> Áp dụng khi học viên thông báo huỷ tham gia <strong>trước 07 ngày</strong> kể từ ngày khoá học khai giảng.</li>
        <li><strong>Không hoàn tiền:</strong> Nếu học viên thông báo huỷ khi khoá học <strong>đã bắt đầu</strong>, học phí sẽ không được hoàn trả dưới mọi hình thức vì lý do đã sắp xếp giảng viên và giáo trình. Tuy nhiên, học viên được quyền <strong>Bảo lưu</strong> khoá học.</li>
        <li><strong>Bảo lưu khoá học:</strong> Học viên được quyền bảo lưu học phí 1 lần duy nhất trong vòng <strong>06 tháng</strong>. Sau thời hạn này, học phí sẽ bị huỷ.</li>
      </ul>

      <h2>2. Quy trình tiếp nhận khiếu nại</h2>
      <p>Nếu bạn không hài lòng về chất lượng giảng dạy, nội dung khoá học hoặc sự cố kỹ thuật truy cập tài liệu, vui lòng thực hiện các bước sau:</p>
      <ol>
        <li>Gửi phản hồi trực tiếp tới Zalo Hotline: <strong>0326 808 864</strong> hoặc Email <strong>phanthumay.yoga500@gmail.com</strong>.</li>
        <li>Mô tả rõ vấn đề gặp phải kèm theo hình ảnh, video minh chứng (nếu có).</li>
        <li>Mây Yoga cam kết tiếp nhận và đưa ra phương án xử lý (bồi thường buổi học, hoàn tiền một phần) trong thời gian tối đa <strong>48 giờ làm việc</strong>.</li>
      </ol>

      <h2>3. Trách nhiệm của Chủ sở hữu website</h2>
      <p>Mây Yoga cam kết chịu trách nhiệm cao nhất về chất lượng dịch vụ giáo dục và tính xác thực của nội dung trên website. Mọi tranh chấp phát sinh (nếu có) sẽ được ưu tiên giải quyết trên cơ sở thương lượng, hoà giải nhằm đảm bảo quyền lợi tuyệt đối cho học viên.</p>
"""

with open(os.path.join(root_dir, "chinh-sach-thanh-toan.html"), "w", encoding="utf-8") as f:
    f.write(policy_template.format(title="Chính sách thanh toán", content=thanh_toan_content))

with open(os.path.join(root_dir, "chinh-sach-doi-tra.html"), "w", encoding="utf-8") as f:
    f.write(policy_template.format(title="Chính sách khiếu nại & Hoàn tiền", content=khieu_nai_content))

# 2. Update Footer on all existing HTML files
count = 0
for dp, dn, fns in os.walk(root_dir):
    for fn in fns:
        if fn.endswith('.html'):
            path = os.path.join(dp, fn)
            with open(path, "r", encoding="utf-8") as f:
                html = f.read()
            
            # Find the old links element (with root mapping or nested mapping)
            prefix = "" if dp == root_dir else "../"
            
            old_footer = f"""<p style="color:rgba(255,255,255,0.9); max-width:520px; margin:0 auto 16px; line-height:1.7; font-size:0.92rem;">
        Nền tảng kiến thức Hatha Yoga cho mọi người.<br>
        <em style="font-size:0.82rem; opacity:0.65;">Mọi nội dung chỉ nhằm mục đích thông tin / tham khảo.</em>
      </p>"""
            # Sometime the <p> is written in one line
            old_footer_oneline = """<p style="color:rgba(255,255,255,0.9); max-width:520px; margin:0 auto 16px; line-height:1.7; font-size:0.92rem;">Nền tảng kiến thức Hatha Yoga cho mọi người.<br><em style="font-size:0.82rem; opacity:0.65;">Mọi nội dung chỉ nhằm mục đích thông tin / tham khảo.</em></p>"""
            
            old_links1 = f"""<a href="{prefix}chinh-sach-bao-mat.html" style="color:rgba(255,255,255,0.7); text-decoration:none;">Chính sách bảo mật</a><a href="{prefix}dieu-khoan-su-dung.html" style="color:rgba(255,255,255,0.7); text-decoration:none;">Điều khoản sử dụng</a>"""
            old_links2 = f"""<a href="{prefix}chinh-sach-bao-mat.html" style="color:rgba(255,255,255,0.7); text-decoration:none;">Chính sách bảo mật</a>
        <a href="{prefix}dieu-khoan-su-dung.html" style="color:rgba(255,255,255,0.7); text-decoration:none;">Điều khoản sử dụng</a>"""
            
            new_footer_links = f"""<a href="{prefix}chinh-sach-bao-mat.html" style="color:rgba(255,255,255,0.7); text-decoration:none;">Chính sách bảo mật</a>
        <a href="{prefix}dieu-khoan-su-dung.html" style="color:rgba(255,255,255,0.7); text-decoration:none;">Điều khoản sử dụng</a>
        <a href="{prefix}chinh-sach-thanh-toan.html" style="color:rgba(255,255,255,0.7); text-decoration:none;">Chính sách thanh toán</a>
        <a href="{prefix}chinh-sach-doi-tra.html" style="color:rgba(255,255,255,0.7); text-decoration:none;">Chính sách khiếu nại & Hoàn tiền</a>"""

            legal_block = """
      <!-- FOOTER LEGAL BLOCK -->
      <div style="color:rgba(255,255,255,0.7); font-size: 0.85rem; line-height: 1.8; margin-bottom: 24px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 24px; max-width: 500px; margin-left: auto; margin-right: auto;">
        <strong style="color:#fff;">Chủ quản website:</strong> Cá nhân Phan Thu Mây<br>
        <strong style="color:#fff;">Mã số thuế cá nhân:</strong> [Chờ bổ sung]<br>
        <strong style="color:#fff;">Địa chỉ:</strong> [Chờ bổ sung]<br>
        <strong style="color:#fff;">SĐT:</strong> 0326 808 864 &nbsp;|&nbsp; <strong style="color:#fff;">Email:</strong> phanthumay.yoga500@gmail.com
      </div>
"""
            orig_html = html
            html = html.replace(old_footer, old_footer + legal_block)
            html = html.replace(old_footer_oneline, old_footer_oneline + legal_block)
            
            html = html.replace(old_links1, new_footer_links)
            html = html.replace(old_links2, new_footer_links)
            
            if html != orig_html:
                with open(path, "w", encoding="utf-8") as f:
                    f.write(html)
                count += 1

print(f"Updated {count} files!")
