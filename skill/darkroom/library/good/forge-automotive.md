---
slug: forge-automotive
verdict: good
verdict_source: Awwwards SOTD + Developer Award
confidence: low
category: corporate
packs: [cinematic, luxury]
url: https://forgeautomotive.co.uk/
evidence: live study (study.json + 10 shots + 16 extra post-enter shots)
added: 2026-10-25
updated: 2026-10-25
---

# Forge Automotive — good

**Thesis in one line:** A bespoke-car atelier that sells restraint first: one black frame, one sentence, one door.

**First frame:** enter gate. Logo top-centre (50 %, 5 %), tracked-caps manifesto dead centre (50 %, 50 %), underlined serif ENTER near the bottom (50 %, 89 %) with a tiny cookie line under it; the eye drops logo → claim → ENTER on one axis.

## Signals

| Signal | Value |
|---|---|
| Font families | 2 — condensed editorial serif (display, ENTER) · Geist Sans (tracked caps, body); Times New Roman fallback detected |
| Type scale | 140 px largest · body 14–18 px · 9 distinct sizes (8–140) |
| Colour mode / shares | mono — near-black ground 99.6 % (UI only), no UI hue; the 30 % "saturated" reading is RGB fringing on the caps |
| Words (page / heaviest section) | 484 / 80 (identity block) |
| Text zones, first viewport | desktop 4 · mobile 2 · travel 1.11 |
| Layout system | centred axis on the gate; mobile hero = 3-line serif headline at top, one-line descriptor docked at bottom over dark carbon texture |
| Signature motion | enter gate → hairline loader → reveal · libraries: lenis |
| Page weight | 583 KB (at gate, media failed) |
| Mobile | re-composed — headline re-broken to 3 lines, phone and menu icons in top corners |
| Source of values | measured (study.json, gate state); post-enter seen only on mobile hero |

## What works & why

- **Gate built on one axis** — logo, one claim, one action stacked centre → principle: one focal point, CTA on the path (reading-paths.md rules 6–7) → rule: if a site must gate, use one sentence and one labelled action on one vertical axis, nothing else.
- **Serif display vs tracked-caps sans** — ENTER and the hero headline in a condensed editorial serif, every label in small tracked Geist → principle: two families with distinct roles (typography.md budget and roles) → rule: give display and utility faces jobs so different they never compete.
- **Mobile hero: headline top, descriptor bottom, calm texture between** → principle: text on the calm area of the image, not over the subject (reading-paths.md rule 7; color.md contrast) → rule: on dark textured grounds keep copy at the top and bottom edges and leave the middle to the image.

## What fails & why

- **ENTER is also cookie consent** ("by pressing enter … you accept cookies") → principle: consent tied to access is not freely given (GDPR Art. 7(4); EDPB on cookie walls; compliance.md) → rule: consent is its own, declinable control, never the door to the content.
- **Desktop stalled on a black loader** — media blocked by CORS (8 console errors); all 8 post-enter desktop shots are the same empty frame → principle: reveals that fail leave blank bands (tells.md Motion) → rule: every gated reveal needs a poster/still state that renders without the media.
- **Hidden text and a long identity block** — 23 text runs measured ~1.0–1.15:1 (pre-reveal), 80-word identity section vs 30 budget → principle: attention.md hero budget; WCAG 1.4.3 → rule: text in the DOM must be legible before animation, or not exposed yet.

## Transferable rules

- Do: one sentence + one action on one axis when you open on a gate; serif display + tracked utility sans.
- Don't: bundle consent into ENTER; don't ship a reveal without a static fallback.

## Never copy

Logo, photography, exact layout, copy text. Learn the principle only.

**Open question:** the SOTD + Developer Award almost certainly rewards the post-enter car showcase, which never rendered on desktop here; confidence low until a real-browser capture shows the builds and stock sections.
