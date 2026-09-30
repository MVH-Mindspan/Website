import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

/**
 * One group for every crawler, AI assistants included. `/_next/` stays
 * crawlable so search engines can load the CSS, JS and fonts they need to
 * render pages. Set `NEXT_PUBLIC_BLOCK_INDEXING=true` at build time to block
 * all crawling (for a staging or preview deploy).
 */
export default function robots(): MetadataRoute.Robots {
  if (process.env.NEXT_PUBLIC_BLOCK_INDEXING === "true") {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/tv"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
