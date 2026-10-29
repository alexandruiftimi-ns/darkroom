# Studio Reeve · small architecture practice portfolio
<!-- Darkroom example 046 · fictional brand · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `astro` | landing + project pages | `art-gallery` + `editorial-news` | `animated` | none | `reveal.js` |

## Say this
> /darkroom a portfolio site for our architecture practice on Astro and Cloudflare. Projects first, big photos, plans and sections as drawings, very little text, a project index as a list. Each project gets its own page.

## Build spec

### Brief & signature
Studio Reeve is three architects in Edinburgh working on house extensions, small schools and one bothy; 14 built projects. Visitors are private clients and competition juries. Feeling: rigorous, light, built. **Signature:** the home page is a project index as a table (year · project · place · type · status) where hovering a row shows its key photo in a fixed frame and the row's plan drawing as a thin SVG line overlay on the photo. **Supporting:** project pages as image sequences with captions in mono, generous white, mask reveals.

### Stack & files
Astro with content collections (`src/content/projects/*.md`: title, year, place, type, status, photos, plan.svg); `src/pages/index.astro`, `src/pages/projects/[slug].astro`; Cloudflare Pages adapter-free static output (`platforms/astro.md`); `reveal.js`.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Hanken Grotesk | 500 | headings (an OFL stand-in for the paid grotesks architects favour) |
| Labels | IBM Plex Mono | 400 | table, captions |

### Tokens
```css
:root { --ground: #ffffff; --ink: #121212; --ink-50: #12121280; --line: #1212121f; --plan: #d23b2b;
  --display: "Hanken Grotesk", system-ui, sans-serif; --mono: "IBM Plex Mono", ui-monospace, monospace; --ease-out: cubic-bezier(.22,1,.36,1); }
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| key photos ×14 | the practice's photography (NEEDS 1) | `<img>` 3:2, 1600 px | cover | swap on row hover | grey box with project name | exteriors in overcast light, people only as scale |
| plans ×14 | their CAD exported to SVG, simplified (NEEDS 2) | inline SVG, 1 px `--plan` strokes | contain over photo at 30 % opacity | fades in with the photo | none | ground-floor plan only, no text layers |

### Nav
56 px: "Studio Reeve" Display 500 16 px; Projects · Practice · Contact (mono 13 px).

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| H1 | Studio Reeve is an architecture practice in Edinburgh. | Display 500, clamp(28px, 3vw, 44px) | 1.15 / −0.01em | ink | columns 1–6, top 14 vh | none |
| Index | 14 rows: 2027 · Bothy at Glen Feshie · Cairngorms · Shelter · On site | Mono 400, 14 px; project name Display 500 22 px | 1.3 | ink; hover row ink, others ink-50 | columns 1–7, starting 32 vh | rows reveal |
| Frame | key photo + plan | 3:2, columns 8–12 | — | — | sticky top 14 vh | crossfade 300 ms |

The opening screen is the index itself: the photo frame shows the latest project until a row is hovered.

### Sections
Project page: title, facts row in mono (client, area m², completion, photographer credit), then 8–14 images full-width or in pairs with captions; plan, section and elevation drawings at full width on white; next/previous project.

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Index rows | load / in view | `i × 40 ms` | 500 ms | `--ease-out` | opacity 0 → 1 |
| Frame swap | row hover / focus | 0 | 300 ms | `cubic-bezier(.4,0,.2,1)` | opacity 0 → 1 |
| Project images | in view | 0 | 800 ms | `--ease-out` | clip-path inset(8% 0 0 0) → inset(0) |
Reduced motion: no clip reveals; swaps without fade.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Index | rows show year + name + place; tap opens the project | + type | all columns + sticky frame | same |
| Frame | hidden; thumbnails inline | hidden | sticky | sticky, 60 vh |

### Acceptance
**First viewport:** at 1440 × 900 a white page with one plain sentence about the practice, then a mono table of 14 projects on the left and a large photo on the right with a thin red plan drawn over it; hovering a row swaps both. At 390 × 844 a compact list of projects with small thumbnails.
**Do not:** add a hero slideshow; use more than one accent (red is only for plans); write "award-winning" without the award; hotlink images from a CMS.
