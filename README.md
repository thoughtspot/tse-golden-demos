# TSE Golden Demos

A single-page launcher for the ThoughtSpot Golden Demos. The site renders one
tile per demo — industry, name, description, and a link that opens the demo in a
new tab — so anyone can find and open the right showcase without hunting for
URLs.

The demo list is data, not code: everything on the page comes from
[demos.json](demos.json). Adding, editing, or removing a demo means editing that
one file.

Viewers must already be logged into PMM in the Primary org for the linked demos to
load; the app itself does no authentication.

## Stack

- Next.js 16 (App Router) with React 19
- TypeScript
- Tailwind CSS v4 plus hand-written styles in [app/globals.css](app/globals.css)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The page hot-reloads as you
edit [app/page.tsx](app/page.tsx), [app/globals.css](app/globals.css), or
[demos.json](demos.json).

Other scripts:

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

## Adding a new demo

Append an object to the array in [demos.json](demos.json):

```json
{
  "name": "PharmaSpot",
  "description": "Explore a connected view of pharmaceutical supply chain performance.",
  "industry": "Pharma Supply Chain",
  "url": "https://pharmaspot.se.thoughtspot.com/",
  "color-background": "#2e1065",
  "color-text": "#f6f1ff"
}
```

| Field              | Purpose                                                                                 |
| ------------------ | --------------------------------------------------------------------------------------- |
| `name`             | Tile heading. Also the sort key — tiles render alphabetically, not in file order.       |
| `description`      | One sentence under the heading. Keep it to a line or two so tiles stay the same height. |
| `industry`         | Small label across the top of the tile. The value `Other` is special — see below.       |
| `url`              | Where the tile links. Opens in a new tab. Ignored for an `Other` tile, which has no link. |
| `color-background` | Tile background color (any CSS color; hex is what the existing entries use).            |
| `color-text`       | Text color used on that background.                                                     |

Supply all six fields. The `Demo` type in [app/page.tsx](app/page.tsx) is
applied with a cast, so a missing field won't fail the build or the typecheck —
it just renders as an empty heading or an unstyled tile.

Guidelines:

- **Pick a readable color pair.** `color-text` sits directly on
  `color-background`, so check the contrast. Existing tiles pair a saturated
  dark background with near-white text, or a pastel background with a deep
  version of the same hue.
- **Only list live demos.** Every entry should point at a real, reachable demo
  URL. Don't add a tile with a placeholder or example URL for something that
  hasn't shipped — add it when it goes live.
- **The `Other` tile is the exception.** A single entry with
  `"industry": "Other"` acts as the catch-all: it always renders last, ignores
  `url`, and renders as plain markup rather than a link, so there's nothing to
  click. Its CTA reads "Coming soon" instead of "Open demo".
- **No code changes needed.** Tile ordering, animation stagger, and layout are
  all handled by the page; you only supply data.

After editing, run `npm run dev` and confirm the new tile renders, the colors
read well, and the link opens the right demo.

## Project layout

| Path                               | What it is                                                                 |
| ---------------------------------- | -------------------------------------------------------------------------- |
| [demos.json](demos.json)           | The demo list — the only file you edit to change what's on the page.       |
| [app/page.tsx](app/page.tsx)       | Home page: header, intro copy, and the tile grid.                          |
| [app/layout.tsx](app/layout.tsx)   | Root layout, fonts, and page metadata.                                     |
| [app/globals.css](app/globals.css) | All site styling, including the tile styles driven by the per-demo colors. |
| [public/ts.png](public/ts.png)     | ThoughtSpot brand mark in the header.                                      |
| [app/icon.png](app/icon.png)       | Favicon.                                                                   |
