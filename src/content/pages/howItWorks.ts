import { buildMetadata } from "@/lib/seo";
import type { JourneyStage } from "../journey";
import type { Protocol } from "../protocols";
import type { TechCard } from "../technology";
import type { Stat } from "../stats";
import type { IllustratedPillar } from "@/components/organisms/sections";

const BOOKING_HREF = "/book-a-visit";

const journeyStages: IllustratedPillar[] = [
  {
    kicker: "Start at home",
    title: "Take a confidential screening, at your own pace.",
    body:
      "Your journey begins with a free, at-home screening you can complete on a laptop or tablet. No clinic visit, no account, no waiting room. About thirty unhurried minutes is all it takes to get a clear picture of where you are.",
    illustration: "assess",
  },
  {
    kicker: "Get answers",
    title: "Receive a personalized, easy-to-understand report.",
    body:
      "Right after the screening, you receive a clear summary of your cognitive wellness, written in plain language. You\u2019ll know what stood out, what didn\u2019t, and whether a closer look from a neurologist would be useful.",
    illustration: "report",
  },
  {
    kicker: "See a specialist",
    title: "Meet a board-certified neurologist within weeks.",
    body:
      "If your report suggests further evaluation, we connect you with a board-certified neurologist within weeks, not 18 months. Visits happen in our clinics or on video, and your insurance is billed like any other specialist appointment.",
    illustration: "meet",
  },
  {
    kicker: "Stay supported",
    title: "Settle into the Mindspan Protocol, with a team beside you.",
    body:
      "From there, your neurologist builds a plan that pairs the latest therapies with personalized lifestyle adjustments and progress tracking. Our care team checks in between visits so you and your family always know what\u2019s next.",
    illustration: "protocol",
  },
];

const comparison: { problem: Protocol; solution: Protocol } = {
  problem: {
    id: "typical",
    eyebrow: "The typical wait",
    title: "Eighteen months before anyone can tell you what\u2019s going on.",
    body:
      "In most of the country, a worried family books a primary-care visit, gets referred to a neurologist, and then waits. The average wait for a specialist cognitive assessment is twelve to eighteen months, the most precious window of all.",
    bullets: [
      "Months of uncertainty between first worry and first answer",
      "Multiple referrals before anyone with the right training is in the room",
      "Care decisions made on incomplete information, often too late to change the trajectory",
      "Families left to coordinate between specialists alone",
    ],
    icon: "shield",
  },
  solution: {
    id: "mindspan",
    eyebrow: "The Mindspan path",
    title: "Answers today. A neurologist within weeks.",
    body:
      "Mindspan compresses an eighteen-month wait into a few weeks. Start with a free screening tonight. If a neurologist visit makes sense, we book one within weeks and bring the latest cognitive science to your plan from day one.",
    bullets: [
      "A free at-home screening you can take in about 30 minutes",
      "A board-certified neurologist seen within weeks, in clinic or on video",
      "Advanced diagnostics and FDA-approved therapies, billed through insurance",
      "A care team that stays with you and your family between visits",
    ],
    icon: "bullseye",
  },
};

const stats: Stat[] = [
  { value: "2\u20133 wks", label: "Average time to see a neurologist" },
  { value: "30 min", label: "Free at-home cognitive screening" },
  { value: "100%", label: "Of visits billed through insurance" },
  { value: "4 phases", label: "Of coordinated, ongoing cognitive care" },
];

const difference: TechCard[] = [
  {
    id: "digital-twin",
    eyebrow: "Your Cognitive Digital Twin",
    title: "A living model of your brain health.",
    body:
      "We bring your history, labs, imaging, biomarkers, and cognitive tests together into a personalized model of your cognitive trajectory. Your neurologist uses it to make proactive decisions with evidence, not guesses.",
    icon: "brain",
  },
  {
    id: "answers",
    eyebrow: "Immediate answers",
    title: "No months of uncertainty.",
    body:
      "Skip the agonizing waitlist. The screening starts today, the report arrives the same day, and our care team helps you decide what comes next, even if that\u2019s simply peace of mind.",
    icon: "bullseye",
  },
  {
    id: "plan",
    eyebrow: "A plan that empowers",
    title: "More than a diagnosis, a way forward.",
    body:
      "We deliver a comprehensive plan, not just a label. Tangible steps across nine lifestyle factors, advanced therapies when indicated, and check-ins that keep the plan honest as your life changes.",
    icon: "shield",
  },
  {
    id: "family",
    eyebrow: "Built for families",
    title: "Everyone has a seat at the table.",
    body:
      "Mindspan was designed as a collaborative platform from the start. Share insights with siblings, coordinate with our care team, and navigate your loved one\u2019s cognitive health together, in person or from anywhere.",
    icon: "chat",
  },
];

