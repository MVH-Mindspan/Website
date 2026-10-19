import {
  PageHero,
  FeatureCardGrid,
  QuestionCards,
  SimpleSteps,
  FAQ,
  FinalCTA,
} from "@/components/organisms/sections";
import { MeasureRow } from "@/components/molecules/MeasureRow";
import { biomarkersPage } from "@/content/pages/biomarkers";
import { JsonLd } from "@/lib/json-ld";
import { buildBreadcrumbSchema, buildFaqSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/seo";

export const metadata = biomarkersPage.metadata;

export default function BiomarkersPage() {
  return (
    <>
      <JsonLd
        id="ld-breadcrumb"
        data={buildBreadcrumbSchema([
          { name: "Home", url: `${SITE_URL}/` },
          { name: "Biomarker testing", url: `${SITE_URL}/biomarkers` },
        ])}
      />
      <JsonLd id="ld-faq" data={buildFaqSchema(biomarkersPage.faq)} />
      <PageHero {...biomarkersPage.hero}>
        <MeasureRow {...biomarkersPage.measures} />
      </PageHero>
      <FeatureCardGrid
        id="why"
        intro={biomarkersPage.whyIntro}
        cards={biomarkersPage.whyCards}
        columns={3}
        rounded={false}
        tone="sand"
      />
      <QuestionCards
        id="what-it-measures"
        intro={biomarkersPage.questionsIntro}
        items={biomarkersPage.questions}
      />
      <SimpleSteps
        intro={biomarkersPage.overTimeIntro}
        stages={biomarkersPage.overTimeSteps}
        tone="sand"
      />
      <FAQ
        intro={biomarkersPage.faqIntro}
        items={biomarkersPage.faq}
        tone="cream"
      />
      <FinalCTA {...biomarkersPage.finalCta} />
    </>
  );
}
