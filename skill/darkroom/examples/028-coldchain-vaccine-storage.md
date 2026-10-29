# Coldchain North · pharmaceutical cold storage and transport
<!-- Darkroom example 028 · fictional brand · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `nextjs` | landing (fixed first stage) | `cinematic` + `trust` | `hero-effect` | none | `reveal.js` |

## Say this
> /darkroom a dark, very restrained landing page for our pharmaceutical cold storage company: a full-screen loop of frosted racks in a freezer hall, silver-white type, white pill buttons, no cards, no glow, no purple. Then a few short sections about temperatures and audits.

## Build spec

### Brief & signature
Coldchain North stores and moves vaccines and biologics at −80 °C to +8 °C from three GDP-licensed hubs in Finland and Sweden. Visitors are pharma supply-chain buyers and quality auditors. Feeling: cold, controlled, accountable. **Signature:** a fixed full-screen loop of a deep-freeze hall, frost on steel racks, slow dolly forward; over it a live-looking but plainly labelled temperature readout "−80.0 °C" in silver tabular numerals that settles from −79.4 to −80.0 once on load. **Supporting:** silver ink, white pill buttons, hairline sections.

### Stack & files
Next.js App Router, static export; `app/page.tsx`; `components/Readout.tsx` (count to the value once, `aria-live="off"`, real value in HTML); CSS modules; `reveal.js` client module.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Manrope | 300, 500 | headline 300 |
| Figures | Manrope | 300 tabular | readout |

### Tokens
```css
html, body { background: #050607; }
:root { --ground: #050607; --silver: #d9dee3; --ink-60: #d9dee399; --ink-40: #d9dee366; --white: #ffffff; --line: #d9dee31f;
  --display: "Manrope", system-ui, sans-serif; --ease-out: cubic-bezier(.22,1,.36,1); }
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| freezer hall | filmed at a hub with permission, or generated (NEEDS 1) | `<video muted loop playsinline autoplay poster>` fixed behind the first stage | cover, 50 % 50 % | fade loop | poster | a long aisle of frosted steel racks under cold white light, mist at floor level, slow dolly forward, no people, no labels readable; left 45 % darker racks; edges fall to `#050607` |

### Nav
72 px: geometric mark (two stacked chevrons, SVG 22 px) left; Services · Hubs · Quality · Contact (Manrope 500 13 px, +0.04em, ink-60); CTA "Talk to quality" white pill, ground text, 40 px tall.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| Readout | −80.0 °C | Display 300, clamp(56px, 9vw, 150px), tabular | 0.9 / −0.04em | silver | left gutter, top 20 vh | −79.4 → −80.0 once, 1.6 s |
| Label | Hall 2, Vantaa · sample reading | Manrope 500, 12 px +0.1em caps | 1 | ink-40 | above readout | fade |
| H1 | Cold, kept and recorded. | Display 300, clamp(36px, 4.4vw, 68px) | 1.0 / −0.03em | silver | under readout | rise 16 px |
| Sub | GDP-licensed storage and transport from −80 °C to +8 °C, with every degree logged and auditable. | Display 300, 18 px | 1.5 | ink-60 | under H1, max 440 px | delay 150 ms |
| CTAs | Talk to quality · See our hubs | white pill / 1 px silver outline pill, 15 px 500 | — | — | under sub | delay 250 ms |

All licences, hub cities and temperature ranges are TEMP until confirmed by the client's quality team.

### Sections
After the fixed stage, content scrolls over a solid ground: **Ranges** (four temperature bands in a hairline table), **Hubs** (three cities with capacities), **Audits** (what an auditor gets: data logger exports, SOP list), **Contact**.

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Readout | load, once | 300 ms | 1600 ms | ease-out | −79.4 → −80.0 |
| Hero text | load | `i × 100 ms` | 700 ms | `--ease-out` | 16 px, 0 → 0, 1 |
| Rows | in view | `i × 60 ms` | 500 ms | `--ease-out` | opacity 0 → 1 |
Reduced motion: readout shows −80.0 at once, poster still.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Readout | 52 px | 110 px | 150 px | 110 px |
| Stage | 100svh, video 62 % 50 % | 100svh | 100svh | 100svh, sub hidden |

### Acceptance
**First viewport:** at 1440 × 900 a misty aisle of frosted racks recedes slowly; on the left a large silver "−80.0 °C" settles once, the headline and two pill buttons beneath it; nothing glows. At 390 × 844 the readout and headline fill the top half over the darker racks.
**Do not:** present the readout as live data; use cards, glow, gradients or purple; show recognisable client packaging; claim licences that are not confirmed.
