# Mây Yoga — Visual Design System for AI & Developers

> **Mục đích:** Đây là visual source of truth bắt buộc cho AI/developer khi tạo trang mới, bài viết mới hoặc thiết kế lại một section nội dung của Mây Yoga.
>
> Tài liệu này bổ sung cho `docs/AI_DEVELOPMENT_GUIDE.md`.
>
> - `AI_DEVELOPMENT_GUIDE.md` = kiến trúc, shared components, paths, search, SEO, responsive kỹ thuật.
> - `VISUAL_DESIGN_SYSTEM.md` = ngôn ngữ thị giác, hierarchy, composition, responsive intent, anti-patterns và visual QA.

---

# 1. Nguyên tắc cao nhất

Website Mây Yoga phải tạo cảm giác:

- sáng, thanh lịch, tự nhiên;
- chuyên nghiệp nhưng không lạnh;
- nhiều khoảng thở;
- xanh sage + cream là nền tảng;
- typography có chất editorial nhưng UI vẫn dễ đọc;
- card, badge, CTA mềm và tinh tế;
- không dùng hiệu ứng trang trí nặng hoặc màu quá gắt;
- mobile phải được thiết kế lại theo mục đích sử dụng, không chỉ thu nhỏ desktop.

**Không được tự phát minh một design language mới cho từng trang.**

Khi yêu cầu chỉ là tạo trang/bài mới, AI phải giữ nguyên ngôn ngữ thiết kế Mây Yoga hiện hành trừ khi người dùng yêu cầu một redesign toàn site.

---

# 2. Approved visual reference pages

Trước khi tạo layout mới, AI phải đọc source HTML và CSS liên quan của các reference phù hợp.

## 2.1. Service / Course / Sales page reference

```text
hoc-yoga-online.html
```

Các layer quan trọng hiện hành:

```text
css/style.css
css/online-course-polish-v3.css
css/online-course-pricing-v4.css
css/online-course-pricing-v5.css
css/online-course-hero-v7.css
css/online-course-benefits-v8.css
```

Dùng trang này làm reference cho:

- Hero bán hàng / giới thiệu dịch vụ;
- badge mềm;
- H1/H2 hierarchy;
- trust/proof information;
- CTA chính;
- benefit/information section;
- process/steps;
- pricing cards;
- FAQ;
- final CTA;
- cách desktop và mobile có thể dùng composition khác nhau.

## 2.2. About / Profile / Editorial page reference

```text
ve-may-yoga.html
```

Layer quan trọng:

```text
css/style.css
css/about-page-polish-v4.css
```

Dùng trang này làm reference cho:

- editorial masthead;
- personal/profile page;
- philosophy/story section;
- credential/badge treatment;
- quote ornament;
- informational card;
- cách mobile compact hơn nhưng vẫn giữ cảm giác editorial.

## 2.3. Reference không phải template để copy

AI phải học **design grammar**, không copy máy móc cấu trúc section.

Học các yếu tố:

```text
màu sắc
+ typography
+ spacing
+ border radius
+ shadow
+ visual hierarchy
+ CTA hierarchy
+ image treatment
+ responsive intent
```

Không được thấy một reference có pricing/FAQ/dashed frame rồi tự động nhét các section đó vào trang không cần chúng.

---

# 3. Core color system

Các màu dưới đây là palette đã được dùng và duyệt trong những trang polished hiện tại.

```text
Primary ink        #173f35
Primary green      #315d3c
Secondary green    #477b50
Sage 100           #eef4e9
Soft sage          #f6f8f2
Cream              #fbf8f0
Warm white         #fff / #fdfefb
Muted body         khoảng #5f6f65 → #68736b
Gold accent        #b69445
```

## 3.1. Quy tắc contrast

- H1/H2: dùng `#173f35` hoặc màu có độ đậm tương đương.
- Card title/H3: phải đủ nổi trên nền trắng; ưu tiên xanh đậm khoảng `#214a34` → `#234d37`.
- Body: muted nhưng vẫn phải đọc tốt; không dùng sage quá nhạt cho paragraph.
- Badge: có thể sáng hơn nhưng text phải rõ.
- CTA primary: xanh đậm với text trắng.

