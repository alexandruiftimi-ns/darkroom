# Dark Motions: catalogue (generated; do not edit by hand)

Darkroom's own motion pieces: plain CSS, SVG and JS modules, no library, no third-party code. 98 pieces. Read this table to choose; open only the files you use. Rules for **when and how many** are in `references/modes.md` ("One signature per page") and `references/dark-motions.md`; the audit enforces them (`motion-budget`).

**Use one:** copy `dm-kit.css` and the piece's `.css` (and `dm-kit.js` + its `.js` when listed) into the project; paste the markup from `demo.html#<name>` inside `<div data-dm="<name>">`; load the module with `<script type="module">`. Colours and speed come from the tokens (`--dm-a`, `--dm-b`, `--dm-c`, `--dm-ink`, `--dm-bg`, `--dm-muted`, `--dm-dur`) set once from the bible. Reduced motion jumps each piece to its finished state; JS loops draw one frame; pieces pause off screen.

Columns: **Packs** = style packs it fits (`styles/`), **Cost** = light / medium (canvas or SVG filter).
Role per category: Text: signature or entrance · Backgrounds: signature (ambient) · 2D illustration: signature or accent · Borders & cards: accent · Buttons: feedback · Reveals & scroll: entrance · Cursor: signature · Numbers: accent.

## Text

