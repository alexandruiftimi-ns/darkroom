# Modes: what kind of page is this?

Every request is two independent choices. Decide both at intake (`commands/start.md`), record them, and say them back to the user in one line ("A Cartier-like look, animated landing: things appear as you scroll, no scroll story").

```
LOOK    a style pack (styles/README.md)          or   a reference look: "like apple.com / Rolex / Cartier" (commands/lookalike.md)
MOTION  calm · animated · hero-effect · story    (below)
```

Record: `darkroom state --set mode=animated,look=like:cartier` (or `look=pack:luxury`). `darkroom state` prints them. Any look combines with any motion level: "like Apple" + `story` is a product scroll story; "like Cartier" + `animated` is a quiet page whose type and images reveal as you scroll.

## Reading the request

| The user says | Mode | Look |
|---|---|---|
| "a site that looks like apple.com / Rolex / Cartier / Stripe" | ask nothing about motion unless the reference implies it; default `animated` | `like:<brand>` |
| "scroll storytelling", "a story as you scroll", "like those Apple product pages", "the product turns as you scroll" | `story` (or `hero-effect` if they describe one moment) | from the brief |
| "nice landing page with animations on scroll", "things fade in", "text and images animate when you scroll" | `animated` | from the brief |
| "simple, fast, clean, no gimmicks", a trust/finance/legal/medical brief | `calm` | from the brief |
| "one wow moment at the top", "the hero should do something" | `hero-effect` | from the brief |
| nothing said about motion | `animated` for most packs; `calm` for trust and editorial; never `story` unless the subject and assets carry it | from the brief |

### Three kinds of moving pages (route by the words the user used)

| The user asks for | What it is | Route |
|---|---|---|
| a **scroll story** ("tell our story as you scroll", chapters, "like Apple's product pages") | `story` mode: chapters, pinned scenes, type, photos, illustration, drawn motion, 3D, filmed or generated moments | built from the chapters' own media (asset plan below). **Never defaults to, and never consists only of, a chained AI film.** One generated clip may be one chapter's moment. |
| **something that moves as I scroll** (no story asked for) | `hero-effect` or `animated` | the effect menu (`references/effects.md`); an AI film / frame sequence may be **suggested** as one option, never the only one |
| **an AI film explicitly** ("like the AI websites", "with Kling / Veo / Seedance", "a scroll film", "chained clips") | the scroll-film route | `references/scroll-film.md`: anchor still, chained clips from extracted frames, seam score, ~4 MB before the first scroll, text checks |

If two readings are plausible, recommend one and name the other in a line ("I'd do an animated page; if you want the product to turn as you scroll, that's a scroll story and needs a video from you").

## The four motion levels

### calm
- Visitor sees: a still, composed page; hover and focus states, a smooth menu, nothing moves by itself.
- You need from the user: nothing extra.
- Build with: CSS transitions only (150–300 ms). No library.
- Checks: the usual audit; focus states in `capture --states`.
- Choose when: trust, legal, medical, finance, long-form reading, or a deadline.

### animated (on-scroll reveals, not a story)
- Visitor sees: headings, text, images and cards appear as they arrive on screen (fade, rise, mask-open, word-by-word for one or two headlines), plus hover/press feedback. Nothing is pinned; scrolling is never captured.
- You need from the user: nothing extra; better photos make it richer.
- Build with: `recipes/reveal.js` + `reveal.css` (no dependencies). Add GSAP/Motion only if the project already uses them (`references/motion-toolkit.md`).
- Rules: one reveal family per page (two at most); reveal **groups**, not every paragraph; headings rise, body fades, images mask; word-split only for display headlines; stagger ≤ 100 ms and ≤ 6 items; nothing above the fold waits. Tune duration and travel to the pack (`reveal.css` header).
- Checks: `capture --film --both` (no blank bands, no late pop-in), audit (it scrolls the page first, so hidden text is measured), reduced motion shows everything at once.

### hero-effect (one moment, the rest animated or calm)
- Visitor sees: one memorable effect at the top or at one key section (a product that turns, a lens dive, a mask zoom, a loop), then a normal page.
- You need from the user: what that one effect needs (`references/effects.md`), usually one clip or one strong image.
- Build with: the matching recipe (`scrub-frames.js`, `scrub-video.js`, `scene-progress.js`, `pointer-tilt.js`) + `reveal.js` for the rest.
- Checks: `capture --scene "#hero" --steps 10 --both`, `media check`, the audit.

