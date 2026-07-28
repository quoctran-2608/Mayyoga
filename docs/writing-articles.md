# Viết bài mới trong `bai-viet/`

## 1. Tên file và slug

- Dùng chữ thường ASCII, từ ngăn bằng dấu gạch ngang.
- Không dấu tiếng Việt, không khoảng trắng, không ký tự trang trí.
- Slug ngắn, mô tả đúng chủ đề và không trùng file hiện có.
- URL dạng `https://mayyoga.health/bai-viet/<slug>.html`.

## 2. Bắt đầu từ template

Sao chép `docs/templates/article-template.html` vào `bai-viet/<slug>.html`.
Thay toàn bộ token `__...__`; không dùng một bài cũ làm nguồn cho menu, footer
hoặc loader.

## 3. Metadata

- Title mô tả đúng ý định tìm kiếm và có thương hiệu khi phù hợp.
- Meta description tóm tắt giá trị bài, không nhồi từ khóa.
- Canonical, `og:url` và JSON-LD `url` phải giống URL public.
- `og:type` dùng `article`.
- OG/Twitter image dùng URL tuyệt đối và file ảnh có thật.
- `datePublished` và `dateModified` dùng ISO `YYYY-MM-DD`.
- Author/publisher phải phản ánh thông tin thật trong site.

## 4. Breadcrumb và article header

Breadcrumb tối thiểu:

```html
<div class="breadcrumb" aria-label="Breadcrumb">
  <a href="../index.html">Trang chủ</a>
  <span class="sep" aria-hidden="true">›</span>
  <a href="../index.html#blog">Kiến thức</a>
  <span class="sep" aria-hidden="true">›</span>
  <span class="current" aria-current="page">Tên bài</span>
</div>
```

Article header cần một H1, chủ đề, ngày, thời gian đọc và tác giả khi các dữ
liệu này có thật. Không dùng nhiều H1.

## 5. Article body

- Dùng `<main class="article-body">`.
- Mở đầu nêu vấn đề và người đọc sẽ nhận được gì.
- H2 chia các phần chính; H3 chỉ nằm dưới H2 liên quan.
- Không nhảy từ H2 sang H4.
- Đoạn ngắn, dễ đọc; list/table/callout chỉ dùng khi giúp hiểu nội dung.
- CTA phải liên quan bài và không giả thành khuyến nghị y khoa.

## 6. Table of contents

Với bài dài, tạo TOC từ các H2 có `id` ổn định:

```html
<nav class="article-toc" aria-label="Mục lục bài viết">
  <h2>Trong bài viết này</h2>
  <ol>
    <li><a href="#phan-mot">Tên phần một</a></li>
  </ol>
</nav>
```

Mọi fragment trong TOC phải trỏ tới ID có thật và không trùng.

## 7. Internal link và hình ảnh

- Link tới bài cùng thư mục dùng `<slug>.html`.
- Link tới root page dùng `../<page>.html`.
- Ảnh thường dùng `../assets/images/articles/...`.
- `alt` mô tả nội dung/ý nghĩa ảnh; ảnh trang trí dùng `alt=""`.
- Không dùng ảnh không rõ quyền sử dụng.
- Kiểm tra file đích của mọi link và image path.

## 8. Y khoa và sức khỏe

- Không đưa tỷ lệ, phần trăm, kết quả nghiên cứu hoặc khuyến nghị lâm sàng nếu
  không có nguồn đáng tin.
- Gắn nguồn cho claim cụ thể; không biến suy luận thành kết luận khoa học.
- Không nói Yoga chữa, điều trị dứt điểm hoặc thay thế chẩn đoán/chăm sóc y tế.
- Với đau, chấn thương, thai kỳ hoặc bệnh nền, dùng ngôn ngữ thận trọng và
  khuyến nghị hỏi chuyên gia phù hợp.

## 9. Share, navigation và bootstrap

HTML chỉ cần:

```html
<nav class="navbar site-header-standard scrolled"
     id="navbar"
     data-site-header-standard="true"></nav>
...
<div class="article-share" aria-label="Chia sẻ bài viết"></div>
...
<footer class="footer"></footer>
<script src="../js/main.js?v=20260728b"></script>
```

`article-share-standard.js` sẽ normalize hoặc tự tạo share shell cho Article.
Không hard-code icon/share URL. Không copy menu, footer behavior, floating
contact hoặc search script vào bài.

## 10. Search và sitemap

Nếu bài cần xuất hiện trong global search, thêm vào `contentEntries` trong
`js/search-index.js`:

- URL: `bai-viet/<slug>.html`;
- image: `assets/images/articles/...`;
- keywords bổ sung cho title/tag, không nhồi lặp;
- không viết pose entries tại đây.

Thêm URL bài vào `sitemap.xml` với metadata phù hợp.

## Checklist “bài viết hoàn chỉnh”

- [ ] Slug hợp lệ, không trùng.
- [ ] Không còn placeholder.
- [ ] Title, description, canonical, OG, Twitter đầy đủ.
- [ ] Article JSON-LD hợp lệ và khớp nội dung.
- [ ] Có đúng một H1; hierarchy H2/H3 hợp lý.
- [ ] Breadcrumb và TOC link đúng.
- [ ] Author/date/read time là dữ liệu thật.
- [ ] Image path tồn tại, alt text phù hợp.
- [ ] Internal links tồn tại.
- [ ] Claim sức khỏe có nguồn và không hứa điều trị.
- [ ] Có navbar shell, footer shell và đúng một `../js/main.js`.
- [ ] Không có navigation/search/footer behavior copy.
- [ ] Search index cập nhật nếu cần.
- [ ] `sitemap.xml` cập nhật.
- [ ] Migration idempotent, site audit và docs audit đều đạt.
