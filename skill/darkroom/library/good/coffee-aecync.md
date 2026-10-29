---
slug: coffee-aecync
verdict: good
verdict_source: maintainer review of AI-era motion sites, Oct 2026 (Reddit thread)
confidence: low
category: food-drink
packs: [cinematic, modern]
techniques: [designed-loader, webgl-scene]
url: https://coffee-demo.aecync.com/
evidence: design review (loading frame only; the 3D machine not reviewed)
added: 2026-10-29
updated: 2026-10-29
---

# Aecync coffee demo — good

**Thesis in one line:** A coffee brand sold as a machine you play with; even the loader is a little espresso machine filling a cup.

**Split:** design mixed · build bad · technique good — praised 3D machine; long loader, 8 MB+.

**First frame:** charcoal ground; centred a line-drawn espresso machine in grey whose cup fills with crema as loading progresses; "GOOD THINGS TAKE TIME" in tracked caps below and a small percentage. Nothing else for several seconds.

## Signals

| Signal | Value |
|---|---|
| Font families | 1 — Inter (loader text) |
| Type scale | 10–14 px on the loader · 2 sizes |
| Colour mode / shares | mono — charcoal ground 99.4 % · one crema tan |
| Words (page / heaviest section) | 5 on the loader |
| Text zones, first viewport | desktop 1 · mobile 1 |
| Layout system | full-screen loader over a 3D scene |
| Signature motion | the loader's cup fills; then a gamified 3D coffee machine (per the thread) · libraries: webglCanvas |
| Page weight | ≥ 8,445 KB |
| Mobile | same loader, centred |
| Source of values | observed (loader only) |

## What works & why

- **The loader is already the product** — the progress bar is a cup filling under a machine, with a line that excuses the wait → designed loading frame (good/immersive-garden) → rule: if you must load, draw the product in the loader and make the progress physical.
- **Interaction as the pitch** — Reddit readers found the playable machine "very premium" → the product is the toy → rule: one object you can operate beats a feature list.

## What fails & why

- **Seconds of loader before anything** (high) — no claim, no h1 visible, just the machine filling → tells: loader instead of a first frame → rule: paint a real still of the machine with the name at once; stream the 3D behind it.
- **Thirteen h1 elements and the first one hidden** (medium) → one live h1 → rule: one h1, visible at rest.

## Transferable rules

- Do: make the loader a drawing of the product doing its job.
- Don't: let the loader be the only first frame.

## Never copy

Logo, 3D machine, artwork, copy text. Learn the principle only.

**Open question:** the earlier analysis was unsure because only the loader was seen; the maintainer and the thread call it good. The 3D experience itself was not reviewed, so confidence is low.
