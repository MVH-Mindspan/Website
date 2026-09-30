import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { locations } from "@/content/locations";

export const dynamic = "force-static";

const STATIC_PATHS: ReadonlyArray<string> = [
  "/",
  "/about",
  "/about/how-it-works",
  "/about/science",
  "/guide",
  "/family/assist",
  "/medicare",
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

/**
 * Route → last commit date, written by `scripts/build-lastmod.mjs` in
 * prebuild. Missing file or route (dev, shallow clone) means no lastmod is
 * published rather than a guessed one.
 */
function readLastModified(): Record<string, string> {
  try {
    const file = join(process.cwd(), "src/generated/lastmod.json");
    return JSON.parse(readFileSync(file, "utf8"));
  } catch {
    return {};
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = readLastModified();

  const entry = (path: string, url: string): MetadataRoute.Sitemap[number] =>
    lastModified[path] ? { url, lastModified: lastModified[path] } : { url };

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) =>
    entry(path, `${SITE_URL}${path === "/" ? "" : path}${path === "/" ? "/" : ""}`),
  );

  const locationEntries: MetadataRoute.Sitemap = locations.map((loc) =>
    entry(`/locations/${loc.slug}`, `${SITE_URL}/locations/${loc.slug}`),
  );

  return [...staticEntries, ...locationEntries];
}
