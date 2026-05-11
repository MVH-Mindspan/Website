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
    phone: { label: "Call our referral line", value: "(617) 420-9000", href: "tel:+16174209000" },
    fax: { label: "Secure fax", value: "(617) 420-9001", href: null },
    email: { label: "Email", value: "referrals@mindspan.co", href: "mailto:referrals@mindspan.co" },
  },
} as const;
