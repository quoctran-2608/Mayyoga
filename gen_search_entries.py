#!/usr/bin/env python3
"""Generate search index entries for pose detail pages"""
import re, json, os

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))

with open(os.path.join(SCRIPT_DIR, 'js', 'poses-data.js'), 'r', encoding='utf-8') as f:
    raw = f.read()

poses = []
poses_section = raw[raw.find('const POSES'):]
for pm in re.finditer(r'\{([^}]+)\}', poses_section):
    block = pm.group(1)
    d = {}
    for kv in re.finditer(r"(\w+)\s*:\s*'([^']*)'", block):
        d[kv.group(1)] = kv.group(2)
    if 'vn' in d and 'san' in d:
        poses.append(d)

def vn_slug(t):
    t = t.lower()
    M = {'đ':'d','ă':'a','â':'a','ê':'e','ô':'o','ơ':'o','ư':'u','á':'a','à':'a','ả':'a','ã':'a','ạ':'a','ắ':'a','ằ':'a','ẳ':'a','ẵ':'a','ặ':'a','ấ':'a','ầ':'a','ẩ':'a','ẫ':'a','ậ':'a','é':'e','è':'e','ẻ':'e','ẽ':'e','ẹ':'e','ế':'e','ề':'e','ể':'e','ễ':'e','ệ':'e','í':'i','ì':'i','ỉ':'i','ĩ':'i','ị':'i','ó':'o','ò':'o','ỏ':'o','õ':'o','ọ':'o','ố':'o','ồ':'o','ổ':'o','ỗ':'o','ộ':'o','ớ':'o','ờ':'o','ở':'o','ỡ':'o','ợ':'o','ú':'u','ù':'u','ủ':'u','ũ':'u','ụ':'u','ứ':'u','ừ':'u','ử':'u','ữ':'u','ự':'u','ý':'y','ỳ':'y','ỷ':'y','ỹ':'y','ỵ':'y'}
    out = ''.join(M.get(c,c) for c in t)
    out = re.sub(r'[^a-z0-9\s-]', '', out)
    out = re.sub(r'\s+', '-', out.strip())
    return re.sub(r'-+', '-', out)

OVERRIDES = {'Tư thế Cày': 'tu-the-cay-halasana'}
def get_slug(vn):
    return OVERRIDES.get(vn, vn_slug(vn))

# Read existing search index
search_file = os.path.join(SCRIPT_DIR, 'js', 'search-index.js')
with open(search_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Build entries
entries = []
for p in poses:
    slug = get_slug(p['vn'])
    entry = json.dumps({
        'title': f"{p['vn']} — {p['san']}",
        'tag': 'Tư thế',
        'url': f'tu-the/{slug}.html',
        'img': p['img'],
        'time': '5 phút đọc',
        'content': f"{p['vn']} {p['san']} {p.get('benefits','')} {p.get('howto','')} {p.get('contra','')}"
    }, ensure_ascii=False)
    entries.append(f'  {entry}')

pose_js = ',\n'.join(entries)

# Insert before the closing ];
content = content.replace('\n];\n', ',\n' + pose_js + '\n];\n')

with open(search_file, 'w', encoding='utf-8') as f:
    f.write(content)

print(f'Added {len(entries)} pose entries to search-index.js')
