import { PageHero } from "@/components/organisms/sections/PageHero";
import { consentPage } from "@/content/pages/legal";

export const metadata = consentPage.metadata;

export default function ConsentPage() {
  return <PageHero {...consentPage.hero} />;
}
