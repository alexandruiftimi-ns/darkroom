# Assets: the ladder, the request contract, and the pipeline (stage 3, runs alongside 2 and 4)

Mockups show the goal; they are not runtime assets. Production imagery is what lifts a page from tidy to expensive, so plan it early, ask for the few pieces that matter most, and keep building while they are made.

## 1. The ladder (take the first rung that is honest and good enough)

1. **Supplied** by the user (photography, footage, renders, logo): inspect with `darkroom media inspect <dir>`.
2. **Built in code**: real UI fragments, SVG diagrams, typographic compositions, CSS/SVG textures, drawn objects in one consistent graphic language. Strongest for software, data, process, maps, timetables.
3. **Found, openly licensed, of the subject's world** (its street, materials, trade, archive, a museum object of its kind): `darkroom assets search "<query>"` then `assets get <ref>` (provenance recorded in `ASSETS.json`, credits in `assets/found/CREDITS.md`). Look at each image first. A found picture shows the world around the client; it is never presented as the client's own product, room, dish, people or team. A free licence is not blanket permission: confirm the intended use, the credit and any share-alike duty.
4. **Generated** by the user from your prompts (image model, video model): the highest ceiling and the biggest handoff. Use it for hero plates, product masters, turntables and clips that no other rung can supply. Give the user a folder to save them in (`assets/incoming/<what>/`), then start `darkroom wait --files` on it in the background before your turn ends, so you pick the files up and carry on the moment they land (`commands/wait.md`, SKILL.md law 11).
5. **Type and colour alone**: a legitimate result for some briefs; do it well rather than faking imagery.

State the consequence of the rung you can reach ("without a hero clip the dive becomes a still reveal"), not only the fallback.

## 2. The asset request (one batch, ranked, with acceptance criteria)

Ask for the smallest useful batch (≤ 5 hero-critical items first) as one message with a table. For each item:

| Field | Content |
|---|---|
| `id`, section/state | e.g. `hero-plate`, hero / initial |
| role | clean plate · product master · alpha cut-out · turntable frames · clip · mobile crop |
| blocking? | blocks the slice, or only polish |
| attachments | reference images the model must see (the anchor, the product master) |
| subject lock | what must stay identical (geometry, materials, colours) |
| composition | copy-safe area left calm; focal position; aspect ratio and usable resolution |
| camera / light / grade | from the bible |
| branding | allowed marks stated unambiguously; "no text, logos, UI, captions, watermarks" unless an exception is named |
| duration / views | for clips: seconds, locked camera or described move; for turntables: frame count |
| accept / reject | the checks you will run (silhouette matches, no warped geometry, no baked text, loop seam, edge clean) |
| name / location | `assets/raw/<id>.<ext>` |
| fallback | what ships if it never arrives |

Prompt templates: `prompts/clean-plate.md`, `product-master.md`, `video-clip.md`, `section-frame.md`, `mobile-frame.md`. A negative prompt is a request, not a guarantee; inspect contact sheets and several frames before accepting, and give the user a short rejection reason, not "generate better images".

**Identity.** Prompt wording ("identical geometry") does not hold a product's identity across independent generations. Approve one canonical master, reuse the same cut-out or render in several compositions where you can, and obtain a real model or controlled renders for exact multi-view behaviour. **Test the hardest transition first** (the dive between two scenes, the turntable end-points) before ordering the whole set; if two failed attempts show a technique cannot work, change the technique, not the number of attempts. Spending credits or money needs the user's yes.

## 3. Interim honest fallbacks

Until assets exist: a flat ground plus one approved still; or a crop of a mockup's image area **only where no baked UI remains** (blur or mask lettering), marked `TEMP` in `ASSETS.json` and never shipped. Never fake motion with a still.

## 4. Pipeline (`darkroom media`; originals are never modified)

```bash
darkroom media inspect assets/raw                         # dims, duration, codec, alpha, rotation, audio, decoded MiB/frame
darkroom media derive hero.png --out public/img --widths 640,1280,1920 --formats avif,webp,jpg   # + <picture> snippet
darkroom media frames dive.mp4 --out public/frames/dive --fps 24 --width 1600 --format webp       # sequence + manifest.json + poster
darkroom media frames flight.mp4 --out public/frames/flight --width 1600 --format avif --mobile-width 900   # long product flight: AVIF + a phone set in mobile/
darkroom media check public/frames/dive                    # order, checksums, sizes, memory warning (check mobile/ too)
darkroom media chain ch1.mp4 ch2.mp4 ch3.mp4 --out film.mp4 # chained clips: seam score per join, one joined clip (--width 1920 --fps 24 --crf 20)
```

`media chain` takes the clips in playing order, scores each seam (the last frame of one clip against the first frame of the next) and joins them; a clean seam drops the repeated frame. A seam over the threshold is reported with the fix (remake the clip from the extracted last frame, one model per chain, or crossfade). The route and its rules: `references/scroll-film.md`.

Engines are detected and reported: ffmpeg only if present (with the encoders it really has: the one bundled with Playwright has no WebP encoder), `sharp` if the project has it, then headless Chromium (WebP/JPEG/PNG; no AVIF). `--format avif` needs `sharp` or ffmpeg with an AV1 encoder (libaom-av1 or libsvtav1) and says so if neither exists; `--mobile-width` writes a second set with the same frame count for phones, which `recipes/scrub-frames.js` picks below 1024 px. Strip audio from background video; cap video to ≤ 1080p desktop and 720p phone; every image gets `width`/`height` and a poster colour; hero ≲ 250 KB as a starting budget. Do not turn every video into hundreds of full-resolution frames: start at 48–72 frames and measure (`recipes/README.md`).

Log every generation attempt (prompt, tool, cost, accepted/rejected + reason) in `ASSETS.json` `log`. Update `ASSETS.json` status only to `approved` after you have looked at the file in place on the page.
