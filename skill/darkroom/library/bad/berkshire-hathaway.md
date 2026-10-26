---
slug: berkshire-hathaway
verdict: bad
verdict_source: colorlib
confidence: medium
category: corporate
packs: [trust, editorial-news]
url: https://www.berkshirehathaway.com/
evidence: design review
added: 2026-10-25
updated: 2026-10-25
---

# Berkshire Hathaway — bad

**Thesis in one line:** A list of 17 investor links under an address block that never says what the company is. Colorlib: "a directory with a poor look".

**First frame:** small-caps navy wordmark top-centre (~50 %, 3 %), address and "Official Home Page" under it; the eye then drops to two columns of underlined serif links (8–90 %, 15–60 %), then a GEICO ad strip in the middle of the footer. The whole page fits in one viewport.

## Signals

| Signal | Value |
|---|---|
| Font families | 1 (browser-default Times serif) + GEICO wordmark as an image |
| Type scale | ~28 px wordmark · 16 px links · ~10 px dates and ad copy · ~5 sizes |
| Colour mode / shares | monochrome by default — white ground ~95 %; navy text, browser blue/purple links, grey rules |
| Words (page / heaviest section) | ~230 / ~120 (link list) |
| Text zones, first viewport | desktop 4 (header, link list, ad, footer note) · mobile 2 |
| Layout system | centred header, two-column bulleted link table, full-width hr rules; no grid |
| Signature motion | none · libraries: none detected |
| Page weight | not measured (text only, est. < 30 KB) |
| Mobile | squeezed — keeps two columns at 390 px; one link wraps to 7 lines |
| Source of values | estimated from images |

## What works & why

- **Whole page in one viewport, with "Updated" dates under key links** — a shareholder sees immediately whether the annual report or letter is new → principle: attention.md Do surfaces; content-first utility → rule: when the audience comes for documents, show the documents and their freshness dates first.

## What fails & why

- **Header is an address, not a statement** — wordmark + street + "Official Home Page"; nothing says what Berkshire is or whom this page serves → principle: attention.md headline budget (≤ 8 words stating the offer) → rule: one h1 sentence that names the company's role and the page's audience.
- **17 links of equal weight in two columns** — investor letters, SEC filings, a fraud warning and sustainability sit side by side with no grouping; the reader must read every line → principle: reading-paths.md rule 4 (related items in one column); attention.md layer-cake scanning needs headings → rule: group links under 3–4 audience headings (Shareholders, Filings, Companies, Notices).
- **Three alignments in one page** — centred header and ad, indented two-column list, left-flush footer text → principle: reading-paths.md rule 1 (one copy anchor) → rule: pick one anchor and keep header, lists and footer on it.
- **GEICO ad in all-caps ~9 px type between content and footer** — a subsidiary promotion interrupts the path and is near-illegible → principle: typography.md (body 16–20 px; caps only for ≤ 4-word labels); reading-paths.md rule 6 → rule: a promotion is a labelled card on the path or nothing; never sub-12 px caps.
- **Browser-default link colours as the palette** — navy, blue and visited purple mix; no role-based tokens → principle: color.md "name roles, not colours" → rule: define ink, link and visited roles deliberately, even for a plain page.
- **Mobile keeps the desktop table** — two 150 px columns, long titles break into 6–7 lines → principle: reading-paths.md rule 8; WCAG 1.4.10 reflow → rule: link lists become one column under 600 px.

## Transferable rules

- Do: keep the document-first, fast, one-viewport utility — investors value it.
- Do: add one sentence of identity and group links by audience under headings.
- Don't: let browser defaults choose type, colour and alignment.
- **The one change that would fix most of it:** an h1 line plus four headed link groups in one left-anchored column.

## Never copy

Logo, photography, exact layout, copy text. Learn the principle only.

**Open question:** the plainness is a known deliberate choice (signals frugality to a loyal investor audience); it fails as a design but may succeed for its audience. Recorded bad per the colorlib rule.
