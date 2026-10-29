---
slug: meltkit
verdict: good
verdict_source: maintainer review of AI-era motion sites, Oct 2026 (Reddit thread)
confidence: high
category: app-marketing
packs: [modern, bold]
techniques: [product-in-scene, webgl-scene, wordmark-bookend]
url: https://meltkit.com/
evidence: design review
added: 2026-10-29
updated: 2026-10-29
---

# MeltKit — good

**Thesis in one line:** A background-maker app understood in one screen: a three-word claim, a price, and the app window floating on its own melting output.

**Split:** design good · build mixed · technique good — instantly clear product demo; heavy and one pressure line.

**First frame:** black top half: app icon, a two-line centred claim in soft pastel gradient type (37–63 % x, 24–37 % y), a one-line "what and where", a white "Buy — $9" button with a handwritten "one time" note. Bottom half: a full-width live melting gradient with the app window over it, presets in a side rail. Eye: claim → price → the moving output.

## Signals

| Signal | Value |
|---|---|
| Font families | 2 — Geist (everything) · Gamja Flower (one handwritten note) |
| Type scale | largest 311 px (closing wordmark) · 10 sizes |
| Colour mode / shares | expressive in the demos, mono in the UI — black ground 60 % · colour only from the product's output |
| Words (page / heaviest section) | 299 / 72 |
| Text zones, first viewport | desktop 1 · mobile 2 |
| Layout system | centred claim, then dark cards: shapes, export formats, pricing, FAQ |
| Signature motion | live shader backgrounds under the app UI; every card previews a look · libraries: webglCanvas |
| Page weight | 9.2 MB |
| Mobile | re-composed — claim, price, then the demo strip; cards stack |
| Source of values | observed |

## What works & why

- **The product's output is the page's colour** → product-in-scene (INDEX) → rule: if the product makes visuals, let them be the only colour; keep the UI black and white.
- **Price in the first button** → one action, no surprise → rule: a small one-off product says the price before the scroll.
- **Format cards (MP4, WebM, PNG, HTML, React)** → answer the buyer's real question → rule: list what the visitor gets out, as plain labels.
- **A melted wordmark closes the page** → wordmark-bookend (INDEX) → rule: the closer shows the product's effect on the brand itself.

## What fails & why

- **"Limited offer" pressure line in pricing** (medium) → dark patterns (comply) → rule: only real, dated deadlines.
- **9 MB and an autoplay preview that may not start** (medium) → video-hero watch-for → rule: posters on every preview; start live shaders only in view.

## Transferable rules

- Do: show the product's output moving in the first frame, with the price.
- Don't: add urgency copy to a page that already sells itself.

## Never copy

Logo, app UI, presets, exact layout, copy text. Learn the principle only.
