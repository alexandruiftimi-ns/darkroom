# Platform: build the design where it will live

Every project has a platform, chosen at intake (`platforms/README.md`, "Picking the platform"). The design process (direction, slice, build-out, QA) is the same everywhere; this playbook adds what changes per platform. Read the platform's profile `platforms/<id>.md` before writing any platform code.

## 1. Before the first line of code

1. `darkroom state --set platform=<id>`.
2. **Live-docs check** (`platforms/README.md`, "The live-docs check"): when the profile's "Checked on" date is more than 30 days old, or the build needs something the profile does not cover, open its "Official docs to check" links; follow the live docs where they differ; note changes under "Platform notes" in `.darkroom/BRIEF.md` with the date. Otherwise build from the profile and say "platform notes checked on <date>" in the handoff.
3. Ask the profile's "Ask before building" questions that the brief does not already answer, in the same round as the other intake questions (`commands/concierge.md`), never in a separate interrogation. Each question has a recommended answer.
4. Name the cost and the catch once: hosting cost, paid plans, the user's sign-ups (Shopify store, payment provider, host), terms that matter (Vercel Hobby and GitHub Pages are non-commercial).

## 2. Start the project

- File-based starter: `darkroom platform scaffold <id> --out <dir> --name "<site name>"` (never overwrites). It gives a working, minimal, accessible base with the tokens in the platform's own settings.
- Generator platforms (`astro`, `nextjs`): run the official generator printed by `darkroom platform scaffold <id>` **after the user's yes to installing packages**, then add the design layer the profile describes.
- **WordPress and WooCommerce: the theme is the look, the content is theirs** (`platforms/wordpress-content.md`). Read the situation (no pages, pages to keep, pages to replace, a page builder) before the first template; deliver content as patterns, paste files or `content.xml` from `darkroom platform content <dir> [--theme dir] [--site url] [--out dir]`, never as text inside templates.
- An existing project: never scaffold over it. Read its structure, detect it (`darkroom platform check .` names the platform), and adopt its conventions.

## 3. Design once, map to the platform

**Where to build the first design (decide, then say it in one line with its cost).** An HTML preview is cheap to start but is thrown away and rebuilt on a CMS; building in the platform costs setup but nothing is redone.

| Situation | Build the comps and slice | Why |
|---|---|---|
| Restyling the theme they already have (Shopify "restyle", WordPress "keep my theme") | **in their theme** from the start: `shopify theme pull` / a copy of their theme or a child theme | an HTML version would be rebuilt inside the theme anyway, and their settings, apps and blocks only show there |
| A new theme on WordPress, WooCommerce, Shopify or Ghost, and the platform runs locally (Playground, `shopify theme dev` with a store, local Ghost) | **in the platform**, with their real content loaded (`platforms/wordpress.md`, "Preview with your real content") | editability, real posts and products, the platform's markup limits show at the first checkpoint |
| A new theme, but it cannot run here yet (no store, no Node 20, no yes to the free download) | **HTML comps** with the same tokens, then port the approved slice; say the catch: "I'll show you an HTML preview first and rebuild it in <platform> after you approve" | cheapest way to settle taste without a setup |
| static, php, astro, nextjs, hugo, jekyll | **in the project** itself | the preview is the product |

Ask only when it changes the user's effort (e.g. they must create a Shopify development store). Otherwise decide.

- **Motion versus editing.** On a CMS where the client edits the page (WordPress, WooCommerce, Shopify, Ghost), a `story` or `hero-effect` section is choreographed to fixed content: build it as one locked pattern or section whose texts and images stay editable, not as free blocks. Say the trade-off when they pick that motion level: "the scroll story stays in place; you can change its words and pictures, not its order".
- Tokens go where the client can change them (`platforms/README.md`, "The same design on every platform"). Every colour, font and size in code reads a token.
- Multi-page sites: list the templates in the bible (home, product, collection, post, page, cart, 404…) with one line each: its job, its sections, its one action. Templates share the system; design the home page and one inner template at the slice, the rest at build-out. The page list (every page the user kept, from the import or the brief) is in the bible; build-out builds all of it once `scope` is `all`.
- Content the client will write (posts, products): design for the longest and the shortest real case, empty states and missing images.

## 4. Check: quick or full (the user chose at intake: `verify`)

| | Quick (default: cheaper) | Full |
|---|---|---|
| Structure | `darkroom platform check` | `darkroom platform check` + the platform's own validator (Theme Check, gscan, `php -l`, a Playground run) |
| Captures | home page + the page that earns money (product for shops; pricing, booking or contact for services): desktop-1440 + mobile-390, reduced motion | every template: desktop-1440, tablet-1024, mobile-390, motion + reduced motion |
| Audit | those two pages | every template |
| States | none | hover/focus on the main action, menu open on phone, cart with an item (shops) |

Say which one ran in the handoff. A full check on a large site costs real time and tokens: that is why the user picks it. Never claim a template is checked when only the quick pages were captured. Quick limits the checking, not the building: every page in scope is built either way.

## 5. Hand over

**Redesigning a site that is already live** (WordPress, WooCommerce, Shopify, Ghost): never let the first real test be the live site. Before the user switches anything on, test on a copy of their real setup (their content, plugins or apps, settings and languages: an export loaded locally, or the host's staging site), then walk them through the profile's *Going live* list (WordPress and WooCommerce: `platforms/wordpress.md`). A pass on a clean test site is not a pass on theirs; say "tested on a clean site only" if that is all that ran.

The handoff (`commands/handoff.md`) adds, per platform: how to preview it, how to deploy it (the profile's "Deploy and free hosting", step by step, in plain words), what the user must sign up for, what the platform's validator said, and the date of the docs check.
