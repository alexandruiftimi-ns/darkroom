# Style packs

A pack is a set of **defaults and switches**, not a template. It tells Darkroom which rules apply. Blend: one **primary** pack (owns layout + type) + up to two **modifiers** (may adjust palette, imagery, motion only). The user's explicit instruction overrides any pack line.

| Pack | Feeling | Colour mode | Density | Motion | Typical use |
|---|---|---|---|---|---|
| [cinematic](cinematic.md) | immersive, filmic, dramatic | disciplined | low | scroll story, one object | product launches, film, auto, hardware |
| [luxury](luxury.md) | quiet, rare, slow | disciplined / mono | very low | slow reveals | fashion, jewellery, hotels, real estate |
| [modern](modern.md) | clear, precise, current | disciplined | medium | responsive UI | SaaS, tools, startups, studios |
| [bold](bold.md) | loud, confident, poster | expressive | low | hard cuts, type scale | campaigns, sport, music, agencies |
| [cyberpunk](cyberpunk.md) | neon noir, tech, edge | disciplined UI / saturated media | medium | light sweeps, glitch on media only | gaming, crypto-free tech, events, nightlife |
| [editorial-news](editorial-news.md) | informed, structured, dense | monochrome | high | almost none | news, magazines, journals, reports |
| [restaurant](restaurant.md) | appetite, place, hospitality | depends on venue | low–medium | dish reveals | restaurants, bars, cafés, bakeries |
| [catalog](catalog.md) | browsable, trustworthy, fast | disciplined | high | instant feedback | e-commerce, product ranges, rentals |
| [nature](nature.md) | calm, grounded, alive | disciplined (earth) | low | slow parallax | outdoor, wellness, farms, eco |
| [art-gallery](art-gallery.md) | the work first, interface recedes | monochrome | very low | work-led transitions | artists, galleries, photographers, museums |
| [artsy](artsy.md) | experimental, playful, colourful | expressive | varies | playful, cursor | creative studios, festivals, illustrators |
| [family](family.md) | warm, safe, easy | expressive (soft) | medium | gentle feedback | kids, schools, community, family health |
| [trust](trust.md) | credible, calm, competent | disciplined | medium | minimal | finance, legal, medical, B2B, public sector |

**Reference looks.** "Like apple.com / Rolex / Cartier" is a look too: start from `references/looks.md`, measure the live site, and follow `commands/lookalike.md`. Map it to the nearest pack for switches (Apple → modern, Rolex → cinematic + luxury, Cartier → luxury). The motion level is chosen separately (`references/modes.md`).

## Switches vocabulary (every pack sets these)

`eyebrow` (label above headings) · `tracked-caps` · `index-numerals` (01/02) · `hairlines` · `cards` · `glass` · `gradients` · `mono-labels` · `centred-layout` · `marquee` · `custom-cursor` · `full-bleed-imagery` · `script-lettering`
Values: **ON** (part of the look) · **SPARING** (≤ 1–2 uses, with a reason) · **OFF**.

## Adding a pack

Copy any pack, keep the headings, fill every field. Packs must list only fonts whose licence allows web embedding (OFL or a purchased web licence).
