import { buildMetadata } from "@/lib/seo";
import { brand } from "../brand";
import { twinToolHref } from "../digitalTwin";
import type { Audience } from "../audiences";
import type { FAQItem } from "../faq";
import type { JourneyStage } from "../journey";
import type { TechCard } from "../technology";

// Written for older readers, some with memory changes: one idea per
// section, short sentences, numerals, and the same two actions everywhere
// ("Start the 10-year projection" and "Book a visit").
//
// The introduction to the Digital Twin lives at twin.mindspan.co. Every link
// to it opens in a new tab, and the organisms that render them add the
// screen-reader "(opens in new tab)" label. The page also says so in plain
// text, because a new tab can disorient older readers.

const BOOKING_HREF = "/book-a-visit";
const START_LABEL = "Start the 10-year projection";

const audiences: Audience[] = [
  {
    id: "self",
    kicker: "For you",
    title: "You have noticed changes in yourself.",
    body: "See what the next 10 years may look like for you, and what care may change.",
    cta: "Start for me",
    href: twinToolHref("dt-card-self"),
  },
  {
    id: "loved-one",
    kicker: "For someone you love",
    title: "You are worried about someone close to you.",
    body: "Answer for them, or with them. See what the next 10 years may look like for them.",
    cta: "Start for them",
    href: twinToolHref("dt-card-loved-one"),
  },
];

const steps: JourneyStage[] = [
  {
    kicker: "Answer",
    title: "Answer simple questions.",
    body:
      "It opens in a new tab. Tell us who it is for. Then answer questions about memory, mood, and health. It takes about 10 minutes, and you can stop and come back.",
    imageAlt:
      "Example question screen. It asks “Where would you place yourself today?” A slider is set to “Mild changes or better”: daily life carries on as usual.",
  },
  {
    kicker: "See",
    title: "See the next 10 years.",
    body:
      "A simple chart shows how memory and daily life may change over 10 years, across 7 stages. It is based on people at a similar stage. The shaded band shows a range, because no one\u2019s path is fixed.",
    imageAlt:
      "Example chart for a sample profile. A line starts at stage 3, mild changes, and moves slowly toward stage 5 over 10 years, inside a shaded range of possible outcomes.",
  },
  {
    kicker: "Everyday life",
    title: "See what it means for daily life.",
    body:
      "The report also explains the years in everyday terms, like getting out and about, money and paperwork, and the kitchen. A timeline shows when each may be done on your own, together with someone, or with help. It shows this with care and without it.",
    imageAlt:
      "Example everyday-life view for a sample profile. A key explains independent, together, and with help. For getting out and about, two bars run from today to 10 years. With science-backed care, the stage of doing things together with someone lasts longer before more help is needed.",
  },
  {
    kicker: "Compare",
    title: "See what care may change.",
    body:
      "Add care, like healthy habits and treatment. Then compare the path with care and without it. Care may slow the changes. That can mean more time at each stage.",
    imageAlt:
      "Example chart for a sample profile. A solid line with science-backed care stays above a dashed line without added care, showing a slower pace over 10 years.",
    cta: { label: START_LABEL, href: twinToolHref("dt-steps") },
  },
];

const scienceCards: TechCard[] = [
  {
    id: "memory-change",
    eyebrow: "Where it starts",
    title: "How memory usually changes.",
    body:
      "The projection starts from how much memory test scores usually change in a year, for people of a similar age and starting score. Then it adjusts for health answers, like blood pressure, hearing, and mood.",
    icon: "refresh",
  },
  {
    id: "stages",
    eyebrow: "The stages",
    title: "Seven clear stages.",
    body:
      "The stages are adapted from the 2024 staging guide of the Alzheimer’s Association. They run from steady, to mild changes, to late stage.",
    icon: "grid",
  },
  {
    id: "care",
    eyebrow: "What care may do",
    title: "Care, based on large studies.",
    body:
      "The effects of healthy habits come from large studies, like the U.S. POINTER study and the 2024 Lancet Commission report on dementia. Treatment effects come from published trials and reviews.",
    icon: "shield",
  },
  {
    id: "range",
    eyebrow: "An honest range",
    title: "No one’s path is fixed.",
    body:
      "The shaded band on the chart shows the range of possible outcomes. A visit with a neurologist can help narrow it.",
    icon: "bullseye",
  },
];

const faq: FAQItem[] = [
  {
    id: "diagnosis",
    question: "Is this a diagnosis?",
    answer:
      "No. It is an estimate based on research about groups of people. A visit with a neurologist is how you get real answers.",
  },
  {
    id: "test-score",
    question: "Do I need a test score?",
    answer:
      "No. A recent memory test score helps. If you do not have one, you can pick the stage that seems closest.",
  },
  {
    id: "parent",
    question: "Can I do this for a parent?",
    answer:
      "Yes. Choose “Start for them.” If you can, answer together, so their view counts too.",
  },
  {
    id: "information",
    question: "What happens to my information?",
    answer: `Your answers are saved in this browser, so you can come back later on the same device. To see your results, you add a first name and email. Questions? Call us at ${brand.phone}.`,
  },
  {
    id: "no-diagnosis",
    question: "What if there is no diagnosis yet?",
    answer:
      "You can still use it. But it is built from data on people with an Alzheimer’s diagnosis. Without one, changes may come more slowly than the chart shows.",
  },
  {
    id: "free-assessment",
    question: "How is this different from the memory assessment?",
    answer:
      "The memory assessment is a short memory test. It checks memory today. The 10-year projection does not test memory. It shows how things may change over time. Both are free, and you can do both.",
  },
];

