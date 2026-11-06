# Frames for a scroll: reference, start, middle and end frames

Use this whenever generated frames or clips play with the scroll: a hero effect, one moment in a story, or a chained film (`references/scroll-film.md` adds the chain rules). Craft rules: `references/asset-craft.md`. Tool forms: `prompts/per-tool.md`.

**Work one step at a time.** Each frame depends on the one before, so never hand over twelve prompts at once. Show the whole plan once, give the prompts for the current step, wait for the files (`commands/wait.md`), check them, then give the next step.

```
reference frame → key frames → cheap test → clips → check → finish → frames on the page
   the look        the states    hardest one   one per pair
```

## Words to use with the user

- **Reference frame:** the one approved picture that fixes the look.
- **Start and end frame:** where one clip begins and lands.
- **Middle frame:** an extra state between them, when the jump is too big for one clip.
- **Key frames:** all of those together, in playing order.

## 1. Plan the shot

Decide, then write it in `.darkroom/SHOTS.md` (`templates/SHOTS.md`):

- **The one change the visitor controls:** a cloth lifting, a product turning into view, the camera moving forward, day turning to night.
- **Does it read backwards?** A scrubbed clip plays both ways. Say no to smoke rising, pours and anything gravity gives away.
- **Risk** by the worst item (`references/asset-craft.md`). Warn before any prompt.
- **Beats:** 3 to 5 s each. Never ask one clip for a whole story.
- **What it costs:** stills are cheap, video is not. Say "about N clips, 1 to 3 tries each" before the first prompt.
- **The tool**, from what the user has (`references/asset-tools.md`), and what ships if it never arrives.

Run `darkroom shots lint` on the file before anything reaches the user. Fix every high.

## 2. The reference frame

Text to image, in the image tool. Give **safe and ambitious** versions, and ask for 2 to 4 takes of each. The user picks.

- From a real product? Start from their photo: make a product master first (`prompts/product-master.md`), write the lock list, place it with an edit.
- No grain, because this still feeds video.
- Under 1920 px wide? Upscale with a free tool and compare for invented texture before going on. A paid upscaler needs a yes.
- Ask: "Which one is it?" **What they pick is the spec.** Anything that differs from the plan is a note, not an edit.
- Check: one idea, calm zone, light with a source, nothing text-like, big enough. Save it as `assets/incoming/<shot>/reference.png`: it is attached to everything that follows.

## 3. The key frames

**Every key frame is an edit of its neighbour, never a fresh generation.** Separate generations drift in framing, grade and detail, and the model morphs through every difference.

| The shot | Make first | Then |
|---|---|---|
| Same camera, something changes (light, weather, a cloth, a stage of building) | the richest state, which is usually the reference | work outwards one state at a time, each edited from the state next to it, **not** from the reference |
| Camera moves through a place | the first view | each next frame is an edit of the last, with the camera moved a small step |
| An object turns | the view the page rests on | the next view, at most about 45° further; give hidden sides as a frame |

A stage three steps from the reference drifts when edited directly from it: the roofline moves, the columns stop matching. Edited from the stage beside it, it lines up.

Rules for each edit: one change · keep "same camera, lens, framing, light and grade" in the prompt · a fresh chat every 5 images, re-attaching the reference · no text anywhere.

### How many frames

Run `darkroom media keys <frames in order>` on the finished set **before any video is paid for**. It scores each neighbouring pair: how much changes, whether the grade moved, whether the framing moved.

| Result | Do |
|---|---|
| Small change, same framing | one clip between them |
| "Big gap" | add a middle frame between that pair, unless the big change is the point (a day-to-night change scores high and is fine) |
| "Grade moved" and the light should not change | edit that frame again from its neighbour, with the grade line |
| "Framing moved" on a locked shot | edit again: "same framing as the attached image" |

Smaller differences give cleaner clips. Timing goes in frames, not words: models ignore "in the final second". Put the pose in a frame.

### What the tool does with them

| Tool can do | Use the frames like this |
|---|---|
| Many keyframes in one clip (Kling 4.0 full model) | start, middle frames, end, all in one clip. Check the tool's limits: other features may switch off with it |
| Start and end frame | one clip per neighbouring pair, then chain them (step 5) |
| Start frame only | one clip from each frame, ending by the prompt alone; the landing will not be exact, so choose a shot where that is fine |
| Reference images | the references hold the look; the frame holds the composition |

## 4. One cheap test

Generate **the hardest clip once** at the tool's cheapest setting. Check it with `darkroom media clipcheck`. A test proves the prompt, not the take: the same prompt at full quality will move differently. Then order the rest.

## 5. The clips

- Ask for several outputs where the tool allows it.
- Sound off where it is a switch. **Length: 4 s unless the shot needs more.** Static setting for locked shots.
- **Chaining pairs:** clip 2 starts from the **last frame extracted from clip 1's file** (`darkroom media lastframe`), not the original still, and ends on key frame C. Never clean that frame in an image tool: the seam pops. A light upscale at most.
- One model for a whole chain: switching models mid-chain shows at the seam.
- Save as `assets/incoming/<shot>/clip-01.mp4`, `clip-02.mp4`.

