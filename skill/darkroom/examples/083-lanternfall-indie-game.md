# Lanternfall · an indie game's launch page
<!-- Darkroom example 083 · fictional game · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `nextjs` | landing | `artsy` + `cinematic` | `hero-effect` | layered parallax (medium) | `pointer-tilt.js`, `reveal.js` |

## Say this
> /darkroom a launch page for our indie game: a hand-painted world with layers that move a little with the mouse, the trailer, wishlist buttons, screenshots, and a press kit link. It should feel like the game, not like a tech site.

## Build spec

### Brief & signature
Lanternfall is a hand-painted puzzle adventure about a girl carrying the last lantern down a mountain at night; PC and Switch, spring 2028. Visitors are players from trailers and journalists. Feeling: storybook, nocturnal, tender. **Signature:** the key art separated into five painted layers (sky, far peaks, pines, path with the girl, foreground snow) that shift with the pointer (±6 px to ±28 px by depth, lerp .12), with the lantern's glow a radial gradient that follows her; on phones the layers drift with device-free scroll parallax only. **Supporting:** a click-to-play trailer, platform wishlist buttons, a screenshot strip.

### Stack & files
Next.js App Router; `components/Parallax.tsx` (adapts `recipes/pointer-tilt.js` to translate per layer by `data-depth`); `components/Trailer.tsx` (poster + play button; loads the video only on click; captions track); press kit as a zip in `public/press/`.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | IM Fell English | 400, 400 italic | title, headings (storybook) |
| Text | Mulish | 400, 700 | UI |

### Tokens
```css
:root { --ground: #0a1020; --ink: 40 40% 92%; --ink-60: hsl(var(--ink) / .6); --lantern: #ffb347; --snow: #dfe8f5; --line: hsl(var(--ink) / .14);
  --display: "IM Fell English", Georgia, serif; --text: "Mulish", system-ui, sans-serif; }
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| key art layers ×5 | the studio's art, exported per layer with alpha (NEEDS 1) | `<img>` WebP per layer, 2600 px | cover, 50 % 60 % | pointer parallax | the flattened key art | painted night mountain, the girl small on the path at 40 % x, lantern glow; sky top 35 % empty for the title |
| trailer | the studio's trailer with captions (NEEDS 2) | `<video controls preload="none" poster>` | contain | click to play | link to the trailer page | — |
| screenshots ×6 | game captures | `<img>` 16:9 | — | reveal | — | — |

### Nav
60 px over the sky: game logo (SVG, supplied); Trailer · Screens · Press; wishlist buttons in the hero only.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| Title | Lanternfall | Display 400, clamp(56px, 10vw, 168px) | 0.9 / 0 | snow | centred in the sky, top 12 vh | fade 1.2 s |
| Tagline | Carry the last light down the mountain. | Display 400 italic, 24 px | 1.4 | ink-60 | under the title | delay 300 ms |
| Wishlist | Wishlist on Steam · Wishlist on Nintendo eShop | Text 700, 15 px; lantern fill / 1 px outline | — | — | under tagline | delay 500 ms |
| Release | Spring 2028 · PC and Nintendo Switch | Text 400, 14 px | — | ink-60 | bottom-centre | none |

Store names are used only as link labels to the real store pages (TEMP until pages exist).

### Sections
Trailer (16:9, captions), About (60 words), Screenshots (scroll-snap strip of 6), Press kit (zip, fact sheet, contact), Newsletter (one field), footer with rating info when available.

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Layers | pointermove | — | per frame | lerp .12 | translate depth × (−6…−28 px) |
| Glow | pointermove | — | per frame | lerp .1 | follows the girl, ±12 px |
| Screens | in view | `i × 80 ms` | 600 ms | ease-out | opacity |
Reduced motion: flattened key art, no parallax.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Layers | scroll-linked drift ±12 px, no pointer | pointer | pointer | pointer |
| Title | 52 px | 120 px | 168 px | 120 px |
| Wishlist | stacked full width | inline | inline | inline |

### Acceptance
**First viewport:** at 1440 × 900 a painted night mountain with a tiny girl and her lantern glow on the path; moving the pointer shifts the snow, pines and peaks at different depths; the storybook title and tagline in the sky with two wishlist buttons. At 390 × 844 the title and buttons over the painting, layers drifting gently on scroll.
**Do not:** autoplay the trailer; use a generic tech font; load the trailer before it is clicked; claim awards or ratings that do not exist.
