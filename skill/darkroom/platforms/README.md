# Platforms: where the design will live

Darkroom designs once and ships it on the platform the user needs. Each profile below is **dated and short**, and names the official pages to re-read before building, because platforms change every few months. The live docs win over the profile; when they disagree, say so in one line and note it in the handoff so the maintainer can update the profile.

| id | Platform | Choose it when | Free to host? | Starter |
|---|---|---|---|---|
| `static` | Plain HTML/CSS/JS | a landing page, portfolio or small site that must load fast and cost nothing | yes: Cloudflare, GitHub Pages (non-commercial), Netlify | `darkroom platform scaffold static` |
| `php` | PHP site | the user has shared hosting, or wants a contact form without a third-party service | free PHP hosts exist, with limits and ads | `scaffold php` |
| `astro` | Astro on Cloudflare | a content site or landing page with several pages, fast, modern, free | yes: Cloudflare Workers static assets | official generator |
| `nextjs` | Next.js on Vercel | React, or a site that will grow into an app | Vercel Hobby is free for **non-commercial** use only; static export anywhere | official generator |
| `hugo` | Hugo | a blog, docs or a big content site; one binary, very fast builds | yes: Cloudflare, Netlify, GitHub Pages via Actions | `scaffold hugo` |
| `jekyll` | Jekyll | a blog or portfolio on GitHub Pages with no build setup | yes: GitHub Pages builds it | `scaffold jekyll` |
| `wordpress` | WordPress block theme | the client edits pages themselves; blogs; the web's most common CMS | needs a host that allows custom themes | `scaffold wordpress` |
| `woocommerce` | WooCommerce (WordPress shop) | a shop on WordPress, the client owns everything, no platform fee | needs a WordPress host; payments cost per transaction | `scaffold woocommerce` |
| `shopify` | Shopify theme | a shop that must just work: payments, tax, shipping handled | no: a paid Shopify plan (free development store to build) | `scaffold shopify` |
| `ghost` | Ghost theme | a publication or newsletter with paid members | Ghost(Pro) is paid; self-hosting is free but needs a server | `scaffold ghost` |
| `prompt` | Prompt for an AI builder (Lovable, v0, Bolt, Cursor, Replit, Manus, AI Studio, Kimi) | the user builds in one of those and wants a prompt to paste; Darkroom designs, writes `PROMPT.md`, then captures the builder's preview and writes the fix prompts | the builder's own plans | `scaffold prompt` (a `PROMPT.md` to fill) |

Not supported as code, and why: `builders.md` (Wix, Squarespace, Webflow, Framer: closed editors; Darkroom delivers a design kit instead). Candidates considered and the bar for adding one: also `builders.md`.

## Picking the platform (do this at intake, `commands/platform.md`)

1. If the user names a platform, use it. Never argue them out of it; say the one catch if there is one ("Vercel's free plan is non-commercial").
2. **If their current site already runs on one** (`darkroom import` prints "built with"), recommend staying on it: their posts, products, plugins, logins and search rankings stay where they are. Recommend moving only for a reason they gave (cost, speed, a feature), and say what a move costs: content re-entered or exported, redirects for every old address (`commands/import.md`). A closed builder (Wix, Squarespace, Webflow, Framer) stays a design kit unless they want to leave it (`builders.md`).
3. Otherwise recommend from the job: sells products → `shopify` (wants it simple) or `woocommerce` (already on WordPress, or wants no platform fee); a client edits it → `wordpress`; one page or a portfolio, free → `static`; several content pages, free → `astro`; blog on GitHub → `jekyll`; newsletter or members → `ghost`; they build in Lovable, v0, Bolt, Cursor or similar and want a prompt → `prompt`.
4. State it in one line with the hosting cost, then record it: `darkroom state --set platform=<id>`.

## The live-docs check (before the first line of platform code)

Run it when the profile's "Checked on" date is **more than 30 days old**, when the build needs something the profile does not cover, or when the user asks. Otherwise build from the profile (it costs the user nothing) and name its date in the handoff.

1. Open every link under "Official docs to check" in the profile (WebFetch, or a browser).
2. Compare: required files, folder layout, the current version and its new features, deprecations, CLI commands, hosting limits and terms. A vendor blog or tutorial is not an official doc.
3. If anything changed, follow the live docs and write one line in `.darkroom/BRIEF.md` under "Platform notes" (what changed, which URL, today's date).
4. No web access: build from the profile, and tell the user "built from Darkroom's notes of <Checked on date>; not re-checked against the live docs".

## The same design on every platform

The design bible's tokens (ground, surface, ink, ink-2, accent, accent-ink, line, focus; display and body fonts; type steps; spacing) map to each platform's own settings, so the client can change colours without touching code:

| Platform | Where the tokens live |
|---|---|
| static, php, astro, nextjs, hugo, jekyll | CSS custom properties in one stylesheet (`:root`) |
| wordpress, woocommerce | `theme.json` palette, font families and sizes (shown in the Site Editor) |
| shopify | `config/settings_schema.json` colour and font settings, written into CSS variables in `layout/theme.liquid` |
| ghost | CSS custom properties, with Ghost's `--gh-font-heading` / `--gh-font-body` taking over when the publisher picks fonts |

The recipes (`recipes/reveal.js`, scroll-scrub, frames) are plain JavaScript and work on all of them; each profile says where to put the files.
