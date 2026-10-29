---
slug: abstrakt-fable
verdict: bad
verdict_source: maintainer review of AI-era motion sites, Oct 2026 (Reddit thread)
confidence: low
category: editorial
packs: [cinematic, modern]
techniques: [webgl-scene, explorable-explainer]
url: https://abstrakt.sh/sog-explained/fable
evidence: design review
added: 2026-10-29
updated: 2026-10-29
---

# How to shrink a raspberry (SOG explainer) — bad

**Thesis in one line:** A stunning live 3D raspberry opens a technical essay that then turns into long monospace text on near-black.

**Split:** design mixed · build bad · technique good — cinematic hero; 48 MB and a dark text wall after.

**First frame:** a hyper-real raspberry, live in 3D, fills the centre-right on plum-black; a two-line serif title bottom-left (3–40 % x, 45–67 % y) with the fruit's name in pink italic; a four-line paragraph; a stat row in mono (2,370,630 · 559.5 → 35.5 MB · 15.7×). Eye: berry → title → numbers. A strong frame.

## Signals

| Signal | Value |
|---|---|
| Font families | 3 — Fraunces (display) · Instrument Sans (text) · Spline Sans Mono (labels, most used) |
| Type scale | largest 136 px · 13 sizes |
| Colour mode / shares | disciplined — plum-black ground 95 % · pink (330°) accent |
| Words (page / heaviest section) | 2,146 / 307 |
| Text zones, first viewport | desktop 4 · mobile 2 |
| Layout system | centred essay column with live figures (texture planes, palettes, sphere grids) between paragraphs |
| Signature motion | the 3D object re-renders as each compression step is explained; a byte counter docks bottom-right · libraries: webglCanvas (24 canvases) |
| Page weight | ≥ 48.7 MB |
| Mobile | re-composed — berry behind the title, essay below |
| Source of values | observed |

## What works & why

- **The subject is the hero, live and real-looking** → webgl-scene (INDEX) → rule: one photoreal object, lit dramatically, beats any abstract 3D background.
- **A live counter of bytes loaded** → explorable-explainer (new technique) → rule: when the story is about a number, show the number changing as you read.

## What fails & why

- **After the hero, a long dark essay in small mono type** (high) → typography.md, mono is for data; page-length → rule: sentences in a text face; break the essay into short claim-led chapters.
- **48.7 MB for one page** (high) → page weight budget → rule: stream figures as they enter; a first frame under a few MB.
- **Pink italic accent word in a serif title, tracked mono labels everywhere** (medium) → tells.md (serif italic accent word; tracked caps as voice) → rule: one deliberate type gesture, not the default pair.

## Transferable rules

- Do: open on the real object with three proof numbers.
- Don't: follow a cinematic hero with a wall of mono text.

## Never copy

Model, figures, exact layout, copy text. Learn the principle only.

**Open question:** the earlier analysis was unsure and saw a good explainer out of landing scope; the owner marks it bad. Followed the owner; confidence low.
