---
slug: emotion-agency
verdict: good
verdict_source: Awwwards SOTD + Developer Award
confidence: low
category: agency
packs: [modern, artsy]
url: https://emotion-agency.com/
evidence: design review
added: 2026-10-25
updated: 2026-10-25
---

# Emotion Agency — good

**Thesis in one line:** An agency that presents itself as an experience before a portfolio — you choose how to enter, with or without sound.

**First frame:** pale lavender ground; serif wordmark with one violet syllable (50 %, 46 %), two-line mono caps strap below (50 %, 52 %), glass pill "Enter with audio" (50 %, 90 %) and an underlined "without audio" link under it. The eye goes wordmark → strap → choice.

## Signals

| Signal | Value |
|---|---|
| Font families | 3 — custom serif (wordmark/display) · PP Neue Montreal (UI, buttons) · IBM Plex Mono (caps straps, index numerals) |
| Type scale | 96 px largest · 10–16 px small · 10 distinct sizes |
| Colour mode / shares | disciplined — lavender ground 99.6 % (UI only), one violet hue (270°) |
| Words (page / heaviest section) | 604 / 95 (awards) |
| Text zones, first viewport | desktop 1 · mobile 1 · travel 0 |
| Layout system | centred axis on the gate; DOM shows a projects index, an awards list and a closing call to build |
| Signature motion | audio-choice gate, glass pill shimmer, WebGL canvas · libraries: lenis |
| Page weight | 10,371 KB |
| Mobile | re-composed — same centred stack, both choices at thumb height |
| Source of values | observed; post-gate content known from DOM text only |

## What works & why

- **Sound is opt-in, with two equally visible choices** → principle: user control of audio (WCAG 1.4.2) → rule: if a site has sound, ask once up front, offer "without" as a real link, never autoplay.
- **One axis, one zone, choice in the thumb zone** → principle: CTA on the path; mobile is one column (reading-paths.md rules 6, 8) → rule: put the gate's action at the bottom of the centred stack on phones.
- **One coloured syllable as the only accent** → principle: one emphasis device; accent ≤ 10 % (typography.md; color.md) → rule: let the wordmark carry the accent hue and keep the rest of the UI neutral.

## What fails & why

- **3 families, 10 sizes** → principle: 2 families + utility, 5–6 sizes (typography.md) → rule: a mono for numerals is fine only if the text face doesn't also need a third voice for labels.
- **No reduced-motion rule with WebGL and smooth scroll** → principle: WCAG 2.3.3; tells.md Motion → rule: every canvas/scroll effect needs a reduced-motion path.
- **Generic strap behind a gate** — "award-winning … brands of tomorrow" is the only claim before entering, and 57 DOM text runs sit at ~1.1:1 until revealed → principle: read the hero aloud — if it fits a competitor, rewrite (tells.md) → rule: a gate's single line must be specific to you.

## Transferable rules

- Do: opt-in audio with an equal "without" option; one accent carried by the wordmark.
- Don't: hide all content behind a gate with a generic line; don't skip reduced-motion on WebGL.

## Never copy

Logo, photography, exact layout, copy text. Learn the principle only.

**Open question:** all 10 views show the gate; the award surely rests on the post-enter WebGL work, which wasn't seen. Confidence low until a click-through review exists.
