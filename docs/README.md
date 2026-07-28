# Mục lục tài liệu Mây Yoga

Đọc `../AGENTS.md` trước mọi thay đổi. Sau đó chọn tài liệu theo nhiệm vụ.

## Tài liệu canonical

| Tài liệu | Dùng khi |
|---|---|
| [`architecture.md`](architecture.md) | Cần hiểu ownership, bootstrap và luồng runtime |
| [`creating-pages.md`](creating-pages.md) | Tạo root page hoặc nested page |
| [`writing-articles.md`](writing-articles.md) | Tạo hoặc sửa bài trong `bai-viet/` |
| [`navigation-and-search.md`](navigation-and-search.md) | Sửa menu, active state, CTA hoặc search |
| [`pose-system.md`](pose-system.md) | Thêm, sửa hoặc kiểm tra tư thế |
| [`seo-and-sitemaps.md`](seo-and-sitemaps.md) | SEO, JSON-LD, robots và sitemap |
| [`code-quality.md`](code-quality.md) | Migration, audit, CSS/JS ownership và kiểm tra |
| [`templates/`](templates/README.md) | Sao chép template HTML chính thức |

## Tài liệu chuyên biệt còn hiệu lực

- [`BREADCRUMB_STANDARD.md`](BREADCRUMB_STANDARD.md): DOM và style breadcrumb.
- [`VISUAL_DESIGN_SYSTEM.md`](VISUAL_DESIGN_SYSTEM.md): ngôn ngữ thị giác.
- [`HOMEPAGE_STATIC_SOURCE_STANDARD.md`](HOMEPAGE_STATIC_SOURCE_STANDARD.md):
  quy tắc riêng của `index.html`.
- [`SHARED_SITE_CHROME_STANDARD.md`](SHARED_SITE_CHROME_STANDARD.md): header,
  footer, contact và share.
- [`DEPLOYMENT_ENVIRONMENT_STANDARD.md`](DEPLOYMENT_ENVIRONMENT_STANDARD.md):
  môi trường preview và production mục tiêu.

## Đọc theo nhiệm vụ

- **Tạo trang:** `architecture.md` → `creating-pages.md` →
  `seo-and-sitemaps.md` → template phù hợp.
- **Viết bài:** `architecture.md` → `writing-articles.md` →
  `navigation-and-search.md` → `seo-and-sitemaps.md`.
- **Sửa navigation/search:** `architecture.md` →
  `navigation-and-search.md` → `code-quality.md`.
- **Sửa pose:** `pose-system.md` → `navigation-and-search.md` →
  `seo-and-sitemaps.md`.
- **Sửa giao diện:** tài liệu theo loại trang + `VISUAL_DESIGN_SYSTEM.md`.

## Kiểm kê tài liệu cũ ngày 28/07/2026

- `AI_DEVELOPMENT_GUIDE.md` từng trộn kiến trúc, template, SEO và visual rules;
  nhiều phần đã lỗi thời. File được giữ làm redirect deprecated vì agent cũ có
  thể vẫn tham chiếu.
- `SHARED_SITE_CHROME_STANDARD.md`, `HOMEPAGE_STATIC_SOURCE_STANDARD.md` và
  `DEPLOYMENT_ENVIRONMENT_STANDARD.md` còn giá trị nhưng đã được cập nhật theo
  bootstrap và canonical navigation hiện tại.
- `BREADCRUMB_STANDARD.md` và `VISUAL_DESIGN_SYSTEM.md` được giữ; các reference
  file lỗi thời đã được sửa.
- `pinterest_assets.md` là tài liệu nội dung marketing, không phải tài liệu kiến
  trúc.
- `sitemap_poses.txt` là danh sách URL hỗ trợ vận hành, không thay thế
  `sitemap.xml` hay pose catalog.
- Các file `.txt` dưới `assets/` là artifact dữ liệu ảnh, không phải hướng dẫn
  kỹ thuật.

Tại thời điểm kiểm kê ban đầu, repository chưa có `CLAUDE.md` hoặc
`CONTRIBUTING.md`. `CLAUDE.md` sau đó được thêm làm redirect ngắn tới
`../AGENTS.md`; `CONTRIBUTING.md` vẫn chưa có. Không tài liệu nào bị xóa trong
đợt này.
