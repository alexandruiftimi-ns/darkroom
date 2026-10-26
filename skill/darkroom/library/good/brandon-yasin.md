---
slug: brandon-yasin
verdict: good
verdict_source: Awwwards SOTD + Developer Award
confidence: medium
category: portfolio
packs: [art-gallery, modern]
url: https://brandonyasin.com
evidence: design review
added: 2026-10-25
updated: 2026-10-25
---

# Brandon Yasin — good

**Thesis in one line:** A creative director's portfolio where the work is the interface — a strip of tall project images and almost no words.

**First frame:** one small project image dead centre (50 %, 50 %) on warm off-white, then it expands into a row of four equal portrait cards (y 43–98 %) with caps project names above each; chrome stays in a thin top row (name, script monogram, MENU/CONTACT, local time, circular indicator).

## Signals

| Signal | Value |
|---|---|
| Font families | 2 — Neue Haas Unica Pro (labels, nav) · Helvetica Now; script monogram is artwork |
| Type scale | 16 px largest · 12 px labels · 2 sizes, no display type |
| Colour mode / shares | mono UI — warm off-white ground 99.9 %, UI hues none; all colour lives in photography |
| Words (page / heaviest section) | 49 / 8 |
| Text zones, first viewport | desktop 2 · mobile 1 · travel 0.54 |
| Layout system | 4 equal portrait columns, ~8 px gutters, label left-aligned above each card; 4th card bleeds off the right edge |
| Signature motion | centre image expands into the strip; scroll drives a horizontal gallery; rotating text slot (name → SOTD → date) · libraries: lenis |
| Page weight | 16,379 KB |
| Mobile | re-composed — one card at ~80 % width with the next peeking; nav cut to MENU / CONTACT + indicator |
| Source of values | observed; motion inferred from shot sequence |

## What works & why

- **Interface at two sizes, colour only in the work** → principle: separate UI palette from media palette (color.md); the work first, interface recedes (art-gallery pack) → rule: when the product is images, keep UI type small, neutral and at most two sizes.
- **Equal cards, labels in one fixed position above each** → principle: related items in one row with their labels (reading-paths.md rule 4) → rule: a project index is one row/column of identical frames with labels in the same place.
- **Next card cropped at the right edge** → principle: cadence hook by reveal (attention.md) → rule: signal a horizontal axis by cropping the next item, not by an arrow or "drag" label.
- **One image first, then the set** → principle: one focal point per viewport (reading-paths.md rule 7) → rule: open on a single piece, then widen to the collection.

## What fails & why

- **16.4 MB for 49 words** → principle: LCP ≤ 2.5 s (Core Web Vitals) → rule: serve responsive, compressed sizes; a card at 400 px wide doesn't need a full-resolution source.
- **4 h1, 7 unnamed links/buttons, no reduced-motion rule** → principle: WCAG 1.3.1, 4.1.2, 2.3.3 → rule: one h1 (the name), text names for icon buttons, a reduced-motion path for the expanding intro and scroll-jacked strip.
- **Rotating header text collides** — at mobile p100 "SOTD" and "BRANDON" are drawn over each other in the top-left slot → principle: corners are chrome and must stay legible (reading-paths.md rule 5) → rule: swap text slots with clip or opacity; never overlap two strings mid-transition.

## Transferable rules

- Do: two small UI sizes, neutral ground, colour only from the work; crop the next item as the scroll cue.
- Don't: ship full-resolution images into thumbnail frames; don't skip names and headings because the page is "visual".

## Never copy

Logo, photography, exact layout, copy text. Learn the principle only.
