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

## Digital Store (`/store`)

The `STORE` nav link opens a small shop for plugins and software, paid through ZPAY (易支付 protocol, Alipay / WeChat Pay).

- Products: edit `lib/store/products.ts` (name, price, status, images, A/B audio). Images and previews live in `public/store/`.
- Flow: `/store` → `/store/[slug]` → `/store/cart` → ZPAY payment page → `/store/success`.
- `POST /api/store/checkout` recomputes the price on the server and returns a signed ZPAY `submit.php` URL.
- `/api/store/notify` is ZPAY's async callback: it verifies the MD5 signature and amount, logs `[store] paid …` to Vercel logs, and replies `success`.
- `/store/success` verifies the same signature from the return URL before showing download links, so the page works as a receipt. No database: the product codes are encoded in the order number.

Set these in Vercel → Settings → Environment Variables (never commit them):

| Variable | Value |
|---|---|
| `ZPAY_PID` | ZPAY merchant id (商户ID) |
| `ZPAY_KEY` | ZPAY merchant key (商户密钥) |
| `SITE_URL` | Public site address, e.g. `https://your-domain.com` |
| `ZPAY_GATEWAY` | Optional, defaults to `https://zpayz.cn` |
| `STORE_DELIVERY_HARDICK` | Download link shown after a HARDICK purchase (one per paid product: `STORE_DELIVERY_<SLUG>`) |
