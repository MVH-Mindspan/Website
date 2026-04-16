import { buildMetadata } from "@/lib/seo";

type LegalPage = {
  metadata: ReturnType<typeof buildMetadata>;
  hero: { eyebrow: string; title: string; lead: string };
};

export const termsPage: LegalPage = {
  metadata: buildMetadata({
    title: "Terms of Use | Mindspan",
    description: "The terms governing your use of the Mindspan website.",
    canonical: "/legal/terms",
    noIndex: true,
  }),
  hero: {
    eyebrow: "Legal",
    title: "Terms of Use",
    lead: "The terms governing your use of the Mindspan website.",
  },
};

export const privacyPage: LegalPage = {
  metadata: buildMetadata({
    title: "Privacy Policy | Mindspan",
    description: "How Mindspan collects, uses, and protects your information.",
    canonical: "/legal/privacy",
    noIndex: true,
  }),
  hero: {
    eyebrow: "Legal",
    title: "Privacy Policy",
    lead: "How Mindspan collects, uses, and protects your information.",
  },
};

export const consentPage: LegalPage = {
  metadata: buildMetadata({
    title: "Informed Consent | Mindspan",
    description: "Informed consent for care at Mindspan.",
    canonical: "/legal/consent",
    noIndex: true,
  }),
  hero: {
    eyebrow: "Legal",
    title: "Informed Consent",
    lead: "Informed consent for care at Mindspan.",
  },
};
