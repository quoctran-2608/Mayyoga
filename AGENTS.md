# Mây Yoga — Instructions for AI/Coding Agents

Before creating, editing, moving, or deleting any page/article/component in this repository, **read and follow**:

```text
docs/AI_DEVELOPMENT_GUIDE.md
```

This is mandatory, especially for work involving:

- new HTML pages or articles;
- Header/Menu/Search;
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
2. `js/site-header-standard.js` owns the canonical non-homepage Header/Menu/Search behavior.
3. `js/site-chrome.js` owns the canonical Footer and Floating Contact behavior, bootstraps the shared Header, and loads shared article-share behavior.
4. `js/article-share-standard.js` owns the canonical article sharing controls: Facebook, Zalo, X, native share when supported, and Copy Link. New article pages should use an `.article-share` shell and must not hard-code a separate set of share icons.
5. `index.html` is a Jekyll/Liquid wrapper; `_includes/index-source.html` is the preserved homepage source. Do not replace the wrapper casually.
6. New pages must use the correct shared component DOM contract, relative paths, search integration, responsive rules, and SEO checklist documented in `docs/AI_DEVELOPMENT_GUIDE.md`.
7. Do not rely on legacy fallbacks when creating a new page. Build the source correctly from the start.
8. When changing a shared component, treat it as a site-wide change and verify representative root + nested + mobile/desktop pages.
9. After any repository write, fetch/read the changed file again and verify the actual commit SHA before reporting completion.
10. Never claim browser, deployment, or pixel-perfect verification unless it was actually performed.

When a legacy page conflicts with the documented shared component standard, **the shared component standard wins** unless the user explicitly requests a new site-wide design change.