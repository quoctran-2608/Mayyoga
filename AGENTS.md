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
2. The homepage/index header is the visual source of truth. `css/header-index-canonical-v3.css` owns the shared header geometry across index and non-index pages, including navbar height, logo, search, CTA size, mobile controls, and `leaf_button.svg` proportions.
3. `js/site-header-standard.js` owns the canonical non-homepage Header/Menu/Search DOM and interaction behavior. Do not add page-specific Header/Menu CSS to fight the canonical geometry layer.
4. `js/site-chrome.js` owns the canonical Footer and Floating Contact behavior, bootstraps the shared Header, loads the index-canonical header geometry, loads the canonical breadcrumb visual layer, and loads shared article-share behavior.
5. `css/breadcrumb-canonical-v1.css` owns the site-wide breadcrumb visual standard. Breadcrumb styling includes the parent link, separator, **and the current-page label**. New pages should use the DOM contract in `docs/BREADCRUMB_STANDARD.md`; do not create page-specific breadcrumb variants.
6. `js/article-share-standard.js` owns the canonical article sharing controls: Facebook, Zalo, X, native share when supported, and Copy Link. New article pages should use an `.article-share` shell and must not hard-code a separate set of share icons.
7. `index.html` is a Jekyll/Liquid wrapper; `_includes/index-source.html` is the preserved homepage source. Do not replace the wrapper casually.
8. New pages must use the correct shared component DOM contract, relative paths, search integration, responsive rules, and SEO checklist documented in `docs/AI_DEVELOPMENT_GUIDE.md`.
9. New pages and redesigned sections must follow the visual grammar, typography, color hierarchy, spacing, card/button language, responsive intent, anti-patterns, and Visual QA checklist in `docs/VISUAL_DESIGN_SYSTEM.md`.
10. Before designing a new page, classify the page/section type and inspect the closest approved visual reference. Current approved references include `hoc-yoga-online.html` for service/course/sales patterns and `ve-may-yoga.html` for about/profile/editorial patterns. Learn the design grammar; do not blindly copy unrelated sections.
11. Mobile is not merely stacked desktop. For each section, evaluate mobile intent separately: scan vs. read, image priority, information density, ordering, and whether the composition itself should change.
12. Do not rely on legacy fallbacks when creating a new page. Build the source correctly from the start.
13. When changing a shared component, treat it as a site-wide change and verify representative root + nested + mobile/desktop pages.
14. After any repository write, fetch/read the changed file again and verify the actual commit SHA before reporting completion.
15. Never claim browser, deployment, or pixel-perfect verification unless it was actually performed.

When a legacy page conflicts with the documented shared component standard, **the shared component standard wins** unless the user explicitly requests a new site-wide design change.

When a newly generated page is technically correct but visually conflicts with the approved Mây Yoga design language, **`docs/VISUAL_DESIGN_SYSTEM.md` wins** unless the user explicitly requests a different visual direction.