**Sai:** card title dùng xanh nhạt gần màu nền khiến heading bị chìm.

**Đúng:** hierarchy rõ:

```text
H2 chính — dark ink
H3 card — dark green
body — muted green-gray
metadata — lighter muted
```

---

# 4. Typography system

Font nền site hiện tại:

```text
Display / editorial headings:
Cormorant Garamond

Body / UI / CTA / card title:
DM Sans
```

## 4.1. Heading hierarchy

### H1 / H2 lớn

- Font: `Cormorant Garamond`.
- Weight thường: `600`.
- Line-height tương đối chặt: khoảng `1.05–1.16` tùy size.
- Letter-spacing âm nhẹ.
- Không tăng size chỉ để “ấn tượng”; phải cân với image và width thực tế.

### Brand/name emphasis

Ví dụ `Thu Mây`:

- italic serif;
- weight khoảng `500`;
- dùng màu accent sage có đủ contrast;
- không để emphasis cạnh tranh quá mạnh với toàn bộ H1.

### Card title / information title

- Font: `DM Sans`.
- Weight: thường `700`.
- Màu xanh đậm.
- Size đủ mạnh so với body.

Ví dụ approved course benefits:

```text
Desktop H3: khoảng 1.2rem / 700
Mobile H3: khoảng 0.98–1.1rem / 700
```

### Body

- Font: `DM Sans`.
- Weight: `400`.
- Line-height thoáng khoảng `1.58–1.76` tùy mật độ.

---

# 5. Special numeric typography — `1:1`

Chuỗi `1:1` là một trường hợp đặc biệt trên Mây Yoga.

Trong heading lớn, tránh font khiến số `1` trông như chữ La Mã `I` hoặc quá kỹ thuật.

Approved treatment:

```css
font-family: Georgia, 'Times New Roman', serif;
font-variant-numeric: lining-nums tabular-nums;
font-feature-settings: 'lnum' 1, 'tnum' 1;
font-style: normal;
```

## 5.1. Trong Hero H1

Tham khảo `hoc-yoga-online.html`:

```text
font-size khoảng 0.70–0.72em so với H1
font-weight 700
```

Không để `1:1` cùng cỡ H1 nếu làm nó phình và phá cân bằng.

## 5.2. Trong H2

Ví dụ:

```text
Ai nên học Yoga Online 1:1?
```

Dùng cùng family/numeric features nhưng:

```text
font-weight 500
```

để hòa với H2.

---

# 6. Spacing & visual rhythm

Mây Yoga ưu tiên **khoảng thở có chủ ý**, không phải khoảng trắng tùy ý.

## 6.1. Section spacing

Desktop thường:

```text
80–100px vertical padding
```

Mobile thường:

```text
56–72px vertical padding
```

Có thể compact hơn nếu section là information list.

## 6.2. Heading rhythm

Một section điển hình:

```text
badge
↓ 12–16px
H2
↓ 32–50px
content/cards
```

Hero điển hình:

```text
badge
↓ ~15–20px
H1
↓ ~16–22px
description
↓ ~18–24px
proof/trust
↓ ~20–26px
CTA
```

Không để tất cả khoảng cách giống nhau. Hierarchy phải thể hiện qua spacing.

---

# 7. Badges / chips

Approved style:

- pill shape: `border-radius: 999px`;
- nền sage/white translucent;
- border rất nhẹ;
- font `DM Sans`, weight khoảng `650–700`;
- shadow rất nhẹ hoặc không có;
- chiều cao compact.

Không dùng badge hình chữ nhật góc cứng nếu không có lý do đặc biệt.

Không dùng quá nhiều badge cùng lúc làm layout giống dashboard.

---

# 8. Buttons / CTA

## 8.1. Primary CTA

