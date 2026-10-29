# Low Tide Records · independent label and vinyl shop
<!-- Darkroom example 094 · fictional label · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `shopify` | landing + catalog | `bold` + `artsy` | `animated` | none | `reveal.js` |

## Say this
> /darkroom a Shopify store for our small record label: new releases on vinyl with the sleeve big, a record that slides out of its sleeve when you hover, listen to a track preview, pre-orders, and the artists. Loud, colourful, fun.

## Build spec

### Brief & signature
Low Tide Records presses 12 releases a year (indie, dub, folk) in runs of 300–500; € 24–32 per LP; shipped from Bristol. Visitors are collectors and fans. Feeling: loud, analogue, joyful. **Signature:** on every release card the vinyl slides 40 % out of the sleeve on hover (pointer) or on focus, spinning slowly while out, and a 30-second preview plays only when the visitor presses the play button on the label; the coloured vinyl variant is shown on the disc. **Supporting:** sleeve art carries the colour on a black ground, a pre-order badge with the ship month, bold condensed type.

### Stack & files
Shopify OS 2.0; product metafields `custom.vinyl_colour`, `custom.preview_url` (an MP3 hosted in Shopify Files), `custom.ships` (month); `snippets/release-card.liquid`, `assets/vinyl.js` (one `<audio>` shared, play/pause, stops others), `assets/vinyl.css`.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Bebas Neue | 400 | artist and title |
| Text | Space Mono | 400 | catalogue numbers, prices |

### Tokens
```css
:root { --ground: #0d0d0d; --ink: #f4f1ea; --ink-60: #f4f1ea99; --tide: #3ec1d3; --line: #f4f1ea1f;
  --display: "Bebas Neue", Impact, sans-serif; --mono: "Space Mono", ui-monospace, monospace; }
.disc { background: radial-gradient(circle, var(--vinyl, #111) 0 30%, #000 30.5% 31%, var(--vinyl, #111) 31.5%), repeating-radial-gradient(circle, #ffffff08 0 1px, transparent 1px 3px); border-radius: 50%; }
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| sleeves | the releases' artwork (NEEDS 1, artists' permission) | Shopify product image 1:1 | cover | static | catalogue number on tide colour | flat scans, no mock-up shadows |
| discs | drawn in CSS (`.disc`) with the vinyl colour | div 92 % of sleeve | — | slides out + rotates | black disc | label centre shows the sleeve's dominant colour |
| previews | MP3 30 s per release (NEEDS 2) | shared `<audio>` | — | user-started | none | — |

### Nav
64 px: "LOW TIDE" Display 28 px; Releases · Pre-orders · Artists · Shop; cart; announcement "Free UK shipping on 2+ records" (TEMP).

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| H1 | New on Low Tide: HARBOUR LIGHTS — "Salt Dub" | Display 400, clamp(48px, 8vw, 140px) | 0.9 / 0 | ink | left, columns 1–6 | rise 20 px |
| Meta | LTR-031 · LP, sea-green vinyl · 500 copies · ships March | Mono 400, 14 px | 1.5 | ink-60 | under H1 | fade |
| CTAs | Pre-order · € 28 · ▶ Play a preview | tide fill ground text / outline | — | — | under meta | — |
| Release | sleeve 520 px with the disc slid 40 % to the right, spinning 33⅓ rpm (1.8 s per turn) | — | — | — | columns 7–12 | slides out on load once, then on hover |

Release details TEMP.

### Sections
Releases grid (4 columns of release cards with the slide-out), Pre-orders (with ship months), Artists (cards linking to artist pages), About the label, Newsletter.

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Disc slide | hover / focus | 0 | 500 ms | `cubic-bezier(.22,1,.36,1)` | translateX(0 → 40%) |
| Disc spin | while out | — | 1.8 s per turn | linear | rotate 360° |
| Cards | in view | `i × 60 ms` | 600 ms | ease-out | 20 px, 0 → 0, 1 |
Reduced motion: disc shown half out, not spinning; previews still playable.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Grid | 2 columns, disc peeks 15 % out permanently (no hover) | 3 | 4 | — |
| Hero release | under the CTAs, 80 % width | right | right | right |

### Acceptance
**First viewport:** at 1440 × 900 a black page with the new release's artist and title in tall cream letters, mono catalogue details, a teal pre-order button and a play button; on the right the sleeve with a sea-green record sliding out and turning slowly. At 390 × 844 the title, buttons, then the sleeve with the record peeking out.
**Do not:** autoplay previews; use sleeves without permission; show sold-out pressings as available; play two previews at once.
