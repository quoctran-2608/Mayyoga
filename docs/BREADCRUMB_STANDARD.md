# Mây Yoga — Canonical Breadcrumb Standard

> Breadcrumb chuẩn toàn site được lấy theo visual treatment đã duyệt trên `ve-may-yoga.html`.
>
> Source of truth về style: `css/breadcrumb-canonical-v1.css`.
> Loader site-wide: `js/site-chrome.js`.

## 1. DOM contract ưu tiên

Trang mới nên dùng:

```html
<div class="breadcrumb" aria-label="Breadcrumb">
  <a href="index.html">Trang chủ</a>
  <span class="sep" aria-hidden="true">›</span>
  <span class="current" aria-current="page">Tên trang hiện tại</span>
</div>
```

Trang nested trong `bai-viet/` đổi path cha phù hợp, ví dụ `../index.html`.

Legacy `.course-breadcrumb` vẫn được canonical stylesheet hỗ trợ, nhưng trang mới nên ưu tiên `.breadcrumb`.

## 2. Current-page label là một phần bắt buộc của visual component

Ví dụ approved:

```text
Trang chủ  ›  Về Mây Yoga
```

Trong đó:

- `Trang chủ`: link cha, sage green, weight khoảng 500;
- `›`: separator nhạt;
- `Về Mây Yoga`: **current-page label**, màu đậm hơn separator/link cha và weight khoảng 600.

Không được chỉ style link `Trang chủ` và bỏ mặc tên trang hiện tại kế bên. Tên trang hiện tại là một phần của breadcrumb hierarchy.

## 3. Visual rules

Canonical style hiện hành:

```text
Font: DM Sans
Desktop: khoảng .82rem
Mobile: khoảng .75–.78rem
Gap: 6–8px
Parent link: #6b8e6b / weight 500
Separator: #b6c0b8 / weight 400
Current page: #53635a / weight 600
```

Breadcrumb phải:

- gọn;
- không dùng pill/card background;
- không có shadow;
- không cạnh tranh với H1;
- đủ contrast để current page không bị chìm;
- wrap tự nhiên khi title dài;
- vẫn hiển thị trên mobile ở dạng compact.

## 4. Responsive

Không ẩn breadcrumb trên mobile chỉ để tiết kiệm chiều cao, trừ khi người dùng yêu cầu rõ cho một flow đặc biệt.

Canonical behavior:

- desktop: visible;
- mobile `<=768px`: visible, nhỏ hơn và gap/margin giảm;
- small mobile `<=420px`: compact thêm.

Legacy rule từng ẩn `.course-breadcrumb` trên mobile đã bị canonical layer override.

## 5. Không tạo style breadcrumb riêng từng trang

Không thêm các biến thể như:

```css
.some-page .breadcrumb { ...một style mới... }
```

chỉ vì page có Hero khác.

Nếu cần thay đổi breadcrumb toàn site, sửa canonical source:

```text
css/breadcrumb-canonical-v1.css
```

và loader/cache key liên quan trong:

```text
js/site-chrome.js
```

## 6. Supported legacy selectors

Canonical CSS hiện hỗ trợ:

```text
.breadcrumb
.course-breadcrumb
[aria-label="Breadcrumb"]
```

Trang mới vẫn nên dùng DOM contract chuẩn ở mục 1 thay vì dựa vào legacy alias.

## 7. QA checklist

Trước khi hoàn thành trang mới:

- [ ] Có link cha `Trang chủ` hoặc ancestor phù hợp.
- [ ] Có separator `›`.
- [ ] Có current-page label.
- [ ] Current-page label có style rõ ràng, không chìm.
- [ ] Breadcrumb dùng canonical class/ARIA contract.
- [ ] Không tạo page-specific breadcrumb style.
- [ ] Mobile vẫn hiển thị gọn, không overflow.
- [ ] Breadcrumb không cạnh tranh visual với H1/hero content.
