# ASBEEL/D4nn9 Portfolio

Next.js portfolio for ASBEEL/D4nn9, a London/Shenzhen based digital artist, music producer, DJ, and creative technologist.

## Current Site Structure

- `HOME`: identity-led landing page with social links
- `CREATIVE`: entry point for EDA / creative computing projects
- `SOUND`: music, EP, selected tracks, live media, and platform link
- `VISUAL`: AIGC visual works, music videos, archive images, and audio-visual pieces
- `ABOUT`: biography, focus areas, recognition, and social links

The older `/work` route has been removed from the app and now redirects to `/sound`.

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Three.js for selected interactive sketches and visual experiments

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site locally.

## Quality Checks

```bash
npm run lint
npm run build
```

Run both before pushing changes.

## Media

Static media is currently stored in `public/`:

- `public/media/audio/`
- `public/media/videos/`
- `public/media/images/`
- `public/DATA/`

The next optimization pass should add compressed thumbnails, image lazy loading, video posters, and lighter audio delivery.

## Notes

EDA projects are currently served from `data/eda-projects.json` through `/api/eda-projects/[id]` and rendered in sandboxed iframes. A future pass should add titles, tags, preview images, and a curated featured/archive structure.
