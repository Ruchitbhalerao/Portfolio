# Portfolio — Gouri Ashok Gargate

Static, build-free website. Open `index.html` in any browser — no server, bundler, or install step required.

## Project structure

```
.
├── index.html          # entire page markup (static sections + JS mount points)
├── robots.txt          # crawler directives served from the site root
├── sitemap.xml         # single-URL sitemap (placeholder domain — see below)
├── css/
│   ├── fonts.css       # local @font-face declarations for the three families
│   ├── style.css       # tokens, reset, component styles, desktop layout
│   ├── responsive.css  # breakpoint overrides (40rem / 48rem / 64rem / 80rem)
│   └── animations.css  # scroll-triggered flow reveal + reduced-motion guard
├── js/
│   ├── data.js         # site content (SITE_DATA) — edit this, not the markup
│   ├── components.js   # section renderers
│   ├── publications.js # publication type filter + search
│   ├── navigation.js   # mobile menu toggle
│   └── main.js         # boot sequence
└── assets/
    ├── favicon.ico
    ├── gouri-ashok-gargate.jpg  # hero portrait (301×402, 4:5 crop via CSS)
    └── fonts/          # self-hosted WOFF2 + OFL.txt — no external font requests
```

## How it works

- `index.html` holds the page shell. Every repeated list (metrics, publications, projects, courses, students, awards, …) is rendered from `js/data.js` into a placeholder element at load time.
- Scripts are classic `<script>` tags (no modules, no bundler), so the page works from `file://` as well as over HTTP.
- Styling is plain CSS with custom properties; breakpoints mirror the original design.
- Fonts are **self-hosted** in `assets/fonts/` and declared in `css/fonts.css`: Newsreader (roman + italic, variable optical sizing), IBM Plex Sans (variable), IBM Plex Mono (400/500). They are byte-identical to the WOFF2 files the Google Fonts CDN serves, so nothing is requested from any third party and the page renders identically offline. `font-display: swap` and the original serif/sans/mono fallback stacks are preserved.

## Editing content

Open `js/data.js` and edit the values — everything on the page follows from that file. The hero portrait and CV are the two exceptions: they are also driven from `professorProfile`, via `portraitUrl` / `cvUrl`. The portrait is set to `assets/gouri-ashok-gargate.jpg`; the CV is still `null`, so its tiles stay disabled until a PDF link is supplied.

## Running locally (optional)

```sh
python3 -m http.server 4173
```

Then browse to the address the server prints. Opening `index.html` directly with
the `file://` protocol works too and is how the site is verified.

Any static host works (GitHub Pages, Netlify, Vercel, S3). Upload the repository as-is.

## Before deploying

The site has no production domain yet, so three places use the clearly marked
placeholder `https://example.com`. Replace it with the real origin:

- `index.html` — `<link rel="canonical">`, `og:url`, and the `Person` JSON-LD `url`
- `sitemap.xml` — `<loc>`, and set `<lastmod>` to the deploy date
- `robots.txt` — the `Sitemap:` line

`index.html` carries a `TODO(REPLACE)` comment marking the metadata occurrences.

Everything else is deployment-ready as-is.