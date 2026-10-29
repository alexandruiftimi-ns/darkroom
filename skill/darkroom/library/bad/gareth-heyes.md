---
slug: gareth-heyes
verdict: bad
verdict_source: maintainer review of AI-era motion sites, Oct 2026 (Reddit thread)
confidence: medium
category: portfolio
packs: [artsy, cinematic]
techniques: [gate, css-3d-world]
url: https://garethheyes.co.uk/
evidence: design review
added: 2026-10-29
updated: 2026-10-29
---

# Gareth Heyes (3D CSS portfolio) — bad

**Thesis in one line:** a first-person haunted corridor built without JavaScript; you walk with arrows to a door labelled "Research gallery".
**Split:** design bad · build bad · technique mixed — a clever CSS feat; dark, slow and unreadable as a page.

**First frame:** a black corridor with grimy walls and a blue-lit floor; at the far end a wooden door with a neon-green label; above it a red graffiti-style title, a bird icon and a "NO JAVASCRIPT" sticker; four arrow controls at 75–90 % y; a hamburger top-left. The early paint is black with floating labels only.

## Signals

| Signal | Value |
|---|---|
| Font families | 1 live (Roboto) · title is a graffiti image |
| Type scale | largest 45 px · smallest 9 px · 6 sizes |
| Colour mode / shares | dark — near-black ground with blue light, red title, neon green label |
| Words (page / heaviest section) | 14 / 14 |
| Text zones, first viewport | desktop 1 · mobile 2 |
| Layout system | a 3D room you move through; rooms hold sections |
| Signature motion | walking the corridor; flicker loops · libraries: none (CSS only) |
| Page weight | ≥ 12 MB |
| Mobile | squeezed — everything small in the middle of a black screen |
| Source of values | observed |

## What fails & why

- **Content only reachable by walking** (high) → a gate in front of the content (tells.md) → rule: a plain list of work must exist beside the room.
- **Graffiti title, grime textures and horror lighting** (medium) → owner taste: not retro, not hand-made → rule: a technical showpiece still needs a modern, legible identity.
- **Tab reaches nothing; flicker loops ignore reduced motion** (high) → accessibility floor → rule: every control focusable; stop loops under reduced motion.
- **12 MB and a black first paint** (medium) → first-frame law → rule: poster the room first.

## Transferable rules

- Do: treat a 3D walk as a bonus room.
- Don't: make visitors navigate a dark maze to read a CV.

## Never copy

Textures, title art, layout and copy. Learn the principle only.

**Open question:** the earlier analysis was unsure (craft reference, out of scope); the owner marks it bad.
