import os
import re

root_dir = '/Users/phanthumay/Desktop/mayyoga.health/web'

old_line = """        <strong>SĐT:</strong> 0326 808 864 &nbsp;|&nbsp; <strong>Email:</strong> phanthumay.yoga500@gmail.com
      </p>"""

new_line = """      </p>"""

count = 0
for dp, dn, fns in os.walk(root_dir):
    for fn in fns:
        if fn.endswith('.html'):
            path = os.path.join(dp, fn)
            with open(path, "r", encoding="utf-8") as f:
                html = f.read()
            orig = html
            html = html.replace(old_line, new_line)
            if html != orig:
                with open(path, "w", encoding="utf-8") as f:
                    f.write(html)
                count += 1

print(f"Cleaned {count} files!")
