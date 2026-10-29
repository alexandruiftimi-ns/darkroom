# Closed site builders, and how platforms get added

## Wix, Squarespace, Webflow, Framer

These are visual editors: their sites are built inside the product, and there is no supported way to import a theme written as code. Darkroom does not pretend otherwise. When the user is on one of them, say so in one line and offer a **design kit** instead:

- the approved direction as captures (desktop + phone), the design bible (palette with hex values, fonts with fallbacks, type sizes, spacing, section order, copy);
- every asset, sized and named;
- what each builder allows as code: custom CSS (Squarespace, Webflow), custom code embeds (Webflow, Framer code components, Wix Velo), so small effects can be pasted in;
- or, if they want Darkroom to build it: move to `static` (free hosting) or `wordpress`.

## AI builders (Lovable, v0, Bolt, Cursor, Replit, Manus, AI Studio, Kimi)

These take a prompt, not a theme. Use the `prompt` platform (`platforms/prompt.md`): Darkroom does the design, writes `PROMPT.md` for that tool, checks it with `darkroom platform check --platform prompt`, and when the builder shows a preview URL, captures and audits it and writes one fix prompt per defect.

## Candidates considered (2026-10-26)

The bar for a new platform: used by millions of sites or developers, a documented way to build it as code, a way to preview it locally so Darkroom can look at it, and a job none of the current platforms does as well.

| Candidate | Verdict |
|---|---|
| Wix, Squarespace, Webflow, Framer | huge reach, but no code import: design kit (above) |
| Vite + React / Vue / Svelte (single-page app) | for apps more than sites; `nextjs` and `astro` cover the site cases |
| SvelteKit, Nuxt | real but smaller; Astro covers content sites, Next.js covers React apps. Revisit on demand |
| Eleventy | well loved, smaller user base; Hugo and Astro cover it |
| Drupal, Joomla | millions of legacy sites, few new builds; WordPress covers the CMS case |
| BigCommerce, Magento (Adobe Commerce) | real commerce platforms, mostly agency-run; Shopify and WooCommerce cover small shops |

Adding one: a profile `platforms/<id>.md` with the same headings as the others, an entry in `scripts/lib/platforms.mjs` (`PLATFORMS`, a checker, a scaffold or generator), the id in `scripts/lib/project.mjs`, a scaffold test in `tests/run-evals.mjs`, and a run of the platform's own validator.
