import type { Metadata } from "next";

const SITE_NAME = "Mindspan";
export const SITE_URL = "https://mindspan.co";
const DEFAULT_OG_IMAGE = `${SITE_URL}/opengraph-image`;
const DEFAULT_TWITTER_IMAGE = `${SITE_URL}/twitter-image`;
const DEFAULT_LOCALE = "en_US";

/**
 * Build a Next.js Metadata object with sensible defaults for canonical,
 * OpenGraph, and Twitter card tags. Pass `noIndex: true` for pages we
 * intentionally keep out of search (404, error states, internal flows).
 */
export function buildMetadata(opts: {
  title: string;
  description: string;
  canonical: string;
  image?: string;
  imageAlt?: string;
  noIndex?: boolean;
}): Metadata {
  const { title, description, canonical, image, imageAlt, noIndex } = opts;
  const url = canonical.startsWith("http")
    ? canonical
    : `${SITE_URL}${canonical}`;
  const ogImage = image ?? DEFAULT_OG_IMAGE;
  const twitterImage = image ?? DEFAULT_TWITTER_IMAGE;
  const altText = imageAlt ?? `${SITE_NAME}, cognitive care and dementia specialists`;

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
      locale: DEFAULT_LOCALE,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: altText,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: twitterImage, alt: altText }],
    },
    robots: noIndex
      ? { index: false, follow: false, nocache: true }
      : { index: true, follow: true },
  };
}
