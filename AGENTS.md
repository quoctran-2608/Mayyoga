# Mây Yoga — Quy tắc bắt buộc cho AI coding agent

Tài liệu này có hiệu lực cao nhất đối với mọi AI agent sửa repository.

## Bắt buộc đọc trước khi sửa

Đọc theo thứ tự:

1. `AGENTS.md`
2. `README.md`
3. `docs/architecture.md`
4. Tài liệu đúng với loại nhiệm vụ trong `docs/README.md`

Nếu sửa giao diện, đọc thêm `docs/VISUAL_DESIGN_SYSTEM.md`. Nếu sửa breadcrumb,
homepage, shared chrome hoặc deployment, đọc tài liệu chuyên biệt tương ứng trong
`docs/`.

Không suy luận kiến trúc từ tên version của file. Luôn đọc source hiện tại.

## Quy tắc Git

- Luôn tạo và push backup branch từ HEAD trước khi thay đổi.
- Không force-push.
- Không reset làm mất lịch sử.
- Không sửa hoặc amend commit cũ nếu không được yêu cầu.
- Kiểm tra `git diff` và `git diff --check` trước commit.
- Không thêm workflow, dependency hoặc build system nếu không cần.
- Chỉ commit file thuộc phạm vi nhiệm vụ.

## Quy tắc navigation

- Không viết menu vào HTML.
- Trang thông thường chỉ chứa navbar shell:

```html
<nav class="navbar site-header-standard scrolled"
     id="navbar"
     data-site-header-standard="true"></nav>
```

- Không dùng `href="#"` cho dropdown.
- Không viết JavaScript xử lý `mobileToggle`, `navLinks` hoặc
  `navbar.scrolled` trong HTML.
- Chỉ sửa cấu trúc, URL và hành vi menu trong
  `js/site-navigation-canonical-v3.js`.
- File trên có tên V3 nhưng implementation hiện tại là Canonical Navigation V6.
- Không thêm logic mới vào `js/site-navigation-canonical-v2.js`,
  `js/site-navigation-p0-v1.js` hoặc `js/site-header-standard.js`; chúng chỉ là
  compatibility shim.
- `links.html` là link-in-bio độc lập: không thêm full navbar hoặc shared site
  chrome vào trang này.

## Quy tắc bootstrap

- Mỗi trang thông thường tải đúng một `main.js`.
- Root page dùng `js/main.js`; page sâu một cấp dùng `../js/main.js`.
- Không tải trực tiếp canonical navigation, site chrome, search hoặc shim trong
  HTML. `main.js` là entry point.
- `links.html` và Google verification artifact không tải `main.js`.
- JavaScript riêng của trang được tải ngoài `main.js`, sau khi xác định rõ
  ownership và tránh bootstrap trùng.

## Quy tắc CSS

- Không thêm override chỉ để che lỗi cascade.
- Ưu tiên sửa file sở hữu component.
- Footer/Floating Contact hiện lấy runtime CSS từ
  `js/site-chrome.js` → `ensureChromeStyles()`. `css/style-base.css` chỉ còn
  fallback/shared base styles, không phải style owner duy nhất.
- CSS trang mới phải scoped theo body class hoặc component class.
- Không sửa shared CSS nếu thay đổi chỉ dành cho một trang.
- Không tạo chuỗi file `final`, `fix`, `new`, `v2` chồng lên cùng selector.
- Nếu tạo file CSS mới, ghi rõ owner và chỉ load ở trang cần nó.

## Quy tắc search và tư thế

- Không viết tay danh sách 88 tư thế trong search.
- `js/poses-data.js` là dữ liệu tư thế gốc.
- `js/pose-catalog.js` là catalog chuẩn hóa và URL helper dùng chung.
- `js/pose-library.js` render thư viện tại `tu-the-yoga.html`.
- `js/search-index.js` phải sinh pose entry từ pose catalog.
- `js/search.js` chỉ sở hữu hành vi tìm kiếm.
- Không đổi số 88 nếu dữ liệu thực tế chưa thay đổi.
- Khi thêm hoặc sửa pose, kiểm tra dữ liệu, slug, file `tu-the/*.html`, URL
  trùng, search và sitemap.

## Quy tắc tạo trang và bài viết

- Dùng template chính thức trong `docs/templates/`.
- Có `title`, meta description, canonical, Open Graph, Twitter và JSON-LD phù
  hợp.
- Đường dẫn tương đối phải đúng theo độ sâu thư mục.
- Dùng navbar shell và footer shell; không sao chép menu, search, footer behavior
  hoặc navigation script từ trang cũ.
- Bài viết trong `bai-viet/` dùng `../js/main.js`.
- Không đưa số liệu y khoa không có nguồn; không khẳng định tác dụng điều trị.
- Cập nhật `sitemap.xml` khi thêm URL công khai.
- Với trắc nghiệm, kiểm tra cả `sitemap-trac-nghiem.xml`.
- Thêm bài viết/hub vào `contentEntries` của `js/search-index.js` nếu cần xuất
  hiện trong search. Không thêm pose tại đây.

## Source of truth

| Chức năng | Source of truth |
|---|---|
| Bootstrap chung | `js/main.js` |
| Header, menu, dropdown, mobile nav, active state, CTA, search shell | `js/site-navigation-canonical-v3.js` |
| Footer/Floating Contact markup và runtime CSS, article share bootstrap, breadcrumb CSS | `js/site-chrome.js` |
| Search behavior | `js/search.js` |
| Search content index | `js/search-index.js` |
| Pose data | `js/poses-data.js` |
| Pose catalog và URL helper | `js/pose-catalog.js` |
| Pose library rendering | `js/pose-library.js` |
| Homepage source | `index.html` |
| Pose library page | `tu-the-yoga.html` |

## Kiểm tra trước commit

```bash
node scripts/normalize-navigation-shells.mjs
node scripts/audit-site-structure.mjs
node scripts/audit-docs.mjs
git diff --check
```

Migration lần cuối phải cập nhật `0 file`. Audit site phải có `0` lỗi và `0`
cảnh báo. Không tuyên bố đã test browser, screenshot hoặc deployment nếu chưa
thực sự làm.
