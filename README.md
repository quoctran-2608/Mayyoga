# Mây Yoga

Mây Yoga là website tiếng Việt về Hatha Yoga, tư thế, hơi thở, thiền định,
giải phẫu, bài viết chuyên sâu, trắc nghiệm và các chương trình học Yoga.

Repository là website tĩnh dùng HTML, CSS và JavaScript thuần; không cần build
system để chạy.

> **AI contributors must read `AGENTS.md` first.**

## Cấu trúc chính

```text
index.html          Homepage tĩnh, source duy nhất của homepage
bai-viet/           Bài viết
tu-the/             88 trang chi tiết tư thế
trac-nghiem/        Các trang trắc nghiệm
css/                Shared CSS và CSS theo trang
js/                 Runtime JavaScript và dữ liệu
scripts/            Migration và audit repository
docs/               Tài liệu kiến trúc, authoring và template
```

## Điểm vào kỹ thuật

- `js/main.js`: bootstrap chung của trang thông thường.
- `js/site-navigation-canonical-v3.js`: Canonical Navigation V6, sở hữu header,
  menu, search shell và CTA.
- `js/site-chrome.js`: footer, floating contact và article share.
- `js/search.js` + `js/search-index.js`: hành vi và dữ liệu search.
- `js/poses-data.js` + `js/pose-catalog.js`: dữ liệu gốc và catalog 88 tư thế.
- `js/pose-library.js`: render `tu-the-yoga.html`.

## Chạy local

Từ thư mục repository:

```bash
python3 -m http.server 8000
```

Sau đó mở `http://localhost:8000/`. Có thể dùng static server khác, nhưng không
cần cài dependency cho repo.

## Kiểm tra

```bash
node scripts/normalize-navigation-shells.mjs
node scripts/audit-site-structure.mjs
node scripts/audit-docs.mjs
git diff --check
```

Migration phải idempotent: lần chạy cuối cập nhật `0 file`.

## Tài liệu

Bắt đầu tại [`docs/README.md`](docs/README.md). Kiến trúc hiện tại nằm trong
[`docs/architecture.md`](docs/architecture.md); quy tắc bắt buộc cho agent nằm
trong [`AGENTS.md`](AGENTS.md).
