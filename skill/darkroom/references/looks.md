# Reference looks: starting profiles for "make it look like …"

Written from general knowledge of these sites, **not measured**. Use a profile to answer the user's first message quickly, then measure the live site (`commands/lookalike.md` step 1); the measurement wins. Each profile names what to take, what never to take, and licensable substitutes. Add a brand by copying a block; keep the same headings (a test checks them).

Font substitutes are OFL unless stated. Colour values are approximations to name the *role*; for a signature brand colour, shift the hue for the client.

---

## like:apple
- Known for: huge calm headlines, products photographed on seamless light or black grounds, very short copy, product pages that tell a story as you scroll.
- Take: centred stacked hero (headline, one-line subhead, two text links or pill buttons), full-width tiles in alternating light and dark grounds, generous section padding, large numeric stats, sticky translucent navigation with blur, a sticky product sub-navigation with one "Buy"-type action.
- Type: a neutral grotesk at large sizes with tight tracking on display, regular body. Substitutes: Inter / Inter Display, Geist, Manrope; or `system-ui` (shows the device's own font, never shipped).
- Palette: near-white and light grey grounds, near-black ink, one link/button blue. Ours: keep the neutrals, pick the client's accent instead of the blue.
- Motion: fades and rises on scroll (mode `animated`); product pages use pinned scroll scenes, scrubbed video or frame sequences (mode `story` / `hero-effect`).
- Copy voice: 2–6 word headlines, often a play on words; one claim per tile.
- Do not take: the apple logo, product names, product photos, the San Francisco font files, their headlines.

## like:rolex
- Known for: full-bleed macro photography of the product, slow cinematic video, deep dark grounds, ceremony and precision.
- Take: one product per screen, centred short text, long dark sections with a single lit object, slow crossfades and gentle zooms, editorial "story of the craft" chapters.
- Type: a proprietary house face. Substitutes: Hanken Grotesk or Jost for text, a refined serif for occasional display (Cormorant Garamond).
- Palette: deep green-black and black grounds, warm metallic accent, white ink. Ours: a dark ground and one warm accent, **never green with gold together**.
- Motion: slow (800–1400 ms), video loops with still posters, mask reveals of the product; nothing bouncy.
- Copy voice: measured, factual, superlatives avoided; numbers about craft.
- Do not take: the crown, the green-and-gold pairing, model names, watch photography.

## like:cartier
- Known for: bright white pages, jewellery shot on white or in editorial colour, refined serif and sans pairing, small uppercase labels, the red box.
- Take: white ground and lots of air, product grid with large images and small captions, editorial images that break the grid, thin hairlines, understated navigation.
- Type: proprietary house faces. Substitutes: Bodoni Moda or Cormorant Garamond (display) + Jost or Hanken Grotesk (labels, body).
- Palette: white, black ink, one deep signature red used sparingly. Ours: one deep accent in the client's own hue, **not red with gold borders**.
- Motion: mask reveals of images, slow fades, hover image swaps on product cards (mode `animated`).
- Copy voice: short, poetic product lines; labels in uppercase with tracking.
- Do not take: the panther motif, the red box, product photos, names of collections.

## like:aesop
- Known for: warm, literary, apothecary calm; amber bottles on muted backgrounds; long thoughtful copy.
- Take: earthy muted grounds, an editorial text column, quotes as content, product photography on plain warm grounds, very restrained UI.
- Type: a quiet grotesk with a classical serif for quotes. Substitutes: Hanken Grotesk + Cormorant Garamond.
- Palette: beige, sand, olive, dark brown ink. Ours: the same warmth in the client's hues.
- Motion: almost none (mode `calm` or light `animated` fades).
- Copy voice: literary, longer sentences allowed: raise word budgets in the bible.
- Do not take: bottle designs, label typography, quotes they selected.

## like:stripe
- Known for: a colourful animated gradient hero, dense but tidy product illustrations, code snippets, a dark navy section.
- Take: a strong grid, product UI rebuilt in code as illustrations, an animated gradient field (CSS or a light canvas), clear feature blocks with icons, logo-wall pattern only with real customers.
- Type: a modern grotesk. Substitutes: Inter, Geist, Manrope.
- Palette: white and deep navy grounds, a violet-led gradient. Ours: build the gradient from the client's hues.
- Motion: gradient drift (paused under reduced motion), reveals, small UI demos that animate in view.
- Copy voice: precise, developer-friendly, numbers and verbs.
- Do not take: their gradient colours, illustrations, product UI, customer logos.

## like:linear
- Known for: dark interface, soft glows and beams, crisp product screenshots, extreme precision in spacing.
- Take: near-black ground, thin borders, subtle radial glows behind product UI, tight type, small mono labels, keyboard-shortcut motifs.
- Type: Inter Display / Inter; Geist; a mono for labels (Geist Mono, JetBrains Mono).
- Palette: near-black, grey steps, one cool accent. Ours: the client's accent.
- Motion: light beams and fades on scroll, UI that assembles; short and precise.
- Copy voice: confident, short, product-first.
- Do not take: their screenshots, logo, glow artwork.

## like:tesla
- Known for: full-screen photo or video sections, model name centred at the top, two buttons at the bottom, almost no other text.
- Take: one image per viewport, centred heading and two actions, minimal navigation, large spec numbers.
- Type: a wide geometric sans. Substitutes: Montserrat, Jost.
- Palette: the photography carries colour; white or black UI.
- Motion: crossfades between full-screen sections; avoid forced scroll snapping unless tested with keyboard and trackpad.
- Copy voice: product name + one line + specs.
- Do not take: car photography, model names, the T logo.

---

## When the brand is not listed

Say so, measure it (`commands/lookalike.md`), and write its profile here in the same shape once the build is done (maintainers: keep entries to written observations, no screenshots).
