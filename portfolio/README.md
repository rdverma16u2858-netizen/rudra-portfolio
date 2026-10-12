# Rudra Pratap Verma — Personal Portfolio

A light, minimal portfolio built for the [Builders Day assignment](https://github.com/harshscaler/sec-e/blob/main/Project/project.md).

## Open the website

Double-click `index.html` to open it in your browser. The CSS and JavaScript are included locally, so the portfolio itself works offline. Visiting the external project/GitHub links requires the internet.

No installation or build command is needed to open the finished site.

## Technologies

- **HTML**: page content and semantic structure.
- **Tailwind CSS v4.3.3**: most layout, spacing, typography, borders, and responsive grids.
- **CSS**: the custom visual style, illustrations, media queries, and animations.
- **JavaScript**: mobile menu, project filters, project notes, clipboard button, current year, and a first-year goal tracker using the browser's built-in `localStorage`.

No React, Bootstrap, icon library, external fonts, backend, analytics, or remote asset requests are used by this portfolio. The existing JARVAS project has its own separate stack; it is only linked here.

Tailwind's official standalone compiler was used as a development tool to produce the included CSS. A local system HTTP server was used for browser testing. Neither is a runtime dependency of the finished website.

## Files

```text
portfolio/
├── index.html          Page content and Tailwind utility classes
├── css/
│   ├── input.css       Tailwind input and custom color tokens
│   ├── tailwind.css    Generated CSS — already built, do not edit by hand
│   └── style.css       Readable custom styles and CSS illustrations
├── js/
│   └── script.js       Small, commented JavaScript interactions
├── README.md           Setup and customization
└── EXPLAIN-THE-CODE.md  Guide for understanding and presenting the project
```

## Make it yours

1. Edit text directly in `index.html`: introduction, About, project descriptions, skills, and education.
2. Project card links are in `index.html`. Their expanded notes and links are in the `projects` object in `js/script.js`; keep both locations consistent.
3. Add your real email and LinkedIn links in the Contact section when available. Replace the “Email & LinkedIn will be added soon” text with real links. No contact form or message-sending service is connected.
4. Change the theme colors in `css/input.css`, then rebuild Tailwind. Custom illustration colors are in `css/style.css`.
5. The project images are original HTML/CSS illustrations, visibly labelled as such. You can later replace them with screenshots of your real projects.

The project gallery contains PixelForge, Fit24 Fitness, JARVAS MathBot, and KHANAK. The GitHub username comes from the JARVAS repository you supplied. PixelForge links to [your updated website](https://pixelfforge2026.netlify.app/). Fit24 uses the URL from your profile. [KHANAK](https://khanak-store.onrender.com/) is the storefront for your SST Hustle campus business. JARVAS is labelled **in development** because its repository README describes Phase 0 as complete and the solver as future work. Update that wording when the project advances.

## Achievements and first-year goals

The Achievements section uses your latest supplied figures: SOF IMO Gold Medal of Excellence, 98+ JEE Main mathematics percentile, 95+ overall JEE Main percentile, JEE Advanced 2026 qualification, 90%+ Class 10 overall result, a 1500+ chess Elo rating, and PixelForge's first five websites and two paying clients. The chess platform and time control are not specified.

The Year 1 timeline covers September 2026–August 2027. Its four date ranges are suggested planning windows, not official SST semester dates or GSoC deadlines. It follows your priority order: coursework → DSA → other activities. It includes your targets of 120 DSA problems (150 stretch), 8–10 Codeforces contests, a 1100–1200 rating (1400 stretch), 1–2 useful open-source contributions, a GSoC 2027 application attempt, 2–3 serious projects, Python/introductory ML, hackathons, PixelForge, and preparation for ICPC in 2027–28.

- Tick a goal when completed; untick it to mark it incomplete again.
- The total progress bar and each phase's count update automatically.
- Every goal starts unchecked. No planned goal is treated as an achievement.
- Progress is stored with `localStorage` under `rudra-portfolio:year-one:2026-27:v1`.
- It belongs to the current browser and website origin. It does **not** sync across devices, other browsers, different hosting URLs, or other visitors. Clearing site data also removes progress. Behavior for directly opened `file://` pages varies by browser; use the same browser and location consistently.
- If storage is blocked or full, checkboxes still work for the open page and show a clear message that changes could not be saved.
- No account, backend, database, or additional library is used.

To edit goals, change their text in `index.html`. Keep each `data-goal` value unchanged to retain its saved state. New goals need a unique `data-goal` value. JavaScript calculates totals from the checkbox elements. If you add or remove goals, also update the initial HTML counts for the no-JavaScript view.

## Rebuilding Tailwind after changing utility classes

Regular text edits and edits to `style.css` or `script.js` don't require a build. If you introduce new Tailwind classes in HTML or JS, rebuild `tailwind.css`.

Download the matching **v4.3.3 standalone CLI** for your operating system from the [official Tailwind release](https://github.com/tailwindlabs/tailwindcss/releases/tag/v4.3.3). This is Tailwind itself; Node.js and npm are not needed.

For your Apple Silicon Mac, place `tailwindcss-macos-arm64` in the portfolio folder and run these commands from that folder:

```sh
chmod +x ./tailwindcss-macos-arm64
./tailwindcss-macos-arm64 -i ./css/input.css -o ./css/tailwind.css --minify
```

The executable is only a build tool. You don't need to submit or host it. The generated CSS includes Tailwind's MIT license notice.

## What to check before submission

- Read `EXPLAIN-THE-CODE.md` and practise explaining the actual HTML/CSS.
- Confirm that all personal details and project status descriptions are current.
- Check each project link and the GitHub profile.
- Resize the browser and try the mobile menu.
- Try all three project filters and open/close each set of project notes.
- Tick a goal, refresh, confirm it remains checked, then untick it. Check the phase and overall completion counts.
- Use Tab and Enter to check keyboard navigation; Escape closes the menu or project dialog.
- Add email/LinkedIn if you want a more direct way for visitors to contact you.

Submit the entire `portfolio` folder so the CSS and JavaScript stay alongside `index.html`. The website has been prepared locally; no new hosting service or public deployment has been configured.
