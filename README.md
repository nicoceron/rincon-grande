# Regent Astro site

This repository contains the Regent hospitality template rebuilt as a maintainable Astro site. The home page is the captured standalone source at `/`; the captured internal destinations are also represented as normal Astro routes.

## Project structure

```text
src/
├── components/        Shared page and route components
├── data/              Captured route metadata
├── layouts/           Shared document shell
├── pages/             File-based Astro routes
├── scripts/           Focused browser behavior
└── styles/            Localized page styles
public/assets/         Localized fonts, images, videos, and posters
```

The linked destination pages are implemented as normal file-based Astro routes. Their section order, copy, local media, responsive compositions, and visible controls are represented in page-specific components under `src/components/`; the home route remains the standalone capture at `/`.

## Commands

```sh
npm install
npm run dev       # astro dev --background
npm run check
npm run build
npm run preview
```

The source-of-truth export and migration ledger live outside this repository at:

`/Users/ceron/Developer/Projects/framer-html-exporter/exports/regent-template-standalone.html`

`/Users/ceron/Developer/Projects/framer-html-exporter/exports/regent-template-export/ASTRO_MIGRATION_TRACKER.csv`
