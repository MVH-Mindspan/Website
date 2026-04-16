import { PageHero } from "@/components/organisms/sections/PageHero";
import { termsPage } from "@/content/pages/legal";

export const metadata = termsPage.metadata;

export default function TermsPage() {
  return <PageHero {...termsPage.hero} />;
}
