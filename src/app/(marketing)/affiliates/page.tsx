import { PageHero } from "@/components/organisms/sections/PageHero";
import { LegalDocument } from "@/components/organisms/sections/LegalDocument";
import { affiliatesPage } from "@/content/pages/legal/affiliates";
import { JsonLd } from "@/lib/json-ld";
import { buildBreadcrumbSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/seo";

export const metadata = affiliatesPage.metadata;

export default function AffiliatesPage() {
  return (
    <>
      <JsonLd
        id="ld-breadcrumb"
        data={buildBreadcrumbSchema([
          { name: "Home", url: `${SITE_URL}/` },
          { name: "Affiliates", url: `${SITE_URL}/affiliates` },
        ])}
      />
      <PageHero {...affiliatesPage.hero} />
      <LegalDocument {...affiliatesPage.document} showToc={false} />
    </>
  );
}
