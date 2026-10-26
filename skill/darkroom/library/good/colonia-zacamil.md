---
slug: colonia-zacamil
verdict: good
verdict_source: Awwwards SOTD + Developer Award
confidence: medium
category: events-culture
packs: [bold, editorial-news]
url: https://coloniazacamil.com/
evidence: design review
added: 2026-10-25
updated: 2026-10-25
---

# Colonia Zacamil — good

**Thesis in one line:** a documentary that sells a place by asking you to fly into it — the aerial footage is a word in the headline.

**First frame:** one full-width line of condensed caps FLY · TO · [aerial clip] · ZACAMIL at ~50 % y; black Discover pill centred at ~71 % y; two-line serif tagline bottom-centre. The eye reads left → right through the clip, drops to the pill, then the tagline.

## Signals

| Signal | Value |
|---|---|
| Font families | 3 — Heathergreen (condensed caps display) · Reckless Neue (serif text) · Roboto Mono (labels, buttons) |
| Type scale | 187 px display · 24 px tagline · 10–16 px labels · 6 sizes |
| Colour mode / shares | monochrome — warm stone ground 95.5 %, black ink, saturated UI 0.04 %; one tan map-pin accent; colour only in footage |
| Words (page / heaviest section) | 76 / 93 (hidden map copy) |
| Text zones, first viewport | desktop 6 · mobile 5 measured (incl. hidden layers); ~4 visible |
| Layout system | centred axis; headline spans edge to edge; after intro, pill chrome top and bottom around a full-screen map |
| Signature motion | image-in-headline intro → onboarding screen → draggable/zoomable WebGL map with pins · libraries: WebGL canvas |
| Page weight | 5,716 KB |
| Mobile | re-composed — FLY TO / clip / ZACAMIL stacked vertically, CTA docked bottom; consent sheet covers the lower half |
| Source of values | observed; font roles by eye |

## What works & why

- **Footage set inside the headline line** — the clip replaces the gap between TO and ZACAMIL, so claim and image are one unit → principle: one focal point, text and subject don't compete (reading-paths.md rule 7) → rule: for a place, put one strip of footage *in* the headline line instead of text over a full-bleed video.
- **Stone ground + black ink, colour only in the clip** → principle: separate UI palette from media palette; monochrome mode (color.md) → rule: documentary/heritage sites let footage own colour; the UI is ink and paper.
- **One CTA on the axis** directly under the headline → principle: CTA on the path (reading-paths.md rule 6) → rule: an experience site needs exactly one entry action, centred on the reading axis.
- **Onboarding screen before the map** — three diagrammed verbs (drag, scroll, click pins) split by a hairline → principle: labels 1–4 words (attention.md); WCAG 2.5.7 alternatives to dragging → rule: teach a non-standard control in ≤ 3 diagrammed verbs before the scene starts.
- **Mobile re-stacks the headline vertically**, keeping word order with the clip between → principle: mobile is one column in reading order (reading-paths.md rule 8) → rule: re-flow an image-in-headline as a vertical sandwich on phones.

## What fails & why

- **Mono on buttons and labels as a third family** with no data to justify it → principle: 2 families + utility only for real data (typography.md) → rule: labels and CTAs in the text face; mono only for coordinates/timecodes.
- **WebGL-only core** — in view the map state showed chrome on a blank ground; 5.7 MB; no reduced-motion rule; 0 h1, no `lang` → principle: least-complex illusion with a fallback (motion.md); WCAG 1.3.1, 3.1.1 → rule: every canvas scene ships a static poster/HTML fallback; the page keeps one h1 and `lang`.
- **GTM before consent; consent sheet over half the phone hero** → principle: consent-gate trackers (compliance.md) → rule: nothing non-essential loads before the choice; the phone first layer stays compact.

## Transferable rules

- Do: make the hero image a word in the headline when the subject is a place.
- Do: teach custom interactions with 2–3 diagrammed verbs before the interactive scene.
- Don't: let a WebGL map be the only content path; don't use mono for non-data labels.

## Never copy

Logo, footage, exact layout, copy text. Learn the principle only.

**Open question:** the intro is a single screen and the map did not render for us, so the award-winning map itself is unverified — confidence medium.
