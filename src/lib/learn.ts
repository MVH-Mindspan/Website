// Build-time loader for the /learn blog.
// Posts are plain markdown in content/learn, authors in content/authors.
// Everything here runs at build (static export); nothing touches the browser.

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";

const CONTENT_ROOT = path.join(process.cwd(), "content");
const POSTS_DIR = path.join(CONTENT_ROOT, "learn");
const AUTHORS_DIR = path.join(CONTENT_ROOT, "authors");

export type Author = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  photo?: string;
};

export type Post = {
  slug: string;
  title: string;
  description: string;
  /** ISO date, YYYY-MM-DD */
  date: string;
  /** ISO date, YYYY-MM-DD */
  updated?: string;
  author: Author;
  image?: string;
  imageAlt?: string;
  tags: string[];
  draft: boolean;
  /** Rendered HTML body */
  html: string;
  readingMinutes: number;
};

type Frontmatter = Record<string, unknown>;

function fail(file: string, message: string): never {
  throw new Error(`[learn] ${path.relative(process.cwd(), file)}: ${message}`);
}

function str(fm: Frontmatter, key: string, file: string, required = true): string {
  const v = fm[key];
  if (v === undefined || v === null || v === "") {
    if (required) fail(file, `missing "${key}"`);
    return "";
  }
  if (typeof v !== "string") fail(file, `"${key}" must be text`);
  return v.trim();
}

// YAML turns 2026-11-24 into a Date; the CMS writes a string. Accept both.
function isoDate(fm: Frontmatter, key: string, file: string, required = true): string {
  const v = fm[key];
  if (v === undefined || v === null || v === "") {
    if (required) fail(file, `missing "${key}"`);
    return "";
  }
  const d = v instanceof Date ? v : new Date(String(v));
  if (Number.isNaN(d.getTime())) fail(file, `"${key}" is not a valid date`);
  return d.toISOString().slice(0, 10);
}

function listMarkdown(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_") && f !== "README.md")
    .map((f) => path.join(dir, f));
}

function slugOf(file: string): string {
  return path.basename(file, ".md");
}

export function estimateReadingMinutes(html: string): number {
  const words = html
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

function renderMarkdown(markdown: string): string {
  const file = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeStringify)
    .processSync(markdown);
  return String(file);
}

let authorCache: Map<string, Author> | null = null;

function loadAuthors(): Map<string, Author> {
  if (authorCache) return authorCache;
  const map = new Map<string, Author>();
  for (const file of listMarkdown(AUTHORS_DIR)) {
    const { data } = matter(fs.readFileSync(file, "utf8"));
    const fm = data as Frontmatter;
    map.set(slugOf(file), {
      slug: slugOf(file),
      name: str(fm, "name", file),
      role: str(fm, "role", file),
      bio: str(fm, "bio", file),
      photo: str(fm, "photo", file, false) || undefined,
    });
  }
  authorCache = map;
  return map;
}

export function getAuthor(slug: string): Author | undefined {
  return loadAuthors().get(slug);
}

function parsePost(file: string): Post {
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  const fm = data as Frontmatter;
  const authorSlug = str(fm, "author", file);
  const author = getAuthor(authorSlug);
  if (!author) fail(file, `unknown author "${authorSlug}" (add content/authors/${authorSlug}.md)`);

  const tagsRaw = fm.tags;
  const tags = Array.isArray(tagsRaw)
    ? tagsRaw.map((t) => String(t).trim()).filter(Boolean)
    : [];

  const html = renderMarkdown(content);
  const updated = isoDate(fm, "updated", file, false);

  return {
    slug: slugOf(file),
    title: str(fm, "title", file),
    description: str(fm, "description", file),
    date: isoDate(fm, "date", file),
    updated: updated || undefined,
    author,
    image: str(fm, "image", file, false) || undefined,
    imageAlt: str(fm, "imageAlt", file, false) || undefined,
    tags,
    draft: fm.draft === true,
    html,
    readingMinutes: estimateReadingMinutes(html),
  };
}

let postCache: Post[] | null = null;

function loadPosts(): Post[] {
  if (postCache) return postCache;
  postCache = listMarkdown(POSTS_DIR)
    .map(parsePost)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  return postCache;
}

const SHOW_DRAFTS = process.env.NODE_ENV === "development";

/** Published posts, newest first. Drafts are included only in `next dev`. */
export function getAllPosts(): Post[] {
  return loadPosts().filter((p) => SHOW_DRAFTS || !p.draft);
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function allPostSlugs(): { slug: string }[] {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export function formatPostDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
