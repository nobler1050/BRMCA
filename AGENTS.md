# Blue Ridge Mountain Civic Association (BRMCA) — Static Site

## Project Overview

A responsive static website for the Blue Ridge Mountain Civic Association, a 501(c)(4) civic organization in Clarke and Loudoun Counties, Virginia. Migrated from Wix to GitHub Pages to eliminate hosting costs.

### Technologies

- **HTML5** — semantic markup for all pages
- **CSS3** — custom styling via CSS variables, Flexbox, Grid, and media queries
- **JavaScript (Vanilla)** — shared header/footer injection and mobile menu toggle

### Architecture

The site uses a flat structure: individual HTML files per page, one shared stylesheet, and one shared JS file.

- **Header/Footer** — injected by `js/main.js` at runtime; edit `NAV_LINKS` in that file to update navigation on every page simultaneously
- **Navigation** — defined once in `NAV_LINKS`; supports top-level items and one level of dropdowns; responsive hamburger menu below 992px
- **PDF assets** — news documents and bylaws are self-hosted under `assets/docs/` using the naming convention `YYYY-MM-DD-slug.pdf`

## Directory Structure

```
/                   HTML pages (one per route)
css/style.css       Global stylesheet — all styles live here, no inline styles
js/main.js          Shared header, footer, nav injection
assets/
  images/           Logo, hero image, book cover, Raven Rocks photos
  docs/             Self-hosted PDFs (news items, bylaws)
```

## Pages

| File                | Purpose                                                     |
| ------------------- | ----------------------------------------------------------- |
| `index.html`        | Homepage — hero, welcome text, Irving quote                 |
| `about.html`        | Mission, org structure, bylaws download                     |
| `news.html`         | Dated news headlines linking to PDFs                        |
| `history.html`      | Bear's Den Historic District, TWA crash, Mountain Lore book |
| `conservation.html` | Conservation mission and partner organizations              |
| `firewise.html`     | Wildfire evacuation plan and Firewise program               |
| `membership.html`   | Membership info and CTA                                     |
| `get-involved.html` | Committee volunteer opportunities                           |
| `resources.html`    | Emergency contacts, utilities, county services, recycling   |
| `contact.html`      | Officer/director directory and contact form                 |

## Running Locally

No build step required. Open `index.html` directly in a browser, or use a local server to avoid any relative-path quirks:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Development Conventions

- **No inline styles** — all styles belong in `css/style.css`
- **Formatting** — use Prettier for consistent code style (`npm run format`)
- **CSS variables** — use `var(--color-*)` and `var(--font-*)` for colors and typography
- **Naming** — kebab-case for filenames and CSS class names
- **Nav changes** — edit only `NAV_LINKS` in `js/main.js`; never duplicate nav markup in HTML
- **PDFs** — name as `YYYY-MM-DD-slug.pdf` and place in `assets/docs/`
- **Headings** — every page has exactly one `<h1>` (the page title); sections use `<h2>`, subsections `<h3>`
- **Semantic HTML** — use `<header>`, `<main>`, `<footer>`, `<section>`, `<nav>` appropriately

## Adding a News Item

1. Copy the linked PDF to `assets/docs/YYYY-MM-DD-slug.pdf`
2. Add a `<li>` to the `<ul class="news-list">` in `news.html`:
   ```html
   <li>
     <span class="news-date">Month DD, YYYY</span>
     <a href="assets/docs/YYYY-MM-DD-slug.pdf" target="_blank" rel="noopener"
       >Headline text</a
     >
   </li>
   ```
3. Commit and push — GitHub Pages deploys automatically
