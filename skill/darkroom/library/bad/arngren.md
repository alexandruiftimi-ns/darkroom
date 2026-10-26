---
slug: arngren
verdict: bad
verdict_source: colorlib
confidence: low
category: e-commerce
packs: [catalog, bold]
url: https://arngren.net/
evidence: verdict text only — all 10 study shots show "403 Forbidden" (bot block); not visually inspected
added: 2026-10-25
updated: 2026-10-25
---
# Arngren — bad
**Thesis in one line:** A Norwegian gadget shop whose homepage is, per colorlib, a tiny-type image collage that "put 0 thought into creating a good user experience". **First frame:** not captured — the server returned 403 to the automated browser at 1440 and 390 px. Points below rest on colorlib's description, not on our shots.

| Signal | Value |
|---|---|
| Fonts / scale / colour / words / weight | not captured (block page only: Times, 2 sizes, 9 words); mobile: per colorlib: not adapted; desktop forces side-scrolling; source: colorlib text; re-shoot needed |

## What fails & why
- **Tiny-font labels packed around product photos (colorlib)** → principle: typography.md (body ≥ 16 px; 5–6 sizes); reading-paths.md rule 7 (one focal point) → rule: a catalog grid gives each product one photo, one name, one price at readable size, in rows.
- **Horizontal scrolling on desktop (colorlib)** → principle: WCAG 1.4.10 reflow; reading-paths.md rule 3 (zone order = reading order) → rule: never make a page wider than the viewport.
- **No mobile layout (colorlib)** → principle: reading-paths.md rule 8 (mobile is one column) → rule: ship a one-column phone layout for any catalog.

## Transferable rules
- Do: grid products in rows with consistent label placement.
- Don't: let density replace hierarchy; more items per screen is not more findable.

**Open question:** evidence is second-hand. Re-shoot from a normal browser session (the bot block may be user-agent based) and upgrade to a full entry.
