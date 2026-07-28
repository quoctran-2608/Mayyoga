# Template HTML chính thức

Các file trong thư mục này là **source mẫu**, không phải public page và không
được thêm vào sitemap.

## Cách dùng

1. Chọn template theo vị trí page.
2. Sao chép file tới URL đích:

```bash
cp docs/templates/root-page-template.html ten-trang.html
cp docs/templates/nested-page-template.html thu-muc/ten-trang.html
cp docs/templates/article-template.html bai-viet/ten-bai.html
```

3. Thay mọi token `__TOKEN__`.
4. Đổi body class, metadata, nội dung, JSON-LD và page-specific asset.
5. Không đổi navbar shell.
6. Giữ đúng một `main.js`; không thêm direct loader navigation/search/chrome.
7. Chạy `node scripts/audit-docs.mjs` để phát hiện token còn sót trong public
   HTML và kiểm tra template source contract, rồi chạy audit site.

Đường dẫn trong template được viết cho **vị trí sau khi sao chép**, không phải để
mở trực tiếp từ `docs/templates/`.
