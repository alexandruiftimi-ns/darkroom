---
slug: realevate
verdict: good
verdict_source: Awwwards SOTD + Developer Award
confidence: medium
category: real-estate
packs: [bold, luxury]
url: https://realevate.agency/
evidence: design review
added: 2026-10-25
updated: 2026-10-25
---

# Realevate — good

**Thesis in one line:** overseas property investment in one frame — a navy marquee slides behind a single fixed balcony photo, the entry price right under the promise.

**First frame:** after a navy preloader (counter + cycling property photos), a white ground: extended-caps wordmark top-centre, About left, Contact right; a ~200 px navy marquee line at ~40 % y passing behind a centred square photo (~19 % of width); two-line claim + boxed "starting from" price centred at 75–85 % y; Our Selection + menu buttons bottom-right; © line bottom-left. The eye goes photo → moving type → claim → price.

## Signals

| Signal | Value |
|---|---|
| Font families | 1 measured (Google Sans) + extended caps in wordmark and price tag (likely SVG/outlined — estimated) |
| Type scale | ~200 px marquee · ~24 px claim · ~16 px nav/buttons (marquee likely not live text) |
| Colour mode / shares | monochrome — navy (240°) on white, ground 99.7 %; navy preloader; colour otherwise only in photos |
| Words (page / heaviest section) | 4 measured / ~25 visible |
| Text zones, first viewport | 1 measured · ~5 visible (nav, marquee, claim + price, buttons, ©) |
| Layout system | centred axis with corner chrome; single-screen landing, inventory behind Our Selection |
| Signature motion | counter preloader with photo cycle → marquee behind a fixed photo · libraries: gsap + ScrollTrigger |
| Page weight | 758 KB |
| Mobile | re-composed — nav cut to the wordmark; marquee shows only fragments; claim, price and buttons stacked centred |
| Source of values | observed + estimated from images where text is not live |

## What works & why

- **One hue, one family** — navy on white throughout → principle: monochrome mode; 2-family budget used as 1 (color.md, typography.md) → rule: an investment brand can be one hue + one sans when the photography carries warmth.
- **Price anchor directly under the claim** → principle: one concrete fact instead of adjectives (attention.md); CTA/answer on the path (reading-paths.md rule 6) → rule: put the entry price on the line after the promise.
- **Fixed photo on the axis, type moving behind it** → principle: one meaningful motion per section (motion.md) → rule: one still object + one moving type layer gives depth without 3D.
- **Preloader previews the inventory** — photos cycle over the counter → principle: cadence hook "image change" (attention.md) → rule: if you must preload, show the product while counting.

## What fails & why

- **The headline is never readable whole** — the photo hides the middle of the marquee; on phones only fragments ("ev…ng") show → principle: headline ≤ 8 words read in one pass (attention.md); focal point vs text overlap (reading-paths.md rule 7) → rule: a moving headline must be readable in one pass at every width, or be decorative with a static h1 beside it.
- **Lifestyle photos look synthetic** (verify) for real properties for sale → principle: label renders of things a visitor could take as real (compliance.md, AI Act Art. 50; UCPD) → rule: mark renders/AI scenes on property listings.
- **10 links/buttons without accessible names** (icon menu, selection toggle) → principle: WCAG 4.1.2 → rule: icon buttons need an accessible name.

## Transferable rules

- Do: one hue + one family + one photo can carry a premium landing page.
- Do: state the entry price right after the promise.
- Don't: let the hero object hide the headline; don't ship unlabeled renders as listings.

## Never copy

Logo, photography, exact layout, copy text. Learn the principle only.

**Open question:** the audit sees only 4 words — the claim may be canvas/aria-hidden; verify an h1 exists. Confidence medium: strong single idea, thin content and a headline that never reads whole.
