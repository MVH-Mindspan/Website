import {
  VideoHero,
  RippleFlow,
  SplitCards,
  EditorialPillarsIllustrated,
  StatsBand,
  FeatureCardGrid,
  SimpleSteps,
  FAQ,
  FinalCTA,
} from "@/components/organisms/sections";
import { howItWorksPage } from "@/content/pages/howItWorks";
import { mindspanPath, mindspanPathIntro, mindspanPathCta } from "@/content/path";
import { whatWeTreatPage } from "@/content/pages/whatWeTreat";
import { faq, faqIntro, homeFaq } from "@/content/faq";
import { JsonLd } from "@/lib/json-ld";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  excludeFaqItems,
  UNCONFIRMED_FAQ_IDS,
} from "@/lib/schema";
import { SITE_URL } from "@/lib/seo";

export const metadata = howItWorksPage.metadata;

// Mark up only the questions not already on the homepage, so each Q&A has one home.
const faqSchemaItems = excludeFaqItems(faq, [
  ...homeFaq.map((item) => item.id),
  ...UNCONFIRMED_FAQ_IDS,
]);

export default function HowItWorksPage() {
  return (
    <>
      <JsonLd
        id="ld-breadcrumb"
        data={buildBreadcrumbSchema([
          { name: "Home", url: `${SITE_URL}/` },
          { name: "About", url: `${SITE_URL}/about` },
          { name: "How It Works", url: `${SITE_URL}/about/how-it-works` },
        ])}
      />
      {faqSchemaItems.length > 0 && (
        <JsonLd id="ld-faq" data={buildFaqSchema(faqSchemaItems)} />
      )}
      <VideoHero {...howItWorksPage.hero} />

      <RippleFlow
        variant="rail"
        tone="primary"
        intro={mindspanPathIntro}
        steps={mindspanPath}
        cta={mindspanPathCta}
      />

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
        rounded={false}
      />

      <StatsBand stats={howItWorksPage.stats} />

      <SimpleSteps
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
