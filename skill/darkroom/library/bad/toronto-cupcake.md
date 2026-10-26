---
slug: toronto-cupcake
verdict: bad
verdict_source: colorlib
confidence: high
category: food-drink
packs: [restaurant, family]
url: https://www.torontocupcake.com/index.html
evidence: design review
added: 2026-10-25
updated: 2026-10-25
---

# Toronto Cupcake — bad

**Thesis in one line:** A bakery that sells its boxes, not its cupcakes: one cut-out photo of pink packaging, then SEO paragraphs.

**First frame:** seven identical logo stamps in a row at the top; a pink rounded bar with the date and a promo line; letterspaced "TORONTO CUPCAKE" centred at ~23 % y; a magenta "USA TARIFFS" bar; then a cut-out photo of stacked pink boxes with a single cupcake and a third logo. The eye counts logos before it finds food.

## Signals

| Signal | Value |
|---|---|
| Font families | 2 — Tahoma (body, headings), Arial (bars, buttons) |
| Type scale | 40 px largest · body 15–18 px · 8 sizes |
| Colour mode / shares | disciplined — white ground 87 % · pink/magenta hue 330° ~11 % · grey footer |
| Words (page / heaviest section) | 367 / 89 (hero paragraph) |
| Text zones, first viewport | desktop 2 · mobile 2 · travel 0.38 |
| Layout system | centred single column; full-width pink bars; justified paragraphs at 1,330 px measure |
| Signature motion | animations present, no reduced-motion rule · libraries: none |
| Page weight | 4 KB HTML when viewed |
| Mobile | squeezed — one column but menu icon overlaps the promo text; justified body opens rivers |
| Source of values | observed |

## What works & why

- **Two families, one brand pink** — Tahoma/Arial with a single hue → principle: color.md disciplined mode → rule: a small shop can keep chrome to one hue and spend all colour in the photos (if it has them).

## What fails & why

- **Hero shows packaging, not product** — boxes fill the photo; one cupcake at ~30 px scale → principle: one focal point that is the subject (reading-paths.md rule 7); tells.md "real pictures" → rule: a food business opens on the food at close range, appetite-first.
- **Logo repeated 9×** — seven stamps in a row, one in the hero, more on every box → principle: tells.md "same block repeated"; attention.md cadence → rule: the mark appears once in chrome; repetition is noise, not branding.
- **SEO prose instead of a menu** — 89-word justified hero paragraph, a 12-word question headline, four more centred heading + paragraph blocks → principle: word budgets, layer-cake scanning (attention.md); colorlib: "super basic product page and cart" → rule: show a grid of products with names and prices; keep SEO copy for the bottom.
- **Justified text at 1,330 px measure** → principle: 45–75ch measure (typography.md) → rule: body copy is left-aligned and ≤ 75ch.
- **Pale pink links and nav** — 36 contrast failures (nav 4.13:1, inline links lighter) and a "Toggle High Contrast" button to fix it → principle: color.md contrast pairs → rule: the default palette passes; accessibility is not an opt-in mode.
- **Trackers before consent** (GTM, DoubleClick, LinkedIn) → principle: consent-gate third parties (compliance) → rule: load analytics after consent.

## Transferable rules

- Do: product grid with photo, name, price, add-to-order in the first two viewports.
- Do: one logo, one pink, left-aligned body.
- Don't: lead with packaging or a tariffs notice.
- **The one change that would fix most of it:** replace the box photo and paragraphs with a 3-up grid of cupcake close-ups and prices.

## Never copy

Logo, photography, exact layout, copy text. Learn the principle only.
