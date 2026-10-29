---
slug: unfor-dev
verdict: bad
verdict_source: maintainer review of AI-era motion sites, Oct 2026 (Reddit thread)
confidence: medium
category: portfolio
packs: [cinematic, bold]
techniques: [gate, webgl-scene]
url: https://unfor-dev.vercel.app/
evidence: design review (entry screen only; content behind the gate not reviewed)
added: 2026-10-29
updated: 2026-10-29
---

# Unfor Dev — bad

**Thesis in one line:** A three.js portfolio that greets every visitor with a black screen, a percentage and an ENTER button.

**Split:** design bad · build bad · technique bad — gate first, then (per the thread) an overloaded scene.

**First frame:** pure black; a thin white line, "100%" in a wide techno face and a boxed "ENTER →" button centred; "Press Enter or click to continue" below. Faint vertical light streaks in the background. Scrolling does nothing: every scroll position shows the same screen.

## Signals

| Signal | Value |
|---|---|
| Font families | 6 — Aeonik (three cuts), Michroma (techno caps), Dimensions, Roboto Flex |
| Type scale | largest 675 px · body 14 px · 13 sizes |
| Colour mode / shares | mono — black ground 99.6 % · accent 2.1 % |
| Words (page / heaviest section) | 297 / 237 (behind the gate) |
| Text zones, first viewport | desktop 4 · mobile 4 (counted behind the gate) |
| Layout system | loader + gate over a full-page scene |
| Signature motion | three.js cards, sparks and a star field (per the thread) · 65 looping animations keep running under reduced motion · libraries: webglCanvas |
| Page weight | ≥ 3,105 KB |
| Mobile | same gate, same black screen |
| Source of values | observed |

## What works & why

_Nothing reviewable beyond the gate._

## What fails & why

- **ENTER gate in front of everything** (high) — the page neither scrolls nor says who this is until you click → tells: a gate in front of the content → rule: the page scrolls and sells with no click; an intro may sit over it, never replace it.
- **Six font families and thirteen sizes** (medium) → typography three-family budget → rule: one display, one text, one utility face at most.
- **Motion that ignores reduced-motion** (medium) — dozens of infinite pulses, beams and glows keep running → reduced-motion path → rule: loops stop when the visitor asks for less motion.
- **Too much at once behind the gate** (medium, per the thread: "way too much") → one signature move → rule: pick one effect and let the rest be still.

## Transferable rules

- Don't: put a loader-plus-ENTER screen in front of a portfolio.
- Do: show the name and one piece of work in the first paint, with the 3D scene streaming in behind.

## Never copy

Logo, scene, exact layout, copy text. Learn the principle only.

**Open question:** the content behind the gate was not reviewed; the verdict rests on the gate, the measured type and motion, and the thread.
