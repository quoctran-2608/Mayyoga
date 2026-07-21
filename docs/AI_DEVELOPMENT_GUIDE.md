# Mây Yoga — AI & Developer Development Guide

> **Mục đích:** Đây là tài liệu bắt buộc phải đọc trước khi AI/developer tạo trang mới, bài viết mới, sửa layout dùng chung, thêm menu, thêm search entry hoặc thay đổi component toàn site.
>
> **Nguyên tắc cao nhất:** Website phải tiếp tục có **một hệ component dùng chung** cho Header/Menu, Footer và Floating Contact. Không tạo bản sao riêng theo từng trang rồi tự chỉnh lệch khỏi chuẩn.

---

## 1. Quy tắc bắt buộc trước khi sửa code

1. Đọc tài liệu này trước khi tạo hoặc sửa trang.
2. Xác định rõ trang đang làm là:
   - Homepage `index.html`;
   - Trang root như `giai-phau-yoga.html`;
   - Bài viết một cấp trong `bai-viet/` như `bai-viet/thien-cho-nguoi-moi.html`.
3. Không copy header/footer rồi tự thiết kế lại theo cảm tính.
4. Không thêm CSS riêng để thay đổi Header/Menu/Footer nếu yêu cầu chỉ thuộc nội dung trang.
5. Không sửa `site-chrome.js` hoặc `site-header-standard.js` trừ khi yêu cầu là thay đổi **toàn site**.
6. Nếu sửa component chung, phải kiểm tra cả desktop, tablet và mobile.
7. Sau khi ghi file lên GitHub phải fetch lại file để xác nhận nội dung thực tế sau commit.
8. Không tuyên bố đã kiểm thử browser/pixel-perfect/deploy nếu chưa thực sự render và kiểm tra.

---

# 2. Bản đồ kiến trúc hiện tại

## 2.1. Homepage đặc biệt

Homepage không phải một file HTML thuần thông thường.

- `index.html`: Jekyll/Liquid wrapper.
- `_includes/index-source.html`: source HTML homepage gốc.
- `index.html` dùng Liquid `capture`, `include`, `replace` để chèn CSS/JS và refinement trước khi build.

**Không được** thay toàn bộ `index.html` bằng HTML tĩnh mà không hiểu kiến trúc này.

Homepage dùng body class:

```html
<body class="home-hero-redesign">
```

Body class này chỉ dành cho homepage. Không thêm nó vào trang con.

### Các lớp homepage quan trọng

Các file homepage hiện có nhiều layer CSS vì đã qua nhiều vòng refinement:

- `css/style.css`
- `css/index-responsive.css`
- `css/index-hero-principles.css`
- `css/hero-redesign-v2.css`
- `css/hero-fix-v4.css`
- `css/index-hero-final-static.css`
- `css/index-mobile-hero-v2.css`
- `css/index-mobile-polish-v3.css`
- `css/index-mobile-fixes-v4.css`
- `css/index-mobile-refine-v5.css`
- `css/index-hero-principle-icons-v2.css`
- `css/index-nav-v2.css`
- `css/index-practice-carousel-v2.css`
- `css/index-practice-mobile-v3.css`
- `css/index-footer-component-compat-v2.css`

**Không dùng các file homepage-only cho trang con** trừ khi có lý do kỹ thuật rõ ràng.

---

## 2.2. CSS nền toàn site

File nền chính:

```text
css/style.css
```

File này chứa:

- design tokens;
- typography;
- button;
- navbar base;
- dropdown base;
- search UI;
- footer base;
- floating contact base;
- article layout;
- responsive base;
- các component legacy dùng chung.

Trang mới phải load `css/style.css`.

Dùng cache-busting query hiện hành khi cần, ví dụ:

```html
<link rel="stylesheet" href="css/style.css?v=6">
```

Trang trong `bai-viet/` dùng prefix `../`:

```html
<link rel="stylesheet" href="../css/style.css?v=6">
```

Không tạo một bản `style.css` riêng cho từng trang.

---

# 3. Shared Site Chrome — component dùng chung toàn website

Shared chrome gồm:

1. Header/Menu/Search/CTA/Hamburger;
2. Footer;
3. Floating Contact.

Chuỗi bootstrap hiện tại:

