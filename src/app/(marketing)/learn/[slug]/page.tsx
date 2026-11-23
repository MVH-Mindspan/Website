import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArticleHeader,
  ArticleBody,
  AuthorCard,
  FinalCTA,
} from "@/components/organisms/sections";
import { finalCta } from "@/content";
import { learnPage } from "@/content/pages/learn";
import { allPostSlugs, getPost, formatPostDate } from "@/lib/learn";
import { JsonLd } from "@/lib/json-ld";
import { buildArticleSchema, buildBreadcrumbSchema } from "@/lib/schema";
import { buildMetadata, SITE_URL } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return allPostSlugs();
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return buildMetadata({
    title: `${post.title} | Mindspan`,
    description: post.description,
    canonical: `/learn/${post.slug}`,
    image: post.image ? `${SITE_URL}${post.image}` : undefined,
    imageAlt: post.imageAlt,
    article: {
      publishedTime: post.date,
      modifiedTime: post.updated,
      authors: [post.author.name],
      tags: post.tags,
    },
  });
}

export default async function LearnPostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const breadcrumb = buildBreadcrumbSchema([
    { name: "Home", url: `${SITE_URL}/` },
    { name: "Learn", url: `${SITE_URL}/learn` },
    { name: post.title, url: `${SITE_URL}/learn/${post.slug}` },
  ]);

  return (
    <>
      <JsonLd id="ld-breadcrumb" data={breadcrumb} />
      <JsonLd id="ld-article" data={buildArticleSchema(post)} />
      <ArticleHeader
        tag={post.tags[0]}
        title={post.title}
        description={post.description}
        authorName={post.author.name}
        dateLabel={formatPostDate(post.date)}
        updatedLabel={post.updated ? formatPostDate(post.updated) : undefined}
        readingMinutes={post.readingMinutes}
        image={post.image}
        imageAlt={post.imageAlt}
        backHref="/learn"
        backLabel={learnPage.hero.eyebrow}
      />
      <ArticleBody html={post.html} />
      <AuthorCard
        label="Written by"
        name={post.author.name}
        role={post.author.role}
        bio={post.author.bio}
        photo={post.author.photo}
      />
      <FinalCTA {...finalCta} />
    </>
  );
}
