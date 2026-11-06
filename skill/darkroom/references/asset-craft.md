# Asset craft: images and clips that do not look generated

Read this before writing any image or video prompt. Tool forms: `prompts/per-tool.md`. Frame sequences for a scroll: `prompts/frame-sequence.md`. Which tool does what, as of its date: `references/asset-tools.md`.

## The bar

A good asset has one idea you can say in ten words, light you can point to, real materials, a controlled palette, a composition built for the page, restraint in motion, and no artefacts. Surreal is allowed; sloppy is not.

**Slop is defaults stacked without an idea.** Any device is fine when it is the idea: god-rays, haze, symmetry, a hero pose, a shatter. **The delete test:** for each device ask "if I delete it, does the concept get weaker?" Yes, keep it. No, it is garnish, cut it. Three pieces of garnish, or one device doing an idea's job, is slop.

Not slop, so do not over-correct: template polish, obviously CG characters with good materials, surreal premises, dark palettes, an asset that is clearly AI-made and clearly art-directed. Never turn down an idea because it "looks AI": fix the execution.

### Signs the defaults are in charge

| Stills | Video |
|---|---|
| waxy skin, no pores, the same catalogue face, identical teeth | morphing: shapes, faces, products, hands change between frames |
| HDR halos, grey lifted shadows, everything evenly lit, every colour saturated | boiling: textures crawl while nothing moves |
| orange and teal or purple-pink neon with no reason; low sun on every subject | breathing: rigid objects pulse or wobble |
| god-rays, flares, sparkles, bokeh balls as garnish | sliding feet, rubber limbs, joints bending wrong |
| depth of field that matches no lens | unmotivated presets: crash zooms, whip pans, 360° spins, speed ramps |
| gibberish text, melted logos, extra fingers, impossible architecture | things appear or vanish; light jumps; a locked camera drifts |
| detail everywhere with no rest for the eye; a clean, grainless sheen on a photograph | everything moves at once with no hierarchy |

### What "cinematic" means, checkable by eye

One dominant light with a direction and a dark side. A stated grade. A named lens with depth of field to match. Foreground, subject, background. One slow camera move with weight. A set with props that have a reason. Something just happened or is about to. Wear: dust, creases, condensation. When unsure, remove something.

## Pick a register (it changes the defaults)

| Register | Defaults |
|---|---|
| **A. Photographed reality** | location light with a source, real lens behaviour, weather; full bleed |
| **B. Surreal, photographed** | one impossible premise, everything else documentary-real; full bleed |
| **C. Premium CG object** | seamless ground or gradient, soft key and rim, contact shadow; edges fall to the page ground |
| **D. Character** | character sheet first, then studio or a simple set; edges fall to the page ground |
| **E. Abstract or material** | one material doing one thing. First ask whether a shader or `darkroom media make` does it lighter |

## The idea, before any prompt

For heroes and chapter assets, unless the user already has an idea or says "just this":

1. Brand truth in one line: what it promises, what it is against.
2. Six ideas from these moves: **displacement** (the right object in the wrong place), **concealment or reveal**, **scale shift**, **material swap**, **literal metaphor**, **aftermath**, **absence**.
3. Drop the three most obvious. Pitch three, one line each, each from a different move.
4. Tests: ten words or fewer; put a competitor's logo on it and it stops working; it works as a still with no motion; a green or amber version exists.

A mood is not an idea ("cinematic coffee shop"). Say so in one line, offer two sharper ideas and the literal version. If they pick the literal version, execute it at full craft.

**A picked image is the spec.** When the user picks a take, what is in it overrides the old brief. List differences as a note, never edit it back. Fix only real defects: fake logos, artefacts, size.

## Look grammar (every prompt names these)

