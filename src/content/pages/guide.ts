import { buildMetadata } from "@/lib/seo";
import type { FAQItem } from "../faq";

const BOOKING_HREF = "/book-a-visit";

export const guidePage = {
  metadata: buildMetadata({
    title: "The GUIDE Program | Mindspan",
    description:
      "Mindspan participates in GUIDE \u2014 a Medicare-supported dementia care model that provides $0 copays, 24/7 specialist access, and up to $2,500/year in caregiver respite benefits for qualifying families.",
    canonical: "/guide",
  }),

  hero: {
    eyebrow: "Medicare\u2019s dementia care benefit",
    title: "A Medicare program built for families living with dementia.",
    lead:
      "GUIDE is a Medicare-supported care model for people with a dementia diagnosis and the families caring for them. If you qualify, it adds concrete support \u2014 24/7 specialist access, respite dollars for the caregiver, $0 copays \u2014 at no additional cost. Mindspan is a GUIDE participant in Massachusetts and California, and we handle enrollment for you.",
  },

  whatItIs: {
    eyebrow: "What GUIDE is",
    title: "Not a separate program you have to manage. Part of your care.",
    lead:
      "GUIDE stands for Guiding an Improved Dementia Experience. It is a Medicare (CMS) care model that pays providers like Mindspan to deliver coordinated, team-based dementia care \u2014 and to support the caregiver, not just the patient. For you, that means you do not sign up for anything separately. If you qualify, we enroll you as part of ongoing care, and the benefits below become available to your family.",
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
      title: "Up to $2,500 per year for a break.",
      body:
        "Caregiving does not stop. GUIDE provides respite dollars so the primary caregiver can take time for themselves \u2014 an afternoon, a weekend, or a week \u2014 while their loved one is cared for.",
      icon: "shield" as const,
    },
    {
      id: "access",
      eyebrow: "24/7 specialist access",
      title: "Someone to call, day or night.",
      body:
        "A medical question at 10pm. A scary change on a Saturday. GUIDE includes around-the-clock access to a Mindspan specialist-staffed line \u2014 so you are not alone with it.",
      icon: "chat" as const,
    },
    {
      id: "cost",
      eyebrow: "$0 copays",
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
        "Instead of chasing specialists, you have a single care coordinator who stays with your family between visits \u2014 answering questions, coordinating tests, and keeping your primary care physician in the loop.",
      icon: "grid" as const,
    },
    {
      id: "planning",
      eyebrow: "Care planning and education",
      title: "Practical guidance as needs change.",
      body:
        "A dementia diagnosis changes over time. GUIDE includes ongoing care planning and caregiver education \u2014 what to expect at each stage, how to handle hard days, and what decisions may be coming.",
      icon: "brain" as const,
    },
    {
      id: "coordination",
      eyebrow: "Coordinated team-based care",
      title: "Neurologist, care team, PCP \u2014 in sync.",
      body:
        "Mindspan coordinates directly with your primary care physician and any other specialists involved. You should not have to be the messenger between them.",
      icon: "shield" as const,
    },
  ],

  eligibilityIntro: {
    eyebrow: "Who qualifies",
    title: "Four things have to be true.",
    lead:
      "If all four apply, you are very likely eligible. We confirm during onboarding \u2014 there is nothing to sign up for in advance.",
  },

  eligibilityItems: [
    {
      kicker: "01",
      title: "A dementia diagnosis",
      body:
        "Alzheimer\u2019s, Lewy Body, vascular dementia, frontotemporal, or another form of dementia. A clinical diagnosis is required. If your loved one has not yet been formally diagnosed, we can help with that first.",
    },
    {
      kicker: "02",
      title: "Enrolled in Original Medicare",
      body:
        "GUIDE is available to people on Original Medicare (Medicare Part A and Part B). It is not currently available to people on Medicare Advantage plans. We can help you confirm which you have.",
    },
    {
      kicker: "03",
      title: "A caregiver involved in day-to-day support",
      body:
        "A spouse, adult child, or other family member who is involved in daily care. GUIDE is built around the partnership between the patient and that caregiver.",
    },
    {
      kicker: "04",
      title: "Located in Massachusetts or California",
      body:
        "Our current GUIDE service areas. If you are in MA or CA, or you have a loved one who is, we can work with you.",
    },
  ],

  howEnrollmentIntro: {
    eyebrow: "How enrollment works",
    title: "We do the paperwork. You do not.",
    lead:
      "You do not apply to GUIDE directly \u2014 your care provider does. If you come to Mindspan and you qualify, we enroll you as part of starting care.",
  },

  howEnrollmentSteps: [
    {
      kicker: "Step 01",
      title: "Book a visit or call us",
      body:
        "Start the same way any new patient does. We do not ask about GUIDE up front \u2014 we focus on the medical situation first.",
    },
    {
      kicker: "Step 02",
      title: "We verify your benefits",
      body:
        "During onboarding, we check your Medicare coverage and confirm which of our services are covered for you \u2014 including whether GUIDE applies.",
    },
    {
      kicker: "Step 03",
      title: "If eligible, we enroll your family",
      body:
        "If you qualify, we handle the GUIDE enrollment on your behalf. A care coordinator walks you through what becomes available \u2014 respite dollars, the 24/7 line, and ongoing care planning.",
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
      question: "I have Medicare Advantage \u2014 can I still get this?",
      answer:
        "GUIDE is currently available to people on Original Medicare (Part A and Part B), not Medicare Advantage. If you are on Advantage, you can still be a Mindspan patient \u2014 we accept most major plans \u2014 but the specific GUIDE benefits described here will not apply.",
    },
    {
      id: "diagnosis",
      question: "What if my loved one has not been diagnosed yet?",
      answer:
        "That is fine. A dementia evaluation is often the first reason families come to Mindspan. We can assess, diagnose if appropriate, and \u2014 if the diagnosis is dementia and the other criteria apply \u2014 enroll your family in GUIDE afterward.",
    },
    {
      id: "respite",
      question: "How does the $2,500 respite benefit actually work?",
      answer:
        "GUIDE provides up to $2,500 per year for respite services \u2014 care that temporarily relieves the primary caregiver. That might be adult day services, in-home care, or a short stay in a care facility. Your care coordinator helps you find options and handles the billing.",
    },
    {
      id: "outside",
      question: "We live outside Massachusetts and California. What can we do?",
      answer:
        "We are currently a GUIDE participant in MA and CA only. If you have a loved one in one of those states, we can work with you even if you live elsewhere. If your loved one is in another state, we are not able to enroll you in GUIDE today \u2014 we can tell you what is available in your area.",
    },
    {
      id: "caregiver-out-of-state",
      question: "My parent is in Massachusetts but I live in another state. Does this work?",
      answer:
        "Yes. Video visits work from anywhere, and the GUIDE benefits follow the patient. We coordinate directly with you as the caregiver \u2014 you can be involved from a different state.",
    },
    {
      id: "vs-hospice",
      question: "Is this the same as hospice or palliative care?",
      answer:
        "No. GUIDE is not end-of-life care. It is ongoing dementia care for people at any stage of the disease \u2014 including early stages when the patient is still very independent.",
    },
  ] as FAQItem[],

  finalCta: {
    eyebrow: "When you are ready",
    title: "Start with a conversation. We will figure out what applies.",
    lead:
      "You do not need to know whether you qualify for GUIDE before you reach out. Come talk to us \u2014 we sort out coverage, eligibility, and next steps together.",
    primary: { label: "Book a visit", href: BOOKING_HREF },
    secondary: { label: "Talk to us", href: "tel:+16174209000" },
    signature: "With care, the Mindspan team",
  },
} as const;
