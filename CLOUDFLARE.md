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