```text
main.js
  ↓
site-chrome.js
  ├─ normalize Footer
  ├─ replace Floating Contact
  └─ load site-header-standard.js
       ├─ normalize Header/Menu
       ├─ restore missing Search UI
       ├─ restore CTA/Hamburger nếu thiếu
       ├─ active state
       ├─ level-2 menu behavior
       └─ ensure Search Engine
```

Ngoài ra `search.js` có fallback để load `site-chrome.js` cho một số legacy page chưa load `main.js`.

**Fallback chỉ là lớp an toàn. Trang mới không được cố tình dựa vào fallback.**

---

# 4. Component Header/Menu chuẩn

## 4.1. Source of truth

- Visual/UX chuẩn được lấy từ header homepage.
- Non-homepage được chuẩn hóa bởi:

```text
js/site-header-standard.js
```

Bootstrap bởi:

```text
js/site-chrome.js
```

### Không làm

- Không hard-code màu vàng cho menu.
- Không tự tạo active state bằng `:first-child`.
- Không tạo CSS header riêng chỉ vì một trang cũ khác cấu trúc.
- Không copy một header legacy thiếu Search rồi xem đó là chuẩn.

---

## 4.2. Header DOM contract tối thiểu

`site-header-standard.js` có thể tự bổ sung `navLinks`, Search, CTA và hamburger nếu chúng thiếu, nhưng **nó cần navbar shell tồn tại**.

Trang mới phải có ít nhất:

```html
<nav class="navbar scrolled" id="navbar">
  <div class="container">
    <a href="index.html" class="nav-logo">
      <img src="assets/images/logo.webp" alt="Mây Yoga" class="logo-img">
    </a>

    <!-- Nên khai báo đầy đủ các node dưới đây để tránh layout shift. -->
    <ul class="nav-links" id="navLinks"></ul>

    <div class="nav-search" id="navSearch">
      <input
        type="text"
        id="globalSearch"
        placeholder="🔍 Tìm tư thế, bài viết..."
        autocomplete="off"
      >
      <div class="search-dropdown" id="searchDropdown"></div>
    </div>

    <div class="nav-cta">
      <a href="index.html#blog" class="btn btn-primary btn-sm">Khám phá ngay</a>
    </div>

    <button class="mobile-toggle" id="mobileToggle" aria-label="Menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>
```

Với file trong `bai-viet/`, đổi prefix thành `../`:

```html
<a href="../index.html" class="nav-logo">
  <img src="../assets/images/logo.webp" alt="Mây Yoga" class="logo-img">
</a>
```

`site-header-standard.js` sẽ thay nội dung `#navLinks` bằng menu canonical tại runtime.

---

## 4.3. Menu canonical hiện tại

Menu level 1:

1. Trang chủ
2. Về Mây Yoga
3. Các khoá học
4. Kiến thức Yoga
5. Trắc nghiệm

### Các khoá học

- Yoga Online 1:1
- Đào tạo YTT 200H

### Kiến thức Yoga

- Yoga cho người mới
- 90 Tư thế Yoga
- Pranayama
- Thiền định
- Giải phẫu Yoga
- Tự tập tại nhà

Canonical markup cho non-homepage nằm trong hàm `navMarkup()` của:

```text
js/site-header-standard.js
```

---

## 4.4. Hành vi menu level 2

### Desktop / precision pointer

- Hover hoặc focus vào menu cha → submenu mở ngay.
- Có hover bridge để không bị đóng submenu khi di chuột qua khoảng trống.
- Click menu cha → đi tới URL của item đầu tiên.
- `ArrowDown` → focus item đầu submenu.
- `Esc` → đóng submenu.

### Mobile / coarse pointer

- Không có hover.
- Tap menu cha → mở/đóng submenu.
- Mở một submenu → submenu khác đóng.
- User chọn item con để điều hướng.

Không thay đổi behavior này riêng cho một trang.

---

## 4.5. Responsive header hiện tại

### Desktop rộng

Header có:

```text
Logo | Menu | Search | CTA
```

### 981–1200px

Search đầy đủ được ẩn để tránh header quá chật. Đây là behavior hiện tại của chuẩn homepage và shared header.

### 769–980px

Header chuyển sang compact/tablet; Search không hiển thị dạng full input.

### ≤768px

Header compact gồm:

```text
Logo | Search icon | CTA compact | Hamburger
```