- pill shape;
- nền xanh đậm/gradient rất nhẹ;
- text trắng;
- icon nhỏ và tinh tế;
- `DM Sans`, weight khoảng `700`;
- shadow mềm;
- không dùng emoji thô khi có icon Font Awesome hoặc SVG phù hợp.

Ví dụ course Hero dùng Font Awesome `fa-calendar-check` cho hành động đăng ký buổi học thử.

## 8.2. CTA hierarchy

Một vùng conversion nên có:

```text
1 primary action rõ ràng
+ tối đa 1 secondary action nếu cần
```

Không tạo 3–4 CTA có cùng visual weight.

## 8.3. Hover

- thay đổi màu/shadow nhẹ;
- tránh `translateY()` nếu có nguy cơ hover jitter hoặc layout cảm giác rung;
- tôn trọng `prefers-reduced-motion`.

---

# 9. Cards

## 9.1. Card language

Approved card thường có:

- background white/warm white;
- border sage rất nhẹ;
- radius khoảng `18–26px` tùy scale;
- shadow rộng nhưng opacity thấp;
- padding thoáng;
- không dùng nhiều border accent cạnh tranh.

## 9.2. Không dùng “short top-border tab” mặc định

Một pattern đã bị loại khỏi approved course design là thanh màu ngắn nằm trên top border card.

Không tạo lại kiểu:

```text
      ━━━━━
╭──────────────────╮
│                  │
```

Ưu tiên:

- surface lighting;
- soft radial glow;
- subtle border;
- ribbon thật sự có mục đích;
- icon/medallion.

## 9.3. Featured card

Một featured card có thể dùng:

- border contrast mạnh hơn;
- shadow sâu hơn một chút;
- background radial glow;
- ribbon chéo contained trong rounded card.

Không để ribbon lòi hai đầu ra ngoài card hoặc cắt mất icon/text.

---

# 10. Images

- Dùng `object-fit: cover` khi card cần crop nhất quán.
- Chọn aspect ratio theo mục đích, không theo thói quen.
- Hero image có thể dùng shadow mềm + asymmetric radius.
- Ảnh card không được quá nhỏ khiến section mất visual weight.
- Ảnh không được chiếm quá nhiều trên mobile nếu mục đích section là scan thông tin nhanh.

Hero visual approved course page có decorative dashed frame phía sau:

```css
border: 2px dashed rgba(61,90,58,0.15);
```

Khung này là accent nhẹ, phải offset đủ để nhìn có layer; không được khít sát ảnh.

Không áp dụng dashed frame cho mọi hero. Chỉ dùng khi hợp composition.

---

# 11. Hero design standard

Hero không chỉ là “2 cột”.

Trước khi code, xác định hierarchy và conversion intent.

## 11.1. Service / course hero

Approved sequence:

```text
badge
H1
supporting description
proof/trust
primary CTA
```

Visual ở cột còn lại.

Desktop:

- H1 và image phải cân visual weight;
- text column không quá rộng;
- image không bị ép nhỏ;
- không để `1:1` hoặc accent token phình hơn heading.

Mobile:

- có thể ẩn breadcrumb nếu nó gây nhiễu conversion hero;
- heading có line break có chủ ý;
- proof/trust có thể tái cấu trúc thành một panel thay vì giữ nhiều pill ngang;
- CTA phải dễ bấm nhưng không chiếm cả màn hình một cách nặng nề;
- visual xuống dưới content nếu giúp reading order tốt hơn.

## 11.2. Editorial/about hero

Có thể dùng:

- masthead;
- breadcrumb;
- tag/meta;
- profile/photo;
- philosophy/quote block;
- decorative quote ornament.

Không biến editorial masthead thành sales hero nếu trang không có conversion intent.

---

# 12. Classify the section before designing it

AI phải phân loại section trước khi chọn layout.

## ARTICLE CONTENT

Mục đích: đọc dài.

Ưu tiên:

- vertical reading flow;
- typography;
- ảnh lớn khi cần;
- content width kiểm soát.

