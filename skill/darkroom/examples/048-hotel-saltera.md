# Hotel Saltera · 22-room hotel on a salt marsh
<!-- Darkroom example 048 · fictional brand · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `nextjs` | landing + rooms | `luxury` + `nature` | `animated` | none | `reveal.js` |

## Say this
> /darkroom a website for our small hotel on the salt marshes near Cádiz on Next.js. Quiet and spacious, rooms with photos and prices, the restaurant, and a Check availability button that goes to our booking engine.

## Build spec

### Brief & signature
Hotel Saltera has 22 rooms in a restored salt-worker's estate in the marshes of the Bay of Cádiz; a restaurant serves fish from the salinas. Visitors are couples choosing between three hotels. Feeling: quiet, bleached, saline. **Signature:** an editorial rhythm of wide horizontal photographs separated by thin tide lines: each section ends on a 1 px line with the tide time of a fixed day ("Low tide 07:42") in small caps, like a marsh logbook; the page ground shifts from morning white to evening sand. **Supporting:** room cards with real prices from the booking engine (or TEMP), slow mask reveals, a sticky availability bar.

### Stack & files
Next.js App Router, static export: `app/page.tsx`, `app/rooms/[slug]/page.tsx` from `content/rooms.json`; availability button links to the hotel's booking engine with dates as URL parameters (ask which engine); `reveal.js`.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Cormorant Garamond | 300, 300 italic | headings |
| Text | Jost | 300, 400 | body, UI |

### Tokens
```css
:root { --ground: #f8f6f1; --ink: #23221f; --ink-60: #23221f99; --salt: #ffffff; --ochre: #b8834a; --line: #23221f26;
  --display: "Cormorant Garamond", Georgia, serif; --text: "Jost", system-ui, sans-serif; --ease-out: cubic-bezier(.22,1,.36,1); }
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| marsh panorama | the hotel's photographer (NEEDS 1) | `<img>` 2800 × 1200 | cover, 50 % 60 % | mask reveal | ground + "photo coming" TEMP | white salt pans and the estate's low buildings at dawn, wide, horizon at 40 %; sky pale enough to sit near `#f8f6f1` |
| rooms ×6 | own | `<img>` 3:2 | — | reveal | TEMP | each room with the window and the marsh |
| restaurant ×2 | own | `<img>` 4:5 | — | reveal | TEMP | a plate of grilled corvina; the terrace at dusk |

### Nav
72 px: "Saltera" Display 300 italic 28 px; Rooms · Restaurant · The marsh · Getting here · ES/EN; "Check availability" ink 1 px border, radius 0, Jost 400 14 px +0.08em caps.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| H1 | Twenty-two rooms between the salt and the sky. | Display 300, clamp(40px, 5.6vw, 92px) | 1.02 / −0.01em | ink | centred above the panorama, top 16 vh, max 16ch | fade 1.2 s |
| Panorama | — | full width, 50 vh | — | — | under the H1 | clip-path inset(0 12% 0 12%) → inset(0), 1.4 s |
| Tide line | Low tide 07:42 · Bay of Cádiz | Text 400, 12 px +0.16em caps | 1 | ink-60 | under the panorama on a 1 px line | none |

### Sections
Rooms (six cards: name, size m², sleeps, "from € 210 a night incl. VAT" from the engine or TEMP), Restaurant (two photos, 50 words, hours), The marsh (birds, salt harvest, walks; 80 words), Getting here, footer. Each section closes on a tide line. Sticky bottom bar on scroll past the hero: dates + "Check availability".

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Panorama | load | 300 ms | 1400 ms | `--ease-out` | clip-path inset 12 % → 0 |
| Room cards | in view | `i × 100 ms` | 900 ms | `--ease-out` | mask open + opacity |
| Ground | scroll | — | linear | — | `#f8f6f1` → `#efe4d2` |
Reduced motion: panorama full width, ground fixed.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Panorama | 4:5 crop on the buildings | 16:9 | 50 vh | 44 vh |
| H1 | 36 px | 64 px | 92 px | 72 px |
| Sticky bar | full width, button only | dates + button | dates + button | — |

### Acceptance
**First viewport:** at 1440 × 900 a pale page; a thin serif sentence centred near the top; below it a wide photo of white salt pans that opens from the middle; a tide time on a hairline under it. At 390 × 844 the sentence, then a tall crop of the estate.
**Do not:** use a full-screen video; show prices not from the engine as live; add a newsletter pop-up; book through a fake form.