Search là nút tròn khoảng 36×36; khi focus/tap sẽ mở input rộng.

Không kết luận “Search bị mất” chỉ bằng cách kiểm tra một breakpoint trung gian. Phải kiểm tra đúng viewport.

---

# 5. Search — quy tắc bắt buộc

Các file:

```text
js/search-index.js
js/search.js
```

`site-header-standard.js` có self-healing:

- nếu thiếu `#navSearch` → tạo;
- nếu thiếu `#globalSearch` → tạo;
- nếu thiếu `#searchDropdown` → tạo;
- nếu thiếu search engine → tự load `search-index.js`, sau đó `search.js`.

Tuy vậy trang mới **nên khai báo search markup đầy đủ** để tránh layout shift và có first paint nhất quán.

---

## 5.1. Thêm bài viết vào Search Index

Khi thêm nội dung cần tìm kiếm, thêm entry vào:

```text
js/search-index.js
```

Dạng hiện tại:

```js
{
  title: "Tiêu đề bài viết",
  tag: "Chủ đề",
  url: "bai-viet/ten-bai-viet.html",
  img: "assets/images/articles/ten-anh.webp",
  time: "8 phút đọc",
  content: "Nội dung text thuần đủ dài để full-text search..."
}
```

### Quy tắc path trong Search Index

URL và image path trong `SEARCH_INDEX` được viết từ site root, **không thêm `../`**:

```text
bai-viet/ten-bai-viet.html
assets/images/articles/ten-anh.webp
```

`search.js` hiện tự prepend `../` khi user đang ở:

```text
/bai-viet/
/trac-nghiem/
```

### Cảnh báo quan trọng

Search engine hiện phù hợp nhất cho:

- root page;
- một cấp `bai-viet/`;
- một cấp `trac-nghiem/`.

**Không tạo route sâu kiểu:**

```text
bai-viet/yoga/nguoi-moi/bai-1.html
```

mà không cập nhật logic base path trong `search.js`, vì link kết quả tìm kiếm có thể sai.

---

# 6. Footer component chuẩn

## 6.1. Source of truth

Footer chuẩn được quản lý bởi:

```text
js/site-chrome.js
```

File này:

- inject style chuẩn;
- normalize logo/path;
- normalize tagline;
- normalize policy link;
- normalize contact link;
- normalize legal text;
- normalize copyright.

### Quy tắc bất biến

**Không tạo CSS footer riêng cho một trang mới.**

Nếu footer một trang trông khác, trước tiên phải tìm CSS legacy của chính trang đó gây conflict. Không sửa component chung nếu component đang đúng.

---

## 6.2. Footer DOM contract

`site-chrome.js` hiện **không tự tạo footer nếu không có `<footer class="footer">`**.

Trang mới bắt buộc có footer shell đúng class.

Các class quan trọng:

```text
.footer
.container
.footer-grid-new
.footer-brand-col
.footer-logo-link
.footer-logo-img
.footer-tagline
.footer-social-icons
.social-icon
.footer-col
.footer-legal
.footer-bottom
```

Cách an toàn nhất khi tạo trang mới:

1. Copy nguyên footer markup từ một trang đang hiển thị chuẩn, ví dụ `bai-viet/yoga-cho-nguoi-moi.html` hoặc một trang vừa được xác nhận.
2. Chỉ sửa relative path nếu cần.
3. Để `site-chrome.js` normalize thành chuẩn cuối.

Không xóa `.footer-legal` hoặc `.footer-bottom`.

Legal text chuẩn:

```text
Chủ quản: Phan Thu Mây | MST: 066195013103
```

Copyright chuẩn:

```text
© 2026 MâyYoga.health — All rights reserved. 🍀
```

---

# 7. Floating Contact — component chuẩn

`site-chrome.js` sẽ:

1. Xóa mọi `.floating-contact` legacy đang có.
2. Tạo lại một cụm canonical duy nhất.

Hiện tại canonical code dùng:

- Zalo: `https://zalo.me/0326808864`
- WhatsApp: `https://wa.me/84326808864`

**Lưu ý:** Trong trao đổi UI đôi khi nút xanh được gọi là “gọi điện”, nhưng code hiện tại là **WhatsApp**, không phải `tel:`.

Nếu business requirement chuyển sang phone call, phải đổi **một lần trong component chung**, không sửa riêng từng trang.

