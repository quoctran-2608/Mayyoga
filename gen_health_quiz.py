#!/usr/bin/env python3
"""Generate health assessment quiz HTML for Mây Yoga"""
import os

# Read dosha quiz as template for navbar/footer
with open(os.path.join(os.path.dirname(__file__), 'trac-nghiem/kiem-tra-dosha.html'), 'r') as f:
    template = f.read()

# Extract navbar (lines up to </nav>)
nav_end = template.find('</nav>') + len('</nav>')
navbar = template[:nav_end]

# Extract footer+scripts from <footer onwards
footer_start = template.find('<footer')
footer = template[footer_start:]
# Replace quiz-personality.js with quiz-health.js
footer = footer.replace('quiz-personality.js', 'quiz-health.js')
# Fix schema
footer = footer.replace('Kiểm tra thể trạng Dosha', 'Đánh giá sức khỏe trước khi tập Yoga')
footer = footer.replace('kiem-tra-dosha.html', 'danh-gia-suc-khoe.html')
footer = footer.replace('Tìm hiểu thể trạng Dosha của bạn: Vata, Pitta hay Kapha? Bài trắc nghiệm tự đánh giá giúp hiểu cơ thể và chọn phong cách yoga phù hợp.', 'Bài đánh giá sức khỏe giúp giáo viên hiểu tình trạng của bạn trước khi bắt đầu lớp Yoga.')

def mkq(qid, qtype, title, options):
    """Generate a question block"""
    h = f'<div class="ha-question" data-qid="{qid}" data-type="{qtype}">\n'
    h += f'<h3>{title}</h3>\n<div class="quiz-options">\n'
    for val, label in options:
        h += f'<div class="quiz-option" data-value="{val}"><span class="option-radio"></span>{label}</div>\n'
    h += '</div></div>\n'
    return h

def mktext(qid, title, placeholder=""):
    h = f'<div class="ha-question" data-qid="{qid}" data-type="text">\n'
    h += f'<h3>{title}</h3>\n'
    h += f'<textarea class="ha-textarea" placeholder="{placeholder}" rows="3"></textarea>\n'
    h += '</div>\n'
    return h

# Build sections
s1 = '<div class="ha-section" data-section="1">\n'
s1 += '<div class="ha-section-header"><span class="ha-sec-icon">🏥</span><h2>Phần 1: Tình trạng sức khỏe</h2><p>Giúp giáo viên hiểu các vấn đề sức khỏe cần lưu ý</p></div>\n'
s1 += mkq('injury','radio','Bạn có chấn thương nào không?', [
    ('none','Không có chấn thương'),('back','Đau lưng / cột sống'),('knee','Chấn thương đầu gối'),
    ('shoulder','Đau vai / cổ'),('wrist','Cổ tay / khuỷu tay'),('ankle','Mắt cá / bàn chân'),('other','Chấn thương khác')])
s1 += mkq('chronic','checkbox','Bạn có bệnh lý mãn tính nào? <small>(chọn nhiều)</small>', [
    ('none','Không có'),('hypertension','Huyết áp cao'),('diabetes','Tiểu đường'),
    ('heart','Tim mạch'),('asthma','Hen suyễn'),('thyroid','Tuyến giáp'),('arthritis','Viêm khớp'),('other','Khác')])
s1 += mkq('pregnant','radio','Bạn có đang mang thai không?', [('no','Không'),('yes','Có')])
s1 += mkq('surgery','radio','Bạn có phẫu thuật trong 6 tháng gần đây?', [('no','Không'),('yes','Có')])
s1 += '<div class="ha-nav"><button class="btn btn-primary ha-next">Tiếp theo →</button></div>\n'
s1 += '</div>\n'

s2 = '<div class="ha-section" data-section="2">\n'
s2 += '<div class="ha-section-header"><span class="ha-sec-icon">💪</span><h2>Phần 2: Thể lực & Vận động</h2><p>Đánh giá mức độ vận động và thể lực hiện tại</p></div>\n'
s2 += mkq('experience','radio','Kinh nghiệm tập Yoga của bạn?', [
    ('none','Chưa từng tập'),('beginner','Dưới 6 tháng'),('intermediate','6 tháng – 2 năm'),('advanced','Trên 2 năm')])
s2 += mkq('flexibility','radio','Độ dẻo dai của bạn?', [
    ('low','Cứng — khó chạm ngón chân'),('medium','Trung bình — chạm được ngón chân'),('high','Dẻo dai — dễ dàng gập người')])
s2 += mkq('activity','radio','Mức vận động hàng ngày?', [
    ('sedentary','Ít vận động (ngồi nhiều)'),('light','Nhẹ (đi bộ, việc nhà)'),('moderate','Trung bình (tập 2-3 lần/tuần)'),('active','Năng động (tập mỗi ngày)')])
