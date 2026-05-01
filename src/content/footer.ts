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
      title: "Locations",
      links: [
        { label: "Danvers, MA", href: "/locations/danvers" },
        { label: "Bay Area, CA", href: "/locations/bay-area" },
        { label: "Irvine, CA", href: "/locations/irvine" },
        { label: "Video visits, MA", href: "/locations/video-ma" },
        { label: "Video visits, CA", href: "/locations/video-ca" },
      ],
    },
  ] satisfies FooterColumn[],
  legal: [
    { label: "Terms", href: "/tos" },
    { label: "Privacy", href: "/privacy-notice" },
    { label: "Informed consent", href: "/informed-consent" },
    { label: "Affiliates", href: "/affiliates" },
  ] satisfies FooterLink[],
  copyright: "\u00a9 2026 Mindspan",
} as const;