Trang mới không cần tự viết floating-contact riêng nếu `site-chrome.js` được load đúng.

---

# 8. Cách load shared component chuẩn cho trang mới

Khuyến nghị load trực tiếp `site-chrome.js` trong `<head>` để component được chuẩn bị sớm, đồng thời giữ `main.js` cuối body.

## Root page

```html
<head>
  ...
  <link rel="stylesheet" href="css/style.css?v=6">
  <script
    defer
    src="js/site-chrome.js?v=20260721d"
    data-site-chrome-standard="true"
  ></script>
</head>
```

Cuối body:

```html
<script src="js/main.js"></script>
<script src="js/search-index.js"></script>
<script src="js/search.js"></script>
```

## Trang trong `bai-viet/`

```html
<head>
  ...
  <link rel="stylesheet" href="../css/style.css?v=6">
  <script
    defer
    src="../js/site-chrome.js?v=20260721d"
    data-site-chrome-standard="true"
  ></script>
</head>
```

Cuối body:

```html
<script src="../js/main.js"></script>
<script src="../js/search-index.js"></script>
<script src="../js/search.js"></script>
```

### Vì sao vẫn load `main.js`?

`main.js` còn quản lý nhiều behavior chung:

- navbar scroll state;
- mobile menu legacy support;
- reveal animation;
- smooth anchor scroll;
- newsletter;
- các helper dùng chung.

`main.js` sẽ không load duplicate `site-chrome.js` nếu đã thấy:

```html
data-site-chrome-standard="true"
```

---

# 9. Template trang root chuẩn

Dùng template này làm skeleton, sau đó thêm nội dung riêng.

```html
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>TIÊU ĐỀ — Mây Yoga</title>
  <meta name="description" content="MÔ TẢ SEO">
  <link rel="canonical" href="https://mayyoga.health/slug.html">

  <meta property="og:title" content="TIÊU ĐỀ — Mây Yoga">
  <meta property="og:description" content="MÔ TẢ SEO">
  <meta property="og:url" content="https://mayyoga.health/slug.html">
  <meta property="og:type" content="article">
  <meta property="og:image" content="https://mayyoga.health/assets/images/articles/anh.webp">
  <meta property="og:site_name" content="Mây Yoga">
  <meta property="og:locale" content="vi_VN">

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="TIÊU ĐỀ — Mây Yoga">
  <meta name="twitter:description" content="MÔ TẢ SEO">
  <meta name="twitter:image" content="https://mayyoga.health/assets/images/articles/anh.webp">

  <link rel="stylesheet" href="css/style.css?v=6">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link rel="apple-touch-icon" href="apple-touch-icon.png">

  <script defer src="js/site-chrome.js?v=20260721d" data-site-chrome-standard="true"></script>
</head>
<body>

  <nav class="navbar scrolled" id="navbar">
    <div class="container">
      <a href="index.html" class="nav-logo">
        <img src="assets/images/logo.webp" alt="Mây Yoga" class="logo-img">
      </a>

      <ul class="nav-links" id="navLinks"></ul>

      <div class="nav-search" id="navSearch">
        <input type="text" id="globalSearch" placeholder="🔍 Tìm tư thế, bài viết..." autocomplete="off">
        <div class="search-dropdown" id="searchDropdown"></div>
      </div>

      <div class="nav-cta">
        <a href="index.html#blog" class="btn btn-primary btn-sm">Khám phá ngay</a>
      </div>

      <button class="mobile-toggle" id="mobileToggle" aria-label="Menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>

  <main>
    <!-- Nội dung trang -->
  </main>

  <!-- Copy exact canonical footer markup from a known-good page. -->
  <footer class="footer">
    ...
  </footer>

  <script src="js/main.js"></script>
  <script src="js/search-index.js"></script>
  <script src="js/search.js"></script>
</body>
</html>
```

---

# 10. Template bài viết trong `bai-viet/`

