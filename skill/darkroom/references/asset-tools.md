# Assets: the user's own, or prompts for an image or video tool

Ask once, at intake, in the same question round (`commands/concierge.md`): **"Do you have your own pictures and video, or should I write prompts for you to generate them?"** Answers: *I have my own* · *Write me prompts* (then: which tools, see "Asking which tools") · *A mix* · *Free pictures and clips you find for me* (`references/free-media.md`; Darkroom asks before each download) · *Neither: build without* (then: drawn-in-code graphics, type-led layout, openly licensed images with credits, `commands/plates.md`).

Whatever the source, a hero photo or clip follows `references/hero-media.md`: edges that fall off to the page ground, an empty zone for the copy, one continuous shot, loopable. Every hero prompt Darkroom writes carries those lines.

By default Darkroom writes the prompt, says which tool and mode it is for, what to attach, how to tell a good result from a bad one, where to save it, and what ships if it never arrives (`templates/NEEDS.md`). It spends the user's credits only if they connect a tool (`references/asset-connect.md`).

## Modes (say which one each prompt is for)

| Mode | What goes in | Use it for |
|---|---|---|
| Text to image | a prompt | hero plates, atmosphere, textures, product scenes when no product photo exists |
| Image edit / image to image | a photo + an instruction | cleaning a real product photo, new background, extending the frame, matching a grade |
| Text to video | a prompt | a mood loop, a place, a background film with no fixed product |
| Image to video | a start image (+ prompt) | the product turning, a camera move into a still: the identity stays fixed |
| First and last frame | two images (+ prompt) | a transition that must start and end exactly (scroll scrubs, chapter changes) |
| Reference images | 1 to several images + prompt | keeping a product, a character or a style the same across many shots |

For anything that must look like the real product, start from the user's photo (image edit or image to video), never from text alone.

## Asking which tools

At intake, once they want prompts and the page needs generated frames or video, in round 2:

- **Which image tool?** ChatGPT Images (recommended) / Midjourney / Gemini / another.
- **Which video tool?** Kling (recommended for frames that must land exactly) / Veo / Seedance / through Artlist or Higgsfield / "not sure, you choose".
- **Who presses the button?** Offer this only when it applies: `references/asset-connect.md`.

Record it (`darkroom state --set imageTool=chatgpt,videoTool=kling-3.0,runs=user`). The answer changes the prompts, the settings and how the frames are used. No tool yet: recommend ChatGPT Images plus Kling, and say it is a paid plan. Never assume a plan has a feature: name it once ("check your plan offers start and end frames") and adapt if it does not.

## Tools

