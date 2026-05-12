import { buildMetadata } from "@/lib/seo";
import { brand } from "@/content/brand";
import type { FAQItem } from "../faq";

export const guidePage = {
  metadata: buildMetadata({
    title: "The GUIDE Program | Mindspan",
    description:
      "Mindspan participates in GUIDE, Medicare’s coordinated dementia care model. Around-the-clock specialist support, no out-of-pocket cost for covered visits, and respite for the primary caregiver. We handle enrollment for qualifying families.",
    canonical: "/guide",
  }),

  hero: {
    eyebrow: "Medicare\u2019s dementia care benefit",
    title: "A Medicare program built for families living with dementia.",
    video: "/assets/guide-hero-video.mp4",
    poster: "/assets/guide-hero.webp",
    imageAlt:
      "A Mindspan clinician meeting with a patient and family members in a sunlit consultation room.",
    subTagline: "What is GUIDE?",
    subhead:
      "Medicare\u2019s coordinated dementia care model. Around-the-clock specialist support, no out-of-pocket cost for covered visits, and respite for the primary caregiver. If you qualify, Mindspan handles enrollment.",
    primaryCta: { label: "See the benefits", href: "#benefits" },
    secondaryCta: { label: `Talk to us: ${brand.phone}`, href: brand.phoneHref },
  },

  benefitsIntro: {
    eyebrow: "What you get",
    title: "Concrete benefits, coordinated for you.",
    lead:
      "GUIDE is not a list of perks you have to claim one at a time. Once enrolled, these become part of your ongoing care.",
  },

  benefits: [
    {
      id: "respite",
      eyebrow: "Respite for the caregiver",
      title: "Time away, paid through the program.",
      body:
        "Caregiving does not stop. GUIDE includes respite support (up to $2,500 a year) so the primary caregiver can take time for themselves, an afternoon, a weekend, or a week, while their loved one is cared for.",
      icon: "shield" as const,
    },
    {
      id: "access",
      eyebrow: "24/7 specialist access",
      title: "Someone to call, day or night.",
      body:
        "A medical question at 10pm. A scary change on a Saturday. GUIDE includes around-the-clock access to a specialist-staffed line, so you are not alone with it. The 24/7 line is operated by Ianacare, our GUIDE Partner Organization.",
      icon: "chat" as const,
    },
    {
      id: "cost",
      eyebrow: "No out-of-pocket cost",
      title: "No out-of-pocket cost for covered visits.",
      body:
        "Qualifying GUIDE patients pay $0 for covered Mindspan visits. We verify your benefits and tell you exactly what is covered before your first appointment.",
      icon: "bullseye" as const,
    },
    {
      id: "coordinator",
      eyebrow: "A dedicated care coordinator",
      title: "One person who knows your family.",
      body:
        "Instead of chasing specialists, you have a single care coordinator who stays with your family between visits, answering questions, coordinating tests, and keeping your primary care physician in the loop.",
      icon: "grid" as const,
    },
    {
      id: "planning",
      eyebrow: "Care planning and education",
      title: "Practical guidance as needs change.",
      body:
        "A dementia diagnosis changes over time. GUIDE includes ongoing care planning and caregiver education, what to expect at each stage, how to handle hard days, and what decisions may be coming.",
      icon: "brain" as const,
    },
    {
      id: "coordination",
      eyebrow: "Coordinated team-based care",
      title: "Neurologist, care team, PCP, in sync.",
      body:
        "Mindspan coordinates directly with your primary care physician and any other specialists involved. You should not have to be the messenger between them.",
      icon: "shield" as const,
    },
  ],

  support247: {
    eyebrow: "24/7 specialist access",
    title: "Someone to call, day or night.",
    body:
      "A medical question at 10pm. A scary change on a Saturday. The specialist line is staffed around the clock for GUIDE families, so you are not alone with the hard moments. One number, day or night, answered by someone who knows dementia care. The line is operated by Ianacare, our GUIDE Partner Organization.",
    image: "/assets/guide-247.webp",
    imageAlt:
      "A Mindspan specialist on a video visit at her desk in the evening.",
  },

  eligibilityIntro: {
    eyebrow: "Who qualifies",
    title: "Three things have to be true.",
    lead:
      "If all three apply, you are very likely eligible. We confirm during onboarding, there is nothing to sign up for in advance.",
  },

  eligibilityItems: [
    {
      kicker: "Diagnosis",
      title: "A dementia diagnosis",
      body:
        "Alzheimer\u2019s, Lewy Body, vascular dementia, frontotemporal, or another form of dementia. A clinical diagnosis is required. If your loved one has not yet been formally diagnosed, we can help with that first.",
    },
    {
      kicker: "Coverage",
      title: "Enrolled in Original Medicare",
      body:
        "GUIDE is available to people enrolled in Original Medicare (Parts A and B). It is not available to people enrolled in Medicare Advantage or PACE programs. We can help you confirm which you have.",
    },
    {
      kicker: "Location",
      title: "In Massachusetts or California",
      body:
        "Our current GUIDE service areas. If you are in MA or CA, or you have a loved one who is, we can work with you.",
    },
  ],

  howEnrollmentIntro: {
    eyebrow: "How enrollment works",
    title: "We do the paperwork. You do not.",
    lead:
      "You do not apply to GUIDE directly, your care provider does. If you come to Mindspan and you qualify, we enroll you as part of starting care.",
    image: "/assets/guide-life.webp",
    imageAlt:
      "A patient at home with a cup of coffee, reflecting in a sunlit kitchen.",
  },

  howEnrollmentSteps: [
    {
      kicker: "Step 01",
      title: "Call us",
      body:
        "Start the same way any new patient does. We do not ask about GUIDE up front, we focus on the medical situation first.",
    },
    {
      kicker: "Step 02",
      title: "We verify your benefits",
      body:
        "During onboarding, we check your Medicare coverage and confirm which of our services are covered for you, including whether GUIDE applies.",
    },
    {
      kicker: "Step 03",
      title: "If eligible, we enroll your family",
      body:
        "If you qualify, we handle the GUIDE enrollment on your behalf. A care coordinator walks you through what becomes available, respite dollars, the 24/7 line, and ongoing care planning.",
    },
    {
      kicker: "Step 04",
      title: "Benefits begin",
      body:
        "From that point on, your family has access to GUIDE benefits as part of ongoing care. There is nothing extra you have to remember to use.",
    },
  ],

  faq: [
    {
      id: "who-pays",
      question: "Does GUIDE cost anything?",
      answer:
        "No. GUIDE is covered by Medicare. Qualifying patients pay $0 for covered Mindspan visits, and the respite benefit is paid through the program.",
    },
    {
      id: "advantage",
      question: "I have Medicare Advantage, can I still get this?",
      answer:
        "GUIDE is currently available to people enrolled in Original Medicare (Parts A and B), not Medicare Advantage or PACE. If you are on Advantage or PACE, you can still be a Mindspan patient, we accept Medicare, Medicaid, and many health plans, but the specific GUIDE benefits described here will not apply.",
    },
    {
      id: "diagnosis",
      question: "What if my loved one has not been diagnosed yet?",
      answer:
        "That is fine. A dementia evaluation is often the first reason families come to Mindspan. We can assess, diagnose if appropriate, and, if the diagnosis is dementia and the other criteria apply, enroll your family in GUIDE afterward.",
    },
    {
      id: "respite",
      question: "How does the respite benefit actually work?",
      answer:
        "GUIDE provides up to $2,500 per year for respite services, care that temporarily relieves the primary caregiver. That might be adult day services, in-home care, or a short stay in a care facility. Your care coordinator helps you find options and handles the billing.",
    },
    {
      id: "outside",
      question: "We live outside Massachusetts and California. What can we do?",
      answer:
        "We are currently a GUIDE participant in MA and CA only. If you have a loved one in one of those states, we can work with you even if you live elsewhere. If your loved one is in another state, we are not able to enroll you in GUIDE today, we can tell you what is available in your area.",
    },
    {
      id: "caregiver-out-of-state",
      question: "My parent is in Massachusetts but I live in another state. Does this work?",
      answer:
        "Yes. Video visits work from anywhere, and the GUIDE benefits follow the patient. We coordinate directly with you as the caregiver, you can be involved from a different state.",
    },
    {
      id: "vs-hospice",
      question: "Is this the same as hospice or palliative care?",
      answer:
        "No. GUIDE is not end-of-life care. It is ongoing dementia care for people at any stage of the disease, including early stages when the patient is still very independent.",
    },
  ] as FAQItem[],

  finalCta: {
    eyebrow: "When you are ready",
    title: "Start with a conversation.\nWe will figure out what applies.",
    lead:
      "You do not need to know whether you qualify for GUIDE before you reach out. Come talk to us, we sort out coverage, eligibility, and next steps together.",
    primary: { label: `Talk to us: ${brand.phone}`, href: brand.phoneHref },
    signature: "With care, the Mindspan team",
  },
} as const;
