---
slug: pch-drive
verdict: bad
verdict_source: maintainer review of AI-era motion sites, Oct 2026 (Reddit thread)
confidence: low
category: app-marketing
packs: [cinematic, nature]
techniques: [webgl-scene, scroll-path, gate]
url: https://www.pit-stop-app.com/viz/pch
evidence: design review
added: 2026-10-29
updated: 2026-10-29
---

# Pacific Coast Highway (Pit Stop app) — bad

**Thesis in one line:** "Scroll to drive the California coast": a live 3D coastline at golden hour that sells a $1.99 driving app.

**Split:** design mixed · build bad · technique good — strong route idea; washed-out text, gate, low-detail terrain.

**First frame:** a 3D sea and coastline under a peach-to-violet sky fills the screen; a two-line light serif claim sits left (x 3–41 %, y 33–48 %) in cream over the bright sky; a ghost-outline "Start the journey" button; a south-to-north route rail with stop dots runs across the top; a second italic serif block and coordinates sit at the bottom. The eye finds the horizon first and the words late.

## Signals

| Signal | Value |
|---|---|
| Font families | 2 (est.) — light serif display with italic · spaced caps sans for labels |
| Type scale | display around 64 px; many tiny tracked labels (est.) |
| Colour mode / shares | expressive — the sky gradient is the palette; UI is cream and one teal link (est.) |
| Words (page / heaviest section) | about 60 in the first view (est.) |
| Text zones, first viewport | desktop 5 · mobile 4 (est.) |
| Layout system | full-bleed scene; copy left; route rail top-centre as the progress bar |
| Signature motion | scroll moves the camera along the coast from stop to stop (est.) |
| Page weight | not measured |
| Mobile | re-composed — the claim and button stack over the sea and read better than on desktop |
| Source of values | estimated |

## What works & why

- **A route rail as the progress bar** — named start and end (Dana Point → Mendocino) with dots for stops → rule: when scroll is a journey, show where you are on it.

## What fails & why

- **Cream type over the brightest part of the sky** (high) — the claim, body and button nearly vanish on desktop → hero media contrast (references/hero-media) → rule: put text over the darkest band of the frame or grade the frame under it.
- **The trip waits behind "Start the journey"** (medium) → gate (INDEX avoid) → rule: let the first scroll start the drive.
- **Low-detail terrain and floating white dots** (medium) — reads as a tech demo, not a cinematic coast → rule: if the 3D can't look photographic, use filmed or rendered frames.
- **Reported scroll bounce** (medium, not verified) → rule: test the scroll scene with wheel, trackpad and touch.

## Transferable rules

- Do: show journey progress as a named route.
- Don't: set pale serif type on a pale sky.

## Never copy

Scene, route data, copy and branding. Learn the principle only.

**Open question:** the earlier analysis was unsure and the forum called it "incredible"; the owner rated it bad. Only the first screen was reviewed.
