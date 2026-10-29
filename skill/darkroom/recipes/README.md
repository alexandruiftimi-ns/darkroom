# Recipes: tested motion, media and interface building blocks

Small, framework-free ES modules and CSS files. Copy the ones you need into the project (they have no dependencies), adapt the markup, and verify with `capture` (`--scene` for scroll scenes). Each has a demo page in this folder that the suite opens and checks: normal, reduced motion and, where it matters, without JavaScript and on a phone. Build hard parts from these instead of from scratch; the build spec's motion table names the recipe for each moment (`templates/BUILD_SPEC.md`).

| Need | Recipe | Use when | Not when | Cost |
|---|---|---|---|---|
| Any scroll-linked effect driven from CSS (portal mask, scale, opacity, clip-path, gradient stop) | `scene-progress.js` → `--p` on the scene | the effect can be expressed as a transform/opacity/clip-path | you need photoreal frames | light |
| Fixed-path photoreal motion (turntable, product reveal, dive) as images | `scrub-frames.js` + `darkroom media frames` | the clip has a locked camera, 48–120 frames carry it, and you want exact, reversible control | a 12-second film (use video) | heavy |
| The same clip as a seekable video | `scrub-video.js` (all-intra or GOP ≤ 4 encode) | smaller download than frames matters | the file cannot be all-intra encoded; seeking stutters | heavy |
| Slight pointer response on a product still or layers | `pointer-tilt.js` | one approved image, bounded ±3° / ±5° | you promised a 360° viewer (that needs views or a model) | light |
| A character or object that comes alive per section: enter clip, idle loop with pauses, enter played backwards on leave | `sprite-clips.js` + `darkroom media frames` (one set holds every clip; clips are frame ranges) | mascots, products that "say hello", Ribbit-style studio pages | the frame must follow scroll position exactly (that is `scrub-frames.js`) | medium |
| A second image or colour showing through a soft circle that follows the pointer | `cursor-reveal.js` (`[data-reveal-top]` layer, `clip-path` only) | portfolios and galleries where browsing the work should feel tactile | the top layer carries text the page needs | light |
| Headings, text, images, cards appearing as they scroll in (mode `animated`) | `reveal.js` + `reveal.css` (`data-reveal="up\|fade\|scale\|mask\|words"`, `data-reveal-stagger`, `data-reveal-delay`) | an ordinary landing page should feel alive | the content must be pinned or scrubbed (that is a scene) | light |
| A background video that never flashes white, fades in on its first frame, pauses off screen and in hidden tabs, picks a phone file, plays HLS | `video-layer.js` + `video-layer.css` (`data-video-layer`, `.vl-media`, `--vl-ground` = the clip's edge colour, `--vl-focus`) | any hero or section over a video | the video must follow scroll (that is `scrub-video.js`) | medium |
| A loop whose last frame doesn't match its first; several clips in turn | `video-loop.js` (`data-video-loop`, `data-loop-fade`, `data-playlist`); or a pre-rendered ping-pong: `darkroom media boomerang` (no script) | the seam shows on every loop | the clip already loops cleanly (keep plain `loop`) | light |
| Text over video or photographs that stays readable | `scrim.css` (`.scrim--bottom\|top\|left\|right\|pool\|blur`, `.ts-body`, `.ts-display`, `.ts-label`, `.ts-halo`) | the media has no calm empty zone, or the hero melts into the next section | the media already gives the words a quiet zone (no scrim then) | light (`--blur`: medium) |
| A first-screen entrance (nav from above, then eyebrow, H1, sub, CTA, strip) that cannot leave a blank page | `entrance.css` + optional `entrance.js` (`data-enter`, `data-enter="down\|fade"`, `--i`) | the hero should arrive, not just appear | below the fold (that is `reveal.js`) | light |
| A headline that rises line by line, word by word, letter by letter or blurs in | `split-text.js` + `split-text.css` (`data-split="lines\|words\|chars\|blur"`); needs the one-line `html.js` script in `<head>` | the signature is the headline itself | body copy; more than one split headline per screen | light |
| A floating pill or plain bar, and a phone menu that locks scroll, closes on Esc, link and resize, and keeps focus inside | `nav.js` + `nav.css` (`data-nav`, `data-nav-panel`, `data-nav-toggle`, `data-nav-style="overlay\|drawer\|sheet"`, `data-nav-hide-on-scroll`) | every site with more than three links | a one-link page (a mark and one CTA need no menu) | light |
| Buttons with weight: text roll with an arrow chip, sliding fill, 0.97 press, hover only on hover devices | `buttons.css` (`.btn--roll`, `.btn--fill`, `.btn--ghost`) | primary and secondary CTAs | the pack says flat, quiet buttons (trust, medical) | light |
| Film grain that stops banding on gradients and video | `grain.css` (`.grain` on body, `.grain-local` on a section, `.grain--alive`) | dark gradients, video heroes, cinematic packs | light, clean product pages (it reads as dirt) | light |
| A logo strip or word band that runs forever, with a pause button | `marquee.js` + `marquee.css` (`data-marquee`, `data-marquee-speed`, `data-marquee-direction="right"`) | 6+ client logos, a word band between sections | fewer than 5 items (show them still) | light |
| Numbers that count up when they appear | `count-up.js` (`data-count-up`; the final value stays in the HTML) | 2–4 headline stats | prices, legal figures, anything a visitor must read exactly while it moves | light |
| A manifesto paragraph whose words light up as you scroll | `scroll-words.js` (`data-scroll-words`, `-dim`, `-start`, `-end`) | one About or manifesto paragraph of 25–60 words | more than one per page; long text | light |
| Cards that pin and stack, the ones behind shrinking slightly | `stack-cards.css` + `stack-cards.js` (`data-stack-cards`, `.stack-card`) | 4–6 process steps or case studies | cards taller than 80vh; more than 6 | medium |
| A word typed, held, deleted and replaced, with no layout jump | `typewriter.js` + `type-motion.css` (`data-typewriter="a\|b\|c"`, `data-tw-speed`, `data-tw-hold`) | one phrase at the end of a headline | mid-sentence (the reserved space shows as a gap); body copy | light |
| One word in a sentence that changes in place | `rotating-word.js` + `type-motion.css` (`data-rotate="a\|b\|c"`, `data-rotate-every`) | 3–5 alternatives the sentence reads well with | the main claim's only noun | light |
| Text that decodes from random glyphs | `scramble.js` + `type-motion.css` (`data-scramble`, `data-scramble="hover"`) | tech and editorial-tech packs: labels, a status line | warm, craft, trust or medical pages | light |
| A wordmark at full width, or a ghost word behind a cut-out | `giant-type.css` + `giant-type.js` (`data-giant`, `.giant--ghost`) | the wordmark bookend that closes a brand-led page | long words on phones (they become tiny: switch to a stacked lockup) | light |
| A desktop card grid that becomes a swipe rail on phones | `snap-rail.css` | pricing, features, products: 3–6 cards | more than 8 cards (use a list) | light |
| A product window built from real text | `ui-mockup.css` (`.ui-window`, `.ui-bar`, `.ui-body`) | SaaS heroes; the product's real labels and numbers | a screenshot of a real app is available and must match exactly | light |
| A button that leans toward the pointer | `magnetic.js` (`data-magnetic`, `-strength`, `-radius`) | one or two hero CTAs or round buttons | menus, forms, every link | light |
| Layers that move at different speeds with the pointer or scroll | `parallax-layers.js` (`data-parallax="pointer\|scroll\|both"`, `data-depth`) | illustrated or cut-out scenes with overlap margins | text layers; trust pages | light |
| A soft spotlight that shows a second, aligned picture | `spotlight-mask.js` (`data-spotlight`, `data-spot-top`) | night/day, x-ray, sketch/finished | pictures that are not pixel-aligned | light |
| 3–6 products in depth, stage colour following the active one | `depth-carousel.js` + `depth-carousel.css` (`data-depth-carousel`, `data-colour`) | a small range: bikes, kettles, chairs | more than 6 items; anything people must compare side by side | medium |
| Frosted glass panels with an edge highlight | `liquid-glass.css` (`.glass`, `.glass--refract`) | the glass-cinema pack, one or two panels per screen | everywhere (glass on everything is a tell) | medium |
| Turning a product by moving the mouse over a turntable clip | `cursor-scrub-video.js` (`data-cursor-scrub`) | desktop, a clean all-intra 2–4 s turntable | phones (it shows the poster), long clips | medium |
| Background clips the visitor switches (dawn / noon / night) | `scene-switcher.js` + `scene-switcher.css` (`data-scene-switcher`, `.ss-scene[data-tone]`) | hospitality, travel: one place in several moods | more than 4 scenes | medium |
| A living colour field drawn by a shader | `shader-backdrop.js` (`data-shader="flow\|aurora"`, `data-shader-colours`) | artsy, experimental packs; one per page | when a still or `media make` video does the job | heavy |
| A real 3D product the visitor can drag | `model-hero.js` (`data-model-hero`, the project's own three.js) | free rotation is the point and a good GLB exists | a clip or frames would show it as well (they are lighter) | heavy |

**Cost** = runtime weight and risk: *light* (CSS or a small script, safe anywhere), *medium* (decoded media or a rAF loop), *heavy* (many frames, seeked video, 3D: at most one per page, `references/modes.md`).

Demos: `demo-scrub-frames.html` (+ `demo-frames/`), `demo-scrub-video.html` (+ `demo-clip.mp4`), `demo-portal.html`, `demo-sprite-clips.html` (tested: off until the section reaches the middle band, enter → idle → enter backwards on leave, reduced motion shows one still), `demo-cursor-reveal.html` (tested: follows the pointer, closes on leave, tap on touch, reduced motion toggles on click without following), `demo-reveal.html` (tested: below-the-fold items wait for scroll; reduced motion and no-JS show everything at once; word splitting keeps the heading text intact), `demo-hero.html` (video layer + loop, scrim, entrance, split headline, nav and phone menu, buttons, grain; tested: ground colour before the first frame, plays on screen and pauses off it, loop dips and restarts, entrance released, menu opens, locks, closes on Esc, link and resize, reduced motion and no-JS show everything), `demo-sections.html` (marquee, count-up, scroll words, stacking cards; tested: duplicate hidden from screen readers, pause button, exact final numbers, text unchanged, reduced motion static), `demo-type.html` (typewriter, rotating word, scramble, giant type, snap rail, UI window; tested: zero layout shift, exact final text, edge-to-edge fit and refit, rail on phones without sideways scroll), `demo-interact.html` (magnetic, parallax layers, spotlight, depth carousel, glass; tested: pointer, touch, keyboard, the 700 ms lock, reduced motion), `demo-media.html` (pointer-scrubbed clip, scene switcher, shader backdrop, 3D model fallback; tested: seeking without playing, crossfade and text tone, rendering only on screen, poster kept when three.js or the model is missing. **Live 3D rendering of `model-hero.js` is not checked by the suite.**). Verify any page the same way:

```bash
node <skill>/scripts/darkroom.mjs capture recipes/demo-portal.html --scene "#portal" --steps 4 --viewports desktop-1440 --both
```

## Rules every recipe follows

All recipes: the page is complete with no script (content in the HTML, hidden states only after the script runs or behind a CSS fail-safe); reduced motion shows one calm, finished composition; only `opacity`, `transform`, `filter` and `clip-path` animate; nothing plays off screen or in a hidden tab; ARIA stays truthful (split or duplicated text is `aria-hidden` and the original is the label). Values (durations, staggers, easing) follow `references/motion-craft.md` "Values"; a style pack's own values win.

## Rules every scroll scene follows

1. **HTML first.** The h1, copy, CTA and a poster `<img>` exist in the markup and work with no script. The canvas or video is an enhancement drawn over the poster.
2. **Native scroll only.** Progress is read from the scene's bounding box; nothing captures the wheel or locks the page. **No snapping or gliding the page to a stop either** (a `scrollTo` loop after the scroll rests, `scroll-snap` on a scrub scene): on phones it fights touch momentum and on desktop it reads as a glitch. A client who wants "breaking points" gets *hold plateaus*: the film rests on chosen frames for a stretch of scroll while the page keeps scrolling freely (`mapFrame: holdAt([frames], 0.04)` in `scrub-frames.js`). The audit flags a page that moves its own scroll after the user stops (`scroll-glide`).
2b. **Measure against the sticky stage, not the window.** Progress = `-scene.top / (scene.height - stage.height)`. On phones `innerHeight` changes whenever the address bar shows or hides (every change of scroll direction), so a window-based range moves the frame by itself.
3. **Linear mapping, eased reading.** Scroll is the easing. The recipes smooth the *reading* slightly (`ease`), never the mapping, and settle exactly on the target.
4. **Reversible, interruptible.** Scrolling up replays backwards; fast wheel, resize, hidden tab and route changes are handled (paused off-screen and in hidden tabs, stale loads aborted).
5. **Reduced motion = one calm composition.** Same content and CTAs, no scrubbing. Frame scenes show a single frame; CSS scenes show the finished or start state.
6. **Never blank, never backwards.** If the wanted frame is not decoded, show the closest decoded frame *between the one on screen and the wanted one* (hold, or move on). Never fall back to "the nearest decoded frame anywhere": on a fling or when scrolling back up that is a far-away anchor or a frame from the other side, and the film flashes back and forth. The audit measures it with a fast fling down and back up on a phone with a slowed CPU (`scrub-fling`).
6a. **Fast scrolls play through, they don't skip.** Keep every frame's compressed bytes in memory once fetched (decoding must never wait on the network), decode ahead in the direction of travel (twice as far ahead as behind), and cap how fast the shown frame moves (`maxSpeed`, about 4 frames per 60 Hz frame). Releasing bitmaps is fine; re-fetching on the way back is not. A scrubber you write by hand (several layers, a cut-out handoff, a second canvas) follows the same three rules.
6b. **One frame at a time, at full opacity.** Never draw a frame see-through over another: no blending neighbours for "in-between" frames (13.5 = 13 + 14 at 50 %), no fading a hand-finished still over the film, no `globalAlpha` below 1 on frame draws. It ghosts: the frame underneath shows through. Motion looks steppy? Extract more frames (`media frames --fps 30`, or a longer scene), never blend. A still that replaces the film is a hard cut at its position. The audit fails it (`frame-blend`); a dissolve the user explicitly asked for goes inside `data-frame-blend="allow"`.
7. **Budget first.** Start with 48–72 frames at 1280–1600 px wide; measure. See the memory table below. Long product flights (hundreds of frames) need a phone set (`media frames --mobile-width 900`, picked below 1024 px by `scrub-frames.js`) and coarse-to-fine anchors (the recipe keeps 9 spread frames decoded once the window has room). Phone memory: a decoded frame costs width × height × 4 bytes (1080 × 1080 = 4.7 MB), so the decode window, not the frame count, sets the memory; never keep every frame of a large set decoded. AVIF (`--format avif`) or WebP: compare both on the real clip; on Darkroom's synthetic test clip AVIF q40 and WebP q76 came out the same size.

## Frames vs video: decide with a prototype, not a rule

| | Image sequence on canvas | Seeked video |
|---|---|---|
| Download | many requests, larger total at equal quality | one file, much smaller |
| Seek smoothness | exact: draws the chosen frame | depends on encode (all-intra or short GOP) and device |
| Memory | `w × h × 4` bytes per **decoded** frame: 1080p ≈ 7.9 MiB, so 60 held ≈ 475 MiB. The recipe keeps ±12 only | the decoder manages it; large all-intra files cost more bandwidth |
| Reverse | exact | exact if all-intra, otherwise stutters |
| Alpha | yes (WebP) | rarely (needs special encodes) |
| Mobile | cap width, fewer frames | cap resolution |

`darkroom media frames` reports decoded MiB per frame and for the whole set; `darkroom media check` warns when holding everything would exceed ~300 MiB. **Not yet measured here:** scrub smoothness and memory on real phones. Test the actual clip on a mid-range device before shipping either.

## Producing the media

```bash
node <skill>/scripts/darkroom.mjs media inspect clip.mp4            # codec, fps, rotation, alpha, audio, decoded memory
node <skill>/scripts/darkroom.mjs media frames clip.mp4 --out public/frames --fps 24 --width 1600 --format webp
node <skill>/scripts/darkroom.mjs media check public/frames          # manifest, order, checksums, sizes, memory warning
node <skill>/scripts/darkroom.mjs media derive hero.png --out public/img --widths 640,1280,1920 --formats avif,webp,jpg
```

`media` uses ffmpeg if it exists **and reports which encoders it really has** (the one bundled with Playwright has no WebP encoder), then `sharp` if the project has it, then headless Chromium (WebP/JPEG/PNG only). Originals are never modified; every output is listed with bytes and checksums in a manifest.
