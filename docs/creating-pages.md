# Tạo trang mới

Dùng tài liệu này cho root page và nested page không thuộc hệ pose. Với bài viết
trong `bai-viet/`, đọc thêm `writing-articles.md`.

## 1. Chọn vị trí file

- Đặt ở root nếu là landing page, hub hoặc policy có URL cấp một.
- Đặt trong thư mục chức năng nếu URL thuộc một nhóm rõ ràng.
- Không tạo thư mục mới chỉ để chứa một file nếu không có quy ước URL.
- Không đặt page public trong `docs/` hoặc `docs/templates/`.

## 2. Tính đường dẫn tương đối

| Vị trí page | CSS/JS/assets ở root |
|---|---|
| Root: `ten-trang.html` | `css/...`, `js/...`, `assets/...` |
| Một cấp: `thu-muc/ten-trang.html` | `../css/...`, `../js/...`, `../assets/...` |

Canonical URL luôn là URL public tuyệt đối trên `https://mayyoga.health/`.

## 3. Dùng template chính thức

- Root page: `docs/templates/root-page-template.html`
- Nested page: `docs/templates/nested-page-template.html`
- Article: `docs/templates/article-template.html`

Sao chép template tới vị trí đích rồi thay **mọi** token dạng `__...__`.
Không publish khi còn token placeholder.

## 4. HTML shell

Trang thông thường phải có:

```html
<nav class="navbar site-header-standard scrolled"
     id="navbar"
     data-site-header-standard="true"></nav>

<main>
  <!-- Nội dung trang -->
</main>

<footer class="footer"></footer>
<script src="js/main.js?v=20260728b"></script>
```

Nested page đổi script thành:

```html
<script src="../js/main.js?v=20260728b"></script>
```

Không chép nội dung menu/footer runtime vào page mới. Footer shell rỗng là đủ.
Không tạo `.floating-contact`; `site-chrome.js` tạo instance canonical.

## 5. Navbar và CTA theo ngữ cảnh

Không thêm phần tử con vào navbar shell. Nếu page cần CTA header riêng,
canonical navigation hỗ trợ các thuộc tính trên `<body>`:

```html
<body class="ten-page"
      data-nav-cta-label="__CTA_LABEL__"
      data-nav-cta-href="__CTA_HREF__">
```

Tùy chọn:

- `data-nav-cta-target`
- `data-nav-cta-rel`

`data-nav-cta-href` có thể là fragment trong page hoặc URL hợp lệ. Không dùng
`#` trống.

## 6. CSS riêng của trang

- Tạo body class riêng, ví dụ `class="teacher-training-page"`.
- Scope selector theo body hoặc component.
- Load shared `css/style.css` trước CSS page.
- Nếu page giống một pattern đã có, đọc CSS owner hiện tại trước khi tạo file.
- Không sửa shared header/footer để giải quyết layout riêng.
- Không tạo nhiều refinement file cùng ghi đè một component mới.

Ví dụ:

```css
.teacher-training-page .program-overview { /* page-owned styles */ }
```

## 7. JavaScript riêng của trang

Chỉ tạo file mới khi behavior thuộc riêng page/component và không có owner hiện
tại. Tải sau `main.js`:

```html
<script src="js/main.js?v=20260728b"></script>
<script src="js/ten-trang.js"></script>
```

Không viết handler cho `mobileToggle`, `navLinks` hoặc trạng thái `scrolled`
của navbar. Inline script chỉ phù hợp cho JSON-LD hoặc logic nhỏ, thật sự riêng
page; ưu tiên file riêng nếu logic có thể tái dùng hoặc cần test.

## 8. SEO tối thiểu

Mỗi page cần:

- title duy nhất;
- meta description duy nhất;
- canonical URL;
- Open Graph title, description, URL, type, image, site name, locale;
- Twitter card, title, description, image;
- JSON-LD đúng loại (`WebPage`, `AboutPage`, `CollectionPage`, `FAQPage`...);
- icon paths đúng độ sâu.

Không giữ nội dung placeholder từ template. Xem `seo-and-sitemaps.md`.

## 9. Breadcrumb

Dùng contract trong `BREADCRUMB_STANDARD.md`. Root page:

```html
<div class="breadcrumb" aria-label="Breadcrumb">
  <a href="index.html">Trang chủ</a>
  <span class="sep" aria-hidden="true">›</span>
  <span class="current" aria-current="page">Tên trang</span>
</div>
```

Nested page đổi parent path thành `../index.html`.

## 10. Search và sitemap

- Nếu page cần tìm thấy qua global search, thêm một `contentEntries` entry trong
  `js/search-index.js`.
- URL và image trong search index tính từ site root, không có `../`.
- Thêm URL public vào `sitemap.xml`.
- Nếu là trắc nghiệm, kiểm tra cả `sitemap-trac-nghiem.xml`.
- Không thêm template, test page hoặc verification artifact vào sitemap.

## 11. Checklist

- [ ] Vị trí file và URL public đúng.
- [ ] Không còn token `__...__`.
- [ ] Relative path đúng theo độ sâu.
- [ ] Có navbar shell tối thiểu.
- [ ] Có footer shell.
- [ ] Có đúng một `main.js`.
- [ ] Không tải trực tiếp navigation/search/site chrome.
- [ ] Không có inline navigation handler.
- [ ] CSS page được scope.
- [ ] SEO và JSON-LD đầy đủ, khớp nội dung.
- [ ] Breadcrumb đúng.
- [ ] Search entry được thêm nếu cần.
- [ ] Sitemap được cập nhật.
- [ ] Chạy đủ kiểm tra trong `code-quality.md`.
