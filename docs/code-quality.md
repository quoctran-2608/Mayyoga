# Chất lượng code và tài liệu

## Ownership trước code

Trước khi sửa, trả lời:

1. Input là gì?
2. Output là gì?
3. Có thể lỗi thế nào?
4. Thay đổi state/file nào?
5. Cần quyền đọc, ghi hay execute nào?

Sau đó xác định file owner trong `architecture.md`. Không tạo owner thứ hai chỉ
để tránh đọc code hiện tại.

## CSS

- Sửa file đang sở hữu component.
- Scope CSS page theo body/component.
- Không dùng global selector cho fix riêng.
- Không thêm override muộn chỉ để thắng specificity.
- Không tạo nhiều file có hậu tố `final`, `fix`, `new` cùng chồng selector.
- Tạo CSS mới chỉ khi component/page có ownership riêng, không phù hợp file hiện
  có và có một nơi tải rõ ràng.
- Sửa CSS hiện có khi thay đổi thuộc component mà file đó đã sở hữu.

## JavaScript

- Mỗi public page thông thường có đúng một `main.js`.
- Không bootstrap navigation, site chrome hoặc search lần hai.
- Page-specific script không được điều khiển shared navbar.
- Tạo file JS mới khi behavior có owner riêng và lifecycle rõ.
- Sửa file hiện có khi behavior thuộc API/component hiện hữu.
- Compatibility shim chỉ forward; không thêm logic mới.

## Migration

```bash
node scripts/normalize-navigation-shells.mjs
```

Migration có thể ghi public HTML. Nó chuẩn hóa navbar shell, loader, pose count
copy và legacy inline navigation. Chạy lại ngay sau lần đầu; lần cuối phải báo
cập nhật `0 file`.

Không dùng migration như formatter tổng quát cho tài liệu hoặc template.

## Audit

```bash
node scripts/audit-site-structure.mjs
node scripts/audit-docs.mjs
```

Audit site là read-only và kiểm tra:

- đúng một navbar shell và `main.js`;
- không direct-load legacy/shared runtime;
- không inline navigation handler;
- canonical navigation version/DOM contract;
- pose count và search ownership;
- ngoại lệ `links.html`.

Audit docs kiểm tra markdown link, file reference quan trọng, semantic guidance
legacy, placeholder còn sót trong public HTML, template token và relative path
contract. Semantic lint chặn các hướng dẫn quay lại pose count cũ, direct loader,
navigation shim làm component chính hoặc menu chép vào HTML. File deprecated và
đoạn anti-pattern có nhãn rõ được loại trừ có chủ đích.

## Syntax

Chạy `node --check` cho mọi JS/MJS đã sửa:

```bash
node --check js/ten-file.js
node --check scripts/ten-script.mjs
```

Nếu sửa runnable code, chạy trực tiếp flow liên quan; syntax check không thay
thế behavior check.

## Diff

```bash
git status --short
git diff --stat
git diff
git diff --check
```

`git diff --check` phải sạch. Kiểm tra không có production file ngoài scope,
workflow, dependency, secret, session artifact hoặc prompt bị commit.

## Idempotence

Một migration/normalizer đạt yêu cầu khi:

1. lần đầu đưa source về canonical state;
2. lần hai không đổi file;
3. audit sau đó đạt;
4. output nêu số file đã kiểm tra và số file đã đổi.

## Dependency và công cụ

Repo hiện không có dependency manifest hoặc workflow active. Dùng Node/Python
standard library cho audit nhỏ. Không thêm package chỉ để parse text hoặc đi
file system nếu standard library đủ.

## Khi nào sửa tài liệu

Cập nhật docs trong cùng thay đổi nếu:

- ownership đổi;
- bootstrap/load order đổi;
- template contract đổi;
- source of truth đổi;
- command kiểm tra đổi;
- số lượng pose thực tế đổi.

Không để comment hoặc tài liệu cũ mô tả shim là component chính.

## Definition of Done

- [ ] Đúng owner, không fork component.
- [ ] Không có loader/bootstrap trùng.
- [ ] CSS/JS mới có scope và lý do.
- [ ] `node --check` đạt cho code đã sửa.
- [ ] Migration lần cuối đổi 0 file.
- [ ] Site audit: 0 lỗi, 0 cảnh báo.
- [ ] Docs audit: 0 lỗi.
- [ ] `git diff --check` sạch.
- [ ] Không có workflow/dependency ngoài yêu cầu.
- [ ] Không tuyên bố browser/deploy test nếu chưa chạy.
