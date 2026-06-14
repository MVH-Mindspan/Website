import type { Metadata } from "next";
import { RippleFlow, type RippleStep, type RippleVariant } from "@/components/organisms/sections";

export const metadata: Metadata = {
  title: "RippleFlow preview",
  robots: { index: false, follow: false },
};

/* Throwaway preview content. When a variant is chosen, promote this into a typed
   content module (e.g. src/content/ripple.ts) and wire the chosen variant onto
   the homepage + /about/how-it-works. */
const steps: readonly RippleStep[] = [
  { label: "Free screening", icon: "home" },
  { label: "Same-day assessment", icon: "grid" },
  { label: "Neurologist in weeks", icon: "chat" },
  { label: "Tailored plan", icon: "bullseye" },
  { label: "Ongoing partnership", icon: "refresh", accent: true },
];

const intro = {
  eyebrow: "The Mindspan path",
  title: "The shape of care at Mindspan.",
  caption: "From first concern to ongoing care, you always know what comes next.",
};

const variants: { variant: RippleVariant; tone: "cream" | "sand"; blurb: string }[] = [
  {
    variant: "ripple",
    tone: "cream",
    blurb: "Faithful to the reference: overlapping translucent halos form a connected band.",
  },
  {
    variant: "rail",
    tone: "sand",
    blurb: "Cleaner process diagram: nodes on a connector rail that fills left-to-right on scroll.",
  },
  {
    variant: "rings",
    tone: "cream",
    blurb: "Editorial: concentric-ring badges (bullseye motif) over a soft connecting band.",
  },
];

export default function RippleFlowPreview() {
  return (
    <>
      {variants.map(({ variant, tone, blurb }) => (
        <div key={variant}>
          <div
            style={{
              maxWidth: "min(1320px, 92vw)",
              margin: "0 auto",
              padding: "40px 0 0",
            }}
          >
            <p
              style={{
                fontSize: "0.8125rem",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                opacity: 0.5,
              }}
            >
              Variant: {variant}
            </p>
            <p style={{ fontSize: "0.95rem", opacity: 0.6, marginTop: 6 }}>{blurb}</p>
          </div>
          <RippleFlow variant={variant} steps={steps} intro={intro} tone={tone} />
        </div>
      ))}
    </>
  );
}
