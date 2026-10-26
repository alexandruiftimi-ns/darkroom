---
slug: jesper-landberg
verdict: good
verdict_source: Awwwards SOTD + Developer Award + Portfolio Honors
confidence: medium
category: portfolio
packs: [art-gallery, cinematic]
url: http://jesperlandberg.com
evidence: design review
added: 2026-10-25
updated: 2026-10-25
---

# Jesper Landberg — good

**Thesis in one line:** a design engineer's portfolio where the work is the 3D object — curved project screens floating over a wireframe floor.

**First frame:** black void with a perspective grid floor; two to three bent project panels (WebGL) centred at ~45 % x, 50 % y; the active title sits bottom-left on its panel, the next title floats to the right; four tiny caps labels in the corners (name, profile, featured/full, newsletter). The eye lands on the centre panel → its title → the next title.

## Signals

| Signal | Value |
|---|---|
| Font families | 1 — neutral grotesk (measured as "sans"); project names inside screenshots use their own faces |
| Type scale | 27 px titles · 20 · 13 · 10 px labels · 4 sizes |
| Colour mode / shares | monochrome — ground 100 % black, white ink, 0 % saturated UI; all colour from project media |
| Words (page / heaviest section) | 387 / 204 (featured work captions, mostly hidden) |
| Text zones, first viewport | desktop 4 · mobile 4 (corners TL, TR, BR) |
| Layout system | four-corner chrome frame around a centred 3D stage; FEATURED / FULL toggle switches to a list |
| Signature motion | WebGL carousel of curved screens moving through space on a grid floor · libraries: WebGL canvas |
| Page weight | 7,565 KB |
| Mobile | re-composed — after a three-bar loader (most of the first views), the stage becomes a vertical stack of rounded cards, title + arrow on each |
| Source of values | observed |

## What works & why

- **The work is the interface** — panels show the real sites; chrome is four 10–13 px labels → principle: art-gallery pack "the work is the interface"; one focal point (reading-paths.md rule 7) → rule: in a portfolio give the work the screen and shrink the frame to captions.
- **Corners hold only chrome** — name, profile, view toggle, newsletter; nothing else touches the edges → principle: corners are for chrome (reading-paths.md rule 5) → rule: four-corner nav is fine when it's tiny, all-caps chrome and content lives in the centre.
- **One family, four sizes, black/white frame** → principle: typography budget; monochrome mode (color.md) → rule: when the work is colourful, the frame has no colour and one family.
- **Mobile swaps the 3D stage for a plain card list** with the same title + arrow pattern → principle: least complex convincing illusion (motion.md); mobile is one column (reading-paths.md rule 8) → rule: replace a spatial carousel with a list on phones instead of shrinking it.

## What fails & why

- **Weight and load gaps** — 7.5 MB; mobile shows only a loader for the first three scroll points; on desktop the left panel's texture never arrived (flat pink slab); one card on mobile left a black hole → principle: posters before heavy media; reveals that fail leave blank bands (tells.md Motion) → rule: show a poster image on every panel before its WebGL texture; never present an empty stage.
- **Caption over baked text** — the live title sits on top of the screenshot's own description copy → principle: text and image don't compete (reading-paths.md rule 7) → rule: captions sit outside the media or on a clean plate.
- **Newsletter field without a label** → principle: WCAG 1.3.1 / 3.3.2 → rule: every input has a visible or programmatic label.

## Transferable rules

- Do: let the projects be the hero object; chrome in the corners only.
- Do: drop the 3D metaphor on phones for a list with identical labelling.
- Don't: ship a WebGL stage without posters; don't overlay captions on screenshots that carry their own text.

## Never copy

Logo, project imagery, exact layout, copy text. Learn the principle only.

**Open question:** extra Portfolio Honors support the verdict; confidence medium only because the visit showed load failures that a visitor on a slow connection would also see.
