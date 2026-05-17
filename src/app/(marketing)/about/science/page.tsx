import { VideoHero } from "@/components/organisms/sections/VideoHero";
import { SplitCards } from "@/components/organisms/sections/SplitCards";
import { FeatureCardGrid } from "@/components/organisms/sections/FeatureCardGrid";
import { VideoFeature } from "@/components/organisms/sections/VideoFeature";
import { EditorialPillars } from "@/components/organisms/sections/EditorialPillars";
import { StatsBand } from "@/components/organisms/sections/StatsBand";
import { FinalCTA } from "@/components/organisms/sections/FinalCTA";
import { protocols, protocolsIntro } from "@/content";
import { sciencePage } from "@/content/pages/science";
import { JsonLd } from "@/lib/json-ld";
import { buildBreadcrumbSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/seo";

export const metadata = sciencePage.metadata;

export default function SciencePage() {
  return (
    <>
      <JsonLd
        id="ld-breadcrumb"
        data={buildBreadcrumbSchema([
          { name: "Home", url: `${SITE_URL}/` },
          { name: "About", url: `${SITE_URL}/about` },
          { name: "Diagnostics, Science & Technology", url: `${SITE_URL}/about/science` },
        ])}
      />
      <VideoHero {...sciencePage.hero} />
      <SplitCards
        intro={protocolsIntro}
        core={protocols.core}
        edge={protocols.edge}
      />
      <FeatureCardGrid
        id="technology"
        intro={sciencePage.technologyIntro}
        cards={sciencePage.technologyCards}
        columns={2}
        tone="primary"
      />
      <VideoFeature {...sciencePage.mindyVideo} tone="sand" />
      <EditorialPillars
        intro={sciencePage.outcomePillarsIntro}
        pillars={sciencePage.outcomePillars}
      />
      <StatsBand stats={sciencePage.proofStats} tone="sand" />
      <FinalCTA {...sciencePage.finalCta} />
    </>
  );
}
