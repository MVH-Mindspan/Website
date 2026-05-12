import { buildMetadata } from "@/lib/seo";

export const referPage = {
  metadata: buildMetadata({
    title: "Refer a Patient | Mindspan",
    description:
      "Refer a patient to a Mindspan neurologist. First appointments typically within two to three weeks, clean notes back to your chart.",
    canonical: "/providers/refer",
  }),
  hero: {
    eyebrow: "Refer a patient",
    title: "Get your patient seen by a neurologist in weeks.",
    lead:
      "Tell us who to call. We will reach out the same business day and send clean notes back to you after the visit.",
  },
  form: {
    eyebrow: "Send a referral",
    title: "Takes about 30 seconds.",
    lead:
      "We just need enough to call you back. Everything else (MBI, DOB, records) we will collect when we reach out.",
    submit: "Send referral",
    submitting: "Sending…",
    successTitle: "Referral received.",
    successBody:
      "Thank you. Our team will reach out within one business day to collect any remaining chart details and schedule the patient.",
    privacy:
      "Submissions are encrypted in transit. Please do not include MBI, full DOB, or clinical notes here. We capture those on a HIPAA-compliant intake call.",
  },
  alt: {
    title: "Prefer a phone call or fax?",
    promptNoLocation: "Select a clinic above to see the right phone and secure fax.",
    email: { label: "Email", value: "referrals@mindspan.co", href: "mailto:referrals@mindspan.co" },
  },
  defaultLocationId: "danvers",
  locations: [
    {
      id: "danvers",
      label: "MA - Danvers",
      phone: { value: "(978) 850-3914", href: "tel:+19788503914" },
      fax: { value: "(844) 689-3306", href: null },
      hours: "Mon–Fri, 9am–6pm ET",
    },
    {
      id: "bay-area",
      label: "CA - Bay Area",
      phone: { value: "(669) 291-2202", href: "tel:+16692912202" },
      fax: { value: "(844) 689-7419", href: null },
      hours: "Mon–Fri, 9am–6pm PT",
    },
  ],
} as const;

export type ReferLocation = (typeof referPage)["locations"][number];
export type ReferLocationId = ReferLocation["id"];
