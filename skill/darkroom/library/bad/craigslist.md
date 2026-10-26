---
slug: craigslist
verdict: bad
verdict_source: colorlib
confidence: low
category: e-commerce
packs: [catalog, trust]
url: https://craigslist.org/
evidence: published verdict only; design not reviewed
added: 2026-10-25
updated: 2026-10-25
---
# Craigslist — bad
**Thesis in one line:** A classifieds giant whose homepage, per colorlib, is plain text links with no images, "looking like it was last redesigned in 1999". **First frame:** not reviewed — the page did not open for us. Points below rest on colorlib's description.

| Signal | Value |
|---|---|
| Fonts / scale / colour / words / weight | not reviewed (block page only: Times, 16 px, 12 words); mobile: not reviewed; source: colorlib text; to review again |

## What fails & why
- **Category directory as an undifferentiated wall of text links (colorlib)** → principle: attention.md layer-cake scanning needs visible headings and anchors; reading-paths.md rule 4 → rule: group categories under strong headings and give the top-level groups a visual anchor (icon or photo that shows the category).
- **No imagery anywhere on the entry page (colorlib)** → principle: attention.md cadence (each viewport needs a hook) → rule: one representative image per top-level group helps first-time visitors scan.
- **Dated default styling (colorlib)** → principle: color.md (name roles, not colours); typography.md (chosen faces, scale) → rule: even a utility page defines its ink, link and heading styles on purpose.

## Transferable rules
- Do: keep the speed and the complete directory in one screen.
- Don't: rely on browser defaults for hierarchy.

**Open question:** classic audience-fit case — millions of repeat users know the layout, and its plainness signals "no-frills marketplace". Review the design directly before using it as more than a label.
