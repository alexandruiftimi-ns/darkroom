---
slug: edolus
verdict: good
verdict_source: Awwwards SOTD + Developer Award
confidence: medium
category: experimental
packs: [cinematic, modern]
url: https://edolus.com/
evidence: live study (study.json + 10 shots, preloader/gate only) + 16 re-shots past "Initiate system"
added: 2026-10-25
updated: 2026-10-25
---

# Edolus — good

**Thesis in one line:** AI infrastructure sold as a single continuous 3D camera move — orbit → cloud node → city → data-centre → chip — with one caption per stop.

**First frame:** preloader wordmark with % counter, then a gate: thin-weight caps "INTELLIGENCE AT PLANETARY SCALE" centred over an Earth-limb video, a bracketed INITIATE SYSTEM button and a headphones hint. After entering: a satellite rendered in WebGL fills the frame, heavy-sans title bottom-left (~14 % x, 70 % y), mono caption under it, "SCROLL TO BEGIN" beside the object.

## Signals

| Signal | Value |
|---|---|
| Font families | 2 measured — General Sans (thin gate caps + heavy chapter titles) · JetBrains Mono (captions, buttons); wordmark is artwork |
| Type scale | 96 px gate headline · ~60 px chapter titles · 12–14 px mono caps · 4 sizes |
| Colour mode / shares | disciplined UI (white on black, 0 % saturated) — colour comes from scenes: night blue, haze lavender, desert, then gold-on-black |
| Words (page / heaviest section) | 43 measured (gate only); ~20 per chapter after entry |
| Text zones, first viewport | desktop 4 (gate) · mobile 3 · after entry 2 |
| Layout system | fixed centred wordmark + audio toggle top-right; chapter title + mono caption anchored lower-left; object centred |
| Signature motion | scroll-driven camera flight through one WebGL world, glitch/scramble text reveals, HUD corner brackets; optional audio · libraries: gsap + WebGL canvas |
| Page weight | 49,330 KB |
| Mobile | re-composed — same flight, titles bottom, HUD frame around a map panel; legible |
| Source of values | measured (study.json) for gate; rest estimated from re-shots |

## What works & why

- **One camera, one world, one object per stop** — satellite, node, city, rack, chip each own a full viewport → principle: one focal point per viewport (reading-paths.md rule 7), cadence hook every scroll step (attention.md) → rule: for an abstract product, tell it as a zoom from planet to part; each stop gets one object and one caption.
- **Heavy sans title + mono caps caption, always lower-left** → principle: one copy anchor (rule 1), 2 families with roles (typography.md) → rule: fix one corner of the frame for chapter text and keep the object on the opposite diagonal.
- **UI stays white-on-black; scenes carry the colour shifts** → principle: separate UI and media palettes (color.md) → rule: change the world's light per chapter, never the UI accent.
- **Gold spot-lit rack in a dark hall** → principle: contrast creates focal point → rule: light one object; leave the rest in shadow.

## What fails & why

- **49 MB, preloader, then a click gate before any story** — automated capture saw only the loader and gate → principle: first frame must sell; performance budget (tells.md "Function") → rule: show the first scene as a poster while 3D streams; never gate content behind "Initiate".
- **Scrambling/blurred headline letters while animating; grey mono caption over a bright Earth** → principle: legibility ≥ 4.5:1 (color.md) → rule: text reveals must settle fast and sit on a dark area or scrim.
- **No lang, no h1, no reduced-motion rule (audit)** → principle: accessibility → rule: a WebGL flight needs a static, semantic fallback.

## Transferable rules

- Do: planet-to-part camera flight, one object + one caption per stop, text anchored in one corner.
- Don't: gate the story behind a loader and a button, or ship 49 MB without a poster path.

## Never copy

Logo, 3D models, scenes, exact layout, copy text. Learn the principle only.

**Open question:** jury rewards the spectacle; confidence medium because the weight, gate and missing semantics are serious production defects.
