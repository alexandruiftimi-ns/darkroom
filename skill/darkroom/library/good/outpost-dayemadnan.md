---
slug: outpost-dayemadnan
verdict: good
verdict_source: maintainer review of AI-era motion sites, Oct 2026 (Reddit thread)
confidence: medium
category: editorial
packs: [cinematic, nature]
techniques: [chained-clips, video-scrub, wordmark-bookend]
url: https://outpost.dayemadnan.com/
evidence: design review
added: 2026-10-29
updated: 2026-10-29
---

# Outpost (remote-work travel series) — good

**Thesis in one line:** A season of remote work in the Karakoram told as one folded-paper world the scroll travels through, road to fort to peaks.
**Split:** design good · build mixed · technique good — one coherent world; heavy film and late text on phones.

**First frame:** cream ground; a folded-paper mountain diorama with a jeep on a switchback fills the centre-right; a bold serif claim and three lines of copy sit bottom-left (x 5–45 %, y 60–90 %), a vertical season label and a four-item chapter list on the right edge. The eye goes jeep → claim.

## Signals

| Signal | Value |
|---|---|
| Font families | 3 — a bold system serif (display), system sans (text), mono (counters "01 / 06") |
| Type scale | largest 70 px · body 15 px · 5 sizes |
| Colour mode / shares | disciplined — ground 50 % · saturated 17 % · one hue family (30°, paper orange) |
| Words (page / heaviest section) | 39 / 39 |
| Text zones, first viewport | desktop 3 · mobile 3 |
| Layout system | full-bleed film per chapter; one copy card, same anatomy six times, left on desktop, bottom sheet on phone |
| Signature motion | scroll-driven film made of chained generated clips (road → cowork → fort → peaks → closer) · libraries: none detected |
| Page weight | ≥ 3.9 MB (lower bound) |
| Mobile | re-composed — film re-framed tall, copy card becomes a bottom sheet |
| Source of values | observed |

## What works & why

- **One art style for every frame** (folded paper, warm orange against grey stone) → borrowed art world (INDEX, By technique) → rule: generated imagery reads as designed only when one material and palette run through every clip.
- **Clips chained so the camera really travels** (each scene ends where the next begins) → continuity / one camera (references/motion) → rule: join clips on a shared frame so the scroll is a journey, not a slideshow.
- **The orange of the jeep is the only accent in the UI** (labels, chapter list, sound button) → colour from the subject (references/colour) → rule: pick the accent from the hero object.
- **Six numbered chapters with a named subject each** (the work, the mind, the body, the person) → reading path → rule: a chapter index on the edge tells the visitor how long the trip is.
- **Copy card over film keeps contrast** → scrim (references/hero-media) → rule: give text its own ground over moving imagery.

## What fails & why

- **Copy hidden until the entrance finishes** (medium) → first-paint law → rule: the claim must be readable at rest, before any entrance plays.
- **Heavy film on phones; jitter reported on touch** (medium) → frame budget → rule: ship a lighter phone frame set and test the scrub on a real device.
- **Closer frame (back-view figure before a giant wordmark) is the most generic image** (medium) → AI-motion tell → rule: end on a frame only this story could have.

## Transferable rules

- Do: chain clips on matching frames; hold one material and one accent across the film.
- Don't: let the copy wait for the film; don't close on a stock hero pose.

## Never copy

Imagery, the diorama world, wordmark, layout and copy. Learn the principle only.

**Open question:** the earlier analysis called it mixed (repeated card layout, mobile jitter); the maintainer marked it good. Followed the maintainer: the world and the travel carry it.
