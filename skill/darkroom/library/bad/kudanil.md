---
slug: kudanil
verdict: bad
verdict_source: maintainer review of AI-era motion sites, Oct 2026 (Reddit thread)
confidence: medium
category: hospitality
packs: [luxury, cinematic]
techniques: [scroll-jacking]
url: https://www.kudanil.com/
evidence: design review
added: 2026-10-29
updated: 2026-10-29
---

# Kudanil Explorer — bad

**Thesis in one line:** A luxury yacht expedition that opens on an empty navy sky with a small wordmark and makes you scroll sideways to find the boat.

**Split:** design mixed · build bad · technique bad — empty first frame, scroll taken over, placeholder copy shipped.

**First frame:** a dark navy gradient filling the whole screen; a small two-line wordmark at 50 % x, 50 % y; a pale haze rising from the bottom-left corner. No headline, no boat, no action: the eye has nothing to land on.

## Signals

| Signal | Value |
|---|---|
| Font families | 3 — Forma DJR Display (display) · Deck · Micro (text, most used) |
| Type scale | largest 90 px · 8 sizes |
| Colour mode / shares | mono — navy ground ~100 % in the first frame · no accent |
| Words (page / heaviest section) | 1,197 / 862 |
| Text zones, first viewport | desktop 1 · mobile 1 (the wordmark only) |
| Layout system | full-screen chapters; vertical scroll drives horizontal travel |
| Signature motion | intro sky, then scroll-driven sideways panels and fades · libraries: gsap, scrollTrigger, lenis |
| Page weight | ≥ 969 KB (lower bound) |
| Mobile | squeezed — the same wordmark-only intro |
| Source of values | observed |

## What works & why

- **One type family in three optical cuts** → typography.md three-family budget → rule: a single family with display, deck and micro cuts gives a luxury voice without pairing risk.

## What fails & why

- **The first frame sells nothing** (high) → tells.md "loader or gate instead of a first frame"; the h1 stays hidden past 1.5 s → rule: the boat and one claim are in the first paint; the sky intro may play over them, never instead.
- **Vertical scroll drives sideways travel, with fades on everything** (high) → scroll-jacking (INDEX, avoid) → rule: keep native scroll direction; a horizontal strip is a contained rail, not the whole page.
- **Placeholder copy left live and one 862-word section** (medium) → tells.md leftover placeholders → rule: read the live page end to end before launch; one idea per screen.

## Transferable rules

- Do: put the product (here, the yacht) in the first frame.
- Don't: hijack scroll direction or fade every block.

## Never copy

Logo, photography, exact layout, copy text. Learn the principle only.

**Open question:** only the intro could be judged by eye; later chapters are known from the measured page and the thread.
