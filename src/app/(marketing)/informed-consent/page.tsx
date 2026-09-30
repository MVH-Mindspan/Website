import { PageHero } from "@/components/organisms/sections/PageHero";
import { LegalDocument } from "@/components/organisms/sections/LegalDocument";
import { informedConsentPage } from "@/content/pages/legal/informed-consent";
import { JsonLd } from "@/lib/json-ld";
import { buildBreadcrumbSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/seo";

export const metadata = informedConsentPage.metadata;

export default function InformedConsentPage() {
  return (
    <>
      <JsonLd
        id="ld-breadcrumb"
        data={buildBreadcrumbSchema([
          { name: "Home", url: `${SITE_URL}/` },
          { name: "Informed Consent", url: `${SITE_URL}/informed-consent` },
        ])}
      />
      <PageHero {...informedConsentPage.hero} />
      <LegalDocument {...informedConsentPage.document} />
    </>
  );
}