export const digitalTwinPage = {
  metadata: buildMetadata({
    title: "Digital Twin: A 10-Year Memory Projection | Mindspan",
    description:
      "See what the next 10 years may look like, for you or someone you love, and what care may change. Free, about 10 minutes, from home. Not a diagnosis.",
    canonical: "/digital-twin",
  }),

  // Same full-bleed hero as the main pages, with a still image.
  hero: {
    poster: "/assets/digital-twin-hero.webp",
    headline: "What might the next 10 years look like?",
    subTagline: "An introduction to our Digital Twin.",
    subhead:
      "Answer simple questions. A chart then shows how memory may change over 10 years, with and without care. For you, or for someone you love.",
    cta: { label: START_LABEL, href: twinToolHref("dt-hero") },
    ctaNote: "Free. About 10 minutes, from home.",
    secondaryCta: { label: "Book a visit", href: BOOKING_HREF },
  },

  forYou: {
    intro: {
      eyebrow: "Who is it for?",
      title: "Start for yourself, or for someone you love.",
      lead: "Pick the one that fits. You can change it later.",
    },
    audiences,
  },

  steps: {
    intro: {
      eyebrow: "How it works",
      title: "Four simple steps.",
      lead: "These are real screens from the tool, shown for a sample profile. Yours will look different.",
    },
    stages: steps,
  },

  goodToKnow: {
    eyebrow: "Good to know",
    title: "Before you start.",
    lead: "Read these first.",
    bullets: [
      "It is free.",
      "It takes about 10 minutes.",
      "It opens in a new tab. This page stays open.",
      "You can stop and come back later on the same device.",
      "No account is needed. You add a first name and email to see your results.",
      "It is built for people with an Alzheimer’s diagnosis. Without one, changes may come more slowly than the chart shows.",
      "It is an estimate, not a diagnosis.",
    ],
    eligibilityTitle: "Helpful to have nearby",
    eligibility: [
      "A recent memory test score, if you have one",
      "The names of any memory medicines",
      "Recent blood pressure, height, and weight",
    ],
    footnote: `Questions? Call us at ${brand.phone}.`,
    cta: { label: START_LABEL, href: twinToolHref("dt-good-to-know") },
  },

  science: {
    intro: {
      eyebrow: "The science",
      title: "What the projection is built on.",
      lead: "Published research, explained in plain words.",
    },
    cards: scienceCards,
    secondary: { label: "See the science behind our care", href: "/about/science#technology" },
  },

  technology: {
    id: "digital-twin",
    eyebrow: "Part of our care",
    title: "An early look at the Digital Twin our neurologists use.",
    body:
      "In clinic, our neurologists build a full Digital Twin from a person’s own history, tests, and imaging. They use it to plan care, and update it at every visit. This projection is a first look, from home.",
    image: "/assets/latest-science.webp",
    imageAlt: "A Mindspan neurologist reviews brain imaging with an older couple in clinic.",
  },

  notADiagnosis: {
    id: "not-a-diagnosis",
    title: "A projection, not a diagnosis.",
    lead:
      "It shows what often happens for people at a similar stage. It cannot say what will happen to one person. It does not replace a visit with a neurologist.",
  },

  plan: {
    id: "plan",
    eyebrow: "Next step",
    title: "Make a plan with a Mindspan neurologist.",
    body:
      "Tell us what your projection showed, or come without one. A neurologist will look at the full picture and make a plan with you. Most new patients are seen within 2 to 3 weeks.",
    image: "/assets/what-to-expect-conversation.webp",
    imageAlt:
      "A clinician in a yellow coat talks with an older woman in a striped cardigan across a small table by a window.",
    primary: { label: "Book a visit", href: BOOKING_HREF },
    secondary: { label: `Talk to us: ${brand.phone}`, href: brand.phoneHref },
  },

  faqIntro: {
    eyebrow: "Questions",
    title: "Common questions.",
  },
  faq,

  // The page ends on the start action, so readers who reach the bottom have
  // a clear way in. Booking stays beside it; the phone number is in "Next step".
  closing: {
    eyebrow: "Ready when you are",
    title: "See what the next 10 years may look like.",
    lead: "It is free and takes about 10 minutes, from home. Start for yourself, or for someone you love.",
    primary: { label: START_LABEL, href: twinToolHref("dt-closing") },
    secondary: { label: "Book a visit", href: BOOKING_HREF },
    signature: "With care, the Mindspan team",
  },
} as const;
