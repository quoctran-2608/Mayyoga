// ===== Mây Yoga — Shared Site Chrome =====
// Canonical footer, floating contact, header and article-share bootstrap. The homepage/index design is the source of truth.
(function syncSiteChrome() {
  'use strict';

  function getSiteRoot() {
    var script = document.currentScript;
    if (!script || !script.src) {
      var scripts = document.querySelectorAll('script[src]');
      for (var i = scripts.length - 1; i >= 0; i--) {
        if (/\/js\/site-chrome\.js(?:\?|$)/.test(scripts[i].src)) {
          script = scripts[i];
          break;
        }
      }
    }
    return script && script.src ? new URL('../', script.src) : new URL('./', window.location.href);
  }

  var siteRoot = getSiteRoot();
  function siteUrl(path) { return new URL(path, siteRoot).href; }

  function ensureStandardStyles() {
    if (document.getElementById('may-yoga-site-chrome-standard')) return;
    var style = document.createElement('style');
    style.id = 'may-yoga-site-chrome-standard';
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

  function normalizeFooter() {
    var footer = document.querySelector('footer.footer');
    if (!footer) return;
    footer.setAttribute('data-site-footer-standard', 'true');

    var logoLink = footer.querySelector('.footer-logo-link');
    if (logoLink) logoLink.href = siteUrl('index.html');
    var logo = footer.querySelector('.footer-logo-img');
    if (logo) logo.src = siteUrl('assets/images/logo.webp');
    var tagline = footer.querySelector('.footer-tagline');
    if (tagline) tagline.innerHTML = 'Nền tảng kiến thức Hatha Yoga<br>dành cho mọi người.';

    var columns = footer.querySelectorAll('.footer-col');
    if (columns[0]) {
      var policyLinks = columns[0].querySelectorAll('a');
      var policies = ['chinh-sach-bao-mat.html','dieu-khoan-su-dung.html','chinh-sach-thanh-toan.html','chinh-sach-doi-tra.html'];
      policyLinks.forEach(function(link, index) { if (policies[index]) link.href = siteUrl(policies[index]); });
    }
    if (columns[1]) {
      var contactLinks = columns[1].querySelectorAll('a');
      if (contactLinks[0]) contactLinks[0].href = 'mailto:phanthumay.yoga500@gmail.com';
      if (contactLinks[1]) contactLinks[1].href = 'https://zalo.me/0326808864';
    }
    var legal = footer.querySelector('.footer-legal');
    if (legal) legal.innerHTML = '<strong>Chủ quản:</strong> Phan Thu Mây&nbsp;|&nbsp;<strong>MST:</strong> 066195013103';
    var copyright = footer.querySelector('.footer-bottom p');
    if (copyright) copyright.textContent = '© 2026 MâyYoga.health — All rights reserved. 🍀';
  }

  function floatingContactMarkup() {
    return [
      '<a href="https://zalo.me/0326808864" target="_blank" rel="noopener" class="fc-zalo" data-tooltip="Chat Zalo" aria-label="Liên hệ Zalo">',
      '<svg width="28" height="28" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">',
      '<path fill-rule="evenodd" clip-rule="evenodd" d="M7.779 43.5892C10.1019 43.846 13.0061 43.1836 15.0682 42.1825C24.0225 47.1318 38.0197 46.8954 46.4923 41.4732C46.8209 40.9803 47.1279 40.4677 47.4128 39.9363C49.1062 36.7779 50.0004 33.22 50.0004 27.1316V22.7175C50.0004 16.629 49.1062 13.0711 47.4128 9.91273C45.7385 6.75436 43.2461 4.28093 40.0877 2.58758C36.9293 0.894239 33.3714 0 27.283 0H22.8499C17.6644 0 14.2982 0.652754 11.4699 1.89893C11.3153 2.03737 11.1636 2.17818 11.0151 2.32135C2.71734 10.3203 2.08658 27.6593 9.12279 37.0782C9.13064 37.0921 9.13933 37.1061 9.14889 37.1203C10.2334 38.7185 9.18694 41.5154 7.55068 43.1516C7.28431 43.399 7.37944 43.5512 7.779 43.5892Z" fill="white"/>',
      '<path d="M20.5632 17H10.8382V19.0853H17.5869L10.9329 27.3317C10.7244 27.635 10.5728 27.9194 10.5728 28.5639V29.0947H19.748C20.203 29.0947 20.5822 28.7156 20.5822 28.2606V27.1421H13.4922L19.748 19.2938C19.8428 19.1807 20.0134 18.9716 20.0893 18.8768L20.1272 18.8199C20.4874 18.2891 20.5632 17.8341 20.5632 17.2844V17Z" fill="#0068FF"/>',
      '<path d="M32.9416 29.0947H34.3255V17H32.2402V28.3933C32.2402 28.7725 32.5435 29.0947 32.9416 29.0947Z" fill="#0068FF"/>',
      '<path d="M25.814 19.6924C23.1979 19.6924 21.0747 21.8156 21.0747 24.4317C21.0747 27.0478 23.1979 29.171 25.814 29.171C28.4301 29.171 30.5533 27.0478 30.5533 24.4317C30.5723 21.8156 28.4491 19.6924 25.814 19.6924ZM25.814 27.2184C24.2785 27.2184 23.0273 25.9672 23.0273 24.4317C23.0273 22.8962 24.2785 21.645 25.814 21.645C27.3495 21.645 28.6007 22.8962 28.6007 24.4317C28.6007 25.9672 27.3685 27.2184 25.814 27.2184Z" fill="#0068FF"/>',
      '<path d="M40.4867 19.6162C37.8516 19.6162 35.7095 21.7584 35.7095 24.3934C35.7095 27.0285 37.8516 29.1707 40.4867 29.1707C43.1217 29.1707 45.2639 27.0285 45.2639 24.3934C45.2639 21.7584 43.1217 19.6162 40.4867 19.6162ZM40.4867 27.2181C38.9322 27.2181 37.681 25.9669 37.681 24.4124C37.681 22.8579 38.9322 21.6067 40.4867 21.6067C42.0412 21.6067 43.2924 22.8579 43.2924 24.4124C43.2924 25.9669 42.0412 27.2181 40.4867 27.2181Z" fill="#0068FF"/>',
      '<path d="M29.4562 29.0944H30.5747V19.957H28.6221V28.2793C28.6221 28.7153 29.0012 29.0944 29.4562 29.0944Z" fill="#0068FF"/>',
      '</svg></a>',
      '<a href="https://wa.me/84326808864" target="_blank" rel="noopener" class="fc-whatsapp" data-tooltip="Chat WhatsApp" aria-label="Liên hệ WhatsApp">',
      '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></a>'
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

  function loadCanonicalHeader() {
    if (document.querySelector('script[data-site-header-standard]')) return;
    var script = document.createElement('script');
    script.src = siteUrl('js/site-header-standard.js?v=20260721d');
    script.defer = true;
    script.setAttribute('data-site-header-standard', 'true');
    document.head.appendChild(script);
  }

  function loadCanonicalArticleShare() {
    if (document.querySelector('script[data-article-share-standard]')) return;
    var script = document.createElement('script');
    script.src = siteUrl('js/article-share-standard.js?v=20260721b');
    script.defer = true;
    script.setAttribute('data-article-share-standard', 'true');
    document.head.appendChild(script);
  }

  function applyStandardChrome() {
    ensureStandardStyles();
    normalizeFooter();
    normalizeFloatingContact();
    loadCanonicalHeader();
    loadCanonicalArticleShare();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyStandardChrome, { once: true });
  } else {
    applyStandardChrome();
  }
})();