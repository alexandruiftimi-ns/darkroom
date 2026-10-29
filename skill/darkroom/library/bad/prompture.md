---
slug: prompture
verdict: bad
verdict_source: maintainer review of AI-era motion sites, Oct 2026 (Reddit thread)
confidence: medium
category: saas
packs: [modern]
techniques: [video-hero]
url: https://prompture.framer.website/
evidence: design review
added: 2026-10-29
updated: 2026-10-29
---

# Prompture — bad

**Thesis in one line:** An AI client-message writer on a blue wave hero whose headline arrives late and whose proof is placeholder logos.
**Split:** design bad · build bad · technique mixed — template defaults, invisible entrances, 10 MB for a light page.

**First frame:** a dark navy screen for the first moment, then a blue rolling-wave video fills the frame; the headline sits low-left (x 12–45 %, y 69–80 %) in white, half-faded; "Trusted by Researchers At" bottom-right above greyed logos that read IPSUM, LOGO, logoipsum; "Buy Template" and "Made in Framer" badges float bottom-right. The eye finds the waves, not the claim.

## Signals

| Signal | Value |
|---|---|
| Font families | 2 — Almarai (display/UI) · Geist (text) |
| Type scale | largest 56 px · body 16 px · 6 sizes |
| Colour mode / shares | disciplined — near-white sections 96 %, blue only in hero and footer bands |
| Words (page / heaviest section) | 1,044 / 1,038 |
| Text zones, first viewport | desktop 1 · mobile 1 |
| Layout system | hero video, then pale grey card grids with outline diagrams, process list, pricing tiers, FAQ, footer repeating the headline |
| Signature motion | looping wave video; every block fades up · libraries: none detected · video 1 |
| Page weight | ≥ 10.9 MB (lower bound) |
| Mobile | re-composed — but the template badges cover content at every scroll point |
| Source of values | observed |

## What fails & why

- **Headline hidden by its own entrance** (high) — still at partial opacity seconds after load; Reddit said the hero text was barely noticed → tells.md "text that needs the media to load" → rule: the h1 is visible in the first paint; animate after, never before.
- **Placeholder logo wall** (high) — "IPSUM", "LOGO", "logoipsum" under "Trusted by" → tells.md (leftover placeholders, invented logo walls) → rule: no proof row until there is real proof.
- **Buttons at 1:1 contrast** (medium) — "Contact Us", "Get Started", "Purchase Now" labels vanish on their own fill in several states → contrast law → rule: check every button state, not only the default.
- **Fade-up on every block** (medium) → tells.md motion → rule: animate one thing per section, with a reason.
- **10.9 MB for a text-and-cards page** (medium) → performance budget → rule: a hero loop should be a few hundred KB, with a poster.

## Transferable rules

- Don't: ship a template with its placeholder logos and badges.
- Don't: let the first-screen claim wait for an entrance animation.

## Never copy

Logo, video, layout and copy text. Learn the principle only.

**Open question:** the earlier analysis said "mixed, leaning bad"; the owner marked it bad. Agreed.
