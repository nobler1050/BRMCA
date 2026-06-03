# Blue Ridge Mountain Civic Association (BRMCA) - Static Site

## Project Overview
This project is a responsive static website for the Blue Ridge Mountain Civic Association (BRMCA), a 501(c)(4) civic organization. The site is designed to provide information about the community, its history, conservation efforts, fire safety (Firewise), and upcoming events.

### Technologies
- **HTML5**: Semantic markup for all site pages.
- **CSS3**: Custom styling using CSS variables, Flexbox, and media queries for responsiveness.
- **JavaScript (Vanilla)**: Lightweight scripts for UI interactions (image slider and mobile menu).

### Architecture
The site follows a flat structure with individual HTML files for each page, sharing a common global stylesheet and JavaScript file.
- **Header**: Contains the site logo (linked to Home) and a responsive navigation menu with dropdowns.
- **Footer**: Displays organization name, social media prompts, and copyright info.
- **Main Content**: Page-specific content including a hero section and image slider on the homepage.

## Directory Structure
- `/`: Root directory containing all `.html` files for the site pages.
- `assets/images/`: Contains image assets including the logo and slider images.
- `css/`: Contains `style.css`, the global stylesheet.
- `js/`: Contains `main.js`, the global JavaScript file.

## Key Pages
- `index.html`: Homepage with a hero section, image slider, and community announcements.
- `about.html`: Information about the organization's mission, history, and structure.
- `firewise.html`: Wildfire preparedness and evacuation plans.
- `resources.html`: Community resources, emergency contacts, and local government info.
- `contact.html`: Contact form for community inquiries.
- `news.html`: Latest community updates and event announcements (e.g., Annual Pot Luck Picnic).

## Building and Running
As this is a static website, it does not require a build process.

### Running Locally
You can view the site by opening `index.html` directly in a web browser.
Alternatively, use a simple local web server:
```bash
# Using Python 3
python3 -m http.server 8000
```
Then navigate to `http://localhost:8000`.

### Testing
- **Visual Check**: Open pages in multiple browsers (Chrome, Firefox, Safari) to ensure consistent rendering.
- **Responsiveness**: Use browser developer tools to verify the mobile menu and layout on different screen sizes.
- **Link Check**: Manually verify all navigation links and internal cross-references.

## Development Conventions
- **Naming**: Use kebab-case for filenames and class names.
- **Styling**: Prefer CSS variables for colors and typography to maintain consistency.
- **JavaScript**: Keep scripts vanilla and scoped to necessary UI interactions.
- **Semantic HTML**: Use appropriate tags (`<header>`, `<main>`, `<footer>`, `<section>`, `<article>`) for better accessibility and SEO.
