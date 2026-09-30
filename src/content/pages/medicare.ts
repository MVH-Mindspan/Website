import { buildMetadata } from "@/lib/seo";
import { clinics, type Clinic } from "@/content/clinics";
import type { FAQItem } from "../faq";
import type { TechCard } from "../technology";

const { danvers, bayArea } = clinics;

const cityOf = (clinic: Clinic) => `${clinic.address.locality}, ${clinic.address.region}`;

function clinicCard(id: string, clinic: Clinic): TechCard {
  return {
    id,
    eyebrow: `${cityOf(clinic)} clinic`,
    title: clinic.legalName,
    body: `${clinic.legalName} accepts Medicare assignment for visits at our ${clinic.address.locality} clinic. NPI ${clinic.npi}. ${clinic.addressDisplay}. Phone ${clinic.phone}.`,
    caption: clinic.hours,
    icon: "shield",
  };
}

export const medicarePage = {
  metadata: buildMetadata({
    title: "Does Mindspan Take Medicare? Yes. Medicare Coverage | Mindspan",
    description: `${danvers.legalName} (${cityOf(danvers)}) and ${bayArea.legalName} (${cityOf(bayArea)}) accept Medicare assignment. NPIs, addresses and what Part B covers.`,
    canonical: "/medicare",
  }),

  hero: {
    // Owner request: the H1 is the first line of the page, so no eyebrow.
    eyebrow: "",
    title: `${danvers.legalName} accepts Medicare assignment.`,
    lead: `Danvers clinic: ${danvers.addressDisplay}. Phone: ${danvers.phone}. NPI: ${danvers.npi}.`,
    // Until clinics.ts has the direct listing URL, the button opens the search
    // page and says so, rather than promising a listing it doesn't open.
    careCompare: danvers.careCompareUrl
      ? {
          label: `Find ${danvers.legalName} on Medicare Care Compare`,
          href: danvers.careCompareUrl,
        }
      : { label: "Search Medicare Care Compare", href: "https://www.medicare.gov/care-compare/" },
    call: { label: `Talk to us: ${danvers.phone}`, href: danvers.phoneHref },
  },

  clinicsIntro: {
    eyebrow: "Our clinics",
    title: "Medicare assignment at both Mindspan clinics.",
    lead:
      "Care at each clinic is provided by a Mindspan medical practice that accepts Medicare assignment. Here are the practice name, NPI, address and phone for each. If your loved one has a dementia diagnosis and Original Medicare, they may also qualify for GUIDE, Medicare’s dementia care model.",
  },

  clinics: [clinicCard("danvers", danvers), clinicCard("san-jose", bayArea)],

  // clinicsIntro.lead introduces GUIDE, so the link sits under the clinic cards.
  guideLink: { label: "Learn more about GUIDE", href: "/guide" },

  faqIntro: {
    eyebrow: "Common questions",
    title: "Medicare and your Mindspan visit.",
  },

  faq: [
    {
      id: "take-medicare",
      question: "Does Mindspan take Medicare?",
      answer: `Yes. The Mindspan medical practice at each of our clinics accepts Medicare assignment. ${danvers.legalName} (NPI ${danvers.npi}) sees patients at our clinic in ${cityOf(danvers)}, and ${bayArea.legalName} (NPI ${bayArea.npi}) sees patients at our clinic in ${cityOf(bayArea)}. Accepting assignment means we accept the Medicare-approved amount as full payment for covered services. You pay your usual Part B deductible and coinsurance, which a supplemental plan may cover.`,
    },
    {
      id: "visit-covered",
      question: "Is my Mindspan visit covered?",
      answer: `If you have Medicare, Part B covers medically necessary visits with a neurologist, including an evaluation of changes in memory and thinking. Your usual Part B deductible and coinsurance apply. We verify your coverage before your first visit and tell you what to expect. To check your coverage, call ${danvers.phone}. If your loved one has a dementia diagnosis and Original Medicare, they may also qualify for extra support through GUIDE, Medicare’s dementia care model.`,
    },
  ] satisfies FAQItem[],
} as const;
