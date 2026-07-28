# Kiến trúc hiện tại

Tài liệu này mô tả source tại commit nền
`4ec156e07527ff7e7ab6a5054f19b137e3f27422`. Khi code thay đổi, phải đối chiếu
lại source trước khi cập nhật tài liệu.

## Tổng quan runtime

```text
HTML page
  └─ js/main.js
      ├─ js/site-navigation-canonical-v3.js
      │   ├─ Header DOM
      │   ├─ NAV_ITEMS và dropdown
      │   ├─ Mobile navigation
      │   ├─ Active state
      │   ├─ Context CTA
      │   └─ Search asset loading
      │       ├─ js/pose-catalog.js
      │       ├─ js/search-index.js
      │       └─ js/search.js
      └─ js/site-chrome.js
          ├─ Footer
          ├─ Floating contact
          ├─ Breadcrumb stylesheet
          └─ js/article-share-standard.js
```

```text
js/poses-data.js
  └─ js/pose-catalog.js
      ├─ js/pose-library.js
      └─ js/search-index.js
```

`main.js` còn sở hữu một số behavior chung của homepage và nội dung như smooth
anchor, hero enhancement, hover hint và newsletter. Nó không sở hữu menu.

## Ownership

| File | Trách nhiệm |
|---|---|
| `js/main.js` | Entry point và bootstrap chung |
| `js/site-navigation-canonical-v3.js` | Header, menu, dropdown, mobile nav, active state, CTA, search shell và tải search assets |
| `js/site-chrome.js` | Footer/Floating Contact markup và runtime CSS, breadcrumb CSS và article-share bootstrap |
| `js/article-share-standard.js` | Render và xử lý nút chia sẻ bài viết |
| `js/search.js` | Chuẩn hóa truy vấn, scoring, render và interaction search |
| `js/search-index.js` | `contentEntries` và pose entries sinh từ catalog |
| `js/poses-data.js` | Dữ liệu gốc của 88 tư thế và 9 nhóm |
| `js/pose-catalog.js` | Catalog chuẩn hóa, slug và URL helper |
| `js/pose-library.js` | Render/filter/interaction cho `tu-the-yoga.html` |
| `index.html` | Homepage tĩnh và dependency riêng của homepage |
| `links.html` | Link-in-bio độc lập, không dùng full site chrome |

## Canonical Navigation V6 và tên file V3

`js/site-navigation-canonical-v3.js` có tên V3 vì lịch sử filename, nhưng source
khai báo Canonical Site Navigation V6 và `data-canonical-nav-version="6"`.
Không đổi ownership chỉ dựa vào tên file.

Các file sau là compatibility shim:

- `js/site-navigation-canonical-v2.js`
- `js/site-navigation-p0-v1.js`
- `js/site-header-standard.js`

Chúng chỉ forward tới runtime canonical. Không thêm menu, active-state, search
hoặc mobile behavior vào shim.

`js/search-base.js` cũng là shim, chỉ forward tới `js/search.js`.

## HTML contract

Mọi public page thông thường có đúng một shell:

```html
<nav class="navbar site-header-standard scrolled"
     id="navbar"
     data-site-header-standard="true"></nav>
```

Canonical navigation thay toàn bộ subtree của shell bằng logo, menu, search,
CTA và hamburger. Vì vậy HTML không chứa menu fallback và không gắn handler
navigation.

Trang có footer dùng:

```html
<footer class="footer"></footer>
```

`site-chrome.js` chỉ normalize footer khi shell tồn tại. Floating contact được
runtime xóa bản cũ và tạo lại một instance canonical.

Footer markup nằm trong `footerMarkup()`, Floating Contact markup nằm trong
`floatingContactMarkup()`, còn runtime CSS của cả hai nằm trong
`ensureChromeStyles()`. Block style runtime dùng nhiều `!important`.
`css/style-base.css` vẫn giữ fallback/shared base styles nhưng không phải style
owner duy nhất; khi đổi component phải sửa runtime owner trước rồi đối chiếu
fallback để tránh drift hoặc override thứ ba.

## Bootstrap contract

- Public page thông thường tải đúng một `main.js`.
- Root page: `js/main.js`.
- Page sâu một cấp: `../js/main.js`.
- Không tải trực tiếp canonical navigation, site chrome hoặc search assets.
- Page-specific JavaScript có thể tải riêng sau `main.js`.
- `links.html` và Google verification artifact là hai ngoại lệ không tải
  `main.js`.

Hiện repository có 159 file HTML: 157 trang thông thường, `links.html` và một
Google verification artifact.

## Search flow

1. Canonical navigation dựng `#globalSearch` và `#searchDropdown`.
2. Navigation bảo đảm `pose-catalog.js` có mặt.
3. Navigation tải `search-index.js`.
4. Search index ghép `contentEntries` với pose entries từ catalog.
5. Navigation tải `search.js`.
6. Search engine bind input và render tối đa 8 kết quả.

URL trong index là path tính từ site root. `search.js` chuyển chúng thành URL
tuyệt đối qua site root; không tự ghép prefix theo thư mục hiện tại.

## Pose flow

`poses-data.js` hiện có đúng 88 record. `pose-catalog.js`:

- copy categories và poses;
- ánh xạ tên category;
- chuẩn hóa slug tiếng Việt;
- áp dụng override cho trường hợp đặc biệt;
- trả URL dạng `tu-the/<slug>.html`.

`pose-library.js` và `search-index.js` cùng dùng catalog. Mỗi URL catalog hiện
có một file HTML tương ứng và xuất hiện trong sitemap.

## Homepage và trang độc lập

`index.html` là HTML tĩnh hoàn chỉnh, không dùng Liquid/Jekyll source song song.
Homepage có nhiều CSS/JS riêng; không dùng chúng làm component chung nếu chưa
xác định ownership.

`links.html` chỉ tải `css/links-page-v2.css`, đặt
`data-site-navigation="off"` và `data-site-chrome="off"`. Không thêm navbar,
`main.js`, search hoặc footer canonical vào trang này.

## Migration và audit

- `scripts/normalize-navigation-shells.mjs`: migration có side effect, chuẩn hóa
  public HTML và phải idempotent.
- `scripts/audit-site-structure.mjs`: audit read-only cho runtime architecture.
- `scripts/audit-docs.mjs`: audit read-only cho link, file reference, semantic
  architecture guidance và template.

Các template trong `docs/templates/` là source mẫu, không phải public page và
được loại khỏi migration/audit public HTML.
