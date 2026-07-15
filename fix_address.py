import os

root_dir = '/Users/phanthumay/Desktop/mayyoga.health/web'

old_addr = "<strong>Địa chỉ:</strong> Thị trấn Ea Knốp, Huyện Ea Kar, Tỉnh Đắk Lắk<br>"
new_addr = "<strong>Địa chỉ:</strong> Thôn 5, Xã Ea Knốp, Huyện Ea Kar, Tỉnh Đắk Lắk<br>"
# Handle if I previously dropped Huyện Ea Kar:
# Looking at my compact script: <strong>Địa chỉ:</strong> Thị trấn Ea Knốp, Huyện Ea Kar, Tỉnh Đắk Lắk<br>

count = 0
for dp, dn, fns in os.walk(root_dir):
    for fn in fns:
        if fn.endswith('.html'):
            path = os.path.join(dp, fn)
            with open(path, "r", encoding="utf-8") as f:
                html = f.read()

            orig_html = html
            html = html.replace(old_addr, new_addr)

            if html != orig_html:
                with open(path, "w", encoding="utf-8") as f:
                    f.write(html)
                count += 1

print(f"Fixed address in {count} files!")
