---
slug: panelpress
verdict: good
verdict_source: maintainer review of AI-era motion sites, Oct 2026 (Reddit thread)
confidence: medium
category: editorial
packs: [editorial-news, bold]
techniques: [document-format, drag-rotate-object]
url: https://www.panelpress.online/
evidence: design review
added: 2026-10-29
updated: 2026-10-29
---

# Panel/Press (comic cover archive) — good

**Thesis in one line:** A comic-cover archive laid out like a print proof sheet: fanned real covers, then one cover per screen with its credits.

**Split:** design good · build mixed · technique good — strong archive format; heavy and wordy.

**First frame:** cream paper with a thin blue print frame and crop marks; a three-line caps claim at left (7–42 % x, 32–62 % y), the middle line in blue, the last reversed out of a black slab; an orange CTA under a one-line subtitle; four classic covers fanned at right over a faded blue city halftone; a starburst sticker top-right. Eye: covers → claim → orange button.

## Signals

| Signal | Value |
|---|---|
| Font families | 3 — Oswald (labels) · Roboto (display and text) · Telma (script credits) |
| Type scale | largest 140 px · 20 sizes |
| Colour mode / shares | expressive — cream ground 58 % · covers supply red, orange, blue |
| Words (page / heaviest section) | 2,021 / 133 |
| Text zones, first viewport | desktop 6 · mobile 6 |
| Layout system | two-column "cover study" per screen: text card left (number, publisher, title, issue, credits), cover right on a blueprint grid |
| Signature motion | each cover is a 3D object you can drag to rotate and open · libraries: none detected |
| Page weight | ≥ 11.6 MB |
| Mobile | re-composed — cover above, credits card below |
| Source of values | observed |

## What works & why

- **Proof-sheet framing: crop marks, "FIG. 10 / COVER STUDY", issue and year fields** → document-format (INDEX) → rule: borrow the subject's own production paperwork as the grid.
- **One cover per screen with the same fields every time** → consistent card anatomy (fried-egg-golf) → rule: a collection page repeats one fixed spec so items compare at a glance.
- **Covers you can turn and open** → drag-rotate-object (new technique) → rule: let the collectible be handled, with arrow keys as a keyboard path.
- **A swappable ink colour ("Try an ink")** → the accent becomes a toy → rule: a small personalisation control can carry the theme.

## What fails & why

- **11.6 MB and 23 sections** (medium) → page weight budget → rule: lazy-load collection items past the first two; keep a long archive on its own page.
- **Pale labels on cream fail contrast in many places** (medium) → contrast → rule: one darker ink for every label.

## Transferable rules

- Do: let the collection's own paperwork set the layout.
- Don't: ship every item at full weight on one page.

## Never copy

Cover art, logos, exact layout, copy text. Learn the principle only.

**Open question:** the earlier analysis leaned mixed (repeated layout; readers spotted it as AI-made); the owner marks it good. Followed the owner.
