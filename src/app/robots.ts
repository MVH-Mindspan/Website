import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

const AI_BOTS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "PerplexityBot",
  "Google-Extended",
  "ClaudeBot",
  "anthropic-ai",
  "CCBot",
  "Applebot-Extended",
];

/**
 * Cloudflare Pages preview deployments expose `CF_PAGES_BRANCH` and a
 * `pages.dev` host. We block crawl on anything that is not the production
 * branch so search engines do not index preview URLs. Production stays
 * fully crawlable.
 */
function isPreviewDeployment(): boolean {
  if (process.env.NEXT_PUBLIC_BLOCK_INDEXING === "true") return true;
  const branch = process.env.CF_PAGES_BRANCH;
  if (branch && branch !== "main") return true;
  const url = process.env.CF_PAGES_URL;
  if (url && url.includes(".pages.dev")) return true;
  return false;
}

export default function robots(): MetadataRoute.Robots {
  if (isPreviewDeployment()) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      ...AI_BOTS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: ["/api/", "/_next/"],
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
