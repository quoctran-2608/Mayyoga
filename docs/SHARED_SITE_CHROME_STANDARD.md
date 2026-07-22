# Mây Yoga — Shared Site Chrome Standard

> **Mục tiêu:** Homepage và tất cả trang con phải dùng cùng một source cho Header/Menu/Search, Footer, Floating Contact, Breadcrumb và Article Share.
>
> Không được duy trì một bản Header/Menu/Footer riêng cho `index.html`.

---

# 1. Kiến trúc canonical hiện hành

```text
js/site-chrome.js
├─ load css/header-index-canonical-v3.css
├─ load css/site-navigation-canonical-v4.css
├─ load css/breadcrumb-canonical-v1.css
├─ render canonical Footer
├─ render canonical Floating Contact
├─ load js/site-navigation-canonical-v2.js
└─ load js/article-share-standard.js
```

`index.html` và các trang con đều đi qua chuỗi component này.

`index.html` hiện là **standalone static HTML**, không còn là Jekyll/Liquid wrapper. Kiến trúc homepage chi tiết nằm tại:

```text
docs/HOMEPAGE_STATIC_SOURCE_STANDARD.md
```

---

# 2. Header/Menu/Search — một source duy nhất

Structural + behavioral source of truth:

```text
js/site-navigation-canonical-v2.js
```

File này sở hữu:

- cấu trúc menu level 1 và level 2;
- URL menu;
- active/current state;
- dropdown desktop hover/focus;
- dropdown mobile tap;
- hamburger;
- Search shell/self-healing;
- CTA header;
- logo/path normalization.

Visual navigation layer:

```text
css/site-navigation-canonical-v4.css
```

Header geometry source of truth:

```text
css/header-index-canonical-v3.css
```

## Quy tắc quan trọng

Homepage là **visual reference** của Header, nhưng không phải structural/menu source riêng.

Khi thêm/xóa/đổi menu item:

```text
CHỈ sửa canonical navigation component.
KHÔNG sửa menu riêng trong index.html để tạo một implementation thứ hai.
```

`index.html` có thể chứa Header shell/fallback để giảm layout shift và giúp source HTML có cấu trúc đầy đủ, nhưng runtime canonical navigation là authoritative source cho menu structure/behavior.

Không tạo lại `index-nav-*` như một hệ behavior riêng cho homepage.

---

# 3. Footer — một canonical markup duy nhất

Source of truth:

```text
js/site-chrome.js
```

`footerMarkup()` render cùng một Footer cho homepage và mọi trang có `<footer class="footer">`.

Canonical Footer hiện gồm:

- logo + tagline;
- Facebook;
- Instagram;
- TikTok;
- Chính sách bảo mật;
- Điều khoản sử dụng;
- Chính sách thanh toán;
- Chính sách hoàn tiền;
- email;
- hotline/Zalo;
- địa chỉ;
- chủ quản + MST;
- copyright.

Khi thay đổi Footer:

```text
CHỈ sửa footerMarkup() / shared footer style.
KHÔNG sửa Footer fallback riêng trong index.html hoặc từng page HTML để đồng bộ site-wide.
```

HTML Footer hard-code còn tồn tại ở một số trang chỉ đóng vai trò shell/fallback trước runtime normalization.

---

# 4. Floating Contact

Source of truth:

```text
js/site-chrome.js
```

Canonical Floating Contact hiện gồm:

```text
Zalo
WhatsApp
```

`site-chrome.js` xóa các bản `.floating-contact` cũ và render lại một bản canonical.

Không sửa riêng từng trang.

---

# 5. Breadcrumb

Visual source of truth:

```text
css/breadcrumb-canonical-v1.css
```

Contract:

```text
docs/BREADCRUMB_STANDARD.md
```

Breadcrumb được load qua `site-chrome.js` cho toàn site.

---

# 6. Article Share

Behavior/source of truth:

```text
js/article-share-standard.js
```

Được bootstrap bởi `site-chrome.js`.

Không hard-code một bộ share icon riêng cho từng bài viết.

---

# 7. Homepage đặc biệt ở đâu?

Homepage vẫn đặc biệt về **nội dung và Hero**, không đặc biệt về shared chrome.

Homepage-only có thể giữ:

- Hero layout;
- carousel;
- section homepage;
- homepage-specific responsive polish;
- homepage SEO/schema;
- homepage-specific preload/performance hints.

Homepage **không được** có hệ riêng cho:

```text
Header
Menu structure
Menu behavior
Search shell
Footer
Floating Contact
Breadcrumb standard
Article Share standard
```

Homepage source of truth duy nhất:

```text
index.html
```

Không còn `_includes/index-source.html` hoặc Liquid wrapper làm homepage source song song.

---

# 8. Khi sửa shared component

Một thay đổi Header/Menu/Footer phải được xem là site-wide change.

Checklist:

- [ ] sửa canonical source duy nhất;
- [ ] không patch riêng index;
- [ ] không patch riêng một child page;
- [ ] kiểm tra root page;
- [ ] kiểm tra nested `bai-viet/` page;
- [ ] kiểm tra homepage;
- [ ] kiểm tra desktop/tablet/mobile;
- [ ] kiểm tra active menu;
- [ ] kiểm tra dropdown desktop/mobile;
- [ ] kiểm tra Search;
- [ ] kiểm tra Footer đủ Facebook/Instagram/TikTok;
- [ ] kiểm tra Floating Contact chỉ có một instance;
- [ ] bump cache key ở loader khi cần;
- [ ] fetch lại file sau write.

---

# 9. Quy tắc supersede tài liệu cũ

Nếu một đoạn legacy nói rằng khi sửa menu phải:

```text
sửa homepage menu
+ sửa non-homepage menu riêng
```

thì hướng dẫn đó **đã lỗi thời**.

Chuẩn hiện hành là:

```text
một canonical navigation component
→ áp dụng cho homepage
→ áp dụng cho mọi child page
```

Tương tự, Footer không còn được duy trì như các copy độc lập theo từng trang.

Nếu tài liệu cũ nói:

```text
index.html = Jekyll/Liquid wrapper
_includes/index-source.html = homepage source
```

thì hướng dẫn đó cũng **đã lỗi thời**. Chuẩn mới:

```text
index.html = standalone static homepage source of truth
```

Xem `docs/HOMEPAGE_STATIC_SOURCE_STANDARD.md`.

---

# 10. Definition of Done

Một thay đổi shared chrome chỉ được xem là đúng kiến trúc khi:

```text
Không cần sửa index riêng để đồng bộ Header/Menu/Footer.
Không cần sửa từng child page để đồng bộ Header/Menu/Footer.
Canonical source quyết định runtime output toàn site.
```

Một thay đổi homepage chỉ được xem là đúng kiến trúc khi:

```text
index.html vẫn là HTML tĩnh hoàn chỉnh.
Không táiintroduce Liquid wrapper hoặc homepage source thứ hai.
Shared chrome vẫn đi qua canonical components.
```
