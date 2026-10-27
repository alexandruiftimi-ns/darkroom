<p align="center"><img src="assets/knowledge.svg" alt="139 real site designs that inspired it (96 good, 43 bad), 28 cross-site lessons with 12 promoted to rules, 32 research sources, 6 design tools, 63 automated checks, one human art director" width="100%"></p>

# Where Darkroom's knowledge comes from

**Darkroom is not a trained model.** No neural network was trained or fine-tuned. Darkroom is a set of written playbooks, notes and small scripts that Claude reads while it works. Everything it "knows" is in plain files in [`skill/darkroom/`](skill/darkroom/) that you can open, check and change. This page lists what went into those files.

| | What | Where it lives in the skill |
|---|---|---|
| [Real websites](#1-real-websites-that-inspired-it) | 139 site designs: 96 good examples, 43 bad ones, searchable by technique | `library/` (one short written entry per site) |
| [Lessons](#2-lessons-drawn-from-them) | 28 patterns seen across several sites; 12 promoted to rules | `library/LESSONS.md`, then `references/` |
| [Research](#3-research-and-standards) | 32 sources: usability research, accessibility standards, EU law, award criteria | `references/sources.md` |
| [Other tools](#4-other-design-tools-studied) | 6 open design skills and tools, read for principles only | `references/provenance.md` |
| [Test pages](#5-test-pages-built-with-it) | 4 pages built end to end to find what broke | `examples/`, the test suite |
| [Human input](#6-human-input) | the author's taste calls, dislikes, approvals and assets | everywhere |

---

## 1. Real websites that inspired it

Darkroom draws inspiration from these designs. What each one does well or badly (first impression, type, colour, how much text, where the eye goes, desktop and phone) is written up in Darkroom's own words (thesis, first frame, signals, what to steal, what to avoid). **No screenshots, code, images or text from these sites ship with the skill.** Entries are evidence, not templates: Claude is told never to reproduce a listed site's layout, imagery or copy.

Honest limits: award winners are a biased sample (they reward spectacle, not conversion or accessibility); several Awwwards listings could not be re-verified; a few sites could not be reviewed in full and have lower-confidence entries.

<details>
<summary><b>Good: 52 Awwwards sites</b> (28 Sites of the Day, the rest nominees and honourable mentions)</summary>

| Site | Category | Recognition |
|---|---|---|
| [Emotion Agency](https://emotion-agency.com/) | agency | Awwwards SOTD + Developer Award |
| [Mille Dollars](https://milledollars.fr/) | agency | Awwwards SOTD + Developer Award |
| [Neutomni](https://neutomni.com/) | agency | Awwwards SOTD + Developer Award |
| [Overworld Audio](https://overworldaudio.com/) | agency | Awwwards SOTD + Developer Award |
| [Signal-A Studio](https://signal-a.studio) | agency | Awwwards SOTD + Developer Award |
| [TWKS](https://twks.ch/en) | agency | Awwwards SOTD + Developer Award |
| [Two-Do](https://twodo.design) | app-marketing | Awwwards nominee |
| [LPAS Architecture + Design](https://lpas.com/) | architecture | Awwwards SOTD + Developer Award |
| [Banham](https://www.banham.co.uk/) | corporate | Awwwards nominee / HM (listing not verified) |
| [Cominvi](https://www.cominvi.com.mx/) | corporate | Awwwards SOTD + Developer Award |
| [ESR Bespoke](https://www.esrbespoke.au/) | corporate | Awwwards SOTD + Developer Award |
| [Forge Automotive](https://forgeautomotive.co.uk/) | corporate | Awwwards SOTD + Developer Award |
| [Fox Valuations](https://foxvaluations.com.au) | corporate | Awwwards nominee / HM (listing not verified) |
| [iCapital](https://www.icapital.es/en/) | corporate | Awwwards nominee / HM (listing not verified) |
| [idealworks](https://www.idealworks.com/) | corporate | Awwwards nominee / HM (listing not verified) |
| [Sincro](https://sincro.es/en/us/) | corporate | Awwwards nominee |
| [FORUM Cases](https://forumcases.com/) | e-commerce | Awwwards nominee / HM (listing not verified) |
| [The Fried Egg](https://www.thefriedegg.com/) | editorial | Awwwards nominee / HM (listing not verified) |
| [Colonia Zacamil](https://coloniazacamil.com/) | events-culture | Awwwards SOTD + Developer Award |
| [OFFF Forum](https://www.offforum.com/) | events-culture | Awwwards SOTD 2026-10-16 |
| [Edolus](https://edolus.com/) | experimental | Awwwards SOTD + Developer Award |
| [Pegassi](https://ascension.pegassi.be/) | experimental | Awwwards SOTD + Developer Award |
| [The Tie Break (New Balance × Miu Miu)](https://thetiebreak.merci-michel.com/) | experimental | Awwwards SOTD + Developer Award |
| [Almada Label](https://almadalabel.com/) | fashion-luxury | Awwwards nominee / HM (listing not verified) |
| [Deadly Ponies](https://www.deadlyponies.com/ (assumed, not verified)) | fashion-luxury | Awwwards nominee / HM (listing not verified) |
| [Odyssée Clinic](https://www.odysseeclinic.com.au/) | fashion-luxury | Awwwards SOTD + Developer Award |
| [Délice](https://delice.ca/) | food-drink | Awwwards nominee / HM (listing not verified) |
| [Santioni Spirits](https://santionispirits.com/) | food-drink | Awwwards SOTD + Developer Award + Business & Services Honors |
| [Theobroma Chocolat](https://theobromachocolat.com/) | food-drink | Awwwards nominee |
| [KEY](https://key.co/) | hospitality | Awwwards nominee / HM (listing not verified) |
| [Schlosshotel Kitzbühel](not recorded (no study.json)) | hospitality | Awwwards nominee |
| [Tengile MalaMala Collection](https://tengilemalamala.com/) | hospitality | Awwwards SOTD + Developer Award |
| [Terreno Barrio Hotel](https://www.terrenohotel.com/) | hospitality | Awwwards nominee |
| [Velaa Private Island](https://www.velaaprivateisland.com/) | hospitality | Awwwards HM (2026-09-25) |
| [Villa Aurelia](https://hotelaurelia.online/) | hospitality | Awwwards HM (2026-09-25) |
| [Later](https://later.com/made-you-look/) | landing-page | Awwwards nominee |
| [Brandon Yasin](https://brandonyasin.com) | portfolio | Awwwards SOTD + Developer Award |
| [Huy Phan (HUYML)](https://huyml.co/) | portfolio | Awwwards SOTD + Developer Award + No-code Honors |
| [Jesper Landberg](http://jesperlandberg.com) | portfolio | Awwwards SOTD + Developer Award + Portfolio Honors |
| [Maria Vasilyeva](https://www.mariavasilyeva.com/) | portfolio | Awwwards SOTD + Developer Award |
| [Meer Mohsin](https://www.meermohsin.me/) | portfolio | Awwwards SOTD + Developer Award |
| [Aevion LiDAR Drone (Riotters tech demo)](https://drone.riotters.com/) | product-launch | Awwwards SOTD + Developer Award + Product Honors |
| [Belgrade Arbor](https://belgradearbor.rs/en) | real-estate | Awwwards SOTD 2026-10-17 |
| [Lenval Properties](https://lenvalproperties.com) | real-estate | Awwwards nominee |
| [Mejuma Tuscany](https://mejuma-tuscany.com/) | real-estate | Awwwards nominee |
| [Realevate](https://realevate.agency/) | real-estate | Awwwards SOTD + Developer Award |
| [Rialto Melbourne](https://rialto.com.au/) | real-estate | Awwwards nominee |
| [Butter](https://www.butter.video/) | saas | Awwwards SOTD + Developer Award |
| [Heron AI](https://heronaiapp.com/) | saas | Awwwards SOTD + Developer Award |
| [Jimo](https://jimo.ai/product/ai) | saas | Awwwards nominee / HM (listing not verified) |
| [PinReply](https://pinreply.com/) | saas | Awwwards nominee |
| [Serus](https://serus.ai/) | saas | Awwwards nominee |

</details>

<details>
<summary><b>Good: 14 Dribbble concept mockups</b> (design shots, not live sites; used for composition and colour only)</summary>

| Site | Category |
|---|---|
| [Paytree (Pandi Atuk)](https://dribbble.com/shots/22007440-Finance-Mobile-App-Landing-Page-with-Illustrations) | app-marketing |
| [Solarius medtech dashboard (HALO LAB)](https://dribbble.com/shots/19419939-Medtech-platform-dashboard-analytics-UX) | dashboard |
| [BEGG (tubik concept)](https://dribbble.com/shots/16937609-Egg-Products-Ecommerce-Website) | e-commerce |
| [Wattashirt (Eloqwnt concept)](https://dribbble.com/shots/27832628-Wattashirt-Website) | e-commerce |
| [Monetone annual report (Sebo)](https://dribbble.com/shots/18889326-Monetone-s-Annual-Report) | editorial |
| [Givenchy concept (LAIN)](https://dribbble.com/shots/24134849-Givenchy-Luxury-Fashion-House-Responsive-Website-Landing-Page) | fashion-luxury |
| [Jil Sander concept (LAIN)](https://dribbble.com/shots/24217202-Jil-Sander-Luxury-Fashion-Shop-Minimalist-Website-Home) | fashion-luxury |
| [Grand Emily Hotel (Afterglow)](https://dribbble.com/shots/20891256-Grand-Emily-Hotel-Website) | hospitality |
| [Renaissance Paris concept (Olha Lazarieva)](https://dribbble.com/shots/25790691-Renaissance-Hotel-Website-Design) | hospitality |
| [Shock (HALO LAB concept)](https://dribbble.com/shots/18571089-Landing-Page-for-Consumer-Brand) | landing-page |
| [Per Appelgren portfolio (Shakuro)](https://dribbble.com/shots/27824051-Website-Design-for-Fashion-and-Beauty-Photographer-Per-Appelgren) | portfolio |
| [FourWays e-bike (Conceptzilla concept)](https://dribbble.com/shots/27824722-E-commerce-Website-Design) | product-launch |
| [Rift (HALO LAB concept)](https://dribbble.com/shots/27821980-Website-for-a-AI-Analytics-Platform-Rift) | product-launch |
| [Agenda (OOZE concept)](https://dribbble.com/shots/19561471-product-page-web-design) | saas |

</details>

<details>
<summary><b>Bad: 18 counter-examples</b> from colorlib's "bad website examples" list</summary>

These are used to recognise problems (clutter, font soup, scattered text, competing colours), not to mock anyone. Several are deliberate art pieces or utility-first sites that work for their audience; the entries say so.

| Site | Category |
|---|---|
| [Berkshire Hathaway](https://www.berkshirehathaway.com/) | corporate |
| [Tag Team Signs](https://www.tagteamsigns.com/) | corporate |
| [Yale School of Art](https://www.art.yale.edu/) | corporate |
| [Arngren](https://arngren.net/) | e-commerce |
| [Blinkee](https://blinkee.com/) | e-commerce |
| [Craigslist](https://craigslist.org/) | e-commerce |
| [Ling's Cars](https://www.lingscars.com/) | e-commerce |
| [Pacific Northwest X-Ray](http://www2.pnwx.com/) | e-commerce |
| [Drudge Report](https://drudgereport.com/) | editorial |
| [Goodreads](https://www.goodreads.com/) | editorial |
| [Hacker News](https://news.ycombinator.com/) | editorial |
| [Suzanne Collins](https://www.suzannecollinsbooks.com/) | editorial |
| [Yahoo](https://www.yahoo.com/) | editorial |
| [Life Action Revival](http://lifeactionrevival.org/) | experimental |
| [Real Ultimate Power](https://realultimatepower.net/) | experimental |
| [The Big Ugly Website](http://thebiguglywebsite.com/) | experimental |
| [Lipton (US)](https://www.lipton.com/us/en/home.html) | food-drink |
| [Toronto Cupcake](https://www.torontocupcake.com/index.html) | food-drink |

</details>

<details>
<summary><b>Good: 30 scroll-era sites</b> (added 2026-10-27: Sites of the Year, Sites of the Day, scroll-storytelling picks, and five sites the author moved from "bad" to "good")</summary>

Chosen for scroll animation, frame sequences, pinned chapters and memorable motion. Each entry also carries technique tags, so Darkroom can find "a site that does frame scrubbing well" and the recipe that builds it.

| Site | Category | Recognition |
|---|---|---|
| [Apple AirPods Pro](https://www.apple.com/airpods-pro/) | product-launch | The archetype product page |
| [Firewatch](https://www.firewatchgame.com/) | product-launch | Classic layered-parallax hero |
| [Lunarwheel](https://lunarwheel.it/) | product-launch | scrollytelling.ai "27 best" list |
| [Rivian R2](https://rivian.com/r2) | product-launch | Author pick |
| [Seasats](https://www.seasats.com/) | product-launch | Awwwards Site of the Day, Sep 2026 |
| [Linear](https://linear.app/) | saas | Widely cited modern SaaS reference |
| [Poly](https://poly.app/) | saas | scrollytelling.ai "27 best" list |
| [Shopify Editions Winter '26](https://www.shopify.com/editions/winter2026) | saas | scrollytelling.ai "27 best" list |
| [Lando Norris](https://landonorris.com/) | portfolio | Awwwards Site of the Year 2025 |
| [Mat Voyce](https://matvoyce.tv/) | portfolio | Awwwards Site of the Day |
| [Active Theory](https://activetheory.net/) | agency | Top WebGL studio |
| [basement.studio](https://basement.studio/) | agency | Cited cinematic benchmark (DappaSol) |
| [Immersive Garden](https://immersive-g.com/) | agency | Awwwards Agency of the Year 2025 |
| [Iventions](https://iventions.com/) | agency | Awwwards Site of the Day + Developer Award |
| [Lusion](https://lusion.co/) | agency | Awwwards Site of the Year 2023 |
| [Obys](https://obys.agency/) | agency | Cited editorial-motion benchmark |
| [Ribbit](https://ribbit.dk/) | agency | Author pick |
| [Uncommon Design Group](https://uncommondesign.group/) | agency | Awwwards Site of the Day + Developer Award + FWA |
| [Unseen Studio 2025](https://2025.unseen.co/) | agency | scrollytelling.ai "27 best" list |
| [Apple iPhone hub](https://www.apple.com/iphone/) | e-commerce | Author pick (moved from bad to good) |
| [DJI](https://www.dji.com/global) | e-commerce | Author pick (moved from bad to good) |
| [Pangram Pangram Foundry](https://pangrampangram.com/) | e-commerce | Awwwards Site of the Year 2021 |
| [Petralithe](https://petralithe.com/en) | e-commerce | scrollytelling.ai "27 best" list |
| [Mana Yerba Maté](https://en.manayerbamate.com/) | food-drink | Awwwards Site of the Year 2023 |
| [iCOMAT](https://icomat.co.uk/) | corporate | scrollytelling.ai "27 best" list |
| [Inversa](https://inversa.com/) | corporate | scrollytelling.ai "27 best" list |
| [A24 (concept by Ravi Klaassens)](https://a24.raviklaassens.com/) | events-culture | Awwwards Site of the Day + Developer Award, Oct 2026 (unofficial concept) |
| [Porsche Motorsport](https://racing.porsche.com/) | events-culture | scrollytelling.ai top example |
| [Awards Racing](https://awards.racing/) | experimental | Awwwards Site of the Day + Developer Award, Oct 2026 |
| [Igloo Inc](https://www.igloo.inc/) | experimental | Awwwards Site of the Year 2024 |

</details>

<details>
<summary><b>Bad: 25 more counter-examples</b> (added 2026-10-27: published "bad website" lists and scroll-storytelling sites, each confirmed by the author)</summary>

Only problems that cost visitors something are recorded (content behind a gate, unreadable text, no idea what is sold, a broken phone layout). Several of these have striking ideas; the entries say what is still worth borrowing.

| Site | Category |
|---|---|
| [Don't Board Me](https://dontboardme.com/) | landing-page |
| [Headhunter Hairstyling](https://www.headhunterhairstyling.com/) | landing-page |
| [AVATR Vision](https://vision.avatr.com/) | product-launch |
| [Crypto.com](https://crypto.com/) | app-marketing |
| [Minh Pham](https://minhpham.design/) | portfolio |
| [YesNo](https://yesnowww.com/) | agency |
| [Best Electronics (Atari)](https://www.best-electronics-ca.com/) | e-commerce |
| [Gates and Fences](https://gatesnfences.com/) | e-commerce |
| [TäbyPressen](https://www.oilpress.com/) | e-commerce |
| [Märker Bowling](https://www.bowling-pirschheide.de/) | hospitality |
| [BRUTØ](https://www.brutodenver.com/) | food-drink |
| [The Wolf's Tailor](https://www.thewolfstailor.com/) | food-drink |
| [Water on Wheels](https://wateronwheelz.com/) | food-drink |
| [Bidwells: Driving Innovation at Speed](https://www.bidwells.co.uk/insights-reports-events/driving-innovation-at-speed/) | editorial |
| [Edward Abbey](https://www.abbeyweb.net/) | editorial |
| [HuffPost Highline: Poor Millennials](https://highline.huffingtonpost.com/articles/en/poor-millennials/) | editorial |
| [Sparkella](https://www.sparkella.com/) | editorial |
| [Accenture](https://www.accenture.com/en) | corporate |
| [Empire Metal Products](https://empiremetalproducts.com/) | corporate |
| [Industrial Painter](http://industrialpainter.com/) | corporate |
| [National Library of Greece](https://www.nlg.gr/?lang=en) | corporate |
| [NMG Group](https://nmg-group.com/) | corporate |
| [Condo London](https://www.condocomplex.org/london/) | events-culture |
| [The Room (movie)](https://theroommovie.com/) | events-culture |
| [Messenger (abeto)](https://messenger.abeto.co/) | experimental |

</details>

## 2. Lessons drawn from them

A pattern seen in **three or more** entries becomes a *candidate* lesson in [`library/LESSONS.md`](skill/darkroom/library/LESSONS.md), with its evidence listed. A candidate only becomes a rule after the author approves it. 12 have been promoted so far. Examples:

- Colour lives in the media; the interface stays ink + ground + at most one accent (→ `references/color.md`).
- The first frame must survive without JavaScript, WebGL or a loader.
- Recompose for phones; don't squeeze the desktop layout.
- Sound is always opt-in (→ `references/motion.md`).
- Awards do not mean accessible (→ `references/myths-and-facts.md`).

The "AI-made look" tells in [`references/tells.md`](skill/darkroom/references/tells.md) come from the bad examples plus practitioner write-ups on generic AI design.

## 3. Research and standards

Full list with links: [`references/sources.md`](skill/darkroom/references/sources.md). Highlights: the Awwwards jury criteria; Nielsen Norman Group research on how little people read and how they scan; W3C WCAG 2.2; the European Accessibility Act and EN 301 549; EDPB guidance on cookie banners; the Omnibus 30-day price rule; EU rules on dark patterns; the EU AI Act's labelling duty; a German court ruling on remote Google Fonts; Vercel's interface guidelines; GSAP and Playwright documentation.

**Platform documentation (checked 2026-10-26, re-checked live before every build):** Shopify theme architecture, layouts and theme blocks; WordPress theme structure and the `theme.json` v3 reference; WooCommerce's block-theme templates (block names from WooCommerce's own templates, markup written fresh); Ghost theme structure and helpers; the Astro and Cloudflare deployment guides; Next.js static exports and Vercel's Hobby plan terms; Hugo's directory structure and its 0.146 template system; Jekyll and GitHub Pages limits. Each profile in [`platforms/`](skill/darkroom/platforms/README.md) lists its links. The starters were then run through the platforms' own validators: Shopify Theme Check, Ghost's gscan, and WordPress + WooCommerce in WordPress Playground with the Site Editor's block validation.

## 4. Other design tools studied

Read for principles, then rewritten in Darkroom's own words and code; **no code or substantial text was copied**. Details, licences and what was rejected: [`references/provenance.md`](skill/darkroom/references/provenance.md).

| Tool | Principle taken |
|---|---|
| taste-skill v2 | inventory the subject first; the competitor test; asset ladder with provenance; capturing scroll scenes |
| Impeccable | surface modes (persuade / operate / read); look at the render before calling it done |
| Emil Kowalski's design skills | the decision order for motion: should it animate, how often, can it be interrupted |
| UI UX Pro Max | design knowledge as queryable data |
| REA (reverse-engineer-anything) | observed vs inferred; keep the evidence |
| Anthropic `frontend-design` | the idea comes from the subject; spend the boldness in one place |

## 5. Test pages built with it

Each build exposed gaps that became fixes or tests: **NorthShutter** (an AR headset concept, scroll-scrubbed hero film, lens dive), **Porsche 911 Turbo S** (unofficial concept, frame-sequence film and configurator), **Forno Cinco** (a fictional bakery, no assets at all), **Halden Kiln** (a fictional ceramics studio, scroll-driven kiln firing; in [`examples/`](examples/)). The 41-check test suite in [`tests/`](tests/) grew from what went wrong on them. Examples: text contrast measured from pixels, because a colour check passed text that was 5 % visible; and the scroll pass, because fade-in text hid problems from the audit.

## 6. Human input

Darkroom was directed by its author, acting as client and creative director while Claude did the research, writing and coding. Their input shaped it directly:

- **The goal and the scope.** "$10k-looking" single landing pages, made autonomously. The human only makes taste calls, supplies facts and assets, and approves spend. Single pages only: no shops, blogs or apps.
- **Approve before build.** No guessed looks: show options and get a yes. This became the checkpoints (look + motion, direction, slice, final).
- **Dislikes became audit checks.** Font soup → the font-budget check. Text scattered so the eye jumps around → reading zones and eye travel. Brochure-length copy → word budgets. A rigid 60-30-10 colour rule when colour was asked for → the `expressive` colour mode.
- **Curating the library.** Full entries for Awwwards Sites of the Day, short ones for the rest. Every colorlib site counted as bad. Each lesson that became a rule was approved by hand; the font budget was raised from 2 to 3 after review.
- **Assets for the test pages.** The concept images and hero films for NorthShutter and the Porsche concept, and the mockups and banner in this README.
- **Reviews.** Commissioned independent reviews of the skill, and chose which findings to act on and which disagreements to keep.
- **The front door and modes.** A plain-language conversation for non-designers; brand looks ("like Apple"), on-scroll animations and scroll stories as separate choices; starting only from `/darkroom`.
