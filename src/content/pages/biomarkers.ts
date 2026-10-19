import { buildMetadata } from "@/lib/seo";
import { brand } from "@/content/brand";
import type { FAQItem } from "../faq";
import type { JourneyStage } from "../journey";
import type { TechCard } from "../technology";
import type { Measure } from "@/components/molecules/MeasureRow";
import type { QuestionCardItem } from "@/components/organisms/sections";

const BOOKING_HREF = "/book-a-visit";

export const biomarkersPage = {
  metadata: buildMetadata({
    title: "Biomarker Testing | Mindspan",
    description:
      "Brain biomarker blood tests from one blood draw at our Danvers clinic: p-tau217, amyloid ratio, GFAP and NfL. Often answers what used to take a PET scan.",
    canonical: "/biomarkers",
  }),

  hero: {
    eyebrow: "Advanced blood tests",
    title: "A clearer picture of your brain health.",
    lead:
      "Memory tests show how your thinking is working. Brain biomarker blood tests help show why, from one blood draw, so your care plan fits you.",
    image: "/assets/biomarkers-hero.webp",
    imageAlt:
      "A Mindspan neurologist reviewing blood test results on a tablet with a patient and his daughter in a sunlit consultation room.",
    availability: {
      text: "Available at our Danvers clinic",
      cta: { label: "See the clinic", href: "/locations/danvers" },
    },
    primaryCta: { label: "Book a visit", href: BOOKING_HREF },
    secondaryCta: { label: `Talk to us: ${brand.phone}`, href: brand.phoneHref },
  },

  explainerVideo: {
    id: "explainer",
    eyebrow: "Your blood test, explained",
    title: "The whole test, in under five minutes.",
    body:
      "Mindy, Mindspan\u2019s AI assistant, walks you through LucentAD Complete: the four markers it measures, why it is often used instead of a PET scan, what your results can and can\u2019t tell you, and what it costs.",
    src: "/assets/biomarkers-explainer.mp4",
    poster: "/assets/biomarkers-explainer-poster.webp",
    posterAlt:
      "Your blood test, explained: a short Mindspan video about LucentAD Complete, narrated by Mindy",
    meta: "4 min 46 sec \u00b7 Captions on screen",
    labels: { play: "Play video", pause: "Pause", fullscreen: "Watch full screen" },
    durationIso: "PT4M46S",
    uploadDate: "2026-10-20",
  },

  measures: {
    label: "One blood draw, four measures",
    items: [
      { name: "p-tau217", meaning: "Plaque", accent: "plaque" },
      { name: "Amyloid ratio", meaning: "Plaque", accent: "plaque" },
      { name: "GFAP", meaning: "The brain’s repair crew", accent: "repair" },
      { name: "NfL", meaning: "Wear on nerve cells", accent: "wear" },
    ] satisfies Measure[],
  },

  whyIntro: {
    eyebrow: "Why we use them",
    title: "Answers that used to take a brain scan.",
  },

  whyCards: [
    {
      id: "one-draw",
      title: "One blood draw",
      body:
        "No special imaging center and no long wait to schedule. Results come back to your Mindspan neurologist.",
      icon: "drop",
    },
    {
      id: "pet-scan",
      title: "Often instead of a PET scan",
      body:
        "For many people, it answers the same question. If you still need a scan or MRI, we arrange it.",
      icon: "monitor-check",
    },
    {
      id: "research",
      title: "Decades of research",
      body:
        "New to clinics, built on decades of science. The Alzheimer’s Association’s 2025 guideline supports accurate blood tests for people with memory changes who see a specialist.",
      icon: "document",
    },
  ] satisfies TechCard[],

  questionsIntro: {
    eyebrow: "Four measures, three questions",
    title: "What the test looks at, and what it changes.",
  },

  questions: [
    {
      id: "plaque",
      title: "Is plaque building up?",
      tag: "p-tau217 · amyloid ratio",
      note: {
        label: "What it changes",
        body:
          "If it is, we can talk about newer medicines that target plaque. If not, we look at other causes, many of them treatable.",
      },
    },
    {
      id: "repair",
      title: "Is the brain’s repair crew active?",
      tag: "GFAP",
      note: {
        label: "What it changes",
        body:
          "It shows how actively the brain’s support cells are responding to stress or injury, and helps us decide how closely to follow you.",
      },
    },
    {
      id: "wear",
      title: "Is there wear on nerve cells?",
      tag: "NfL",
      note: {
        label: "What it changes",
        body:
          "It helps us decide where to look next: everyday causes like sleep, mood or medicines, or blood vessel health, sometimes with an MRI.",
      },
    },
  ] satisfies QuestionCardItem[],

  overTimeIntro: {
    eyebrow: "Over time",
    title: "A snapshot of today, not a forecast.",
    image: "/assets/biomarkers-blood-draw.webp",
    imageAlt:
      "A Mindspan nurse pressing gauze to a patient’s arm after a quick blood draw, capped sample tubes on the console beside them.",
  },

  overTimeSteps: [
    {
      kicker: "Today",
      title: "Your baseline",
      body:
        "Results show where things stand now. They can’t predict the next 10 or 20 years.",
    },
    {
      kicker: "Your plan",
      title: "Care that fits",
      body:
        "Your neurologist reads the results with your memory testing and health history to shape your plan.",
    },
    {
      kicker: "Later",
      title: "Recheck",
      body:
        "Because it’s a blood draw, we can repeat it to see how things are changing.",
    },
  ] satisfies JourneyStage[],

  faqIntro: {
    eyebrow: "Questions",
    title: "What families ask about these tests.",
  },

  faq: [
    {
      id: "diagnosis",
      question: "Is it a diagnosis?",
      answer:
        "No. It is one part of a full evaluation, read alongside memory testing and your health history by a Mindspan neurologist.",
    },
    {
      id: "prediction",
      question: "Will it tell me if I’ll get Alzheimer’s?",
      answer:
        "No. It shows what is happening today. Many people have some plaque as they age and stay well for years.",
    },
    {
      id: "scan",
      question: "Will I still need a scan?",
      answer:
        "Some people do, for example to look at blood vessels in the brain or before starting certain medicines. If you do, we arrange it.",
    },
    {
      id: "who",
      question: "Who should have it?",
      answer:
        "Your Mindspan care team will tell you if the test is right for you, and talk it through with you before you decide.",
    },
  ] as FAQItem[],

  finalCta: {
    eyebrow: "When you are ready",
    title: "The first step is a conversation.",
    lead: "Ask your Mindspan care team whether these tests are right for you.",
    primary: { label: "Book a visit", href: BOOKING_HREF },
    secondary: { label: `Talk to us: ${brand.phone}`, href: brand.phoneHref },
    signature: "With care, the Mindspan team",
  },
} as const;
