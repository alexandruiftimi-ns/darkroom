# Hugo (`hugo`)

Checked on: 2026-10-26 against the docs below. Hugo **0.146** replaced the template system: no `layouts/_default/`, partials in `layouts/_partials/`, home template `layouts/home.html`. The starter uses the new layout.

## Choose it when
A blog, documentation, a portfolio with many projects, or any site with lots of content pages that must build in seconds. One binary, no Node required.

## Official docs to check before building
- https://gohugo.io/getting-started/directory-structure/
- https://gohugo.io/templates/new-templatesystem-overview/
- https://gohugo.io/host-and-deploy/
- https://github.com/gohugoio/hugo/releases (the newest release notes)

## Ask before building
- Is Hugo installed (`hugo version`)? If not, the user installs it (free, one binary) or the build runs only in CI.
- Content in Markdown: who writes it, and which sections (blog, projects, services)?
- Multilingual? Hugo does it natively; say so early.

## What Darkroom delivers
`hugo.toml`, `layouts/baseof.html`, `home.html`, `single.html`, `list.html`, `404.html`, `layouts/_partials/head.html`, `assets/css/site.css` (minified and fingerprinted through Hugo Pipes), `content/`, `static/`. Start with `darkroom platform scaffold hugo` (or `hugo new project <name>` and add these files).

## Where the design goes
`:root` in `assets/css/site.css`. Recipes: `static/recipes/` (served as is) or `assets/js/` through `resources.Get | js.Build`.

## Preview and capture
`hugo server` (port 1313), then `darkroom capture http://localhost:1313`. Without Hugo installed, say "not rendered" and check structure only.

## Deploy and free hosting
`hugo --minify` writes `public/`. Cloudflare (Workers static assets or Git integration with the Hugo build command), Netlify (set the Hugo version in `netlify.toml`), or GitHub Pages with the official Hugo Actions workflow.

## Gotchas
- `config.toml` still works, but the current name is `hugo.toml`.
- Pin the Hugo version in CI; template behaviour changes between releases.
- Themes from the Hugo catalogue have their own licences; Darkroom builds its own layouts instead.