Checked live: 2026-11-06. Models move monthly. When this date is over 30 days old, or the user names a model not listed, search the vendor's current page before relying on a row, and say what you could not confirm. Sources: [Kling's 4.0 comparison](https://kling.ai/blog/kling-4-vs-3) (written before launch), [Higgsfield](https://higgsfield.ai/mcp), Artlist's help centre. **Unverified** marks third-party claims.

| Tool | Modes worth using | Facts and limits |
|---|---|---|
| **ChatGPT Images** | text to image, edit an uploaded image, several references | Best at following instructions and editing. Pixel sizes in the prompt do nothing: measure the download. Drifts over long chats |
| **Kling 3.0** | image to video, start and end frame, elements, negative prompt, static camera, Motion Control | 3 to 15 s, up to 1080p in practice, 4K costs far more. Native audio is optional: keep it off. No middle frames |
| **Kling 4.0** | **up to 10 keyframes** in one clip, elements, up to 15 references | 3 to 30 s. **4.0 Flash: 720p, no start and end frames, no keyframes: drafts only.** A reviewer reports elements and native sound switch off with keyframes (unverified). Negative field in 4.0: unverified. Access varies by plan |
| **Veo 3.1** | image to video, first and last frame, up to 3 reference images | 4, 6 or 8 s; references force 8 s. Lite takes no image. Always makes sound. Follows the first frame closely, the last loosely (observed, not measured). **Being retired:** preview versions left Google's Gemini API on 2026-10-22 (third-party reports agree), stable versions list retirement on or after 2026-11-17. Check it is still in the user's picker |
| **Gemini Omni Flash** | text or image to video, editing an existing clip | Google's named replacement. 4 to 10 s (unverified). Good for drafts and near-miss fixes until tested |
| **Seedance 2.5** | references tagged in the prompt (`@Image1`), up to 30 s | Strongest at fast action and several people, by reviewers' opinion. First and last frame on 2.0 per Higgsfield's guide |
| **Artlist, Higgsfield** | hubs for the video models above, under one balance | Which model has start and end frames varies: Artlist tags it in the model menu. Both have connectors: `references/asset-connect.md` |
| **Midjourney, Flux, Gemini / Imagen, Firefly, Ideogram** | stills | Midjourney: mood and light, weak at exact products. Gemini: edits that keep identity. Firefly: commercially cleared training data. Ideogram: lettering, never for page text |
| **Runway, Luma, Hailuo, Wan** | text and image to video | Same structure. Check the current model's frame controls |

**Which tool for what:**

- Exact still, composition, calm zone, product identity, character sheets: ChatGPT Images, always first.
- Exact landings, keyframed transitions, strict negatives, fabric, hair, water, smoke: Kling.
- Photoreal product, glass, metal, reflections, slow camera: Veo while it lasts, otherwise Kling.
- Fast action, choreography, several people, many references: Seedance.
- Drafts, and fixing an almost-good take: Gemini Omni Flash.

## What to do with the tool

Scroll frames: `prompts/frame-sequence.md`, always. Any prompt: `references/asset-craft.md` first, the tool's form in `prompts/per-tool.md`, the steps in `.darkroom/SHOTS.md` (`templates/SHOTS.md`), and `darkroom shots lint` before it reaches the user. **Stills first, in the image tool: video only from an approved still.** Text to video is only for atmosphere. Before ordering a batch, generate **the hardest shot once** at the cheapest setting and check it (`darkroom media clipcheck`). Give the user one step at a time; keep watching the folder (`commands/wait.md`).

Every prompt says the mode and tool, what to attach, the settings, good and try-again signs, where to save it, and what ships if it never arrives.

## When files arrive

When the user says they added files (or you see new files in `assets/raw/`):

```
darkroom assets intake [assets/raw] [--needs NEEDS.md]
```

It matches each file to its row in `NEEDS.md`, measures it (size, shape, length, frame rate, sound), and fills the Status column (`✅ arrived`, `✅ arrived · could be better: …`, `waiting`). Files nobody asked for are listed as extra. **Nothing is ever rejected.** Then:

1. Open each picture yourself (you can see images): text or logos baked in, subject cut off at an edge, a different product than the brief. Add what you see to the suggestions; the script cannot see content.
2. Tell the user in one short message, one line per file, suggestions phrased as options ("the hero is 1400 px wide: it works; a 2400 px version would be sharper on big screens"), then ask once: **"Continue with these, or replace any first?"** Recommended: continue.
Hero candidates (videos, wide pictures) also get the hero-media measurements: edge colour → `--ground`, calmest zone for the words, loop seam (`references/hero-media.md`). With many candidates, `darkroom media sheet assets/raw` gives one numbered sheet to look at.
3. Continue means use them now: `darkroom media derive` for responsive images, `media frames` for scroll sequences, `media web` for background video (desktop + phone copy + poster), and update `.darkroom/ASSETS.json`. A replacement later simply goes through intake again.

## Rights

Record tool, plan and date in `.darkroom/ASSETS.json`. The output licence depends on the tool and the user's plan; some markets require labelling AI-generated imagery (`references/compliance.md`). Never generate a real person, a brand's product or logo the user does not own, or a competitor's look.
