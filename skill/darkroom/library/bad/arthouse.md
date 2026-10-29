---
slug: arthouse
verdict: bad
verdict_source: maintainer review of AI-era motion sites, Oct 2026 (Reddit thread)
confidence: low
category: agency
packs: [bold, modern]
techniques: [video-in-type, wordmark-bookend]
url: https://www.madebyarthouse.com/
evidence: design review
added: 2026-10-29
updated: 2026-10-29
---

# Arthouse — bad

**Thesis in one line:** A Vienna product studio painted entirely in electric blue with white typewriter-mono text, opening on its wordmark filled with footage.
**Split:** design bad · build mixed · technique mixed — committed but harsh and dated; the footage-in-wordmark opens blurry.

**First frame:** a solid electric-blue screen; centred at y 25–38 % the wordmark with low-resolution footage showing through the letters; under a hairline at y 63 % a one-line mono claim at full width and three lines of description; a cookie bar along the bottom.

## Signals

| Signal | Value |
|---|---|
| Font families | 1 — a monospaced-feel inktrap grotesk for everything |
| Type scale | largest 187 px (closing wordmark) · body 17 px · 9 sizes |
| Colour mode / shares | mono-hue — one saturated blue covers ~96 % of the page; white text; a thin yellow progress bar |
| Words (page / heaviest section) | 374 / 90 |
| Text zones, first viewport | desktop 1 · mobile 1 |
| Layout system | hairline-ruled grid, numbered service list, white inset panels for work images, giant wordmark at the end |
| Signature motion | footage inside the wordmark; section reveals · libraries: none detected · video 1 |
| Page weight | ≥ 767 KB (lower bound) |
| Mobile | re-composed — single column, same blue, wordmark shrinks to a smudge |
| Source of values | observed |

## What works & why

- **One colour, one face, one grid, held to the end** → principle: commit to one bold choice (tells.md) → rule: if you go mono-hue, keep every section on the same system.

## What fails & why

- **Saturated blue on every pixel for 8,600 px** (medium) — no neutral rest, white text vibrates on it; Reddit also called it harsh → colour.md (saturated ground fatigue) → rule: a loud brand colour works as a field between neutral sections, not as the only ground.
- **The opening focal point is a blurry wordmark** (medium) — the footage inside the letters is soft and pixelated at 1440 px, so the first thing you see looks broken → hero-media.md → rule: video masked into type must be sharp at the type's real size, or use a still.
- **Typewriter mono for long reading** (medium) — reads retro and slow, not modern → typography.md (mono is a utility face) → rule: keep mono for labels and numbers; set paragraphs in a text face.
- **Labels and names that vanish into the blue** (medium) — service and crew labels drop to blue-on-blue at some scroll states → contrast law → rule: check every state of a reveal, not only the settled one.

## Transferable rules

- Do: use footage-in-type only with footage that is sharp and high-contrast at that size.
- Don't: run one saturated hue as the ground of a whole page.

## Never copy

Logo, wordmark, colour, layout and copy text. Learn the principle only.

**Open question:** the earlier analysis and Reddit praised it as "a break from AI slop" and called it good; the owner marked it bad (harsh blue, retro mono, a muddy first frame). Following the owner; confidence low.
