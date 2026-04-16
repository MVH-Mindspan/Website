import { PageHero } from "@/components/organisms/sections/PageHero";
import { FinalCTA } from "@/components/organisms/sections/FinalCTA";
import { aboutPage } from "@/content/pages/about";
import { finalCta } from "@/content";

export const metadata = aboutPage.metadata;

export default function AboutPage() {
  return (
    <>
      <PageHero {...aboutPage.hero} />
      <FinalCTA {...finalCta} />
    </>
  );
}
