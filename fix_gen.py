with open('gen_articles.py', 'r') as f:
    text = f.read()

text = text.replace('f.write(base_html.format(', '''
        html = base_html.replace("{title}", a['title']).replace("{desc}", a['desc']).replace("{category}", a['category']).replace("{tag}", a['tag']).replace("{content}", a['content'])
        f.write(html
''')
text = text.replace('            title=a[\'title\'],', '')
text = text.replace('            desc=a[\'desc\'],', '')
text = text.replace('            category=a[\'category\'],', '')
text = text.replace('            tag=a[\'tag\'],', '')
text = text.replace('            content=a[\'content\']\n        )', '')

with open('gen_articles.py', 'w') as f:
    f.write(text)
