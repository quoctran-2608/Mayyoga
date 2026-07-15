/**
 * Personality Quiz Engine — MayYoga
 * Self-assessment quizzes (Dosha, Chakra) that tally scores per type.
 */
document.addEventListener('DOMContentLoaded', function () {
  const questions = document.querySelectorAll('.quiz-question');
  const submitBtn = document.getElementById('quizSubmit');
  const resultBox = document.getElementById('quizResult');
  const retryBtn = document.getElementById('quizRetry');
  const progressFill = document.querySelector('.progress-fill');
  const progressText = document.querySelector('.progress-text');
  const total = questions.length;

  if (!submitBtn || !questions.length) return;

  // Track selections
  questions.forEach(q => {
    const options = q.querySelectorAll('.quiz-option');
    options.forEach(opt => {
      opt.addEventListener('click', function () {
        options.forEach(o => o.classList.remove('selected'));
        this.classList.add('selected');
        updateProgress();
      });
    });
  });

  function updateProgress() {
    const answered = document.querySelectorAll('.quiz-option.selected').length;
    const pct = (answered / total) * 100;
    progressFill.style.width = pct + '%';
    progressText.textContent = answered + '/' + total;
  }

  submitBtn.addEventListener('click', function () {
    const answered = document.querySelectorAll('.quiz-option.selected').length;
    if (answered < total) {
      alert('Bạn chưa trả lời hết ' + total + ' câu hỏi! Còn ' + (total - answered) + ' câu.');
      return;
    }

    // Tally scores per type
    const scores = {};
    questions.forEach(q => {
      const selected = q.querySelector('.quiz-option.selected');
      if (selected) {
        const type = selected.getAttribute('data-type');
        scores[type] = (scores[type] || 0) + 1;
      }
    });

    // Find the dominant type
    let maxType = '';
    let maxScore = 0;
    for (const [type, score] of Object.entries(scores)) {
      if (score > maxScore) {
        maxScore = score;
        maxType = type;
      }
    }

    // Build score breakdown
    const scoreBreakdown = document.getElementById('scoreBreakdown');
    const resultTitle = document.getElementById('resultTitle');
    const resultDesc = document.getElementById('resultDesc');
    const resultAdvice = document.getElementById('resultAdvice');

    // Get result data from hidden elements
    const resultData = document.getElementById('result-' + maxType);
    if (resultData) {
      resultTitle.innerHTML = resultData.getAttribute('data-title');
      resultDesc.innerHTML = resultData.getAttribute('data-desc');
      resultAdvice.innerHTML = resultData.getAttribute('data-advice');
    }

    // Build breakdown bars
    if (scoreBreakdown) {
      scoreBreakdown.innerHTML = '';
      const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);
      sortedScores.forEach(([type, score]) => {
        const rd = document.getElementById('result-' + type);
        const label = rd ? rd.getAttribute('data-label') : type;
        const color = rd ? rd.getAttribute('data-color') : '#6B8E6B';
        const pct = Math.round((score / total) * 100);
        scoreBreakdown.innerHTML += `
          <div class="score-bar-item">
            <div class="score-bar-label">
              <span>${label}</span>
              <span>${pct}%</span>
            </div>
            <div class="score-bar-track">
              <div class="score-bar-fill" style="width: ${pct}%; background: ${color};"></div>
            </div>
          </div>
        `;
      });
    }

    // Show result
    submitBtn.style.display = 'none';
    resultBox.style.display = 'block';
    resultBox.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Disable all options
    document.querySelectorAll('.quiz-option').forEach(o => {
      o.style.pointerEvents = 'none';
      o.style.opacity = '0.7';
    });
  });

  // Retry
  if (retryBtn) {
    retryBtn.addEventListener('click', function () {
      document.querySelectorAll('.quiz-option').forEach(o => {
        o.classList.remove('selected');
        o.style.pointerEvents = '';
        o.style.opacity = '';
      });
      resultBox.style.display = 'none';
      submitBtn.style.display = '';
      updateProgress();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
