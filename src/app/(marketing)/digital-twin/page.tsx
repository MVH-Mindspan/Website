import {
  PageHero,
  AudienceCards,
  EditorialStages,
  GuideBenefit,
  FeatureSpotlight,
  EditorialIntro,
  FAQ,
  FinalCTA,
} from "@/components/organisms/sections";
import { digitalTwinPage } from "@/content/pages/digitalTwin";
import { JsonLd } from "@/lib/json-ld";
import { buildBreadcrumbSchema, buildFaqSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/seo";

export const metadata = digitalTwinPage.metadata;

// One story, slowly: the question, who it is for, how it works (with real
// screens), what to know, why to trust it, its limits, the next step with a
// neurologist, questions, and it ends on the start action.
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

      <PageHero {...page.hero} />

      <AudienceCards intro={page.forYou.intro} audiences={page.forYou.audiences} tone="cream" />

      <EditorialStages intro={page.steps.intro} stages={page.steps.stages} tone="sand" />

      <GuideBenefit {...page.goodToKnow} />

      <FeatureSpotlight {...page.research} tone="sand" imagePosition="left" />

      <EditorialIntro {...page.notADiagnosis} />

      <FeatureSpotlight {...page.plan} tone="cream" />

      <FAQ intro={page.faqIntro} items={page.faq} tone="sand" />

      <FinalCTA {...page.closing} />
    </>
  );
}
