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

### Add a video

1. Upload the MP4s (faststart) before pushing: the 1080p file and, if you have one, the 4K file.
   Without `--remote`, wrangler writes to local storage:
   ```
   npx wrangler r2 object put mindspan-media/watch/<name>-v1.mp4 --file <1080p.mp4> --content-type video/mp4 --remote
   npx wrangler r2 object put mindspan-media/watch/<name>-v1-4k.mp4 --file <4k.mp4> --content-type video/mp4 --remote
   ```
   To replace a video with a new cut, upload it under the next version (`-v2`) and point
   `src` (and `uhd.src`) at it. Never overwrite an existing key; it is cached as immutable.
2. Add a poster (WebP, 1600x900) under `public/assets/watch/`. That folder is kept out of the TV signage slideshow.
3. Add the file to `src/content/videos.ts` (src, poster, duration, chapters, and `uhd` for the
   4K file). Large screens such as clinic TVs stream the 4K file; phones stream 1080p. Both
   sizes show on the Download control.
4. Then publish it in one or both places:
   - **Clinic TV library** (`/clinic-videos/<slug>`): add an entry to `clinicVideos` in
     `src/content/clinicVideos.ts`, under an existing or new situation.
   - **Unlisted film page** (`/watch/<slug>`): add an entry to `films` in `src/content/watch.ts`,
     plus a 1200x630 OG image (JPEG) for link previews.
5. Never link these pages from the site, and keep them out of `sitemap.ts` and `robots.ts`.
   They are noindex.

To test locally, seed local R2 with the same `put` command using `--local`. Then run
`npm run build && npx wrangler dev`. `next dev` does not run the Worker, so `/media` 404s there.
