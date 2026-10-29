---
slug: usta-agency
verdict: good
verdict_source: maintainer review of AI-era motion sites, Oct 2026 (Reddit thread)
confidence: medium
category: agency
packs: [cinematic, bold]
techniques: [particle-morph, webgl-scene]
url: https://usta.agency/
evidence: design review
added: 2026-10-29
updated: 2026-10-29
---

# USTA agency — good

**Thesis in one line:** A creative agency sold as a launch: a particle rocket on a starfield that dissolves and re-forms into an astronaut as you scroll.
**Split:** design good · build mixed · technique good — the morph is the wow; wordy sections and a sticky consent panel.

**First frame:** black starfield; a rocket made of orange and blue particles fills the right half, tilted for lift-off; stacked condensed caps (outline "BOOST", solid "YOUR BRAND") on the left (x 7–32 %, y 30–70 %) still entering. The eye goes rocket → stacked words.

## Signals

| Signal | Value |
|---|---|
| Font families | 2 working — Oswald (condensed display caps), Montserrat (text) |
| Type scale | largest 150 px · body 18 px · 15 sizes |
| Colour mode / shares | mono — ground 88 % (black) · saturated 0.3 % · colour only in the particles (amber, ice blue) |
| Words (page / heaviest section) | 1,159 / 244 |
| Text zones, first viewport | desktop 1 · mobile 1 |
| Layout system | full-bleed black stage; copy column left or right, alternating per chapter; giant e-mail address as the close |
| Signature motion | one particle cloud morphs rocket → scattered → astronaut with scroll · libraries: WebGL canvas |
| Page weight | ≥ 4.4 MB (lower bound) |
| Mobile | squeezed — the particle object drifts behind the text; headlines crop at the edge |
| Source of values | observed |

## What works & why

- **One particle object that changes shape with the story** (launch → space → crew) → one continuous scene (INDEX, webgl-scene) → rule: morph one object between chapter meanings instead of swapping images.
- **Colour lives only in the particles** (black and white UI, amber and blue points) → product colour → rule: when the hero is luminous, keep the UI colourless.
- **Outline-plus-solid condensed caps** → contrast of weight inside one face → rule: one condensed caps face, two treatments, for a poster rhythm.
- **E-mail address as the closing giant type, with the astronaut behind it** → wordmark bookend → rule: end on the one action, set huge.

## What fails & why

- **Consent panel stays over the bottom-left of every frame** (medium) → stacked overlays (tells.md) → rule: one overlay, dismissed once, never over the claim.
- **Over 100 words per chapter in a 150 px display layout** (medium) → word budget → rule: the spectacle pages need ≤ 45 words per chapter.
- **Black loading frame first, headline still entering at rest** (medium) → first-paint law → rule: paint the claim with the ground; let particles arrive after.

## Transferable rules

- Do: morph one hero object between chapter meanings; keep the UI monochrome around it.
- Don't: pair a spectacle stage with paragraphs; don't leave consent pinned over the story.

## Never copy

The particle models, logo, layout and copy. Learn the principle only.

**Open question:** the earlier analysis called the page mixed (template-like around the effect); the maintainer marked it good. Followed the maintainer: "template-like" is not a minus.
