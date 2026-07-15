import os

root_dir = '/Users/phanthumay/Desktop/mayyoga.health/web'

count = 0
for dp, dn, fns in os.walk(root_dir):
    for fn in fns:
        if fn.endswith('.html'):
            path = os.path.join(dp, fn)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
                
            orig = content
            # Replace emojis in the menu
            content = content.replace(">💻 Yoga Online 1:1<", ">🌿 Yoga Online 1:1<")
            content = content.replace(">🎓 Đào tạo YTT 200H<", ">🦉 Đào tạo YTT 200H<")
            
            if content != orig:
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(content)
                count += 1

print(f"Changed emojis in {count} HTML files!")
