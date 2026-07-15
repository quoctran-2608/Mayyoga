import json

new_item = {
    "title": "Yoga cho đau thần kinh tọa — 3 Tư thế an toàn tự tập tại nhà",
    "tag": "Yoga Trị Liệu Tại Nhà",
    "url": "bai-viet/yoga-cho-dau-than-kinh-toa.html",
    "img": "assets/images/articles/sciatica/hero.png",
    "time": "8 phút tập",
    "content": "Yoga đau thần kinh tọa Sciatica tự tập tại nhà giảm đau giảm viêm giải phóng cơ hình lê piriformis Tư thế Lỗ Kim Số 4 Supta Kapotasana Tư thế Vặn Xoắn Nằm Ngửa Supta Matsyendrasana Tư thế Em Bé Balasana đĩa đệm lưng dưới."
}

with open("js/search-index.js", "r", encoding="utf-8") as f:
    text = f.read()

# text ends with `];\n`
text = text.replace("\n];", ",\n  " + json.dumps(new_item, ensure_ascii=False) + "\n];")

with open("js/search-index.js", "w", encoding="utf-8") as f:
    f.write(text)

print("Updated search index with Sciatica article!")
