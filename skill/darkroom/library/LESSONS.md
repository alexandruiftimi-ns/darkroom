# Cross-site lessons

**Design first.** A great design with minor flaws is still a great reference: visitors judge a site by how it looks and whether it works, not by a pixel or a missing skip link. Entries record only failures that cost visitors something, with a severity (medium, high or critical): content behind a gate, text you can't read, no idea what is sold, a page that breaks on phones, a wait long enough to leave. Low-severity polish is left out on purpose, and it never turns a good design into a bad example. Use bad entries to avoid their serious mistakes, not to reject a bold idea.

Patterns seen in **≥ 3 library entries**. Frequency supports a hypothesis, it does not prove transfer: the sample is award and dribbble sites (selection bias), a site is not wholly good or bad, and nothing here is evidence of conversion or usability. Only lessons marked **promoted** are rules; **candidate** lessons are prompts to think, never loaded as rules. Each lesson lists its evidence so it can be checked or retired. Lessons with enough evidence may be promoted into a style pack or `references/tells.md` — only with the maintainer's approval (`/darkroom learn` step 4).

Format:

```
## <lesson in one line>
- Applies to: <packs or "all">
- Evidence: good/<slug>, good/<slug>, bad/<slug>
- Rule: <do / don't, measurable where possible>
- Status: candidate | promoted → <file>, YYYY-MM-DD | contested by <slug>
```

## Colour lives in the media; the UI stays ink + ground + at most one accent
- Applies to: all (strongest in luxury, cinematic, modern)
- Evidence: good/twks, good/milledollars, good/odyssee-clinic, good/edolus, good/lidar-drone-scanning, good/forge-automotive, good/brandon-yasin, good/esr-bespoke, good/ascension-pegassi, good/cominvi, good/jesper-landberg, good/butter, good/almada-label, good/deadly-ponies, good/forum-cases, mockups good/givenchy-concept-lain, good/jil-sander-concept-lain, good/per-appelgren-portfolio, good/grand-emily-hotel, good/fourways-ebike · counter-example bad/blinkee (five competing colour systems)
- Rule: when photography, footage or the work carries saturation, UI colour is ground + one ink. If there is an accent, it has one job (action), ideally taken from the product (good/rialto LED blue, good/theobroma packaging lime, good/mejuma-tuscany, good/sincro, good/neutomni; mockups good/monetone-annual-report, good/rift-terrain-analytics, good/begg-liquid-egg). Never a second button hue.
- Status: promoted → references/color.md, 2026-10-25

## Close the page on the wordmark at display scale
- Applies to: all
- Evidence: good/terreno-hotel, good/esr-bespoke, good/neutomni, good/signal-a-studio, good/almada-label, good/fried-egg-golf, good/deadly-ponies, good/forum-cases, good/mejuma-tuscany, good/sincro, good/theobroma, good/lenval-properties · 2026-10-27: good/iventions (the cropped mark opens and closes the page), good/seasats, good/basement-studio, good/uncommon-design-group
- Rule: in brand-led pages (hospitality, fashion, agency, product launch) the footer may end on the brand mark at near full width instead of another link block; dense or task-led sites keep the directory. One closing image, live text or SVG with an accessible name.
- Status: promoted → references/reading-paths.md rule 9, 2026-10-27

## The first frame must survive without JS, WebGL or a loader
- Applies to: cinematic, artsy, experimental (any site with a preloader, gate or canvas hero)
- Evidence: good/edolus, good/tengile-malamala, good/santioni-spirits, good/twks, good/lidar-drone-scanning, good/later-made-you-look, good/mejuma-tuscany, good/colonia-zacamil, good/jesper-landberg, good/the-tie-break, good/forge-automotive, good/overworld-audio, good/maria-vasilyeva, good/huy-phan · 2026-10-27: good/immersive-garden does it right (a typeset loading frame with one line of copy); good/active-theory and bad/messenger-abeto show nothing without WebGL; good/rivian-r2 and bad/accenture open on an empty box while video loads
- Rule: ship an instant poster frame and a live h1 in the HTML; the loader/gate may sit over it, never replace it. Canvas/WebGL cores need an HTML fallback. Over a third of the award winners here opened on an empty first frame. That suggests a loading risk; test the real first frame on a throttled profile.
- Status: promoted → references/tells.md, 2026-10-25

