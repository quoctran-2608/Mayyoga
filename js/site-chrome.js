// ===== MÂY YOGA — SHARED SITE CHROME V2 =====
// Owns shared Footer, Floating Contact and Article Share only.
(function syncSiteChrome() {
  'use strict';

  if (window.__mayYogaSiteChromeV2Loaded) return;
  window.__mayYogaSiteChromeV2Loaded = true;

  function resolveCurrentScript() {
    if (document.currentScript && document.currentScript.src) return document.currentScript;
    var scripts = document.querySelectorAll('script[src]');
    for (var index = scripts.length - 1; index >= 0; index -= 1) {
      if (/\/js\/site-chrome\.js(?:\?|$)/.test(scripts[index].src)) return scripts[index];
    }
    return null;
  }

  var currentScript = resolveCurrentScript();
  var siteRoot = currentScript && currentScript.src
    ? new URL('../', currentScript.src)
    : new URL(window.MAY_YOGA_SITE_ROOT || '/', window.location.href);

  function siteUrl(path) {
    return new URL(path, siteRoot).href;
  }

  function ensureStylesheet(selector, path, marker) {
    if (document.querySelector(selector)) return;
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = siteUrl(path);
    link.setAttribute(marker, 'true');
    document.head.appendChild(link);
  }

  function ensureChromeStyles() {
    ensureStylesheet('link[data-breadcrumb-canonical]', 'css/breadcrumb-canonical-v1.css?v=20260726b', 'data-breadcrumb-canonical');
    if (document.getElementById('may-yoga-site-chrome-v2')) return;

    var style = document.createElement('style');
    style.id = 'may-yoga-site-chrome-v2';
    style.textContent = [
      'html body .footer{padding:0!important;background:linear-gradient(180deg,#2d3b2d 0%,#243024 100%)!important;color:rgba(255,255,255,.92)!important}',
      'html body .footer .container{max-width:var(--container-width,1200px)!important}',
      'html body .footer-grid-new{display:grid!important;grid-template-columns:1.3fr 1fr 1.2fr!important;gap:48px!important;padding:56px 0 36px!important;align-items:start!important}',
      'html body .footer-brand-col{max-width:280px!important;text-align:center!important}',
      'html body .footer-logo-link{display:inline-block!important;margin-bottom:16px!important}',
      'html body .footer-logo-img{height:80px!important;width:auto!important;max-width:none!important;border-radius:12px!important;padding:4px!important;background:rgba(255,255,255,.12)!important;backdrop-filter:blur(6px);object-fit:contain!important}',
      'html body .footer-tagline{color:rgba(255,255,255,.75)!important;font-size:.88rem!important;line-height:1.75!important;margin-bottom:20px!important}',
      'html body .footer-social-icons{display:flex!important;gap:10px!important;justify-content:center!important}',
      'html body .social-icon{display:inline-flex!important;width:38px!important;height:38px!important;background:rgba(255,255,255,.1)!important;border-radius:50%!important;align-items:center!important;justify-content:center!important}',
      'html body .footer-col h4{color:#fff!important;margin-bottom:20px!important;font-size:1.05rem!important}',
      'html body .footer-col ul{list-style:none!important;padding:0!important;margin:0!important}',
      'html body .footer-col ul li{margin-bottom:12px!important;font-size:.88rem!important;color:rgba(255,255,255,.65)!important}',
      'html body .footer-col ul li a{color:rgba(255,255,255,.65)!important;text-decoration:none!important}',
      'html body .footer-legal{color:rgba(255,255,255,.45)!important;font-size:.78rem!important;margin-top:16px!important;line-height:1.5!important}',
      'html body .footer-bottom{border-top:1px solid rgba(255,255,255,.12)!important;padding:20px 0 18px!important;text-align:center!important}',
      'html body .footer-bottom p{color:rgba(255,255,255,.45)!important;font-size:.8rem!important;margin:0!important}',
      'html body .floating-contact{position:fixed!important;bottom:28px!important;right:24px!important;display:flex!important;flex-direction:column!important;gap:14px!important;z-index:9999!important}',
      'html body .floating-contact a{display:flex!important;align-items:center!important;justify-content:center!important;width:56px!important;height:56px!important;border-radius:50%!important;box-shadow:0 4px 16px rgba(0,0,0,.18)!important;position:relative!important;text-decoration:none!important}',
      'html body .floating-contact .fc-zalo{background:#0068ff!important}',
      'html body .floating-contact .fc-zalo svg{width:28px!important;height:28px!important}',
      'html body .floating-contact .fc-whatsapp{background:#25d366!important}',
      'html body .floating-contact .fc-whatsapp svg{width:30px!important;height:30px!important;fill:#fff!important}',
      '@media(max-width:1024px){html body .footer-grid-new{grid-template-columns:repeat(2,1fr)!important}}',
      '@media(max-width:768px){html body .footer .container{padding:0 16px!important}html body .footer-grid-new{grid-template-columns:1fr!important;gap:32px!important;padding:40px 0 28px!important}html body .footer-brand-col{margin:0 auto!important}html body .footer-logo-img{height:54px!important}html body .floating-contact{bottom:20px!important;right:16px!important;gap:12px!important}html body .floating-contact a{width:44px!important;height:44px!important}html body .floating-contact .fc-zalo svg{width:22px!important;height:22px!important}html body .floating-contact .fc-whatsapp svg{width:24px!important;height:24px!important}html body .floating-contact a::before{display:none!important}}',
      '@media(max-width:420px){html body .footer-logo-img{height:48px!important}}'
    ].join('\n');
    document.head.appendChild(style);
  }

  function footerMarkup() {
    return [
      '<div class="container">',
      '  <div class="footer-grid-new">',
      '    <div class="footer-brand-col">',
      '      <a href="' + siteUrl('index.html') + '" class="footer-logo-link"><img src="' + siteUrl('assets/images/logo.webp') + '" alt="Mây Yoga" class="footer-logo-img"></a>',
      '      <p class="footer-tagline">Nền tảng kiến thức Hatha Yoga<br>dành cho mọi người.</p>',
      '      <div class="footer-social-icons">',
      '        <a href="https://www.facebook.com/profile.php?id=61573065832463" target="_blank" rel="noopener" aria-label="Facebook" class="social-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="white" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.063 24 12.073z"/></svg></a>',
      '        <a href="https://www.instagram.com/thumay2808" target="_blank" rel="noopener" aria-label="Instagram" class="social-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="white" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919C8.416 2.175 8.796 2.163 12 2.163zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947C21.732 2.699 19.311.273 14.949.073 13.668.014 13.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg></a>',
      '        <a href="https://www.tiktok.com/@my.v.yoga" target="_blank" rel="noopener" aria-label="TikTok" class="social-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="white" aria-hidden="true"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg></a>',
      '      </div>',
      '    </div>',
      '    <div class="footer-col"><h4>Chính sách</h4><ul>',
      '      <li><a href="' + siteUrl('chinh-sach-bao-mat.html') + '">Chính sách bảo mật</a></li>',
      '      <li><a href="' + siteUrl('dieu-khoan-su-dung.html') + '">Điều khoản sử dụng</a></li>',
      '      <li><a href="' + siteUrl('chinh-sach-thanh-toan.html') + '">Chính sách thanh toán</a></li>',
      '      <li><a href="' + siteUrl('chinh-sach-doi-tra.html') + '">Chính sách hoàn tiền</a></li>',
      '    </ul></div>',
      '    <div class="footer-col"><h4>Liên hệ</h4><ul>',
      '      <li><a href="mailto:phanthumay.yoga500@gmail.com">phanthumay.yoga500@gmail.com</a></li>',
      '      <li><a href="https://zalo.me/0326808864" target="_blank" rel="noopener">Hotline: 0326 808 864</a></li>',
      '      <li>Đà Lạt, Lâm Đồng, Việt Nam</li>',
      '    </ul><p class="footer-legal"><strong>Chủ quản:</strong> Phan Thu Mây&nbsp;|&nbsp;<strong>MST:</strong> 066195013103</p></div>',
      '  </div>',
      '  <div class="footer-bottom"><p>© 2026 MâyYoga.health — All rights reserved.</p></div>',
      '</div>'
    ].join('');
  }

  function normalizeFooter() {
    var footer = document.querySelector('footer.footer');
    if (!footer) return;
    footer.innerHTML = footerMarkup();
    footer.setAttribute('data-site-footer-standard', 'true');
  }

  function floatingContactMarkup() {
    return [
      '<a href="https://zalo.me/0326808864" target="_blank" rel="noopener" class="fc-zalo" data-tooltip="Chat Zalo" aria-label="Liên hệ Zalo">',
      '<svg width="28" height="28" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">',
      '<path fill-rule="evenodd" clip-rule="evenodd" d="M7.779 43.589C10.102 43.846 13.006 43.184 15.068 42.183C24.023 47.132 38.02 46.895 46.492 41.473C48.882 37.886 50 33.721 50 27.132V22.718C50 16.629 49.106 13.071 47.413 9.913C45.739 6.754 43.246 4.281 40.088 2.588C36.929.894 33.371 0 27.283 0H22.85C17.664 0 14.298.653 11.47 1.899C2.718 10.32 2.087 27.659 9.123 37.078C10.233 38.718 9.187 41.515 7.551 43.152C7.284 43.399 7.379 43.551 7.779 43.589Z" fill="white"/>',
      '<path d="M20.563 17h-9.725v2.085h6.749l-6.654 8.247c-.208.303-.36.587-.36 1.232v.531h9.175c.455 0 .834-.379.834-.834v-1.119h-7.09l6.256-7.848c.095-.113.266-.322.342-.417l.037-.057c.36-.531.436-.986.436-1.535V17Z" fill="#0068FF"/>',
      '<path d="M32.942 29.095h1.384V17H32.24v11.393c0 .38.304.702.702.702ZM25.814 19.692a4.74 4.74 0 1 0 0 9.479 4.74 4.74 0 0 0 0-9.479Zm0 7.526a2.787 2.787 0 1 1 0-5.573 2.787 2.787 0 0 1 0 5.573ZM40.487 19.616a4.777 4.777 0 1 0 0 9.555 4.777 4.777 0 0 0 0-9.555Zm0 7.602a2.806 2.806 0 1 1 0-5.611 2.806 2.806 0 0 1 0 5.611Z" fill="#0068FF"/>',
      '</svg></a>',
      '<a href="https://wa.me/84326808864" target="_blank" rel="noopener" class="fc-whatsapp" data-tooltip="Chat WhatsApp" aria-label="Liên hệ WhatsApp">',
      '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg></a>'
    ].join('');
  }

  function normalizeFloatingContact() {
    document.querySelectorAll('.floating-contact').forEach(function(node) { node.remove(); });
    var floating = document.createElement('div');
    floating.className = 'floating-contact';
    floating.id = 'floatingContact';
    floating.setAttribute('data-site-floating-standard', 'true');
    floating.innerHTML = floatingContactMarkup();
    document.body.appendChild(floating);
  }

  function ensureCanonicalNavigation() {
    if (document.body && document.body.getAttribute('data-site-navigation') === 'off') return;
    if (document.querySelector('script[data-site-navigation-canonical-v3]')) return;
    var script = document.createElement('script');
    script.src = siteUrl('js/site-navigation-canonical-v3.js?v=20260728b');
    script.async = false;
    script.setAttribute('data-site-navigation-canonical', 'true');
    script.setAttribute('data-site-navigation-canonical-v3', 'true');
    document.head.appendChild(script);
  }

  function ensureArticleShare() {
    if (document.querySelector('script[data-article-share-standard]')) return;
    var script = document.createElement('script');
    script.src = siteUrl('js/article-share-standard.js?v=20260722c');
    script.async = false;
    script.setAttribute('data-article-share-standard', 'true');
    document.head.appendChild(script);
  }

  function apply() {
    if (!document.body || document.body.getAttribute('data-site-chrome') === 'off') return;
    ensureChromeStyles();
    normalizeFooter();
    normalizeFloatingContact();
    ensureArticleShare();
    window.MAY_YOGA_SITE_CHROME_VERSION = '2';
  }

  ensureCanonicalNavigation();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply, { once: true });
  else apply();
})();
