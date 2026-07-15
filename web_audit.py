import os
import re

root_dir = '/Users/phanthumay/Desktop/mayyoga.health/web'

def get_all_files():
    all_files = set()
    for dp, dn, fns in os.walk(root_dir):
        for fn in fns:
            if not fn.startswith('.'):
                all_files.add(os.path.relpath(os.path.join(dp, fn), root_dir))
    return all_files

all_files = get_all_files()
html_files = [f for f in all_files if f.endswith('.html')]

issues = []

# Regex patterns
title_re = re.compile(r'<title>(.*?)</title>', re.IGNORECASE)
desc_re = re.compile(r'<meta\s+name=["\']description["\']\s+content=["\'](.*?)["\']', re.IGNORECASE)
href_re = re.compile(r'href=["\'](.*?)["\']', re.IGNORECASE)
src_re = re.compile(r'src=["\'](.*?)["\']', re.IGNORECASE)

missing_titles = []
missing_descs = []
broken_links = set()

for hfile in html_files:
    file_path = os.path.join(root_dir, hfile)
    with open(file_path, 'r', encoding='utf-8') as f:
        html = f.read()

    # Check title
    if not title_re.search(html):
        missing_titles.append(hfile)
    
    # Check description
    if not desc_re.search(html):
        missing_descs.append(hfile)

    # Check links
    base_dir = os.path.dirname(hfile)
    
    for match in href_re.findall(html):
        match = match.split('#')[0] # Remove fragments
        match = match.split('?')[0] # Remove query params
        if not match or match.startswith('http') or match.startswith('mailto:') or match.startswith('tel:'):
            continue
        
        target_path = os.path.normpath(os.path.join(base_dir, match))
        if target_path not in all_files:
            broken_links.add(f"In {hfile}: Broken href -> {match} (resolves to {target_path})")

    for match in src_re.findall(html):
        match = match.split('?')[0]
        if not match or match.startswith('http') or match.startswith('data:'):
            continue
        target_path = os.path.normpath(os.path.join(base_dir, match))
        if target_path not in all_files:
            broken_links.add(f"In {hfile}: Broken src -> {match} (resolves to {target_path})")

print(f"Total HTML files: {len(html_files)}")
print(f"Missing Titles: {len(missing_titles)}")
print(f"Missing Descriptions: {len(missing_descs)}")
print(f"Broken Links Found: {len(broken_links)}")
if broken_links:
    for bl in list(broken_links)[:20]:
        print("  -", bl)
if len(broken_links) > 20:
    print(f"  ... and {len(broken_links) - 20} more.")

