---
slug: tides-of-time
verdict: bad
verdict_source: maintainer review of AI-era motion sites, Oct 2026 (Reddit thread)
confidence: medium
category: experimental
packs: [cinematic, editorial-news]
techniques: [gate, webgl-scene]
url: https://tidesoftime.app/
evidence: design review
added: 2026-10-29
updated: 2026-10-29
---

# Tides of Time — bad

**Thesis in one line:** A promising ancestry-migration map hidden behind a three-step onboarding dialog of monospace paragraphs.

**Split:** design mixed · build mixed · technique bad — the map is buried under a tutorial modal.

**First frame:** a dark modal over a dimmed map app. Left half: two crossing gold and teal curves; right half: tracked-caps label, a serif two-line headline, a monospace paragraph, two outlined cards (Y-DNA, mtDNA), more text, then a glowing orange "Next" button. The map — the actual product — is a blur behind.

## Signals

| Signal | Value |
|---|---|
| Font families | 3 — Fraunces (display) · IBM Plex Mono (text, dominant) · Arial (fallback UI) |
| Type scale | largest 30 px · 13 sizes |
| Colour mode / shares | disciplined — near-black navy · gold (30°) accent < 1 % · teal second |
| Words (page / heaviest section) | 282 / 282 (all in the dialog) |
| Text zones, first viewport | desktop 5 · mobile 3 |
| Layout system | full-screen app, onboarding modal on top |
| Signature motion | animated dots spreading over a world map · libraries: webglCanvas |
| Page weight | ≥ 1.3 MB |
| Mobile | squeezed — the dialog fills the phone; the map is invisible |
| Source of values | observed |

## What works & why

- **Paternal and maternal lines get their own colours (gold, teal) from the first frame** → product-colour (INDEX) → rule: give each data series a colour with a named owner and keep it everywhere.

## What fails & why

- **A tutorial dialog stands in for the first frame** (high) → gate (INDEX, avoid) → rule: show the map moving first; explain in place, one line at a time.
- **Body copy in a monospace face at paragraph length** (medium) → typography.md, mono is for data → rule: mono for labels and numbers, a text face for sentences.
- **Generator-default dark styling: tracked caps label, outlined cards, glowing orange button** (medium) → tells.md colour & structure → rule: one chosen device beats a stack of defaults.

## Transferable rules

- Do: let the first frame be the thing moving, with one sentence over it.
- Don't: open with a multi-step "how it works" modal.

## Never copy

Logo, map art, exact layout, copy text. Learn the principle only.

**Open question:** the earlier analysis called it an app outside landing scope; the owner's bad mark stands as a landing lesson.
