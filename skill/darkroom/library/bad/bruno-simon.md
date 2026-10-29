---
slug: bruno-simon
verdict: bad
verdict_source: maintainer review of AI-era motion sites, Oct 2026 (Reddit thread)
confidence: medium
category: portfolio
packs: [bold, artsy]
techniques: [webgl-scene, gate]
url: https://bruno-simon.com/
evidence: design review
added: 2026-10-29
updated: 2026-10-29
---

# Bruno Simon (drivable 3D portfolio) — bad

**Thesis in one line:** the famous portfolio you drive with the keyboard; as a page, it opens on a glowing ring and nothing else.
**Split:** design bad · build mixed · technique good — a legendary craft piece, but a game gate, not a page.

**First frame:** a dark plum floor of purple crosses and thin diagonal grid lines; a glowing blue ring in the centre (40–75 % y). No name, no words, no instruction. On the phone the ring slides off the left edge.

## Signals

| Signal | Value |
|---|---|
| Font families | 0 live in the first view |
| Type scale | — |
| Colour mode / shares | mono — plum-black ground 64 %, violet marks, one blue glow |
| Words (page / heaviest section) | 0 / 0 |
| Text zones, first viewport | desktop 0 · mobile 0 |
| Layout system | full-screen 3D world; content is found by driving |
| Signature motion | a drivable car in a physics world · libraries: three (title), WebGL canvas |
| Page weight | ≥ 7 MB |
| Mobile | squeezed — the start ring is off-centre and cut |
| Source of values | observed |

## What works & why

- **The interface is a toy you play** → memorable once (the reason it is famous) → rule: a game layer can be a bonus, beside a readable page.

## What fails & why

- **No who/what before you press start** (high) → tells.md, a gate in front of the content → rule: a name and one line must be readable with no input.
- **Content only reachable by driving** (high) → keyboard and touch parity → rule: every project must also be in a plain list.
- **No h1, 41 images without text** (medium) → accessibility floor → rule: the 3D world needs an HTML twin.

## Transferable rules

- Do: keep playful 3D as an optional layer.
- Don't: make a game the only door to the work.

## Never copy

The car, world, models and copy. Learn the principle only.

**Open question:** the earlier analysis called it a classic craft reference and unsure; the owner marks it bad as a page.
