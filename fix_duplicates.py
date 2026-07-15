import os
import re

root_dir = '/Users/phanthumay/Desktop/mayyoga.health/web'

count = 0
for dp, dn, fns in os.walk(root_dir):
    for fn in fns:
        if fn.endswith('.html'):
            path = os.path.join(dp, fn)
            with open(path, "r", encoding="utf-8") as f:
                html = f.read()

            # The duplicated block looks like:
            # <a href="...chinh-sach-thanh-toan.html"...>Chính sách thanh toán</a>
            # <a href="...chinh-sach-doi-tra.html"...>Chính sách khiếu nại & Hoàn tiền</a>
            # <a href="...chinh-sach-thanh-toan.html"...>Chính sách thanh toán</a>
            # <a href="...chinh-sach-doi-tra.html"...>Chính sách khiếu nại & Hoàn tiền</a>
            
            prefix = "" if dp == root_dir else "../"
            
            dup1 = f"""<a href="{prefix}chinh-sach-thanh-toan.html" style="color:rgba(255,255,255,0.7); text-decoration:none;">Chính sách thanh toán</a>
        <a href="{prefix}chinh-sach-doi-tra.html" style="color:rgba(255,255,255,0.7); text-decoration:none;">Chính sách khiếu nại & Hoàn tiền</a>
        <a href="{prefix}chinh-sach-thanh-toan.html" style="color:rgba(255,255,255,0.7); text-decoration:none;">Chính sách thanh toán</a>
        <a href="{prefix}chinh-sach-doi-tra.html" style="color:rgba(255,255,255,0.7); text-decoration:none;">Chính sách khiếu nại & Hoàn tiền</a>"""

            single1 = f"""<a href="{prefix}chinh-sach-thanh-toan.html" style="color:rgba(255,255,255,0.7); text-decoration:none;">Chính sách thanh toán</a>
        <a href="{prefix}chinh-sach-doi-tra.html" style="color:rgba(255,255,255,0.7); text-decoration:none;">Chính sách khiếu nại & Hoàn tiền</a>"""

            orig_html = html
            html = html.replace(dup1, single1)
            
            # Also check if it's duplicated 3 times
            dup2 = single1 + "\n        " + single1 + "\n        " + single1
            while dup2 in html:
                html = html.replace(dup2, single1)
            while (single1 + "\n        " + single1) in html:
                html = html.replace(single1 + "\n        " + single1, single1)

            if html != orig_html:
                with open(path, "w", encoding="utf-8") as f:
                    f.write(html)
                count += 1

print(f"Fixed {count} files with duplicates!")
