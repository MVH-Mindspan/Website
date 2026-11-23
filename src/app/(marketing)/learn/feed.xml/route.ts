import { getAllPosts } from "@/lib/learn";
import { SITE_URL } from "@/lib/seo";
import { learnPage } from "@/content/pages/learn";

export const dynamic = "force-static";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function GET() {
  const posts = getAllPosts();
  const items = posts
    .map((p) => {
      const url = `${SITE_URL}/learn/${p.slug}`;
      return `    <item>
      <title>${esc(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(`${p.date}T12:00:00Z`).toUTCString()}</pubDate>
      <description>${esc(p.description)}</description>
      <author>${esc(p.author.name)}</author>
${p.tags.map((t) => `      <category>${esc(t)}</category>`).join("\n")}
      <content:encoded><![CDATA[${p.html}]]></content:encoded>
    </item>`;
    })
    .join("\n");

  const lastBuild = posts[0] ? new Date(`${posts[0].date}T12:00:00Z`).toUTCString() : new Date().toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Mindspan Learn</title>
    <link>${SITE_URL}/learn</link>
    <atom:link href="${SITE_URL}/learn/feed.xml" rel="self" type="application/rss+xml" />
    <description>${esc(learnPage.metadata.description ?? "")}</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
