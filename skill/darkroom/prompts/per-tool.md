# Prompts per tool

Write for the tool the user named, with the settings to set, what to attach and what to check. Tool facts change monthly and live, dated, in `references/asset-tools.md`; read them first. Fill these forms from `references/asset-craft.md` and the shot list. In `SHOTS.md` each prompt sits in a block named after its tool (```` ```kling ````, ```` ```chatgpt edit ````, ```` ```negative ````) so `darkroom shots lint` can read it.

## Rules for every tool

- Plain, concrete sentences describing what a camera would see. No hype words.
- Lead with the shot, then subject, action, setting, light, grade, lens, constraints.
- **One camera move, one subject action.** Say the speed.
- **Duration and pixel size go in the tool's settings, not the prompt.** In the prompt they do nothing or make the model time beats.
- Name the calm zone, and the edge colour for registers C, D, E.
- Words like "zoom" and "shake" go only in a negative field. Named in the main prompt they can invite the move. Where there is no negative field, say it positively: "the camera stays still", "nothing enters the frame".
- Length: stills 60 to 150 words, video 40 to 100.
- Repeat the lock list and grade line word for word across a series.
- Give **safe and ambitious** versions of the still. For video, both in the recommended tool; the alternative tool gets the safe one, labelled "use this if the first tool fails once".

## ChatGPT Images

Set the ratio in the picker if shown and say it in words. Pixel sizes in the prompt do nothing: measure the download. Say what each attachment is for. A fresh chat every 5 or so images, re-attaching the reference.

Text to image:

```text
A <photograph | high-end CG render> for a website hero, wide 16:9 format.
Subject: <what, material, where in frame: "at the right third, lower half">.
Set: <place, era, surface material>. Props: <1 to 3, each with a reason>.
Light: <source, direction, quality, colour>.
Grade: <grade line>.
Lens: <focal length>, <depth of field>, camera at <height>.
Depth: foreground <soft occluder>, subject mid-ground, background <place>.
Composition: the <left 40 %> stays calm and uncluttered for a headline <| edges fall off to flat #hex>.
Finish: natural detail, true-to-life texture <; fine even film grain, only if this still stays a still>.
No text, letters, numbers, logos, labels, signage, watermarks or borders anywhere.
```

Edit an uploaded image:

```text
Edit the attached image. Keep <everything | the product, its shape, cap, label position and colour> exactly the same.
Change only: <one change>.
Keep the camera angle, lens, framing, light direction and grade.
No text, logos or watermarks.
```

## Kling

Settings to name: model · high-quality mode for 1080p · duration, 4 s by default · ratio · **native audio off** · static camera or a camera preset instead of words · start frame · end frame or keyframes · elements for references · relevance slider toward relevance, if shown · negative prompt.

```text
<Static shot | Slow dolly in | Slow orbit left, about 20 degrees>, single continuous shot.
<Subject> <one action, slow and steady>. <Ambient motion, two at most>.
The <subject> keeps its exact shape, proportions, materials and details: <lock list>.
Light and grade stay exactly as in the start frame. The <left side> stays calm.
```

Negative field, what applies, about ten at most:

```text
morphing, warping, deformation, extra fingers, extra limbs, flicker, text, watermark, zoom, camera shake, camera drift, sudden lighting change, new objects appearing
```

For an exact human or animal motion, Motion Control copies it from a phone video onto a still, which turns many amber and red body motions green or amber. Never multi-shot. A frozen second mid-clip is a known glitch: regenerate, or finish with even speed.

## Veo

Settings: 4 s or 6 s · 16:9 · 1080p · Fast for tests, full for keepers · first frame · last frame, treated as a guide · several outputs. Check it is still in the picker (`references/asset-tools.md`).

```text
A <static | slow dolly-in | slow lateral tracking> shot, <50 mm>, <shallow depth of field>.
<Subject> <does one thing, slowly>. <Ambient motion>.
Light and grade exactly as in the first frame: <one line restating them>.
The camera stays <still | on one smooth, steady path>; nothing enters or leaves the frame; the <left side> stays calm.
The <subject> keeps exactly the same shape and details throughout.
Audio: quiet ambient room tone only, no music, no voices.
```

The audio line stops Veo inventing a reason for sound. Strip it afterwards anyway.

## Seedance

Tag each reference in the prompt. The prompt says what happens; the references say what it looks like.

```text
@Image1 is the first frame. @Image2 is the product: keep it identical. @Image3 sets the light and grade only.
<Shot, camera>, single continuous shot.
<Action>. <Ambient motion>.
Keep <lock list>. The <zone> stays calm. No text anywhere.
```

Use it for fast action, choreography and several people.

## Gemini Omni Flash

Drafts, and editing a near-miss take: "same clip, but the background stays still". One change per edit. Treat results as drafts until tested.

## Midjourney, Flux, Gemini, Firefly and others

Same content, in the tool's own shape: Midjourney takes short visual phrases with the ratio and style references as parameters, and is weak at exact products and layouts. Gemini edits are described as the change, not the whole scene again. Check the tool's own docs for anything you are unsure of; do not invent parameters.

## Text to video, any tool

Only for atmosphere where the exact frame does not matter. Give the full frame description, since nothing else holds it. Ask for several outputs. If a clip is great but slightly off, extract its best frame, fix it in the image tool, and redo it as image to video.

## The hand-off

Use `templates/SHOTS.md`. For each step give, in this order, with prompts in code blocks so they paste cleanly and everything else short:

```text
STEP 2 of 6 · Kling · start and end frame
Settings: 1080p · 4 s · 16:9 · sound off · static camera
Attach:   start = dawn.png · end = noon.png
Prompt:   …
Negative: …
Good if:  <2 to 4 things to look at>
Try again if: <2 to 4 things>
Save as:  assets/incoming/greenhouse/clip-01.mp4
Then:     tell me, or just save it: I am watching that folder.
```
