---
slug: stylized-rainy
verdict: bad
verdict_source: maintainer review of AI-era motion sites, Oct 2026 (Reddit thread)
confidence: low
category: experimental
packs: [cinematic, nature]
techniques: [webgl-scene]
url: https://stylized.cortiz.dev/rainy
evidence: design review
added: 2026-10-29
updated: 2026-10-29
---

# Stylized Rainy — bad

**Thesis in one line:** a real-time rain scene sold as a mood piece, but the visitor waits on a loader and gets an empty pale screen first.
**Split:** design mixed · build bad · technique mixed — impressive rain shader, far too heavy for ordinary laptops.

**First frame:** a small condensed "LOADING…" word centred on pale grey; then a blank off-white screen on desktop and phone while the scene builds. No title, no copy, no control.

## Signals

| Signal | Value |
|---|---|
| Font families | 1 visible — condensed caps for the loader |
| Type scale | one size |
| Colour mode / shares | mono — off-white ground ≈ 100 % until the scene appears |
| Words (page / heaviest section) | ≈ 1 / 1 |
| Text zones, first viewport | desktop 1 (loader) · mobile 0 |
| Layout system | full-screen canvas, no document |
| Signature motion | rain over a stylised scene (three.js, AI-assisted) · libraries: three (per thread) |
| Page weight | not measured; visitors report 2–5 fps on Intel Macs |
| Mobile | blank at rest |
| Source of values | observed (first frames) · estimated (rest) |

## What fails & why

- **Owner's note: "very heavy for the user"** (high) → performance budget (looks at frame rate, not just weight) → rule: a scene that drops below 30 fps on a mid laptop needs a lighter tier, not just a loader.
- **Loader then an empty screen** (high) → first-frame law (tells.md) → rule: a painted poster of the scene must be the first paint.
- **No words at all** (medium) → no who/what in the first frame → rule: one live line saying what this is sits over or beside the canvas.

## Transferable rules

- Do: ship a still frame first, then upgrade to live rain only if the device keeps 60 fps.
- Don't: make the visitor's GPU the price of entry.

## Never copy

Scene, art and code. Learn the principle only.

**Open question:** the live rain was not seen; this entry rests on the owner's note, the thread and the first frames.
