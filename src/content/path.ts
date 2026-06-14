import type { RippleStep } from "@/components/organisms/sections";

/**
 * "The Mindspan path" — a compact, at-a-glance view of the care journey,
 * rendered by the <RippleFlow> section. Shared by the homepage and the
 * How It Works page. Keep the labels short; the detailed journey sections
 * (EditorialStages / EditorialPillarsIllustrated) carry the full copy.
 */
export const mindspanPathIntro = {
  eyebrow: "The Mindspan path",
  title: "The shape of care at Mindspan.",
  caption: "From first concern to ongoing care, you always know what comes next.",
} as const;

export const mindspanPathCta = { label: "Book a visit", href: "/book-a-visit" } as const;

export const mindspanPath: readonly RippleStep[] = [
  { label: "Free screening", icon: "home" },
  { label: "Same-day assessment", icon: "grid" },
  { label: "Neurologist in weeks", icon: "chat" },
  { label: "Tailored plan", icon: "bullseye" },
  { label: "Ongoing partnership", icon: "refresh", accent: true },
];
