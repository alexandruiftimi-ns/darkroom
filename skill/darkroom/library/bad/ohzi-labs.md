---
slug: ohzi-labs
verdict: bad
verdict_source: maintainer review of AI-era motion sites, Oct 2026 (Reddit thread)
confidence: medium
category: experimental
packs: [cyberpunk, glass-cinema]
techniques: [webgl-scene, particle-form]
url: https://labs.ohzi.io/
evidence: design review
added: 2026-10-29
updated: 2026-10-29
---

# OHZI Labs (studio experiments hub) — bad

**Thesis in one line:** A studio's WebGL playground: a rotating logo made of static noise, surrounded by every panel at once.

**Split:** design mixed · build bad · technique good — strong noise-logo object; crowded frame, broken phone layout.

**First frame:** black; a 3D monogram built of white noise turns in the centre; a glass sidebar on the left holds seven filter pills and video cards; three mono text blocks and a "WARNING" box sit on the right; four buttons top-right. The eye orbits all four corners and settles nowhere.

## Signals

| Signal | Value |
|---|---|
| Font families | 3 — Unbounded (titles) · Roboto Mono (notes) · Inter (UI) |
| Type scale | small: largest 19 px · body 13 px |
| Colour mode / shares | mono — ground 92 % black · no saturated UI colour |
| Words (page / heaviest section) | 154 / 154 |
| Text zones, first viewport | desktop 7 · mobile 4 |
| Layout system | three columns (cards · object · notes), content in all four corners |
| Signature motion | rotating particle-noise logo · libraries: WebGL canvas, 17 videos |
| Page weight | ≥ 5.6 MB (lower bound) |
| Mobile | broken — the warning box lies on top of the experiment cards and titles overlap |
| Source of values | observed |

## What works & why

- **A logo built from noise** — the mark itself shows the craft on sale → rule: a studio's hero object can be its own mark rendered in its own technique.

## What fails & why

- **Seven text zones around the object** (high) → reading zones (critique) → rule: one object, one line, one action in the first view; the archive goes below or behind a menu.
- **Phone layout overlaps** (high) — the warning panel covers the card list → rule: re-compose floating panels into the flow on narrow screens.
- **Most experiment cards show nothing after load** (medium) — empty dark tiles → rule: every video card needs a poster frame.
- **The first words are hidden behind an entrance** (medium) → rule: the heading is visible at first paint.

## Transferable rules

- Do: render the brand mark in the studio's own technique.
- Don't: surround a hero object with every panel the site has.

## Never copy

Logo, experiments and copy. Learn the principle only.

**Open question:** the earlier analysis called it mixed (good mood, Flash-era charm); the owner rated it bad, and the crowding and phone overlap support that.