## Text must not depend on media loading
- Applies to: all
- Evidence: good/banham, good/fried-egg-golf, good/fox-valuations, good/jimo, good/key-co, good/forum-cases, bad/lipton, bad/the-big-ugly-website, bad/suzanne-collins
- Rule: give copy its own ground or scrim; reserve every media box with `aspect-ratio` and a poster colour; no reveal that leaves a blank band if it fails; no hotlinked images.
- Status: promoted → references/tells.md, 2026-10-25

## White overlay text on bright footage fails contrast
- Applies to: cinematic, luxury, nature
- Evidence: good/odyssee-clinic, good/tengile-malamala, good/milledollars, good/lidar-drone-scanning (measured ~1.0–1.6:1)
- Rule: check overlay copy against the lightest frame of the video, not the poster; add a local scrim or move the copy to a calm zone. ≥ 4.5:1 body, ≥ 3:1 large.
- Status: candidate

## An award verdict says nothing about accessibility or compliance
- Applies to: all
- Evidence: good/signal-a-studio, good/overworld-audio, good/huy-phan, good/neutomni, good/heron-ai, good/lpas, good/maria-vasilyeva (no h1/lang, unnamed controls, pre-consent trackers), good/brandon-yasin, good/emotion-agency (no reduced-motion rule), good/butter, good/colonia-zacamil (trackers before consent)
- Rule: cite library entries for art direction only; always run `audit` and `comply` regardless of what the reference did.
- Status: promoted → references/myths-and-facts.md, 2026-10-25

## One overlay at a time, never over the first frame
- Applies to: all
- Evidence: good/later-made-you-look, good/serus, good/schlosshotel-kitzbuehel, good/pinreply, good/lenval-properties, good/butter, good/idealworks, bad/lipton, bad/yale-school-of-art, bad/yahoo, bad/tag-team-signs
- Rule: consent, newsletter, voucher, chat and accessibility widgets never stack; consent first layer is compact (≤ 25 % of the phone viewport) with equal-weight reject; marketing modals wait until after real engagement.
- Status: promoted → references/tells.md, 2026-10-25

## Name who and what in the first frame
- Applies to: all
- Evidence: bad/lipton, bad/real-ultimate-power, bad/tag-team-signs, bad/yahoo, bad/yale-school-of-art, bad/berkshire-hathaway, bad/hacker-news, bad/life-action-revival, bad/drudge-report · good counterparts good/forge-automotive, good/offfforum (one sentence)
- Rule: one live-text h1 of ≤ 8 words that names the offer, above or beside the focal image, before any other copy.
- Status: promoted → references/tells.md, 2026-10-25

## Show the thing sold (or the real task) in the first frame
- Applies to: all; strongest in saas, e-commerce, food-drink, hospitality
- Evidence: good/serus (prompt box), good/pinreply, good/two-do, good/heron-ai, good/delice (visit/book/order bar), good/key-co (search), good/realevate (entry price under the claim), good/terreno-hotel (booking bar) · bad/tag-team-signs, bad/toronto-cupcake, bad/lipton
- Rule: the hero shows the product, the product's interaction, or the visitor's actual task — not packaging, a paragraph or a type stack.
- Status: candidate

## The buy/book control sits next to the thing it buys
- Applies to: e-commerce, food-drink, hospitality, catalog
- Evidence: good/theobroma, good/forum-cases (price under name), good/terreno-hotel · bad/suzanne-collins, bad/toronto-cupcake, bad/lipton
- Rule: action directly under each product image or hero claim; no retailer list in the footer, no lone central button far from the products.
- Status: candidate

## Comparable items share one card anatomy
- Applies to: catalog, luxury, editorial, real-estate
- Evidence: good/almada-label, good/banham, good/delice, good/deadly-ponies, good/forum-cases, good/fried-egg-golf, good/key-co, good/mejuma-tuscany
- Rule: same crop ratio and photo treatment; name/meta/price in fixed slots on every card.
- Status: candidate

