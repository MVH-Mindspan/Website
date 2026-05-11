import { buildMetadata } from "@/lib/seo";
import type { TechCard } from "../technology";

const BOOKING_HREF = "/book-a-visit";

export const whatWeTreatPage = {
  metadata: buildMetadata({
    title: "What We Treat | Mindspan",
    description:
      "Mindspan specializes in memory loss, Alzheimer's, MCI, dementia, and proactive brain health. See a neurologist in weeks, covered by Medicare, Medicaid, and many health plans.",
    canonical: "/what-we-treat",
  }),

  hero: {
    eyebrow: "What we treat",
    title: "Whatever is changing, you deserve answers.",
    lead: "Memory loss, cognitive change, a recent diagnosis, or simply wanting to understand your brain health before symptoms appear. Mindspan specializes in all of it.",
  },

  conditions: {
    eyebrow: "Conditions we see",
    title: "You don\u2019t need a diagnosis to come to us.",
    lead: "We see patients at every stage, from a first worry to a recent diagnosis. If something feels different, that\u2019s reason enough to reach out.",
  } as const,

  conditionCards: [
    {
      id: "memory",
      eyebrow: "Memory changes",
      title: "Forgetfulness and memory loss",
      body: "Names that slip away, conversations you can\u2019t quite recall, a word that used to come easily. These changes can be normal aging, or something worth evaluating. We help you know the difference.",
      icon: "brain",
    },
    {
      id: "mci",
      eyebrow: "Mild Cognitive Impairment",
      title: "MCI, the stage before a diagnosis",
      body: "MCI means memory or thinking skills have declined more than expected for your age, but not enough to interfere significantly with daily life. Early attention here makes the biggest difference.",
      icon: "bullseye",
    },
    {
      id: "alzheimers",
      eyebrow: "Alzheimer\u2019s disease",
      title: "The most common cause of dementia",
      body: "Mindspan neurologists are experienced in Alzheimer\u2019s evaluation, staging, and treatment, including the newest FDA-approved therapies for eligible patients.",
      icon: "shield",
    },
    {
      id: "dementia",
      eyebrow: "Other dementias",
      title: "Vascular, Lewy body, frontotemporal, and more",
      body: "Dementia takes many forms. An accurate diagnosis shapes everything about the care plan. Our neurologists are trained to distinguish between types and tailor your care accordingly.",
      icon: "grid",
    },
    {
      id: "proactive",
      eyebrow: "Proactive brain health",
      title: "Understanding your brain before symptoms appear",
      body: "Family history, early risk factors, or simply wanting to stay ahead, Mindspan offers comprehensive cognitive assessments for people who want to understand and protect their brain health proactively.",
      icon: "brain",
    },
    {
      id: "caregiver",
      eyebrow: "For caregivers",
      title: "If you\u2019re caring for someone else",
      body: "Caregivers are not bystanders, they\u2019re part of the care team. We work with families to understand what\u2019s happening, what to expect, and how to get the right support in place.",
      icon: "chat",
    },
  ] satisfies TechCard[],

  finalCta: {
    eyebrow: "Ready when you are",
    title: "The first step is a conversation. That\u2019s all.",
    lead: "No commitment, no pressure. Tell us what\u2019s going on, and we\u2019ll help you figure out what comes next.",
    primary: { label: "Book an appointment", href: BOOKING_HREF },
    secondary: { label: "How it works", href: "/about/how-it-works" },
  },
} as const;
