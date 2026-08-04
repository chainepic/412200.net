import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

export const ARTICLE_CATEGORIES = {
  "ai-training": "AI 培训",
  "api-gateway": "企业 API 中转",
  "local-agent": "本地 Agent 搭建",
  fde: "FDE 驻场交付",
  consulting: "技术咨询",
} as const;

export type ArticleCategory = keyof typeof ARTICLE_CATEGORIES;

export interface ArticleFrontmatter {
  title: string;
  slug: string;
  description: string;
  keywords: string[];
  seoTitle: string;
  date: string;
  category: ArticleCategory;
  featured?: boolean;
  readingMinutes?: number;
}

export interface ArticleMeta extends ArticleFrontmatter {
  categoryLabel: string;
}

export interface Article extends ArticleMeta {
  content: string;
}

const CONTENT_DIR = path.join(process.cwd(), "content/articles");

function isArticleCategory(value: unknown): value is ArticleCategory {
  return typeof value === "string" && value in ARTICLE_CATEGORIES;
}

function parseFrontmatter(data: Record<string, unknown>, fallbackSlug: string): ArticleFrontmatter {
  const slug = typeof data.slug === "string" ? data.slug : fallbackSlug;
  const category = isArticleCategory(data.category) ? data.category : "consulting";

  return {
    title: typeof data.title === "string" ? data.title : slug,
    slug,
    description: typeof data.description === "string" ? data.description : "",
    keywords: Array.isArray(data.keywords)
      ? data.keywords.filter((item): item is string => typeof item === "string")
      : [],
    seoTitle: typeof data.seoTitle === "string" ? data.seoTitle : String(data.title ?? slug),
    date: typeof data.date === "string" ? data.date : "2026-08-01",
    category,
    featured: Boolean(data.featured),
    readingMinutes:
      typeof data.readingMinutes === "number" ? data.readingMinutes : undefined,
  };
}

function toMeta(frontmatter: ArticleFrontmatter): ArticleMeta {
  return {
    ...frontmatter,
    categoryLabel: ARTICLE_CATEGORIES[frontmatter.category],
  };
}

function readArticleFile(filename: string): Article | null {
  if (!filename.endsWith(".md")) return null;

  const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf8");
  const { data, content } = matter(raw);
  const fallbackSlug = filename.replace(/\.md$/, "");
  const frontmatter = parseFrontmatter(data as Record<string, unknown>, fallbackSlug);

  return {
    ...toMeta(frontmatter),
    content: content.trim(),
  };
}

export function getAllArticles(): ArticleMeta[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  return fs
    .readdirSync(CONTENT_DIR)
    .map((filename) => readArticleFile(filename))
    .filter((article): article is Article => article !== null)
    .map(({ content: _content, ...meta }) => meta)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export function getArticlesByCategory(category: ArticleCategory): ArticleMeta[] {
  return getAllArticles().filter((article) => article.category === category);
}

export function getFeaturedArticles(limit = 6): ArticleMeta[] {
  const featured = getAllArticles().filter((article) => article.featured);
  const pool = featured.length > 0 ? featured : getAllArticles();
  return pool.slice(0, limit);
}

export function getArticleBySlug(slug: string): Article | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  return readArticleFile(`${slug}.md`);
}

export function getRelatedArticles(slug: string, limit = 3): ArticleMeta[] {
  const current = getArticleBySlug(slug);
  if (!current) return [];

  const sameCategory = getAllArticles().filter(
    (article) => article.slug !== slug && article.category === current.category,
  );

  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);

  const others = getAllArticles().filter(
    (article) =>
      article.slug !== slug &&
      !sameCategory.some((item) => item.slug === article.slug),
  );

  return [...sameCategory, ...others].slice(0, limit);
}

export function estimateReadingMinutes(content: string, fallback = 8): number {
  const chars = content.replace(/\s/g, "").length;
  return Math.max(5, Math.round(chars / 400) || fallback);
}
