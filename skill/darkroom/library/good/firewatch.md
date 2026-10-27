---
slug: firewatch
verdict: good
verdict_source: Classic layered-parallax hero; maintainer note "good for parallax"
confidence: high
category: product-launch
packs: [artsy, nature]
techniques: [layered-parallax]
url: https://www.firewatchgame.com/
evidence: design review
added: 2026-10-27
updated: 2026-10-27
---

# Firewatch — good

**Thesis in one line:** A game sold by its own illustration, cut into layers that move at different speeds: cheap, light and memorable.

**First frame:** an orange sunset landscape in flat illustrated layers, a hiker on a ridge, FIREWATCH in spaced caps. The price ("Available now for $19.99") sits right under the hero.

## Signals

| Signal | Value |
|---|---|
| Font families | 3 — futura-pt · Verlag A · Noto Sans CJK JP |
| Type scale | 9 sizes · largest 38 px |
| Colour mode / shares | ground 96.2 % · saturated UI 96.68 % · hues 30° |
| Words (page / heaviest section) | 209 / 202 |
| Text zones, first viewport | desktop 2 · mobile 1 |
| Signature motion | libraries: none detected · video 0 · canvas 0 |
| Page weight | ≥ 18440 KB (lower bound) |
| Source of values | observed |

## What works & why

- **Illustration in 6–8 layers, each moving at its own scroll speed** → layered parallax (recipe candidate) → rule: the cheapest convincing depth effect; works on any platform, needs only layered PNG/SVG art.
- **Two-colour palette from the game art (orange, deep brown)** → colour from the media (color.md) → rule: take the UI palette from the key art.
- **Price and platforms directly under the hero** → buy control next to the thing (LESSONS) → rule: say the price in the first two screens.

## What fails & why

_Only issues that cost visitors something (severity in brackets). Minor polish is left out on purpose._

- **Large page (about 18 MB) from embedded video** (low–medium) → page weight → rule: load trailers on click.

## Transferable rules

- Do: layered illustration parallax; price under the hero.
- Don't: autoload trailers.

## Never copy

Logo, imagery, characters, footage, exact layout and copy text. Learn the principle only.
