import { buildMetadata } from "@/lib/seo";
import { brand } from "../brand";
import { twinToolHref } from "../digitalTwin";
import type { Audience } from "../audiences";
import type { FAQItem } from "../faq";
import type { JourneyStage } from "../journey";
import type { Protocol } from "../protocols";

const BOOKING_HREF = "/book-a-visit";

// The introduction to the Digital Twin lives at twin.mindspan.co. Every link
// to it opens in a new tab (AudienceCards and PageHero add the screen-reader
// "(opens in new tab)" label for external hrefs).

const audiences: Audience[] = [
  {
    id: "self",
    kicker: "If you’ve noticed changes in yourself",
    title: "A clearer view of the years ahead of you.",
    body:
      "Answer at your own pace. See how the next ten years may go, and how care may help you keep more of daily life for longer.",
    cta: "Start for me",
    href: twinToolHref("dt-card-self"),
  },
  {
    id: "loved-one",
    kicker: "If you’re caring for someone you love",
    title: "A clearer view of the years you share.",
    body:
      "Answer for them, or sit down and answer together. See how the next ten years may go, and what care may mean for your time with them.",
    cta: "Start for them",
    href: twinToolHref("dt-card-loved-one"),
  },
];

const views: JourneyStage[] = [
  {
    kicker: "Today",
    title: "Where things may stand now.",
    body:
      "The answers set a starting point on a scale of seven stages. The first three come before dementia, and each stage comes with a plain explanation.",
  },
  {
    kicker: "The next ten years",
    title: "How the years may go from here.",
    body:
      "Follow the stages across the next ten years. Daily life is shown in seven areas, such as getting dressed, the kitchen, and money and paperwork. For each, see whether it may be done without help, side by side with someone close, or by someone else.",
  },
  {
    kicker: "The path with care",
    title: "What care may change.",
    body:
      "Choose the care to include, such as healthy habits, memory medicines, and newer treatments, then compare the path with and without it. Care usually does not change where things end up. It may slow the pace along the way.",
  },
];

const introductionTwin: Protocol = {
  id: "digital-twin-introduction",
  eyebrow: "An introduction to the Digital Twin",
  title: "Drawn from people with a similar start.",
  body:
    "About ten minutes of answers, set against research on groups of people. It shows the path with and without added care.",
  bullets: [
    "Answers you enter from home",
    "A ten-year projection across seven stages",
    "Seven areas of daily life, and how much help each may need",
    "A starting point to talk through with a neurologist",
  ],
  icon: "bullseye",
};

const fullTwin: Protocol = {
  id: "digital-twin-full",
  eyebrow: "The full Digital Twin",
  title: "Built around one person.",
  body:
    "The version Mindspan neurologists use after a first visit. It brings one person’s own records together in a living model that helps plan their care.",
  bullets: [
    "History, labs, imaging, genetics, and cognitive tests in one place",
    "Trained on more than 70,000 cognitive care patients and two decades of studies",
    "Shows how closely one person’s years may follow the projection",
    "Helps shape treatment, lifestyle plans, and monitoring as things change",
  ],
  icon: "shield",
};

const faq: FAQItem[] = [
  {
    id: "diagnosis",
    question: "Is this a diagnosis?",
    answer:
      "No. It is an estimate drawn from research on groups of people. It is not medical advice, and it cannot say what is causing memory changes. A visit with a neurologist is how you get real answers.",
  },
  {
    id: "test-score",
    question: "Do I need a test score?",
    answer:
      "No. A recent memory test score, if you have one, helps set the starting point. If you don’t have one, you can choose the stage that seems closest instead.",
  },
  {
    id: "parent",
    question: "Can I do this for a parent?",
    answer:
      "Yes. Choose “Start for them” to answer about a parent, a spouse, or anyone you care for, and the questions adjust to fit. If you can, answer with them, so their view counts too. If their memory score points to a later stage than the projection was built for, you’ll see an explanation instead of a guess.",
  },
  {
    id: "information",
    question: "What happens to my information?",
    answer: `Your answers save in your browser as you go, so you can close the tab and come back later in the same browser. No account or login is needed to start. The introduction asks for a first name and email before it shows the projection. If you have questions about how your information is used, call us at ${brand.phone}.`,
  },
  {
    id: "no-diagnosis",
    question: "Is this for me if I don’t have a diagnosis?",
    answer:
      "You can still use it, with one thing to know first. The introduction is built from data on people with a confirmed Alzheimer’s diagnosis, so that is who the projection fits best. If something else is causing the memory changes, they may progress much more slowly than the projection shows. If you or someone you love has noticed changes, a visit with a neurologist is the clearest way to find out what is going on.",
  },
  {
    id: "free-assessment",
    question: "How is this different from the free assessment?",
    answer:
      "The free assessment takes about 30 minutes, checks memory and thinking today, and tells you whether a neurologist visit makes sense. The Digital Twin introduction does not test memory. It uses what you already know, such as age, health, and any past test score, to show where the next ten years may lead. You can do both.",
  },
];