## INFORMATION LIST

Mục đích: scan nhanh nhiều mục.

Ưu tiên:

- compact;
- hierarchy rõ;
- icon/thumbnail hỗ trợ;
- không làm mỗi mục giống article card.

Approved example:

`Ai nên học Yoga Online 1:1?`

Desktop dùng alternating image-text lớn vì không gian rộng.

Mobile đổi thành:

```text
thumbnail trái | title + description phải
```

vì đây là information list, không phải article feed.

## FEATURE / BENEFIT

- card/grid hoặc image-text;
- title mạnh;
- copy ngắn;
- visual hỗ trợ một lợi ích rõ.

## PROCESS / STEPS

- numbered steps;
- sequence phải dễ hiểu;
- màu có thể phân biệt bước nhưng không dùng quá nhiều palette lạc brand.

## PRICING

- so sánh nhanh;
- featured option rõ;
- price hierarchy mạnh;
- CTA nhất quán.

## FAQ

- accordion/details;
- typography dễ đọc;
- spacing compact;
- không biến FAQ thành các card lớn nặng nề.

## FINAL CTA

- một focal point;
- headline rõ;
- supporting copy ngắn;
- trust chips nhẹ;
- 1 primary + tối đa 1 secondary CTA.

---

# 13. Responsive philosophy — mobile is not stacked desktop

**Quy tắc bắt buộc:**

> Không được chỉ đặt `grid-template-columns: 1fr` rồi kết luận trang đã responsive.

AI phải đánh giá lại intent của từng section trên mobile.

Trước khi viết media query, tự hỏi:

1. Người dùng mobile cần scan hay đọc sâu?
2. Ảnh là nội dung chính hay chỉ minh họa?
3. Có element nào có thể bỏ/thu gọn?
4. Có cần đổi order?
5. Có cần đổi pattern hoàn toàn nhưng vẫn giữ cùng design language?

Ví dụ approved:

```text
Desktop benefits:
ảnh lớn ↔ text
text ↔ ảnh lớn

Mobile benefits:
thumbnail | information
thumbnail | information
```

Đây là responsive adaptation đúng intent.

---

# 14. Mobile-specific rules

- ưu tiên scan nhanh;
- tránh quá nhiều vertical whitespace;
- không tạo một ảnh full-width lớn cho mọi card;
- card phải đủ compact để người dùng nhận ra pattern của section;
- CTA target dễ bấm;
- heading không quá lớn dẫn đến 1–2 từ mỗi dòng;
- badge không wrap thành block xấu;
- proof/meta có thể chuyển thành panel/grid compact;
- horizontal scroll chỉ dùng khi bản chất content phù hợp.

Mobile small (`<=420px`) cần rule riêng khi:

- thumbnail/card quá chật;
- heading xuống dòng xấu;
- CTA tràn;
- badge quá dài;
- decorative element tạo overflow.

---

# 15. Decorative elements

Mây Yoga dùng decoration tiết chế.

Approved examples:

- dashed frame phía sau hero image;
- quote ornament `❝`;
- soft radial glow;
- leaf medallion;
- contained diagonal ribbon cho featured pricing.

Decoration phải:

- nằm sau content hoặc ở vùng không cạnh tranh;
- opacity thấp;
- không gây overflow mobile;
- có mục đích tạo depth/hierarchy.

Không dùng ornament chỉ để “lấp chỗ trống”.

---

# 16. Anti-patterns — không làm

## Visual

- không dùng màu neon hoặc palette ngoài brand nếu không có yêu cầu;
- không làm heading quá nhạt;
- không dùng quá nhiều font families;
- không dùng quá nhiều emoji trong UI;
- không cho mọi card cùng một accent bar;
- không dùng shadow đậm, sắc và nhỏ kiểu dashboard SaaS;
- không bo radius ngẫu nhiên giữa các card cùng hệ;
- không tạo gradient quá màu mè;
- không dùng quá nhiều pills/chips.

