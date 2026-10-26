# Import: start from the user's current site

Use when the request points at an existing site: a live address (*"redesign https://mybakery.com"*) or a folder on this computer (*"here's my current site: D:\sites\bakery"*). The new design starts from the owner's real words, pictures and pages instead of a blank brief.

## 1. Ask, in the first question round (`commands/concierge.md`)

- **Is it yours?** "Is this your own site (or one you have the right to reuse)?" If not, stop: study it as a reference only (`commands/study.md`), never copy its content.
- **What to bring over:** "Texts and images (recommended)" / "Only the texts" / "Only the images" / "Nothing, just look at it". Map to `--take text,images`, `--take text`, `--take images`, or `darkroom study <url>` alone.
- **Which pages** (after the listing in step 2): "All N pages" / "The main ones: <list>" (recommended when more than 8) / "Let me pick".

## 2. List, then import

```
darkroom import <url|folder> --list                         # pages, words and images per page; nothing saved
darkroom import <url|folder> --pages home,about.html,menu --take text,images [--max 40] [--out .darkroom/import]
darkroom import <url> --list --ignore-robots                # the user's own site only, after they said yes (see below)
```

- A **live URL** is crawled in a real browser (sites built with JavaScript work), same domain only, `robots.txt` respected, cookie banners rejected, up to `--max` pages (default 40).
- **Blocked by `robots.txt`** (many sites allow only Google and Bing, e.g. `User-agent: *` / `Disallow: /`): the listing finds 0 pages and says so. If the user confirmed the site is theirs, tell them in one line ("your site blocks crawlers other than Google; since it's yours I'll read it anyway") and re-run with `--ignore-robots` (put it after the address). Never on a site that is not theirs.
- **Check the count before going on.** Compare the pages found with the links in the site's menu. 0 pages, or fewer than the menu shows: stop and tell the user which pages are missing and why. **Never build from the home page alone because the import came back empty.**
- **Posts, products and categories are content, not pages to redesign one by one** (`/blog/…`, `/category/…`, `/product/…`): count them, then build their templates (post, archive, product) and fill one with a real post. On WordPress, Shopify and Ghost they stay in the database and pick up the new design by themselves. Ask "which pages" about the rest.
- **Several languages** (`/en/`, `/ro/`, a language switcher): each language version is its own page. Ask which languages to bring over, import one language's pages first, and keep the translation plugin's setup on WordPress (TranslatePress, WPML, Polylang) when the platform stays the same.
- A **folder** is served and crawled when it is plain HTML or has a built output (`public/`, `_site/`, `dist/`, `out/`). PHP, Markdown and template sources are **read, not run**: anything a database or the server adds is missing; say so. Files that other files include (`header.php`) are parts, not pages.
- A **WordPress, WooCommerce, Shopify or Ghost theme folder** holds no content (it lives in the database): the command says so; ask for the live address instead.
- `--pages` takes paths (`/about`, `about.html`) and `home` for the home page.

Output in `.darkroom/import/`: `CONTENT.md` (read this first: navigation, contact details, every page's text in reading order, images with sizes and suggestions), `content.json`, `images.json`, `url-map.json`, `images/`.

## 3. Use it

- **Words:** the owner's text is the source of truth. Fit it into the new design; when it is too long for the new layout (word budgets, `references/attention.md`), propose a shorter version side by side and let the owner choose. Never invent facts that were not there.
- **Images:** every imported picture is usable. `CONTENT.md` notes what could be better ("900 px wide: soft as a full-width hero; ≥ 2400 px would be sharp"). Put the useful suggestions on `NEEDS.md` as *Improves* items, never *Blocks*.
- **Structure:** the old navigation tells you which pages matter to the owner. Keep what works, merge thin pages, and say what you merged. Every page the user kept is in the page list of the bible and gets built (when they chose to approve the home page first, after that approval: `scope` in `commands/concierge.md`). The final list says which pages were built, merged or left out.
- **Addresses (keep their Google ranking):** `url-map.json` lists every old address. Keep the same addresses where the platform allows, or redirect each old one to its new page: Shopify → *Online Store → Navigation → URL redirects* (CSV import); WordPress → keep the slugs, or a redirect plugin (ask before installing); Cloudflare / Netlify → a `_redirects` file; Apache hosting → `.htaccess`. List the redirects in the handoff.
- **Moving platforms** (e.g. Wix to Shopify): products, posts and customers do not travel with a design. Say what moves and how (the platform's own export/import), and that a theme change on the *same* platform keeps all products and posts.

- **Built with** (the listing's last line, also in `CONTENT.md`): the platform, theme, page builder and translation plugin, read from the page's elements and the files it loads. It is a lead, not proof: confirm it in one line with the user. It sets the defaults: stay on that platform (`platforms/README.md`), and on WordPress restyle the current theme when a page builder owns the pages (`platforms/wordpress.md`).

## 4. Say back what you found

One short message: "Your site has 6 pages, about 900 words, 14 photos (3 could be sharper), and your phone, email and Instagram. It runs on WordPress with Kadence Blocks, so I'll keep it there and restyle your theme. I'll keep your texts and pages; here is what I'd merge…" Then continue with direction (`commands/style.md`), with the imported content as the brief.
