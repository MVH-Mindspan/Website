export type NavLink = { label: string; href: string };

export const nav: NavLink[] = [
  { label: "How it works", href: "/about/how-it-works" },
  { label: "What we treat", href: "/what-we-treat" },
  { label: "GUIDE Program", href: "/guide" },
  { label: "Coverage & cost", href: "/coverage" },
  { label: "For caregivers", href: "/family/assist" },
];

export const audienceNav = {
  providers: { label: "For providers", href: "/providers" },
} as const;
