import { buildMetadata } from "@/lib/seo";
import { clinics } from "@/content/clinics";

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
      "Thank you. We call the patient within one business day to schedule, and you get a structured note back in your chart after the visit.",
    privacy:
      "Submissions are encrypted in transit. Please do not include MBI, full DOB, or clinical notes here. We capture those on a HIPAA-compliant intake call.",
  },
  alt: {
    title: "Prefer a phone call or fax?",
    promptNoLocation: "Either clinic can take your referral by phone, fax, or secure email.",
    email: { label: "Email", value: "referrals@mindspan.co", href: "mailto:referrals@mindspan.co" },
  },
  pad: {
    label: "Printable referral pad (PDF)",
    href: "/downloads/mindspan-referral-pad.pdf",
  },
  defaultLocationId: "danvers",
  locations: [
    {
      id: "danvers",
      label: "MA - Danvers",
      phone: { value: clinics.danvers.phone, href: clinics.danvers.phoneHref },
      fax: { value: "(844) 689-3306", href: null },
      hours: clinics.danvers.hoursShort,
    },
    {
      id: "bay-area",
      label: "CA - Bay Area",
      phone: { value: clinics.bayArea.phone, href: clinics.bayArea.phoneHref },
      fax: { value: "(844) 689-7419", href: null },
      hours: clinics.bayArea.hoursShort,
    },
  ],
} as const;

export type ReferLocation = (typeof referPage)["locations"][number];
export type ReferLocationId = ReferLocation["id"];
