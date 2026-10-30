# /darkroom capture (shoot) — see the page the way a visitor does

```bash
node <skill>/scripts/darkroom.mjs capture <url | dir | file.html> [--label hero] [--viewports desktop-1440,mobile-390]
     [--scroll 0,0.25,0.5,0.75,1] | [--scene "#story" --steps 10] | [--film] | [--states states.json]
     [--motion | --reduce | --both] [--dpr 2] [--crop "css selector"] [--wait ms] [--dismiss] [--no-early]
node <skill>/scripts/darkroom.mjs compare <reference.png> <capture.png> [--out sheet.png]
```

`shoot` is the old name (reduced motion unless `--motion`, no contact sheet; each run gets its own dated folder in `.darkroom/qa/shots/`, so earlier shots are kept). Use `capture`.

## What it does that a plain screenshot does not

- **Real wheel input.** Scroll positions are reached with mouse-wheel events, so Lenis, ScrollTrigger scrubs and `scroll-behavior: smooth` run their real code. It waits for the scroll to come to rest, and only falls back to an instant jump if the wheel did not reach the target.
- **Both experiences by default.** Default-motion and reduced-motion captures are separate files (`…__motion__…`, `…__reduced__…`). The reduced-motion shot is the *fallback*; judge a scroll story from the motion shots.
- **Scenes.** `--scene "#id" --steps 10` photographs a pinned or scrubbed section at 0, 10 … 100 % of its own progress. This is the check for lens dives, turntables and exploded views.
- **Early frame.** Desktop motion runs with scroll positions start with `early` (`…__motion__early.png`, first tile on the sheet): the first screen ~350 ms after the HTML arrived, before fonts, video and entrances settle. Look for a white or black flash, an empty band where the video will be, a headline still hidden or in a fallback font. `--no-early` skips it.
- **Film.** `--film` takes a frame every third of a screen over the whole page. Look for blank bands, pop-in and hard cuts that a few scroll percentages miss.
- **Named states.** `--states file.json` (an array of `{ "id", "scroll" | "y" | "selector" | "scene", "crop", "actions" }`; actions are `{click}`, `{hover}`, `{focus}`, `{press}`, `{wait}`). Use it for an open menu, a hovered card, a focused field, an error state.
- **Crops.** `--crop ".hero h1"` (or `crop` in a state) saves the element only; add `--dpr 2` to inspect type and edges at 1:1. A full-page image hides 2–4 px faults; the crop does not.
- **Contact sheets** per viewport and mode, so a whole scroll can be read in one look.
- **A manifest** (`manifest.json`): viewports, motion mode, wait times, consent action, console errors, tool versions, and the **build revision** the images depict. `darkroom state` uses it to mark captures stale once the build changes; never cite a stale capture as proof.

Runs go to `.darkroom/qa/<timestamp>-<label>/`. Nothing is overwritten.

## Reading the result

Open the sheet first, then the individual images that matter, then the crops. The audit also photographs the first screen at ~350 ms (`first-paint`): a white or empty early frame on a dark or media-led page is a flash to fix before anything else (ground on `html`/`body`, poster colour on the media box, no entrance that hides the h1). Write each gap as a defect record:

```
State:    hero / mobile-390 / motion
Observed: the visor is cropped through its edge; the heading overlaps the brightest reflection
Impact:   product recognition and text hierarchy both weaken
Change:   use the portrait crop; move copy below the subject; keep the desktop composition
Verify:   phone initial state, nearby widths, long heading, image-load failure
```

Fix the top two to four connected defects in one pass, recapture, compare. Stop when the acceptance points are met or two passes in a row show no material improvement; then show the best result and the remaining trade-off.

## Comparing with a reference

`compare` stacks the reference above the capture at the capture's width. Compare **composition** (focal point, scale, crop, copy anchor, line breaks, negative space, hue), not pixels: concept art is not a pixel target.

## Requirements

Playwright from the project, or a global install (`DARKROOM_RESOLVE_FROM=<dir>` adds another place to look). If neither exists, ask the user before running `npm i -D playwright`. Do not install silently.
