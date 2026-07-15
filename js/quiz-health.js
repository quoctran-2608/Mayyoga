/**
 * Health Assessment Quiz — MayYoga
 * Multi-section intake form for new yoga students
 */
document.addEventListener('DOMContentLoaded', function () {
  const sections = document.querySelectorAll('.ha-section');
  const nextBtns = document.querySelectorAll('.ha-next');
  const prevBtns = document.querySelectorAll('.ha-prev');
  const submitBtn = document.getElementById('haSubmit');
  const resultBox = document.getElementById('haResult');
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

  // Validate current section
  function validateSection(idx) {
    const sec = sections[idx];
    const questions = sec.querySelectorAll('.ha-question');
    let valid = true;
    questions.forEach(q => {
      const type = q.dataset.type;
      const optional = q.dataset.required === 'false';
      if ((type === 'radio' || type === 'checkbox') && !optional) {
        const checked = q.querySelectorAll('.quiz-option.selected').length;
        if (checked === 0) { valid = false; q.classList.add('ha-error'); }
        else { q.classList.remove('ha-error'); }
      } else {
        q.classList.remove('ha-error');
      }
    });
    if (!valid) {
      const first = sec.querySelector('.ha-error');
      if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return valid;
  }

  // Radio/checkbox click
  document.querySelectorAll('.ha-question').forEach(q => {
    const type = q.dataset.type;
    q.querySelectorAll('.quiz-option').forEach(opt => {
      opt.addEventListener('click', function () {
        if (type === 'radio') {
          q.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected'));
          this.classList.add('selected');
        } else if (type === 'checkbox') {
          this.classList.toggle('selected');
        }
        q.classList.remove('ha-error');
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

      // Collect all answers
      const answers = {};
      const allQ = document.querySelectorAll('.ha-question');
      allQ.forEach(q => {
        const id = q.dataset.qid;
        const type = q.dataset.type;
        if (type === 'radio') {
          const sel = q.querySelector('.quiz-option.selected');
          answers[id] = sel ? sel.dataset.value : '';
        } else if (type === 'checkbox') {
          answers[id] = Array.from(q.querySelectorAll('.quiz-option.selected')).map(o => o.dataset.value);
        } else if (type === 'text') {
          const input = q.querySelector('input, textarea');
          answers[id] = input ? input.value : '';
        }
      });

      // Generate profile
      lastAnswers = answers;
      generateProfile(answers);
      // Encode answers into URL for sharing (TextEncoder = Unicode safe)
      const bytes = new TextEncoder().encode(JSON.stringify(answers));
      const encoded = btoa(String.fromCharCode(...bytes));
      const shareUrl = window.location.origin + window.location.pathname + '#r=' + encoded;
      history.replaceState(null, '', '#r=' + encoded);
      lastShareUrl = shareUrl;
    });
  }

  function generateProfile(a) {
    const r = document.getElementById('haResult');
    const profile = document.getElementById('profileContent');
    if (!r || !profile) return;

    let html = '';

    // 1. Risk flags
    const risks = [];
    if (a.injury && a.injury.length && !a.injury.includes('none')) {
      a.injury.forEach(i => risks.push(getLabel('injury', i)));
    }
    if (a.chronic && a.chronic.length && !a.chronic.includes('none')) {
      a.chronic.forEach(c => risks.push(getLabel('chronic', c)));
    }
    if (a.pain && a.pain.length && !a.pain.includes('none')) {
      a.pain.forEach(p => risks.push(getLabel('pain', p)));
    }
    if (a.pregnant === 'yes') risks.push('Đang mang thai');
    if (a.surgery === 'yes') risks.push('Phẫu thuật gần đây');

    if (risks.length) {
      html += '<div class="profile-card profile-warning"><h4>⚠️ Lưu ý sức khỏe</h4><ul>';
      risks.forEach(r => html += '<li>' + r + '</li>');
      html += '</ul><p class="profile-note">Giáo viên sẽ điều chỉnh bài tập phù hợp với tình trạng của bạn.</p></div>';
    } else {
      html += '<div class="profile-card profile-ok"><h4>✅ Không có vấn đề sức khỏe đặc biệt</h4><p>Bạn có thể tham gia các lớp Yoga bình thường.</p></div>';
    }

    // 2. Fitness level
    const levels = { 'none': 'Chưa tập', 'beginner': 'Mới bắt đầu', 'intermediate': 'Trung bình', 'advanced': 'Nâng cao' };
    const flex = { 'low': 'Cứng, khó gập người', 'medium': 'Trung bình', 'high': 'Dẻo dai' };
    html += '<div class="profile-card"><h4>🏃 Thể lực hiện tại</h4>';
    html += '<div class="profile-tags">';
    html += '<span class="ptag">Kinh nghiệm: ' + (levels[a.experience] || 'N/A') + '</span>';
    html += '<span class="ptag">Độ dẻo: ' + (flex[a.flexibility] || 'N/A') + '</span>';
    html += '<span class="ptag">Vận động: ' + (a.activity ? getLabel('activity', a.activity) : 'N/A') + '</span>';
    html += '</div></div>';

    // 3. Goals
    if (a.goals && a.goals.length) {
      html += '<div class="profile-card"><h4>🎯 Mục tiêu tập Yoga</h4><div class="profile-tags">';
      a.goals.forEach(g => html += '<span class="ptag ptag-goal">' + getLabel('goals', g) + '</span>');
      html += '</div></div>';
    }

    // 4. Lifestyle
    html += '<div class="profile-card"><h4>🌙 Lối sống & Tinh thần</h4><div class="profile-tags">';
    html += '<span class="ptag">Stress: ' + getLabel('stress', a.stress) + '</span>';
    html += '<span class="ptag">Giấc ngủ: ' + getLabel('sleep', a.sleep) + '</span>';
    html += '</div></div>';

    // 5. Recommendation
    html += '<div class="profile-card profile-rec"><h4>💡 Gợi ý lớp học phù hợp</h4>';
    html += getRecommendation(a);
    html += '</div>';

    // 6. Notes
    if (a.notes && a.notes.trim()) {
      html += '<div class="profile-card"><h4>📝 Ghi chú thêm</h4><p>' + a.notes.replace(/</g,'&lt;') + '</p></div>';
    }

    profile.innerHTML = html;
    sections.forEach(s => s.style.display = 'none');
    document.querySelector('.quiz-progress').style.display = 'none';
    r.style.display = 'block';
    r.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function getRecommendation(a) {
    let rec = '';
    const hasRisk = (a.injury && a.injury.length && !a.injury.includes('none')) || (a.chronic && a.chronic.length && !a.chronic.includes('none'));
    const isNew = a.experience === 'none' || a.experience === 'beginner';
    const stiff = a.flexibility === 'low';

    if (hasRisk) {
      rec = '<p>🧘 <strong>Yoga Trị liệu 1:1</strong> — Bạn có một số vấn đề sức khỏe cần được hướng dẫn riêng. Lớp 1:1 sẽ giúp giáo viên thiết kế bài tập an toàn và phù hợp nhất.</p>';
      rec += '<a href="../hoc-yoga-online.html" class="btn btn-primary" style="margin-top:12px;">Tìm hiểu Yoga 1:1 →</a>';
    } else if (isNew && stiff) {
      rec = '<p>🌱 <strong>Hatha Yoga cơ bản</strong> — Phong cách nhẹ nhàng, tập trung vào hơi thở và tư thế cơ bản, phù hợp cho người mới và cơ thể cứng.</p>';
      rec += '<a href="../bai-viet/yoga-cho-nguoi-moi.html" class="btn btn-primary" style="margin-top:12px;">Yoga cho người mới →</a>';
    } else if (isNew) {
      rec = '<p>🌿 <strong>Hatha Yoga</strong> — Nền tảng vững chắc cho hành trình Yoga, phù hợp mọi thể trạng.</p>';
      rec += '<a href="../hatha-yoga.html" class="btn btn-primary" style="margin-top:12px;">Tìm hiểu Hatha Yoga →</a>';
    } else {
      rec = '<p>🔥 <strong>Vinyasa hoặc Hatha nâng cao</strong> — Bạn đã có nền tảng, hãy thử thách bản thân với các flow liên tục hoặc tư thế nâng cao.</p>';
      rec += '<a href="../tu-tap-tai-nha.html" class="btn btn-primary" style="margin-top:12px;">Bắt đầu tập →</a>';
    }
    return rec;
  }

  function getLabel(field, val) {
    const labels = {
      injury: { none:'Không', back:'Đau lưng/cột sống', knee:'Chấn thương đầu gối', shoulder:'Đau vai/cổ', wrist:'Cổ tay/khuỷu tay', ankle:'Mắt cá/bàn chân', other:'Khác' },
      chronic: { none:'Không', hypertension:'Huyết áp cao', diabetes:'Tiểu đường', heart:'Tim mạch', asthma:'Hen suyễn', thyroid:'Tuyến giáp', arthritis:'Viêm khớp', other:'Khác' },
      pain: { none:'Không đau', neck:'Cổ/vai', upper_back:'Lưng trên', lower_back:'Thắt lưng', hip:'Hông/xương chậu', knee:'Đầu gối', wrist:'Cổ tay' },
      activity: { sedentary:'Ít vận động', light:'Nhẹ (đi bộ)', moderate:'Trung bình', active:'Năng động' },
      goals: { flexibility:'Tăng dẻo dai', strength:'Tăng sức mạnh', stress:'Giảm stress', pain:'Giảm đau', weight:'Giảm cân', sleep:'Ngủ ngon hơn', mindfulness:'Chánh niệm', posture:'Cải thiện tư thế' },
      stress: { low:'Thấp', medium:'Trung bình', high:'Cao', very_high:'Rất cao' },
      sleep: { good:'Tốt', fair:'Bình thường', poor:'Kém', insomnia:'Mất ngủ' }
    };
    return (labels[field] && labels[field][val]) || val;
  }

  // Build plain-text summary for sending
  function buildSummaryText(a) {
    let t = '📋 HỒ SƠ SỨC KHỎE YOGA\n';
    t += '========================\n\n';
    // Health
    t += '🏥 SỨC KHỎE:\n';
    t += '• Chấn thương: ' + (a.injury && a.injury.length ? a.injury.map(i => getLabel('injury', i)).join(', ') : 'Không') + '\n';
    if (a.chronic && a.chronic.length) {
      t += '• Bệnh mãn tính: ' + a.chronic.map(c => getLabel('chronic', c)).join(', ') + '\n';
    }
    t += '• Mang thai: ' + (a.pregnant === 'yes' ? 'Có' : 'Không') + '\n';
    t += '• Phẫu thuật gần đây: ' + (a.surgery === 'yes' ? 'Có' : 'Không') + '\n\n';
    // Fitness
    const levels = { 'none':'Chưa tập', 'beginner':'Mới bắt đầu', 'intermediate':'Trung bình', 'advanced':'Nâng cao' };
    const flex = { 'low':'Cứng', 'medium':'Trung bình', 'high':'Dẻo dai' };
    t += '💪 THỂ LỰC:\n';
    t += '• Kinh nghiệm: ' + (levels[a.experience] || '') + '\n';
    t += '• Độ dẻo: ' + (flex[a.flexibility] || '') + '\n';
    t += '• Vận động: ' + getLabel('activity', a.activity) + '\n';
    if (a.pain && a.pain.length) {
      t += '• Vùng đau: ' + a.pain.map(p => getLabel('pain', p)).join(', ') + '\n';
    }
    t += '\n';
    // Goals
    if (a.goals && a.goals.length) {
      t += '🎯 MỤC TIÊU: ' + a.goals.map(g => getLabel('goals', g)).join(', ') + '\n\n';
    }
    // Lifestyle
    t += '🌙 LỐI SỐNG:\n';
    t += '• Stress: ' + getLabel('stress', a.stress) + '\n';
    t += '• Giấc ngủ: ' + getLabel('sleep', a.sleep) + '\n';
    if (a.notes && a.notes.trim()) {
      t += '\n📝 GHI CHÚ: ' + a.notes.trim() + '\n';
    }
    return t;
  }

  // Send buttons — share the result link
  document.addEventListener('click', function(e) {
    if (!lastAnswers || !lastShareUrl) return;
    const btn = e.target.closest('[data-send]');
    if (!btn) return;
    const method = btn.dataset.send;
    const msg = '📋 Hồ sơ sức khỏe Yoga của mình:\n' + lastShareUrl;
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
  const retryBtn = document.getElementById('haRetry');
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
      generateProfile(decoded);
    } catch(e) {
      showSection(0);
    }
  } else {
    showSection(0);
  }
});
