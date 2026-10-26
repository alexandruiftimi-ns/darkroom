---
slug: arngren
verdict: bad
verdict_source: colorlib
confidence: low
category: e-commerce
packs: [catalog, bold]
url: https://arngren.net/
evidence: published verdict only; design not reviewed
added: 2026-10-25
updated: 2026-10-25
---
# Arngren — bad
**Thesis in one line:** A Norwegian gadget shop whose homepage is, per colorlib, a tiny-type image collage that "put 0 thought into creating a good user experience". **First frame:** not reviewed — the page did not open for us. Points below rest on colorlib's description.

| Signal | Value |
|---|---|
| Fonts / scale / colour / words / weight | not reviewed (block page only: Times, 2 sizes, 9 words); mobile: per colorlib: not adapted; desktop forces side-scrolling; source: colorlib text; to review again |

## What fails & why
- **Tiny-font labels packed around product photos (colorlib)** → principle: typography.md (body ≥ 16 px; 5–6 sizes); reading-paths.md rule 7 (one focal point) → rule: a catalog grid gives each product one photo, one name, one price at readable size, in rows.
- **Horizontal scrolling on desktop (colorlib)** → principle: WCAG 1.4.10 reflow; reading-paths.md rule 3 (zone order = reading order) → rule: never make a page wider than the viewport.
- **No mobile layout (colorlib)** → principle: reading-paths.md rule 8 (mobile is one column) → rule: ship a one-column phone layout for any catalog.

## Transferable rules
- Do: grid products in rows with consistent label placement.
- Don't: let density replace hierarchy; more items per screen is not more findable.

**Open question:** evidence is second-hand. Review the design directly and upgrade to a full entry.
