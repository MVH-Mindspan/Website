import {
  PageHero,
  SplitCards,
  StatsBand,
  GuideBenefit,
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
      />

      <GuideBenefit {...coveragePage.guideBenefit} />

      <StatsBand stats={coveragePage.stats} />

      <FinalCTA {...coveragePage.notSure} />
    </>
  );
}
