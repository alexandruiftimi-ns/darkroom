---
slug: oakwood-uae
verdict: bad
verdict_source: maintainer review of AI-era motion sites, Oct 2026 (Reddit thread)
confidence: low
category: corporate
packs: [cinematic, modern]
techniques: [webgl-scene]
url: https://oakwooduae.com/
evidence: published verdict only; design not reviewed
added: 2026-10-29
updated: 2026-10-29
---

# Oakwood UAE — bad

**Thesis in one line:** A WebGL particle showpiece that, per its readers, looks impressive but is hard to use and hard to read on a phone.

**Split:** design mixed · build bad · technique mixed — page would not open; readers called usability poor.

**First frame:** not reviewed. The page would not open for the maintainer, which is itself the verdict.

## Signals

| Signal | Value |
|---|---|
| Font families | not reviewed |
| Type scale | not reviewed |
| Colour mode / shares | not reviewed |
| Words (page / heaviest section) | not reviewed |
| Text zones, first viewport | not reviewed |
| Layout system | not reviewed |
| Signature motion | 3D WebGL particles (per the thread) · libraries: not reviewed |
| Page weight | not reviewed |
| Mobile | not reviewed — readers: "barely legible on mobile" |
| Source of values | estimated (published comments only) |

## What fails & why

- **The site does not open** (critical) → a landing page's first job is to load → rule: the h1, the offer and one action must render without the 3D scene.
- **Particles over legibility, per readers** (high) → text that needs the media to load (tells.md) → rule: copy sits on its own ground, never inside a particle field.

## Transferable rules

- Do: ship a static first frame (live h1 + poster) and stream the WebGL after it.
- Don't: let a particle effect be the only way to read the page on a phone.

## Never copy

Logo, imagery, exact layout, copy text. Learn the principle only.

**Open question:** design not reviewed; the entry rests on the owner's mark ("it does not open") and the Reddit thread.
