---
slug: yahoo
verdict: bad
verdict_source: colorlib
confidence: high
category: editorial
packs: [editorial-news]
url: https://www.yahoo.com/
evidence: live study (study.json + 10 shots)
added: 2026-10-25
updated: 2026-10-25
---

# Yahoo — bad

**Thesis in one line:** A portal where advertising owns the first viewport on desktop, and the clean product only appears on mobile.

**First frame:** desktop — purple logo and a long search bar top-left; a full-width grey "Advertisement" band (to ~35 % y); a skeleton strip; then three columns: numbered Trending list (left), a sports carousel "1 of 15" (centre), and empty ad boxes (right). Seven text zones; the eye zig-zags between ads and stories.

## Signals

| Signal | Value |
|---|---|
| Font families | 2 — yahooSans (UI, headlines), Centra |
| Type scale | 30 px largest · body 13–18 px · 8 sizes |
| Colour mode / shares | disciplined — warm-grey ground, white cards; purple (270°) brand + link-blue (210°) |
| Words (page / heaviest section) | 638 / 602 (feed + shopping) |
| Text zones, first viewport | desktop 7 · mobile 6 · travel 1.38 |
| Layout system | 3-column portal: 300 / 584 / 300 px; centre feed of thumbnail + headline rows |
| Signature motion | auto-advancing carousel · libraries: none detected |
| Page weight | 1,921 KB at capture (feed thumbnails lazy, not all loaded) |
| Mobile | re-composed — one-column thumbnail feed, consistent rows; ad notice banner on top |
| Source of values | measured (study.json) |

## What works & why

- **Mobile feed row** — square thumbnail left, 3-line headline + source/time right, same in every row → principle: related items in one column with labels attached (reading-paths.md rule 4) → rule: a feed unit is thumbnail + headline + one meta line, identical every time.
- **Numbered Trending list** — rank, thumbnail, headline in one row → principle: layer-cake scanning (attention.md) → rule: ranked lists earn their numbers; use them only for real rank.

## What fails & why

- **Ads own the first viewport** — grey "Advertisement" band plus ad rail ≈ a third of 1440×900; colorlib: "stuffed with so much material" → principle: one focal point; ≤ 3 zones (reading-paths.md rules 2, 7) → rule: the first viewport is for the lead story; ads start below it or sit in one rail.
- **7 zones, travel 1.38** — trending, carousel, three story stubs, ad boxes and skeletons compete → principle: zone count, zig-zag measurement (reading-paths.md) → rule: one lead + one supporting list above the fold.
- **Affiliate links styled as headlines** — "From Our Shopping Experts" items use the same headline size in link-blue inside the editorial feed → principle: tells.md "Proof" (honesty of content); EU DSA ad labelling → rule: commerce and ads use a visibly different container and a label, never the editorial headline style.
- **Accessibility debt** — 0 h1, 43 controls without accessible names, 8×8 px skip links, GTM before consent → principle: WCAG 1.3.1, 4.1.2, 2.5.8; consent-gate trackers → rule: a news portal's chrome is checked like its content.

## Transferable rules

- Do: one identical feed unit; one lead story above the fold.
- Don't: give ads the hero slot or editorial styling to affiliate links.
- **The one change that would fix most of it:** ship the mobile one-column feed on desktop with a single ad rail.

## Never copy

Logo, photography, exact layout, copy text. Learn the principle only.

**Open question:** colorlib also notes the site "works better on mobile"; the capture agrees, so the bad verdict applies mainly to desktop.
