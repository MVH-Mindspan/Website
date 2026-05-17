import { PageHero } from "@/components/organisms/sections/PageHero";
import { FeatureSpotlight } from "@/components/organisms/sections/FeatureSpotlight";
import { FeatureCardGrid } from "@/components/organisms/sections/FeatureCardGrid";
import { FinalCTA } from "@/components/organisms/sections/FinalCTA";
import { aboutPage } from "@/content/pages/about";
import { finalCta } from "@/content";
import { JsonLd } from "@/lib/json-ld";
import { buildBreadcrumbSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/seo";

export const metadata = aboutPage.metadata;

export default function AboutPage() {
  return (
    <>
      <JsonLd
        id="ld-breadcrumb"
        data={buildBreadcrumbSchema([
          { name: "Home", url: `${SITE_URL}/` },
          { name: "About", url: `${SITE_URL}/about` },
        ])}
      />
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
