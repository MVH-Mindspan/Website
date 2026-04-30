import {
  PageHero,
  FeatureCardGrid,
  FeatureSpotlight,
  EditorialStages,
  FAQ,
  FinalCTA,
} from "@/components/organisms/sections";
import { guidePage } from "@/content/pages/guide";

export const metadata = guidePage.metadata;

export default function GuidePage() {
  return (
    <>
      <PageHero {...guidePage.hero} />

      <FeatureCardGrid
        id="benefits"
        intro={guidePage.benefitsIntro}
        cards={guidePage.benefits}
        columns={3}
        rounded
      />

      <FeatureSpotlight {...guidePage.support247} />

      <EditorialStages
        intro={guidePage.eligibilityIntro}
        stages={guidePage.eligibilityItems}
      />

      <EditorialStages
        intro={guidePage.howEnrollmentIntro}
        stages={guidePage.howEnrollmentSteps}
      />

      <FAQ
        intro={{ eyebrow: "Common questions", title: "What families ask us about GUIDE." }}
        items={guidePage.faq}
      />

      <FinalCTA
        eyebrow={guidePage.finalCta.eyebrow}
        title={guidePage.finalCta.title}
        lead={guidePage.finalCta.lead}
        primary={guidePage.finalCta.primary}
        secondary={guidePage.finalCta.secondary}
        signature={guidePage.finalCta.signature}
      />
    </>
  );
}
