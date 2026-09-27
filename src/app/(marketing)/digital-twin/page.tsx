import {
  PageHero,
  AudienceCards,
  SimpleSteps,
  GuideBenefit,
  FeatureSpotlight,
  SplitCards,
  EditorialIntro,
  FAQ,
  FinalCTA,
} from "@/components/organisms/sections";
import { finalCta } from "@/content";
import { digitalTwinPage } from "@/content/pages/digitalTwin";
import { JsonLd } from "@/lib/json-ld";
import { buildBreadcrumbSchema, buildFaqSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/seo";

export const metadata = digitalTwinPage.metadata;

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

      <AudienceCards
        intro={page.forYou.intro}
        audiences={page.forYou.audiences}
        tone="cream"
      />

      <SimpleSteps intro={page.views.intro} stages={page.views.stages} tone="sand" />

      <GuideBenefit {...page.share} />

      <FeatureSpotlight {...page.science} tone="sand" imagePosition="left" />

      <SplitCards
        intro={page.compare.intro}
        core={page.compare.core}
        edge={page.compare.edge}
        closing={page.compare.closing}
      />

      <EditorialIntro {...page.notADiagnosis} />

      <FeatureSpotlight {...page.plan} tone="cream" />

      <FAQ intro={page.faqIntro} items={page.faq} tone="sand" />

      <FinalCTA {...finalCta} />
    </>
  );
}
