---
slug: jimo
verdict: good
verdict_source: Awwwards nominee / HM (exact listing unverified)
confidence: low
category: saas
packs: [modern]
url: https://jimo.ai/product/ai
evidence: design review
added: 2026-10-25
updated: 2026-10-25
---

# Jimo — good

**Thesis in one line:** an in-app AI agent sold by showing it work inside a believable SaaS screen.

**First frame:** pure black; centred two-line headline at ~50 %, 40 % fading white→grey across the words; one-line sub; one grey "Book a demo" button; nav with Book a demo + white "Try for free". Mobile adds a glowing planet arc behind the headline.

| Signal | Value |
|---|---|
| Font families | 4 rendered — GT Walsheim (Medium/Regular), DM Sans, Inter, + ui-monospace |
| Type scale | 160 px max · ~86 px hero · body 16–20 px · 27 distinct sizes |
| Colour mode / shares | monochrome dark — black ground 83 %; colour only inside the mock UI (blue send button, status dots) |
| Words (page / heaviest section) | 1,823 / 518 |
| Text zones, first viewport | desktop 1 · mobile 1 (+ cookie banner) |
| Signature motion | scroll-driven demo: agent panel guiding a billing screen · libraries: WebGL canvas · weight not measured (1 KB reported) |
| Mobile | re-composed — stacked demo, pricing slider; scroll scenes partly blank |
| Source of values | observed |

## What works & why
- **A mock billing app with the agent panel docked beside it, tabs "Guides / Answers / Acts"** → principle: tells.md Structure (avoid fake grey-bar dashboards; replace with substance) → rule: demo an AI product inside a realistic, specific UI with real-looking data and one task.
- **Mobile pricing: one big price, yearly/monthly toggle, request-volume slider** → principle: one focal point (reading-paths.md rule 7); detail on demand (attention.md) → rule: usage pricing reads best as one number driven by one control.
- **Cookie banner with Reject and Accept at equal weight** → principle: compliance — equal-weight refusal (GDPR / EDPB) → rule: never style refusal as a link under a big Accept.

## Transferable rules
- Do: keep the hero to one claim, one line and one action (attention.md budgets).
- Don't: build scroll scenes that leave whole viewports black when they don't render — 2 of 5 desktop views were empty (tells.md Motion "reveals that fail"); and don't fade headline words into grey gradient text (tells.md Colour; color.md contrast).

**Open question:** blank viewports, gradient text, 4 families / 27 sizes and the near-black-plus-glow default make me doubt the nominee prior — confidence low.
