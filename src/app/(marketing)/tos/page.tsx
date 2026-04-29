import { PageHero } from "@/components/organisms/sections/PageHero";
import { LegalDocument } from "@/components/organisms/sections/LegalDocument";
import { tosPage } from "@/content/pages/legal/tos";

export const metadata = tosPage.metadata;

export default function TermsOfServicePage() {
  return (
    <>
      <PageHero {...tosPage.hero} />
      <LegalDocument {...tosPage.document} />
    </>
  );
}
