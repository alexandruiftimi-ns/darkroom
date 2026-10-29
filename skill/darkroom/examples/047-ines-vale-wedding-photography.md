# Ines Vale · wedding and elopement photographer
<!-- Darkroom example 047 · fictional person · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `jekyll` | landing + galleries | `art-gallery` + `luxury` | `animated` | none | `reveal.js`, `cursor-reveal.js` |

## Say this
> /darkroom a portfolio for my wedding photography, hosted free on GitHub Pages. Let the photos breathe, one story per wedding, and an enquiry form asking date and place. When you move over the main photo, a second photo from the same moment shows through.

## Build spec

### Brief & signature
Ines Vale photographs 25 weddings and elopements a year in Portugal and Galicia; documentary style, film and digital. Visitors are couples planning 12–18 months ahead. Feeling: tender, honest, sunlit. **Signature:** the hero pairs two frames shot a second apart (the vow, then the laugh); a soft 18vw circle under the pointer reveals the second (tap on phones), using `cursor-reveal.js`. **Supporting:** galleries as vertical stories with captions of place and time, a handwritten-free serif voice, mask reveals.

### Stack & files
Jekyll (`darkroom platform scaffold jekyll`): `_layouts/story.html`, `_stories/*.md` (front matter: couple first names with consent, place, month, photos), `_data/enquiry.yml`, `assets/js/cursor-reveal.js`, `assets/js/reveal.js`. Images resized with `darkroom media derive` before commit (GitHub Pages has no image pipeline).

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | Cormorant | 400, 400 italic | headings |
| Text | Mulish | 400 | body, form |

### Tokens
```css
:root { --ground: #f6f1ea; --ink: #2a2522; --ink-60: #2a252299; --sage: #7d8b6f; --line: #2a25221a;
  --display: "Cormorant", Georgia, serif; --text: "Mulish", system-ui, sans-serif; --ease-out: cubic-bezier(.22,1,.36,1); }
```

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| hero pair | two frames from one sequence (NEEDS 1) | base `<img>` + `[data-reveal-top]` | cover, identical crop | cursor reveal | the first frame | same camera position (burst), golden hour, couple at the right third, left half open field |
| stories ×8 | her galleries, 20–40 frames each | `<img>` srcset 640/1280/1920 | per frame | reveal | — | her own edit |

### Nav
64 px: "Ines Vale" Display 400 italic 24 px; Stories · Approach · Prices · Enquire.

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| H1 | The second after the vow. | Display 400, clamp(40px, 6vw, 96px) | 1.0 / −0.01em | `#fffaf3` | left gutter, bottom 14 vh, max 9ch | fade 900 ms |
| Sub | Weddings and elopements in Portugal and Galicia, photographed as they happen. | Text 400, 18 px | 1.5 | `#fffaf3cc` | under H1, max 380 px | delay 150 ms |
| CTA | Ask about your date | Text 400, 16 px, underline, `#fffaf3` | — | — | under sub | delay 250 ms |

Text shadow `0 2px 18px rgba(0,0,0,.42)` on all three; bottom-left scrim from `#2a2522aa` to transparent over 35 %.

### Sections
Stories (8 cards: one frame 4:5 + "Marta & João · Sintra · June"), Approach (80 words), Prices (three collections, from € 2,400; TEMP), Enquire (form: names, date, place, guest count, how you heard; sends to her form service; visible labels; a real confirmation).

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Reveal circle | pointer | — | lerp .1 | recipe | radius 0 → 18vw |
| Story cards | in view | `i × 100 ms` | 800 ms | `--ease-out` | mask open |
| Story frames | in view | 0 | 600 ms | `--ease-out` | opacity 0 → 1 |
Reduced motion: click toggles the second frame; no following.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Hero | portrait crop of the pair, couple centred, tap reveal | landscape | landscape | landscape |
| H1 | 38 px | 64 px | 96 px | 72 px |

### Acceptance
**First viewport:** at 1440 × 900 a golden-hour frame of a couple at the right third; moving the pointer reveals the laugh a second later through a soft circle; the serif line bottom-left. At 390 × 844 a portrait crop, tapping reveals the second frame.
**Do not:** use couples' full names or faces without consent; use a slideshow; compress below what keeps skin tones clean (check 1:1); hotlink from a gallery service.
