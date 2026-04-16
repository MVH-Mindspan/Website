import { PageHero } from "@/components/organisms/sections/PageHero";
import { FinalCTA } from "@/components/organisms/sections/FinalCTA";
import { careersPage } from "@/content/pages/careers";
import { finalCta } from "@/content";

export const metadata = careersPage.metadata;

export default function CareersPage() {
  return (
    <>
      <PageHero {...careersPage.hero} />
      <FinalCTA {...finalCta} />
    </>
  );
}
