import { PageHero } from "@/components/organisms/sections/PageHero";
import { FinalCTA } from "@/components/organisms/sections/FinalCTA";
import { referPage } from "@/content/pages/refer";
import { finalCta } from "@/content";

export const metadata = referPage.metadata;

export default function ReferPage() {
  return (
    <>
      <PageHero {...referPage.hero} />
      <FinalCTA {...finalCta} />
    </>
  );
}
