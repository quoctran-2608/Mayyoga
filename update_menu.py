import os
import re

root_dir = '/Users/phanthumay/Desktop/mayyoga.health/web'

root_nav = """<ul class="nav-links" id="navLinks">
        <li><a href="index.html">Trang chủ</a></li>
        <li><a href="ve-may-yoga.html">Về Mây Yoga</a></li>
        <li class="nav-dropdown">
          <a href="#" class="dropdown-toggle" style="color:#d4af37; font-weight:600;">Các khoá học <span class="chevron">▾</span></a>
          <ul class="dropdown-menu">
            <li><a href="hoc-yoga-online.html">🌿 Yoga Online 1:1</a></li>
            <li><a href="goc-huan-luyen-vien.html">🦉 Đào tạo YTT 200H</a></li>
          </ul>
        </li>
        <li class="nav-dropdown">
          <a href="#" class="dropdown-toggle">Kiến thức Yoga <span class="chevron">▾</span></a>
          <ul class="dropdown-menu">
            <li><a href="bai-viet/yoga-cho-nguoi-moi.html">🌱 Yoga cho người mới</a></li>
            <li><a href="tu-the-yoga.html">🧘 90 Tư thế Yoga</a></li>
            <li><a href="bai-viet/pranayama-ky-thuat-tho.html">🌬️ Pranayama</a></li>
            <li><a href="bai-viet/thien-cho-nguoi-moi.html">🕊️ Thiền định</a></li>
            <li><a href="giai-phau-yoga.html">🫀 Giải phẫu Yoga</a></li>
            <li style="border-top:1px solid rgba(61,90,58,0.1); margin-top:4px; padding-top:4px;"><a href="tu-tap-tai-nha.html">🏠 Tự tập tại nhà</a></li>
          </ul>
        </li>
        <li><a href="trac-nghiem.html">Trắc nghiệm</a></li>
      </ul>"""

sub_nav = """<ul class="nav-links" id="navLinks">
        <li><a href="../index.html">Trang chủ</a></li>
        <li><a href="../ve-may-yoga.html">Về Mây Yoga</a></li>
        <li class="nav-dropdown">
          <a href="#" class="dropdown-toggle" style="color:#d4af37; font-weight:600;">Các khoá học <span class="chevron">▾</span></a>
          <ul class="dropdown-menu">
            <li><a href="../hoc-yoga-online.html">🌿 Yoga Online 1:1</a></li>
            <li><a href="../goc-huan-luyen-vien.html">🦉 Đào tạo YTT 200H</a></li>
          </ul>
        </li>
        <li class="nav-dropdown">
          <a href="#" class="dropdown-toggle">Kiến thức Yoga <span class="chevron">▾</span></a>
          <ul class="dropdown-menu">
            <li><a href="../bai-viet/yoga-cho-nguoi-moi.html">🌱 Yoga cho người mới</a></li>
            <li><a href="../tu-the-yoga.html">🧘 90 Tư thế Yoga</a></li>
            <li><a href="../bai-viet/pranayama-ky-thuat-tho.html">🌬️ Pranayama</a></li>
            <li><a href="../bai-viet/thien-cho-nguoi-moi.html">🕊️ Thiền định</a></li>
            <li><a href="../giai-phau-yoga.html">🫀 Giải phẫu Yoga</a></li>
            <li style="border-top:1px solid rgba(61,90,58,0.1); margin-top:4px; padding-top:4px;"><a href="../tu-tap-tai-nha.html">🏠 Tự tập tại nhà</a></li>
          </ul>
        </li>
        <li><a href="../trac-nghiem.html">Trắc nghiệm</a></li>
      </ul>"""

count = 0
for dp, dn, fns in os.walk(root_dir):
    for fn in fns:
        if fn.endswith('.html'):
            path = os.path.join(dp, fn)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()

            match = re.search(r'<ul class="nav-links" id="navLinks">.*?Trắc nghiệm</a></li>\s*</ul>', content, re.DOTALL)
            if match:
                rel_path = os.path.relpath(path, root_dir)
                is_sub = '/' in rel_path or '\\' in rel_path
                new_content = content[:match.start()] + (sub_nav if is_sub else root_nav) + content[match.end():]
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                count += 1
            else:
                print(f"Skipped {path}")

print(f"Updated {count} HTML files!")
