# WordPress content: the theme is the look, the pages are theirs

Checked on: 2026-10-26. Applies to `wordpress` and `woocommerce`. Read it before building any WordPress theme and again before the handoff.

## The rule
**A theme is only the look. Pages, posts, text and images live in the WordPress database.** Uploading a theme never adds anything to *Pages*; switching themes never deletes anything. So Darkroom always delivers two separate things, and says so to the user in one line:
1. **The theme** (zip): `theme.json`, templates, parts, patterns, CSS. Templates show the user's content (`wp:post-content`, `wp:post-title`, queries); they hold no page text.
2. **The content**: patterns, paste files or `content.xml` (below), loaded into *their* WordPress, where they can edit it in *Pages*.

Never put a page's text in a template. A theme with `templates/front-page.html` overrides the page set in *Settings → Reading* (it wins for "a static page" and "your latest posts" alike: [template hierarchy](https://developer.wordpress.org/themes/basics/template-hierarchy/)), so the client edits *Pages → Home* and nothing changes. The scaffold has no `front-page.html`; it has `templates/page-landing.html` ("Landing (no title, sections only)"), which the Home page picks in *Page → Template*. `darkroom platform check` fails a `front-page.html` that does not show the page.

## Read the situation first (never ask what the import already answered)
`darkroom import <their site> --list` tells you whether pages exist and what they are built with. Then:

| Their site | What Darkroom delivers | Say |
|---|---|---|
| **No pages yet** (new site, or only the default "Sample Page") | theme + `content.xml` with real pages, posts and images; Home uses the Landing template | "You'll get the theme and a file that creates your pages, so you can edit them in Pages." |
| **Pages they want to keep** (text and images stay) | a theme that shows their pages as they are: no pages of its own, their addresses, their menus. Better wording only as suggestions, page by page, through paste files | "Your pages and posts stay; the new design shows them. I'll suggest new text page by page, and you pick." |
| **Pages they want replaced** (new pages, inspired by the old ones) | the *Replace or add* question below, then paste files (replace) or `content.xml` as drafts (add) | the question below |
| **Pages built with a page builder** (Kadence, Elementor, Divi…) | *Page builders* below: the design goes into the builder's global settings, not just a new theme | "Your pages are built with Kadence, so the colours and fonts go into Kadence's own settings too, or half the page stays old." |
| **Their theme files are here** (a folder or `git` copy of the theme) | restyle that theme or a child of it (`platforms/wordpress.md`); content as in the rows above | — |

No theme files and no access is normal: the content is in their database and the live site shows it. Read it with `darkroom import` (texts, images, addresses in `url-map.json`); ask for *Tools → Export → All content* (built in, free) only for the preview with real content.

The redirect trap: a theme that links to its own pages (`/pricing`, `/about-us`) sends visitors to whatever page has that address, often an old one still in the old layout. Menus come from *Appearance → Editor → Navigation* (a `wp:navigation` block with no fixed links); any other link in a template or pattern uses an address from their `url-map.json`, or none.

## Replace or add (ask before making any page)
When they want new pages instead of their current ones, ask once, with a page-by-page list from `url-map.json`:

> "How should the new pages go in?"
> 1. **Replace the content, keep the page and its address (recommended).** Links, menus and Google keep working; WordPress keeps the old version under *Revisions*.
> 2. **Add the new pages as drafts next to the old ones.** You check them, then swap.
> 3. **Delete the old pages and start fresh.** Only for pages nobody links to, or a site that is not public yet.

Then show the list, e.g. *Home → replace · About → replace · Old offer → no new page: delete it? · Blog posts → keep (they bring search traffic)*, and wait for a yes per line that deletes anything. Posts are kept by default; the new theme restyles them.

Never delete, and never tell the user to delete, before step 1 of *Going live* (`platforms/wordpress.md`): a backup and a way back.

## Three ways to hand over the content
Pick by job; say which and why in one line. Hand over the finished files (theme zip, `content.xml`, `paste/`) with only the WordPress steps below: the user clicks in WordPress, never in a terminal. Write every step in the user's language, with the exact menu names.

**1. Patterns: for adding sections.** Every designed section (hero, offer, proof, prices, contact) is a file in `patterns/` with `Title:`, `Slug: <theme>/<name>` and `Categories:`. The user: *edit a page → **+** (top left) → Patterns → <theme name> → click the section*, then clicks the text to change it. Pattern text is starter text in `esc_html__()`, written as real copy for their business, never "Placeholder".

**2. Paste files: for replacing an existing page and keeping its address.** `paste/<slug>.html`, one per page. The user:
1. *Pages → <the page> → Edit*.
2. Top-right **⋮** → **Code editor**.
3. Select all (Ctrl+A / Cmd+A), delete, paste the file's contents.
4. **⋮** → **Visual editor**. Check that no block says "This block contains unexpected or invalid content", then **Update** (or **Save draft** first).
For the Home page also: *Page → Template → Landing* in the right-hand panel. The old version stays under *Revisions* (**⋮** → *Revisions*, or the *Revisions* link in the panel).

