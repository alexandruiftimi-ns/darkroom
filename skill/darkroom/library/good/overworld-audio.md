---
slug: overworld-audio
verdict: good
verdict_source: Awwwards SOTD + Developer Award
confidence: low
category: agency
packs: [cinematic]
url: https://overworldaudio.com/
evidence: live study (study.json + 10 shots + 10 extra; desktop never passed the gate)
added: 2026-10-25
updated: 2026-10-25
---

# Overworld Audio — good

**Thesis in one line:** a game-audio studio sold as a place you enter with your ears — sound choice first, then a night landscape to travel through.

**First frame:** gate only — faint line-art mark centred, tracked-caps wordmark at 50 % / 46 %, one outlined ENTER WITH SOUND button at 50 % / 92 %, a dim "without sound" link bottom-right. After entry (mobile): full-bleed WebGL dusk terrain, 3-line serif headline at ~7 % x / 27 % y, one EXPLORE OUR WORK control bottom-left.

## Signals

| Signal | Value |
|---|---|
| Font families | 1 measured on the gate (PP Frama, tracked caps) + a text serif for the headline after entry (estimated from images) |
| Type scale | gate 8–16 px only; entered headline ~34 px on mobile (estimated) |
| Colour mode / shares | disciplined — blue-black ground 99.9 % on the gate, no UI hue; colour lives in the WebGL terrain (blue, rare violet/amber sparks) |
| Words (page / heaviest section) | 4 / 4 measured (all content behind the gate) |
| Text zones, first viewport | desktop 1 · mobile 2 (gate); entered mobile 3 |
| Layout system | full-screen canvas; chrome in corners (logo TL, menu TR, explore BL, hint BR); headline top-left |
| Signature motion | drag/scroll travel through a 3D landscape with clickable markers · libraries: WebGL canvas (no gsap/lenis detected) |
| Page weight | 3,069 KB before entry |
| Mobile | re-composed — same scene, headline left-aligned in the sky, controls stay in corners |
| Source of values | measured (study.json) for the gate; entered state estimated from 5 mobile shots |

## What works & why

- **Explicit sound choice** — ENTER WITH SOUND is the one bordered control; the no-sound path is visible on the same screen → principle: one focal point per viewport (reading-paths.md rule 7); WCAG 1.4.2 audio control → rule: if sound is the product, ask before playing, and make the silent route equal, not hidden.
- **Headline in the sky, terrain below** — serif claim sits in the calm dark top third, the lit ridges hold the lower half → principle: text zone and image focal point don't compete (reading-paths.md rule 7) → rule: place copy in the image's emptiest band and keep it there while the scene moves.
- **Corners hold only chrome** — logo, menu, explore, hint each in a corner, content in the middle → principle: corners are for chrome (reading-paths.md rule 5) → rule: when the canvas is the content, push every control to the edges.
- **One medium for colour** — UI is greyscale, the world carries all hue → principle: separate UI palette from media palette (color.md) → rule: let the immersive scene own colour; chrome stays neutral.

## What fails & why

- **The gate is the whole indexed page** — 4 words, no h1, 3 MB before anything is shown → principle: attention.md (the first frame must state the offer); WCAG 2.4.2 / findability → rule: a gate still needs a one-line claim and real HTML behind it.
- **Low-contrast silent path** — "enter without sound" is dim grey, small, bottom-right → principle: text ≥ 4.5:1 (color.md) → rule: the alternative path gets the same contrast as the primary.
- **Unnamed controls** — 6 icon buttons without accessible names (audit) → principle: WCAG 4.1.2 → rule: icon-only buttons need labels.

## Transferable rules

- Do: for sound-led brands, gate on a sound choice with two equal paths.
- Do: keep chrome in corners and copy in the scene's emptiest band.
- Don't: ship a gate with no claim and no crawlable content behind it.

## Never copy

Logo, photography, exact layout, copy text. Learn the principle only.

**Open question:** the capture never got past the gate on desktop and only 5 mobile frames show the world, so the award-winning part (the landscape travel and audio) is mostly unseen — confidence low until a manual desktop capture exists.
