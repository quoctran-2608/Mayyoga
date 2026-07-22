# Mây Yoga — Deployment Environment Standard

> **Hiệu lực:** 2026-07-22
>
> Tài liệu này là source of truth cho môi trường hosting/deployment của dự án. Nếu tài liệu cũ gọi GitHub Pages là production cuối cùng, mô tả đó đã lỗi thời.

## 1. Môi trường hiện tại

```text
Giai đoạn phát triển / test / preview hiện tại
→ GitHub Pages

Môi trường production mục tiêu sau khi website hoàn thiện
→ Cloudflare Pages
```

GitHub Pages hiện chỉ đóng vai trò môi trường kiểm thử thuận tiện trong quá trình phát triển. Không được suy luận rằng các quyết định kiến trúc phải phụ thuộc riêng vào Jekyll/GitHub Pages.

## 2. Kiến trúc phải tương thích Cloudflare Pages

Website ưu tiên static HTML/CSS/JS chuẩn, không phụ thuộc vào Jekyll/Liquid chỉ để tạo homepage.

Homepage source of truth:

```text
index.html
```

`index.html` phải là top-level static HTML hoàn chỉnh, bắt đầu bằng `<!DOCTYPE html>` và không cần Liquid preprocessing.

Shared components vẫn là runtime/shared CSS/JS thông thường:

```text
js/site-chrome.js
js/site-navigation-canonical-v2.js
css/site-navigation-canonical-v4.css
css/header-index-canonical-v3.css
```

Kiến trúc này phải chạy được trên cả GitHub Pages trong giai đoạn test và Cloudflare Pages khi production.

## 3. Không tối ưu riêng cho GitHub Pages bằng cách làm hỏng portability

Không được tái tạo các pattern chỉ vì GitHub Pages có Jekyll mặc định, ví dụ:

```text
index.html -> Liquid wrapper -> _includes/index-source.html
```

Không thêm dependency build-time chỉ để GitHub Pages render được một trang vốn có thể là static HTML.

Mọi thay đổi deployment-specific phải được đánh giá theo production target là Cloudflare Pages.

## 4. Khi chuyển production sang Cloudflare Pages

Ưu tiên Git integration với repository hiện tại để có automatic deploy và preview deployments.

Với site static không cần framework build, cấu hình Cloudflare Pages phải trỏ Build output directory tới thư mục chứa `index.html` và toàn bộ static assets. Không tự ý thêm framework/build pipeline nếu website chưa cần.

Trước cutover production phải kiểm tra tối thiểu:

- root `/` phục vụ đúng `index.html`;
- relative asset paths hoạt động;
- Header/Menu/Search/Footer/Floating Contact hoạt động;
- nested pages trong `bai-viet/` hoạt động;
- redirects/404 nếu có;
- cache headers và cache-busting query;
- desktop/tablet/mobile;
- custom domain và HTTPS;
- canonical URLs/SEO metadata;
- không có dependency ẩn vào Jekyll/Liquid.

## 5. Local preview

```text
Mở nhanh       -> file://index.html
Test đầy đủ     -> local HTTP server / Live Server
Test online     -> GitHub Pages trong giai đoạn phát triển
Production cuối -> Cloudflare Pages
```

`file://` chỉ là quick preview; không được xem là môi trường production-equivalent.

## 6. Quy tắc cho AI/developer

Khi tài liệu hoặc code comment nói về deployment:

```text
GitHub Pages = current test/preview environment
Cloudflare Pages = intended production environment
```

Nếu một hướng dẫn cũ nói `GitHub Pages = production`, tài liệu này được ưu tiên.

Không thay đổi deployment architecture hoặc thêm `.nojekyll`, framework preset, build command, Workers/Functions hay redirect rules nếu chưa có yêu cầu cụ thể và chưa đánh giá ảnh hưởng tới Cloudflare Pages production.
