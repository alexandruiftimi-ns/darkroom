---
slug: todrawn
verdict: good
verdict_source: maintainer review of AI-era motion sites, Oct 2026 (Reddit thread)
confidence: medium
category: saas
packs: [modern, artsy]
techniques: [live-demo-hero]
url: https://todrawn.com/
evidence: design review
added: 2026-10-29
updated: 2026-10-29
---

# todrawn — good

**Thesis in one line:** A hand-drawn video tool whose hero is the tool itself: type a line and watch the pen draw it.
**Split:** design good · build mixed · technique good — the demo sells it; contrast and keyboard access lag behind.

**First frame:** cream paper ground; a heavy black grotesk h1 top-left (x 12–52 %, y 14–30 %) with a red hand-drawn underline under "hand-drawn"; two buttons; below, a full-width two-pane demo (text box left, live drawing with a pen right). The eye goes headline → underline → the pen moving.

## Signals

| Signal | Value |
|---|---|
| Font families | 3 — Archivo (display/text) · Caveat (handwriting samples) · mono (code tab) |
| Type scale | largest 68 px · body 16 px · 15 sizes |
| Colour mode / shares | disciplined — ground 61 % · saturated 1.9 % · one blue for actions, red only for the drawn underline |
| Words (page / heaviest section) | 525 / 129 |
| Text zones, first viewport | desktop 2 · mobile 1 |
| Layout system | left-aligned copy over a wide demo panel; later sections alternate copy and demo cards; pricing, FAQ, closing CTA |
| Signature motion | the product's own pen drawing in the hero demo · libraries: none detected · video 4 · canvas 2 |
| Page weight | ≥ 1.5 MB (lower bound) |
| Mobile | re-composed — headline, buttons, then the demo tabs stacked |
| Source of values | observed |

## What works & why

- **The demo is the hero image** — tabs (Text, Code, Draw, Agent) and a play bar right under the claim → principle: show the product working (product-in-scene) → rule: if the product produces a visual result, let the first frame produce one live.
- **One drawn underline is the only decoration** → principle: the effect demonstrates the product (one bold choice, tells.md "why removal isn't enough") → rule: borrow one mark from the product's output and use it once.
- **Cream ground, one blue for actions** → principle: action colour has one job (colour.md) → rule: keep the accent for clicks; let the demo carry colour.
- **Pricing and FAQ are plain and honest** ("5 exports a day" next to the CTA) → principle: state the limit at the button → rule: put the free-tier limit beside the first CTA.

## What fails & why

_Only issues that cost visitors something._

- **Example captions at ~3:1 contrast** (medium) — the italic red captions under demo videos are hard to read → contrast law → rule: decorative caption colour still needs 4.5:1.
- **72-word hero and 15 type sizes** (medium) → word budget / type scale → rule: cut the hero sub-line to one sentence and collapse sizes to 5–6 steps.

## Transferable rules

- Do: make the hero a working miniature of the product.
- Don't: let demo captions fade into the paper colour.

## Never copy

Logo, demo content, layout and copy text. Learn the principle only.

**Open question:** the Reddit thread praised a 3D marker that drew the page on scroll; the live page today is a cleaner SaaS layout. The earlier analysis was unsure; the owner marked it good on the page as it stands.
