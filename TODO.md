# BRMCA Site — Follow-ups

## Needs your eyes (please verify before publishing)

- **Stevenson quote on `contact.html`** — I used the standard widely-attributed Stevenson "Forest Notes" passage. Please cross-check against the exact wording on the Wix Contact page before publishing.
- **News item titles on `news.html`** — I ported the dated headlines only; the Wix archive has article bodies that I couldn't reach via the basic page fetch. Decide whether to (a) drill into Wix and add per-item summaries, (b) leave as a headline feed, or (c) link to external sources where relevant.
- **Picnic announcement** — appears on both `index.html` and `news.html`. The picnic date (May 16, 2026) is now in the past. Either remove, archive to a past-events section, or replace with the next event.
- **Committee descriptions for Historical and Membership on `get-involved.html`** — I wrote generic blurbs since the Wix site didn't surface descriptions. Tweak to match how the committees actually run.
- **Officer / director names on `contact.html`** — re-verify these reflect the current board (Wix can be stale).

## Broken / placeholder

- **`contact.html` form** — posts to `https://formspree.io/f/your-form-id`, a placeholder. Sign up at formspree.io (free tier covers low-volume civic sites) and replace the form ID, or wire up an alternative.

## Navigation / information architecture — broader redesign

**Already done (2026-06-03):** Contact Us promoted from a dropdown under About to its own top-level item at the end of the nav.

**Still to discuss:** two remaining oddities in the IA:

1. **Conservation under Resources** — feels arbitrary. Conservation is central to BRMCA's mission statement (*"safeguarding the natural environment of the Blue Ridge"*), so it probably deserves its own top-level slot rather than being treated as a sub-topic of practical resources (which is more about phone numbers, recycling, government contacts, etc.). Suggested move: promote Conservation to top-level.

2. **Get Involved under Membership** — these two pages are genuinely related (both are "how to participate"), so the dropdown actually makes sense here. Could keep it as-is, OR if we want to flatten the whole nav, fold Get Involved's content into Membership as one page and drop the dropdown.

If we adopted both changes, the final nav would be:

```
HOME │ ABOUT US │ NEWS & EVENTS │ HISTORY │ CONSERVATION │ FIREWISE │ MEMBERSHIP ▾ │ RESOURCES │ CONTACT US
                                                                       GET INVOLVED
```

9 top-level items with 1 dropdown. Trade-off: gets crowded on narrow desktop windows. The responsive hamburger kicks in at 992px so mobile is unaffected. To trim further, fold Get Involved into Membership and drop the dropdown entirely (8 top-level items, no dropdowns).

Edit `NAV_LINKS` at the top of `js/main.js` — one change updates every page.

## Easy news/events editing for a non-technical editor

Right now adding a news item means editing `news.html` directly, which requires HTML knowledge and ideally a local checkout. The org needs a workflow a board member can use without touching code. Two candidates worth investigating:

1. **Decap CMS** (formerly Netlify CMS) — free, open-source admin UI that runs as a single page on the static site (e.g. `/admin/`) and commits directly to GitHub when the editor saves. Editor logs in with GitHub, sees a friendly form (Date / Title / PDF upload), clicks save, and the page updates automatically. Closest experience to the Wix admin they're used to.
   - Setup cost: ~30 minutes one-time (provision a GitHub OAuth app, add `admin/index.html` + a small YAML config).
   - Recurring cost: $0.
   - Editor experience: very low friction after setup.

2. **`news.json` data file edited via GitHub web UI** — move the news list out of `news.html` into a JSON file; have `main.js` fetch and render it. Editor opens the file on GitHub.com, clicks the pencil icon, copies an existing entry, edits date/title/URL, commits via the web UI.
   - Setup cost: ~15 minutes (refactor news rendering to fetch from JSON).
   - Recurring cost: $0.
   - Editor experience: requires basic care with JSON syntax (commas, quotes). No CLI needed but trickier than a form.

Decide which approach fits the actual editor's comfort level. Start with JSON if unsure; upgrade to Decap later if syntax errors become a recurring problem.

- Add `<meta name="description">` to each page's `<head>`.
- Add Open Graph tags (`og:title`, `og:description`, `og:image`) so shared links render with a preview card.
- Add a favicon: drop `favicon.ico` (or `.png`) into `assets/` and `<link rel="icon" href="assets/favicon.png">` to each `<head>`.

## Accessibility

- `index.html` has no `<h1>` — the hero "Welcome to the Mountain" is an `<h2>`. Promote it. Also confirm every other page has exactly one `<h1>`.

## Cleanup (optional)

- Inline `style="..."` attributes are still sprinkled through several pages (margins, alignment, backgrounds). When convenient, migrate these to utility classes in `css/style.css`. The contact page got a few new ones during the content port — those are the easiest to clean up first.

## Firewise (low-priority enhancement)

- Add a "Brush Pickup" section to `firewise.html` summarizing the guidelines from the April 2024 blog post: brush within 100 ft of home (300 ft downslope), stack large ends outward, place piles near roads, contact Mick Newman for participation signup.

---

## Done in earlier session passes

For reference — these were completed during the migration:
- Shared header/footer via `js/main.js` (single source of truth)
- Slider buttons accessible, auto-advance guarded
- Page-specific `<style>` blocks consolidated into `css/style.css`
- Dynamic footer copyright year
- Footer Facebook link
- Bylaws PDF self-hosted at `assets/docs/brmca-bylaws.pdf`
- Content port from Wix: officer/director/committee directory on `contact.html`; 2026 news headlines on `news.html`; corrected 2024 blog posts on `blog.html`; LEx + Recycling cards on `resources.html`; Historical + Membership committee cards on `get-involved.html`; restored homepage welcome paragraphs.
