import type { Metadata } from "next";
import Link from "next/link";

import { SiteChrome } from "@/components/articles/site-chrome";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/config/site";
import {
  ARTICLE_CATEGORIES,
  type ArticleCategory,
  getAllArticles,
} from "@/lib/articles";

export const metadata: Metadata = {
  title: "文章与洞察",
  description:
    "围绕企业 AI 培训、API 中转、本地 Agent、FDE 驻场交付与技术咨询的落地文章，帮助决策者看清选型路径与交付边界。",
  keywords: [
    "企业AI培训",
    "API中转",
    "本地Agent",
    "FDE驻场",
    "技术咨询",
    ...siteConfig.seo.keywords.slice(0, 6),
  ],
  alternates: {
    canonical: `${siteConfig.url}/articles`,
  },
  openGraph: {
    title: "文章与洞察 | 醴陵真好网络",
    description:
      "AI 培训、API 中转、本地 Agent、FDE 与技术咨询的商业落地洞察。",
    url: `${siteConfig.url}/articles`,
    type: "website",
  },
};

function isCategory(value: string | undefined): value is ArticleCategory {
  return Boolean(value && value in ARTICLE_CATEGORIES);
}

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const categoryParam = params.category;
  const categoryKey = Object.entries(ARTICLE_CATEGORIES).find(
    ([, label]) => label === categoryParam,
  )?.[0];
  const selected = isCategory(categoryKey) ? categoryKey : undefined;

  const articles = getAllArticles().filter((article) =>
    selected ? article.category === selected : true,
  );

  return (
    <SiteChrome>
      <Section className="pt-28 sm:pt-32">
        <div className="max-w-container mx-auto">
          <div className="max-w-2xl">
            <p className="text-brand mb-3 text-sm font-medium tracking-wide">
              Articles
            </p>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
              文章与洞察
            </h1>
            <p className="text-muted-foreground mt-5 text-base leading-relaxed sm:text-lg">
              面向老板、IT 负责人与培训负责人的落地内容：为什么做、怎么选、我们具体交付什么。
              不堆概念，只谈可执行路径。
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-2">
            <Link
              href="/articles"
              className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
                !selected
                  ? "bg-foreground text-background"
                  : "bg-muted/30 text-muted-foreground hover:text-foreground"
              }`}
            >
              全部
            </Link>
            {(
              Object.entries(ARTICLE_CATEGORIES) as [
                ArticleCategory,
                string,
              ][]
            ).map(([key, label]) => (
              <Link
                key={key}
                href={`/articles?category=${encodeURIComponent(label)}`}
                className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
                  selected === key
                    ? "bg-foreground text-background"
                    : "bg-muted/30 text-muted-foreground hover:text-foreground"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                className="group border-border/40 bg-muted/10 hover:bg-muted/20 flex flex-col gap-4 rounded-3xl border p-6 transition-colors sm:p-7"
              >
                <div className="text-muted-foreground flex items-center justify-between gap-3 text-xs">
                  <span className="text-brand">{article.categoryLabel}</span>
                  <time dateTime={article.date}>{article.date}</time>
                </div>
                <h2 className="group-hover:text-brand text-xl leading-snug font-semibold tracking-tight transition-colors">
                  {article.title}
                </h2>
                <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
                  {article.description}
                </p>
                <span className="text-foreground/80 mt-auto text-sm">
                  阅读全文 →
                </span>
              </Link>
            ))}
          </div>

          {articles.length === 0 && (
            <p className="text-muted-foreground mt-16 text-center">
              该分类暂无文章。
            </p>
          )}
        </div>
      </Section>
    </SiteChrome>
  );
}
