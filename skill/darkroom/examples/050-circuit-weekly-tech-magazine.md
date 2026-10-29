# Circuit Weekly · independent technology magazine
<!-- Darkroom example 050 · fictional publication · written 2026-10-28 · not built yet: values are Darkroom defaults, verify by building -->

| Platform | Surface | Look | Motion | Heavy technique | Recipes |
|---|---|---|---|---|---|
| `ghost` | editorial (home + article) | `editorial-news` | `calm` | none | — |

## Say this
> /darkroom a Ghost theme for our tech magazine: a dense newspaper-style home page with a lead story, sections, a most-read list and a newsletter box, and article pages that are really nice to read. Paid members get a weekly briefing.

## Build spec

### Brief & signature
Circuit Weekly publishes 15 reported pieces a week on chips, energy and software policy; 40,000 newsletter readers, 3,200 paid. Visitors arrive from search and social, read one piece, and should leave as subscribers. Feeling: informed, sharp, unhurried. **Signature:** a front page on a strict 12-column newspaper grid with column rules: the lead story spans 7 columns with a large serif headline, two secondary stories stack in 3 columns, and a "Most read" list in the last 2 columns numbered in big tabular figures. **Supporting:** article pages at 66ch with sidenotes in the margin on wide screens, a member-only briefing block, no motion.

### Stack & files
Ghost theme: `index.hbs` (uses `{{#get "posts" filter="featured:true" limit="1"}}` for the lead, tags for sections), `post.hbs` (footnotes → sidenotes via CSS at ≥ 1280 px), `partials/briefing.hbs` (`{{#if @member.paid}}`), `assets/css/screen.css`. gscan clean.

### Fonts
| Role | Family | Weights | Notes |
|---|---|---|---|
| Headlines | Newsreader | 600 (opsz 72) | `--gh-font-heading` |
| Text | Newsreader | 400, 400 italic | `--gh-font-body` |
| UI / labels | IBM Plex Sans Condensed | 500, 600 | section labels, meta |

### Tokens
```css
:root { --ground: #fdfcf9; --ink: #121212; --ink-60: #12121299; --rule: #12121233; --signal: #c8102e;
  --gh-font-heading: "Newsreader", Georgia, serif; --gh-font-body: "Newsreader", Georgia, serif; --ui: "IBM Plex Sans Condensed", system-ui, sans-serif; }
```
Ghost accent colour → `--signal` for section labels and the subscribe button only.

### Assets
| Slot | Source | Element | Fit / focal | Behaviour | Fallback | Art direction |
|---|---|---|---|---|---|---|
| feature images | each post's own (editors) | `{{img_url feature_image size="l"}}` with Ghost image sizes | 3:2 | static | no image: headline-only layout | — |

### Nav
Masthead: date line (UI 500 12 px caps) · "Circuit Weekly" Headlines 600 clamp(36px, 5vw, 64px) centred · "Subscribe" signal button; section bar below on a 1 px rule: Chips · Energy · Policy · Software · Briefing; search icon (Ghost search).

### Hero
| Element | Copy | Font / size | Leading / tracking | Colour | Position | Motion |
|---|---|---|---|---|---|---|
| Lead headline (h2; the masthead is h1 on home) | the featured post's title | Headlines 600, clamp(32px, 3.6vw, 56px) | 1.05 / −0.015em | ink | columns 1–7 | none |
| Lead dek | custom excerpt | Text 400 italic, 20 px | 1.45 | ink-60 | under headline | none |
| Lead image | feature image | 3:2 | — | — | above headline, columns 1–7 | none |
| Secondary ×2 | titles | Headlines 600, 26 px | 1.15 | ink | columns 8–10 | none |
| Most read | 1–5 numbered | numbers Headlines 600 40 px tabular, signal; titles UI 600 16 px | 1.25 | ink | columns 11–12 | none |
Column rules: 1 px `--rule` between column groups.

### Sections
Section blocks (one per tag): label in UI 600 13 px caps signal, 4 stories in a row; the newsletter box after the second section (one field, visible label, Ghost Portal); footer with masthead credits and corrections policy.
**Article:** headline 48 px, dek, byline, date; body 20 px/1.6 at 66ch; pull quotes italic 30 px with a top rule; sidenotes in the right margin ≥ 1280 px, numbered footnotes below that; the paid briefing block replaced by a sign-up box for non-members.

### Motion
| Element | Trigger | Delay | Duration | Easing | From → to |
|---|---|---|---|---|---|
| Links | hover / focus | 0 | 120 ms | linear | underline from transparent to ink |
Calm: no other motion.

### Responsive
| Element | < 640 | ≥ 768 | ≥ 1024 | max-height 720px |
|---|---|---|---|---|
| Front grid | single column: lead, secondaries, most read | 2 columns | 12-col newspaper | same |
| Sidenotes | footnotes | footnotes | footnotes; margin at ≥ 1280 | — |

### Acceptance
**First viewport:** at 1440 × 900 a newspaper front page: centred serif masthead with date line and red subscribe button, a section bar on a rule, then a lead story with image and big headline across seven columns, two smaller stories, and a numbered Most read list, all separated by thin column rules. At 390 × 844 the masthead compact, the lead story first.
**Do not:** animate anything; use cards with shadows; break `{{ghost_head}}`/`{{ghost_foot}}`; show paid content to free members; put the newsletter in a pop-up.
