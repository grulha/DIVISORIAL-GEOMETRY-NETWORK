# Divisorial Geometry Network — website

A static, five-page site: Home, Members, Publications, Seminars, Institutions.
Plain HTML/CSS/JS — no build step, ready for GitHub Pages.

## Structure

```
index.html            Home
members.html           Team, searchable/filterable by region
publications.html      Publications, grouped by status
seminars.html          Seminar series (template — no events pre-filled)
institutions.html      Map of the 12 partner institutions (Leaflet + CARTO tiles)
assets/style.css        Shared design system (light + dark mode via CSS variables)
assets/script.js        Shared header/footer injection, nav, dark-mode toggle
assets/logo.svg         Standalone copy of the mark (for favicons, social cards, etc.)
```

## Publish on GitHub Pages

1. Create a new repository (or use an existing one) and push these files to the
   repository root (or to a `/docs` folder — either works).
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Pick the branch (e.g. `main`) and the folder (`/ (root)` or `/docs`), then **Save**.
5. GitHub will publish the site at `https://<your-username>.github.io/<repo-name>/`
   within a minute or two.

No Jekyll configuration, npm install, or build command is required — everything
is plain static HTML/CSS/JS.

## Editing content

- **Navigation** lives in one place: the `PAGES` array at the top of
  `assets/script.js`. Add, remove, or reorder pages there and every page's
  header/footer updates automatically.
- **Members**: edit the `.member-card` blocks in `members.html`. Each card's
  `data-region` and `data-name` attributes drive the filter/search — keep
  `data-name` lowercase and include the institution acronym so search matches it.
- **Publications**: edit the `.pub-item` blocks in `publications.html`. Status
  pill classes: `status-published`, `status-submitted`, `status-prep`.
- **Seminars**: `seminars.html` ships as an empty template with a commented
  example block — duplicate it once a talk is confirmed.
- **Institutions map**: edit the `institutions` array inside the `<script>`
  block at the bottom of `institutions.html` (name, city, region, lat/lng,
  researcher).

## Notes

- Dark mode respects the visitor's OS preference on first visit, then
  remembers their explicit choice (stored in `localStorage`).
- Fonts (Fraunces / IBM Plex Sans / IBM Plex Mono) load from Google Fonts;
  the map tiles load from CARTO/OpenStreetMap — both need the site to be
  served over the internet (they won't load if you open the HTML files
  directly from disk with a strict offline setup, but work normally once
  published or served via any local dev server).