```html
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>TIÊU ĐỀ — Mây Yoga</title>
  <meta name="description" content="MÔ TẢ SEO">
  <link rel="canonical" href="https://mayyoga.health/bai-viet/slug.html">

  <meta property="og:title" content="TIÊU ĐỀ — Mây Yoga">
  <meta property="og:description" content="MÔ TẢ SEO">
  <meta property="og:url" content="https://mayyoga.health/bai-viet/slug.html">
  <meta property="og:type" content="article">
  <meta property="og:image" content="https://mayyoga.health/assets/images/articles/anh.webp">
  <meta property="og:site_name" content="Mây Yoga">
  <meta property="og:locale" content="vi_VN">

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="TIÊU ĐỀ — Mây Yoga">
  <meta name="twitter:description" content="MÔ TẢ SEO">
  <meta name="twitter:image" content="https://mayyoga.health/assets/images/articles/anh.webp">

  <link rel="stylesheet" href="../css/style.css?v=6">
  <link rel="icon" type="image/x-icon" href="../favicon.ico">
  <link rel="apple-touch-icon" href="../apple-touch-icon.png">

  <script defer src="../js/site-chrome.js?v=20260721d" data-site-chrome-standard="true"></script>
</head>
<body>

  <nav class="navbar scrolled" id="navbar">
    <div class="container">
      <a href="../index.html" class="nav-logo">
        <img src="../assets/images/logo.webp" alt="Mây Yoga" class="logo-img">
      </a>

      <ul class="nav-links" id="navLinks"></ul>

      <div class="nav-search" id="navSearch">
        <input type="text" id="globalSearch" placeholder="🔍 Tìm tư thế, bài viết..." autocomplete="off">
        <div class="search-dropdown" id="searchDropdown"></div>
      </div>

      <div class="nav-cta">
        <a href="../index.html#blog" class="btn btn-primary btn-sm">Khám phá ngay</a>
      </div>

      <button class="mobile-toggle" id="mobileToggle" aria-label="Menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>

  <header class="article-header">
    <div class="container">
      <div class="breadcrumb">
        <a href="../index.html">Trang chủ</a>
        <span class="sep">›</span>
        <a href="../index.html#categories">Chủ đề</a>
        <span class="sep">›</span>
        <span>Tên bài</span>
      </div>

      <span class="article-tag">🌿 Chủ đề</span>
      <h1>Tiêu đề bài viết</h1>

      <div class="article-meta">
        <span class="meta-item">📅 DD/MM/YYYY</span>
        <span class="meta-item">⏱ N phút đọc</span>
        <span class="meta-item">👤 Mây Yoga</span>
      </div>
    </div>
  </header>

  <main class="article-body">
    <div class="container">
      <!-- Nội dung bài viết -->
    </div>
  </main>

  <!-- Copy exact canonical footer markup from a known-good nested page. -->
  <footer class="footer">
    ...
  </footer>

  <script src="../js/main.js"></script>
  <script src="../js/search-index.js"></script>
  <script src="../js/search.js"></script>
</body>
</html>
```

---

# 11. SEO checklist cho bài/trang mới

Bắt buộc có:

```text
<title>
<meta name="description">
<link rel="canonical">
og:title
og:description
og:url
og:type
og:image
og:site_name
og:locale
twitter:card
twitter:title
twitter:description
twitter:image
```

Khuyến nghị:

- title rõ chủ đề, không keyword stuffing;
- description khoảng 120–160 ký tự tự nhiên;
- canonical phải là URL production;
- OG image dùng absolute URL;
- ảnh hero/article có `alt` có nghĩa;
- thêm JSON-LD phù hợp (`Article`, `WebPage`, v.v.) khi có thể.

Không bịa nguồn nghiên cứu, số liệu y khoa hoặc tuyên bố sức khỏe. Với claim chuyên môn cần nguồn đáng tin cậy.

---

# 12. Quy tắc responsive

Mọi trang mới phải kiểm tra ít nhất các nhóm viewport:

```text
Desktop rộng:   >1200px
Laptop:         981–1200px
Tablet:         769–980px
Mobile:         <=768px
Mobile nhỏ:     <=420/480px
```

## Bắt buộc kiểm tra

- không horizontal overflow;
- header không chồng content;
- menu level 2 không tràn màn hình;
- search dropdown không tràn viewport;
- CTA không đè hamburger;
- footer không có khoảng trắng dư phía dưới;
- `.footer-legal` không rớt dòng vô lý;
- floating contact không chiếm document flow;
- ảnh không làm vỡ tỷ lệ;
- text không bị cắt;
- card/grid không tạo min-width gây overflow.

---

