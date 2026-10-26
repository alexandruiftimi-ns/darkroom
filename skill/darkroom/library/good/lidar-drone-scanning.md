---
slug: lidar-drone-scanning
verdict: good
verdict_source: Awwwards SOTD + Developer Award + Product Honors
confidence: medium
category: product-launch
packs: [modern, cinematic]
url: https://drone.riotters.com/
evidence: design review
added: 2026-10-25
updated: 2026-10-25
---

# Aevion LiDAR Drone (Riotters tech demo) — good

**Thesis in one line:** an industrial drone sold like a precision instrument — cold grey-white, one huge thin wordmark, then one spec at a time.

**First frame:** inset panel with a giant outlined "aevion" wordmark (glass/ghost, ~0–100 % x, 25–55 % y); two-line claim bottom-left (~2 % x, 92 % y, second line grey); "Scroll Down" bottom-right. The eye goes ghost wordmark → bottom-left claim; the 3D drone (WebGL) is meant to fill the panel.

## Signals

| Signal | Value |
|---|---|
| Font families | 2 — Switzer (display + body, thin weights) · Proto Mono (bracketed caps labels "[ MAX RANGE ]") |
| Type scale | 240 px section titles · 64/56 px stats · body 16–20 px · 14 measured sizes |
| Colour mode / shares | mono — cool off-white ground 100 %, slate ink #23343f-ish, inactive items in light grey; no hue accent |
| Words (page / heaviest section) | 485 / 126 (Software) |
| Text zones, first viewport | desktop 7 (audit, counts header items) · mobile 4 · travel 2.58 |
| Layout system | 24 px inset; 3-col and 4-col ruled grids; huge left-aligned section word, then list-left / object-centre / stat-right triptych |
| Signature motion | WebGL drone pinned in the centre column while the left list (Scan · Connection · Compactness) and right stat swap on scroll · libraries: lenis + WebGL canvas |
| Page weight | 9,215 KB |
| Mobile | re-composed — stats become a ruled stacked list, triptych becomes list → stat → render; preloader shows "100" first |
| Source of values | observed; drone visuals seen only on mobile views |

## What works & why

- **Pinned triptych: active term left, object centre, one number + one sentence right** → principle: one focal point; one claim per beat (attention.md word budgets) → rule: for spec-heavy products, scroll one spec at a time beside a pinned object, inactive terms dimmed but in place.
- **Three stats in a ruled 3-up row, only the centre one at full ink** → principle: related items in one row with labels (reading-paths.md rule 4) → rule: numbers sit in one row under one rule; highlight by ink, not by box.
- **Mono bracketed labels as a utility voice** → principle: two families + utility role (typography.md) → rule: a mono label face can carry "instrument" tone without touching the display face.
- **No hue at all; slate on cool white** → principle: mono mode matched to use scene (color.md rule 5) → rule: technical B2B can read premium by removing colour, not adding gradients.
- **Honest disclaimer in the footer (tech demo, not affiliated)** → principle: trust / compliance → rule: concept sites state their status in plain text.

## What fails & why

- **Ghost wordmark and grey second line at ~1.6:1** → principle: large text ≥ 3:1 (color.md) → rule: a ghosted display word is decoration; the real claim must still pass contrast.
- **Header carries 4 items across the full width (brand, tagline, credit, clock)** — audit counts 7 zones in the first viewport → principle: ≤ 3 text zones (reading-paths.md rule 2), corners for chrome only (rule 5) → rule: drop clocks/credits from the hero header.
- **9.2 MB and a blank centre panel when WebGL is late** → principle: first frame must sell; poster fallback → rule: give every WebGL object a static render as poster.

## Transferable rules

- Do: list-left / pinned object / stat-right, one spec per scroll step.
- Do: one display family in thin weights + one mono utility face.
- Don't: let a 3D canvas be the only content of the hero.

## Never copy

Logo, drone model, exact layout, copy text. Learn the principle only.

**Open question:** desktop WebGL did not render in view, so the hero was judged without its object; confidence medium.
