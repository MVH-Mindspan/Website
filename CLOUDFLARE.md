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
- `/learn` — blog index; `/learn/<slug>` posts; `/learn/feed.xml` RSS
- `/admin` — Decap CMS editor (noindex)

## Cloudflare Worker (required)

Production is the Worker `website` (`wrangler.json`), which serves `./out` through the
`ASSETS` binding. The Worker is not optional: the forms API (`/api/book`, `/api/waitlist`,
`/api/refer`), video from R2 (`/media/*`), the PostHog proxy (`/ingest/*`) and CMS sign-in
(`/api/cms/*`) all run in `worker.ts`.

Deploy by hand with:

```
npm run build && npx wrangler deploy
```

For the blog workflow (below) the repo must be connected to Workers Builds so that pushes
to `main` deploy automatically and pull requests get preview URLs. Dashboard → Workers &
Pages → `website` → Settings → Builds → connect `MVH-Mindspan/Website`, build command
`npm run build`, deploy command `npx wrangler deploy`, non-production branch command
`npx wrangler versions upload`. Previews set `WORKERS_CI_BRANCH`, which `robots.ts` reads
to keep preview builds out of search.

## Blog (/learn) and the CMS (/admin)

Posts are markdown in `content/learn/`, authors in `content/authors/`. `src/lib/learn.ts`
reads them at build time. The editor is Decap CMS, served as static files from
`public/admin/` and configured in `public/admin/config.yml`.

Editorial workflow is on: every save in the editor creates a branch and a pull request
labelled `learn/...`. Nothing is live until the PR is merged into `main`. Branch protection
on `main` (one approving review) is what makes the approval step real; set it in GitHub →
Settings → Branches. Writers need **Write** access to the repo so Decap can open branches.

### One-time setup

1. GitHub → MVH-Mindspan org → Settings → Developer settings → **OAuth Apps** → New.
   Homepage `https://mindspan.co`, callback `https://mindspan.co/api/cms/callback`.
2. Store the credentials as Worker secrets:
   ```
   npx wrangler secret put GITHUB_OAUTH_CLIENT_ID
   npx wrangler secret put GITHUB_OAUTH_CLIENT_SECRET
   ```
3. Turn on branch protection for `main` (require PR, 1 review, dismiss stale approvals).
4. Connect Workers Builds (above) so PRs get preview URLs.

### Local editing without GitHub

```
npm run cms:dev   # starts decap-server on :8081
npm run dev       # then open http://localhost:3000/admin
```

Saves write straight to `content/`. `local_backend: true` in `config.yml` enables this and
is ignored in production when the local server is not running.

### Writer guide

See `content/README.md`.

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
