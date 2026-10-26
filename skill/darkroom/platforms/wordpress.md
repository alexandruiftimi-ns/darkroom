# WordPress block theme (`wordpress`)

Checked on: 2026-10-26 against the docs below. `theme.json` schema **version 3** is current. The default theme on that date was Twenty Twenty-Five (no Twenty Twenty-Six page on wordpress.org yet): check.

## Choose it when
The client wants to edit pages, posts and menus themselves; they already run WordPress; or they want a blog. A block theme is edited visually in the Site Editor and keeps Darkroom's design in `theme.json`.

## Official docs to check before building
- https://developer.wordpress.org/themes/core-concepts/theme-structure/
- https://developer.wordpress.org/block-editor/reference-guides/theme-json-reference/theme-json-living/
- https://developer.wordpress.org/themes/global-settings-and-styles/
- https://wordpress.org/download/releases/ (the current WordPress version)
- https://developer.wordpress.org/playground/developers/local-development/wp-playground-cli/
- https://wordpress.github.io/wordpress-playground/blueprints/steps (blueprint steps, including importing an export file)

## Ask before building
- **What are the pages built with?** Use what `darkroom import` printed under "built with" and confirm it in one line ("your pages are built with Kadence Blocks"). Ask only when nothing was detected (blocked site, a folder of theme files): "Elementor" / "Divi or another page builder" / "The normal WordPress editor (blocks)" / **"I don't know: check for me" (recommended)**. On "I don't know": import the live site (with `--ignore-robots` if it is theirs and blocked) and read "built with"; if it is still unclear, ask for a screenshot of *Plugins → Installed Plugins*. Never guess.
- **Keep the current theme, or a new one?** Decide from the page builder:
  - Pages built with a **page builder** (Elementor, Divi, Kadence Blocks, Beaver Builder, WPBakery, Bricks): recommend **restyling the current theme** (its global colours and fonts, the builder's global styles, a child theme for the rest). A new theme keeps the texts, but those pages keep the builder's layout, and some lose their styling or break. Say that in one line.
  - Pages in the **normal block editor**, or a fresh site: a custom block theme designed by Darkroom (recommended: full control, light), or a child of the current default theme (faster, inherits its templates and patterns; Darkroom restyles it through `theme.json`).
- Which pages, and which ones will the client edit? (Front page as a pattern they can edit, or locked?)
- Which host? WordPress.com's free plan does not allow custom themes; most paid hosts do.
- Plugins they already rely on (forms, SEO, multilingual)? Design for them, never install them without a yes.

## What Darkroom delivers
`style.css` (theme header), `theme.json` v3 (palette, fonts, sizes, layout widths, element styles), `templates/` (index, front-page, page, single, 404), `parts/` (header, footer), `patterns/hero.php` (editable sections), `functions.php` (enqueues `assets/site.css` and `assets/site.js`). Start with `darkroom platform scaffold wordpress`. Child theme: `style.css` with `Template: <parent-folder>` plus `theme.json` overrides.

## Where the design goes
`theme.json` first (the client sees and can change it in Styles), `assets/site.css` only for what `theme.json` cannot express (focus rings, text-wrap, motion). Recipes: `assets/`, enqueued in `functions.php`.

## Preview and capture
WordPress Playground runs WordPress locally with no Docker (Node 20.18+; free download through npx, ask first):
```
npx @wp-playground/cli@latest server --mount=./<theme>:/wordpress/wp-content/themes/<theme> --blueprint=./blueprint.json --login
```
`blueprint.json` activates the theme (`{ "step": "activateTheme", "themeFolderName": "<theme>" }`) and can create sample pages with `runPHP`. Default port 9400; then `darkroom capture http://127.0.0.1:9400`. Run it from PowerShell or cmd on Windows (Git Bash rewrites the `--mount` path).

**Preview with your real content (redesigns).** An empty Playground shows sample text, so the design is judged on fake content. Ask the user for an export (*Tools → Export → All content*, a free built-in WordPress feature) and load it with the blueprint's import step (check the steps page for its current name and fields); install the same free plugins their pages need (page builder, translation) with a yes. Images in the export still load from the live site. If their host offers a **staging site** (a private copy), working there is the closest preview; ask, never touch the live site.

**Block validity (full check):** log in (Playground's default user is `admin` / `password`), open each template in the Site Editor (`/wp-admin/site-editor.php?p=/wp_template/<theme>//<template>&canvas=edit`) and list blocks with `isValid === false` from `wp.data.select('core/block-editor')`. Zero is the bar: an invalid block means the client sees an error the first time they edit.

## Deploy and free hosting
Zip the theme folder; Appearance → Themes → Add New → Upload. Or SFTP into `wp-content/themes/`. Hosting: any WordPress host that allows custom themes.

## Gotchas
- **Page builders own their pages.** A theme change does not move Elementor, Divi or Kadence layouts into the new theme; build and check one real builder page before promising a site-wide redesign.
- Block markup must match what the block saves, or the editor flags it invalid: keep markup minimal (attributes in the comment, the classes the block expects).
- Block themes do not load `style.css` automatically; enqueue extra CSS.
- Themes are GPL-licensed by convention (required for wordpress.org); say so if the user wants to sell the theme.
- Text in patterns goes through `esc_html__()` so it can be translated.
