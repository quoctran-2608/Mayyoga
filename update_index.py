with open("index.html", "r", encoding="utf-8") as f:
    text = f.read()

new_card = """        <a href="bai-viet/yoga-cho-dau-than-kinh-toa.html" style="text-decoration:none; background:white; border-radius:16px; overflow:hidden; box-shadow:0 4px 20px rgba(0,0,0,0.06); transition:transform 0.2s, box-shadow 0.2s; min-width:260px; flex-shrink:0; scroll-snap-align:start;" class="reveal" onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 8px 30px rgba(61,90,58,0.15)'" onmouseout="this.style.transform=''; this.style.boxShadow='0 4px 20px rgba(0,0,0,0.06)'">
          <img loading="lazy" src="assets/images/articles/sciatica/hero.png" alt="Yoga cho đau thần kinh tọa" style="width:100%; height:200px; object-fit:contain; background:linear-gradient(135deg,#e8f5e9,#c8e6c9); padding:0px; border-bottom: 1px solid #f0f0f0;">
          <div style="padding:16px;">
            <span style="background:#e8f5e9; color:#2e7d32; font-size:0.75rem; padding:4px 10px; border-radius:20px; font-weight:600;">🌿 Trị liệu tại nhà</span>
            <h3 style="color:#3d5a3a; font-size:1rem; margin:10px 0 6px; line-height:1.4;">Yoga đau thần kinh tọa</h3>
            <p style="color:#777; font-size:0.85rem; margin:0; line-height:1.6;">3 bước giải phóng cơ hình lê và giảm tê buốt hiệu quả tận gốc.</p>
          </div>
        </a>
"""

# Insert it before yoga-giam-dau-lung.html
target = '<a href="bai-viet/yoga-giam-dau-lung.html"'
text = text.replace(target, new_card + target)

with open("index.html", "w", encoding="utf-8") as f:
    f.write(text)

print("Updated index.html!")