- **Light:** source, direction, quality, colour. "Soft daylight from a tall window out of frame left, falling into shadow on the right." One key. Never "dramatic lighting" without saying what it is.
- **Lens:** 24 mm place, 35 mm documentary, 50 mm neutral, 85 mm portrait and hero products, 100 mm macro. State the depth of field and the camera height.
- **Grade, all three:** a contrast curve ("soft low-contrast print look, blacks lifted"), a colour pair (warm key against cool shadow, or one hue family plus one accent under 10 % of the frame), and a film-stock look by product name ("colour like Kodak Portra 400"). No living artists, no studios.
- **Set:** era, architecture, one surface material. **Props:** one to three, each with a reason. **Wardrobe:** garment, fabric, fit, wear.
- **Depth:** foreground soft occluder, subject mid-ground, background place, a scale cue. For video keep the occluder a soft shape: it can morph too.
- **Materials:** two to four with a surface quality: "brushed aluminium with fine scratches", "heavy linen with deep folds".
- **Grain:** fine even grain helps a still that stays a still. **A still that feeds video gets no grain:** it flickers. Add grain on the page.

### People

The cure for the AI face is casting, not hiding faces. Every person gets **casting** (age, build, one feature that breaks symmetry, how the hair has grown out), **wardrobe**, **direction** (where the eyes go, what the hands do, an emotion as an action: "has just heard good news and is trying not to smile", never "confident") and **skin** ("natural skin texture, visible pores, uneven tone, no retouching"). For a series, make a three-angle face sheet first and attach it to every shot. Never a real or recognisable person.

### A whole site

Before the first asset write the look in `SHOTS.md`: register, at most two focal lengths, which side the key light comes from, the **grade line** word for word in every prompt, the **lock list** (three to six details of the subject that never change, also word for word), palette, one recurring motif, and **one style frame**: the first approved still, attached to every later generation. Compare each new asset with it: a different grade or light side means another try.

## Words

Banned in prompts, because they carry no instruction and the model falls back to its average: epic, stunning, breathtaking, gorgeous, beautiful, amazing, masterpiece, award-winning, trending, ultra-realistic, hyper-realistic, hyper-detailed, ultra-detailed, 8K, photorealistic, cinematic, dramatic lighting, octane render, unreal engine, flawless, perfect, best quality, moody, ethereal, dreamy, sleek, minimalist, vibrant, atmospheric, dynamic, luxury, futuristic.

**The crew rule:** every adjective must be something a gaffer, set dresser, stylist, camera operator or colourist could act on.

| Instead of | Write |
|---|---|
| cinematic | the lens, the light source, the camera move, the grade |
| photorealistic | "a photograph taken with a 50 mm lens; true-to-life materials" |
| hyper-detailed | "fine texture visible: wood grain, knit stitches, pores" |
| moody | the light and grade that make the mood |
| luxury | "travertine, brushed brass, one object, lots of space" |
| futuristic | the materials and shapes: "smoked glass, soft LED strips" |
| dynamic | the actual motion and its speed |

`darkroom shots lint` checks this before a prompt reaches the user.

## Rules for page assets

1. **No text, logos, UI, watermarks or readable signs** inside an asset. Text goes on the page. A brand mark on a product comes from the real photo or is added afterwards.
2. **One continuous shot.** No cuts or multi-shot.
3. **The calm zone stays calm** for the whole clip, unless the design sets type over the subject on purpose. Check 0, 50 and 100 %.
4. Registers C, D, E: edges fall off to the page ground. A, B: full bleed or a soft scrim on the page.
5. **Scrubbed clips play both ways.** Locked camera or one smooth move, no shake, no speed ramp, low motion blur. Motion must read backwards: a bird slowing to land works; smoke rising or a pour does not.
6. **Resting and poster frames are extracted from the clip**, never the original still: image-to-video changes colour and sharpness slightly, and swapping still for clip pops.
7. **Keep the source size.** A 1920 px clip gives 1920 px desktop frames, 4K stays 4K. Lighten by fewer frames or more compression, never by desktop width. Phones get their own set.
8. **Fine detail compresses badly:** rain, snow, foliage, particles and grain are easy to generate and heavy on the page.
9. No flashes above three a second; the poster must work alone for reduced-motion visitors.

