# SEO, robots và sitemap

## Metadata bắt buộc

Mỗi public page cần metadata phù hợp với loại nội dung:

- `<title>`;
- meta description;
- canonical URL tuyệt đối;
- Open Graph title, description, URL, type, image, site name và locale;
- Twitter card, title, description và image;
- JSON-LD.

Canonical, `og:url` và JSON-LD `url` phải cùng trỏ một URL public. Image social
nên là URL tuyệt đối và file phải tồn tại trong repo hoặc ở nguồn được quản lý.

## JSON-LD theo loại trang

Chọn type đúng nội dung thật:

- Homepage: `WebSite` và schema tổ chức/doanh nghiệp phù hợp.
- Trang thông tin: `WebPage` hoặc subtype như `AboutPage`.
- Bài viết và trang chi tiết dạng biên tập: `Article`.
- Thư viện: `CollectionPage`/`ItemList`.
- FAQ chỉ dùng `FAQPage` khi câu hỏi và câu trả lời xuất hiện trên trang.
- Trắc nghiệm có thể dùng `WebPage` nếu không có schema chuyên biệt phù hợp.

Không giữ dữ liệu giả từ template. JSON-LD phải parse được và khớp nội dung hiển
thị.

## Sitemap hiện có

- `sitemap.xml`: sitemap chính, gồm root page, bài viết, pose và các URL public
  khác.
- `sitemap-trac-nghiem.xml`: sitemap chuyên cho hub và các trang trắc nghiệm.
- `sitemap_poses.txt`: danh sách hỗ trợ 88 URL pose; không thay thế XML sitemap.

`robots.txt` khai báo cả hai XML sitemap.

## Quy trình thêm URL mới

1. Xác nhận page là public và canonical URL cuối.
2. Thêm URL vào `sitemap.xml`.
3. Thêm `lastmod` đúng ngày thay đổi thực tế nếu sitemap section đang dùng.
4. Chọn `changefreq` và `priority` hợp lý, không tăng vô căn cứ.
5. Nếu là trắc nghiệm, cập nhật cả `sitemap-trac-nghiem.xml`.
6. Nếu là pose, cập nhật `sitemap_poses.txt`.
7. Kiểm tra URL không trùng và file đích tồn tại.
8. Nếu page cần search, cập nhật search theo tài liệu tương ứng.

## Không đưa vào sitemap

- file trong `docs/` và `docs/templates/`;
- test page hoặc artifact kiểm thử;
- file session, log hoặc prompt;
- source generator;
- URL chưa publish;
- Google verification artifact.

`google7a26d0ab7253faec.html` phải giữ nguyên nội dung verification và không
chuyển thành page thông thường.

## `links.html`

`links.html` là public link-in-bio độc lập và hiện có trong sitemap chính. Nó có
SEO metadata riêng nhưng không dùng full site navigation, `main.js` hoặc shared
site chrome.

## `robots.txt`

Khi sửa:

- giữ sitemap URL đúng domain;
- không vô tình chặn assets hoặc public content;
- chỉ chặn đường dẫn nội bộ thật sự không nên crawl;
- không thêm test/verification URL vào sitemap để “bù” cho robots.

## Checklist

- [ ] Title và description duy nhất.
- [ ] Canonical tuyệt đối và đúng URL.
- [ ] OG/Twitter metadata khớp nội dung.
- [ ] Social image tồn tại.
- [ ] JSON-LD đúng type, parse được và không có placeholder.
- [ ] URL public có trong sitemap phù hợp.
- [ ] URL không trùng.
- [ ] Verification file giữ nguyên.
- [ ] Không có docs/template/test artifact trong sitemap.
- [ ] `robots.txt` vẫn khai báo sitemap hiện hành.
