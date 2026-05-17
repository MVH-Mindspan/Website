import { PageHero } from "@/components/organisms/sections/PageHero";
import { FinalCTA } from "@/components/organisms/sections/FinalCTA";
import { careersPage } from "@/content/pages/careers";
import { finalCta } from "@/content";
import { JsonLd } from "@/lib/json-ld";
import { buildBreadcrumbSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/seo";

export const metadata = careersPage.metadata;

export default function CareersPage() {
  return (
    <>
      <JsonLd
        id="ld-breadcrumb"
        data={buildBreadcrumbSchema([
          { name: "Home", url: `${SITE_URL}/` },
          { name: "Careers", url: `${SITE_URL}/careers` },
        ])}
      />
      <PageHero {...careersPage.hero} />
      <FinalCTA {...finalCta} />
    </>
  );
}
