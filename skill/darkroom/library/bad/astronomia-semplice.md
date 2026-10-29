---
slug: astronomia-semplice
verdict: bad
verdict_source: maintainer review of AI-era motion sites, Oct 2026 (Reddit thread)
confidence: low
category: editorial
packs: [cinematic, editorial-news]
techniques: [canvas-particles, pinned-chapters, chapter-colour]
url: https://astronomiasemplice.it/
evidence: design review
added: 2026-10-29
updated: 2026-10-29
---

# Astronomia Semplice — bad

**Thesis in one line:** An Italian astronomy blog opened as a scroll story: one point of light becomes a galaxy, a black hole, then people made of stars.
**Split:** design mixed · build good · technique good — light and coherent, but the generic "cosmic purple serif" look.

**First frame:** near-black violet sky; a centred italic serif line (x 26–74 %, y 52 %) over a single glowing star; "SCORRI" and a thin line below; chapter dots on the right; spaced-caps nav top-right. The eye goes to the star, then the line.

## Signals

| Signal | Value |
|---|---|
| Font families | 2 — Cormorant Garamond (display and body, often italic) · Inter (labels, nav) |
| Type scale | largest 83 px · body 16 px · 12 sizes |
| Colour mode / shares | dark — ground 99 % · lavender for accent words and labels, orange only for the black hole |
| Words (page / heaviest section) | 471 / 168 |
| Text zones, first viewport | desktop 2 · mobile 2 |
| Layout system | one canvas sky behind numbered chapters (spaced-caps label, two-line serif headline with a lavender italic second line, italic paragraph); article cards at the end |
| Signature motion | 2D canvas particles that form a new figure each chapter (galaxy, black hole, moon, two seated figures) · libraries: none detected · canvas 2 |
| Page weight | ≥ 319 KB (lower bound) |
| Mobile | re-composed — figure above, text below, same chapters |
| Source of values | observed |

## What works & why

- **A real chapter structure for a science subject** (numbered chapters, one idea each) → principle: one claim per screen (pinned-chapters) → rule: give a scroll story numbered chapters with one image each.
- **Very light for a full scroll story** → principle: performance budget → rule: particles on a 2D canvas can carry a cinematic story at a few hundred KB.

## What fails & why

- **The default "AI cosmic" look** (medium) — violet-black space, lavender italic second line in every headline, spaced-caps labels: the combination many generated pages reach for → tells.md (serif italic accent word, vibe-code purple, tracked caps) → rule: pick a palette and type pair from the subject's own world (star charts, observatory print), not the cosmic default.
- **Long italic body copy in faint grey over moving stars** (medium) — particles pass over the words and italic serif at 16 px is slow to read → contrast and typography.md → rule: body text in roman, solid colour, with a calm band behind it.
- **Particle figures read as clip art** (medium) — the seated couple and moon are generic shapes → craft.md (specific imagery) → rule: if particles form a figure, make it a real object from the subject (a named nebula, a real telescope).

## Transferable rules

- Do: chapters with one particle figure each, on a light canvas.
- Don't: default to violet space + lavender italic for anything "cosmic".

## Never copy

Logo, figures, layout and copy text. Learn the principle only.

**Open question:** the earlier analysis and Reddit ("absolutely stunning", "super performant") called it good; the owner marked it bad. Following the owner: the look is the generic AI-cosmic default. Confidence low.
