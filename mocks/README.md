# mwham.dev redesign mock

Static HTML, CSS and vanilla JS. No build step.

- `index.html`, `posts.html`: the two mocked pages
- `css/style.css`: all styles, with the theme tokens at the top
- `js/main.js`: theme toggle (saved in localStorage, or `?theme=black` in the URL) and the posts topic filter
- `fonts/`: Jacquard 24, IM Fell English, JetBrains Mono (self-hosted)
- `assets/skeleton-mask.png`: the artwork as a transparent mask, coloured by the theme via CSS `mask`
- `screenshots/`: desktop and 390px mobile, green and black

View it: `python3 -m http.server 8000`, then open http://localhost:8000

## Moving the style to the live site

1. Copy `css/`, `js/`, `fonts/` and `assets/skeleton-mask.png` into the site (keep the relative paths, or update the `url()`s in `style.css`).
2. Reuse the header, footer and `<head>` markup from either page for every page.
3. Posts list: copy one `<li class="post-row" data-tags="...">` per post. The tags in `data-tags` must match the `data-tag` values on the topic buttons, and the counts are written by hand.
4. Pages linked in the nav (projects, about, contact) and the individual posts are not part of this mock.
5. Colours are tokens (`--bg`, `--surface`, `--text`, `--accent`, `--muted`, `--link`, `--line`). The green and black values are tuned for WCAG AA contrast; if you change them, re-check contrast.
