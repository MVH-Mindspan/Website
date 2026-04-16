import { PageHero } from "@/components/organisms/sections/PageHero";
import { privacyPage } from "@/content/pages/legal";

export const metadata = privacyPage.metadata;

export default function PrivacyPage() {
  return <PageHero {...privacyPage.hero} />;
}
