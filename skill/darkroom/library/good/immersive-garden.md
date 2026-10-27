---
slug: immersive-garden
verdict: good
verdict_source: Awwwards Agency of the Year 2025; maintainer favourite (cursor reveal)
confidence: high
category: agency
packs: [modern, cinematic]
techniques: [cursor-reveal, webgl-scene]
url: https://immersive-g.com/
evidence: design review
added: 2026-10-27
updated: 2026-10-27
---

# Immersive Garden — good

**Thesis in one line:** A WebGL agency whose loading frame is already designed and whose imagery reveals itself under the cursor.

**First frame:** white page, the logo at left and one serif line "Innovative digital experiences studio" at centre while the scene loads. Then work appears and responds to the pointer.

## Signals

| Signal | Value |
|---|---|
| Font families | 2 — PSTimes · HelveticaNeueRegular |
| Type scale | 4 sizes · largest 44 px |
| Colour mode / shares | ground 99.6 % · saturated UI 0 % |
| Words (page / heaviest section) | 307 / 307 |
| Text zones, first viewport | desktop 2 · mobile 1 |
| Signature motion | libraries: webglCanvas · video 0 · canvas 12 |
| Page weight | ≥ 21216 KB (lower bound) |
| Source of values | observed |

## What works & why

- **The loader is a calm designed frame with one line of copy** → the first frame survives the loader (tells.md) → rule: if WebGL needs time, give the wait a typeset frame.
- **Imagery reveals behind the cursor** (the maintainer's favourite moment) → pointer interaction with purpose → rule: a cursor reveal (mask follows the pointer, a second image shows through) makes browsing the work feel tactile; on touch, fall back to a tap or a slow auto-reveal.

## What fails & why

_Only issues that cost visitors something (severity in brackets). Minor polish is left out on purpose._

- **About 21 MB** (medium) → page weight → rule: lazy-load project media below the fold.

## Transferable rules

- Do: a typeset loading frame; cursor-reveal on work images.
- Don't: load every project at once.

## Never copy

Logo, imagery, characters, footage, exact layout and copy text. Learn the principle only.
