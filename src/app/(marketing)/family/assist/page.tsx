import {
  VideoHero,
  EditorialIntro,
  EditorialPillars,
  EditorialStages,
  FeatureCardGrid,
  FinalCTA,
} from "@/components/organisms/sections";
import { assistPage } from "@/content/pages/assist";

export const metadata = assistPage.metadata;

export default function AssistPage() {
  return (
    <>
      <VideoHero
        video={assistPage.hero.video}
        headline={assistPage.hero.headline}
        subTagline={assistPage.hero.subTagline}
        subhead={assistPage.hero.subhead}
      />
      <EditorialIntro
        title={assistPage.intro.title}
        lead={assistPage.intro.lead}
      />
      <EditorialPillars
        intro={assistPage.stages.intro}
        pillars={assistPage.stages.items}
      />
      <FeatureCardGrid
        id="paths"
        intro={assistPage.paths.intro}
        cards={assistPage.paths.cards}
      />
      <EditorialStages
        intro={assistPage.howToStart.intro}
        stages={assistPage.howToStart.items}
      />
      <FinalCTA
        eyebrow={assistPage.finalCta.eyebrow}
        title={assistPage.finalCta.title}
        lead={assistPage.finalCta.lead}
        primary={assistPage.finalCta.primary}
        secondary={assistPage.finalCta.secondary}
      />
    </>
  );
}
