---
slug: hex
verdict: bad
verdict_source: maintainer review of AI-era motion sites, Oct 2026 (Reddit thread)
confidence: high
category: agency
packs: [modern, bold]
techniques: [video-wall]
url: https://www.hex.inc/
evidence: design review
added: 2026-10-29
updated: 2026-10-29
---

# HEX — bad

**Thesis in one line:** A creative studio with a strong pixel wordmark that buries itself under a wall of case-study videos all playing at once.

**Split:** design mixed · build bad · technique bad — good identity; two dozen heavy videos crash phones.

**First frame:** dark green-black; a fixed left rail with a second nav, an empty grey card, a short bio and the mint pixel "HEX" wordmark; the right column starts with cropped mint shapes, a two-line claim at about 40 px and a large dark product video. A top nav repeats the left nav. The eye jumps between rail, claim and video.

## Signals

| Signal | Value |
|---|---|
| Font families | 1 — Lausanne (everything) |
| Type scale | largest 40 px · body 16 px · 6 sizes |
| Colour mode / shares | disciplined — ground 91.2 % · accent 3.9 % · mint on green-black; media carries the rest |
| Words (page / heaviest section) | 566 / 465 |
| Text zones, first viewport | desktop 5 · mobile 2 |
| Layout system | fixed left rail + scrolling right column of case cards |
| Signature motion | 24 autoplay case-study videos · libraries: none detected |
| Page weight | ≥ 834 KB measured (videos stream on top; several are 2160p) |
| Mobile | re-composed — single column of bright case cards; rail drops away |
| Source of values | observed |

## What works & why

- **Pixel wordmark in one mint on green-black** — an ownable mark repeated as cropped shapes at the top → one colour, one mark → rule: let the mark's geometry supply the decoration.

## What fails & why

- **Two dozen autoplaying videos, some 2160p** (critical) — Reddit readers reported iOS Safari crashing; most clips also fail to start on phones → media budget (hero-media) → rule: one playing video per viewport, posters for the rest, phone-sized encodes, muted + playsinline.
- **Five text zones and two navs in the first view** (medium) — left rail nav, top nav, bio, claim and an empty grey card all compete → reading-zones ≤ 3 → rule: one nav, one claim, one image in the first frame.
- **Empty placeholder card in the rail** (medium) — a blank grey box labelled "Get in touch" reads as broken → text that needs media to load → rule: media boxes get a designed poster.
- **Work list is 465 words of titles in one block** (medium) → word budget → rule: show fewer cases, larger.

## Transferable rules

- Do: keep the wordmark-led identity and show work as stills that play on hover or in view, one at a time.
- Don't: autoplay a grid of large videos; it is the fastest way to crash a phone.

## Never copy

Logo, case-study footage, exact layout, copy text. Learn the principle only.
