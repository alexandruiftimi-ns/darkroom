---
slug: lunarwheel
verdict: good
verdict_source: scrollytelling.ai "27 best" list
confidence: medium
category: product-launch
packs: [cinematic, modern]
techniques: [webgl-scene, exploded-view]
url: https://lunarwheel.it/
evidence: design review
added: 2026-10-27
updated: 2026-10-27
---

# Lunarwheel — good

**Thesis in one line:** "The quietest wheel in the universe": one product in a black void that assembles itself as you scroll.

**First frame:** black ground, LUNAR in a wide geometric face at bottom-left. Scrolling assembles the wheel part by part.

## Signals

| Signal | Value |
|---|---|
| Font families | 2 — robert · architekt |
| Type scale | 5 sizes · largest 400 px |
| Colour mode / shares | ground 100 % · saturated UI 0 % |
| Words (page / heaviest section) | 269 / 266 |
| Text zones, first viewport | desktop 0 · mobile 0 |
| Signature motion | libraries: gsap, scrollTrigger, locomotive · video 2 · canvas 4 |
| Page weight | ≥ 6157 KB (lower bound) |
| Source of values | observed |

## What works & why

- **One product, one void, an exploded-view assembly on scroll** → frame or 3D scrub → rule: for an engineered product, scroll should build it.
- **A seven-word promise as the claim** → specific claim → rule: one measurable-sounding promise beats a feature list.

## What fails & why

_Only issues that cost visitors something (severity in brackets). Minor polish is left out on purpose._

- **Live WebGL blocks the page for many seconds on phones (21.6 s blocking, measured by scrollytelling.ai)** (high) → performance → rule: pre-render the assembly as a frame sequence or video; same look, a fraction of the work.

## Transferable rules

- Do: exploded-view assembly as the scroll story.
- Don't: run the assembly as live WebGL on phones.

## Never copy

Logo, imagery, characters, footage, exact layout and copy text. Learn the principle only.
