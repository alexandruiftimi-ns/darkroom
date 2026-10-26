# Recipes: tested scroll and motion building blocks

Small, framework-free ES modules. Copy the one you need into the project (they have no dependencies), adapt the markup, and verify with `capture --scene`. Each has a demo page in this folder that was captured and checked at 0 / 25 / 50 / 75 / 100 % of its scene.

| Need | Recipe | Use when | Not when |
|---|---|---|---|
| Any scroll-linked effect driven from CSS (portal mask, scale, opacity, clip-path, gradient stop) | `scene-progress.js` → `--p` on the scene | the effect can be expressed as a transform/opacity/clip-path | you need photoreal frames |
| Fixed-path photoreal motion (turntable, product reveal, dive) as images | `scrub-frames.js` + `darkroom media frames` | the clip has a locked camera, 48–120 frames carry it, and you want exact, reversible control | a 12-second film (use video) |
| The same clip as a seekable video | `scrub-video.js` (all-intra or GOP ≤ 4 encode) | smaller download than frames matters | the file cannot be all-intra encoded; seeking stutters |
| Slight pointer response on a product still or layers | `pointer-tilt.js` | one approved image, bounded ±3° / ±5° | you promised a 360° viewer (that needs views or a model) |

Demos: `demo-scrub-frames.html` (+ `demo-frames/`), `demo-scrub-video.html` (+ `demo-clip.mp4`), `demo-portal.html`. Verify any page the same way:

```bash
node <skill>/scripts/darkroom.mjs capture recipes/demo-portal.html --scene "#portal" --steps 4 --viewports desktop-1440 --both
```

## Rules every scroll scene follows

1. **HTML first.** The h1, copy, CTA and a poster `<img>` exist in the markup and work with no script. The canvas or video is an enhancement drawn over the poster.
2. **Native scroll only.** Progress is read from the scene's bounding box; nothing captures the wheel or locks the page.
3. **Linear mapping, eased reading.** Scroll is the easing. The recipes smooth the *reading* slightly (`ease`), never the mapping, and settle exactly on the target.
4. **Reversible, interruptible.** Scrolling up replays backwards; fast wheel, resize, hidden tab and route changes are handled (paused off-screen and in hidden tabs, stale loads aborted).
5. **Reduced motion = one calm composition.** Same content and CTAs, no scrubbing. Frame scenes show a single frame; CSS scenes show the finished or start state.
6. **Never blank.** If the wanted frame is not decoded, the nearest decoded frame stays.
7. **Budget first.** Start with 48–72 frames at 1280–1600 px wide; measure. See the memory table below.

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
