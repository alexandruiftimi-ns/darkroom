# Platform: build the design where it will live

Every project has a platform, chosen at intake (`platforms/README.md`, "Picking the platform"). The design process (direction, slice, build-out, QA) is the same everywhere; this playbook adds what changes per platform. Read the platform's profile `platforms/<id>.md` before writing any platform code.

## 1. Before the first line of code

1. `darkroom state --set platform=<id>`.
2. **Live-docs check** (`platforms/README.md`): open every "Official docs to check" link in the profile; follow the live docs where they differ; note changes under "Platform notes" in `.darkroom/BRIEF.md` with the date.
3. Ask the profile's "Ask before building" questions that the brief does not already answer, in the same round as the other intake questions (`commands/concierge.md`), never in a separate interrogation. Each question has a recommended answer.
4. Name the cost and the catch once: hosting cost, paid plans, the user's sign-ups (Shopify store, payment provider, host), terms that matter (Vercel Hobby and GitHub Pages are non-commercial).

## 2. Start the project

- File-based starter: `darkroom platform scaffold <id> --out <dir> --name "<site name>"` (never overwrites). It gives a working, minimal, accessible base with the tokens in the platform's own settings.
- Generator platforms (`astro`, `nextjs`): run the official generator printed by `darkroom platform scaffold <id>` **after the user's yes to installing packages**, then add the design layer the profile describes.
- An existing project: never scaffold over it. Read its structure, detect it (`darkroom platform check .` names the platform), and adopt its conventions.

## 3. Design once, map to the platform

- The direction comps and the slice are built **in the platform** when it can be previewed locally (static, php with PHP installed, astro, nextjs, hugo, jekyll, WordPress / WooCommerce through Playground, Shopify through `shopify theme dev`, Ghost with a local install). Otherwise build the comps as static HTML with the same tokens, and port the approved slice.
- Tokens go where the client can change them (`platforms/README.md`, "The same design on every platform"). Every colour, font and size in code reads a token.
- Multi-page sites: list the templates in the bible (home, product, collection, post, page, cart, 404…) with one line each: its job, its sections, its one action. Templates share the system; design the home page and one inner template at the slice, the rest at build-out.
- Content the client will write (posts, products): design for the longest and the shortest real case, empty states and missing images.

## 4. Check: quick or full (the user chose at intake: `verify`)

| | Quick (default: cheaper) | Full |
|---|---|---|
| Structure | `darkroom platform check` | `darkroom platform check` + the platform's own validator (Theme Check, gscan, `php -l`, a Playground run) |
| Captures | home page: desktop-1440 + mobile-390, reduced motion | every template: desktop-1440, tablet-1024, mobile-390, motion + reduced motion |
| Audit | home page | every template |
| States | none | hover/focus on the main action, menu open on phone, cart with an item (shops) |

Say which one ran in the handoff. A full check on a large site costs real time and tokens: that is why the user picks it. Never claim a template is checked when only the home page was captured.

## 5. Hand over

The handoff (`commands/handoff.md`) adds, per platform: how to preview it, how to deploy it (the profile's "Deploy and free hosting", step by step, in plain words), what the user must sign up for, what the platform's validator said, and the date of the docs check.
