import { VideoHero } from "@/components/organisms/sections/VideoHero";
import { CoverageBand } from "@/components/organisms/sections/CoverageBand";
import { EditorialStages } from "@/components/organisms/sections/EditorialStages";
import { StatsBand } from "@/components/organisms/sections/StatsBand";
import { AudienceCards } from "@/components/organisms/sections/AudienceCards";
import { Testimonials } from "@/components/organisms/sections/Testimonials";
import { ProvidersPreview } from "@/components/organisms/sections/ProvidersPreview";
import { LocationCards } from "@/components/organisms/sections/LocationCards";
import { FinalCTA } from "@/components/organisms/sections/FinalCTA";
import {
  homeHero,
  announcement,
  journey,
  stats,
  audiences,
  audiencesIntro,
  locations,
  locationsIntro,
  finalCta,
  testimonials,
  testimonialsIntro,
  providersPreview,
  providersPreviewIntro,
} from "@/content";
import { homePage } from "@/content/pages/home";
import { JsonLd } from "@/lib/json-ld";
import {
  buildMedicalOrganizationSchema,
  buildWebSiteSchema,
} from "@/lib/schema";

export const metadata = homePage.metadata;

export default function HomePage() {
  return (
    <>
      <JsonLd id="ld-organization" data={buildMedicalOrganizationSchema()} />
      <JsonLd id="ld-website" data={buildWebSiteSchema()} />
      <VideoHero
        video={homeHero.video}
        poster={homeHero.poster}
        headline={homeHero.headline}
        subTagline={homeHero.subTagline}
        subhead={homeHero.subhead}
        cta={homeHero.cta}
      />
      <CoverageBand appointments={announcement} />
      <StatsBand stats={stats} tone="cream" />
      <AudienceCards
        intro={audiencesIntro}
        audiences={audiences.filter((a) => a.id !== "doctors")}
        tone="sand"
      />
      <ProvidersPreview
        intro={providersPreviewIntro}
        providers={providersPreview}
        tone="cream"
      />
      <EditorialStages stages={journey} tone="sand" />
      <Testimonials intro={testimonialsIntro} quotes={testimonials} tone="cream" />
      <LocationCards
        id="locations"
        intro={locationsIntro}
        locations={locations}
        groupByKind
        tone="sand"
      />
      <FinalCTA {...finalCta} />
    </>
  );
}
