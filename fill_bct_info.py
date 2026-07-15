import os

root_dir = '/Users/phanthumay/Desktop/mayyoga.health/web'

mst_placeholder = "<strong style=\"color:#fff;\">Mã số thuế cá nhân:</strong> [Chờ bổ sung]<br>"
mst_filled = "<strong style=\"color:#fff;\">Mã số thuế cá nhân:</strong> 066195013103<br>"

addr_placeholder = "<strong style=\"color:#fff;\">Địa chỉ:</strong> [Chờ bổ sung]<br>"
addr_filled = "<strong style=\"color:#fff;\">Địa chỉ:</strong> Thị trấn Ea Knốp, Huyện Ea Kar, Tỉnh Đắk Lắk<br>"

count = 0
for dp, dn, fns in os.walk(root_dir):
    for fn in fns:
        if fn.endswith('.html'):
            path = os.path.join(dp, fn)
            with open(path, "r", encoding="utf-8") as f:
                html = f.read()

            orig_html = html
            html = html.replace(mst_placeholder, mst_filled)
            html = html.replace(addr_placeholder, addr_filled)

            if html != orig_html:
                with open(path, "w", encoding="utf-8") as f:
                    f.write(html)
                count += 1

print(f"Filled BCT info in {count} files!")