const howToStart: JourneyStage[] = [
  {
    kicker: "Step 01",
    title: "Sign up in minutes",
    body:
      "Tell us a little about you. The screening opens immediately and our care team is on call if any question feels unclear. There\u2019s no cost and no commitment.",
    cta: { label: "Start a free screening", href: "https://assessment.mindspan.co/" },
  },
  {
    kicker: "Step 02",
    title: "Read your report together",
    body:
      "We share your results in plain language and review them with you. If a neurologist visit isn\u2019t needed, we\u2019ll tell you. If it is, we book one within weeks and validate your insurance up front.",
  },
  {
    kicker: "Step 03",
    title: "Begin coordinated care",
    body:
      "Your neurologist puts a plan in place, advanced diagnostics where useful, therapies when indicated, and lifestyle targets tailored to you. Your primary care doctor is kept in the loop.",
  },
  {
    kicker: "Step 04",
    title: "Keep the plan honest",
    body:
      "Mindspan stays with you between visits. We track what\u2019s working, adjust what isn\u2019t, and answer the questions families usually have to figure out alone.",
  },
];

export const howItWorksPage = {
  metadata: buildMetadata({
    title: "What to Expect | Mindspan",
    description:
      "From a free at-home cognitive screening to a neurologist visit within weeks. See exactly how Mindspan works, step by step, with no surprises.",
    canonical: "/about/how-it-works",
  }),

  hero: {
    video: "/assets/what-to-expect-video.mp4",
    poster: "/assets/what-to-expect-hero.jpg",
    headline: "A simple, continuous path through cognitive care.",
    subTagline: "What to expect",
    subhead:
      "From a free at-home screening to ongoing care guided by a board-certified neurologist, here\u2019s exactly what your Mindspan journey looks like.",
    cta: { label: "Start a free screening", href: "https://assessment.mindspan.co/" },
    playbackRate: 0.9,
  },

  comparison: {
    intro: {
      eyebrow: "The Mindspan difference, in one comparison",
      title: "Cognitive care, without the wait.",
      lead:
        "Most families spend the most precious months in limbo. We rebuilt the path so that the time between worry and a real answer is measured in weeks, not years.",
      image: "/assets/what-to-expect-conversation.jpg",
      imageAlt:
        "Two people sitting across a table in a sunlit Mindspan clinic, mid-conversation with olive trees outside.",
    },
    problem: comparison.problem,
    solution: comparison.solution,
    closing:
      "Every Mindspan patient receives the full standard of neurological care, plus the precision tools and the coordinated team that make a difference at the start of the journey.",
    cta: {
      label: "See if you\u2019d benefit from a screening",
      href: "https://assessment.mindspan.co/",
    },
  },

  journey: {
    intro: {
      eyebrow: "Your journey, in four phases",
      title: "What happens, in the order it happens.",
      lead:
        "Most of cognitive care feels opaque. Mindspan was designed so that you always know where you are in the journey, what comes next, and who is with you for each step.",
    },
    items: journeyStages,
  },

  stats,

  difference: {
    intro: {
      eyebrow: "What makes Mindspan different",
      title: "Four quiet advantages built into every visit.",
      lead:
        "You won\u2019t have to learn how any of this works. We use them so your experience with us feels unhurried, personal, and safe, and so the science stays current with the people doing the research.",
    },
    cards: difference,
  },

  howToStart: {
    intro: {
      eyebrow: "How to get started",
      title: "Starting is simple. You can do it from home.",
      lead:
        "Complete the quick sign-up process, and we\u2019ll take care of coordinating specialists, next steps, and ongoing care, guiding you the whole way.",
      image: "/assets/what-to-expect-consultation.jpg",
      imageAlt:
        "A Mindspan neurologist reviewing a brain scan on a monitor with two patients in a sunlit clinic room.",
    },
    items: howToStart,
  },

  finalCta: {
    eyebrow: "When you are ready",
    title: "See a specialist in weeks, not months or years.",
    lead:
      "Early answers mean better outcomes, and more time with the people who matter most.",
    primary: { label: "Start a free screening", href: "https://assessment.mindspan.co/" },
    secondary: { label: "Talk to our care team", href: BOOKING_HREF },
  },
} as const;
