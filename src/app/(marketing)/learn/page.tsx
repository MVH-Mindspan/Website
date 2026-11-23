import { PageHero } from "@/components/organisms/sections/PageHero";
import { PostGrid } from "@/components/organisms/sections/PostGrid";
import { FinalCTA } from "@/components/organisms/sections/FinalCTA";
import { learnPage } from "@/content/pages/learn";
import { finalCta } from "@/content";
import { getAllPosts, formatPostDate } from "@/lib/learn";
import { JsonLd } from "@/lib/json-ld";
import { buildBreadcrumbSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/seo";

export const metadata = learnPage.metadata;

export default function LearnIndexPage() {
  const posts = getAllPosts().map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.description,
    dateLabel: formatPostDate(p.date),
    authorName: p.author.name,
    tag: p.tags[0],
    image: p.image,
    imageAlt: p.imageAlt,
    readingMinutes: p.readingMinutes,
  }));

  return (
    <>
      <JsonLd
        id="ld-breadcrumb"
        data={buildBreadcrumbSchema([
          { name: "Home", url: `${SITE_URL}/` },
          { name: "Learn", url: `${SITE_URL}/learn` },
        ])}
      />
      <PageHero {...learnPage.hero} />
      <PostGrid
        posts={posts}
        emptyText={learnPage.empty}
        feed={{ label: learnPage.feedLabel, href: "/learn/feed.xml" }}
      />
      <FinalCTA {...finalCta} />
    </>
  );
}
