export type FooterLink = { label: string; href: string };
export type FooterColumn = { title: string; links: FooterLink[] };

export const footer = {
  columns: [
    {
      title: "Getting started",
      links: [
        { label: "Book a visit", href: "/book-a-visit" },
        { label: "Find a clinic", href: "#locations" },
        { label: "What to expect", href: "#expect" },
      ],
    },
    {
      title: "For families",
      links: [
        { label: "Assist a loved one", href: "/family/assist" },
        { label: "How it works", href: "#visit" },
      ],
    },
    {
      title: "For doctors",
      links: [
        { label: "Refer a patient", href: "/providers/refer" },
        { label: "About Mindspan", href: "/about" },
        { label: "Contact", href: "/contact" },
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
