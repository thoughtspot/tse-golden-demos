# TSE Golden Demos

A single-page launcher for the ThoughtSpot Golden Demos. The site renders one
card per demo — industry, name, description, and buttons to open the live demo,
watch a walkthrough video, and (when enabled) open the demo's configuration page
— with filter chips to narrow the list by category. Anyone can find and open the
right showcase without hunting for URLs.

The demo list is data, not code: everything on the page comes from
[demos.json](demos.json). Adding, editing, or removing a demo means editing that
one file.

Viewers must be on Twingate VPN and already logged into PMM in the Primary org
for the linked demos to load; the page says so in a "Before you open a demo"
card, along with the email/password to use on demos that show a login page. The
app itself does no authentication.

## Stack

- Next.js 16 (App Router) with React 19
- TypeScript
- Tailwind CSS v4 plus hand-written styles in [app/globals.css](app/globals.css)
- Inter and Inter Tight via `next/font/google`

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The page hot-reloads as you
edit [app/page.tsx](app/page.tsx), [app/demo-browser.tsx](app/demo-browser.tsx),
[app/globals.css](app/globals.css), or [demos.json](demos.json).

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
  "filter-categories": ["Pharma", "Supply Chain"],
  "url": "https://pharmaspot.se.thoughtspot.com/",
  "video-url": "",
  "has-config": false,
  "color-background": "#2e1065",
  "color-text": "#f6f1ff"
}
```

| Field               | Purpose                                                                                                   |
| ------------------- | --------------------------------------------------------------------------------------------------------- |
| `name`              | Demo name shown under the card heading. Also the sort key — cards render alphabetically, not in file order. |
| `description`       | One sentence under the name. May be empty (the line is omitted). Keep it short so cards stay similar in height. |
| `industry`          | Card heading. The value `Other` is special — see below.                                                   |
| `filter-categories` | Array of filter chip labels this demo appears under. Chips are the unique values across all demos, A–Z. Use `[]` for none. |
| `url`               | Where "Open demo" links. Opens in a new tab. Ignored for an `Other` card, which has no link.              |
| `video-url`         | Walkthrough video link. Empty string shows a disabled "Soon" button.                                      |
| `has-config`        | `true` adds a "Demo configuration" link to `url` + `/config`.                                             |
| `script-url`        | Optional. Add the key to show a second "Script" button next to Walkthrough; empty string shows "Soon". Omit it to hide the button. |
| `color-background`  | Card background color (any CSS color; hex is what the existing entries use).                              |
| `color-text`        | Text color used on that background. Button and border colors are derived from these two.                  |

Supply every field except `script-url`. The `Demo` type in
[app/demo-browser.tsx](app/demo-browser.tsx) is applied with a cast, so a
missing field won't fail the build or the typecheck — it just renders as an
empty heading, an unstyled card, or a missing button.

Guidelines:

- **Pick a readable color pair.** `color-text` sits directly on
  `color-background`, so check the contrast. Existing cards pair a saturated
  dark background with near-white text, or a pastel background with a deep
  version of the same hue.
- **Only list live demos.** Every entry should point at a real, reachable demo
  URL. Don't add a card with a placeholder or example URL for something that
  hasn't shipped — add it when it goes live.
- **The `Other` tile is the exception.** A single entry with
  `"industry": "Other"` acts as the catch-all: it always renders last, ignores
  `url`, `video-url` and `has-config`, and renders with a "Coming soon" banner
  instead of buttons, so there's nothing to click. It appears only under the
  "All" filter unless you give it `filter-categories`.
- **No code changes needed.** Card ordering, filter chips, animation stagger,
  and layout are all handled by the page; you only supply data.

After editing, run `npm run dev` and confirm the new card renders, the colors
read well, its filter chip appears, and the links open the right pages.

## Project layout

| Path                                         | What it is                                                                   |
| -------------------------------------------- | ---------------------------------------------------------------------------- |
| [demos.json](demos.json)                     | The demo list — the only file you edit to change what's on the page.         |
| [app/page.tsx](app/page.tsx)                 | Home page (server component): header, intro, and the two info cards.         |
| [app/demo-browser.tsx](app/demo-browser.tsx) | Client component: filter chips, the "Showing X of Y" count, and demo cards.  |
| [app/layout.tsx](app/layout.tsx)             | Root layout, fonts, and page metadata.                                       |
| [app/globals.css](app/globals.css)           | All site styling, including the card styles driven by the per-demo colors.   |
| [public/ts.png](public/ts.png)               | ThoughtSpot brand mark in the header.                                        |
| [app/icon.png](app/icon.png)                 | Favicon.                                                                     |
