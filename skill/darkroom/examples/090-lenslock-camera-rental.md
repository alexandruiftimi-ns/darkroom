# Lenslock · camera and lens rental
<!-- Darkroom example 090 · fictional business · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `nextjs` | catalog | `catalog` + `modern` | `calm` | none | — |

## Say this
> /darkroom a fast catalog site for our camera rental shop on Next.js: 400 items, filters by mount and type, a day-rate calculator, availability, and kit lists for common shoots. Clean and technical, like a good spec sheet.

## Build spec

### Brief & signature
Lenslock rents 400 cameras, lenses, lights and audio kits from a Berlin warehouse to photographers and film crews; day rates € 8–420. Visitors are crews building a kit list for a shoot. Feeling: exact, efficient, trustworthy. **Signature:** a kit builder: any item has "Add to kit"; a side panel collects the kit, asks for the shoot dates once, and shows the per-day and total price with the weekend rule ("Fri pick-up, Mon return = 1 day") and each item's availability for those dates; the kit can be shared as a link. **Supporting:** a spec-sheet table on each item, filters as checkboxes with counts, no motion.

### Stack & files
Next.js App Router with static generation for 400 item pages from `data/items.json`; `app/catalog/page.tsx` (filters in the URL); `components/KitPanel.tsx` (state in the URL, so a kit link reopens it); availability from the rental system's API at request time (ask which), with a "checking…" state and a clear error.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | IBM Plex Sans | 600 | headings |
| Text | IBM Plex Sans | 400 | UI |
| Data | IBM Plex Mono | 400 | specs, prices |

### Tokens
```css
:root { --ground: #f7f7f6; --card: #ffffff; --ink: #161616; --ink-60: #16161699; --signal: #ff5a1f; --ok: #198754; --line: #1616161a;
  --text: "IBM Plex Sans", system-ui, sans-serif; --mono: "IBM Plex Mono", ui-monospace, monospace; }
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| item photos ×400 | the warehouse's own (NEEDS 1) | `next/image` 1:1 640 px | contain on white | static | item name on a grey tile | every item front three-quarter on white, same light, no reflections of the photographer |

### Nav
56 px: "LENSLOCK" Text 600 16 px +0.1em; Cameras · Lenses · Lights · Audio · Kits; search (always visible, 40 px); "Kit (3)" button opens the panel.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| H1 | Rent the kit, not the hassle. | Text 600, clamp(28px, 3.4vw, 48px) | 1.1 / −0.015em | ink | left, top 10 vh | none |
| Sub | 400 cameras, lenses, lights and audio kits, ready for pick-up in Kreuzberg from 08:00. | Text 400, 17 px | 1.5 | ink-60 | under H1 | none |
| Search | Search 400 items, e.g. "FX3" or "anamorphic" | input 56 px, Mono placeholder | — | — | under sub, columns 1–8 | — |
| Quick kits | Interview · Documentary · Product · Music video | chips 40 px | — | — | under search | — |

Rates and pick-up times TEMP until confirmed.

### Sections
Catalog (filter column: type, mount, brand, price per day with counts; grid of cards: photo, name, mount, "€ 45 / day", Add to kit), Item page (spec table in mono, what's in the case, deposit, availability calendar for 30 days, Add to kit), Kits (prebuilt lists), How rental works (ID, deposit, insurance, weekend rule).

### Motion
None beyond 150 ms state changes: the panel slides in 240 ms (`cubic-bezier(.32,.72,0,1)`); instant under reduced motion.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Filters | a "Filters (2)" button opening a sheet | sheet | left column | left column |
| Kit panel | full-screen sheet | right 400 px | right 420 px | right |
| Grid | 2 columns | 3 | 4 | — |

### Acceptance
**First viewport:** at 1440 × 900 a light, technical page: a short promise, a big search field and four quick-kit chips; scrolling shows a filterable grid with day rates. Adding items opens a side panel that asks for dates once and shows availability and the exact total with the weekend rule. At 390 × 844 the search and chips first; filters and kit open as sheets.
**Do not:** show availability without checking; hide the deposit; use carousels; make the kit link depend on a login.
