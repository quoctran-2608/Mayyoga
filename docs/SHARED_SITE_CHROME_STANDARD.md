# Mây Yoga — Shared Site Chrome Standard

> Tài liệu này bổ sung cho `architecture.md`. Nếu có khác biệt, source hiện tại
> và `architecture.md` được ưu tiên.

## Kiến trúc canonical

```text
HTML page
  └─ js/main.js
      ├─ js/site-navigation-canonical-v3.js
      │   ├─ Header/Menu/Search shell/CTA
      │   └─ search asset loading
      └─ js/site-chrome.js
          ├─ breadcrumb stylesheet
          ├─ canonical Footer
          ├─ canonical Floating Contact
          └─ js/article-share-standard.js
```

File navigation có tên V3 nhưng implementation hiện tại là Canonical Navigation
V6.

## Header, menu và search shell

Source of truth:

```text
js/site-navigation-canonical-v3.js
```

File này sở hữu:

- `NAV_ITEMS`, URL và dropdown;
- Header DOM;
- active/current state;
- desktop/mobile interaction;
- hamburger;
- context CTA;
- search input/dropdown shell;
- thứ tự tải pose catalog, search index và search engine.

HTML chỉ chứa:

```html
<nav class="navbar site-header-standard scrolled"
     id="navbar"
     data-site-header-standard="true"></nav>
```

Không sửa menu riêng trong `index.html` hoặc child page. Không tải direct file
canonical; `main.js` là bootstrap.

Các file V2, P0 và `site-header-standard.js` chỉ là shim. Không thêm logic mới.

## Footer và Floating Contact

Ownership hiện hành:

| Phần | Owner |
|---|---|
| Footer markup | `js/site-chrome.js` → `footerMarkup()` |
| Floating Contact markup | `js/site-chrome.js` → `floatingContactMarkup()` |
| Runtime Footer/Floating Contact CSS | `js/site-chrome.js` → `ensureChromeStyles()` |
| Fallback/shared base styles | `css/style-base.css` |

Page mới dùng:

```html
<footer class="footer"></footer>
```

`site-chrome.js` normalize shell thành canonical footer. `ensureChromeStyles()`
inject block `#may-yoga-site-chrome-v2` với nhiều declaration `!important`, nên
chỉ sửa `css/style-base.css` có thể không đổi giao diện runtime.

Khi đổi Footer hoặc Floating Contact toàn site:

1. sửa markup trong `footerMarkup()` hoặc `floatingContactMarkup()`;
2. sửa runtime CSS trong `ensureChromeStyles()`;
3. đối chiếu fallback/shared base styles trong `css/style-base.css` để tránh hai
   lớp drift nhau;
4. không tạo override thứ ba và không đồng bộ bằng cách sửa từng HTML.

`css/style-base.css` không phải owner duy nhất của Footer/Floating Contact.
`site-chrome.js` xóa các instance `.floating-contact` cũ và tạo một instance
canonical gồm Zalo và WhatsApp; page mới không cần shell contact.

## Breadcrumb

`site-chrome.js` bảo đảm load `css/breadcrumb-canonical-v1.css`. DOM contract
nằm trong `BREADCRUMB_STANDARD.md`.

## Article Share

`site-chrome.js` bootstrap `js/article-share-standard.js`. Article page nên có:

```html
<div class="article-share" aria-label="Chia sẻ bài viết"></div>
```

Component cũng có thể tự tạo shell cho page nhận diện là Article. Không hard-code
share icon hoặc URL.

## Homepage

`index.html` là source tĩnh duy nhất của homepage. Homepage có nội dung, Hero và
asset riêng, nhưng không có implementation riêng cho navigation, search, footer,
floating contact hoặc article share.

## `links.html`

`links.html` là ngoại lệ độc lập:

- không navbar canonical;
- không `main.js`;
- không shared site chrome;
- không shared search;
- chỉ dùng asset riêng của link-in-bio.

## Definition of Done

- [ ] Header/menu thay đổi ở một canonical source.
- [ ] Footer/contact/share thay đổi ở đúng owner.
- [ ] Không direct-load runtime trong HTML.
- [ ] Không có inline navigation handler.
- [ ] Page thông thường có đúng một `main.js`.
- [ ] `links.html` vẫn độc lập.
- [ ] Migration lần cuối cập nhật 0 file.
- [ ] Audit site có 0 lỗi và 0 cảnh báo.
