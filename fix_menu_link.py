import os

root_dir = '/Users/phanthumay/Desktop/mayyoga.health/web'
count = 0

for dp, dn, fns in os.walk(root_dir):
    for fn in fns:
        if fn.endswith('.html'):
            path = os.path.join(dp, fn)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # For root files
            new_content = content.replace('<li><a href="bai-viet/cot-song-yoga.html">🫀 Giải phẫu Yoga</a></li>', '<li><a href="giai-phau-yoga.html">🫀 Giải phẫu Yoga</a></li>')
            # For subdir files
            new_content = new_content.replace('<li><a href="../bai-viet/cot-song-yoga.html">🫀 Giải phẫu Yoga</a></li>', '<li><a href="../giai-phau-yoga.html">🫀 Giải phẫu Yoga</a></li>')
            
            if new_content != content:
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                count += 1

print(f"Updated {count} files")
