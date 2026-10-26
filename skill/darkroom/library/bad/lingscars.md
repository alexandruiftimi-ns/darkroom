---
slug: lingscars
verdict: bad
verdict_source: colorlib
confidence: low
category: e-commerce
packs: [bold, catalog]
url: https://www.lingscars.com/
evidence: verdict text only — all 10 study shots show the Cloudflare "security verification" page; no study.json; not visually inspected
added: 2026-10-25
updated: 2026-10-25
---
# Ling's Cars — bad
**Thesis in one line:** A UK car-leasing shop whose homepage, per colorlib, is so animated that its "extreme flashiness makes you unsure of what to look at". **First frame:** not captured — Cloudflare's bot check never cleared at 1440 or 390 px. Points below rest on colorlib's description.

| Signal | Value |
|---|---|
| Fonts / scale / colour / words / weight | not captured (challenge page only); mobile: per colorlib: not responsive, difficult to use; source: colorlib text; re-shoot needed |

## What fails & why
- **Animation everywhere at once (colorlib)** → principle: tells.md Motion (meaningless loops); WCAG 2.2.2 Pause, Stop, Hide and 2.3.1 Three Flashes → rule: one motion per viewport, with a purpose, and nothing that loops for more than 5 s without a pause control.
- **The key video lost among effects (colorlib)** → principle: reading-paths.md rule 7 (one focal point per viewport) → rule: when a video is the pitch, everything around it goes still.
- **Not responsive (colorlib)** → principle: WCAG 1.4.10 reflow; reading-paths.md rule 8 → rule: a lease quote flow must work in one column on a phone.

## Transferable rules
- Do: if a founder persona is the brand, carry it with one strong image, not with every effect at once.
- Don't: make motion the default state of the page.

**Open question:** the maximalism is a famous deliberate marketing stunt with strong recall; audience-fit may be real. Re-shoot from a normal browser to upgrade to a full entry.
