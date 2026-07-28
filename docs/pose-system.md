# Hệ thống 88 tư thế

## Ownership và luồng dữ liệu

```text
js/poses-data.js
  └─ js/pose-catalog.js
      ├─ js/pose-library.js → tu-the-yoga.html
      └─ js/search-index.js → global search

tu-the/<slug>.html = trang chi tiết public
```

- `poses-data.js`: source data gốc.
- `pose-catalog.js`: chuẩn hóa categories, poses, slug và URL.
- `pose-library.js`: render 9 nhóm và card tư thế.
- `search-index.js`: sinh pose entries từ catalog.

Số lượng hiện tại là 88. Không sửa số công bố trước khi dữ liệu thật thay đổi.

## Schema dữ liệu

Mỗi pose record hiện dùng:

- `cat`: ID nhóm;
- `img`: path ảnh từ site root;
- `vn`: tên tiếng Việt;
- `san`: tên Sanskrit;
- `level`: cấp độ;
- `benefits`: lợi ích;
- `contra`: chống chỉ định;
- `howto`: hướng dẫn ngắn.

Category record có ID, tên, icon, ảnh và mô tả.

## Slug và URL

Catalog bỏ dấu tiếng Việt, chuyển chữ thường, giữ chữ/số và nối từ bằng dấu
gạch ngang. URL:

```text
tu-the/<slug>.html
```

Trường hợp tên không thể map trực tiếp được khai báo trong `slugOverrides`.
Hiện có override cho “Tư thế Cày” để tránh đụng slug khác.

Không tự viết một hàm slug thứ hai trong library, search hoặc generator.

## Thêm một tư thế

1. Chọn category ID có thật hoặc thêm category theo thiết kế toàn hệ thống.
2. Thêm record đầy đủ vào `js/poses-data.js`.
3. Tính slug bằng rule của `pose-catalog.js`.
4. Kiểm tra slug không trùng pose hiện có hoặc public URL khác.
5. Tạo `tu-the/<slug>.html` với nội dung đúng record.
6. Dùng navbar shell, footer shell và đúng một `../js/main.js`.
7. Dùng meta/JSON-LD và ảnh đúng URL.
8. Thêm URL vào `sitemap.xml` và `sitemap_poses.txt`.
9. Không thêm pose entry thủ công vào `js/search-index.js`.
10. Cập nhật mọi số lượng công bố chỉ sau khi source count đã thay đổi.

## Sửa một tư thế

Xác định loại thay đổi:

- Dữ liệu card/search: sửa `poses-data.js`.
- Rule slug/URL: sửa `pose-catalog.js` và đánh giá redirect/link/sitemap.
- Layout library: sửa `pose-library.js` hoặc CSS owner.
- Nội dung chi tiết: sửa file `tu-the/<slug>.html`.

Nếu đổi `vn`, URL sinh ra có thể đổi. Phải kiểm tra:

- slug cũ và slug mới;
- file HTML;
- internal links;
- sitemap;
- search result URL;
- canonical/OG/JSON-LD URL;
- nhu cầu redirect ở môi trường deploy.

## Kiểm tra toàn vẹn

Audit site kiểm tra source count là 88 và search lấy pose từ catalog. Ngoài ra
cần kiểm tra:

- số record catalog bằng số data record;
- mọi URL catalog là duy nhất;
- mọi URL có file HTML;
- mọi file cần thiết có trong sitemap;
- không còn số lượng cũ trong source;
- title/canonical của trang chi tiết khớp pose;
- image path tồn tại.

Chạy:

```bash
node --check js/poses-data.js
node --check js/pose-catalog.js
node --check js/pose-library.js
node --check js/search-index.js
node scripts/audit-site-structure.mjs
```

## Không làm

- Không viết lại mảng pose trong library hoặc search.
- Không dùng `sitemap_poses.txt` làm source data.
- Không sửa card library bằng cách hard-code 88 card trong HTML.
- Không tạo URL slug bằng rule riêng.
- Không đổi số lượng marketing theo ước lượng.
- Không thêm một pose mà thiếu trang chi tiết hoặc sitemap.