## Re-compose for phones; don't shrink or drop
- Applies to: all
- Evidence: good/jesper-landberg (3D → card list), good/cominvi, good/colonia-zacamil · bad/tag-team-signs (590 px overflow), bad/the-big-ugly-website, bad/toronto-cupcake, bad/berkshire-hathaway, bad/drudge-report, bad/life-action-revival · good-but-flawed good/huy-phan, good/maria-vasilyeva, good/overworld-audio (identifying text dropped on mobile)
- Rule: design and test at 390 px; spatial devices become one column with the same labels; the active item's name and role stay under its image.
- Status: promoted → references/reading-paths.md rule 8, 2026-10-25

## At most 3 text zones in the first viewport
- Applies to: all
- Evidence: good/signal-a-studio, good/neutomni, good/huy-phan (clock, cities, status chips push it over 3) · bad/yahoo (7 zones)
- Rule: clocks, locations, "open for work" chips and tickers go to the footer or nav, not beside the hero claim.
- Status: candidate

## Sound is opt-in, and the silent path is equal
- Applies to: cinematic, artsy, experimental
- Evidence: good/overworld-audio, good/maria-vasilyeva, good/huy-phan, good/emotion-agency
- Rule: ask before playing; "enter without sound" has the same size, contrast and position weight as "with sound"; the choice is remembered and toggleable.
- Status: promoted → references/motion.md, 2026-10-25

## Page weight: winners are often heavy, and it's a flaw, not a licence
- Applies to: cinematic, experimental
- Evidence: good/esr-bespoke (55.9 MB), good/edolus (49 MB), good/brandon-yasin (16.4 MB), good/emotion-agency (10.4 MB) · contrast bad/hacker-news (6 KB), bad/drudge-report (54 KB) — their faults are structure, not weight · 2026-10-27: bad/avatr-vision (62 MB), good/mat-voyce (32 MB), good/immersive-garden (21 MB), bad/empire-metal-products (21 MB), good/awards-racing (20 MB); good/lunarwheel blocks phones for seconds with live WebGL that a pre-rendered sequence would replace
- Rule: poster first, responsive image sizes, video and frames after first interaction or consent; budget the first view (≤ ~1.5 MB) before the cinematic payload.
- Status: candidate

## Label at the left edge, statement from ~50 %
- Applies to: luxury, editorial-news, nature
- Evidence: good/odyssee-clinic, good/twks, good/tengile-malamala
- Rule: a small label in the left column and the statement starting at the centre line (indented first line optional) can be the whole section system.
- Status: candidate

