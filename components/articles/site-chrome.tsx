import Link from "next/link";
import { ReactNode } from "react";

import CompanyNav from "@/components/navigation/company-nav";
import Footer from "@/components/sections/footer/default";
import Navbar from "@/components/sections/navbar/default";
import LocalSeoKeywords from "@/components/seo/local-keywords";
import { AmbientBackground } from "@/components/ui/ambient-background";
import { siteConfig } from "@/config/site";
import { getFeaturedArticles } from "@/lib/articles";

function formatArticleDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  if (!year || !month || !day) return date;
  return `${year}年${month}月${day}日`;
}

export function buildFooterColumns() {
  const featured = getFeaturedArticles(5);

  return [
    {
      title: "核心服务",
      links: [
        { text: "企业 API 中转", href: siteConfig.links.byteData },
        { text: "AI 讲课教学", href: "/#services" },
        { text: "本地 Agent 搭建", href: "/#services" },
        { text: "FDE 驻场交付", href: "/#services" },
      ],
    },
    {
      title: "服务价格",
      links: [
        { text: "AI 培训 ¥8,000/天", href: "/pricing" },
        { text: "API 中转部署", href: "/pricing" },
        { text: "FDE ¥50,000/月起", href: "/pricing" },
        { text: "完整价格表", href: "/pricing" },
      ],
    },
    {
      title: "精选文章",
      links: [
        ...featured.map((article) => ({
          text: article.title,
          href: `/articles/${article.slug}`,
        })),
        { text: "全部文章 →", href: "/articles" },
      ],
    },
    {
      title: "品牌建设",
      links: [
        {
          text: "醴陵釉下五彩瓷",
          href: siteConfig.brand.youxiaWucai.url,
        },
        {
          text: "Hi.Toys 跨境独立站",
          href: siteConfig.brand.hiToys.url,
        },
        { text: "视频号新媒体营销", href: "/#brand" },
      ],
    },
    {
      title: "联系我们",
      links: [
        {
          text: `微信搜：${siteConfig.contact.wechatSearch}`,
          href: "/#contact",
        },
        { text: siteConfig.contact.email, href: siteConfig.links.email },
        { text: siteConfig.location, href: "/#contact" },
        { text: "关于我们", href: "/#about" },
      ],
    },
    {
      title: "合作伙伴",
      layout: "row" as const,
      links: [
        { text: "醴陵瓷器", href: "https://youxiawucaici.com" },
        { text: "从夯到拉生成器", href: "https://obpai.com" },
        { text: "AI捐赠", href: "https://aidonate.org" },
        { text: "AI中转站", href: "https://bytedata.ai" },
        { text: "CS2开箱模拟器", href: "https://take.skin" },
        { text: "CS2小程序", href: "https://cs2hot.com" },
        { text: "密码管理工具", href: "https://tt.box" },
        { text: "Newname", href: "https://newname.ai" },
        { text: "AI创作", href: "https://easymake.ai" },
      ],
    },
  ];
}

export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <main className="bg-background text-foreground min-h-screen w-full">
      <LocalSeoKeywords />
      <AmbientBackground />
      <Navbar
        logo={false}
        name={siteConfig.name}
        homeUrl="/"
        showNavigation
        customNavigation={<CompanyNav />}
        mobileLinks={[
          { text: "解决方案", href: "/#services" },
          { text: "文章", href: "/articles" },
          { text: "服务价格", href: "/pricing" },
          { text: "品牌与案例", href: "/#brand" },
          { text: "联系我们", href: "/#contact" },
        ]}
        actions={[
          { text: "微信咨询", href: "/#contact", isButton: false },
          {
            text: "获取咨询",
            href: "/#contact",
            isButton: true,
            variant: "default",
          },
        ]}
      />
      {children}
      <Footer
        name={siteConfig.fullName}
        columns={buildFooterColumns()}
        copyright={`© 2026 ${siteConfig.fullName}. 保留所有权利.`}
        policies={[
          { text: "隐私政策", href: "/#contact" },
          { text: "服务条款", href: "/#contact" },
        ]}
      />
    </main>
  );
}

export function ArticleMetaRow({
  categoryLabel,
  date,
  readingMinutes,
}: {
  categoryLabel: string;
  date: string;
  readingMinutes: number;
}) {
  return (
    <div className="text-muted-foreground flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
      <Link
        href={`/articles?category=${encodeURIComponent(categoryLabel)}`}
        className="text-brand hover:text-brand/80 transition-colors"
      >
        {categoryLabel}
      </Link>
      <span aria-hidden>·</span>
      <time dateTime={date}>{formatArticleDate(date)}</time>
      <span aria-hidden>·</span>
      <span>约 {readingMinutes} 分钟阅读</span>
    </div>
  );
}
