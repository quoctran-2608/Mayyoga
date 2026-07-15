import os

root_dir = '/Users/phanthumay/Desktop/mayyoga.health/web'

# 1. Fix apple-touch-icon in all files
count_apple = 0
for dp, dn, fns in os.walk(root_dir):
    for fn in fns:
        if fn.endswith('.html'):
            path = os.path.join(dp, fn)
            with open(path, "r", encoding="utf-8") as f:
                html = f.read()
            orig = html
            html = html.replace('apple-touch-icon.webp', 'apple-touch-icon.png')
            
            # Since trac-nghiem.html is in root but has ../ links, fix it if we are on it
            if fn == 'trac-nghiem.html' and dp == root_dir:
                # Need to be careful not to replace external URLs, just local ../
                html = html.replace('href="../', 'href="')
                html = html.replace('src="../', 'src="')
                
            if html != orig:
                with open(path, "w", encoding="utf-8") as f:
                    f.write(html)
                count_apple += 1

print(f"Fixed issues in {count_apple} files!")