### story (scroll storytelling)
- Visitor sees: the page is told in chapters; sections pin while scenes change, text arrives in step with the pictures, a progress indicator shows where they are. Scrolling back replays it backwards.
- You need from the user: the story in a few sentences per chapter, and the media each chapter needs: see the asset plan below. This is the mode that most depends on assets.
- Build with: `scene-progress.js` for pinned CSS scenes, `scrub-frames.js` / `scrub-video.js` for filmed scenes, `reveal.js` between chapters. GSAP ScrollTrigger only when the timeline is complex (many overlapping tweens per scene); Lenis only if tested with keyboard and back/forward (`references/motion-toolkit.md`).
- Rules: 3–6 chapters; one claim per chapter (word budget per scene, not per section); every pinned scene ≤ 300vh; mobile gets shorter scenes or a stacked version; reduced motion = one calm frame per chapter with the same copy; a skip-the-story link.
- Checks: `capture --scene` per chapter, `capture --film --both`, audit, a phone check at 390.

#### Story asset plan (hand this over as `NEEDS.md`, one row per chapter)

| Chapter needs | Best source | Tool class (cost) | Fallback if it never arrives |
|---|---|---|---|
| Looks 3D (camera through a scene, object in space) | route by site type: `references/effects.md`, "A scroll story that looks 3D" | generated stills + first-and-last-frame clips (paid credits) · real 3D from code (free) · layered depth (free/paid) | layered depth from one image per chapter; never call a flat drawing 3D |
| Product turning / opening | a filmed or rendered clip, locked camera, 5–10 s | phone on tripod (free) · 3D render in Blender (free, skill needed) · AI video from a product still (paid credits) | 3–5 stills crossfaded, or a drawn-in-code object |
| Camera moving into a place | a clip of the move | drone or gimbal footage (free if owned) · AI video (paid) | mask zoom between two stills |
| Layers with depth | 2–5 separated picture layers | an image tool with background removal (free/paid) · AI image (paid) | one image with a slow drift |
| Diagram, numbers, process | nothing | drawn in code (free) | — |
| Mood between chapters | one strong still per chapter | own photography · licensed stock · AI image (paid) · openly licensed archive (`darkroom assets`) | type and colour fields |

Name the tool class and cost before any spend; the user chooses the tool. Specific products and their trade-offs: `references/motion-toolkit.md` ("Making the assets").

## One signature per page (every motion level)

Every page names **the ONE thing it will be remembered for**: a media moment, an interaction or a type moment. Everything else stays quiet: **2–4 supporting techniques** (one entrance, one material, one type move, one reveal family). Budget:

- At most **one heavy technique** per page (scrubbed frames or video, a 3D model, a shader, a pinned multi-scene story counts as the page's heavy one). Cost tags: `recipes/README.md`.
- Never more than **three motion hooks in one viewport**; if two compete for the same attention (a spotlight, a magnet and a parallax), cut one.
- `calm` pages have a signature too: a type moment, a crop, a colour field.
- Supporting pieces from the Dark Motions catalogue (`recipes/motions/INDEX.md`) follow the same budget; how to pick them: `references/dark-motions.md`. The audit's `motion-budget` check counts what moves by itself per screen; motion the user explicitly asked for goes inside `[data-motion-allow]`.
- Write it in the bible (§9 *Motion grammar*, "Signature"), in `STORYBOARD.json` (`"signature": true` on exactly one section) and as line 1 of `BUILD_SPEC.md`.

## What changes per mode in the flow

| | calm | animated | hero-effect | story |
|---|---|---|---|---|
| Direction comps show | the still hero | the still hero + one reveal | the hero effect at 3 progress points | chapter 1 + the transition into chapter 2 |
| Slice (checkpoint B) | hero + next section | hero + two revealing sections | the effect working, with fallback | chapters 1–2 working, with mobile + reduced motion |
| Captures | default | `--film --both` | `--scene --both` | `--scene` per chapter + `--film --both` |
| Typical assets | photos | photos | one clip or image set | one item per chapter |

## Honest limits

- A reference look is never a copy: Darkroom takes the language (spacing, type scale, rhythm, restraint), not the identity (`commands/lookalike.md`).
- `story` without the media turns into `animated` with drawn scenes; say so before the user commits.
- Smoothness on real phones is not measured by the tools; test the slice on a phone before calling a story done.
