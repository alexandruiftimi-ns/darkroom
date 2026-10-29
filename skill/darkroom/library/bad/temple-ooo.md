---
slug: temple-ooo
verdict: bad
verdict_source: maintainer review of AI-era motion sites, Oct 2026 (Reddit thread)
confidence: low
category: portfolio
packs: [artsy, cinematic]
techniques: [frame-scrub, gate]
url: https://temple.ooo/
evidence: design review
added: 2026-10-29
updated: 2026-10-29
---

# temple.ooo (personal portfolio) — bad

**Thesis in one line:** A personal portfolio that opens on a drawn signature and a ghost-pale temple, and never says who, what or where to go.
**Split:** design mixed · build bad · technique mixed — lovely mood; no words, no heading, frames blend.

**First frame:** warm cream vignette; a hand-signature line draws itself in the centre, then fades to an almost invisible temple illustration. No headline, no nav visible at rest; three words on the whole page. The eye finds nothing to hold.

## Signals

| Signal | Value |
|---|---|
| Font families | 1 — system mono, labels only |
| Type scale | one size, 11 px |
| Colour mode / shares | mono — cream ground ~100 % · one warm hue (30°) |
| Words (page / heaviest section) | 3 / 3 |
| Text zones, first viewport | desktop 0 · mobile 1 |
| Layout system | one centred canvas stage; projects in a lightbox; sound and rain toggles |
| Signature motion | signature draw-on, then a canvas image-sequence of the temple · libraries: none detected (3 canvases) |
| Page weight | ≥ 706 KB (lower bound) |
| Mobile | same centred signature on a tall cream field |
| Source of values | observed |

## What works & why

- **One material and one warm ink colour** → restraint (references/colour) → rule: a single ink on paper is a strong base, if words sit on it.

## What fails & why

- **No name, no claim, no h1 in the first frame** (high) → no who/what (tells.md) → rule: one live h1 of ≤ 8 words before any intro.
- **The image is too pale to read as a picture** (high) → figure/ground contrast → rule: the hero must survive a glance at arm's length; ghosted art is a background, not a hero.
- **Two frames of the canvas film blend into each other** (medium) → frame-scrub watch-for → rule: draw one frame at a time at full opacity.
- **Navigation hidden behind the mood** (medium) → findability → rule: projects and contact are visible without hunting.

## Transferable rules

- Do: let the intro play over a page that already reads.
- Don't: ship a mood without a sentence; don't fade the hero below legibility.

## Never copy

Signature, temple art, sound design, layout. Learn the principle only.
