import { Button } from "@/components/atoms/Button";
import { ArrowIcon } from "@/components/atoms/ArrowIcon";
import {
  PageHero,
  FeatureCardGrid,
  FAQ,
  FinalCTA,
} from "@/components/organisms/sections";
import { CmsDisclosure } from "@/components/atoms/CmsDisclosure";
import { finalCta } from "@/content";
import { medicarePage } from "@/content/pages/medicare";
import { JsonLd } from "@/lib/json-ld";
import {
  buildAllClinicsSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/schema";
import { SITE_URL } from "@/lib/seo";

export const metadata = medicarePage.metadata;

export default function MedicarePage() {
  const { hero } = medicarePage;

  return (
    <>
      <JsonLd
        id="ld-breadcrumb"
        data={buildBreadcrumbSchema([
          { name: "Home", url: `${SITE_URL}/` },
          { name: "Medicare", url: `${SITE_URL}/medicare` },
        ])}
      />
      <JsonLd id="ld-faq" data={buildFaqSchema(medicarePage.faq)} />
      {/* No clinician nodes: this page doesn't show the clinicians. */}
      <JsonLd id="ld-clinics" data={buildAllClinicsSchema({ withClinicians: false })} />

      <PageHero eyebrow={hero.eyebrow} title={hero.title} lead={hero.lead}>
        <div className="flex flex-wrap gap-3">
          <Button
            href={hero.careCompare.href}
            variant="primary"
            size="lg"
            iconRight={<ArrowIcon />}
          >
            {hero.careCompare.label}
          </Button>
          <Button href={hero.call.href} variant="ghostDark" size="lg">
            {hero.call.label}
          </Button>
        </div>
      </PageHero>

      <FeatureCardGrid
        id="clinics"
        intro={medicarePage.clinicsIntro}
        cards={medicarePage.clinics}
        columns={2}
        rounded={false}
        tone="sand"
        secondary={medicarePage.guideLink}
      />

      <CmsDisclosure />

      <FAQ intro={medicarePage.faqIntro} items={medicarePage.faq} tone="cream" />

      <FinalCTA {...finalCta} />
    </>
  );
}
