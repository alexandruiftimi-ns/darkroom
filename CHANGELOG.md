# Changelog

Darkroom uses [semantic versioning](https://semver.org): **major.minor.patch**.
A **major** change breaks how projects or commands worked before, a **minor** one adds features, a **patch** fixes things.
The installed version: `node ~/.claude/skills/darkroom/scripts/darkroom.mjs version` (or the `VERSION` file in the skill).

## 1.6.0 · Precision · 2026-10-28

Darkroom now writes every value down before it writes code, and comes with 100 example sites to match.

- **A build spec before the code.** For the first slice and every section after it, Darkroom writes the exact fonts, sizes, spacing, colours, timings and media placement first, then builds exactly that. Words like "premium" or "smooth" are no longer allowed without the numbers that make them, and a built-in check flags them.
- **100 example sites you can start from.** Each one is a request you could type after `/darkroom` plus the full spec Darkroom would write: shops, restaurants, clinics, schools, portfolios, festivals, publications, a site redesign and an "apple.com-like" product page, on all ten platforms. Change the details to your own business. Darkroom reads the two closest before designing yours. (Written, not yet built: the values are defaults.)
- **Numbers for taste.** Type sizes, line heights and letter spacing by role; stagger, durations and easing for motion; spacing, section padding and text over video, so pages no longer guess them.
- **Better hero media.** Darkroom now asks for footage whose edges fade into your page colour and that leaves calm space for your words, and writes that into every image and video prompt. A list of free, licence-clean photo, video and 3D sources (it asks before downloading anything).
- **New checks:** a white flash at the first paint, a headline hidden by an entrance that never finishes (also with JavaScript off), background videos that don't play, a headline font that didn't load, and exactly which element makes the phone page scroll sideways.
- **No more see-through frames.** Scroll films now show one whole frame at a time. Darkroom no longer fades the next frame (or a finished still) over the current one to fake smoothness, which let the frame underneath show through; it adds more frames instead. A new check scrolls the page and fails any frame drawn see-through.
- **One signature per page:** every design names the one thing it will be remembered for, keeps everything else quiet, and allows at most one heavy effect.
- **A clear finish line for reviews:** ten lenses (first glance, signature, type, composition, colour, media, motion, phone, copy, polish), each pass, weak or fail, with fixes written as values.
- **Copy that has a shape:** headline, sub, button and menu patterns to write toward, not only words to avoid.
- **"Just a hero" fast lane:** ask for a quick concept and Darkroom skips the questions, builds one file and shows it, then offers to take it further.
- **A "glass cinema" look on request:** the dark, frosted, video-behind-everything startup style, done properly, for people who ask for it by name.
- **27 new tested building blocks.** First 12: a background video that never flashes white and pauses when off screen, a loop with no visible jump, readable text over video, a first-screen entrance that can't leave the page blank, headlines that rise line by line or word by word, a menu and phone menu without the usual bugs, buttons with weight, film grain, a logo strip that runs forever (with a pause button), numbers that count up, a manifesto whose words light up as you scroll, and stacking cards. Then 15 more: a word that types itself or changes in place without the line jumping, text that decodes, a wordmark that fills the width exactly, cards that become a swipe rail on phones, a product window built from real text, a button that leans toward the mouse, layers in depth, a soft spotlight onto a second picture, a carousel for a few products in depth, frosted glass, turning a product by moving the mouse, mood clips the visitor switches (dawn, noon, night), a living shader backdrop, and a 3D model people can drag (with your own copy of three.js; if anything is missing, the picture stays). Each one shows a calm, finished page to people who asked their device for less motion, and to visitors without JavaScript.
- **Moving backdrops in your colours, free.** With no footage, Darkroom can now make an abstract moving background itself in eight styles (a drifting colour field, a sweep of light, aurora, drifting particles, map-like contour lines, glowing ridges, orbit rings, colour through ribbed glass) plus grain, halftone and dot textures, that loops without a jump, fades into your page colour at the edges and keeps a calm area for your words. It's yours to use. It can't show a product, place or person.
- **Your videos made web-ready in one step:** a desktop copy, a lighter phone copy and a still frame, with the sound removed. A clip that jumps when it loops can be made into a forward-and-back copy, or the jump faded out. A product cut-out with a transparent background when a free remover is already installed on your computer (it asks first otherwise).
- **Darkroom measures the media you send:** the colour at its edges (so the page can match it), the calmest spot for the headline, and whether a video jumps when it loops. These are suggestions; nothing is rejected. Many files at once come back as one numbered sheet to pick from.
- **Prompts for AI builders.** Building in Lovable, v0, Bolt, Cursor, Replit or similar? Darkroom designs the page and writes the prompt for that tool, with exact copy, numbers and the constraints at the end. When the builder shows a preview, Darkroom checks it like any page and writes one fix prompt per problem.
- **Two more checks:** a background video that jumps every time it loops, and an early snapshot of the first screen in every review, to catch a flash before anything loads.
- **Free media sources checked live:** the licences of Pexels, Pixabay, Unsplash, Coverr and Poly Haven were read on their own pages (Mixkit and Smithsonian could not be read and are marked unconfirmed).

## 1.5.0 · Scroll Stories · 2026-10-27

Darkroom now designs scroll-animated pages from the techniques the best ones use, not just from sites in your line of business.

- **55 new design reviews** in the example library, inspired by award-winning and widely praised sites (Seasats, Mana Yerba Maté, Iventions, Lando Norris, Linear, Apple, Firewatch, Immersive Garden and more), plus 25 sites with mistakes worth avoiding.
- **Find designs by technique.** Ask for "a scroll story like ScrollTide", "frames that follow the scroll", parallax or a cursor effect, and Darkroom looks up the sites that do it well and the building block that makes it, before it looks at your business category.
- **Design first.** A great design with small flaws is still a great reference. Reviews and critiques now rank problems by what they cost a visitor and only push the serious ones (content behind an "enter" button, unreadable text, no idea what is sold, a broken phone layout). Polish never overrules a strong idea.
- **Two new design rules from the reviews:** never put a gate ("Enter", "Start", a mini-game) in front of the content, and brand-led pages may end on their wordmark at full width instead of another block of links.
- **Long scroll stories get an arc:** the storyboard plans a background colour or time of day per chapter, like a sunrise turning into a sunset.
- **Smoother frame animations:** a separate, smaller set of frames for phones, AVIF frames when your computer can make them, and a few spread-out frames kept ready so a fast scroll never lands on an empty picture.
- **Two new building blocks:** characters that come alive per section (an entrance, a little idle loop, and the entrance played backwards when you scroll away), and an image that reveals a second one under your cursor (a tap on phones). Both show one calm still picture when someone has asked their device for less motion.

## 1.4.1 · 2026-10-26

Recommendations now follow what you asked to see, for your kind of site.

- **Ask for a scroll story that looks 3D and you get 3D routes.** Darkroom used to recommend "drawn in code" whenever you had no files yet, even when you asked for 3D. Now the look you ask for ("3D", "realistic", "cinematic", "like Apple") and your subject decide the recommendation; what you own today only decides what you need to provide.
- **Three ways to make a scroll story look 3D**, recommended by the kind of site: cinematic frames from generated video for products, places, food and architecture (Darkroom writes the ChatGPT and Kling, Veo or Seedance prompts); real 3D in the page for tech, AI and abstract subjects; layered depth for craft, editorial and nature.
- **"Drawn in code" is still offered** as the free option, last, with a plain note that it will look flat, not 3D.
- If you choose prompts, Darkroom plans the page for the pictures and clips those prompts will give you, not for an empty folder.

## 1.4.0 · WordPress Good Practice · 2026-10-26

A WordPress theme is only the look; your pages, posts and images live in WordPress. Darkroom now keeps the two apart, so what you see on the site is what you can edit in *Pages*.

- **No more theme text on your home page.** The WordPress starter no longer has a `front-page.html`, which made WordPress ignore the Home page set in *Settings → Reading*. The home page uses a new **Landing** template (no title, sections only) that you pick in the page editor. Darkroom's own theme check now stops a front page with fixed content and warns about page text inside templates.
- **Reads your situation first:** no pages yet, pages to keep, pages to replace with new ones, or pages built with a page builder. Each has its own plan, in plain words.
- **Replace or add, never a surprise delete.** When you want new pages, Darkroom asks: replace the content and keep the page's address (recommended: links, menus and Google keep working, and *Revisions* can undo it), add new pages as drafts, or delete the old ones. Deleting is decided page by page, after a backup. Posts are kept by default.
- **Three ways to get the content into WordPress,** each with step-by-step instructions: **patterns** for adding sections (*+* → *Patterns*), **paste files** for replacing a page through the *Code editor*, and a **`content.xml`** import file for many pages and posts at once (*Tools → Import → WordPress*).
- **The content files are made for you.** Along with the theme you get the paste files and the import file (pages as drafts, parent pages, the Landing template, categories, featured images, images copied into the Media Library). Darkroom checks them first for broken blocks, placeholder text, two pages with one address, a missing template or missing images.
- **Still one command.** You only type `/darkroom`; Darkroom runs its own tools at the right moment and tells you what it found. The only things you do yourself are clicks in your own WordPress, given step by step, and the yeses (installs, deleting, going live).
- **Page builders (Kadence, Elementor, Divi…):** the design goes into the builder's global colours and fonts, not only a new theme. Darkroom first counts which sections follow them and which need editing by hand. Kadence's nine-colour palette is mapped by role, and a Darkroom theme can drive it from its own colours (not yet tested on a live Kadence site).
- WooCommerce follows the same rules; products stay in WooCommerce.

## 1.3.1 · 2026-10-26

Lessons from redesigning a real, live WordPress site, where a theme that passed every test on a clean WordPress broke on the real one.

- **Test on a copy of the real site first.** Before anything goes on a live site, Darkroom reproduces the user's setup (their content, plugins, front-page setting and languages, from an export or the host's staging site), not a clean WordPress.
- **Going-live checklist for WordPress:** back up first and say how to undo; the site must look finished the moment the theme is switched on, even with page-builder content (Kadence, Spectra…); check the front-page setting; translation plugins must not machine-translate brand names or cover the header with a floating language box; purge LiteSpeed / WP Rocket / host caches; check every language as a logged-out visitor.

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