s2 += mkq('pain','checkbox','Vùng nào hay đau/khó chịu? <small>(chọn nhiều)</small>', [
    ('none','Không đau'),('neck','Cổ / vai gáy'),('upper_back','Lưng trên'),('lower_back','Thắt lưng'),
    ('hip','Hông / xương chậu'),('knee','Đầu gối'),('wrist','Cổ tay')])
s2 += '<div class="ha-nav"><button class="btn btn-secondary ha-prev">← Quay lại</button><button class="btn btn-primary ha-next">Tiếp theo →</button></div>\n'
s2 += '</div>\n'

s3 = '<div class="ha-section" data-section="3">\n'
s3 += '<div class="ha-section-header"><span class="ha-sec-icon">🎯</span><h2>Phần 3: Mục tiêu & Lối sống</h2><p>Để gợi ý lớp học phù hợp nhất với bạn</p></div>\n'
s3 += mkq('goals','checkbox','Mục tiêu tập Yoga? <small>(chọn nhiều)</small>', [
    ('flexibility','Tăng dẻo dai'),('strength','Tăng sức mạnh cơ'),('stress','Giảm căng thẳng'),
    ('pain','Giảm đau nhức'),('weight','Giảm cân'),('sleep','Ngủ ngon hơn'),
    ('mindfulness','Chánh niệm / thiền'),('posture','Cải thiện tư thế')])
s3 += mkq('stress','radio','Mức độ căng thẳng hiện tại?', [
    ('low','Thấp — thoải mái'),('medium','Trung bình'),('high','Cao — hay lo lắng'),('very_high','Rất cao — ảnh hưởng sức khỏe')])
s3 += mkq('sleep','radio','Chất lượng giấc ngủ?', [
    ('good','Tốt — ngủ đủ, sâu giấc'),('fair','Bình thường'),('poor','Kém — hay thức giấc'),('insomnia','Mất ngủ thường xuyên')])
s3 += mktext('notes','Bạn muốn chia sẻ thêm điều gì với giáo viên?','Ví dụ: đang uống thuốc, dị ứng, mục tiêu cụ thể...')
s3 += '<div class="ha-nav"><button class="btn btn-secondary ha-prev">← Quay lại</button><button class="btn btn-primary" id="haSubmit">Xem kết quả đánh giá →</button></div>\n'
s3 += '</div>\n'

# Result section
result = '''<div class="quiz-result personality-result" id="haResult" style="display:none;">
<h2>📋 Hồ sơ sức khỏe Yoga của bạn</h2>
<p style="text-align:center;color:#6B7280;margin-bottom:28px;">Kết quả đánh giá giúp giáo viên hiểu và thiết kế bài tập phù hợp nhất</p>
<div id="profileContent"></div>
<div style="margin-top:32px;text-align:center;">
<button id="haRetry" class="btn btn-secondary">Làm lại →</button>
<a href="../trac-nghiem.html" style="display:inline-block;margin-left:12px;" class="btn btn-primary">Trắc nghiệm khác →</a>
</div>
</div>'''