## One item lit, the rest dimmed — but still legible
- Applies to: modern, cinematic
- Evidence: good/odyssee-clinic, good/lidar-drone-scanning, good/milledollars
- Rule: mark the active item by ink, weight, size or position. Inactive items that are selectable stay at normal-text contrast (4.5:1; 3:1 for large text) and keyboard-reachable; only genuinely disabled items may fall below (good/odyssee-clinic drops to ~10 % opacity — don't).
- Status: candidate

## Scroll may change state in a fixed viewport — if native scroll still drives it
- Applies to: artsy, experimental, portfolio
- Evidence: good/huy-phan, good/maria-vasilyeva, good/heron-ai
- Rule: keep every field in a fixed slot; wheel, keyboard and touch all advance it; provide a list view / skip link.
- Status: candidate

## Display type and hero image form one object
- Applies to: luxury, bold, editorial-news, cinematic
- Evidence: good/colonia-zacamil (footage set as a word in the headline), good/realevate (photo inside the marquee), good/butter (charms over the H1), mockups good/givenchy-concept-lain, good/jil-sander-concept-lain, good/begg-liquid-egg, good/rift-terrain-analytics
- Rule: let the image cut into, sit inside or interlock with the display word so the first frame is one focal object, not a headline zone beside a picture zone. Keep the h1 live text and fully readable (good/realevate hides it — don't).
- Status: promoted → references/reading-paths.md rule 7, 2026-10-25

## The signature layout device comes from the subject
- Applies to: all
- Evidence: good/belgrade-arbor (tree-trunk facade), good/heron-ai (drawing sheet), good/milledollars (viewfinder HUD), good/santioni-spirits (pilgrimage comic), good/terreno-hotel (neighbourhood colour fields), mockups good/rift-terrain-analytics (crosshair grid), good/begg-liquid-egg (spill edge), good/paytree-app (forest)
- Rule: derive the one repeated primitive from what the product does or where it is; if the device would fit a competitor unchanged, it's decoration. Pairs with `references/tells.md` "Why removal isn't enough".
- Status: candidate

## The primary action is the hero's second line
- Applies to: hospitality, e-commerce, saas, app-marketing
- Evidence: good/terreno-hotel, good/realevate, good/delice, mockups good/grand-emily-hotel, good/shock-digital-clothing, good/agenda-calendar, good/paytree-app, good/wattashirt-try-on
- Rule: the booking bar / CTA / price sits directly under the claim on the same axis — the eye drops claim → action in one move; docked on mobile.
- Status: candidate

## One family, one big size jump
- Applies to: modern, editorial-news, trust
- Evidence: good/brandon-yasin (2 sizes), good/twks (one grotesk), mockups good/agenda-calendar, good/monetone-annual-report, good/renaissance-paris-hotel, good/wattashirt-try-on
- Rule: a single family with one ≥ 5× jump (display vs text) reads more designed than several mid sizes; ≤ 6 sizes on the page.
- Status: candidate

## Award sites often run three font families
- Applies to: typography rule in `references/typography.md`
- Evidence: good/terreno-hotel (4), good/almada-label, good/banham, good/delice, good/forum-cases, good/jimo (3–4 families, 9–27 sizes)
- Rule: budget 3 families with named roles (display, text, utility/wordmark); the craft is still in photography and grids. Four+, or two faces in one role, is a defect.
- Status: promoted → font budget raised to 3 (references/typography.md, templates, audit default, packs), 2026-10-25

## Never put a gate in front of the content
- Applies to: all; strongest in cinematic, experimental and portfolio pages
- Evidence: bad/avatr-vision (Enter the Experience), bad/dont-board-me (bounce a ball to enter), bad/minh-pham (START), bad/real-ultimate-power (YES/no) · counter-evidence: a sound on/off choice that also lets you scroll on (good/awards-racing, good/emotion-agency) is not a gate
- Rule: the page scrolls and sells with no click. Intros, games and sound choices sit over or beside the content and can be skipped by scrolling. Severity: high.
- Status: promoted → references/tells.md, 2026-10-27

## A long scroll story needs an arc: change the ground or the time of day per chapter
- Applies to: `story` and `hero-effect` pages, product launches, agencies
- Evidence: good/seasats (dawn → mint → sunset), good/iventions (a pastel per service), good/porsche-motorsport (red chapters), good/shopify-editions-winter-26 (one painted world, a new scene per chapter), good/uncommon-design-group (dark → light for the practical part) · counter-evidence: none found; short pages don't need it
- Rule: plan the colour of each chapter in the storyboard, not only its content; drive it with `recipes/scene-progress.js`. Keep text contrast on every ground.
- Status: candidate (2026-10-27)

## Pre-render the motion; live WebGL is a studio's choice, not a default
- Applies to: product launches and brand pages that want ScrollTide-level motion
- Evidence: good/seasats (511 pre-rendered frames, phone set, coarse-to-fine loading), good/ribbit (image-sequence clips), good/apple-airpods-pro (short videos) · versus good/lunarwheel (live 3D assembly, long blocking on phones), bad/highline-poor-millennials, bad/avatr-vision · counter-evidence: studio showreels (good/lusion, good/igloo-inc) where live 3D is the product
- Rule: if the camera path is fixed, render it once and ship frames (`recipes/scrub-frames.js`) or video (`recipes/scrub-video.js`); use live WebGL only when the visitor steers the scene.
- Status: candidate (2026-10-27)

## The default kit reads as no brand
- Applies to: saas, app-marketing, corporate
- Evidence: bad/crypto-com (navy gradient, phone mockup, Inter), bad/empire-metal-products (blue rounded cards, Poppins, chat bubbles), bad/nmg-group (stock towers) · counter-evidence: good/linear also uses Inter and a dark UI and looks designed, because real product screens, spacing and contrast carry it
- Rule: every page needs one owned device from its subject (bible). The font alone neither makes nor breaks it.
- Status: candidate (2026-10-27)
