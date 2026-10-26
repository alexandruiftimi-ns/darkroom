---
slug: lingscars
verdict: bad
verdict_source: colorlib
confidence: low
category: e-commerce
packs: [bold, catalog]
url: https://www.lingscars.com/
evidence: published verdict only; design not reviewed
added: 2026-10-25
updated: 2026-10-25
---
# Ling's Cars — bad
**Thesis in one line:** A UK car-leasing shop whose homepage, per colorlib, is so animated that its "extreme flashiness makes you unsure of what to look at". **First frame:** not reviewed — the page did not open for us. Points below rest on colorlib's description.

| Signal | Value |
|---|---|
| Fonts / scale / colour / words / weight | not reviewed (challenge page only); mobile: per colorlib: not responsive, difficult to use; source: colorlib text; to review again |

## What fails & why
- **Animation everywhere at once (colorlib)** → principle: tells.md Motion (meaningless loops); WCAG 2.2.2 Pause, Stop, Hide and 2.3.1 Three Flashes → rule: one motion per viewport, with a purpose, and nothing that loops for more than 5 s without a pause control.
- **The key video lost among effects (colorlib)** → principle: reading-paths.md rule 7 (one focal point per viewport) → rule: when a video is the pitch, everything around it goes still.
- **Not responsive (colorlib)** → principle: WCAG 1.4.10 reflow; reading-paths.md rule 8 → rule: a lease quote flow must work in one column on a phone.

## Transferable rules
- Do: if a founder persona is the brand, carry it with one strong image, not with every effect at once.
- Don't: make motion the default state of the page.

**Open question:** the maximalism is a famous deliberate marketing stunt with strong recall; audience-fit may be real. Review the design directly to upgrade to a full entry.