export const digitalTwinPage = {
  metadata: buildMetadata({
    title: "Digital Twin: A 10-Year Memory Projection | Mindspan",
    description:
      "See how memory may change over the next ten years, for you or someone you love, and how the latest science may mean more time at each stage. Not a diagnosis.",
    canonical: "/digital-twin",
  }),

  hero: {
    eyebrow: "An introduction to our Digital Twin",
    title: "See the possible path ahead, and how science may change it.",
    subTagline: "About ten minutes, from home.",
    subhead:
      "See an evidence-based projection of how memory and daily life may change over the next ten years, for you or someone you love. Then see how the latest science may mean more time at each stage, and more time together.",
    image: "/assets/get-assessed.webp",
    imageAlt:
      "A younger woman in a yellow sweater and an older woman with silver hair sit on a bench by a sunlit window, looking at a tablet together.",
    primaryCta: { label: "Start the ten-year projection", href: twinToolHref("dt-hero") },
    secondaryCta: { label: "Book a visit", href: BOOKING_HREF },
  },

  forYou: {
    intro: {
      eyebrow: "For you or for someone you love",
      title: "Who is this for?",
      lead:
        "The questions and the projection adjust to who it is for. You’ll confirm the choice when you begin, and you can change it later.",
    },
    audiences,
  },

  views: {
    intro: {
      eyebrow: "What you will see",
      title: "Three views of the same ten years.",
      lead:
        "The projection draws on how the years have typically gone for people who started at a similar point. It shows a middle line with a shaded range around it, because no path is fixed.",
      image: "/assets/digital-brain.webp",
      imageAlt: "A sculpture of a brain on a plinth, lit in segments of different colors.",
    },
    stages: views,
  },

  share: {
    eyebrow: "What you share",
    title: "Plain questions about memory, mood, and health.",
    lead:
      "The projection is built for people aged 50 and older. No recent memory test score? A best guess at the stage works too.",
    bullets: [
      "Age, gender, and education",
      "A recent memory test score, if you have one",
      "Any memory medicines taken now",
      "Two short questions about mood",
      "Everyday health, such as blood pressure, weight, diabetes, smoking, and hearing",
      "APOE gene test results, if you’ve had one (APOE is a gene linked to Alzheimer’s risk)",
      "Amyloid scan or blood test results, if you’ve had one (amyloid is a protein that builds up in Alzheimer’s)",
    ],
    eligibilityTitle: "Before you start",
    eligibility: [
      "About ten minutes",
      "No account or login to start",
      "A first name and email before the projection appears",
      "Save anytime, and come back later in the same browser",
    ],
    footnote: `Your answers save in your browser as you go. If you have questions about how your information is used, call us at ${brand.phone}.`,
  },

  science: {
    id: "science",
    eyebrow: "The science behind it",
    title: "Built on research, explained in plain words.",
    body:
      "The projection starts from how much memory scores usually change in a year for people of a similar age and starting score. The seven stages are adapted from the 2024 staging criteria of the Alzheimer’s Association. Treatment effects come from published trials and reviews of memory medicines and newer treatments. The effects of healthy habits come from the U.S. POINTER study and the 2024 Lancet Commission report on dementia.",
    image: "/assets/latest-science.webp",
    imageAlt: "A Mindspan neurologist reviews brain imaging with an older couple in clinic.",
    secondary: { label: "See the science behind our care", href: "/about/science#technology" },
  },

  compare: {
    intro: {
      eyebrow: "Part of how Mindspan cares",
      title: "An early look at the technology behind our care.",
      lead:
        "The full Digital Twin helps Mindspan neurologists plan care. This introduction lets you try part of it today: a ten-year projection from far fewer details, which you enter at home.",
    },
    core: introductionTwin,
    edge: fullTwin,
    closing:
      "Start with the introduction from home. The full Digital Twin begins with a visit.",
  },

  notADiagnosis: {
    id: "not-a-diagnosis",
    title: "A projection, not a diagnosis.",
    lead:
      "The projection is an estimate drawn from research about groups of people. It cannot tell what will happen to any one person, and it does not replace a visit with a neurologist. Read it with a doctor, not instead of one.",
  },

  plan: {
    id: "plan",
    eyebrow: "From projection to plan",
    title: "Turn the projection into a plan with a Mindspan neurologist.",
    body:
      "A neurologist sees you or your loved one, with or without a projection in hand, and builds a plan around the latest science. That plan can draw on the full Digital Twin, built from the person’s own history, tests, and imaging. Most new patients get a first visit within two to three weeks. The sooner care starts, the more time there is to put the latest science to work.",
    image: "/assets/what-to-expect-conversation.webp",
    imageAlt:
      "A clinician in a yellow coat talks with an older woman in a striped cardigan across a small table by a window.",
    primary: { label: "Book a visit", href: BOOKING_HREF },
    secondary: { label: `Talk to us: ${brand.phone}`, href: brand.phoneHref },
  },

  faqIntro: {
    eyebrow: "Common questions",
    title: "What people ask before they start.",
  },
  faq,
} as const;
