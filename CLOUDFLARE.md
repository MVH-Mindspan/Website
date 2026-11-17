# Cloudflare Pages setup

The stack is now Next.js 16 with static export (matches 100xpath). Pages build settings must be updated.

## Pages settings (Cloudflare dashboard → Workers & Pages → mindspan-web → Settings → Builds)

- **Framework preset**: Next.js (Static HTML Export) — *or* None
- **Build command**: `npm run build`
- **Build output directory**: `out`
- **Root directory**: `/` (or leave blank)
- **Node version**: `20` (set `NODE_VERSION=20` under Environment variables if needed)

After saving, trigger a new deploy from the Deployments tab.

## Local dev

```
cd mindspan-web
npm install
npm run dev
# http://localhost:3000
```

## Routes

- `/` — Mindspan brand homepage
- `/airbnb` — Airbnb-style version
- Floating toggle bottom-center switches between them

## Optional: Cloudflare Worker (forms API later)

`worker.ts` and `wrangler.json` are included for parity with 100xpath. When you need a form handler (e.g. Book a Visit), deploy via Wrangler instead of Pages:

```
npx wrangler deploy
```

That serves `./out` via the `ASSETS` binding and lets you add `/api/*` routes in `worker.ts`. Until then, Pages is the simpler path.

## Video (R2 at /media/*)

Static assets cap files at 25 MiB and ignore Range requests, which leaves video
unseekable in Chrome. Large video therefore lives in the R2 bucket
`mindspan-media` (binding `MEDIA` in `wrangler.json`). `worker.ts` serves it at
`/media/<key>` with 206 range responses, immutable caching and
`X-Robots-Tag: noindex`.

Keys are versioned. A new cut gets a new key; never overwrite one.

### Add an unlisted film (/watch/<slug>)

1. Upload the MP4 (faststart) before pushing. Without `--remote`, wrangler writes to local storage:
   ```
   npx wrangler r2 object put mindspan-media/watch/<name>-v1.mp4 --file <file.mp4> --content-type video/mp4 --remote
   ```
2. Add a poster (WebP) and a 1200x630 OG image (JPEG) under `public/assets/watch/`.
3. Add an entry to `films` in `src/content/watch.ts`. The page builds at `/watch/<slug>`.
4. Never link it from the site, and keep it out of `sitemap.ts` and `robots.ts`.
   The page is noindex.

To test locally, seed local R2 with the same `put` command using `--local`. Then run
`npm run build && npx wrangler dev`. `next dev` does not run the Worker, so `/media` 404s there.
