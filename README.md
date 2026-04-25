# What Donald Did...

A deployable static HTML data-portal prototype for visualising how a Hormuz/fertiliser shock can cascade into crop pressure and food-system risk.

## What this is

This is a **no-build static site**. It can be deployed by uploading the folder to any static host.

It includes:

- `index.html` — the main portal page
- `assets/css/styles.css` — the full visual design
- `assets/js/app.js` — scenario switching, map, charts and table rendering
- `assets/data/admin-risk-seed.json` — editable seed data for model outputs
- `assets/data/sources.json` — source registry
- `METHODOLOGY.md` — the estimation model and calculation chain

## Important editorial note

The title **"What Donald Did..."** is intentionally hard-hitting. The prototype keeps the quantitative content framed as scenario modelling unless backed by cited sources. Before publishing, replace demo values with model-generated estimates and add per-claim citations wherever the site refers to specific policy decisions, conflict events or legal responsibility.

## Deployment

### Option 1: Plain web server

Upload the contents of this folder to your web root.

### Option 2: GitHub Pages

1. Create a new repository.
2. Upload all files.
3. Go to **Settings → Pages**.
4. Serve from the `main` branch root.
5. Visit the generated GitHub Pages URL.

### Option 3: Plesk

1. Create or select the domain/subdomain.
2. Upload this folder’s contents to the document root.
3. No Node/npm/build step is required.

## Updating the data

The current UI reads seed data from `assets/js/app.js` for maximum deployment simplicity.

For a production pipeline, generate the same shape from:

- FAO GAUL or GADM administrative boundaries
- MapSPAM/SPAM crop production grids
- NPKGRIDS fertiliser application rates
- FAOSTAT fertiliser production/trade/use
- current urea/DAP/MAP/potash/diesel/gas price feeds
- custom country-level substitution, inventory and subsidy assumptions

Then either:

1. replace the `DATA` object in `assets/js/app.js`, or
2. refactor `app.js` to fetch `assets/data/admin-risk-seed.json`.

## Suggested next enhancements

- Real GeoJSON admin-area choropleth rather than stylised risk points.
- A data-ingestion script that computes lower/base/upper estimates.
- Per-region explainability pages.
- Source-linked claim cards.
- Country and crop filters.
- Timeline mode: `pre-shock`, `acute shock`, `planting`, `harvest`, `retail food inflation`.
# whatdonnydid
