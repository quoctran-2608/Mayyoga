import os

# Read navbar+footer from existing quiz page
with open('/Users/phanthumay/Desktop/mayyoga.health/web/trac-nghiem/danh-gia-suc-khoe.html', 'r') as f:
    src = f.read()

# Extract navbar (from <!-- ===== NAVBAR to </nav>)
nav_start = src.find('<!-- ===== NAVBAR')
nav_end = src.find('</nav>') + 6
navbar = src[nav_start:nav_end]

# Extract footer
ft_start = src.find('<footer')
ft_end = src.find('</footer>') + 9
footer = src[ft_start:ft_end]

# Extract floating contact
fc_start = src.find('<!-- ===== FLOATING CONTACT')
fc_end = src.find('</div>\n\n</body>')
floating = src[fc_start:fc_end] if fc_start > 0 else ''

html = '''<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Đánh giá sau buổi tập Yoga Trị liệu — Mây Yoga</title>
  <meta name="description" content="Bài đánh giá sau mỗi buổi tập Yoga Trị liệu giúp theo dõi tiến trình và điều chỉnh bài tập phù hợp.">
  <link rel="stylesheet" href="../css/style.css?v=4">
  <link rel="icon" type="image/x-icon" href="../favicon.ico">
  <link rel="apple-touch-icon" href="../apple-touch-icon.png">
  <meta property="og:title" content="Đánh giá sau buổi tập Yoga Trị liệu — Mây Yoga">
  <meta property="og:description" content="Theo dõi tiến trình trị liệu qua mỗi buổi tập Yoga.">
  <meta property="og:url" content="https://mayyoga.health/trac-nghiem/danh-gia-sau-buoi-tap.html">
  <meta property="og:type" content="article">
  <meta property="og:image" content="https://mayyoga.health/assets/images/hero.webp">
  <meta property="og:site_name" content="Mây Yoga">
  <meta property="og:locale" content="vi_VN">
  <link rel="canonical" href="https://mayyoga.health/trac-nghiem/danh-gia-sau-buoi-tap.html">
  <style>
  .ps-section { display:none; }
  .ps-section.active { display:block; }
  .ps-section-header { text-align:center; margin-bottom:32px; }
  .ps-sec-icon { font-size:2.5rem; display:block; margin-bottom:8px; }
  .ps-section-header h2 { font-size:1.3rem; color:#3D5A3A; margin-bottom:6px; }
  .ps-section-header p { color:#6B7280; font-size:0.95rem; }
  .ps-question { background:#fff; border-radius:16px; padding:24px 28px; margin-bottom:20px; border:2px solid #e8ede8; transition:all 0.3s; }
  .ps-question h3 { font-size:1.05rem; color:#3D5A3A; margin-bottom:16px; line-height:1.5; }
  .ps-question h3 small { color:#9CA3AF; font-weight:400; }
  .ps-question.ps-error { border-color:#FCA5A5; background:#FEF2F2; animation:shake 0.4s; }
  .ps-nav { display:flex; gap:12px; justify-content:center; margin-top:32px; }
  .ps-textarea { width:100%; padding:14px 18px; border:2px solid #e5e7eb; border-radius:12px; font-size:0.95rem; font-family:inherit; resize:vertical; transition:border-color 0.3s; }
  .ps-textarea:focus { outline:none; border-color:#6B8E6B; }
  .scale-options { display:flex; gap:6px; flex-wrap:wrap; justify-content:center; }
  .scale-options .quiz-option { min-width:48px; text-align:center; padding:12px 8px; font-size:1.1rem; font-weight:700; }
  .report-card { background:#fff; border-radius:16px; padding:24px 28px; margin-bottom:16px; border:2px solid #e8ede8; text-align:left; }
  .report-card h4 { color:#3D5A3A; font-size:1.05rem; margin-bottom:12px; }
  .report-card p { color:#374151; line-height:1.7; margin:0; }
  .report-card ul { padding-left:20px; margin:0; }
  .report-card li { margin-bottom:6px; color:#374151; }
  .report-positive { border-color:#A7F3D0; background:#ECFDF5; }
  .report-positive h4 { color:#065F46; }
  .report-negative { border-color:#FCA5A5; background:#FEF2F2; }
  .report-negative h4 { color:#991B1B; }
  .report-neutral { border-color:#E5E7EB; background:#F9FAFB; }
  .report-caution { border-color:#FCD34D; background:#FFFBEB; }
  .report-caution h4 { color:#92400E; }
  .report-insight { border-color:#c4d4c0; background:#f0f5ef; }
  .report-note { font-size:0.88rem; color:#92400E; margin-top:12px !important; font-style:italic; }
  .report-tags { display:flex; flex-wrap:wrap; gap:8px; }
  .rtag { background:#EEF2FF; color:#4338CA; padding:6px 14px; border-radius:20px; font-size:0.88rem; font-weight:500; }
  .pain-compare { display:flex; align-items:center; justify-content:center; gap:20px; margin:16px 0; }
  .pain-box { text-align:center; }
  .pain-label { display:block; font-size:0.85rem; color:#6B7280; margin-bottom:4px; }
  .pain-num { font-size:2rem; font-weight:800; color:#3D5A3A; }
  .pain-max { font-size:0.85rem; color:#9CA3AF; }
  .pain-arrow { font-size:1.5rem; color:#9CA3AF; }
  .pain-summary { text-align:center; font-weight:600; margin-top:8px !important; }
  .sat-display { font-size:1.1rem; font-weight:600; }
  .send-section { background:#fff; border:2px solid #d4e4d0; border-radius:16px; padding:24px 28px; margin-top:24px; text-align:center; }
  .send-section h4 { color:#3D5A3A; margin-bottom:16px; font-size:1.05rem; }
  .send-btns { display:flex; flex-wrap:wrap; gap:10px; justify-content:center; }
  .send-btn { display:inline-flex; align-items:center; gap:8px; padding:12px 20px; border-radius:12px; font-size:0.92rem; font-weight:600; cursor:pointer; border:2px solid transparent; transition:all 0.3s; text-decoration:none; }
  .send-btn:hover { transform:translateY(-2px); box-shadow:0 4px 12px rgba(0,0,0,0.15); }
  .send-btn-zalo { background:#0068FF; color:#fff; }
  .send-btn-fb { background:#1877F2; color:#fff; }
  .send-btn-whatsapp { background:#25D366; color:#fff; }
  @keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-6px)} 75%{transform:translateX(6px)} }
  @media (max-width: 600px) {
    .ps-question { padding: 20px 16px; }
    .report-card { padding: 20px 16px; }
    .send-section { padding: 20px 16px; }
    .ps-textarea { font-size: 16px; }
    .ps-nav { flex-direction: column; width: 100%; gap: 10px; }
    .ps-nav button { width: 100%; }
    .send-btns { flex-direction: column; }
    .send-btn { width: 100%; justify-content: center; }
    .scale-options .quiz-option { min-width:40px; padding:10px 6px; font-size:1rem; }
  }
  </style>
</head>
<body>

  ''' + navbar + '''

  <header class="article-header">
    <div class="container">
      <div class="breadcrumb">
        <a href="../index.html">Trang chủ</a><span class="sep">›</span>
        <a href="../trac-nghiem.html">Trắc nghiệm</a><span class="sep">›</span>
        <span>Đánh giá sau buổi tập</span>
      </div>
      <span class="article-tag">🧘 Yoga Trị liệu</span>
      <h1>Đánh giá sau buổi tập Yoga Trị liệu</h1>
      <div class="article-meta">
        <span class="meta-item">📋 10 câu hỏi</span>
        <span class="meta-item">⏱ ~3 phút</span>
        <span class="meta-item">🏷️ Dành cho học viên trị liệu</span>
      </div>
    </div>
  </header>

  <main class="article-body" style="padding: 40px 0 60px;">
    <div class="quiz-container">
      <p style="text-align:center;font-size:1.05rem;color:#4B5563;margin-bottom:32px;line-height:1.8;">
        Chia sẻ cảm nhận sau buổi tập giúp giáo viên <strong>theo dõi tiến trình</strong><br>
        và <strong>điều chỉnh bài tập</strong> phù hợp nhất cho bạn.
      </p>
      <div class="quiz-progress">
        <div class="progress-bar"><div class="progress-fill" style="width:50%"></div></div>
        <span class="progress-text">1/2</span>
      </div>

<!-- Section 1: Pain & Body -->
<div class="ps-section" data-section="1">
<div class="ps-section-header"><span class="ps-sec-icon">🩺</span><h2>Phần 1: Cơ thể & Mức đau</h2><p>So sánh trước và sau buổi tập</p></div>

<div class="ps-question" data-qid="pain_before" data-type="scale">
<h3>Mức đau/khó chịu <strong>TRƯỚC</strong> buổi tập? <small>(0 = không đau, 10 = rất đau)</small></h3>
<div class="quiz-options scale-options">
<div class="quiz-option" data-value="0"><span class="option-radio"></span>0</div>
<div class="quiz-option" data-value="1"><span class="option-radio"></span>1</div>
<div class="quiz-option" data-value="2"><span class="option-radio"></span>2</div>
<div class="quiz-option" data-value="3"><span class="option-radio"></span>3</div>
<div class="quiz-option" data-value="4"><span class="option-radio"></span>4</div>
<div class="quiz-option" data-value="5"><span class="option-radio"></span>5</div>
<div class="quiz-option" data-value="6"><span class="option-radio"></span>6</div>
<div class="quiz-option" data-value="7"><span class="option-radio"></span>7</div>
<div class="quiz-option" data-value="8"><span class="option-radio"></span>8</div>
<div class="quiz-option" data-value="9"><span class="option-radio"></span>9</div>
<div class="quiz-option" data-value="10"><span class="option-radio"></span>10</div>
</div></div>

<div class="ps-question" data-qid="pain_after" data-type="scale">
<h3>Mức đau/khó chịu <strong>SAU</strong> buổi tập?</h3>
<div class="quiz-options scale-options">
<div class="quiz-option" data-value="0"><span class="option-radio"></span>0</div>
<div class="quiz-option" data-value="1"><span class="option-radio"></span>1</div>
<div class="quiz-option" data-value="2"><span class="option-radio"></span>2</div>
<div class="quiz-option" data-value="3"><span class="option-radio"></span>3</div>
<div class="quiz-option" data-value="4"><span class="option-radio"></span>4</div>
<div class="quiz-option" data-value="5"><span class="option-radio"></span>5</div>
<div class="quiz-option" data-value="6"><span class="option-radio"></span>6</div>
<div class="quiz-option" data-value="7"><span class="option-radio"></span>7</div>
<div class="quiz-option" data-value="8"><span class="option-radio"></span>8</div>
<div class="quiz-option" data-value="9"><span class="option-radio"></span>9</div>
<div class="quiz-option" data-value="10"><span class="option-radio"></span>10</div>
</div></div>

<div class="ps-question" data-qid="mobility" data-type="radio">
<h3>Khả năng vận động sau buổi tập?</h3>
<div class="quiz-options">
<div class="quiz-option" data-value="much_better"><span class="option-radio"></span>Cải thiện rõ rệt</div>
<div class="quiz-option" data-value="better"><span class="option-radio"></span>Cải thiện nhẹ</div>
<div class="quiz-option" data-value="same"><span class="option-radio"></span>Không thay đổi</div>
<div class="quiz-option" data-value="worse"><span class="option-radio"></span>Kém hơn trước tập</div>
</div></div>

<div class="ps-question" data-qid="discomfort" data-type="checkbox" data-required="false">
<h3>Vùng nào khó chịu trong buổi tập? <small>(chọn nhiều, không bắt buộc)</small></h3>
<div class="quiz-options">
<div class="quiz-option" data-value="none"><span class="option-radio"></span>Không có</div>
<div class="quiz-option" data-value="neck"><span class="option-radio"></span>Cổ / vai</div>
<div class="quiz-option" data-value="upper_back"><span class="option-radio"></span>Lưng trên</div>
<div class="quiz-option" data-value="lower_back"><span class="option-radio"></span>Thắt lưng</div>
<div class="quiz-option" data-value="hip"><span class="option-radio"></span>Hông</div>
<div class="quiz-option" data-value="knee"><span class="option-radio"></span>Đầu gối</div>
<div class="quiz-option" data-value="wrist"><span class="option-radio"></span>Cổ tay</div>
<div class="quiz-option" data-value="other"><span class="option-radio"></span>Vùng khác</div>
</div></div>

<div class="ps-nav"><button class="btn btn-primary ps-next">Tiếp theo →</button></div>
</div>

<!-- Section 2: Experience & Feedback -->
<div class="ps-section" data-section="2">
<div class="ps-section-header"><span class="ps-sec-icon">💚</span><h2>Phần 2: Cảm nhận & Đánh giá</h2><p>Chia sẻ trải nghiệm buổi tập</p></div>

<div class="ps-question" data-qid="emotion" data-type="radio">
<h3>Cảm xúc sau buổi tập?</h3>
<div class="quiz-options">
<div class="quiz-option" data-value="relaxed"><span class="option-radio"></span>😌 Thư giãn, nhẹ nhàng</div>
<div class="quiz-option" data-value="calm"><span class="option-radio"></span>🧘 Bình tĩnh, cân bằng</div>
<div class="quiz-option" data-value="energized"><span class="option-radio"></span>⚡ Tràn đầy năng lượng</div>
<div class="quiz-option" data-value="same"><span class="option-radio"></span>😐 Không thay đổi</div>
<div class="quiz-option" data-value="anxious"><span class="option-radio"></span>😟 Lo lắng, bất an</div>
<div class="quiz-option" data-value="tired"><span class="option-radio"></span>😴 Mệt mỏi</div>
</div></div>

<div class="ps-question" data-qid="breathing" data-type="radio">
<h3>Kỹ thuật thở trong buổi tập?</h3>
<div class="quiz-options">
<div class="quiz-option" data-value="easy"><span class="option-radio"></span>Dễ dàng, tự nhiên</div>
<div class="quiz-option" data-value="moderate"><span class="option-radio"></span>Ổn, cần tập trung</div>
<div class="quiz-option" data-value="difficult"><span class="option-radio"></span>Khó khăn, hay bị gián đoạn</div>
</div></div>

<div class="ps-question" data-qid="favorite" data-type="checkbox" data-required="false">
<h3>Phần yêu thích nhất? <small>(chọn nhiều, không bắt buộc)</small></h3>
<div class="quiz-options">
<div class="quiz-option" data-value="warmup"><span class="option-radio"></span>Khởi động</div>
<div class="quiz-option" data-value="asana"><span class="option-radio"></span>Tư thế (Asana)</div>
<div class="quiz-option" data-value="breath"><span class="option-radio"></span>Bài thở (Pranayama)</div>
<div class="quiz-option" data-value="meditation"><span class="option-radio"></span>Thiền</div>
<div class="quiz-option" data-value="savasana"><span class="option-radio"></span>Thư giãn (Savasana)</div>
<div class="quiz-option" data-value="stretch"><span class="option-radio"></span>Kéo giãn</div>
</div></div>

<div class="ps-question" data-qid="satisfaction" data-type="scale">
<h3>Đánh giá tổng thể buổi tập? <small>(1-5 sao)</small></h3>
<div class="quiz-options scale-options">
<div class="quiz-option" data-value="1"><span class="option-radio"></span>⭐</div>
<div class="quiz-option" data-value="2"><span class="option-radio"></span>⭐⭐</div>
<div class="quiz-option" data-value="3"><span class="option-radio"></span>⭐⭐⭐</div>
<div class="quiz-option" data-value="4"><span class="option-radio"></span>⭐⭐⭐⭐</div>
<div class="quiz-option" data-value="5"><span class="option-radio"></span>⭐⭐⭐⭐⭐</div>
</div></div>

<div class="ps-question" data-qid="notes" data-type="text" data-required="false">
<h3>Ghi chú thêm cho giáo viên?</h3>
<textarea class="ps-textarea" placeholder="Ví dụ: tư thế nào khó, muốn tập thêm phần nào..." rows="3"></textarea>
</div>

<div class="ps-nav"><button class="btn btn-secondary ps-prev">← Quay lại</button><button class="btn btn-primary" id="psSubmit">Xem kết quả →</button></div>
</div>

<!-- Result -->
<div class="quiz-result personality-result" id="psResult" style="display:none;">
<h2>📊 Báo cáo buổi tập Yoga Trị liệu</h2>
<p style="text-align:center;color:#6B7280;margin-bottom:28px;">Kết quả giúp giáo viên theo dõi và điều chỉnh bài tập cho buổi tiếp theo</p>
<div id="reportContent"></div>
<div class="send-section">
<h4>📨 Gửi kết quả cho Mây</h4>
<div class="send-btns">
<button class="send-btn send-btn-zalo" data-send="zalo">💬 Gửi qua Zalo</button>
<button class="send-btn send-btn-fb" data-send="facebook">💙 Gửi qua Facebook</button>
<button class="send-btn send-btn-whatsapp" data-send="whatsapp">💚 Gửi qua WhatsApp</button>
</div>
</div>
<div style="margin-top:32px;text-align:center;">
<button id="psRetry" class="btn btn-secondary">Làm lại →</button>
<a href="../trac-nghiem.html" style="display:inline-block;margin-left:12px;" class="btn btn-primary">Trắc nghiệm khác →</a>
</div>
</div>
    </div>
  </main>

''' + footer + '''

  <script src="../js/main.js"></script>
  <script src="../js/quiz-postsession.js"></script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Đánh giá sau buổi tập Yoga Trị liệu — Mây Yoga",
    "description": "Bài đánh giá sau mỗi buổi tập Yoga Trị liệu.",
    "url": "https://mayyoga.health/trac-nghiem/danh-gia-sau-buoi-tap.html"
  }
  </script>
  <script src="../js/search-index.js"></script>
  <script src="../js/search.js"></script>
  ''' + floating + '''

</body>
</html>
'''

out = '/Users/phanthumay/Desktop/mayyoga.health/web/trac-nghiem/danh-gia-sau-buoi-tap.html'
with open(out, 'w') as f:
    f.write(html)
print('Created:', out)
