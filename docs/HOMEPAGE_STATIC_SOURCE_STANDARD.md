# Mây Yoga — Homepage Static Source Standard

> **Hiệu lực:** tài liệu này là source of truth cho kiến trúc homepage sau đợt chuyển đổi ngày 2026-07-22.
>
> Nếu tài liệu cũ còn nói `index.html` là Jekyll/Liquid wrapper hoặc `_includes/index-source.html` là source homepage, hướng dẫn đó **đã lỗi thời** và tài liệu này được ưu tiên.

---

## 1. Source of truth duy nhất

Homepage hiện là một file HTML tĩnh hoàn chỉnh:

```text
index.html
```

`index.html` phải bắt đầu bằng HTML thật (`<!DOCTYPE html>`) và phải có thể được trình duyệt đọc trực tiếp mà không cần Jekyll/Liquid render trước.

Không được tái tạo kiến trúc cũ:

```text
index.html
  -> Liquid capture/include/replace
  -> _includes/index-source.html
  -> Jekyll build
  -> HTML cuối
```

Không thêm lại các pattern như:

```liquid
{% capture ... %}
{% include index-source.html %}
{% assign ... | replace: ... %}
{{ page_source }}
```

---

## 2. GitHub Pages

Website được publish bằng GitHub Pages.

Homepage không cần Liquid/Jekyll để tạo nội dung cuối. `index.html` là static HTML và GitHub Pages có thể phục vụ trực tiếp tại `/`.

Không thêm `.nojekyll` hoặc thay đổi cơ chế deploy chỉ để phục vụ homepage, trừ khi có một yêu cầu kiến trúc riêng và đã kiểm tra ảnh hưởng toàn repo.

---

## 3. Những gì thuộc trực tiếp `index.html`

`index.html` sở hữu nội dung homepage và các dependency homepage-specific, ví dụ:

- SEO/meta/JSON-LD của homepage;
- Hero markup;
- `body.home-hero-redesign`;
- Hero principles markup;
- section `#hanh-trinh`;
- section `#categories`;
- section `#poses`;
- YTT / featured blog section;
- FAQ homepage;
- homepage-specific CSS links;
- preload Hero desktop/mobile;
- homepage-specific JS loaders.

Các optimization từng được Liquid inject trước đây đã được flatten vào HTML thật, gồm:

- critical homepage CSS links;
- mobile Hero layers;
- Hero image preloads;
- first visible practice images dùng eager loading;
- Hero principles markup;
- canonical shared component scripts.

Khi sửa homepage, chỉnh trực tiếp `index.html` và các stylesheet/script homepage tương ứng. Không sửa một file source homepage thứ hai.

---

## 4. Shared Chrome vẫn không thuộc riêng homepage

Dù `index.html` là HTML tĩnh, Header/Menu/Search/Footer/Floating Contact vẫn dùng component canonical toàn site.

Structural/behavioral navigation source of truth:

```text
js/site-navigation-canonical-v2.js
```

Shared navigation presentation:

```text
css/site-navigation-canonical-v4.css
```

Header geometry:

```text
css/header-index-canonical-v3.css
```

Shared chrome / Footer / Floating Contact bootstrap:

```text
js/site-chrome.js
```

Do đó:

```text
Sửa menu toàn site
-> sửa canonical navigation component
-> KHÔNG sửa menu riêng trong index.html để đồng bộ

Sửa Footer toàn site
-> sửa footerMarkup()/shared footer style
-> KHÔNG sửa Footer fallback riêng trong index.html để đồng bộ
```

Markup Header/Footer có trong `index.html` chỉ cung cấp shell/fallback và giảm layout shift. Runtime canonical component vẫn quyết định shared output.

---

## 5. Không được tạo lại homepage source song song

Không tạo hoặc duy trì các file kiểu:

```text
_includes/index-source.html
index-source.html
homepage-source.html
```

như một source thứ hai của homepage.

