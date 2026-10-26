---
slug: suzanne-collins
verdict: bad
verdict_source: colorlib
confidence: medium
category: editorial
packs: [editorial-news, catalog]
url: https://www.suzannecollinsbooks.com/
evidence: design review
added: 2026-10-25
updated: 2026-10-25
---

# Suzanne Collins — bad

**Thesis in one line:** A best-selling author's site that shows the books but never asks you to buy one: a three-column blog template in beige and orange.

**First frame:** an anti-impersonation banner across the top; grey geometric-sans name at ~20 % x / 10 % y; orange tab nav; then three columns: award badge + author photo (left), a description, an orange italic caps title and a quote (centre), and an orange-linked "Selected works" review list (right). The eye jumps between three columns with no lead.

## Signals

| Signal | Value |
|---|---|
| Font families | ~4 — geometric sans (name, nav), old-style serif (body), Arial/Helvetica italic caps (book titles), a serif small-caps for link lists |
| Type scale | ~64 px name · ~48 px orange titles · body ~16 px · ~7 sizes |
| Colour mode / shares | expressive by accident — grey-green ground, cream rails, white centre, orange for titles, links and nav |
| Words (page / heaviest section) | ~1,000+ / right rail of review quotes |
| Text zones, first viewport | desktop 4 (banner, left rail, centre, right rail) · mobile 3 |
| Layout system | 3-column blog: 320 / 640 / 320 px, centre feed of book promos stacked vertically |
| Signature motion | none · libraries: unknown |
| Page weight | unknown |
| Mobile | re-composed — one column, but the H1 has no left margin and the buy links fall to the very end |
| Source of values | estimated from images |

## What works & why

- **Centre feed puts each new book large, one at a time** — cover art at full column width → principle: one focal point per viewport (reading-paths.md rule 7) → rule: a catalogue of a few hero products can be a vertical feed, one product per viewport.

## What fails & why

- **No buy action next to any cover** — retailer links exist only as "Quick links" at the bottom of the right rail (mobile: last screen) → principle: CTA on the path (reading-paths.md rule 6); colorlib: pages lack CTAs "where you can get them" → rule: every product image gets its buy/where-to-buy control directly beneath it.
- **Three competing columns** — badge rail, feed and review rail all start at the same y → principle: ≤ 3 text zones, one copy anchor (reading-paths.md rules 1–2) → rule: an editorial home page has one main column; sidebars start below the lead or move into the flow.
- **Orange on white / cream for everything** — titles, links, nav and labels share one light orange, likely < 3:1 on white → principle: contrast pairs (color.md), one accent with a job → rule: the accent marks actions only; titles are ink.
- **~4 families including Arial italic caps for titles** → principle: 2-family budget, no tracked caps as voice (typography.md, tells.md) → rule: book titles take the display face set in sentence case, not an italic-caps system font.
- **Lazy images leave blank white bands** (p075 desktop: a 50 px strip in a white column) → principle: cadence: blank bands kill the hook (attention.md, tells.md "reveals that fail") → rule: reserve image boxes with aspect-ratio and a poster colour.

## Transferable rules

- Do: one product per viewport with its CTA under it.
- Do: one main column; secondary lists after the lead.
- Don't: use the accent colour for titles, links and nav at once.
- **The one change that would fix most of it:** add a "Buy" row (2–3 retailer buttons) under each cover in the centre feed.

## Never copy

Logo, photography, exact layout, copy text. Learn the principle only.

**Open question:** signals are estimated from images only; confidence medium. The impersonation banner is a reasonable trust device for this author, just over-long.
