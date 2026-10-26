---
slug: goodreads
verdict: bad
verdict_source: colorlib
confidence: low
category: editorial
packs: [editorial-news, catalog]
url: https://www.goodreads.com/
evidence: published verdict only; design not reviewed
added: 2026-10-25
updated: 2026-10-25
---
# Goodreads — bad
**Thesis in one line:** A large book community whose desktop site, per colorlib, has "way-too-basic design and terrible navigation", while its mobile layout is better. **First frame:** not reviewed — the WAF challenge left every view blank. Points below rest on colorlib's description.

| Signal | Value |
|---|---|
| Fonts / scale / colour / words / weight | not reviewed (blank page, 0 words); mobile: per colorlib: noticeably better than desktop; source: colorlib text; to review again |

## What fails & why
- **Desktop navigation hard to use (colorlib)** → principle: reading-paths.md rule 5 (tools in chrome) and rule 3 (zone order = reading order) → rule: the primary tasks (search, my books, browse) sit in one top bar in task order.
- **"Too basic" desktop presentation for its scale (colorlib)** → principle: attention.md cadence (each viewport needs a hook); typography.md scale → rule: a catalog of covers should let the covers lead, with a clear size step between titles and meta.
- **Desktop worse than mobile (colorlib)** → principle: reading-paths.md rule 1 (one copy anchor across layouts) → rule: design both breakpoints from one structure; the wide layout must not be a stretched afterthought.

## Transferable rules
- Do: let product imagery (covers) carry a book catalog.
- Don't: maintain two diverging navigation models for desktop and phone.

**Open question:** evidence is second-hand and the site changes often. Review the design directly before relying on it.
