# Navigation và Search

## Source of truth

| Phần | Owner |
|---|---|
| Menu structure và URL | `js/site-navigation-canonical-v3.js` |
| Header DOM và dropdown | `js/site-navigation-canonical-v3.js` |
| Mobile menu và active state | `js/site-navigation-canonical-v3.js` |
| Context CTA | `js/site-navigation-canonical-v3.js` |
| Search input/dropdown shell | `js/site-navigation-canonical-v3.js` |
| Search behavior | `js/search.js` |
| Search content data | `js/search-index.js` |
| Pose entries trong search | `js/pose-catalog.js` → `js/search-index.js` |

File canonical có tên V3 nhưng implementation hiện tại là V6.

## `NAV_ITEMS`

`NAV_ITEMS` là mảng config trong canonical component. Item thường có:

```js
{ label: 'Tên mục', href: 'duong-dan.html' }
```

Dropdown có `children`. Parent dropdown là link thật đến trang hữu ích; không
dùng link rỗng. `divider: true` chỉ điều khiển class trình bày của child.

Khi sửa menu:

1. Sửa một lần trong `NAV_ITEMS`.
2. Kiểm tra URL file tồn tại.
3. Kiểm tra active state cho route mới.
4. Nếu page thuộc nhóm mới, cập nhật `knowledgePages` hoặc `coursePages` trong
   cùng canonical component khi cần.
5. Không sửa HTML hàng loạt để chép menu.

## Active state

Canonical component:

- so sánh pathname đã normalize;
- gắn `aria-current="page"` cho link trùng;
- gắn `has-current-child` cho dropdown cha;
- xem `bai-viet/` và `tu-the/` là nhóm kiến thức;
- xem `trac-nghiem/` là nhóm trắc nghiệm.

Không thêm active-state script trong page.

## Context CTA

CTA mặc định trỏ tới `index.html#categories`. Một số route có CTA được cấu hình
trong canonical component. Page có thể override bằng body attributes:

```html
<body data-nav-cta-label="Tên CTA"
      data-nav-cta-href="#section-id">
```

Tùy chọn `data-nav-cta-target` và `data-nav-cta-rel` dành cho URL ngoài.

## Mobile menu và dropdown

Canonical component dùng một delegated click handler cho:

- hamburger;
- dropdown trên viewport nhỏ, coarse pointer hoặc không hover;
- đóng menu khi chọn link;
- Escape và resize.

HTML không được tự toggle class `active`/`open` trên `mobileToggle` hoặc
`navLinks`. Không tự thay trạng thái `scrolled` của navbar.

## Search asset flow

Search shell được canonical navigation dựng. Sau đó navigation tải theo thứ tự:

```text
pose-catalog.js
  → search-index.js
      → search.js
```

Không tải các file này trực tiếp trong HTML. `main.js` tải canonical navigation,
và navigation tự bảo đảm search assets.

## Search index

`js/search-index.js` có hai nguồn:

1. `contentEntries`: bài viết, hub, khóa học và trắc nghiệm được quản lý thủ công.
2. `poseEntries()`: sinh từ `MAY_YOGA_POSE_CATALOG`.

Kết quả được de-duplicate theo URL và publish qua `window.SEARCH_INDEX`.

### Thêm bài viết hoặc page

Thêm một `entry(...)` vào `contentEntries` với:

- title;
- tag;
- URL từ site root;
- image từ site root;
- keywords;
- read time nếu cần.

Ví dụ URL hợp lệ trong index:

```text
bai-viet/ten-bai.html
assets/images/articles/ten-anh.webp
```

Không dùng `../` trong search index.

### Pose search

Không thêm hoặc sửa 88 pose entry bằng tay. Sửa pose data/catalog theo
`pose-system.md`; search sẽ tái sinh từ catalog.

## Những cách làm bị cấm

- Viết menu hoặc dropdown vào từng HTML.
- Dùng parent dropdown không có URL thật.
- Tải direct canonical navigation, site chrome hoặc search scripts trong page.
- Dùng compatibility shim làm component chính.
- Viết handler `mobileToggle`, `navLinks` hoặc navbar scroll state trong HTML.
- Fork menu riêng cho homepage.
- Đưa pose list viết tay vào `contentEntries`.
- Thêm prefix thư mục hiện tại vào URL search.
- Cho `links.html` dùng full site navigation/search.

## Kiểm tra

```bash
node --check js/site-navigation-canonical-v3.js
node --check js/search.js
node --check js/search-index.js
node --check js/pose-catalog.js
node scripts/normalize-navigation-shells.mjs
node scripts/audit-site-structure.mjs
```

Migration lần cuối phải cập nhật `0 file`.