## Risk: what AI video can do today

Score a shot by its **worst item**. Raise it one level if the camera and the subject both move noticeably, or if something rigid must stay rigid while being touched. Being too careful costs as much as being reckless: when unsure, suggest one cheap test. Models improve monthly.

**Green: works in one or two tries.** Mist, clouds, water surface, drifting smoke, grass, curtains, candle flame, dust in a beam, light slowly changing · slow push-in, pull-out or sideways move, orbit up to about 30° · a product turning up to about 45°, floating, steam, condensation · hair and fabric in a breeze, a figure standing, a head turn, a smile · a person walking on even ground, a vehicle driving straight at medium distance, a drone over nature · flowers blooming, time-lapse light · animals at rest · liquid metal, ink, silk, refraction · frozen action as a still.

**Amber: two to four tries, say what to watch.** A truly locked camera (models add a slow push: use the tool's static setting and accept only with no parallax) · the same image as start and end · a product turning 90 to 180° (give the hidden side as a frame) · one simple hand contact · a cloth reveal (watch the object underneath) · drops on glass, liquid moving in a glass · a pour seen from a distance · a drone over a city · stairs · birds landing, animals walking · two people in simple contact · moderate first-to-last changes, 8 to 10 s clips, keyframe chains · 2D character motion.

**Red: fails often, warn and redesign first.** Readable text, logos, numbers, screens in motion · typing, writing, instruments, tools close up · fast action outside a tool strong at it · a full 360° of a real product with exact details · ticking watch hands, gears, chains · a liquid that must land exactly · identity across big transformations (ageing, one product becoming another) · long camera paths through doors and round corners · mirrors of moving things · crowds in close detail · crash zooms, whip pans · timing in words ("stops in the final second"): put the pose in a frame instead.

Also breaks: thin repeats (railings, spokes, blinds) shimmer · fine patterns boil · very dark scenes band and crawl · hair against busy backgrounds halos · many small objects change count.

Warn in this shape, and always give the prompt afterwards. Warnings guide; they do not refuse.

```
⚠ RED: <what will likely break, one line>
Why: <the model limit, one line>
Safer version that keeps the idea: <the redesign>
If you still want the original: one test at <the cheapest setting>. Watch <frames or area>.
```

## Reviewing what comes back

Darkroom suggests, it never rejects a file. Verdicts: **Use it** · **Use it; could be better: <one thing>** · **One more try: <one change>**. Only medium or worse flaws count against a strong asset.

**A still, in order:** the idea reads in a second · calm zone or type layout · one light, shadows agree · grade matches the style frame · materials are real · artefacts: text, fingers, melted details, repeated objects, halos · at least 1920 px wide for a hero.

**A clip:** run `darkroom media clipcheck`, then look at the frames it pulled. By eye: identity stable, no morph, boil or breathing, nothing appears or vanishes, it reads backwards, grade matches the style frame. The numbers cannot see any of these; they find freezes, cuts, uneven speed, flicker, camera shift and a restless calm zone.

### Fix ladder

1. Regenerate once, or ask for several outputs.
2. Tighten: drop a motion, slow it, name the defect in the negative field, repeat the lock list, use the static setting.
3. Fix the **start frame**: busy textures and unclear geometry cause most morphs.
4. Change tool.
5. Fix afterwards: even the speed, trim, crossfade.
6. Change the design: lower the risk, split into beats, or move the hard part to code or the page.

**Two failures at step 2 or later: go to step 6 and say so.** Do not keep burning credits. Log each attempt in `.darkroom/ASSETS.json`.

## Rights

No NSFW, sexualised content or gore. No real people's likeness, no living artists' or studios' names. No recreations of existing characters, franchises or a brand's campaign; a look as inspiration is fine, a template's exact scene is not. Real brands only with the rights to them; never fake official assets. Readable trademarks in scenes: avoid. Output licences depend on the tool and plan; record tool, plan and date in `ASSETS.json`. Some markets require labelling AI-made imagery in ads (`references/compliance.md`).
