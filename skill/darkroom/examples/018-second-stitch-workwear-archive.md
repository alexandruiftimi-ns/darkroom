# Second Stitch · vintage workwear archive and resale
<!-- Darkroom example 018 · fictional brand · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `shopify` | landing + catalog | `bold` + `art-gallery` | `story` (two phases) | none | `scene-progress.js`, `reveal.js` |

## Say this
> /darkroom a Shopify home page for my vintage workwear archive. Video of jackets on a rail at the top, then as you scroll a black panel slides up over it and inside are photos of pieces scattered around that grow as they come into view. At the end a white screen with one Shop the archive button.

## Build spec

### Brief & signature
Second Stitch sells 1940s–80s chore coats, overalls and denim from a Leeds warehouse; each piece is one of one. Visitors are collectors and stylists. Feeling: archival, raw, curated. **Signature:** phase one is a full-bleed loop of a hand pushing jackets along a rail; scrolling slides a black panel up over it (`--p` 0 → 1 over 100vh), and inside the panel ten product photos sit at scattered grid positions and scale from .82 to 1 as each enters. The page ends on a white screen with one button. **Supporting:** a mono label system (lot numbers), no other motion.

### Stack & files
Shopify OS 2.0 theme; section `sections/archive-intro.liquid` (video setting, 10 product blocks with x/y/size settings), `assets/archive.js` (adapts `scene-progress.js` for the panel; IntersectionObserver for the tile scale), collection and product templates restyled.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Archivo | 800 (wdth 62) | condensed headings |
| Mono | Space Mono | 400 | lot numbers, prices |

### Tokens
```css
:root { --paper: #f2f0ea; --black: #0b0b0b; --ink: #f2f0ea; --rust: #c2532b; --line: #f2f0ea24;
  --display: "Archivo", Impact, sans-serif; --mono: "Space Mono", ui-monospace, monospace; --ease-out: cubic-bezier(.22,1,.36,1); }
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| rail loop | shop owner films it on a phone on a tripod (NEEDS 1) | `<video muted loop playsinline autoplay poster>` | cover, 50 % 45 % | loops until the panel covers it, then pauses | poster | a hand slides five faded jackets along a steel rail, warehouse light from the left, 8 s, locked camera; left 40 % shadowed brick |
| 10 pieces | Shopify product images on grey seamless | `image_url` 480/960 | 4:5 | scale on enter | product title only | flat-lay on `#d9d6cf`, same light for all |

### Nav
Fixed, mix-blend-mode difference so it reads on video, black panel and white end: "SECOND STITCH" Display 800 18 px; Archive · Lots · About; cart count in mono.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| H1 | Worn in. Not worn out. | Display 800, clamp(56px, 11vw, 190px) | 0.86 / −0.035em | paper | bottom-left, `bottom: 6vh` | none (the panel is the motion) |
| Lot label | Lot 0412 · French chore coat, 1956 · £ 240 | Mono 13 px tabular | 1.3 | paper 80 % | top-right under nav | swaps per featured product setting |
| Panel | — | `--black`, `border-radius: 32px 32px 0 0` | — | — | translateY((1 − p) × 100 %) over the hero | scroll-linked |
| Tiles ×10 | product title + price | Mono 12 px under each | — | paper 70 % | scattered: positions from block settings (e.g. col 2/5 row 1, col 8/11 row 2, …) | scale .82 → 1, opacity .4 → 1 on enter |
| End | One of one, every one. + Shop the archive | Display 800 64 px; button paper on black | — | black on paper | white screen, centred | fades in over the last 40vh |

### Interaction logic
`--p` = progress of the first 100vh of scroll. Video pauses when `--p` > .98. Tiles: IntersectionObserver with 9 thresholds sets `--s` per tile; scale = .82 + .18 × `--s`. Each tile links to its product; the panel is ordinary scrolling content (no pin), so keyboard and screen readers read it in order.

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Panel | scroll 0–100vh | — | linear | — | translateY(100 % → 0) |
| Tiles | intersection | — | follows ratio | linear | scale .82 → 1, opacity .4 → 1 |
| End screen | last 40vh | — | linear | — | background black → paper |
Reduced motion: no panel slide (the hero is followed by the grid), tiles at scale 1, video paused on the poster.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Tiles | 2 columns, alternate offsets of 24 px | 3 columns scattered | scattered 12-col | — |
| H1 | 56 px | 120 px | 190 px | 140 px |

### Acceptance
**First viewport:** at 1440 × 900 a dim warehouse loop of jackets sliding along a rail, the huge condensed headline bottom-left, a lot number top-right. Scrolling raises a black panel with rounded top corners over it; inside, ten pieces sit at uneven positions and grow as they arrive; the page ends on paper white with one button. At 390 × 844 the same sequence in two columns.
**Do not:** pin or hijack the scroll; use an invisible custom cursor; hard-code products (blocks pick them); show sold pieces as available; let the end screen hide the footer links.