## 6. Check each clip

`darkroom media clipcheck <clip> --calm <left|right|top|bottom>` reports frozen frames, jumps, uneven speed, flicker, camera shift and whether the calm side stayed calm, and pulls frames at 0, 25, 50, 75 and 100 % plus every jump. Open them and judge what numbers cannot see (`references/asset-craft.md`, "Reviewing what comes back"). Tell the user one line per clip, with a verdict. Two failures: change the approach, not the adjectives.

## 7. Finish

```bash
darkroom media finish clip-01.mp4 --even --out clip-01-even.mp4            # no sound, constant speed, from the clip's real frames
darkroom media chain clip-01-even.mp4 clip-02-even.mp4 --out film.mp4      # scores every seam, then joins
darkroom media frames film.mp4 --out public/frames/hero # desktop frames at the clip's own size, plus phone and tablet sets
darkroom media check public/frames/hero
```

Models ease in and out whatever you prompt, so a scrubbed clip stalls at both ends without `--even`: real clips were measured ending at 5 to 30 % of their mid-clip speed. `--trim-start` and `--trim-end` drop bad first or last frames.

**More frames are optional.** `--fps 48` adds in-between frames with ffmpeg's interpolation. Use it only for slow, soft motion (light, mist, a slow camera) that looks stepped. **On a fast subject it ghosts:** a test on a hovering bird doubled the wings. Always look at the result. It takes a few minutes at 1080p: run it in the background. A free tool such as RIFE or FILM does better if already installed. A seam over the threshold: remake the clip from the extracted frame, or crossfade 6 to 8 frames across it.

Build with `recipes/scrub-frames.js`. Start at 48 to 72 frames per screen of story and measure (`commands/plates.md`).

## Worked example: a greenhouse from dawn to dusk

Copy the level of detail, not the scene. Idea: one bench of seedlings, the whole day passing over it, a garden centre's "everything in its own time". Register A. Green: light slowly changing, locked camera. Reads backwards. Three key frames, because dawn to dusk in one jump would morph.

Lock list: three wooden benches, one terracotta pot with a chipped rim, iron window frames

Grade line: soft low-contrast print look, blacks lifted; green glass and warm terracotta only; colour like Kodak Portra 400

**Reference frame (noon, the richest state). Text to image.**

```chatgpt
A photograph for a website hero, wide 16:9 format.
Subject: inside a Victorian glasshouse, seedlings in rows on three wooden benches, one terracotta pot with a chipped rim, iron window frames, at the right third.
Set: 1890s iron and glass, a wet brick floor, a coiled hose by the door as the only prop.
Light: high soft sun through old glass from the upper left, shadows of the iron bars falling across the benches.
Grade: soft low-contrast print look, blacks lifted; green glass and warm terracotta only; colour like Kodak Portra 400
Lens: 35 mm, deep focus, camera at bench height. Foreground: soft out-of-focus leaves at the lower left edge.
Composition: the left 40 % stays calm brick wall and glass for a headline.
Finish: natural detail, true-to-life glass, brick and soil.
No text, letters, numbers, logos, labels or watermarks anywhere.
```

**Dawn and dusk: edits of noon, one change each.**

```chatgpt edit
Edit the attached image. Keep the same camera, lens, framing and every object exactly as they are: three wooden benches, one terracotta pot with a chipped rim, iron window frames.
Change only the time of day: ten minutes before sunrise, cool blue light through the glass from the right, no direct sun, the bars casting no shadow.
No text, letters, logos or watermarks.
```

`media keys` reports a big change and a grade shift between each pair. Both are the point here, so they stay. It should report no framing shift; if it does, edit again.

**Clip: dawn to noon, Kling, start and end frame, 4 s, sound off, static camera.**

```kling
Static shot, single continuous shot, steady speed, crisp frames with minimal motion blur.
The light slowly changes from cool blue dawn to soft high sun as in the frames. The shadows of the iron bars grow and travel across the benches. Nothing else moves.
Keep three wooden benches, one terracotta pot with a chipped rim, iron window frames.
Light and grade follow the two frames only. The left side stays calm.
```

```negative
morphing, plants growing, objects moving, flicker, text, watermark, zoom, camera shake, camera drift, new objects appearing
```

**The same clip in Veo: first and last frame, 4 s, sound cannot be switched off.**

```veo
A static shot, 35 mm, deep focus. The light slowly changes from cool blue dawn to soft high sun, and the shadows of the iron bars travel across the benches.
Keep three wooden benches, one terracotta pot with a chipped rim, iron window frames.
The camera stays still; nothing enters or leaves the frame; the left side stays calm.
Audio: quiet room tone only, no music, no voices.
```

**Noon to dusk** is the same prompt, starting from the extracted last frame of the first clip. Finish both with even speed, chain them, cut the frames.
