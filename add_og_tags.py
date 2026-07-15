#!/usr/bin/env python3
"""
Script thêm OG Tags + Canonical URL + Twitter Card cho tất cả bài viết.
Giúp link share lên Facebook/Zalo hiện ảnh đẹp + tiêu đề + mô tả.
"""

import os
import re
import glob

BASE_URL = "https://mayyoga.health"
DEFAULT_IMAGE = f"{BASE_URL}/assets/images/hero.webp"
SITE_NAME = "Mây Yoga"

def extract_meta(html, name):
    """Extract content from <meta name="..." content="...">"""
    pattern = rf'<meta\s+name="{name}"\s+content="([^"]*)"'
    match = re.search(pattern, html, re.IGNORECASE)
    if match:
        return match.group(1)
    return None

def extract_title(html):
    """Extract content from <title>...</title>"""
    match = re.search(r'<title>([^<]+)</title>', html, re.IGNORECASE)
    if match:
        return match.group(1).strip()
    return None

def has_og_tags(html):
    """Check if file already has OG tags"""
    return 'og:title' in html

def get_relative_url(filepath, web_root):
    """Get URL path from filepath"""
    rel = os.path.relpath(filepath, web_root)
    return f"{BASE_URL}/{rel}"

def find_article_image(html, filepath):
    """Try to find a relevant image for the article"""
    # Check for hero/main image in the article
    # Look for first meaningful img src
    patterns = [
        r'<img[^>]+src="([^"]*hero[^"]*)"',  # hero image
        r'<img[^>]+src="([^"]*article[^"]*)"',  # article image
        r'og:image[^>]+content="([^"]*)"',  # existing og:image
    ]
    for p in patterns:
        match = re.search(p, html, re.IGNORECASE)
        if match:
            img = match.group(1)
            if img.startswith('http'):
                return img
            # Convert relative path to absolute
            if img.startswith('../'):
                img = img.replace('../', '')
            elif img.startswith('./'):
                img = img[2:]
            return f"{BASE_URL}/{img}"
    
    return DEFAULT_IMAGE

def build_og_tags(title, description, url, image):
    """Build the OG + Twitter meta tags block"""
    # Clean title - remove " | Mây Yoga" etc for cleaner OG
    og_title = title.split(' | ')[0].strip() if ' | ' in title else title
    
    tags = f'''  <meta property="og:title" content="{og_title}">
  <meta property="og:description" content="{description}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="{url}">
  <meta property="og:image" content="{image}">
  <meta property="og:locale" content="vi_VN">
  <meta property="og:site_name" content="{SITE_NAME}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{og_title}">
  <meta name="twitter:description" content="{description}">
  <meta name="twitter:image" content="{image}">
  <link rel="canonical" href="{url}">'''
    return tags

def process_file(filepath, web_root):
    """Process a single HTML file"""
    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()
    
    # Skip if already has OG tags
    if has_og_tags(html):
        return False, "already has OG tags"
    
    # Extract existing meta
    title = extract_title(html)
    description = extract_meta(html, 'description')
    
    if not title:
        return False, "no title found"
    if not description:
        description = title  # fallback to title
    
    url = get_relative_url(filepath, web_root)
    image = find_article_image(html, filepath)
    
    # Build OG tags
    og_block = build_og_tags(title, description, url, image)
    
    # Insert OG tags before </head>
    if '</head>' in html:
        html = html.replace('</head>', f'{og_block}\n</head>')
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(html)
        return True, "OG tags added"
    
    return False, "no </head> found"

def main():
    web_root = os.path.dirname(os.path.abspath(__file__))
    
    # Find all HTML files
    patterns = [
        os.path.join(web_root, 'bai-viet', '*.html'),
        os.path.join(web_root, '*.html'),
        os.path.join(web_root, 'trac-nghiem', '*.html'),
    ]
    
    html_files = []
    for pattern in patterns:
        html_files.extend(glob.glob(pattern))
    
    # Skip certain files
    skip_files = ['google7a26d0ab7253faec.html']
    
    updated = 0
    skipped = 0
    
    print("=" * 60)
    print("🏷️  Thêm OG Tags cho tất cả bài viết")
    print("=" * 60)
    
    for filepath in sorted(html_files):
        filename = os.path.basename(filepath)
        
        if filename in skip_files:
            continue
            
        success, msg = process_file(filepath, web_root)
        
        if success:
            updated += 1
            print(f"  ✅ {filename} — {msg}")
        else:
            skipped += 1
            print(f"  ⏭️  {filename} — {msg}")
    
    print()
    print(f"📊 Kết quả: {updated} file đã thêm OG tags, {skipped} file bỏ qua")
    print()
    if updated > 0:
        print("🎉 Xong! Giờ khi share link lên Facebook/Zalo sẽ hiện:")
        print("   ✅ Ảnh thumbnail đẹp")
        print("   ✅ Tiêu đề bài viết")
        print("   ✅ Mô tả hấp dẫn")
        print("   ✅ Canonical URL (SEO)")

if __name__ == '__main__':
    main()