# 13. Quy tắc interaction và performance

## Không hijack wheel dọc

Không biến wheel dọc thành scroll ngang trừ khi có yêu cầu UX cực kỳ rõ ràng.

Carousel ngang nên dùng:

- native horizontal scroll;
- swipe/touch;
- button left/right trên desktop;
- peek/progress/hint trên mobile.

Không dùng hover `translateY()` trên card nằm trong vùng user thường scroll qua nếu nó có thể tạo hover-jitter.

## Touch

Khi có carousel ngang:

```css
touch-action: pan-x pan-y;
overscroll-behavior-x: contain;
overscroll-behavior-y: auto;
```

## Motion

Tôn trọng:

```css
@media (prefers-reduced-motion: reduce)
```

Không dùng animation liên tục nặng nếu không cần.

## Lazy load

- Hero/ảnh nhìn thấy ngay: `loading="eager"` hoặc preload khi thật sự cần.
- Ảnh below-the-fold: `loading="lazy"`.
- Nếu UI cố tình để lộ card kế tiếp ngay first view, ảnh card kế tiếp có thể cần eager để không hiện vùng trắng.

---

# 14. Quy tắc CSS cho trang mới

Ưu tiên:

1. dùng class đã có trong `style.css`;
2. tạo class theo namespace riêng của page nếu thực sự cần;
3. dùng media query rõ ràng;
4. tránh selector quá rộng như `body p`, `img`, `.container` nếu chỉ muốn tác động một section.

Ví dụ tốt:

```css
.anatomy-page .anatomy-card { ... }
```

Ví dụ nguy hiểm:

```css
.footer { ... }
.navbar { ... }
.container { ... }
img { ... }
```

trong inline style của một trang.

Không override component chung bằng `!important` nếu không phải compatibility fix có lý do rõ ràng.

---

# 15. Khi thêm item mới vào menu

Đây là phần rất dễ làm lệch homepage và trang con.

Nếu thêm/xóa/đổi tên menu item, phải kiểm tra **ít nhất hai source**:

## Homepage menu

Source homepage nằm ở:

```text
_includes/index-source.html
```

`index.html` có thể dùng Liquid `replace` để tinh chỉnh link/menu.

## Non-homepage canonical menu

Nằm trong:

```text
js/site-header-standard.js
```

Hàm:

```text
navMarkup()
```

### Active state

Nếu thêm một root page thuộc “Kiến thức Yoga”, cần cập nhật classification trong:

```text
markActive()
```

Ví dụ danh sách `knowledgePages`.

Nếu chỉ thêm bài trong `bai-viet/`, prefix `/bai-viet/` hiện đã được nhận là nhóm Kiến thức Yoga.

### Search

Nếu page mới cần tìm được, thêm entry vào `js/search-index.js`.

**Không chỉ sửa menu ở một trang HTML riêng lẻ.** Runtime component sẽ ghi đè hoặc khiến các trang khác không đồng bộ.

---

# 16. Khi thêm bài viết mới vào “Kiến thức Yoga”

Workflow chuẩn:

1. Tạo file dưới `bai-viet/slug.html` nếu là bài viết nội dung.
2. Dùng shared header shell.
3. Dùng `.article-header` và `.article-body` khi phù hợp.
4. Copy canonical footer markup từ trang nested đang chuẩn.
5. Load `site-chrome.js`, `main.js`, `search-index.js`, `search.js` đúng prefix `../`.
6. Thêm SEO meta.
7. Thêm JSON-LD nếu phù hợp.
8. Tạo/đặt ảnh trong `assets/images/articles/`.
9. Thêm entry `SEARCH_INDEX`.
10. Nếu bài cần xuất hiện trên homepage/card/listing thì cập nhật đúng listing, không hard-code ngoài hệ thống liên quan.
11. Kiểm tra active parent “Kiến thức Yoga”.
12. Kiểm tra desktop/mobile.

---

# 17. Khi tạo một hub/category page mới ở root

Ví dụ kiểu:

```text
giai-phau-yoga.html
tu-tap-tai-nha.html
tu-the-yoga.html
```

Workflow:

