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

## Ask before building
- **Own theme or child theme?** A custom block theme designed by Darkroom (recommended: full control, light), or a child of the current default theme (faster, inherits its templates and patterns; Darkroom restyles it through `theme.json`).
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

**Block validity (full check):** log in (Playground's default user is `admin` / `password`), open each template in the Site Editor (`/wp-admin/site-editor.php?p=/wp_template/<theme>//<template>&canvas=edit`) and list blocks with `isValid === false` from `wp.data.select('core/block-editor')`. Zero is the bar: an invalid block means the client sees an error the first time they edit.

## Deploy and free hosting
Zip the theme folder; Appearance → Themes → Add New → Upload. Or SFTP into `wp-content/themes/`. Hosting: any WordPress host that allows custom themes.

## Gotchas
- Block markup must match what the block saves, or the editor flags it invalid: keep markup minimal (attributes in the comment, the classes the block expects).
- Block themes do not load `style.css` automatically; enqueue extra CSS.
- Themes are GPL-licensed by convention (required for wordpress.org); say so if the user wants to sell the theme.
- Text in patterns goes through `esc_html__()` so it can be translated.
