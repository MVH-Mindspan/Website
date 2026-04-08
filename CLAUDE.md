# Mindspan Web

Static marketing site for mindspan.co — neurology and cognitive care clinic.
Migrating from Webflow to Astro on Cloudflare Pages.

## Stack
- Astro (static output)
- Tailwind CSS
- Deployed to Cloudflare Pages via GitHub
- No CMS — all content lives in `.astro` files

## Source of truth during migration
- Live Webflow site: https://mindspan.co
- Page manifest: `migration/pages.json`
- Rendered HTML mirror: `migration/webflow-mirror/`
- Brand assets: `migration/brand/`

## Conventions
- Components in `src/components/`
- Page-specific sections in `src/components/sections/`
- Shared layouts in `src/layouts/`
- Use Tailwind utility classes; no custom CSS unless unavoidable
- All copy lives inline in `.astro` files (no JSON/markdown content layer yet)

## Design tokens
TBD — to be extracted from Webflow style guide and codified in tailwind.config.mjs
