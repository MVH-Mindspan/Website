# Mindspan Web

Static marketing site for mindspan.co — neurology and cognitive care clinic.
Migrating from Webflow to Next.js on Cloudflare Pages.

## Stack
- Next.js 16 (App Router) + React 19
- Tailwind CSS v4 (`@theme inline` in `src/app/globals.css`)
- Framer Motion for animations
- TypeScript — content modules use `satisfies` for type safety (no Zod)
- Deployed to Cloudflare Pages via GitHub

## Directory layout
```
src/
  app/
    layout.tsx                       root: fonts + ThemeProvider
    (marketing)/
      layout.tsx                     shell: SiteHeader + <main> + SiteFooter + StyleSwitcher
      page.tsx                       home — composes organisms from content
      about/ | careers/ | providers/ | providers/refer/ | legal/{terms,privacy,consent}/ | locations/ | locations/[slug]/
    book-a-visit/                    standalone wizard (no shell chrome)
  components/
    atoms/        ArrowIcon, Bullet, Button, Container, Eyebrow, Heading, IconBadge, Lead, Pill
    molecules/    BulletList, Reveal, SectionHeader, StatCounter
    organisms/
      SiteHeader, SiteFooter
      sections/   VideoHero, PageHero, EditorialIntro, TeaserBanner, EditorialStages,
                  StatsBand, SplitCards, FeatureCardGrid, AudienceCards, LocationCards,
                  ProvidersSection, FinalCTA, icons
    booking/      booking wizard (feature module)
    home-legacy/  MindspanHome — frozen Mindspan Brand v1 homepage
    dev/          StyleSwitcher (dev-only theme toggle)
  content/        typed copy modules (brand, nav, footer, journey, stats, protocols, technology,
                  audiences, locations, providers, finalCta, hero, announcement)
    pages/        per-page metadata + hero copy (home, about, locations, locationDetail,
                  providers, refer, careers, legal)
  lib/
    tokens.ts        fluid type, radii, eases, container widths
    motion.ts        EASE, fadeUp, staggerContainer, VIEWPORT
    seo.ts           buildMetadata({ title, description, canonical, image?, noIndex? })
    themes.ts        brandV1Theme (Mindspan Brand v1), brandV2Theme (Mindspan Brand v2, default)
    theme-context.tsx
```

## Themes
- `brandV2Theme` — canonical Mindspan brand (sand / ink / serif editorial). Default.
- `brandV1Theme` — original green/orange Mindspan homepage. Frozen. Reachable via dev StyleSwitcher.
- `(marketing)/layout.tsx` detects `theme.structure === "v1"` and defers to `MindspanHome` (which has its own header/footer).

## Conventions
- Copy lives in `src/content/*.ts` — never hardcode strings in organisms.
- Organisms accept typed content props; they are dumb presenters.
- Tokens in `src/lib/tokens.ts` and CSS `@theme` in `globals.css` — edit in one place.
- Section spacing/layout uses the `.v2-scope` wrapper class (added in `(marketing)/layout.tsx`).
- Use atoms/molecules before reaching for inline styles; prefer `<Container>`, `<Heading>`, `<Lead>`, `<Button>`.
- Do not reintroduce `studio-*` classes; those are kept only for the frozen v1 homepage + booking.

## How to add a new page
1. Add `src/content/pages/<name>.ts` exporting `{ metadata: buildMetadata(...), hero: {...} }`.
2. Create `src/app/(marketing)/<name>/page.tsx`:
   ```tsx
   import { PageHero } from "@/components/organisms/sections/PageHero";
   import { FinalCTA } from "@/components/organisms/sections/FinalCTA";
   import { myPage } from "@/content/pages/<name>";
   import { finalCta } from "@/content";

   export const metadata = myPage.metadata;
   export default function MyPage() {
     return (
       <>
         <PageHero {...myPage.hero} />
         {/* compose additional organisms from content */}
         <FinalCTA {...finalCta} />
       </>
     );
   }
   ```
3. Add a nav entry in `src/content/nav.ts` if top-level; a footer entry in `src/content/footer.ts` if relevant.

New section types → add an organism under `src/components/organisms/sections/` and export it from the sections barrel. Keep them presentational; let the page compose them.
