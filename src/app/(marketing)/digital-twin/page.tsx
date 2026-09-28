import {
  VideoHero,
  AudienceCards,
  EditorialStages,
  GuideBenefit,
  FeatureCardGrid,
  FeatureSpotlight,
  EditorialIntro,
  FAQ,
  FinalCTA,
} from "@/components/organisms/sections";
import {
  TwinQuestionPreview,
  TwinProjectionChart,
  TwinDailyLifePreview,
} from "@/components/digital-twin";
import { digitalTwinPage } from "@/content/pages/digitalTwin";
import { twinReport } from "@/content/twinReport";
import { JsonLd } from "@/lib/json-ld";
import { buildBreadcrumbSchema, buildFaqSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/seo";

export const metadata = digitalTwinPage.metadata;

// One story, slowly: the question, who it is for, how it works (with real
// report screens), what to know, the science, how it fits our care, its
// limits, the next step with a neurologist, questions, and it ends on the
// start action.
export default function DigitalTwinPage() {
  const page = digitalTwinPage;
  return (
    <>
      <JsonLd
        id="ld-breadcrumb"
        data={buildBreadcrumbSchema([
          { name: "Home", url: `${SITE_URL}/` },
          { name: "Digital Twin", url: `${SITE_URL}/digital-twin` },
        ])}
      />
      <JsonLd id="ld-faq" data={buildFaqSchema(page.faq)} />

      <VideoHero {...page.hero} />

      <AudienceCards intro={page.forYou.intro} audiences={page.forYou.audiences} tone="cream" />

      <EditorialStages
        intro={page.steps.intro}
        stages={page.steps.stages}
        tone="sand"
        visuals={[
          <TwinQuestionPreview
            key="question"
            question={twinReport.question}
            label={page.steps.stages[0].imageAlt ?? ""}
          />,
          <TwinProjectionChart
            key="projection"
            chart={twinReport.projection}
            title={twinReport.chartTitle}
            label={page.steps.stages[1].imageAlt ?? ""}
          />,
          <TwinDailyLifePreview
            key="daily-life"
            dailyLife={twinReport.dailyLife}
            title={twinReport.chartTitle}
            label={page.steps.stages[2].imageAlt ?? ""}
          />,
          <TwinProjectionChart
            key="with-care"
            chart={twinReport.withCare}
            title={twinReport.chartTitle}
            label={page.steps.stages[3].imageAlt ?? ""}
          />,
        ]}
      />

      <GuideBenefit {...page.goodToKnow} />

      <FeatureCardGrid
        id="science"
        intro={page.science.intro}
        cards={page.science.cards}
        columns={2}
        rounded={false}
        secondary={page.science.secondary}
      />

      <FeatureSpotlight {...page.technology} tone="sand" imagePosition="left" />

      <EditorialIntro {...page.notADiagnosis} />

      <FeatureSpotlight {...page.plan} tone="cream" />

      <FAQ intro={page.faqIntro} items={page.faq} tone="sand" />

      <FinalCTA {...page.closing} />
    </>
  );
}