**3. `content.xml`: for creating many pages and posts at once** (a new site, or *add as drafts*). The user:
1. Upload and activate the theme first (the images load from it).
2. *Tools → Import → WordPress → Install Now* (free, made by WordPress), then *Run Importer*.
3. Choose `content.xml`, assign the author to themselves, tick **Download and import file attachments**, *Submit*.
4. *Settings → Reading → Your homepage displays → A static page → Homepage: <Home>*. Save.
5. *Pages*: open each draft, check it, *Publish*. Add the pages to the menu in *Appearance → Editor → Navigation*.
The importer skips a page that already exists with the same title and date, and gives a new page a `-2` address when the old one is taken: that is fine for drafts; swap addresses when publishing (rename the old page's slug first, then give the new one the original).

### Building the content (you do this; the user never runs it)
Do it on your own whenever the job delivers pages or posts: no question, no command for the user. Write the pages as block markup in `content/` next to the theme, plus `content/content.json`:
```json
{ "site": "Halden Kiln", "siteUrl": "https://haldenkiln.com", "theme": "halden-kiln", "status": "draft",
  "pages": [ { "file": "pages/home.html", "title": "Home", "template": "page-landing", "front": true },
             { "file": "pages/about.html", "title": "About", "slug": "about" },
             { "file": "pages/team.html", "title": "Team", "parent": "about" } ],
  "posts": [ { "file": "posts/first-firing.html", "title": "The first firing", "date": "2026-10-01", "categories": ["Studio"], "image": "kiln.jpg" } ],
  "images": [ { "file": "kiln.jpg", "alt": "The kiln at night" } ] }
```
Then run `darkroom platform content content --theme <theme folder> [--site https://their-site] [--out dir]` yourself, fix every problem it prints, and run it again until it is clean. It writes `content.xml` and `paste/<slug>.html`, and fails on unbalanced blocks, unfilled `{{…}}`, placeholder text, two pages with one address, a missing parent, featured image or template, and more than one front page. Defaults: `status` draft, out `content/out`.

- Use the same blocks the theme's patterns use (insert a pattern's markup, then replace its words); keep block markup minimal so the editor accepts it.
- Existing pages: `slug` = their current address from `url-map.json`, so a paste replaces the right page.
- Several languages: one set of files per language; the translation plugin links them after the import (say which steps that plugin needs; check its docs live).

### Images
Block files write images as `{{images}}/name.jpg`; the command resolves them to `<siteUrl>/wp-content/themes/<theme>/assets/images/`. Put the files there in the theme. With *Download and import file attachments* ticked, the importer copies them into the *Media Library* and rewrites the addresses in the imported pages; it rewrites only images that are in the same import file ([Trac #61620](https://core.trac.wordpress.org/ticket/61620)), so every image is listed in `images`. Paste files keep the theme address: the images work while the theme is active; tell the user to upload them to *Media* and swap them in the image block (*Replace*) if they may change theme later. Their own images already in *Media* keep their current addresses: use those as they are.

## Page builders (Kadence, Elementor, Divi, Beaver, WPBakery, Bricks)
A page-builder section stores its own colours, fonts and spacing inside the page, or points to the builder's **global** colours and fonts. A theme changes the parts around it (header, footer, base type) and nothing inside. So:
- **Default: restyle the builder's global settings and keep their theme** (`platforms/wordpress.md`, "Keep the current theme, or a new one?"). Give the user the exact settings, in order, as a list they can tick off, plus a child theme only for what the settings cannot express.
- **Before promising, read one real page** (`darkroom import` keeps the HTML): sections whose colours are `var(--global-palette…)` (Kadence) or `var(--e-global-color-…)` (Elementor) follow the global settings; sections with fixed hex values, inline styles or their own font picks do not, and need editing one by one. Count them and say it: "8 of 11 sections follow the global colours; 3 have their own colours and need a click each."
- **Never build plain-WordPress blocks for a site whose pages are builder pages** without the user's yes: it means rebuilding every page, and the builder stays installed with its old look on the rest.

**Kadence** (Kadence Blocks, often with the Kadence theme). Its colours are a palette of nine slots, output as `--global-palette1` … `--global-palette9`; blocks that use the palette follow it ([Nexcess Kadence docs](https://docs.nexcess.com/software/kadence/blocks/customize-design-library-color-palette/)). Kadence's own design library uses slot 1 for the highlight, 3 for the dark colour and 9 for the light one; the slot order matters, so map Darkroom's palette by role, not by position:
- **Kadence theme active:** *Appearance → Customize → Colors & Fonts → Colors* (the global palette), then *Typography* for fonts. Write the nine values out with their role.
- **Kadence Blocks with another theme** (including a Darkroom block theme): Kadence's docs define the nine variables in code (a filter in a child theme's `functions.php`). For a Darkroom theme, map them in `assets/site.css` to the theme's own tokens, so one change in *Styles* moves both: `:root { --global-palette1: var(--wp--preset--color--accent); … }`.
- Check the current menu names and the filter on Kadence's docs before telling the user; this profile has not been run against a live Kadence site (not verified).

**Elementor:** *Site Settings → Global Colors / Global Fonts* (the Elementor kit). **Divi:** Divi's global colours and the Theme Customizer. Check the menu names live; never guess.

## Done means
- `darkroom platform check <theme>` has no `content` finding; no template holds page text.
- The user knows, page by page, what they will see the moment the theme is switched on (`platforms/wordpress.md`, *Going live*, step 2).
- The content was loaded into a copy of their site (Playground with their export, or staging) before the live one. If it was not, say "the import was not tested".