## Layout

- không biến mọi section thành grid 3 card;
- không biến information list thành article feed;
- không biến mobile thành bản desktop stack thẳng;
- không copy pricing/FAQ vào trang không cần;
- không để ảnh lấn át text khi ảnh chỉ là supporting visual.

## Typography

- không để H3 chìm hơn body;
- không để `1:1` trông như `I:I`;
- không dùng text muted quá nhạt cho nội dung chính;
- không dùng ALL CAPS dài cho heading lớn.

---

# 17. CSS implementation rules for visual work

Ngoài quy tắc trong `AI_DEVELOPMENT_GUIDE.md`:

1. Scope theo body/page namespace.
2. Không sửa shared header/footer để giải quyết layout riêng một page.
3. Không thêm global selector rộng nếu chỉ sửa một section.
4. Khi một page đã polished qua nhiều layer, thêm refinement layer có scope rõ thay vì refactor hàng loạt nếu không có yêu cầu.
5. Bump cache key khi thay CSS mà browser/CDN có thể giữ bản cũ.
6. Sau write phải fetch lại source.

Ví dụ tốt:

```css
.online-course-page .benefit-section .benefit-row h3 { ... }
```

Ví dụ nguy hiểm:

```css
h3 { ... }
.card { ... }
img { ... }
```

---

# 18. Visual QA checklist bắt buộc

Trước khi báo hoàn thành trang/bài/section mới, AI phải tự rà:

## Reference

- [ ] Đã đọc `docs/AI_DEVELOPMENT_GUIDE.md`.
- [ ] Đã đọc `docs/VISUAL_DESIGN_SYSTEM.md`.
- [ ] Đã xác định approved reference page phù hợp.
- [ ] Không copy máy móc section không liên quan.

## Typography

- [ ] H1/H2 đủ contrast.
- [ ] Card title/H3 không bị chìm.
- [ ] Body muted nhưng vẫn đọc rõ.
- [ ] Font-weight hierarchy có chủ ý.
- [ ] `1:1` nếu xuất hiện trong heading dùng treatment phù hợp và không giống số La Mã.

## Color

- [ ] Palette nằm trong sage/cream/ink system trừ khi có lý do.
- [ ] Không có accent quá gắt.
- [ ] CTA primary đủ nổi nhưng không chói.

## Composition

- [ ] Image và text cân visual weight.
- [ ] Section spacing nhất quán.
- [ ] Card radius/shadow cùng một hệ.
- [ ] Decoration không dư thừa.
- [ ] Không dùng short top-border tab mặc định.

## Intent

- [ ] Đã phân loại section: article / information / benefit / process / pricing / FAQ / CTA.
- [ ] Layout phù hợp loại section.
- [ ] Information list không bị thiết kế giống article feed.

## Mobile

- [ ] Mobile được thiết kế lại theo intent, không chỉ stack desktop.
- [ ] Heading không vỡ dòng xấu.
- [ ] Ảnh không chiếm quá nhiều chiều cao nếu chỉ là minh họa.
- [ ] Card đủ compact để scan.
- [ ] CTA không overflow.
- [ ] Decoration không overflow.
- [ ] Kiểm tra `<=420px` nếu section có mật độ cao.

## Final

- [ ] Shared Header/Footer không bị fork.
- [ ] Không có horizontal overflow.
- [ ] Không claim pixel-perfect/browser verification nếu chưa render thật.
- [ ] Sau write đã fetch lại file và xác nhận commit SHA.

---

# 19. Decision rule when unsure

Khi AI không chắc nên thiết kế thế nào:

1. Xác định loại trang và loại section.
2. Chọn approved reference gần nhất.
3. Học design grammar từ reference.
4. Giữ palette + typography + spacing + component language.
5. Thiết kế composition mới theo content intent.
6. Thiết kế mobile riêng.
7. Không tự mở rộng scope sang redesign toàn site.

**Ưu tiên sự nhất quán với Mây Yoga hơn novelty.**
