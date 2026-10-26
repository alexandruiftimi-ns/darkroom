# Changelog

Darkroom uses [semantic versioning](https://semver.org): **major.minor.patch**.
A **major** change breaks how projects or commands worked before, a **minor** one adds features, a **patch** fixes things.
The installed version: `node ~/.claude/skills/darkroom/scripts/darkroom.mjs version` (or the `VERSION` file in the skill).

## 1.3.0 · 2026-10-26

- **Install as a Claude Code plugin.** `/plugin install darkroom --marketplace alexandruiftimi-ns/darkroom`, then `/darkroom:darkroom`. Updates with `claude plugin update darkroom@darkroom`. The plain-skill install (`node install.mjs` or the release zip, command `/darkroom`) works as before; use one or the other.
- A test keeps the plugin's version and paths in step with the skill.

## 1.2.0 · 2026-10-26

- **`darkroom doctor`.** Checks Node, Playwright, a browser and ffmpeg, and prints the exact command for anything missing. It installs nothing.
- **Phone views are real phone views.** Screenshots and the audit at phone width now honour the page's viewport tag and touch, with no hover, as a phone does. A page that forgets the viewport tag now shows the problem instead of hiding it.
- **Zip packed on Windows works on Mac and Linux.** It used backslash paths; it now uses Windows' own tar.
- **Tested on Linux, Mac and Windows** on every push.
- Example library reworded as design notes; licence holder is "Darkroom contributors".

## 1.1.0 · Reasoning update · 2026-10-26

Darkroom now thinks about your situation before it builds, instead of following one fixed path.

- **Sees what your site is built with.** `darkroom import` reports the platform, theme, page builder and translation plugin (e.g. WordPress · Kadence · Kadence Blocks · TranslatePress). It reads the page's elements and the files it loads, not the stylesheet text, which mentions other builders' class names.
- **Stays where you are.** A site already on WordPress, Shopify or Ghost is recommended to stay there; a move is suggested only for a reason you give, with what it costs (content, redirects).
- **Page builders.** Asks what your pages are built with only when it can't tell, with "I don't know: check for me" as the recommended option. Pages built with a page builder: restyle the current theme rather than swap it.
- **Decides where to build the first design**, and names the cost: in your theme (restyles), in the platform with your real content (new themes), or an HTML preview first when the platform can't run yet. Fixes two playbooks that disagreed about this.
- **Preview with your real content** on WordPress (an export loaded into Playground, or your host's staging site).
- **How much to build first.** New question for multi-page sites: home page first and approve, one page first, or the whole site now. Then it asks before building the rest, and the final list marks every page built, merged or left out.
- **Sites that block crawlers.** `--ignore-robots` for your own site (after you say so). An import that finds nothing stops and explains why, and never turns into a home-page-only build.
- **Posts and products are templates**, not pages to redesign one by one; several languages are asked about and their plugin kept.
- **Fewer questions.** The site listing runs before the first question, so what it answers is not asked; round 1 stays at four.
- **Quick check** now looks at the home page plus the page that earns money (a product, pricing, contact), and says clearly that it limits checking, not building.
- **Live docs check** only when a platform's notes are more than 30 days old, or the build needs something they don't cover. Saves usage.
- **Motion versus editing.** On a CMS, a scroll story or hero effect is a locked section with editable words and pictures; Darkroom says that trade-off.
- `darkroom version`, this changelog, and a test that keeps the version numbers in step.

## 1.0.0 · 2026-10-26

First public release: art-directed websites on ten platforms (Shopify, WooCommerce, WordPress, Astro, Next.js, Hugo, Jekyll, Ghost, PHP, plain HTML); start from scratch or from your current site; 13 style packs and "like <brand>" looks; four motion levels; colour and asset questions; phone preview; asset check that suggests and never rejects; capture, audit and platform checks.
