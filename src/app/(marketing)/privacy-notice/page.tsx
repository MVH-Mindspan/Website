import { PageHero } from "@/components/organisms/sections/PageHero";
import { LegalDocument } from "@/components/organisms/sections/LegalDocument";
import { privacyNoticePage } from "@/content/pages/legal/privacy-notice";
import { JsonLd } from "@/lib/json-ld";
import { buildBreadcrumbSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/seo";

export const metadata = privacyNoticePage.metadata;

export default function PrivacyNoticePage() {
  return (
    <>
      <JsonLd
        id="ld-breadcrumb"
        data={buildBreadcrumbSchema([
          { name: "Home", url: `${SITE_URL}/` },
          { name: "Privacy Notice", url: `${SITE_URL}/privacy-notice` },
        ])}
      />
      <PageHero {...privacyNoticePage.hero} />
      <LegalDocument {...privacyNoticePage.document} />
    </>
  );
}
