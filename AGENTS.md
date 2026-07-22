# Mây Yoga — Instructions for AI/Coding Agents

Before creating, editing, moving, or deleting any page/article/component in this repository, **read and follow both**:

```text
docs/AI_DEVELOPMENT_GUIDE.md
docs/VISUAL_DESIGN_SYSTEM.md
```

These are mandatory and serve different purposes:

```text
AI_DEVELOPMENT_GUIDE.md = architecture, shared components, paths, search, SEO, technical responsive rules
VISUAL_DESIGN_SYSTEM.md = visual language, typography, color, composition, responsive intent, anti-patterns, visual QA
```

When creating, editing, or restyling breadcrumbs, also read:

```text
docs/BREADCRUMB_STANDARD.md
```

When changing Header/Menu/Search/Footer/Floating Contact or homepage shared chrome, also read:

```text
docs/SHARED_SITE_CHROME_STANDARD.md
```

This is mandatory, especially for work involving:

- new HTML pages or articles;
- new page/section design;
- Header/Menu/Search;
- Breadcrumbs;
- Footer;
- floating Zalo/WhatsApp contact buttons;
- article sharing controls;
- navigation level 2;
- responsive behavior;
- search index;
- homepage/index;
- SEO metadata;
- shared CSS/JS components.

## Non-negotiable rules

1. The shared component is the standard. Do not create page-specific copies of Header/Menu/Footer behavior.
2. `js/site-chrome.js` is the shared site-chrome bootstrap for **homepage and child pages alike**. It owns canonical Footer rendering, Floating Contact normalization, Breadcrumb loading, canonical navigation bootstrap, and shared article-share bootstrap.
3. `js/site-navigation-canonical-v2.js` is the single structural/behavioral source of truth for Header/Menu/Search/CTA/Hamburger across homepage and all child pages. Do not maintain a separate homepage menu implementation.
4. `css/header-index-canonical-v3.css` remains the visual geometry source of truth for the shared Header because the approved homepage proportions define the site standard. “Homepage is visual source of truth” does **not** mean homepage owns a separate menu structure.
5. `css/site-navigation-canonical-v4.css` owns shared navigation presentation/interaction styling. Do not recreate `index-nav-*` as a separate homepage navigation system.
6. `js/site-chrome.js` renders the canonical Footer markup. Do not edit Footer separately in `index.html`, `_includes/index-source.html`, or individual page HTML to make a site-wide Footer change.
7. `css/breadcrumb-canonical-v1.css` owns the site-wide breadcrumb visual standard. Breadcrumb styling includes the parent link, separator, **and the current-page label**. New pages should use the DOM contract in `docs/BREADCRUMB_STANDARD.md`; do not create page-specific breadcrumb variants.
8. `js/article-share-standard.js` owns the canonical article sharing controls: Facebook, Zalo, X, native share when supported, and Copy Link. New article pages should use an `.article-share` shell and must not hard-code a separate set of share icons.
9. `index.html` is a Jekyll/Liquid wrapper; `_includes/index-source.html` is the preserved homepage content source. Do not replace the wrapper casually. Legacy Header/Footer markup inside the preserved source is fallback markup only; runtime canonical shared components are authoritative.
10. New pages must use the correct shared component DOM contract, relative paths, search integration, responsive rules, and SEO checklist documented in `docs/AI_DEVELOPMENT_GUIDE.md`.
11. New pages and redesigned sections must follow the visual grammar, typography, color hierarchy, spacing, card/button language, responsive intent, anti-patterns, and Visual QA checklist in `docs/VISUAL_DESIGN_SYSTEM.md`.
12. Before designing a new page, classify the page/section type and inspect the closest approved visual reference. Current approved references include `hoc-yoga-online.html` for service/course/sales patterns and `ve-may-yoga.html` for about/profile/editorial patterns. Learn the design grammar; do not blindly copy unrelated sections.
13. Mobile is not merely stacked desktop. For each section, evaluate mobile intent separately: scan vs. read, image priority, information density, ordering, and whether the composition itself should change.
14. **Do not edit homepage navigation/footer separately when changing shared chrome.** Any older instruction that says to update both homepage menu markup and a non-homepage `navMarkup()` is superseded by `docs/SHARED_SITE_CHROME_STANDARD.md`.
15. Do not rely on legacy fallbacks when creating a new page. Build the source correctly from the start.
16. When changing a shared component, treat it as a site-wide change and verify representative homepage + root + nested + mobile/desktop pages.
17. After any repository write, fetch/read the changed file again and verify the actual commit SHA before reporting completion.
18. Never claim browser, deployment, or pixel-perfect verification unless it was actually performed.

When a legacy page conflicts with the documented shared component standard, **the shared component standard wins** unless the user explicitly requests a new site-wide design change.

When a newly generated page is technically correct but visually conflicts with the approved Mây Yoga design language, **`docs/VISUAL_DESIGN_SYSTEM.md` wins** unless the user explicitly requests a different visual direction.
