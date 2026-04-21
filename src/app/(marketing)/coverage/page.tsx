import {
  PageHero,
  SplitCards,
  StatsBand,
  FinalCTA,
} from "@/components/organisms/sections";
import { coveragePage } from "@/content/pages/coverage";

export const metadata = coveragePage.metadata;

export default function CoveragePage() {
  return (
    <>
      <PageHero {...coveragePage.hero} />

      <SplitCards
        intro={coveragePage.howItWorks.intro}
        core={coveragePage.howItWorks.insurance}
        edge={coveragePage.howItWorks.guide}
      />

      <StatsBand stats={coveragePage.stats} />

      <FinalCTA {...coveragePage.notSure} />
    </>
  );
}
