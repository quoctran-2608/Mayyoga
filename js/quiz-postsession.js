/**
 * Post-Session Assessment Quiz — MayYoga
 * Feedback form for therapeutic yoga students after each session
 */
document.addEventListener('DOMContentLoaded', function () {
  const sections = document.querySelectorAll('.ps-section');
  const nextBtns = document.querySelectorAll('.ps-next');
  const prevBtns = document.querySelectorAll('.ps-prev');
  const submitBtn = document.getElementById('psSubmit');
  const resultBox = document.getElementById('psResult');
  const progressFill = document.querySelector('.progress-fill');
  const progressText = document.querySelector('.progress-text');
  const totalSections = sections.length;
  let current = 0;
  let lastAnswers = null;
  let lastShareUrl = '';

  if (!sections.length) return;

  function showSection(idx) {
    sections.forEach((s, i) => {
      s.style.display = i === idx ? 'block' : 'none';
      s.classList.toggle('active', i === idx);
    });
    current = idx;
    const pct = Math.round(((idx + 1) / totalSections) * 100);
    if (progressFill) progressFill.style.width = pct + '%';
    if (progressText) progressText.textContent = (idx + 1) + '/' + totalSections;
    window.scrollTo({ top: document.querySelector('.quiz-container').offsetTop - 100, behavior: 'smooth' });
  }

  // Validate section
  function validateSection(idx) {
    const sec = sections[idx];
    const questions = sec.querySelectorAll('.ps-question');
    let valid = true;
    questions.forEach(q => {
      const type = q.dataset.type;
      const optional = q.dataset.required === 'false';
      if ((type === 'radio' || type === 'checkbox' || type === 'scale') && !optional) {
        const checked = q.querySelectorAll('.quiz-option.selected').length;
        if (checked === 0) { valid = false; q.classList.add('ps-error'); }
        else { q.classList.remove('ps-error'); }
      } else {
        q.classList.remove('ps-error');
      }
    });
    if (!valid) {
      const first = sec.querySelector('.ps-error');
      if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return valid;
  }

  // Radio/checkbox/scale click
  document.querySelectorAll('.ps-question').forEach(q => {
    const type = q.dataset.type;
    q.querySelectorAll('.quiz-option').forEach(opt => {
      opt.addEventListener('click', function () {
        if (type === 'radio' || type === 'scale') {
          q.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected'));
          this.classList.add('selected');
        } else if (type === 'checkbox') {
          this.classList.toggle('selected');
        }
        q.classList.remove('ps-error');
      });
    });
  });

  nextBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (validateSection(current) && current < totalSections - 1) showSection(current + 1);
    });
  });

  prevBtns.forEach(btn => {
    btn.addEventListener('click', () => { if (current > 0) showSection(current - 1); });
  });

  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      if (!validateSection(current)) return;

      const answers = {};
      document.querySelectorAll('.ps-question').forEach(q => {
        const id = q.dataset.qid;
        const type = q.dataset.type;
        if (type === 'radio' || type === 'scale') {
          const sel = q.querySelector('.quiz-option.selected');
          answers[id] = sel ? sel.dataset.value : '';
        } else if (type === 'checkbox') {
          answers[id] = Array.from(q.querySelectorAll('.quiz-option.selected')).map(o => o.dataset.value);
        } else if (type === 'text') {
          const input = q.querySelector('input, textarea');
          answers[id] = input ? input.value : '';
        }
      });

      lastAnswers = answers;
      generateReport(answers);
      // Encode for sharing
      const bytes = new TextEncoder().encode(JSON.stringify(answers));
      const encoded = btoa(String.fromCharCode(...bytes));
      const shareUrl = window.location.origin + window.location.pathname + '#r=' + encoded;
      history.replaceState(null, '', '#r=' + encoded);
      lastShareUrl = shareUrl;
    });
  }

  function generateReport(a) {
    const r = document.getElementById('psResult');
    const content = document.getElementById('reportContent');
    if (!r || !content) return;

    let html = '';

    // 1. Pain comparison
    const painBefore = parseInt(a.pain_before) || 0;
    const painAfter = parseInt(a.pain_after) || 0;
    const painDiff = painBefore - painAfter;
    const painClass = painDiff > 0 ? 'report-positive' : (painDiff < 0 ? 'report-negative' : 'report-neutral');
    const painIcon = painDiff > 0 ? '📉' : (painDiff < 0 ? '📈' : '➡️');
    const painMsg = painDiff > 0 
      ? 'Mức đau giảm ' + painDiff + ' điểm sau buổi tập! 🎉'
      : (painDiff < 0 ? 'Mức đau tăng ' + Math.abs(painDiff) + ' điểm — cần điều chỉnh bài tập.' : 'Mức đau không thay đổi.');

    html += '<div class="report-card ' + painClass + '">';
    html += '<h4>' + painIcon + ' So sánh mức đau</h4>';
    html += '<div class="pain-compare">';
    html += '<div class="pain-box"><span class="pain-label">Trước tập</span><span class="pain-num">' + painBefore + '</span><span class="pain-max">/10</span></div>';
    html += '<div class="pain-arrow">' + (painDiff > 0 ? '→' : (painDiff < 0 ? '→' : '=')) + '</div>';
    html += '<div class="pain-box"><span class="pain-label">Sau tập</span><span class="pain-num">' + painAfter + '</span><span class="pain-max">/10</span></div>';
    html += '</div>';
    html += '<p class="pain-summary">' + painMsg + '</p>';
    html += '</div>';

    // 2. Movement / Mobility
    const mobLabels = { much_better:'Cải thiện rõ rệt', better:'Cải thiện nhẹ', same:'Không thay đổi', worse:'Kém hơn' };
    html += '<div class="report-card"><h4>🤸 Khả năng vận động</h4>';
    html += '<p>Sau buổi tập: <strong>' + (mobLabels[a.mobility] || '') + '</strong></p>';
    html += '</div>';

    // 3. Emotional state
    const emoLabels = { relaxed:'Thư giãn, nhẹ nhàng 😌', calm:'Bình tĩnh, cân bằng 🧘', energized:'Tràn đầy năng lượng ⚡', same:'Không thay đổi 😐', anxious:'Lo lắng, bất an 😟', tired:'Mệt mỏi 😴' };
    html += '<div class="report-card"><h4>💚 Cảm xúc sau buổi tập</h4>';
    html += '<p>' + (emoLabels[a.emotion] || '') + '</p>';
    html += '</div>';

    // 4. Discomfort areas
    if (a.discomfort && a.discomfort.length && !a.discomfort.includes('none')) {
      const discLabels = { neck:'Cổ/vai', upper_back:'Lưng trên', lower_back:'Thắt lưng', hip:'Hông', knee:'Đầu gối', wrist:'Cổ tay', other:'Vùng khác' };
      html += '<div class="report-card report-caution"><h4>⚠️ Vùng khó chịu trong buổi tập</h4><ul>';
      a.discomfort.forEach(d => html += '<li>' + (discLabels[d] || d) + '</li>');
      html += '</ul><p class="report-note">Giáo viên sẽ điều chỉnh bài tập cho buổi tiếp theo.</p></div>';
    }

    // 5. Breathwork
    const breathLabels = { easy:'Dễ dàng, tự nhiên', moderate:'Ổn, cần tập trung', difficult:'Khó khăn, hay bị gián đoạn' };
    html += '<div class="report-card"><h4>🌬️ Kỹ thuật thở</h4>';
    html += '<p>' + (breathLabels[a.breathing] || '') + '</p>';
    html += '</div>';

    // 6. Overall satisfaction
    const satLabels = { 5:'Rất hài lòng ⭐⭐⭐⭐⭐', 4:'Hài lòng ⭐⭐⭐⭐', 3:'Bình thường ⭐⭐⭐', 2:'Chưa hài lòng ⭐⭐', 1:'Không hài lòng ⭐' };
    html += '<div class="report-card"><h4>🌟 Đánh giá tổng thể</h4>';
    html += '<p class="sat-display">' + (satLabels[a.satisfaction] || '') + '</p>';
    html += '</div>';

    // 7. Favorite part
    if (a.favorite && a.favorite.length) {
      const favLabels = { warmup:'Khởi động', asana:'Tư thế (Asana)', breath:'Bài thở (Pranayama)', meditation:'Thiền', savasana:'Thư giãn (Savasana)', stretch:'Kéo giãn' };
      html += '<div class="report-card"><h4>💜 Phần yêu thích nhất</h4><div class="report-tags">';
      a.favorite.forEach(f => html += '<span class="rtag">' + (favLabels[f] || f) + '</span>');
      html += '</div></div>';
    }

    // 8. Notes
    if (a.notes && a.notes.trim()) {
      html += '<div class="report-card"><h4>📝 Ghi chú thêm</h4><p>' + a.notes.replace(/</g,'&lt;') + '</p></div>';
    }

    // Progress insight
    html += '<div class="report-card report-insight"><h4>💡 Nhận xét</h4>';
    if (painDiff > 2) {
      html += '<p>Buổi tập này rất hiệu quả! Mức đau giảm đáng kể. Tiếp tục duy trì nhé.</p>';
    } else if (painDiff > 0) {
      html += '<p>Có cải thiện nhẹ. Kiên trì tập đều đặn sẽ thấy kết quả rõ hơn.</p>';
    } else if (painDiff === 0 && painBefore <= 3) {
      html += '<p>Tình trạng ổn định — cơ thể bạn đang duy trì tốt! 👏</p>';
    } else if (painDiff < 0) {
      html += '<p>Cần báo giáo viên về vùng đau tăng để điều chỉnh bài tập phù hợp hơn.</p>';
    } else {
      html += '<p>Tiếp tục theo dõi qua các buổi tập tiếp theo để thấy xu hướng cải thiện.</p>';
    }
    html += '</div>';

    content.innerHTML = html;
    sections.forEach(s => s.style.display = 'none');
    document.querySelector('.quiz-progress').style.display = 'none';
    r.style.display = 'block';
    r.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Send buttons
  document.addEventListener('click', function(e) {
    if (!lastAnswers || !lastShareUrl) return;
    const btn = e.target.closest('[data-send]');
    if (!btn) return;
    const method = btn.dataset.send;
    const msg = '📋 Đánh giá sau buổi tập Yoga Trị liệu:\n' + lastShareUrl;
    if (method === 'zalo') {
      window.open('https://zalo.me/0326808864', '_blank');
      navigator.clipboard.writeText(msg).then(() => {
        alert('Đã sao chép link kết quả! Hãy dán (Ctrl+V) vào Zalo cho Mây nhé 💚');
      }).catch(() => {
        alert('Vui lòng copy link trên thanh địa chỉ và dán vào Zalo cho Mây nhé 💚');
      });
    } else if (method === 'facebook') {
      window.open('https://m.me/61573065832463', '_blank');
      navigator.clipboard.writeText(msg).then(() => {
        alert('Đã sao chép link kết quả! Hãy dán (Ctrl+V) vào Messenger cho Mây nhé 💙');
      }).catch(() => {
        alert('Vui lòng copy link trên thanh địa chỉ và dán vào Messenger cho Mây nhé 💙');
      });
    } else if (method === 'whatsapp') {
      window.open('https://wa.me/84326808864?text=' + encodeURIComponent(msg), '_blank');
    }
  });

  // Retry
  const retryBtn = document.getElementById('psRetry');
  if (retryBtn) {
    retryBtn.addEventListener('click', () => {
      document.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected'));
      document.querySelectorAll('input, textarea').forEach(i => i.value = '');
      resultBox.style.display = 'none';
      document.querySelector('.quiz-progress').style.display = 'flex';
      const introP = document.querySelector('.quiz-container > p');
      if (introP) introP.style.display = '';
      lastAnswers = null;
      lastShareUrl = '';
      history.replaceState(null, '', window.location.pathname);
      showSection(0);
    });
  }

  // Init — check URL hash for shared results
  const hash = window.location.hash;
  if (hash && hash.startsWith('#r=')) {
    try {
      const raw = new TextDecoder().decode(Uint8Array.from(atob(hash.substring(3)), c => c.charCodeAt(0)));
      const decoded = JSON.parse(raw);
      lastAnswers = decoded;
      lastShareUrl = window.location.href;
      const introP = document.querySelector('.quiz-container > p');
      if (introP) introP.style.display = 'none';
      generateReport(decoded);
    } catch(e) {
      showSection(0);
    }
  } else {
    showSection(0);
  }
});
