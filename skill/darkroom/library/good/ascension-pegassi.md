---
slug: ascension-pegassi
verdict: good
verdict_source: Awwwards SOTD + Developer Award
confidence: low
category: experimental
packs: [cinematic, bold]
url: https://ascension.pegassi.be/
evidence: design review
added: 2026-10-25
updated: 2026-10-25
---

# Pegassi — Ascension EP — good

**Thesis in one line:** An EP microsite as a portal — the cover art alone in a grain-black void, waiting to be entered.

**First frame:** ~230 px square cover dead centre (50 %, 50 %) on animated grain near-black; mobile adds a grey "Click to enter" under the cover (50 %, 64 %); desktop shows the cover only. The eye has one place to go.

## Signals

| Signal | Value |
|---|---|
| Font families | 1 — plain sans for UI; the chrome "ASCENSION" lettering lives in the artwork |
| Type scale | 48 px largest · 12–16 px · 4 sizes |
| Colour mode / shares | mono — grain near-black (ground share 51 % because noise reads as non-ground), UI hue none; the only colour is the cover's cool blue chrome |
| Words (page / heaviest section) | 454 / 429 (one section behind the gate) |
| Text zones, first viewport | desktop 4 · mobile 3 · travel 2.07 (DOM, mostly not yet visible) |
| Layout system | single centred object; nav Listen / Sequencer / About |
| Signature motion | click-to-enter portal, WebGL canvas, moving grain · libraries: lenis |
| Page weight | 2,667 KB |
| Mobile | re-composed — cover scales to ~60 % width, enter label added |
| Source of values | observed; post-enter not reviewed |

## What works & why

- **Cover art as the only focal object** → principle: one focal point per viewport (reading-paths.md rule 7); cinematic "one object" → rule: for a release, the artwork is the hero — no headline competes with it.
- **Grain ground taken from the cover's own texture** → principle: build the palette from the subject, mono mode (color.md) → rule: derive ground and texture from the artwork; add no UI accent it doesn't contain.
- **2.7 MB for a WebGL music site** → principle: Core Web Vitals budget → rule: a portal intro can be atmospheric and still light.

## What fails & why

- **Desktop gives no instruction to enter**; mobile's label is grey on grain → principle: CTA on the path (reading-paths.md rule 6); WCAG 1.4.3 → rule: a gate always says how to pass it, on every breakpoint, at ≥ 4.5:1.
- **Nav links 21 px tall, 2 links without names** → principle: WCAG 2.5.8 target size, 4.1.2 → rule: ≥ 24 px targets and text names, even on art sites.
- **429 words in one section** → principle: attention.md budgets → rule: move long credits and notes to an About view.

## Transferable rules

- Do: one artwork, centred, on a ground made from its texture.
- Don't: leave a gate unlabelled on desktop.

## Never copy

Logo, photography, exact layout, copy text. Learn the principle only.

**Open question:** only the gate was seen; the Developer Award likely rewards the WebGL sequencer behind it. Confidence low.
