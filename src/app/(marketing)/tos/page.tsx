import { PageHero } from "@/components/organisms/sections/PageHero";
import { LegalDocument } from "@/components/organisms/sections/LegalDocument";
import { tosPage } from "@/content/pages/legal/tos";
import { JsonLd } from "@/lib/json-ld";
import { buildBreadcrumbSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/seo";

export const metadata = tosPage.metadata;

export default function TermsOfServicePage() {
  return (
    <>
      <JsonLd
        id="ld-breadcrumb"
        data={buildBreadcrumbSchema([
          { name: "Home", url: `${SITE_URL}/` },
          { name: "Terms of Service", url: `${SITE_URL}/tos` },
        ])}
      />
      <PageHero {...tosPage.hero} />
      <LegalDocument {...tosPage.document} />
    </>
  );
}