Lý do: hai source dễ lệch nhau và khiến AI/developer sửa nhầm file.

Quy tắc:

```text
index.html = homepage source of truth duy nhất
```

---

## 6. Bảo toàn cascade khi chỉnh homepage

Homepage đã qua nhiều vòng polish. Không tùy tiện đổi thứ tự hoặc xóa các stylesheet chỉ vì thấy nhiều layer.

Các layer quan trọng hiện gồm, tùy phiên bản đang load trong `index.html`:

```text
css/style.css
css/index-responsive.css
css/index-hero-principles.css
css/hero-redesign-v2.css
css/hero-fix-v4.css
css/index-hero-final-static.css
css/index-mobile-hero-v2.css
css/index-mobile-polish-v3.css
css/index-mobile-fixes-v4.css
css/index-mobile-refine-v5.css
css/index-mobile-hero-air-v6.css
css/index-hero-principle-icons-v2.css
css/index-practice-carousel-v2.css
css/index-practice-mobile-v3.css
css/index-footer-component-compat-v2.css
```

Khi cleanup CSS, phải coi đó là một refactor riêng, có regression check desktop/tablet/mobile. Không gộp cleanup CSS vào một thay đổi nội dung nhỏ.

---

## 7. Preview local

Sau khi clone repo, `index.html` không còn chứa Liquid thô nên có thể mở trực tiếp để xem HTML/CSS/JS cơ bản.

Tuy nhiên `file://` không thay thế hoàn toàn HTTP server. Một số Web API tương lai có thể bị browser hạn chế.

Quy trình khuyến nghị:

```text
Xem nhanh        -> mở index.html trực tiếp
Kiểm tra đầy đủ  -> dùng local HTTP server / Live Server
Production       -> GitHub Pages
```

Không được táiintroduce Liquid chỉ để phục vụ GitHub Pages.

---

## 8. Checklist khi sửa homepage

- [ ] `index.html` vẫn bắt đầu bằng `<!DOCTYPE html>`.
- [ ] Không có `{% ... %}` hoặc `{{ ... }}` trong homepage source.
- [ ] `body` vẫn có class homepage cần thiết.
- [ ] Hero desktop và mobile giữ đúng asset/cascade hiện hành.
- [ ] Hero principles vẫn tồn tại.
- [ ] Header/Menu dùng canonical navigation.
- [ ] Search hoạt động qua shared shell/engine.
- [ ] Footer được `site-chrome.js` normalize từ canonical markup.
- [ ] Floating Contact chỉ có một canonical instance.
- [ ] Practice carousel desktop/mobile còn hoạt động.
- [ ] `#categories` vẫn tồn tại vì Header CTA “Khám phá ngay” trỏ tới đây.
- [ ] SEO metadata + JSON-LD còn đủ.
- [ ] Kiểm tra root URL `/` và `index.html`.
- [ ] Kiểm tra desktop/tablet/mobile khi thay đổi layout.
- [ ] Sau write phải fetch lại source thật trên `main`.

---

## 9. Supersede tài liệu cũ

Các hướng dẫn cũ sau đây không còn đúng:

```text
index.html = Jekyll/Liquid wrapper
_includes/index-source.html = homepage content source
index-nav-* = homepage navigation implementation
site-header-standard.js = navigation source riêng cho child pages
```

Chuẩn hiện hành:

```text
index.html
= standalone static homepage source

js/site-navigation-canonical-v2.js
= navigation structure/behavior toàn site

css/site-navigation-canonical-v4.css
= navigation presentation toàn site

css/header-index-canonical-v3.css
= shared header geometry

js/site-chrome.js
= shared chrome bootstrap + canonical Footer/Floating Contact
```

Khi một đoạn legacy trong `docs/AI_DEVELOPMENT_GUIDE.md` mâu thuẫn với tài liệu này hoặc `docs/SHARED_SITE_CHROME_STANDARD.md`, **chuẩn homepage/shared-chrome mới hơn được ưu tiên**.
