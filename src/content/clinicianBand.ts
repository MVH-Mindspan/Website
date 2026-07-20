import { brand } from "./brand";

export const clinicianBand = {
  eyebrow: "For referring clinicians",
  title: "Your patients with cognitive concerns, seen in weeks.",
  points: [
    "Refer through Athena, Epic, fax, or secure email. No new portal to learn.",
    "First visit within two to three weeks, with a structured note back in your chart.",
    "The patient stays your patient. We handle the specialty piece.",
  ],
  cta: { label: "Refer a patient in 30 seconds", href: "/providers/refer" },
  more: { label: "See how co-management works", href: "/providers" },
  phone: { label: `Or call us directly: ${brand.phone}`, href: brand.phoneHref },
} as const;
