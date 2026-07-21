// ===== Mây Yoga — Canonical Article Share Component =====
// Source of truth: the approved share controls first refined on ve-may-yoga.html.
(function syncCanonicalArticleShare() {
  'use strict';

  function copyFallback(text) {
    var textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    textarea.style.pointerEvents = 'none';
    document.body.appendChild(textarea);
    textarea.select();
    var copied = false;
    try {
      copied = document.execCommand('copy');
    } catch (error) {
      copied = false;
    }
    textarea.remove();
    return copied;
  }

  function injectStyles() {
    if (document.getElementById('may-yoga-article-share-standard')) return;
    var style = document.createElement('style');
    style.id = 'may-yoga-article-share-standard';
    style.textContent = [
      '.article-share.article-share-standard{display:flex!important;align-items:center!important;gap:10px!important;flex-wrap:wrap!important;margin-top:30px!important;padding:13px 15px!important;border:1px solid rgba(61,90,58,.10)!important;border-radius:16px!important;background:linear-gradient(135deg,rgba(247,250,245,.96),rgba(240,245,238,.9))!important}',
      '.article-share-standard .article-share-label{margin-right:3px;color:#3d5a3a;font-family:"DM Sans",sans-serif;font-size:.9rem;font-weight:650;line-height:1.2}',
      '.article-share-standard .article-share-btn{position:relative;display:inline-flex!important;align-items:center!important;justify-content:center!important;width:44px!important;height:44px!important;min-width:44px!important;min-height:44px!important;padding:0!important;border:1px solid rgba(255,255,255,.30)!important;border-radius:50%!important;color:#fff!important;text-decoration:none!important;cursor:pointer!important;box-shadow:0 3px 10px rgba(31,61,42,.12)!important;transition:box-shadow .18s ease,filter .18s ease,border-color .18s ease!important}',
      '.article-share-standard .article-share-btn:hover{filter:brightness(.96);box-shadow:0 6px 16px rgba(31,61,42,.18)!important}',
      '.article-share-standard .article-share-btn:focus-visible{outline:3px solid rgba(47,111,66,.28)!important;outline-offset:3px!important}',
      '.article-share-standard .share-facebook{background:#1877f2!important}',
      '.article-share-standard .share-zalo{background:#0068ff!important}',
      '.article-share-standard .share-x{background:#111!important}',
      '.article-share-standard .share-native{background:#397334!important}',
      '.article-share-standard .share-copy{background:#5a7a56!important}',
      '.article-share-standard .article-share-btn svg{display:block;pointer-events:none}',
      '.article-share-standard .article-share-status{min-width:0;color:#557057;font-size:.78rem;font-weight:600;line-height:1.3}',
      '@media(max-width:480px){.article-share.article-share-standard{gap:9px!important;padding:13px!important}.article-share-standard .article-share-label{flex:0 0 100%;margin:0 0 2px}.article-share-standard .article-share-status{flex:0 0 100%;margin-top:1px}}',
      '@media(prefers-reduced-motion:reduce){.article-share-standard .article-share-btn{transition:none!important}}'
    ].join('\n');
    document.head.appendChild(style);
  }

  function getPageData() {
    var canonical = document.querySelector('link[rel="canonical"]');
    var ogTitle = document.querySelector('meta[property="og:title"]');
    var description = document.querySelector('meta[name="description"]');
    return {
      url: canonical && canonical.href ? canonical.href : window.location.href.split('#')[0],
      title: ogTitle && ogTitle.content ? ogTitle.content : document.title,
      description: description && description.content ? description.content : ''
    };
  }

  function markup(pageUrl, pageTitle) {
    var encodedUrl = encodeURIComponent(pageUrl);
    var encodedTitle = encodeURIComponent(pageTitle);
    return [
      '<span class="article-share-label">Chia sẻ:</span>',
      '<a class="article-share-btn share-facebook" href="https://www.facebook.com/sharer/sharer.php?u=' + encodedUrl + '" target="_blank" rel="noopener noreferrer" aria-label="Chia sẻ lên Facebook" title="Facebook">',
      '<svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.025 4.388 11.02 10.125 11.927v-8.43H7.078v-3.497h3.047V9.409c0-3.03 1.792-4.704 4.533-4.704 1.312 0 2.686.236 2.686.236v2.971H15.83c-1.491 0-1.956.931-1.956 1.885v2.276h3.328l-.532 3.497h-2.796V24C19.612 23.093 24 18.098 24 12.073z"/></svg>',
      '</a>',
      '<a class="article-share-btn share-zalo" href="https://zalo.me/share?u=' + encodedUrl + '" target="_blank" rel="noopener noreferrer" aria-label="Chia sẻ qua Zalo" title="Zalo">',
      '<svg width="22" height="22" viewBox="0 0 50 50" fill="none" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.779 43.589c2.323.257 5.227-.406 7.289-1.407 8.954 4.949 22.952 4.713 31.424-.709C48.833 37.962 50 33.933 50 27.132v-4.415c0-6.088-.894-9.646-2.587-12.804-1.675-3.159-4.167-5.632-7.325-7.325C36.929.894 33.371 0 27.283 0H22.85C17.664 0 14.298.653 11.47 1.899 2.717 9.898 2.087 27.659 9.123 37.078c1.143 1.669.081 4.464-1.572 6.074-.266.247-.171.399.228.437z" fill="white"/><path d="M20.563 17h-9.725v2.085h6.749l-6.654 8.247c-.209.303-.36.587-.36 1.232v.531h9.175c.455 0 .834-.379.834-.834v-1.119h-7.09l6.256-7.848c.095-.113.265-.322.341-.417.36-.531.474-.967.474-1.877zM32.942 29.095h1.384V17H32.24v11.393c0 .379.304.702.702.702z" fill="#0068ff"/><path d="M25.814 19.692a4.74 4.74 0 1 0 0 9.479 4.74 4.74 0 0 0 0-9.479zm0 7.526a2.787 2.787 0 1 1 0-5.573 2.787 2.787 0 0 1 0 5.573zM40.487 19.616a4.777 4.777 0 1 0 0 9.555 4.777 4.777 0 0 0 0-9.555zm0 7.602a2.806 2.806 0 1 1 0-5.611 2.806 2.806 0 0 1 0 5.611z" fill="#0068ff"/></svg>',
      '</a>',
      '<a class="article-share-btn share-x" href="https://twitter.com/intent/tweet?url=' + encodedUrl + '&text=' + encodedTitle + '" target="_blank" rel="noopener noreferrer" aria-label="Chia sẻ lên X" title="X">',
      '<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/></svg>',
      '</a>',
      '<button type="button" class="article-share-btn share-native" data-share-native hidden aria-label="Mở menu chia sẻ" title="Chia sẻ khác">',
      '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 10.6 6.8-4.2M8.6 13.4l6.8 4.2"/></svg>',
      '</button>',
      '<button type="button" class="article-share-btn share-copy" data-share-copy aria-label="Sao chép liên kết" title="Sao chép liên kết">',
      '<span data-copy-icon><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></span>',
      '</button>',
      '<span class="article-share-status" role="status" aria-live="polite"></span>'
    ].join('');
  }

  function bindShare(share, pageData) {
    if (!share || share.dataset.shareStandard === 'true') return;

    share.classList.remove('about-share-v2', 'share-buttons', 'article-share-buttons');
    share.classList.add('article-share', 'article-share-standard');
    share.dataset.shareStandard = 'true';
    share.dataset.shareV2 = 'true';
    share.setAttribute('aria-label', 'Chia sẻ bài viết');
    share.innerHTML = markup(pageData.url, pageData.title);

    var status = share.querySelector('.article-share-status');
    var copyButton = share.querySelector('[data-share-copy]');
    var nativeButton = share.querySelector('[data-share-native]');
    var originalCopyIcon = copyButton.querySelector('[data-copy-icon]').innerHTML;
    var statusTimer = 0;

    function setStatus(message) {
      window.clearTimeout(statusTimer);
      status.textContent = message;
      if (message) {
        statusTimer = window.setTimeout(function() { status.textContent = ''; }, 2600);
      }
    }

    copyButton.addEventListener('click', async function() {
      var copied = false;
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(pageData.url);
          copied = true;
        } else {
          copied = copyFallback(pageData.url);
        }
      } catch (error) {
        copied = copyFallback(pageData.url);
      }

      if (!copied) {
        setStatus('Không thể sao chép. Hãy sao chép URL trên thanh địa chỉ.');
        return;
      }

      copyButton.querySelector('[data-copy-icon]').innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m20 6-11 11-5-5"/></svg>';
      copyButton.setAttribute('aria-label', 'Đã sao chép liên kết');
      setStatus('Đã sao chép liên kết');
      window.setTimeout(function() {
        copyButton.querySelector('[data-copy-icon]').innerHTML = originalCopyIcon;
        copyButton.setAttribute('aria-label', 'Sao chép liên kết');
      }, 1800);
    });

    if (typeof navigator.share === 'function') {
      nativeButton.hidden = false;
      nativeButton.addEventListener('click', async function() {
        try {
          await navigator.share({
            title: pageData.title,
            text: pageData.description || pageData.title,
            url: pageData.url
          });
        } catch (error) {
          if (!error || error.name !== 'AbortError') setStatus('Không mở được menu chia sẻ.');
        }
      });
    }
  }

  function isArticlePage() {
    var ogType = document.querySelector('meta[property="og:type"]');
    if (ogType && String(ogType.content).toLowerCase() === 'article') return true;

    var jsonLd = document.querySelectorAll('script[type="application/ld+json"]');
    for (var i = 0; i < jsonLd.length; i++) {
      if (/"@type"\s*:\s*"Article"/i.test(jsonLd[i].textContent || '')) return true;
    }
    return false;
  }

  function findOrCreateShareShells() {
    var shares = Array.prototype.slice.call(document.querySelectorAll(
      '.article-share, .article-body .share-buttons, .article-body .article-share-buttons'
    ));
    if (shares.length) return shares;
    if (!isArticlePage()) return shares;

    var articleContainer = document.querySelector('main.article-body > .container, .article-body > .container');
    if (!articleContainer) return shares;

    var share = document.createElement('div');
    share.className = 'article-share';
    share.setAttribute('data-share-generated', 'true');
    articleContainer.appendChild(share);
    shares.push(share);
    return shares;
  }

  function init() {
    var shares = findOrCreateShareShells();
    if (!shares.length) return;
    injectStyles();
    var pageData = getPageData();
    shares.forEach(function(share) { bindShare(share, pageData); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();