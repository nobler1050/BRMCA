# Navigation Restructure Plan

## Overview
Restructure the BRMCA website navigation from a flat structure with minimal dropdowns to a hierarchical parent-child structure where parents link to their first child item.

## New Navigation Structure

```
HOME
MEMBERSHIP (→ membership.html)
  ├─ JOIN (→ membership.html)
  ├─ ACTIVITIES (→ activities.html)
  ├─ GET INVOLVED (→ get-involved.html)
  └─ DONATE (→ donate.html)
FIRE SAFETY (→ firewise.html)
  ├─ FIREWISE (→ firewise.html)
  └─ EVACUATION (→ evacuation.html)
RESOURCES (→ resources.html)
  ├─ KEY INFO (→ resources.html)
  └─ CONSERVATION (→ conservation.html)
ABOUT (→ about.html)
  ├─ ABOUT BRMCA (→ about.html)
  ├─ SPONSORS (→ sponsors.html)
  └─ HISTORY (→ history.html)
CONTACT US
```

## Implementation Steps

### Phase 1: Create Placeholder Files
Create 4 new placeholder HTML files:
- `activities.html` (replaces the current news.html functionality)
- `donate.html` (new placeholder)
- `evacuation.html` (new placeholder)
- `sponsors.html` (new placeholder)

### Phase 2: Update NAV_LINKS Array
File: `js/main.js` (lines 1-18)

Update the `NAV_LINKS` constant with the new parent-child structure. Each parent's `href` should point to the same destination as its first child item.

### Phase 3: Enhance Active State Logic
File: `js/main.js` (lines 25-38 in `buildNavMarkup()` function)

Modify the active state logic to:
1. Check if current page matches a parent's href OR any of its children's hrefs
2. If it matches a child, highlight the parent as active (not the child)
3. This creates the behavior where: viewing "history.html" highlights "ABOUT" as active, not "HISTORY"

### Phase 4: Test Navigation
Test cases to verify:
1. ✓ Parent links navigate to correct page (first child)
2. ✓ Child links navigate to correct pages
3. ✓ Active state highlights only parent when viewing any page in that parent's category
4. ✓ Dropdown shows/hides on desktop (hover)
5. ✓ Dropdown shows/hides on mobile (click)
6. ✓ All links work and pages load correctly
7. ✓ Responsive behavior on mobile screens

## Notes
- Parent `href` = first child's href (e.g., MEMBERSHIP links to membership.html, same as JOIN)
- news.html will be replaced by activities.html
- Active state shows only parent when visiting any child page (dropdown doesn't show active state, just parent)
- CSS styling already supports dropdowns; may need minor adjustments for the updated structure

## Files to Modify
- `js/main.js` — NAV_LINKS array and active state logic
- Create: `activities.html`, `donate.html`, `evacuation.html`, `sponsors.html`
- `css/style.css` — may need minor tweaks for active state styling

## Files Potentially Affected
- `news.html` — will no longer be directly referenced in nav (activities.html replaces it)
- All HTML pages may need to be checked to ensure header nav renders correctly
