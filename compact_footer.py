import os
import re

root_dir = '/Users/phanthumay/Desktop/mayyoga.health/web'

footer_regex = re.compile(r'(<footer class="footer"[^>]*>)(.*?)(</footer>)', re.DOTALL)

count = 0
for dp, dn, fns in os.walk(root_dir):
    for fn in fns:
        if fn.endswith('.html'):
            path = os.path.join(dp, fn)
            with open(path, "r", encoding="utf-8") as f:
                html = f.read()

            # Determine prefix
            prefix = "" if dp == root_dir else "../"
            
            compact_inner = f"""
    <div class="container" style="text-align:center; padding: 40px 0 20px;">
      <a href="{prefix}index.html" class="nav-logo" style="display:inline-flex; justify-content:center; margin-bottom:12px;">
        <img src="{prefix}assets/images/logo.webp" alt="Mây Yoga" class="logo-img" style="height:48px; border-radius:10px; padding:4px; background:rgba(255,255,255,0.12); backdrop-filter:blur(6px);">
      </a>
      
      <p style="color:rgba(255,255,255,0.9); margin:0 auto 16px; font-size:0.9rem;">
        Nền tảng kiến thức Hatha Yoga cho mọi người.<br>
      </p>

      <div style="display:flex; gap:12px; justify-content:center; align-items:center; margin-bottom:20px;">
        <a href="mailto:phanthumay.yoga500@gmail.com" aria-label="Email" style="display:inline-flex; width:34px; height:34px; background:rgba(255,255,255,0.12); border-radius:50%; align-items:center; justify-content:center; transition:all 0.3s; text-decoration:none;" onmouseover="this.style.background='rgba(255,255,255,0.25)'" onmouseout="this.style.background='rgba(255,255,255,0.12)'"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 7L2 7"/></svg></a>
        <a href="https://zalo.me/0326808864" target="_blank" aria-label="Zalo" style="display:inline-flex; width:34px; height:34px; background:rgba(255,255,255,0.12); border-radius:50%; align-items:center; justify-content:center; transition:all 0.3s; text-decoration:none;" onmouseover="this.style.background='rgba(255,255,255,0.25)'" onmouseout="this.style.background='rgba(255,255,255,0.12)'"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg></a>
        <a href="https://www.facebook.com/profile.php?id=61573065832463" target="_blank" aria-label="Facebook" style="display:inline-flex; width:34px; height:34px; background:rgba(255,255,255,0.12); border-radius:50%; align-items:center; justify-content:center; transition:all 0.3s;" onmouseover="this.style.background='rgba(255,255,255,0.25)'" onmouseout="this.style.background='rgba(255,255,255,0.12)'"><svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>
        <a href="https://www.instagram.com/thumay2808" target="_blank" aria-label="Instagram" style="display:inline-flex; width:34px; height:34px; background:rgba(255,255,255,0.12); border-radius:50%; align-items:center; justify-content:center; transition:all 0.3s;" onmouseover="this.style.background='rgba(255,255,255,0.25)'" onmouseout="this.style.background='rgba(255,255,255,0.12)'"><svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></a>
        <a href="https://www.tiktok.com/@my.v.yoga" target="_blank" aria-label="TikTok" style="display:inline-flex; width:34px; height:34px; background:rgba(255,255,255,0.12); border-radius:50%; align-items:center; justify-content:center; transition:all 0.3s;" onmouseover="this.style.background='rgba(255,255,255,0.25)'" onmouseout="this.style.background='rgba(255,255,255,0.12)'"><svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg></a>
      </div>
      
      <p style="color:rgba(255,255,255,0.7); font-size: 0.82rem; line-height: 1.6; margin: 0 auto 16px; max-width: 600px;">
        <strong>Chủ quản:</strong> Phan Thu Mây &nbsp;|&nbsp; <strong>MST:</strong> 066195013103<br>
        <strong>Địa chỉ:</strong> Thị trấn Ea Knốp, Huyện Ea Kar, Tỉnh Đắk Lắk<br>
        <strong>SĐT:</strong> 0326 808 864 &nbsp;|&nbsp; <strong>Email:</strong> phanthumay.yoga500@gmail.com
      </p>

      <div style="display:flex; gap:16px; justify-content:center; flex-wrap:wrap; margin-bottom:20px; font-size:0.8rem;">
        <a href="{prefix}chinh-sach-bao-mat.html" style="color:rgba(255,255,255,0.7); text-decoration:none;">Bảo mật thông tin</a>
        <a href="{prefix}dieu-khoan-su-dung.html" style="color:rgba(255,255,255,0.7); text-decoration:none;">Điều khoản sử dụng</a>
        <a href="{prefix}chinh-sach-thanh-toan.html" style="color:rgba(255,255,255,0.7); text-decoration:none;">Thanh toán</a>
        <a href="{prefix}chinh-sach-doi-tra.html" style="color:rgba(255,255,255,0.7); text-decoration:none;">Khiếu nại & Hoàn tiền</a>
      </div>

      <div style="border-top:1px solid rgba(255,255,255,0.15); padding-top:16px; max-width:300px; margin:0 auto;">
        <p style="color:rgba(255,255,255,0.6); font-size:0.8rem; margin:0;">© 2026 MâyYoga.health 🍀</p>
      </div>
    </div>
"""

            def replacer(match):
                return match.group(1) + compact_inner + match.group(3)

            orig_html = html
            html = footer_regex.sub(replacer, html)

            if html != orig_html:
                with open(path, "w", encoding="utf-8") as f:
                    f.write(html)
                count += 1

print(f"Compacted footers in {count} files!")
