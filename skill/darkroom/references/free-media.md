# Free, licence-clean media sources

Written on: 2026-10-28 · Checked live: 2026-10-28 (Pexels, Pixabay, Unsplash, Coverr, Poly Haven read on their licence pages; Mixkit's per-item terms and Smithsonian's page could not be read that day, so those rows are as known, not confirmed). Licences change: open the source's licence page before the first download in a project and record what it said (the live page wins over this file).

Use these when the user has no media and chose "free pictures and clips I find for you" (`commands/concierge.md`). **The user chooses the source.** Suggest one or two that fit (with the reason in a line, e.g. "Coverr's AI section for a moody loop; Pexels if you want real footage only"), then use what they pick, including a source not on this list; never enforce one. Darkroom picks candidates from the chosen source, shows them, and **asks before downloading**. No API keys: browse the public pages, or the user pastes links.

**AI-made or real?** Ask once when it matters (some brands want real footage only). As of 2026-10-29 (from the sites' own policy pages found in a web search, **not re-read live**): Coverr has a labelled *AI generated* section (HD/4K, no watermark, same free licence: no resale or redistribution as stock); Pixabay accepts AI uploads but requires an AI label (filter by it either way); Pexels bans generative-AI uploads (policy of 2026-10-20), so it is a source of real footage only. No large CC0 library of AI-made motion clips was found.

**Code instead of footage.** Gradients, mesh, swirl, halftone and noise backgrounds are lighter and sharper as shaders or CSS (`recipes/shader-backdrop.js`) than as video: suggest that option alongside the clip sources when the user wants an abstract moving background.

| Source | Kind | Licence in short (checked live on the date above unless marked) | Watch out |
|---|---|---|---|
| Pexels | photos, video | free use incl. commercial, no attribution required; not sold unaltered as prints or products, not redistributed on stock or wallpaper sites, not used as a trademark or business name | no endorsement implied by people or brands shown; never show identifiable people in a negative light; no AI uploads since 2026-10-20 (real footage only) |
| Pixabay | photos, video, illustrations | Pixabay Content License: free use and adaptation, no attribution required; not sold or distributed on its own; no commercial use of content showing trademarks or logos | some uploads are AI-generated: check the tag |
| Mixkit | video, music | Mixkit's own licence per item type (Stock Video comes as *Free* and *Restricted*); **not confirmed**: open the item's "View License" before use | read the item type's terms (video vs music) |
| Coverr | video | free for commercial and non-commercial use, no attribution required; no resale or redistribution, no competing service, no AI training; brands shown need their own permission, releases are not assumed | short, generic clips: good as backgrounds, weak as subject; has a labelled AI-generated section |
| Unsplash | photos | Unsplash License: free commercial and non-commercial use, no attribution required (credit appreciated); not sold without significant modification; no compiling into a similar or competing service | well known images read as stock |
| Smithsonian Open Access | archival images, 3D | CC0 for items marked so (**not confirmed** on 2026-10-28: the page refused automated reading) | only items with the CC0 mark |
| The Met Open Access | art and objects | CC0 for public-domain works | only items marked Open Access |
| Poly Haven | HDRIs, textures, 3D models | CC0: commercial use allowed, including in products you sell; credit optional | none: the safest source for 3D lighting |
| Khronos glTF Sample Assets | 3D test models | per model (many CC-BY or CC0) | read each model's licence file |
| Sketchfab | 3D models | per model: filter to CC0 or CC-BY, give the credit CC-BY asks for | many models are not downloadable or not CC |

## Rules

1. **Download, never hotlink** (`references/craft.md`): links rot, rights stay unclear, and visitors' IPs go to a third party.
2. Record source URL, creator, licence (with the date the licence page was read) and intended use in `.darkroom/ASSETS.json`.
3. **Recognisable people, logos, brands, artworks or private buildings:** skip for commercial pages unless the source states a model or property release.
4. Process every download with the hero-media rules (`references/hero-media.md`) and `darkroom media derive` / `media frames`; free clips rarely have the right edge colour, so plan the ground or a scrim from the clip.
5. Say plainly when stock cannot replace the real thing: a product, the user's place, their team, their food. Stock is for atmosphere.
6. Drawn-in-code backdrops (gradient fields, light sweeps, grain) are always free and always the user's own; they are abstract only (`references/effects.md`).
