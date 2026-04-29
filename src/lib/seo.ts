import type { Metadata } from "next";

const SITE_NAME = "Mindspan";
export const SITE_URL = "https://mindspan.co";
const DEFAULT_OG_IMAGE = `${SITE_URL}/opengraph-image`;
const DEFAULT_TWITTER_IMAGE = `${SITE_URL}/twitter-image`;

export function buildMetadata(opts: {
  title: string;
  description: string;
  canonical: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const { title, description, canonical, image, noIndex } = opts;
  const url = canonical.startsWith("http") ? canonical : `${SITE_URL}${canonical}`;
  const ogImage = image ?? DEFAULT_OG_IMAGE;
  const twitterImage = image ?? DEFAULT_TWITTER_IMAGE;
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
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [twitterImage],
    },
    robots: noIndex ? { index: false, follow: false } : undefined,
  };
}
