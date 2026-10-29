---
slug: aecync-switch
verdict: good
verdict_source: maintainer review of AI-era motion sites, Oct 2026 (Reddit thread)
confidence: high
category: product-launch
packs: [modern, bold]
techniques: [hud-labels, logo-marquee, wordmark-bookend, webgl-scene, mode-switch]
url: https://demo.aecync.com/
evidence: design review
added: 2026-10-29
updated: 2026-10-29
---

# aecync (handheld navigator concept) — good

**Thesis in one line:** "OFF GRID. ON COURSE." — a rugged navigator sold by heavy black caps, an orange data ribbon and the device in a black instrument frame.
**Split:** design good · build mixed · technique good — strong product page; 16 MB, and the 3D mode can trap phones.

**First frame:** white with a faint column grid; a small mono label then a two-line heavy black caps headline (orange full stops) at 5–50 % x, 25–43 % y; a tilted orange ribbon "HEADING · POSITION · ELEVATION" runs across under it; right, a black panel with the device render, hairline callouts and coordinates; a floating pill nav with a "3D view" switch showing a percentage.

## Signals

| Signal | Value |
|---|---|
| Font families | 3–4 — Poppins (display caps) · Inter (text) · monospace (labels) · Arial fallback |
| Type scale | largest 374 px (closing wordmark) · body ≈ 16 px · 15 sizes |
| Colour mode / shares | disciplined — white and black grounds (60 %) · one orange (~30°, 13 % of non-ground) |
| Words (page / heaviest section) | 638 / 234 (about) |
| Text zones, first viewport | desktop 5 · mobile 3 |
| Layout system | split hero; dark story band with field video; feature chips that open the 3D view; testimonials; live elevation chart; four parts tiles; huge orange wordmark closer |
| Signature motion | a toggle that turns the page into a 3D layer of the device; ribbon marquee · libraries: WebGL canvas |
| Page weight | ≥ 16.2 MB |
| Mobile | re-composed — headline first, device below, a sticky "Enter the 3D view" pill |
| Source of values | observed |

## What works & why

- **Hairline callouts and coordinates on the render** (hud-labels) → instrument labels from the subject → rule: annotate the product in its own units.
- **One orange for full stops, ribbon, data and wordmark** → single accent with an owner (colour.md) → rule: one accent, everywhere it means "signal".
- **A 2280 M elevation chart as a section** → data as image → rule: a number at poster size plus its curve sells a spec better than a list.
- **Parts as four black product tiles** → catalog rhythm → rule: name each part in one caps word.
- **3D is an opt-in switch, not a gate** → the page scrolls without it → rule: heavy 3D lives behind a toggle beside the content.

## What fails & why

- **Phone users can get trapped in the 3D mode** (medium, per the thread) → a mode needs an obvious exit → rule: the exit stays visible and Back undoes the mode.
- **16 MB and five text zones up top** (medium) → weight and zone budgets → rule: load 3D only when the switch is used.

## Transferable rules

- Do: callouts, one signal colour, an opt-in 3D layer.
- Don't: let the special mode hide its own exit.

## Never copy

Logo, device renders, footage, layout and copy text. Learn the principle only.
