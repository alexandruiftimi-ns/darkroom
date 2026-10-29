---
slug: aniiashvili
verdict: good
verdict_source: maintainer review of AI-era motion sites, Oct 2026 (Reddit thread)
confidence: low
category: portfolio
packs: [artsy, cinematic]
techniques: [webgl-scene, object-nav]
url: https://aniiashvili.com/
evidence: design review
added: 2026-10-29
updated: 2026-10-29
---

# Ani Iashvili (designer portfolio) — good

**Thesis in one line:** A designer's portfolio as her own desk at night: lamp glow, posters, a sleeping cat, and every object opens part of the work.

**Split:** design good · build mixed · technique good — warm explorable scene; no heading, tiny nav, weak keyboard.

**First frame:** a top-down 3D desk in an orange-lit room fills the screen: monitor, tablet, camera, lava lamp, cat on a mat, illustrated posters; a condensed-caps name top-left with a tracked tagline; three caps links top-right; one instruction line along the bottom ("drag · scroll · click an object") and a reset button. The eye lands on the lamp-lit monitor.

## Signals

| Signal | Value |
|---|---|
| Font families | 2 — Anton (name) · Outfit (labels) |
| Type scale | tiny UI: largest 28 px |
| Colour mode / shares | warm — the scene's orange light is the palette; pink lava lamp and red poster as accents |
| Words (page / heaviest section) | 37 / 12 |
| Text zones, first viewport | desktop 3 · mobile 2 |
| Layout system | full-bleed scene; UI only on the edges (name, links, instruction strip) |
| Signature motion | orbit and zoom the desk; click an object to open a section · libraries: WebGL canvas |
| Page weight | not measured (streamed scene) |
| Mobile | re-composed — portrait camera, glowing tap dots on each clickable object |
| Source of values | observed |

## What works & why

- **The work lives on the objects she uses** — tablet, monitor, sketches → object-as-menu → rule: in a personal portfolio, make the navigation things the person actually owns.
- **One warm light source** — lamp and monitor glow give depth and mood → rule: light a 3D scene like a room at a time of day.
- **Phone gets tap dots instead of hover** → rule: show what is clickable in a 3D scene on touch.
- **One instruction strip, 37 words in total** → rule: an explorable scene needs one line of how-to, not paragraphs.

## What fails & why

- **No heading in the page and most controls show no focus** (medium) → keyboard and headings → rule: a real h1 and focusable HTML links under any canvas.
- **Nav buttons under 24 px tall** (medium) → target size → rule: edge links still need full touch targets.

## Transferable rules

- Do: put the work on the objects; mark them on touch.
- Don't: leave the canvas as the only way in.

## Never copy

The scene, posters, model and copy. Learn the principle only.

**Open question:** the earlier analysis was unsure (an interactive scene rather than a scroll page); the owner rated it good. Only the first view was reviewed.
