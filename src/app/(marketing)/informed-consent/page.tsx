import { PageHero } from "@/components/organisms/sections/PageHero";
import { LegalDocument } from "@/components/organisms/sections/LegalDocument";
import { informedConsentPage } from "@/content/pages/legal/informed-consent";

export const metadata = informedConsentPage.metadata;

export default function InformedConsentPage() {
  return (
    <>
      <PageHero {...informedConsentPage.hero} />
      <LegalDocument {...informedConsentPage.document} />
    </>
  );
}
