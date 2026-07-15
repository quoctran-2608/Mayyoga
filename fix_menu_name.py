import os

root_dir = '/Users/phanthumay/Desktop/mayyoga.health/web'

old = '>Góc Huấn Luyện</a>'
new = '>Góc Huấn Luyện Viên</a>'

count = 0
for dp, dn, fns in os.walk(root_dir):
    for fn in fns:
        if fn.endswith('.html'):
            path = os.path.join(dp, fn)
            with open(path, "r", encoding="utf-8") as f:
                html = f.read()
            orig = html
            html = html.replace(old, new)
            if html != orig:
                with open(path, "w", encoding="utf-8") as f:
                    f.write(html)
                count += 1

print(f"Renamed menu in {count} files!")
