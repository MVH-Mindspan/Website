import {
  PageHero,
  SplitCards,
  EditorialPillarsIllustrated,
  StatsBand,
  FeatureCardGrid,
  EditorialStages,
  FAQ,
  FinalCTA,
} from "@/components/organisms/sections";
import { howItWorksPage } from "@/content/pages/howItWorks";
import { whatWeTreatPage } from "@/content/pages/whatWeTreat";
import { faq, faqIntro } from "@/content/faq";

export const metadata = howItWorksPage.metadata;

export default function HowItWorksPage() {
  return (
    <>
      <PageHero {...howItWorksPage.hero} />

      <SplitCards
        tone="sand"
        intro={howItWorksPage.comparison.intro}
        core={howItWorksPage.comparison.problem}
        edge={howItWorksPage.comparison.solution}
        closing={howItWorksPage.comparison.closing}
        cta={howItWorksPage.comparison.cta}
      />

      <EditorialPillarsIllustrated
        intro={howItWorksPage.journey.intro}
        pillars={howItWorksPage.journey.items}
      />

      <FeatureCardGrid
        id="what-we-treat"
        intro={whatWeTreatPage.conditions}
        cards={whatWeTreatPage.conditionCards}
        columns={3}
      />

      <FeatureCardGrid
        id="difference"
        intro={howItWorksPage.difference.intro}
        cards={howItWorksPage.difference.cards}
        columns={4}
      />

      <StatsBand stats={howItWorksPage.stats} />

      <EditorialStages
        intro={howItWorksPage.howToStart.intro}
        stages={howItWorksPage.howToStart.items}
      />

      <FAQ intro={faqIntro} items={faq} />

      <FinalCTA
        eyebrow={howItWorksPage.finalCta.eyebrow}
        title={howItWorksPage.finalCta.title}
        lead={howItWorksPage.finalCta.lead}
        primary={howItWorksPage.finalCta.primary}
        secondary={howItWorksPage.finalCta.secondary}
      />
    </>
  );
}