| Piece | Files | Looks like | Use | Packs | Cost |
|---|---|---|---|---|---|
| Blur-in words | `blur-in-words.css` + `.js` | Words arrive one by one out of a soft blur, rising a quarter line as they sharpen. | hero headline, section titles | modern, luxury, cinematic, trust | light · overlaps `split-text.js (blur)`: prefer that unless this exact look is wanted |
| Spring letters | `spring-letters.css` + `.js` | Each letter springs up from behind its own baseline with a small overshoot, left to right. | hero headline, brand name | family | light · overlaps `split-text.js (chars)`: prefer that unless this exact look is wanted |
| Colour sweep | `colour-sweep.css` | A band of accent colour travels slowly through the letters, left to right, forever. | key phrase inside a headline, CTA label | modern, glass-cinema | light, CSS only |
| Aurora text | `aurora-text.css` | Soft blobs of three colours drift around inside the letters like northern lights. | one hero word, launch headline | cinematic, glass-cinema | light, CSS only |
| Glint | `glint.css` | Muted text catches a single white glint every few seconds, like light on metal. | luxury headline, price, logo word | luxury | light, CSS only |
| Outline fill | `outline-fill.css` | Hollow outlined letters fill with solid ink from the bottom up, then drain again. | big display word, section number | bold, artsy | light, CSS only |
| Marker highlight | `marker-highlight.css` | A highlighter stroke draws behind key words in sequence, like someone marking a page. | intro paragraph, testimonials, pricing notes | restaurant, editorial-news, trust | light, CSS only |
| Hand underline | `hand-underline.css` | A loose hand-drawn stroke draws itself under one phrase after the headline lands. | hero headline accent, craft and handmade brands | luxury, restaurant, nature, artsy | light, CSS only |
| Signal glitch | `signal-glitch.css` | Text sits still, then every few seconds slices shift sideways in two colours for a split second. | tech, music, gaming headline; 404 page | bold, cyberpunk | light, CSS only |
| Wave letters | `wave-letters.css` + `.js` | Letters bob up and down in a slow travelling wave, like a flag in light wind. | playful brand line, loading text, kids and food brands | family | light |
| Split-flap board | `split-flap-board.css` + `.js` | An airport-style board: each tile flickers through random letters before landing on the next word. | travel, events, "now showing", rotating value words | modern, cyberpunk | light |
| Tracking settle | `tracking-settle.css` | Letters start widely spaced and faint, then pull together into a tight, confident word. | luxury and fashion wordmarks, chapter titles | luxury, art-gallery | light, CSS only |
| Weight wave | `weight-wave.css` + `.js` | A wave of boldness rolls through the word: letters swell from thin to heavy and back. | type-led brands, studio sites (needs a variable font: the site's own, here Inter) | any | light |
| Extrude | `extrude.css` + `.js` | Flat text slowly pulls out of the page into a solid block shadow, then sinks back. | retro, poster, bold sale headline | bold | light |
| Neon tube | `neon-tube.css` | A neon sign: glowing letters that hum and flicker unevenly, as if the tube is warming up. | bars, nightlife, events, night-mode heroes | bold, cyberpunk | light, CSS only |
| Word drop | `word-drop.css` + `.js` | Words fall in from above with a little tilt, bounce once on the line and settle straight. | playful headline, food, toys, event posters | family, restaurant | light |
| Ink bleed | `ink-bleed.css` | The word condenses out of a spreading ink blot, edges pulling in until the letters are crisp. | editorial, print, tattoo, coffee brands | any | medium, CSS only |
| Chromatic settle | `chromatic-settle.css` | Text lands with red and cyan ghosts pulled apart, which snap together; a tiny jitter repeats later. | film, camera, music, streetwear headline | cinematic, cyberpunk | light, CSS only |
| Orbiting caption | `orbiting-caption.css` | A line of small caps runs around a circle that turns slowly, like a stamp or a badge. | scroll-down badge, "new collection" seal, footer stamp | bold, editorial-news, artsy | light, CSS only |

## Backgrounds

| Piece | Files | Looks like | Use | Packs | Cost |
|---|---|---|---|---|---|
| Grid pulses | `grid-pulses.css` + `.js` | A faint blueprint grid where short sparks of light run along random lines and fade out. | SaaS / dev-tool hero, feature section backdrop | modern, cyberpunk | light |
| Dot wave | `dot-wave.css` | A field of quiet dots; a ring of light expands from the centre, lighting the dots it passes. | hero backdrop, "signal / network" products, launch sections | modern | light, CSS only |
| Meteor shower | `meteor-shower.css` + `.js` | Thin meteors with fading tails streak diagonally across a dark sky at random moments. | night / space / launch hero, pricing backdrop | cinematic | light |
| Drifting particles | `drifting-particles.css` + `.js` | Soft points of light drift slowly upward and sideways, a few brighter ones in the accent colour. | calm hero backdrop, wellness, ambient sections | nature | medium |
| Constellation | `constellation.css` + `.js` | Slow-moving stars join with thin lines when they come close; the cursor pulls lines towards it. | AI / data / network product hero | modern | medium |
| Aurora field | `aurora-field.css` | Three huge blurred colour clouds slide over each other slowly, mixing into new tones. | hero backdrop behind glass cards, app launch, music | cinematic, glass-cinema | light, CSS only |
| Horizon grid | `horizon-grid.css` | A glowing grid floor runs towards a low sun on the horizon, scrolling endlessly forward. | retro / synth / gaming hero, event pages | bold, cyberpunk | light, CSS only |
| Warp field | `warp-field.css` + `.js` | Stars stream outward from the centre in short streaks, the feeling of travelling forward fast. | launch, "go faster" product, transition between sections | cinematic, cyberpunk | medium |
| Ripple rings | `ripple-rings.css` | Thin rings expand from a glowing centre point and fade, like a sonar ping or a drop in water. | behind a logo or icon, "listening / live" states, CTA focus | family | light, CSS only |
| Turning mesh | `turning-mesh.css` | A big soft colour wheel turns and breathes behind the content, with fine grain on top. | hero backdrop, product launch, music / creative tools | cinematic, glass-cinema | medium, CSS only |
| Flicker grid | `flicker-grid.css` + `.js` | A grid of tiny squares where random cells softly brighten and dim, like a living display. | tech / security / data hero, CTA band | modern, cyberpunk | medium |
| Falling beams | `falling-beams.css` + `.js` | Thin vertical lines with bright beads sliding down them at different speeds, like data rain. | dev-tool / AI hero, behind a terminal or code block | modern, cyberpunk | light |
| Silk lines | `silk-lines.css` + `.js` | A bundle of fine curved lines flows like silk in a breeze, each one slightly out of phase. | fintech / audio / premium hero, section divider band | modern | light |
| Bokeh | `bokeh.css` + `.js` | Out-of-focus circles of light float up slowly and fade, like city lights through a wide lens. | evening / hospitality / jewellery hero, holiday campaigns | luxury, nature | light |
| Orbit rings | `orbit-rings.css` | Small icons travel round two thin orbits at different speeds around a central mark. | "integrates with everything" section, team / partners, app ecosystem | modern | light, CSS only |
| Repel dots | `repel-dots.css` + `.js` | An even dot grid that parts around the cursor like a magnet pushing iron filings, then springs back. | interactive hero backdrop, studio / portfolio sites | modern | medium |

## 2D illustration

| Piece | Files | Looks like | Use | Packs | Cost |
|---|---|---|---|---|---|
| Waving mascot | `waving-mascot.css` | A round blob character bounces gently, waves hello and blinks; its shadow breathes with the bounce. | welcome / onboarding, empty states, friendly 404, kids and SaaS brands | family, artsy | light, CSS only |
| Rocket climb | `rocket-climb.css` | A rocket hovers with a flickering flame while speed lines and stars rush past it. | launches, "get started", growth / startup pages, success screens | family | light, CSS only |
| Happy coffee | `happy-coffee.css` | A smiling cup of coffee sways a little while curls of steam rise and fade above it. | cafés, roasters, "good morning" moments, cosy newsletters | family, restaurant | light, CSS only |
| Growing plant | `growing-plant.css` | A stem grows out of a pot, two leaves unfold, a daisy opens petal by petal, then the plant sways; it starts again every few seconds. | growth, sustainability, gardening, savings / investment, onboarding success | any | light, CSS only |
| Paper plane | `paper-plane.css` | A paper plane glides along a dashed flight path, its nose on the line, banking into each curve. | "send", contact, travel, ideas / creativity, onboarding steps | any | light, CSS only |
| Little robot | `little-robot.css` | A boxy robot tilts its head, its eyes scan left and right, the antenna light blinks. | AI products, automation, help / chat bots, tech for kids | modern, family | light, CSS only |
| Sunny spell | `sunny-spell.css` | A sun with slowly turning rays while two puffy clouds drift across at different speeds. | weather, travel, holidays, "good news" sections, outdoor brands | family, nature | light, CSS only |
| Floating ghost | `floating-ghost.css` | A friendly ghost floats up and down, its hem wobbling and its shadow shrinking as it rises. | 404 / "page not found", empty states, Halloween campaigns | family | light, CSS only |
| Swimming fish | `swimming-fish.css` | A round fish swims back and forth with a wagging tail, turning at each end, trailing bubbles. | aquariums, seafood, ocean causes, kids, calm loading | family, nature | light, CSS only |

## Borders & cards

| Piece | Files | Looks like | Use | Packs | Cost |
|---|---|---|---|---|---|
| Travelling edge light | `travelling-edge-light.css` | A short bright light runs round the card border forever, over a faint resting outline. | featured pricing card, "new" feature, highlighted testimonial | modern | light, CSS only |
| Spectrum rim | `spectrum-rim.css` | A full colour wheel turns slowly in the card rim, with a soft matching glow spilling behind. | premium tier, launch announcement, waitlist card | glass-cinema, cyberpunk | light, CSS only |
| Proximity rims | `proximity-rims.css` + `.js` | A grid of cards whose borders light up only where the cursor is near, across all cards at once. | feature grid, bento section, pricing row | modern | light |
| Card torch | `card-torch.css` + `.js` | A soft pool of light follows the cursor across the card surface, like a torch on paper. | product card, case-study tile, testimonial | modern, glass-cinema | light · overlaps `cursor-reveal.js`: prefer that unless this exact look is wanted |
| Breathing glow | `breathing-glow.css` | The card outline glows in and out slowly, a calm heartbeat that says "this one". | recommended plan, live status card, selected option | trust | light, CSS only |
| Marching outline | `marching-outline.css` | A dashed outline crawls slowly round the box, speeding up when something is dragged over it. | upload / drop zone, "add new" tile, empty states | modern | light, CSS only |
| Corner brackets | `corner-brackets.css` | Four corner marks frame the card like a camera viewfinder and slide outward on hover. | portfolio tiles, camera / film products, selection state | luxury, art-gallery | light, CSS only |
| Flip card | `flip-card.css` | The card turns over in 3D on hover to show its back: details, price or a call to action. | team members, product details, before / after | catalog | light, CSS only |
| Glass glare | `glass-glare.css` | On hover a bright diagonal reflection sweeps once across the card, like light across glass. | product cards, gallery images, app-store badges | luxury, cinematic, catalog | light, CSS only |
| Fan stack | `fan-stack.css` | A neat stack of cards fans out like a hand of playing cards when hovered. | photo sets, templates, "3 plans" teaser, collections | bold, artsy, catalog | light, CSS only |
| Drawn frame | `drawn-frame.css` | The card outline draws itself round in one stroke, then the content fades up inside it. | section intro card, step cards in a process, quotes | any | light, CSS only |
| Lift and bloom | `lift-and-bloom.css` | On hover the card rises a few pixels, its top edge catches light and a soft coloured bloom spreads below. | any clickable card: blog posts, products, plans | modern, luxury, trust, catalog | light, CSS only |
| Expanding panels | `expanding-panels.css` | A row of slim panels; the hovered one widens smoothly to show its title while the others narrow. | services, chapters, gallery of categories | bold, editorial-news, artsy, art-gallery, catalog | light, CSS only |
| Ticket tear | `ticket-tear.css` | A ticket with a perforated stub; on hover the stub tears loose and tilts away. | events, booking, coupons, "get your pass" CTAs | restaurant | light, CSS only |

## Buttons

| Piece | Files | Looks like | Use | Packs | Cost |
|---|---|---|---|---|---|
| Shimmer pass | `shimmer-pass.css` | A dark pill with a slow band of light sliding across its surface every few seconds. | primary CTA on dark heroes | modern | light, CSS only |
| Pulse ring | `pulse-ring.css` | Rings ripple outward from the button edge at a steady pace, drawing the eye without shouting. | single main CTA, "join live", play button | family | light, CSS only |
| Press ripple | `press-ripple.css` + `.js` | A circle of light spreads out from the exact point you press, then fades. | any button or tappable card; app-like interfaces | modern, trust, catalog | light |
| Rainbow rim | `rainbow-rim.css` | A thin flowing rainbow runs along the button edge with a coloured glow pooling underneath. | AI / creative product CTA, "try it free" | glass-cinema, cyberpunk | light, CSS only |
| Arrow hand-off | `arrow-hand-off.css` | On hover the arrow shoots out to the right and a fresh one slides in from the left. | "Read more", "Next", navigation CTAs | modern, luxury, restaurant | light, CSS only |
| Directional fill | `directional-fill.css` + `.js` | Colour fills the button from the side the cursor enters and drains out the side it leaves. | secondary CTA, outline buttons, menu items | modern, restaurant | light · overlaps `buttons.css .btn--fill`: prefer that unless this exact look is wanted |
| Gooey drops | `gooey-drops.css` | On hover little drops of the button pull away like liquid and merge back into it. | playful brands, drinks, kids, creative studios | family | medium, CSS only |
| Confetti pop | `confetti-pop.css` + `.js` | Clicking bursts a handful of paper confetti from the button that tumbles down with gravity. | sign-up success, "order placed", celebration moments | family, catalog | medium |
| Hold to confirm | `hold-to-confirm.css` + `.js` | Press and hold: colour fills the button left to right; let go early and it drains back. | destructive or important actions: delete, pay, publish | trust | light |
| Letter roll | `letter-roll.css` + `.js` | On hover each letter rolls upward to reveal a copy of itself, one after another. | nav links, minimal text buttons, menu items | bold, editorial-news | light · overlaps `buttons.css .btn--roll`: prefer that unless this exact look is wanted |
| Cursor glow | `cursor-glow.css` + `.js` | A warm glow inside the button follows the cursor as it moves across it. | large CTA, pricing "choose plan" buttons | modern | light |
| Send → done | `send-done.css` + `.js` | Click: the button shrinks to a circle with a spinner, then pops a check mark and returns. | forms: subscribe, send, save, add to cart | modern, trust, catalog | light |
| Physical press | `physical-press.css` | A chunky button with real depth: it sinks into its base when pressed and springs back up. | playful / retro / game sites, big single CTA | family | light, CSS only |
| Sparkle hover | `sparkle-hover.css` + `.js` | While hovered, small four-point stars twinkle in and out around the button. | premium / magic / beauty CTAs, "upgrade" buttons | family | light |

## Reveals & scroll

| Piece | Files | Looks like | Use | Packs | Cost |
|---|---|---|---|---|---|
| Iris open | `iris-open.css` | The image opens from a small circle in its centre, like an old film iris, to the full frame. | hero image entrance, chapter openers, film / photo brands | luxury, cinematic, art-gallery | light, CSS only |
| Colour wipe | `colour-wipe.css` | A solid accent panel sweeps across the frame and away again, leaving the image behind it. | editorial image reveals, portfolio tiles, section images | restaurant, bold, editorial-news | light, CSS only |
| Pixel dissolve | `pixel-dissolve.css` + `.js` | A grid of dark squares covering the image winks out in random order until the picture is clear. | tech / gaming / digital art reveals, loading-to-image | bold, cyberpunk | light |
| Blinds | `blinds.css` | Horizontal slats over the image turn open one after another, top to bottom, like window blinds. | interiors, architecture, hotel imagery | restaurant, nature | light, CSS only |
| Frame and settle | `frame-and-settle.css` | The frame opens from a smaller window while the image inside eases from close-up to its natural size. | hero image, product photography, gallery openers | luxury, cinematic, art-gallery, catalog | light, CSS only |
| Reading ring | `reading-ring.css` + `.js` | A small ring in the corner fills as you read down the page, with the percentage inside. | articles, case studies, long product stories | modern, trust | light |
| Ripple grid | `ripple-grid.css` + `.js` | Tiles pop in from the centre outward with a springy overshoot, like a stone dropped in a pond. | logo walls, feature icons, gallery grids, team photos | modern, family | light |
| Drawn path | `drawn-path.css` + `.js` | A winding line draws itself down the page exactly as far as you have scrolled, linking the steps. | process / timeline sections, journeys, roadmaps | any | light |
| Focus pull | `focus-pull.css` + `.js` | Images arrive soft and slightly zoomed, then pull into sharp focus as they enter the view. | photography, galleries, product imagery on scroll | cinematic, restaurant, nature, art-gallery, trust, catalog | light |
| Fold down | `fold-down.css` + `.js` | Cards unfold from their top edge towards you like paper flaps as they scroll into view. | testimonials, FAQ, feature lists, menus | editorial-news, trust | light |
| Split open | `split-open.css` | An image cracks down the middle and its two halves slide apart to reveal a line of text behind. | hero intro, announcement, "the big reveal" moment | bold, artsy | light, CSS only |

## Cursor

| Piece | Files | Looks like | Use | Packs | Cost |
|---|---|---|---|---|---|
| Comet tail | `comet-tail.css` + `.js` | A chain of dots follows the cursor, each one lagging the one before, shrinking into a tail. | playful portfolio, creative studio homepages | family | light |
| Lens ring | `lens-ring.css` + `.js` | A dot sits on the cursor with a ring that trails behind; over a link the ring grows and wraps it. | portfolios, galleries, agency sites with few links | modern, luxury | light |
| Photo trail | `photo-trail.css` + `.js` | Moving the cursor leaves a trail of small photos that pop in and fade away behind it. | photographer / studio homepages, lookbooks | cinematic, bold, artsy, art-gallery | light |
| Pressure type | `pressure-type.css` + `.js` | Letters near the cursor swell heavier and taller, as if the cursor presses into the word. | type-led hero, studio name, interactive headline (needs a variable font: the site's own, here Inter) | bold | light |
| Liquid cursor | `liquid-cursor.css` + `.js` | A soft blob chases the cursor, stretching in the direction it moves and merging with a smaller one. | creative agencies, drinks, fluid / organic brands | family, artsy | medium |
| Crosshair readout | `crosshair-readout.css` + `.js` | Fine horizontal and vertical lines cross at the cursor with live coordinates, like a measuring tool. | architecture, engineering, design-tool and map products | modern, cyberpunk | light |
| Watching eyes | `watching-eyes.css` + `.js` | A pair of cartoon eyes follow the cursor around the screen and blink now and then. | friendly 404, mascots, kids / pet brands, login screens | family | light |
| Water ripples | `water-ripples.css` + `.js` | Moving the cursor leaves expanding rings behind it, like trailing a finger through still water. | spa, wellness, water / drinks brands, calm heroes | restaurant, nature | light |
| Click stamps | `click-stamps.css` + `.js` | Each click stamps a bold little shape that pops in with a spin, then drops and fades. | playful brands, kids, events, interactive empty states | family | light |

## Numbers

| Piece | Files | Looks like | Use | Packs | Cost |
|---|---|---|---|---|---|
| Slot reels | `slot-reels.css` + `.js` | Each digit spins like a slot-machine reel, blurred while moving, and the reels stop left to right. | big stats, prize / price reveals, "users today" | modern | light |
| Filling ring | `filling-ring.css` + `.js` | A ring fills to its value with an easing that slows near the end; the number counts up in step. | satisfaction score, progress, skill / spec stats | modern, trust | light |
| Rising bars | `rising-bars.css` + `.js` | Bars grow up from the baseline one after another, each value label counting as its bar rises. | results, growth, comparison sections | modern, editorial-news, trust | light |
| Line draw | `line-draw.css` | A chart line draws itself left to right, the area under it fades in, and the last point pulses. | growth stories, investor / fintech pages, case-study results | modern, editorial-news, trust | light, CSS only |
| Odometer | `odometer.css` + `.js` | A counter that ticks up steadily; only the digits that change roll, like a car mileage dial. | live counters: orders, downloads, trees planted | modern, catalog | light · overlaps `count-up.js`: prefer that unless this exact look is wanted |
| Live sparkline | `live-sparkline.css` + `.js` | A small live chart that slides left as new values arrive, with a pulsing "now" dot and the current value. | status pages, live metrics, trading / energy dashboards on a landing page | modern | light |
