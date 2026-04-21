import {
  PageHero,
  FeatureCardGrid,
  FinalCTA,
} from "@/components/organisms/sections";
import { whatWeTreatPage } from "@/content/pages/whatWeTreat";

export const metadata = whatWeTreatPage.metadata;

export default function WhatWeTreatPage() {
  return (
    <>
      <PageHero {...whatWeTreatPage.hero} />

      <FeatureCardGrid
        id="conditions"
        intro={whatWeTreatPage.conditions}
        cards={whatWeTreatPage.conditionCards}
        columns={3}
      />

      <FinalCTA {...whatWeTreatPage.finalCta} />
    </>
  );
}
