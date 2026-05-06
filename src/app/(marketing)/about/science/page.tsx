import { PageHero } from "@/components/organisms/sections/PageHero";
import { SplitCards } from "@/components/organisms/sections/SplitCards";
import { FeatureCardGrid } from "@/components/organisms/sections/FeatureCardGrid";
import { VideoFeature } from "@/components/organisms/sections/VideoFeature";
import { EditorialPillars } from "@/components/organisms/sections/EditorialPillars";
import { StatsBand } from "@/components/organisms/sections/StatsBand";
import { FinalCTA } from "@/components/organisms/sections/FinalCTA";
import { protocols, protocolsIntro } from "@/content";
import { sciencePage } from "@/content/pages/science";

export const metadata = sciencePage.metadata;

export default function SciencePage() {
  return (
    <>
      <PageHero {...sciencePage.hero} />
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
