---
slug: zippy-town
verdict: bad
verdict_source: maintainer review of AI-era motion sites, Oct 2026 (Reddit thread)
confidence: medium
category: app-marketing
packs: [family, bold]
techniques: [webgl-scene]
url: https://zippy.town/
evidence: design review
added: 2026-10-29
updated: 2026-10-29
---

# Zippy Town 3D — bad

**Thesis in one line:** a live-wallpaper app sold by its own toy city running in the browser, under a chunky cartoon logo.
**Split:** design bad · build mixed · technique good — live product-as-hero is right; toy styling and hidden copy aren't.

**First frame:** after a taxi loader on grey, a tilt-shift 3D city (Halloween pumpkins, traffic, a canal) fills the screen; a bevelled orange-and-blue game logo sits top-centre at 35–60 % y; one small line and "SCROLL" at the bottom centre; Google Play badge top-left; chapter dots on the right.

## Signals

| Signal | Value |
|---|---|
| Font families | logo is an image; 1 small sans for the tagline |
| Type scale | 1 live text size visible |
| Colour mode / shares | expressive — pink sky, teal sea, toy primaries; ground 28 % |
| Words (page / heaviest section) | text present but invisible at rest / not measurable |
| Text zones, first viewport | desktop 1 · mobile 1 |
| Layout system | full-screen live scene with dot-navigated chapters |
| Signature motion | the city itself: traffic, boats, day/night · libraries: WebGL canvas |
| Page weight | ≥ 8.2 MB |
| Mobile | re-composed — logo larger, city still reads |
| Source of values | observed |

## What works & why

- **The product runs as the hero** — the wallpaper is the page → show the thing working (critique.md) → rule: for an app whose product is motion, run it live in the first frame.

## What fails & why

- **Cartoon game logo and toy styling** (medium) → owner taste: polished, not quirky/hand-made → rule: a playful product can still get a modern type lockup.
- **Chapter copy invisible at rest; the h1 hidden behind the entrance** (high) → tells.md, text that needs media / loader first → rule: rest state shows every line.
- **A loader before the city** (medium) → first-frame law → rule: a still render of the city is the first paint.

## Transferable rules

- Do: let the product's own motion be the hero.
- Don't: hide the words until the scene decides to show them.

## Never copy

Logo, 3D city, characters and copy text. Learn the principle only.

**Open question:** the earlier analysis was unsure (fun, but a product shell); the owner marks it bad.
