export type FooterLink = { label: string; href: string };
export type FooterColumn = { title: string; links: FooterLink[] };

export const footer = {
  columns: [
    {
      title: "For patients & families",
      links: [
        { label: "Book an appointment", href: "/book-a-visit" },
        { label: "How it works", href: "/about/how-it-works" },
        { label: "GUIDE Program", href: "/guide" },
        { label: "For caregivers", href: "/family/assist" },
      ],
    },
    {
      title: "For providers",
      links: [
        { label: "Refer a patient", href: "/providers/refer" },
        { label: "For PCP groups", href: "/providers/refer" },
        { label: "About Mindspan", href: "/about" },
      ],
    },
    {
      title: "Clinic locations",
      links: [
        { label: "Massachusetts", href: "/locations/danvers-ma" },
        { label: "California", href: "/locations/san-jose-ca" },
        { label: "Virtual visits", href: "/book-a-visit" },
      ],
    },
  ] satisfies FooterColumn[],
  legal: [
    { label: "Terms", href: "/legal/terms" },
    { label: "Privacy", href: "/legal/privacy" },
    { label: "Informed consent", href: "/legal/consent" },
  ] satisfies FooterLink[],
  copyright: "\u00a9 2026 Mindspan",
} as const;
