---
slug: gogh-with-the-flow
verdict: bad
verdict_source: maintainer review of AI-era motion sites, Oct 2026 (Reddit thread)
confidence: low
category: experimental
packs: [art-gallery, editorial-news]
techniques: [borrowed-art-world, timeline-scrubber]
url: https://notbigmuzzy.github.io/goghwiththeflow/
evidence: design review
added: 2026-10-29
updated: 2026-10-29
---

# Gogh with the Flow (art-history scroll) — bad

**Thesis in one line:** Five hundred years of paintings as one endless scroll, opened by a dimmed still life and an engraved-caps welcome line.
**Split:** design mixed · build bad · technique mixed — great source art; dim chrome, tiny controls, slow on phones.

**First frame:** a Dutch flower still life full-bleed, darkened to about a third of its brightness; a centred two-line caps serif welcome (y 18–38 %); a credit line top-centre; century buttons (XV–XX) stacked in both bottom corners; a "drag me" pill and a TODAY handle bottom-centre on a faint year ruler. The eye: title → flowers → hunts for which control to use.

## Signals

| Signal | Value |
|---|---|
| Font families | 2 — Cinzel (engraved display caps), system sans (controls) |
| Type scale | display ~70 px · controls 11–14 px · 4 small sizes |
| Colour mode / shares | expressive by borrowing — near-black ground 97 % · colour only from the paintings |
| Words (page / heaviest section) | 39 / 39 |
| Text zones, first viewport | desktop 5 · mobile 3 |
| Layout system | one full-screen stage; controls in three corners and the bottom edge |
| Signature motion | drag or scroll a year ruler to move through centuries; floating "wind" drift on the art · libraries: none detected |
| Page weight | ≥ 498 KB (lower bound; the art streams in later) |
| Mobile | same composition, title wraps to three lines; corner buttons crowd the bottom |
| Source of values | observed |

## What works & why

- **Public-domain masterpieces as the whole visual world** → borrowed art world (INDEX, By technique) → rule: a strong existing collection can be the design if the UI stays out of its way.

## What fails & why

- **The painting is dimmed so far it loses its colour** (medium) → hero media / scrim → rule: scrim only behind the words, not the whole canvas.
- **Controls in three corners plus the bottom edge** (medium) → reading zones, eye orbit → rule: one control area; corners for labels only.
- **Tiny low-contrast chrome** (credit line, years, century buttons) (medium) → contrast → rule: controls ≥ 14 px and ≥ 4.5:1.
- **Slow and heavy on phones as the scroll streams art** (medium) → frame budget → rule: load one era at a time with a lighter phone image size.
- **Welcome sentence instead of a name** (medium) → headline that names the thing → rule: name the gallery and its range ("500 years, one scroll").

## Transferable rules

- Do: let borrowed art be the colour; keep the UI one quiet layer.
- Don't: dim the hero to make room for text; don't scatter controls to every corner.

## Never copy

Artworks' presentation, title, layout and copy. Learn the principle only.

**Open question:** the earlier analysis called it mixed (lovely idea, weak build); the maintainer marked it bad. Followed the maintainer; only the first screen was reviewed, so confidence is low.
