---
slug: codedgar
verdict: bad
verdict_source: maintainer review of AI-era motion sites, Oct 2026 (Reddit thread)
confidence: medium
category: portfolio
packs: [editorial-news, modern]
techniques: [scroll-jacking]
url: https://codedgar.com/
evidence: design review
added: 2026-10-29
updated: 2026-10-29
---

# codedgar (frontend design engineer portfolio) — bad

**Thesis in one line:** A frontend engineer as a "terminal-editorial" system: pale grey paper, mono comments, giant faint chapter numbers and a status bar.

**Split:** design mixed · build bad · technique bad — tidy grid; hijacked scroll, faint text, clutter on phones.

**First frame:** pale grey textured ground; left, a mono comment line and stats, a two-line name in a grotesk (x 3–23 %, y 22–36 %), a mono role, two sentences, a blue and an outline button; right, a casual portrait with a glitching code strip on top; a fixed bottom status bar (mode, track playing, clock, buttons), a dark cookie banner over the centre and an award tab on the right edge. The eye splits between name, portrait and the banner.

## Signals

| Signal | Value |
|---|---|
| Font families | 3 — Plus Jakarta Sans (text) · Halfre (display) · JetBrains Mono (labels) |
| Type scale | largest 144 px (faint numerals) · body 15 px · 15 distinct sizes |
| Colour mode / shares | mono grey + one blue (210°) — ground 91.9 % |
| Words (page / heaviest section) | 755 / 140 |
| Text zones, first viewport | desktop 4 · mobile 2 |
| Layout system | numbered chapters (01–08) with huge pale numerals as texture; card grids for work, services, writing; giant wordmark close |
| Signature motion | custom scroll and pointer handling, canvas image effects · libraries: GSAP, WebGL canvas |
| Page weight | ≥ 396 KB |
| Mobile | squeezed — the portrait fills the first screen with no name above the fold; the banner and status bar take a quarter of the height |
| Source of values | observed |

## What fails & why

- **Scroll and pointer taken over** (high) → scroll-jacking (INDEX avoid) → rule: native scroll speed, always.
- **Faint text as a system** (high) — over 90 contrast failures, numerals at about 1.2:1 → contrast → rule: texture may be faint, reading text may not.
- **Four fixed layers on top of the page** (status bar, cookie banner, award tab, nav) (medium) → rule: at most one fixed bar; consent dismisses before it covers the hero.
- **Phone first screen is just the portrait** (medium) → mobile re-composition → rule: name and claim above the photo on narrow screens.

## Transferable rules

- Do: number chapters if the page is long.
- Don't: decorate an engineer's page with a fake terminal and hijacked scroll.

## Never copy

Portrait, layout, copy. Learn the principle only.

**Open question:** the earlier analysis called it mixed (tidy); the owner rated it bad. The scroll handling and faint text support the owner.
