import { PageHero } from "@/components/organisms/sections/PageHero";
import { LegalDocument } from "@/components/organisms/sections/LegalDocument";
import { affiliatesPage } from "@/content/pages/legal/affiliates";

export const metadata = affiliatesPage.metadata;

export default function AffiliatesPage() {
  return (
    <>
      <PageHero {...affiliatesPage.hero} />
      <LegalDocument {...affiliatesPage.document} showToc={false} />
    </>
  );
}
