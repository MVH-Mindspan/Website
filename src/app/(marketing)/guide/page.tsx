import {
  PageHero,
  FeatureCardGrid,
  FeatureSpotlight,
  SimpleSteps,
  FAQ,
  FinalCTA,
} from "@/components/organisms/sections";
import { CmsDisclosure } from "@/components/atoms/CmsDisclosure";
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
        rounded={false}
        tone="sand"
        secondary={{ label: "Talk to us: (617) 420-9000", href: "tel:+16174209000" }}
      />

      <FeatureSpotlight
        {...guidePage.support247}
        secondary={{ label: "Talk to us: (617) 420-9000", href: "tel:+16174209000" }}
      />

      <SimpleSteps
        intro={guidePage.eligibilityIntro}
        stages={guidePage.eligibilityItems}
        tone="sand"
      />

      <SimpleSteps
        intro={guidePage.howEnrollmentIntro}
        stages={guidePage.howEnrollmentSteps}
        secondary={{ label: "Talk to us: (617) 420-9000", href: "tel:+16174209000" }}
      />

      <FAQ
        intro={{ eyebrow: "Common questions", title: "What families ask us about GUIDE." }}
        items={guidePage.faq}
      />

      <CmsDisclosure includePartnerNote />

      <FinalCTA
        eyebrow={guidePage.finalCta.eyebrow}
        title={guidePage.finalCta.title}
        lead={guidePage.finalCta.lead}
        primary={guidePage.finalCta.primary}
        signature={guidePage.finalCta.signature}
      />
    </>
  );
}
