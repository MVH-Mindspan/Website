import { PageHero } from "@/components/organisms/sections/PageHero";
import { LegalDocument } from "@/components/organisms/sections/LegalDocument";
import { privacyNoticePage } from "@/content/pages/legal/privacy-notice";

export const metadata = privacyNoticePage.metadata;

export default function PrivacyNoticePage() {
  return (
    <>
      <PageHero {...privacyNoticePage.hero} />
      <LegalDocument {...privacyNoticePage.document} />
    </>
  );
}
