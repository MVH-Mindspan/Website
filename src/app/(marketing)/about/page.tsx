import { PageHero } from "@/components/organisms/sections/PageHero";
import { FeatureSpotlight } from "@/components/organisms/sections/FeatureSpotlight";
import { FeatureCardGrid } from "@/components/organisms/sections/FeatureCardGrid";
import { FinalCTA } from "@/components/organisms/sections/FinalCTA";
import { aboutPage } from "@/content/pages/about";
import { finalCta } from "@/content";

export const metadata = aboutPage.metadata;

export default function AboutPage() {
  return (
    <>
      <PageHero {...aboutPage.hero} />
      <FeatureSpotlight {...aboutPage.story} tone="sand" imagePosition="right" />
      <FeatureCardGrid
        intro={aboutPage.principles.intro}
        cards={aboutPage.principles.cards}
        columns={4}
        tone="primary"
      />
      <FinalCTA {...finalCta} />
    </>
  );
}