# Assemble full HTML
head = f'''<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Đánh giá sức khỏe trước khi tập Yoga — Mây Yoga</title>
  <meta name="description" content="Bài đánh giá sức khỏe giúp giáo viên hiểu tình trạng của bạn trước khi bắt đầu lớp Yoga. Hoàn toàn miễn phí.">
  <link rel="stylesheet" href="../css/style.css?v=4">
  <link rel="icon" type="image/x-icon" href="../favicon.ico">
  <link rel="apple-touch-icon" href="../apple-touch-icon.png">
  <meta property="og:title" content="Đánh giá sức khỏe trước khi tập Yoga — Mây Yoga">
  <meta property="og:description" content="Bài đánh giá sức khỏe giúp giáo viên hiểu tình trạng của bạn trước khi bắt đầu lớp Yoga.">
  <meta property="og:url" content="https://mayyoga.health/trac-nghiem/danh-gia-suc-khoe.html">
  <meta property="og:type" content="article">
  <meta property="og:image" content="https://mayyoga.health/assets/images/hero.webp">
  <meta property="og:site_name" content="Mây Yoga">
  <meta property="og:locale" content="vi_VN">
  <link rel="canonical" href="https://mayyoga.health/trac-nghiem/danh-gia-suc-khoe.html">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Đánh giá sức khỏe trước khi tập Yoga — Mây Yoga">
  <meta name="twitter:description" content="Bài đánh giá sức khỏe giúp giáo viên hiểu tình trạng của bạn trước khi bắt đầu lớp Yoga.">
  <meta name="twitter:image" content="https://mayyoga.health/assets/images/hero.webp">
  <style>
  .ha-section {{ display:none; }}
  .ha-section.active {{ display:block; }}
  .ha-section-header {{ text-align:center; margin-bottom:32px; }}
  .ha-sec-icon {{ font-size:2.5rem; display:block; margin-bottom:8px; }}
  .ha-section-header h2 {{ font-size:1.3rem; color:#3D5A3A; margin-bottom:6px; }}
  .ha-section-header p {{ color:#6B7280; font-size:0.95rem; }}
  .ha-question {{ background:#fff; border-radius:16px; padding:24px 28px; margin-bottom:20px; border:2px solid #e8ede8; transition:all 0.3s; }}
  .ha-question h3 {{ font-size:1.05rem; color:#3D5A3A; margin-bottom:16px; line-height:1.5; }}
  .ha-question h3 small {{ color:#9CA3AF; font-weight:400; }}
  .ha-question.ha-error {{ border-color:#FCA5A5; background:#FEF2F2; animation:shake 0.4s; }}
  .ha-nav {{ display:flex; gap:12px; justify-content:center; margin-top:32px; }}
  .ha-textarea {{ width:100%; padding:14px 18px; border:2px solid #e5e7eb; border-radius:12px; font-size:0.95rem; font-family:inherit; resize:vertical; transition:border-color 0.3s; }}
  .ha-textarea:focus {{ outline:none; border-color:#6B8E6B; }}
  .profile-card {{ background:#fff; border-radius:16px; padding:24px 28px; margin-bottom:16px; border:2px solid #e8ede8; text-align:left; }}
  .profile-card h4 {{ color:#3D5A3A; font-size:1.05rem; margin-bottom:12px; }}
  .profile-card ul {{ padding-left:20px; margin:0; }}
  .profile-card li {{ margin-bottom:6px; color:#374151; }}
  .profile-card p {{ color:#374151; line-height:1.7; margin:0; }}
  .profile-warning {{ border-color:#FCD34D; background:#FFFBEB; }}
  .profile-warning h4 {{ color:#92400E; }}
  .profile-ok {{ border-color:#A7F3D0; background:#ECFDF5; }}
  .profile-ok h4 {{ color:#065F46; }}
  .profile-rec {{ border-color:#c4d4c0; background:#f0f5ef; }}
  .profile-note {{ font-size:0.88rem; color:#92400E; margin-top:12px !important; font-style:italic; }}
  .profile-tags {{ display:flex; flex-wrap:wrap; gap:8px; }}
  .ptag {{ background:#f0f5ef; color:#3D5A3A; padding:6px 14px; border-radius:20px; font-size:0.88rem; font-weight:500; }}
  .ptag-goal {{ background:#EEF2FF; color:#4338CA; }}
  @keyframes shake {{ 0%,100%{{transform:translateX(0)}} 25%{{transform:translateX(-6px)}} 75%{{transform:translateX(6px)}} }}
  </style>
</head>
<body>
'''

header = '''
  <header class="article-header">
    <div class="container">
      <div class="breadcrumb">
        <a href="../index.html">Trang chủ</a><span class="sep">›</span>
        <a href="../trac-nghiem.html">Trắc nghiệm</a><span class="sep">›</span>
        <span>Đánh giá sức khỏe</span>
      </div>
      <span class="article-tag">🏥 Đánh giá đầu vào</span>
      <h1>Đánh giá sức khỏe trước khi tập Yoga</h1>
      <div class="article-meta">
        <span class="meta-item">📋 15 câu hỏi</span>
        <span class="meta-item">⏱ ~5 phút</span>
        <span class="meta-item">🏷️ Dành cho học viên mới</span>
      </div>
    </div>
  </header>
'''

body_start = '''
  <main class="article-body" style="padding: 40px 0 60px;">
    <div class="quiz-container">
      <p style="text-align:center;font-size:1.05rem;color:#4B5563;margin-bottom:32px;line-height:1.8;">
        Bài đánh giá này giúp giáo viên <strong>hiểu tình trạng sức khỏe</strong> của bạn<br>
        để thiết kế bài tập <strong>an toàn và phù hợp nhất</strong>. Thông tin hoàn toàn bảo mật.
      </p>
      <div class="quiz-progress">
        <div class="progress-bar"><div class="progress-fill" style="width:33%"></div></div>
        <span class="progress-text">1/3</span>
      </div>
'''

body_end = '''
    </div>
  </main>
'''

# Remove navbar from template and use extracted one
html = head + navbar + '\n' + header + body_start + s1 + s2 + s3 + result + body_end + '\n' + footer

outpath = os.path.join(os.path.dirname(__file__), 'trac-nghiem/danh-gia-suc-khoe.html')
with open(outpath, 'w') as f:
    f.write(html)

print(f"✅ Created: {outpath}")
