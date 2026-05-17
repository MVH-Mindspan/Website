import { buildMetadata } from "@/lib/seo";
import type { TechCard } from "@/content/technology";

const principleCards: TechCard[] = [
  {
    id: "speed",
    eyebrow: "Speed",
    title: "Weeks, not months.",
    body:
      "In dementia care, timing changes everything. We hold urgent slots every week and answer new referrals within 48 hours, so a worried family can sit down with a neurologist in weeks, not years.",
    icon: "calendar",
  },
  {
    id: "team",
    eyebrow: "One team",
    title: "Everyone on the same page.",
    body:
      "Patients, caregivers, primary care providers, and our specialists all work from the same plan. No retelling your story, no lost referrals, no detail falling through the cracks between visits.",
    icon: "grid",
  },
  {
    id: "science",
    eyebrow: "Latest science",
    title: "Modern tools, used routinely.",
    body:
      "AI assisted assessments, advanced biomarker testing, and the newest therapeutics are part of how we work every day, not exceptions reserved for academic centers.",
    icon: "brain",
  },
  {
    id: "family",
    eyebrow: "Real life",
    title: "Built around your family.",
    body:
      "Cognitive change touches everyone in a household. Our care plans, scheduling, and follow up are designed for the realities of daily life, not for clinical convenience.",
    icon: "home",
  },
];

export const aboutPage = {
  metadata: buildMetadata({
    title: "About Mindspan | Cognitive Care & Dementia Specialists",
    description:
      "Mindspan is a specialist clinic for memory and dementia care. Board-certified neurologists, the latest science, and visits in weeks not months.",
    canonical: "/about",
  }),
  hero: {
    eyebrow: "About Mindspan",
    title: "A clinic built around the people who need it most.",
    lead:
      "We built Mindspan so that families worried about memory do not have to wait, and so neurologists can practice the medicine they trained for.",
  },
  story: {
    eyebrow: "Why we exist",
    title: "When memory starts slipping, the wait is part of the problem.",
    body:
      "Most families wait twelve to eighteen months to see a neurologist about a parent's memory. By the time the appointment arrives, the most meaningful interventions are often already out of reach. Mindspan started so that no longer has to be the story. We bring families to a specialist within weeks, treat with the latest science, and stay with them through whatever comes next. We are not replacing the rest of the healthcare system. We are strengthening the parts of it that have not kept up.",
    image: "/assets/consultation-1.webp",
    imageAlt:
      "A Mindspan clinician sitting with a patient and family member during a consultation",
  },
  principles: {
    intro: {
      eyebrow: "What we believe",
      title: "Four ideas that shape every decision we make.",
      lead:
        "These principles are the reason a visit at Mindspan feels different from anywhere else you have been for cognitive care.",
    },
    cards: principleCards,
  },
} as const;
