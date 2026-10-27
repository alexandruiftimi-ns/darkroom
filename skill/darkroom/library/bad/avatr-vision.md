---
slug: avatr-vision
verdict: bad
verdict_source: scrollytelling.ai list; maintainer agreed it is bad
confidence: high
category: product-launch
packs: [luxury, cinematic]
techniques: [gate]
url: https://vision.avatr.com/
evidence: design review
added: 2026-10-27
updated: 2026-10-27
---

# AVATR Vision — bad

**Thesis in one line:** A luxury EV page that keeps everything behind "Enter the Experience" and weighs over 60 MB.

**First frame:** black screen, "The Rise of Emotive Luxury" in thin small type, an Enter button. Scrolling changes nothing until you click.

## Signals

| Signal | Value |
|---|---|
| Font families | 2 — base · arial |
| Type scale | 3 sizes · largest 40 px |
| Colour mode / shares | ground 99.5 % · saturated UI 0.19 % |
| Words (page / heaviest section) | 291 / 70 |
| Text zones, first viewport | desktop 4 · mobile 4 |
| Signature motion | libraries: lenis, webglCanvas · video 11 · canvas 3 |
| Page weight | ≥ 62123 KB (lower bound) |
| Source of values | observed |

## What works & why

- **Thin, elegant type on black** → luxury restraint → rule: fine type suits a luxury car.

## What fails & why

_Only issues that cost visitors something (severity in brackets). Minor polish is left out on purpose._

- **A click-to-enter gate; scrolling does nothing** (high) → no gate before content (tells.md) → rule: the page must scroll and sell without a click.
- **About 62 MB** (high on phones) → page weight → rule: stream heavy media after the first screen.

## Transferable rules

- Don't: gate the page behind "enter"; ship tens of MB up front.

## Never copy

Logo, imagery, characters, footage, exact layout and copy text. Learn the principle only.
