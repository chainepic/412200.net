import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArticleMarkdown } from "@/components/articles/markdown";
import {
  ArticleMetaRow,
  SiteChrome,
} from "@/components/articles/site-chrome";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/config/site";
import {
  estimateReadingMinutes,
  getAllArticles,
  getArticleBySlug,
  getRelatedArticles,
} from "@/lib/articles";

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  const url = `${siteConfig.url}/articles/${article.slug}`;

  return {
    title: article.seoTitle,
    description: article.description,
    keywords: article.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: article.seoTitle,
      description: article.description,
      url,
      type: "article",
      publishedTime: article.date,
      locale: "zh_CN",
      siteName: siteConfig.fullName,
    },
    twitter: {
      card: "summary_large_image",
      title: article.seoTitle,
      description: article.description,
    },
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const readingMinutes =
    article.readingMinutes ?? estimateReadingMinutes(article.content);
  const related = getRelatedArticles(slug, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    author: {
      "@type": "Organization",
      name: siteConfig.fullName,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.fullName,
      url: siteConfig.url,
    },
    mainEntityOfPage: `${siteConfig.url}/articles/${article.slug}`,
    keywords: article.keywords.join(", "),
  };

  return (
    <SiteChrome>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Section className="pt-28 sm:pt-32">
        <article className="max-w-container mx-auto">
          <div className="mx-auto max-w-3xl">
            <Link
              href="/articles"
              className="text-muted-foreground hover:text-foreground mb-8 inline-flex text-sm transition-colors"
            >
              ← 返回文章列表
            </Link>

            <ArticleMetaRow
              categoryLabel={article.categoryLabel}
              date={article.date}
              readingMinutes={readingMinutes}
            />

            <h1 className="mt-5 text-3xl leading-tight font-semibold tracking-tight sm:text-4xl md:text-[2.75rem]">
              {article.title}
            </h1>
            <p className="text-muted-foreground mt-5 text-lg leading-relaxed">
              {article.description}
            </p>

            <div className="mt-12">
              <ArticleMarkdown content={article.content} />
            </div>

            <aside className="border-border/50 bg-muted/15 mt-14 rounded-3xl border p-6 sm:p-8">
              <h2 className="text-lg font-semibold tracking-tight">
                需要针对贵司场景沟通？
              </h2>
              <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                微信搜一搜「{siteConfig.contact.wechatSearch}」，或发邮件至{" "}
                {siteConfig.contact.email}。我们提供 10
                分钟免费初步咨询，帮助你判断该先做培训、接入、私有化还是驻场交付。
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/#contact"
                  className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-5 py-2 text-sm font-medium transition-colors"
                >
                  联系我们
                </Link>
                <Link
                  href="/pricing"
                  className="bg-muted/40 text-foreground hover:bg-muted/60 rounded-full px-5 py-2 text-sm font-medium transition-colors"
                >
                  查看服务价格
                </Link>
              </div>
            </aside>
          </div>

          {related.length > 0 && (
            <div className="mx-auto mt-20 max-w-3xl border-t border-white/5 pt-12">
              <h2 className="text-xl font-semibold tracking-tight">相关阅读</h2>
              <ul className="mt-6 flex flex-col gap-4">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/articles/${item.slug}`}
                      className="group flex flex-col gap-1"
                    >
                      <span className="text-muted-foreground text-xs">
                        {item.categoryLabel}
                      </span>
                      <span className="group-hover:text-brand text-base font-medium transition-colors">
                        {item.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </article>
      </Section>
    </SiteChrome>
  );
}
