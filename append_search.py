import json

new_items = [
  {
    "title": "Xương chậu & Chuyển động xoay — Giải mã góc mở khớp háng trong Yoga",
    "tag": "Cơ Sinh Học",
    "url": "bai-viet/xuong-chau-chuyen-dong-xoay.html",
    "img": "assets/images/articles/hong-xuong-chau.webp",
    "time": "10 phút đọc",
    "content": "Xương chậu chuyển động xoay giải mã góc mở khớp háng trong Yoga Giải phẫu cấu trúc khớp háng Hip Joint chỏm cầu ổ cối Acetabulum xoay trong Internal Rotation xoay ngoài External Rotation Góc nghiêng cổ xương đùi Femoral Neck Angle Anteversion Retroversion Ứng dụng khi giảng dạy đừng ép Hoa Sen Padmasana sụn chêm Meniscus dây chằng chéo."
  },
  {
    "title": "Vinyasa Krama Sequencing — Nghệ thuật sắp xếp chuỗi Yoga logic",
    "tag": "Sequencing",
    "url": "bai-viet/vinyasa-krama.html",
    "img": "assets/images/articles/lo-trinh-30-ngay.webp",
    "time": "10 phút đọc",
    "content": "Vinyasa Krama Sequencing Nghệ thuật sắp xếp chuỗi Yoga logic Đỉnh tư thế Peak Pose làm ấm Warm-up trả cơ Counter-pose Mô hình 5 bước thiết kế chuỗi Đánh thức Awakening Làm nóng toàn thân Warming System Xây dựng sức mạnh Building Đỉnh tư thế Peak Phase Trả cơ và Thư giãn sâu Integration gập sau Backbend vặn xoắn Twist."
  },
  {
    "title": "Lỗi võng thắt lưng trong Chó Úp Mặt — Nguyên nhân và Điều chỉnh",
    "tag": "Lâm Sàng",
    "url": "bai-viet/case-study-vong-that-lung.html",
    "img": "assets/images/articles/cot-song.webp",
    "time": "10 phút đọc",
    "content": "Lỗi võng thắt lưng trong Chó Úp Mặt Adho Mukha Svanasana Nhận diện lỗi sụp vai võng thắt lưng Banana Back đĩa đệm L4-S1 Nguyên nhân Cơ Sinh Học Cơ Core ngủ quên Cơ xô và Cơ răng trước Serratus Anterior yếu Nỗ lực sai mục đích Khẩu lệnh điều chỉnh Cueing đẩy thảm cuộn ngực hóp rốn."
  },
  {
    "title": "5 Bước xây dựng thương hiệu cá nhân cho Giáo viên Yoga",
    "tag": "Kinh Doanh",
    "url": "bai-viet/thuong-hieu-yoga.html",
    "img": "assets/images/articles/bai-tap-theo-muc-tieu.webp",
    "time": "10 phút đọc",
    "content": "5 Bước xây dựng thương hiệu cá nhân cho Giáo viên Yoga Marketing thu hút học viên Private cộng đồng Tìm ra Niche thị trường ngách phục hồi xương khớp Vinyasa Yoga mẹ bầu Xây dựng Avatar MXH chuyên nghiệp Dạy Workshop Cộng đồng Lead Magnet Đóng Gói Khóa Học Packaging Sự Hiện Diện Liên Tục Consistency."
  },
  {
    "title": "Nghệ thuật Cueing — Cách dùng giọng nói thay cho Hands-on",
    "tag": "Khẩu Lệnh",
    "url": "bai-viet/nghe-thuat-cueing.html",
    "img": "assets/images/hero.webp",
    "time": "10 phút đọc",
    "content": "Nghệ thuật Cueing Cách dùng giọng nói thay cho Hands-on Verbal Cueing cấu trúc 1 lượt Hành Động + Bộ Phận + Phương Hướng Tinh chỉnh Sức mạnh của Âm điệu Tone of Voice Ngôn từ Gợi Hình Imagery Metaphors Sức mạnh của Sự Im Lặng Over-cueing."
  }
]

with open("js/search-index.js", "r", encoding="utf-8") as f:
    text = f.read()

# text ends with `];\n`
text = text.replace("\n];", ",\n" + ",\n".join(
    "  " + json.dumps(item, ensure_ascii=False) for item in new_items
) + "\n];")

with open("js/search-index.js", "w", encoding="utf-8") as f:
    f.write(text)

print("Updated search index!")
