# Static HTML (`static`)

Checked on: 2026-10-26 against the docs below.

## Choose it when
A landing page, portfolio, menu, event or small business site that must be fast, cost nothing to host, and be editable by anyone who can open a file. No server, no database, no build step.

## Official docs to check before building
- https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits
- https://developers.cloudflare.com/workers/static-assets/
- https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-legacy-plans/ (or the current pricing page: plans changed to credits in 2025)

## Ask before building
- Will it sell or advertise a business? (GitHub Pages forbids running an online business or shop on it; Cloudflare and Netlify allow it.)
- A contact form: a mail link, a form service (Formspree, Netlify Forms, Cloudflare + Worker), or switch to `php`?
- A domain they own, or the free subdomain (`*.pages.dev`, `*.github.io`, `*.netlify.app`)?

## What Darkroom delivers
`index.html`, `404.html`, `css/site.css` (all tokens), `js/site.js`, `assets/`. More pages are more `.html` files sharing the stylesheet. Start with `darkroom platform scaffold static`.

## Where the design goes
`:root` in `css/site.css`. Recipes: copy `reveal.js` / `reveal.css` (and the scrub recipes) into `js/` and `css/`.

## Preview and capture
`darkroom capture <folder>` serves it over http itself. No other tool needed.

## Deploy and free hosting
- **Cloudflare** (recommended for a business): Workers & Pages → upload the folder, or connect the Git repo. Free tier, generous bandwidth, custom domain.
- **GitHub Pages:** push to a repo, Settings → Pages → deploy from branch. Free for public repos, 1 GB site, about 100 GB/month soft bandwidth, **not for an online business or shop**.
- **Netlify:** drag the folder onto the dashboard. Free plan has monthly credit limits; check current terms.
- Any shared host: upload by FTP into `public_html/`.

## Gotchas
- Relative links only (`css/site.css`, not `/C:/…`); the structure check catches broken ones.
- A project site on GitHub Pages lives under `/repo-name/`: root-relative links (`/css/…`) break there. Use relative links.
- No secrets in the files: everything is public.
