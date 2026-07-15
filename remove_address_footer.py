import os

root_dir = '/Users/phanthumay/Desktop/mayyoga.health/web'

count = 0
for dp, dn, fns in os.walk(root_dir):
    for fn in fns:
        if fn.endswith('.html'):
            path = os.path.join(dp, fn)
            with open(path, "r", encoding="utf-8") as f:
                html = f.read()

            if "Địa chỉ:</strong> Thôn 5, Xã Ea Knốp" in html:
                lines = html.split('\n')
                # filter out the line with the address
                new_lines = [line for line in lines if "Địa chỉ:</strong> Thôn 5, Xã Ea Knốp" not in line]
                new_html = '\n'.join(new_lines)
                
                with open(path, "w", encoding="utf-8") as f:
                    f.write(new_html)
                count += 1

print(f"Removed address from {count} HTML files!")
