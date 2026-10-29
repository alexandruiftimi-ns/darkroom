---
slug: sk-global-foods
verdict: bad
verdict_source: maintainer review of AI-era motion sites, Oct 2026 (Reddit thread)
confidence: high
category: food-drink
packs: [family, catalog]
techniques: [product-in-scene, wordmark-bookend]
url: https://www.skglobalfoods.com/
evidence: design review
added: 2026-10-29
updated: 2026-10-29
---

# Shree Krishna (SK Global Foods) — bad

**Thesis in one line:** A millet-mix food brand in cream and maroon whose hero slogan could sell any food and whose page weighs almost 29 MB.
**Split:** design mixed · build bad · technique mixed — warm and tidy, but empty copy and a huge page.

**First frame:** cream ground; a centred two-line headline (x 24–76 %, y 18–40 %), black first line, maroon second ("Good food. Great beginnings."); a maroon pill CTA; cut-out strawberries, blueberries, leaves and a bowl of grain scattered at the edges with two handwritten notes; three product packs on a garden photo inside an arch at the bottom. The eye goes to the headline, then the purple pack.

## Signals

| Signal | Value |
|---|---|
| Font families | 2 — Manrope (display/text) · Caveat (handwritten notes) |
| Type scale | largest 245 px (closing wordmark) · body 16 px · 24 sizes |
| Colour mode / shares | expressive — cream ground 41 % · saturated 22 % · six hue families from the packs and fruit |
| Words (page / heaviest section) | 531 / 150 |
| Text zones, first viewport | desktop 2 · mobile 2 |
| Layout system | centred hero, product carousel with filter chips, alternating copy/photo bands, Instagram band, giant brand name to close |
| Signature motion | gentle floats on the ingredient cut-outs and reveals · libraries: none detected |
| Page weight | ≥ 28.6 MB (lower bound) |
| Mobile | re-composed — headline, CTA, then the packs; carousel swipes |
| Source of values | observed |

## What works & why

- **Packs shown on a real garden photo** → principle: product-in-scene → rule: put the packaging where the ingredients grow.

## What fails & why

- **A slogan that says nothing** (medium) — the hero never says millet mixes; every section headline is another soft slogan → tells.md (headline that fits any product) → rule: the h1 names the product ("Millet pancake and idli mixes…"), the slogan can follow.
- **28.6 MB page** (high) — oversized photos and cut-outs on a simple catalogue → performance budget → rule: compress product photos to under 300 KB each and lazy-load below the fold.
- **Reused hero imagery with a white wash** (medium; the same garden photo returns in several bands) → craft.md (specific imagery) → rule: each band gets its own picture or none.
- **24 type sizes** (medium) → type scale → rule: 5–6 steps.

## Transferable rules

- Do: close on the brand name at full width, once.
- Don't: open a product page on a slogan that hides the product.

## Never copy

Logo, packaging, photography, layout and copy text. Learn the principle only.
