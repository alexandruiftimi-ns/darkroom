---
slug: seasats
verdict: good
verdict_source: Awwwards Site of the Day, Sep 2026
confidence: high
category: product-launch
packs: [cinematic, modern]
techniques: [frame-scrub, chapter-colour-grade, wordmark-bookend, pinned-chapters]
url: https://www.seasats.com/
evidence: design review
added: 2026-10-27
updated: 2026-10-27
---

# Seasats — good

**Thesis in one line:** An autonomous boat sold over one long scroll where the boat stays the hero and the sky changes colour chapter by chapter.

**First frame:** a calm pale seascape with the boat at rest and "Ocean Autonomy That Works" in a thin large serif at upper-left; a side panel of chapter swatches at right. The eye reads the claim, then the boat.

## Signals

| Signal | Value |
|---|---|
| Font families | 2 — seasonMix · supplyMono |
| Type scale | 3 sizes · largest 124 px |
| Colour mode / shares | ground 12.3 % · saturated UI 0.22 % |
| Words (page / heaviest section) | 29 / 0 |
| Text zones, first viewport | desktop 2 · mobile 2 |
| Signature motion | GSAP ScrollTrigger scrub over a tall track; 511 AVIF frames drawn to a 2D canvas · libraries: lenis, webglCanvas · video 26 · canvas 5 |
| Page weight | ≥ 3147 KB (lower bound) |
| Source of values | observed |

## What works & why

- **One rendered flight of 511 frames scrubbed by scroll; the boat never leaves the frame** → frame scrub (recipes/scrub-frames.js) → rule: for a physical product, render one camera path and let scroll drive it.
- **The background is colour-graded per chapter: pale dawn → mint → orange sunset** → chapter colour grade (INDEX.md, By technique) → rule: shift the time of day across chapters so the long scroll has an arc.
- **Separate smaller frame set for phones; frames load first, last, then middles** → performance craft → rule: ship a phone set and load coarse-to-fine so any scroll position has a near frame.
- **Ends on a giant SEASATS wordmark over the sunset** → close on the wordmark (LESSONS).

## What fails & why

_Only issues that cost visitors something (severity in brackets). Minor polish is left out on purpose._

- **Most copy lives inside images and video** (medium for search) → text must not depend on media (tells.md) → rule: keep every claim as live text over the canvas.

## Transferable rules

- Do: scrubbed product flight + time-of-day colour grade.
- Don't: bake the claims into the frames.

## Never copy

Logo, imagery, characters, footage, exact layout and copy text. Learn the principle only.
