---
slug: refbox
verdict: good
verdict_source: maintainer review of AI-era motion sites, Oct 2026 (Reddit thread)
confidence: medium
category: app-marketing
packs: [modern, artsy]
techniques: [product-in-scene]
url: https://ref.box/
evidence: design review
added: 2026-10-29
updated: 2026-10-29
---

# Refbox — good

**Thesis in one line:** A reference-board app for artists shown as what it is: a strip of artwork floating over a desktop, on black.
**Split:** design good · build mixed · technique good — clear product-first story; video loops and contrast need work.

**First frame:** black ground; a pill nav centred at the top; a violet desktop window (x 31–69 %, y 12–74 %) with a column of artwork thumbnails and one image being dragged; the h1 in white below it, centred. The eye goes to the dragged image, then down to the claim.

## Signals

| Signal | Value |
|---|---|
| Font families | 3 — Figtree (display/UI) · Inter (text) · Frank Ruhl Libre (testimonial accents) |
| Type scale | largest 80 px · body 16 px · 16 sizes |
| Colour mode / shares | disciplined — black ground ~90 % · saturated 0.5 % of UI · violet accent; the artwork brings the colour |
| Words (page / heaviest section) | 550 / 77 |
| Text zones, first viewport | desktop 1 · mobile 1 |
| Layout system | centred product window, then feature cards in dark panels, testimonial cards, pricing, a violet footer card |
| Signature motion | short product loops inside each feature panel · libraries: WebGL canvas · video 11 · canvas 4 |
| Page weight | ≥ 3 MB (lower bound) |
| Mobile | re-composed — window first, claim under it, panels stacked |
| Source of values | observed |

## What works & why

- **The hero is the app in use** (an image being dragged out of the board) → principle: product-in-scene → rule: show one real gesture of the product, not a static product still.
- **Black ground, colour only from users' artwork** → principle: the content is the palette (colour.md) → rule: for creative tools, keep the chrome neutral and let the work be the colour.
- **One short loop per feature panel** → principle: one moving thing per section (motion.md) → rule: one loop explains one feature.
- **Testimonials with a serif italic emphasis line** set big, one per card → principle: a quote as a headline → rule: pull the single best phrase out at display size.

## What fails & why

- **Six feature videos stay paused on load** (medium) — empty panels where the explanation should move → hero-media.md (muted, playsinline, poster) → rule: every autoplay loop needs muted + playsinline and a poster frame.
- **Role names and small print at ~3:1** (medium) → contrast law → rule: half-opacity white on black fails; use a solid grey that passes.
- **Two loops keep playing with reduced motion on** (medium) → reduced-motion law → rule: pause or swap to the poster when the user asks for less motion.

## Transferable rules

- Do: show the product's single most typical gesture in the first frame.
- Don't: ship autoplay loops without a poster and the attributes that let them play.

## Never copy

Logo, artwork, product UI, layout and copy text. Learn the principle only.

**Open question:** the earlier analysis called it mixed ("the dark app template", no mobile nav per Reddit); the owner marked it good. Following the owner: template-like is not a minus and the product story is clear.
