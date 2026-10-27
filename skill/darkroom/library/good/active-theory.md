---
slug: active-theory
verdict: good
verdict_source: Top WebGL studio; maintainer moved it to good
confidence: low
category: agency
packs: [cinematic]
techniques: [webgl-scene]
url: https://activetheory.net/
evidence: design review
added: 2026-10-27
updated: 2026-10-27
---

# Active Theory — good

**Thesis in one line:** A real-time WebGL studio whose site is a live particle scene around its mark.

**First frame:** a glowing particle field around their mark on dark blue.

## Signals

| Signal | Value |
|---|---|
| Font families | 1 — nbarchitekt |
| Type scale | 1 sizes · largest 18 px |
| Colour mode / shares | ground 99.8 % · saturated UI 0.1 % |
| Words (page / heaviest section) | 5 / 5 |
| Text zones, first viewport | desktop 1 · mobile 1 |
| Signature motion | libraries: none detected · video 0 · canvas 0 |
| Page weight | ≥ 207 KB (lower bound) |
| Source of values | observed |

## What works & why

- **One luminous object in a dark particle field** → one focal point → rule: a WebGL hero needs one object, not a busy scene.

## What fails & why

_Only issues that cost visitors something (severity in brackets). Minor polish is left out on purpose._

- **No fallback for browsers it doesn't support** (medium) → first frame without WebGL (tells.md) → rule: always ship a poster and a live h1 under any WebGL scene.

## Transferable rules

- Do: one luminous object in a dark field.
- Don't: show "not supported" instead of a poster.

## Never copy

Logo, imagery, characters, footage, exact layout and copy text. Learn the principle only.
