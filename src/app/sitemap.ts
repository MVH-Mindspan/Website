import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { locations } from "@/content/locations";

export const dynamic = "force-static";

const ROUTE_LAST_MODIFIED: Record<string, string> = {
  "/": "2026-05-07",
  "/about": "2026-05-07",
  "/about/how-it-works": "2026-05-07",
  "/about/science": "2026-05-07",
  "/guide": "2026-05-07",
  "/family/assist": "2026-05-07",
  "/providers": "2026-05-07",
  "/providers/refer": "2026-05-07",
  "/locations": "2026-05-07",
  "/careers": "2026-05-07",
  "/book-a-visit": "2026-05-07",
  "/affiliates": "2026-05-07",
  "/tos": "2026-05-07",
  "/privacy-notice": "2026-05-07",
  "/informed-consent": "2026-05-07",
};

const STATIC_PATHS: ReadonlyArray<string> = [
  "/",
  "/about",
  "/about/how-it-works",
  "/about/science",
  "/guide",
  "/family/assist",
  "/providers",
  "/providers/refer",
  "/locations",
  "/careers",
  "/book-a-visit",
  "/affiliates",
  "/tos",
  "/privacy-notice",
  "/informed-consent",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date().toISOString().slice(0, 10);

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}${path === "/" ? "/" : ""}`,
    lastModified: ROUTE_LAST_MODIFIED[path] ?? today,
  }));

  const locationEntries: MetadataRoute.Sitemap = locations.map((loc) => ({
    url: `${SITE_URL}/locations/${loc.slug}`,
    lastModified: ROUTE_LAST_MODIFIED[`/locations/${loc.slug}`] ?? today,
  }));

  return [...staticEntries, ...locationEntries];
}
