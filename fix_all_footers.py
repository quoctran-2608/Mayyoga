import os
import re

root_dir = '/Users/phanthumay/Desktop/mayyoga.health/web'

legal_block = """
      <!-- FOOTER LEGAL BLOCK -->
      <div style="color:rgba(255,255,255,0.7); font-size: 0.85rem; line-height: 1.8; margin-bottom: 24px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 24px; max-width: 500px; margin-left: auto; margin-right: auto;">
        <strong style="color:#fff;">Chủ quản website:</strong> Cá nhân Phan Thu Mây<br>
        <strong style="color:#fff;">Mã số thuế cá nhân:</strong> 066195013103<br>
        <strong style="color:#fff;">Địa chỉ:</strong> Thị trấn Ea Knốp, Huyện Ea Kar, Tỉnh Đắk Lắk<br>
        <strong style="color:#fff;">SĐT:</strong> 0326 808 864 &nbsp;|&nbsp; <strong style="color:#fff;">Email:</strong> phanthumay.yoga500@gmail.com
      </div>
"""

counts = {'light': 0, 'dark': 0}

for dp, dn, fns in os.walk(root_dir):
    for fn in fns:
        if fn.endswith('.html'):
            path = os.path.join(dp, fn)
            with open(path, "r", encoding="utf-8") as f:
                html = f.read()

            orig_html = html
            prefix = "" if dp == root_dir else "../"
            
            # Fix Dark Footer (goc-huan-luyen-vien.html has unique dark styling)
            if "Giáo Dục Yoga Dựa Trên Chánh Niệm & Khoa Học." in html:
                target_p = "<p style=\"max-width:500px; margin:0 auto 24px;\">Giáo Dục Yoga Dựa Trên Chánh Niệm & Khoa Học.<br>Mây Yoga — Đồng hành YTT 200h cùng Giang Metta Yoga Academy.</p>"
                
                dark_links = f"""
      <div style="display:flex; gap:16px; justify-content:center; flex-wrap:wrap; margin-bottom:16px; font-size:0.82rem;">
        <a href="{prefix}chinh-sach-bao-mat.html" style="color:rgba(255,255,255,0.7); text-decoration:none;">Chính sách bảo mật</a>
        <a href="{prefix}dieu-khoan-su-dung.html" style="color:rgba(255,255,255,0.7); text-decoration:none;">Điều khoản sử dụng</a>
        <a href="{prefix}chinh-sach-thanh-toan.html" style="color:rgba(255,255,255,0.7); text-decoration:none;">Chính sách thanh toán</a>
        <a href="{prefix}chinh-sach-doi-tra.html" style="color:rgba(255,255,255,0.7); text-decoration:none;">Chính sách khiếu nại & Hoàn tiền</a>
      </div>
"""
                
                # Check if we already injected
                if "FOOTER LEGAL BLOCK" not in html:
                    html = html.replace(target_p, target_p + legal_block + dark_links)
                    counts['dark'] += 1
            
            else:
                # Fix Light Footers
                light_anchor = f"""<div style="display:flex; gap:16px; justify-content:center; flex-wrap:wrap; margin-bottom:16px; font-size:0.82rem;">
        <a href="{prefix}chinh-sach-bao-mat.html" style="color:rgba(255,255,255,0.7); text-decoration:none;">Chính sách bảo mật</a>"""
                
                t1 = f"""<div style="display:flex; gap:16px; justify-content:center; flex-wrap:wrap; margin-bottom:16px; font-size:0.82rem;">
        <a href="{prefix}chinh-sach-bao-mat.html" style="color:rgba(255,255,255,0.7); text-decoration:none;">Chính sách bảo mật</a>"""
                
                # Sometime there's no tab but spaces
                if "FOOTER LEGAL BLOCK" not in html and t1 in html:
                    html = html.replace(t1, legal_block + t1)
                    counts['light'] += 1
                elif "FOOTER LEGAL BLOCK" not in html:
                    # Let's do a more robust regex if the exact string wasn't found
                    t_regex = re.compile(r'(<div[^>]*>\s*<a href="[^"]*chinh-sach-bao-mat.html"[^>]*>Chính sách bảo mật</a>)')
                    m = t_regex.search(html)
                    if m:
                        html = html[:m.start()] + legal_block + html[m.start():]
                        counts['light'] += 1

            if html != orig_html:
                with open(path, "w", encoding="utf-8") as f:
                    f.write(html)

print(f"Fixed {counts['dark']} dark footers and {counts['light']} light footers!")
