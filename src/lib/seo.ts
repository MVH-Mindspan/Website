import type { Metadata } from "next";

const SITE_NAME = "Mindspan";
const SITE_URL = "https://mindspan.co";
const DEFAULT_OG_IMAGE = "/assets/logo-green.png";

export function buildMetadata(opts: {
  title: string;
  description: string;
  canonical: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const { title, description, canonical, image = DEFAULT_OG_IMAGE, noIndex } = opts;
  const url = canonical.startsWith("http") ? canonical : `${SITE_URL}${canonical}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title,
      description,
      url,
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: noIndex ? { index: false, follow: false } : undefined,
  };
}