1. Tạo file root.
2. Dùng asset path không có `../`.
3. Dùng shared header/footer/component.
4. Nếu thuộc “Kiến thức Yoga”, thêm URL vào `knowledgePages` trong `site-header-standard.js` nếu cần parent active.
5. Nếu thêm vào menu, update cả homepage menu và `navMarkup()`.
6. Thêm Search Index nếu cần.
7. Kiểm tra fixed/sticky header offset của hero/category nav.

---

# 18. Homepage — quy tắc đặc biệt khi AI chỉnh sửa

Homepage là vùng dễ regression nhất.

## Không làm

- Không thay root `index.html` bằng source HTML đầy đủ.
- Không bỏ front matter.
- Không xóa Liquid include/replace mà chưa hiểu lý do.
- Không gộp/refactor hàng loạt các CSS layer chỉ để “code sạch hơn” nếu không có yêu cầu.
- Không thay hero desktop đã được duyệt khi chỉ sửa mobile.
- Không sửa footer component chung chỉ để khắc phục xung đột CSS riêng homepage.

## Khi cần chỉnh source HTML homepage

Đọc cả:

```text
index.html
_includes/index-source.html
```

Xác định thay đổi nên nằm ở source hay wrapper replacement.

## Jekyll/Liquid

Homepage phụ thuộc vào Jekyll/Liquid processing. Repository hiện không có `.nojekyll`.

Không thêm `.nojekyll` nếu không chủ ý thay đổi toàn bộ deployment architecture.

---

# 19. Shared component — khi nào được sửa

## `js/site-chrome.js`

Chỉ sửa khi yêu cầu là thay đổi toàn site về:

- Footer;
- floating contact;
- bootstrap shared header.

Không sửa file này để xử lý layout riêng của một page.

## `js/site-header-standard.js`

Chỉ sửa khi yêu cầu là thay đổi toàn site về:

- menu structure;
- header visual;
- Search UI;
- CTA;
- hamburger;
- active state;
- submenu interaction;
- breakpoint behavior.

## Cache key

Khi thay đổi component và browser/CDN cache có thể giữ bản cũ:

- bump query version trong loader gọi nó;
- tìm tất cả nơi đang gọi bản cũ;
- đồng bộ version để tránh page A dùng component mới, page B dùng component cache cũ.

Ví dụ hiện tại shared chrome/header dùng key dạng:

```text
20260721d
```

Không xem string này là version semantic; nó là cache-busting key.

---

# 20. Không dựa vào legacy fallback khi tạo trang mới

Một số trang cũ có cấu trúc khác nhau:

- có trang load `main.js`;
- có trang chỉ load `search.js`;
- có trang source header thiếu Search;
- có trang giữ floating contact SVG cũ.

Shared component đã có fallback để tự sửa runtime.

**Trang mới không được cố tình bắt chước legacy.**

Mục tiêu của trang mới là sạch ngay từ source:

```text
correct header shell
+ correct search markup
+ canonical footer shell
+ direct shared chrome load
+ main.js
+ search scripts
```

Fallback chỉ để cứu trang cũ.

---

# 21. Definition of Done — checklist bắt buộc cho AI

Trước khi báo hoàn thành một trang/bài mới, phải tự rà:

## Structure

- [ ] Đúng route root hoặc `bai-viet/`.
- [ ] Không tạo nesting sâu ngoài khả năng search path hiện tại.
- [ ] Load `style.css` đúng prefix.
- [ ] Có `#navbar` và `.container`.
- [ ] Có logo shell đúng path.
- [ ] Có `#navLinks`.
- [ ] Có `#navSearch`, `#globalSearch`, `#searchDropdown`.
- [ ] Có `.nav-cta`.
- [ ] Có `#mobileToggle`.
- [ ] Có `<footer class="footer">` canonical shell.
- [ ] Load shared chrome.
- [ ] Load `main.js`.
- [ ] Search scripts có hoặc shared header có thể self-heal.

## Header/Menu

- [ ] Desktop rộng có Search.
- [ ] Breakpoint trung gian đúng behavior chuẩn.
- [ ] Mobile có Search icon + CTA + hamburger.
- [ ] Level-2 desktop hover mở ngay.
- [ ] Mobile tap mở submenu.
- [ ] Active parent đúng nhóm.

## Footer/Contact

- [ ] Footer giống component chung.
- [ ] Không có page-specific footer CSS.
- [ ] Không có khoảng trắng dư dưới footer.
- [ ] Legal text không bị wrap xấu.
- [ ] Chỉ có một `.floating-contact` sau runtime.
- [ ] Zalo đúng link.
- [ ] WhatsApp đúng link hiện hành.

