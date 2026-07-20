import { VIDEO_VISITS_ENABLED } from "@/lib/flags";

export type FAQItem = { id: string; question: string; answer: string };

export const faqIntro = {
  eyebrow: "Common questions",
  title: "What families ask us most.",
} as const;

export const faq: FAQItem[] = [
  {
    id: "wait",
    question: "How quickly can we be seen?",
    answer:
      "Most new patients see a Mindspan neurologist within two to three weeks. Typical wait times at a hospital neurology clinic are twelve months or longer.",
  },
  {
    id: "medicare",
    question: "Do you accept Medicare and insurance?",
    answer:
      "Yes. We bill Medicare, Medicaid, and many health plans. If your loved one has a dementia diagnosis and is on Original Medicare (not Medicare Advantage or PACE), there may be additional Medicare-supported benefits available; we confirm eligibility during onboarding.",
  },
  ...(VIDEO_VISITS_ENABLED
    ? [
        {
          id: "video",
          question: "Can my parent be seen by video?",
          answer:
            "Yes. Every visit type can be done by video with a family member present. We also have clinics in Massachusetts and California for in-person visits.",
        },
      ]
    : []),
  {
    id: "caregiver",
    question: "I am worried about a parent or spouse. Can I come too?",
    answer:
      "Absolutely. Caregivers are essential to the visit. We plan the conversation to include you, and we can meet with you separately when that is helpful.",
  },
  {
    id: "prep",
    question: "What should we bring to the first visit?",
    answer:
      "A list of current medications and a short note on the changes you have noticed. If you have prior imaging or bloodwork, those help. We will request records on your behalf when needed.",
  },
  {
    id: "after",
    question: "What happens after the first visit?",
    answer:
      "You will leave with a clear plan. If further testing or imaging is needed, we coordinate it. We send clean notes back to your primary care physician, and we stay involved as long as you need us.",
  },
];

// Homepage-specific FAQ: leads with cost, the assessment handoff, speed, and
// geography — the four questions that stall families before they convert.
export const homeFaq: FAQItem[] = [
  faq.find((f) => f.id === "medicare")!,
  {
    id: "after-assessment",
    question: "What happens after the free assessment?",
    answer:
      "You get clear feedback on whether a neurologist visit makes sense. If it does, you can book a visit right away and our team will reach out within one business day to schedule. If not, you have peace of mind, and you can take the screening again whenever something changes.",
  },
  faq.find((f) => f.id === "wait")!,
  {
    id: "outside",
    question: "What if we live outside Massachusetts or California?",
    answer:
      "We see patients in Massachusetts and California today. If you are somewhere else, join the waitlist in the booking flow and we will let you know the moment Mindspan opens in your area.",
  },
];
