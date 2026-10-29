---
slug: mauhan
verdict: bad
verdict_source: maintainer review of AI-era motion sites, Oct 2026 (Reddit thread)
confidence: low
category: portfolio
packs: [modern, artsy]
techniques: [fake-app-ui]
url: https://mauhan.com/
evidence: design review (call frame only; the main video stage not reviewed)
added: 2026-10-29
updated: 2026-10-29
---

# Máuhan — bad

**Thesis in one line:** A personal site dressed as a video call you have just joined, with chat pop-ups from the host.

**Split:** design mixed · build bad · technique bad — clever costume; asks for the camera, crashes browsers, no heading.

**First frame:** a dark video-call screen copied closely from a familiar meeting app: a big empty stage, a "YOU" tile, a control bar (mute, camera, hand, emoji, share, red hang-up), clock and privacy link bottom-left. Two chat toasts from "Máuhan" slide in bottom-left ("yo!", then a newsletter plug).

## Signals

| Signal | Value |
|---|---|
| Font families | 4 — Plaak (mark) · Inter (UI) · two icon fonts |
| Type scale | largest 24 px · body 14 px · 4 sizes |
| Colour mode / shares | mono — dark grey ground 79.9 % · coral-red only on call controls |
| Words (page / heaviest section) | 28 / 28 |
| Text zones, first viewport | desktop 2 · mobile 2 |
| Layout system | one app-shell screen; no page below |
| Signature motion | host video in the stage, chat toasts entering · libraries: none detected |
| Page weight | ≥ 770 KB plus streamed video |
| Mobile | re-composed — phone call layout, controls along the bottom |
| Source of values | observed |

## What works & why

- **A familiar app as the costume** — the call shell is instantly readable, and the chat toasts give the host a voice → borrowed format → rule: if you borrow an app's UI, use it to say who you are within one second.

## What fails & why

- **Asks for your camera** (high) — Reddit readers were prompted for camera access on a portfolio → trust → rule: never request device permissions to show a page.
- **Crashed browsers** (high, per the thread) — heavy live video in a shell with dozens of console errors → media budget → rule: a poster and a play button before any live stream.
- **No heading, no language, no work in the first frame** (medium) — 28 words, the only text is chat banter and a newsletter plug → one h1 naming the person and the offer → rule: the costume can't replace the "who/what".

## Transferable rules

- Do: keep a borrowed-app concept light and put the name and work inside it.
- Don't: ask for camera or microphone, or make the page depend on a live stream.

## Never copy

Logo, the meeting app's interface, footage, copy text. Learn the principle only.

**Open question:** the host's video stage was not reviewed; the verdict leans on the maintainer's mark and the Reddit reports.
