with open("goc-huan-luyen-vien.html", "r", encoding="utf-8") as f:
    html = f.read()

# Fix Xương chậu
old_xuong_chau = """        <div class="ytt-card" style="opacity:0.6;">
          <div style="font-size:2rem; margin-bottom:12px;">🦴</div>
          <h3>[Sắp ra mắt] Xương chậu & Chuyển động xoay</h3>
          <p>Sự thật về góc xoay trong/xoay ngoài của đầu xương đùi và lý do tại sao không phải ai cũng gác được chân Hoa Sen.</p>
          <a href="#">Đang biên soạn...</a>
        </div>"""
new_xuong_chau = """        <div class="ytt-card">
          <div style="font-size:2rem; margin-bottom:12px;">🦴</div>
          <h3>Xương chậu & Chuyển động xoay</h3>
          <p>Sự thật về góc xoay trong/xoay ngoài của đầu xương đùi và lý do tại sao không phải ai cũng gác được chân Hoa Sen.</p>
          <a href="bai-viet/xuong-chau-chuyen-dong-xoay.html">Đọc báo cáo chuyên sâu &rarr;</a>
        </div>"""
html = html.replace(old_xuong_chau, new_xuong_chau)

# Fix Vinyasa Krama and Add Cueing / Thuong hieu
old_methodology = """        <div class="ytt-card" style="border-left-color:#8ba888; opacity:0.6;">
          <div style="font-size:2rem; margin-bottom:12px;">🧩</div>
          <h3>[Sắp ra mắt] Vinyasa Krama Sequencing</h3>
          <p>Nguyên tắc Peak Pose: Làm sao để khởi động đúng nhóm cơ mục tiêu trước khi đưa cả lớp vào tư thế đỉnh an toàn.</p>
          <a href="#" style="color:#5a7a58;">Đang biên soạn...</a>
        </div>"""
new_methodology = """        <div class="ytt-card" style="border-left-color:#8ba888;">
          <div style="font-size:2rem; margin-bottom:12px;">🧩</div>
          <h3>Vinyasa Krama Sequencing</h3>
          <p>Nguyên tắc Peak Pose: Làm sao để khởi động đúng nhóm cơ mục tiêu trước khi đưa cả lớp vào tư thế đỉnh an toàn.</p>
          <a href="bai-viet/vinyasa-krama.html" style="color:#5a7a58;">Đọc bài phân tích &rarr;</a>
        </div>
        <div class="ytt-card" style="border-left-color:#8ba888;">
          <div style="font-size:2rem; margin-bottom:12px;">🗣️</div>
          <h3>Nghệ thuật Cueing (Khẩu lệnh)</h3>
          <p>Kỹ thuật dùng khẩu lệnh để hướng dẫn lớp đông, thiết lập năng lượng và chỉnh sửa định tuyến bằng giọng nói thay cho chạm tay.</p>
          <a href="bai-viet/nghe-thuat-cueing.html" style="color:#5a7a58;">Đọc hướng dẫn chi tiết &rarr;</a>
        </div>
        <div class="ytt-card" style="border-left-color:#8ba888;">
          <div style="font-size:2rem; margin-bottom:12px;">💼</div>
          <h3>5 Bước xây dựng thương hiệu cá nhân</h3>
          <p>Chiến lược Marketing và xây dựng thương hiệu cá nhân chuyên nghiệp từ số 0 để thu hút học viên Private và cộng đồng.</p>
          <a href="bai-viet/thuong-hieu-yoga.html" style="color:#5a7a58;">Đọc bài chiến lược &rarr;</a>
        </div>"""
html = html.replace(old_methodology, new_methodology)

# Change header of methodology to reflect business
html = html.replace("Nghệ thuật Sư phạm & Giảng dạy <span", "Nghệ thuật Sư phạm & Phát triển Nghề <span")
html = html.replace("và đạo đức nghề nghiệp của một HLV chuyên nghiệp.", "đạo đức nghề nghiệp và tự xây dựng thương hiệu cá nhân.")

# Fix Case study vong
old_case = """        <div class="ytt-card" style="border-left-color:#2e3b2d; opacity:0.6;">
          <div style="font-size:2rem; margin-bottom:12px;">💥</div>
          <h3>[Sắp ra mắt] Lỗi võng thắt lưng trong Chó Úp Mặt</h3>
          <p>Case study: Học viên dẻo (hypermobility) bị võng ngực và sụp vai trong Adho Mukha Svanasana. Phân tích nhóm cơ Serratus Anterior.</p>
          <a href="#" style="color:#2e3b2d;">Đang biên soạn...</a>
        </div>"""
new_case = """        <div class="ytt-card" style="border-left-color:#2e3b2d;">
          <div style="font-size:2rem; margin-bottom:12px;">💥</div>
          <h3>Lỗi võng thắt lưng trong Chó Úp Mặt</h3>
          <p>Case study lâm sàng: Học viên dẻo (hypermobility) bị võng ngực và sụp vai trong Adho Mukha Svanasana. Phân tích nhóm cơ Serratus Anterior.</p>
          <a href="bai-viet/case-study-vong-that-lung.html" style="color:#2e3b2d;">Đọc Case Study chi tiết &rarr;</a>
        </div>"""
html = html.replace(old_case, new_case)

with open("goc-huan-luyen-vien.html", "w", encoding="utf-8") as f:
    f.write(html)
print("Updated Trainer Hub!")
