export type FooterLink = { label: string; href: string };
export type FooterColumn = { title: string; links: FooterLink[] };

export const footer = {
  columns: [
    {
      title: "For patients & families",
      links: [
        { label: "Book an appointment", href: "/book-a-visit" },
        { label: "Free assessment", href: "https://assessment.mindspan.co/" },
        { label: "How it works", href: "/about/how-it-works" },
        { label: "Science & technology", href: "/about/science" },
        { label: "GUIDE Program", href: "/guide" },
        { label: "For caregivers", href: "/family/assist" },
        { label: "Member portal", href: "https://my.mindspan.co/login" },
      ],
    },
    {
      title: "For providers",
      links: [
        { label: "Refer a patient", href: "/providers/refer" },
        { label: "Provider information", href: "/providers" },
        { label: "Science & technology", href: "/about/science" },
        { label: "About Mindspan", href: "/about" },
      ],
    },
    {
      title: "Locations",
      links: [
        { label: "Danvers, MA", href: "/locations/danvers" },
        { label: "Bay Area, CA", href: "/locations/bay-area" },
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
  mailingAddress: ["169 Madison Ave, Suite 90030", "New York, NY 10016"],
  copyright: "\u00a9 2026 Mindspan",
} as const;
