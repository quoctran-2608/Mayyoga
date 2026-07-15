import os
import re

root_dir = '/Users/phanthumay/Desktop/mayyoga.health/web'

root_nav = """      <ul class="nav-links" id="navLinks">
        <li><a href="index.html">Trang chủ</a></li>
        <li><a href="ve-may-yoga.html">Về Mây Yoga</a></li>
        <li class="nav-dropdown">
          <a href="#" class="dropdown-toggle">Kiến thức Yoga <span class="chevron">▾</span></a>
          <ul class="dropdown-menu">
            <li><a href="bai-viet/yoga-cho-nguoi-moi.html">🌱 Yoga cho người mới</a></li>
            <li><a href="tu-the-yoga.html">🧘 90 Tư thế Yoga</a></li>
            <li><a href="bai-viet/pranayama-ky-thuat-tho.html">🌬️ Pranayama</a></li>
            <li><a href="bai-viet/thien-cho-nguoi-moi.html">🕊️ Thiền định</a></li>
            <li><a href="bai-viet/cot-song-yoga.html">🫀 Giải phẫu Yoga</a></li>
          </ul>
        </li>
        <li><a href="goc-huan-luyen-vien.html" style="color:#d4af37; font-weight:600;">Góc Huấn Luyện</a></li>
        <li><a href="trac-nghiem.html">Trắc nghiệm</a></li>
      </ul>"""

sub_nav = """      <ul class="nav-links" id="navLinks">
        <li><a href="../index.html">Trang chủ</a></li>
        <li><a href="../ve-may-yoga.html">Về Mây Yoga</a></li>
        <li class="nav-dropdown">
          <a href="#" class="dropdown-toggle">Kiến thức Yoga <span class="chevron">▾</span></a>
          <ul class="dropdown-menu">
            <li><a href="../bai-viet/yoga-cho-nguoi-moi.html">🌱 Yoga cho người mới</a></li>
            <li><a href="../tu-the-yoga.html">🧘 90 Tư thế Yoga</a></li>
            <li><a href="../bai-viet/pranayama-ky-thuat-tho.html">🌬️ Pranayama</a></li>
            <li><a href="../bai-viet/thien-cho-nguoi-moi.html">🕊️ Thiền định</a></li>
            <li><a href="../bai-viet/cot-song-yoga.html">🫀 Giải phẫu Yoga</a></li>
          </ul>
        </li>
        <li><a href="../goc-huan-luyen-vien.html" style="color:#d4af37; font-weight:600;">Góc Huấn Luyện</a></li>
        <li><a href="../trac-nghiem.html">Trắc nghiệm</a></li>
      </ul>"""

count = 0
for dp, dn, fns in os.walk(root_dir):
    for fn in fns:
        if fn.endswith('.html'):
            path = os.path.join(dp, fn)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Find the full nav-links ul block
            # We use regex to match <ul class="nav-links" id="navLinks"> up to its closing </ul>
            # Note: need to handle nested <ul> for dropdowns
            
            pattern = re.compile(r'<ul class="nav-links" id="navLinks">.*?</ul>\s*</li\s*>\s*</ul\s*>\s*</li\s*>\s*</ul\s*>|<ul class="nav-links" id="navLinks">.*?</ul>\s*</li\s*>\s*</ul\s*>|<ul class="nav-links" id="navLinks">.*?<li><a href="[^"]*">Trắc nghiệm</a></li>\s*</ul>', re.DOTALL)
            
            # let's be simpler: replace everything between <ul class="nav-links" id="navLinks"> and </ul>
            # Since there is a nested <ul> inside nav-dropdown, we can't use non-greedy .*?</ul> directly if it matches the first </ul>
            
            # An alternative approach: find <ul class="nav-links" id="navLinks"> and the next </ul> that is visually aligned or specific to the block
            
            pass

# Simpler logic with regex: we know Trắc nghiệm is the last link
import sys
for dp, dn, fns in os.walk(root_dir):
    for fn in fns:
        if fn.endswith('.html'):
            path = os.path.join(dp, fn)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
                
            match = re.search(r'<ul class="nav-links" id="navLinks">.*?Trắc nghiệm</a></li>\s*</ul>', content, re.DOTALL)
            if match:
                is_sub = 'bai-viet' in path or 'trac-nghiem' in path
                new_content = content[:match.start()] + (sub_nav if is_sub else root_nav) + content[match.end():]
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                count += 1
            else:
                print(f"Skipped {path}")
print(f"Updated {count} files")