## SEO

- [ ] Title.
- [ ] Description.
- [ ] Canonical.
- [ ] OG metadata.
- [ ] Twitter metadata.
- [ ] `alt` ảnh.
- [ ] JSON-LD khi phù hợp.

## Search

- [ ] Có entry trong `SEARCH_INDEX` nếu nội dung cần searchable.
- [ ] URL trong index không dùng `../`.
- [ ] Image path trong index không dùng `../`.
- [ ] Search từ root page hoạt động.
- [ ] Search từ `bai-viet/` hoạt động.

## Responsive

- [ ] >1200px.
- [ ] 981–1200px.
- [ ] 769–980px.
- [ ] <=768px.
- [ ] <=420/480px.
- [ ] Không horizontal overflow.
- [ ] Không content bị fixed header che.
- [ ] Không card/grid vỡ.

## Performance/UX

- [ ] Hero/above-fold image không lazy sai cách.
- [ ] Below-fold image dùng lazy khi phù hợp.
- [ ] Không wheel hijacking.
- [ ] Không hover-jitter.
- [ ] Touch scroll đúng trục.
- [ ] Reduced motion được tôn trọng nếu có animation.

## Git verification

- [ ] Fetch lại file sau khi write.
- [ ] Xác nhận commit SHA thật.
- [ ] Không nói “đã deploy” nếu chưa kiểm tra deployment.
- [ ] Không nói “pixel-perfect” nếu chưa render browser.

---

# 22. Quy tắc dành riêng cho AI agent

Khi user yêu cầu “tạo bài mới”, AI phải tự động làm các bước sau, không chờ user nhắc từng bước:

1. Đọc tài liệu này.
2. Đọc ít nhất một trang cùng loại đang hoạt động tốt.
3. Kiểm tra component version hiện tại trước khi copy cache key.
4. Tạo nội dung và file đúng route.
5. Áp shared chrome.
6. Áp search.
7. Áp SEO.
8. Cập nhật menu/listing/search index nếu yêu cầu nội dung cần xuất hiện ở đó.
9. Kiểm tra relative path.
10. Fetch lại file sau commit.
11. Báo rõ những gì đã xác minh bằng source và những gì chưa thể xác minh bằng browser/deployment.

Nếu có mâu thuẫn giữa một trang legacy và component chung:

> **Component chung là chuẩn, không lấy trang legacy làm chuẩn.**

Nếu có mâu thuẫn giữa homepage approved design và một trang con cũ:

> **Homepage approved design + canonical shared component là chuẩn.**

---

# 23. Quick reference

## Canonical/shared files

```text
css/style.css
js/main.js
js/site-chrome.js
js/site-header-standard.js
js/search-index.js
js/search.js
```

## Homepage special files

```text
index.html
_includes/index-source.html
css/index-nav-v2.css
js/index-nav-v2.js
```

## Shared chrome ownership

```text
Header/Menu/Search → js/site-header-standard.js
Footer             → js/site-chrome.js
Floating Contact   → js/site-chrome.js
Search Index       → js/search-index.js
Search Engine      → js/search.js
Shared behaviors   → js/main.js
```

## Current contact targets

```text
Zalo:     https://zalo.me/0326808864
WhatsApp: https://wa.me/84326808864
Email:    phanthumay.yoga500@gmail.com
```

## Current owner/legal

```text
Chủ quản: Phan Thu Mây
MST: 066195013103
```

---

# 24. Tư duy bảo trì dài hạn

Mục tiêu kiến trúc từ nay:

```text
Một nguồn chuẩn
      ↓
Nhiều trang dùng chung
      ↓
Không copy-paste divergence
      ↓
Sửa một lần, toàn site đồng bộ
```

Khi gặp một trang khác chuẩn, ưu tiên hỏi:

1. Trang đó thiếu component bootstrap?
2. DOM contract có thiếu node?
3. CSS legacy có override component?
4. Cache key có cũ?
5. Relative path có sai?

Không lập tức sửa component chung nếu chỉ một trang lỗi.

---

**Tài liệu này là source of truth cho AI/developer khi tạo hoặc sửa page-level architecture của Mây Yoga.**
