import type { Metadata } from "next";

import Footer from "@/components/sections/footer/default";
import Navbar from "@/components/sections/navbar/default";
import {
  PricingCard,
  PricingCategorySection,
  PricingPageHeader,
} from "@/components/sections/pricing/pricing-page";
import CTA from "@/components/sections/cta/default";
import LocalSeoKeywords from "@/components/seo/local-keywords";
import Zhenhao from "@/components/logos/zhenhao";
import CompanyNav from "@/components/navigation/company-nav";
import { AmbientBackground } from "@/components/ui/ambient-background";
import { pricingCategories } from "@/config/pricing";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "服务价格",
  description: `AI讲课培训、企业API中转、本地Agent部署与RAG知识库建设报价一览。培训支持开票，API按量计费，部署按需计费。`,
  keywords: [
    "AI培训费用",
    "企业API中转价格",
    "Agent部署报价",
    ...siteConfig.seo.keywords.slice(0, 8),
  ],
};

export default function PricingPage() {
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
          { text: "品牌与案例", href: "/#brand" },
          { text: "服务价格", href: "/pricing" },
          { text: "成功案例", href: "/#cases" },
          { text: "关于我们", href: "/#about" },
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
      <section className="line-b px-4 py-12 sm:py-24 md:py-32">
        <div className="max-w-container mx-auto flex flex-col items-center gap-6 pt-8">
          <PricingPageHeader
            title="服务价格"
            description="透明定价，按需选择。所有项目均支持签约合同，培训及企业服务可开具正规发票。"
          />
        </div>
      </section>
      {pricingCategories.map((category) => (
        <PricingCategorySection
          key={category.title}
          title={category.title}
          titleHref={category.titleHref}
          description={category.description}
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {category.items.map((item) => (
              <PricingCard key={item.name} {...item} />
            ))}
          </div>
        </PricingCategorySection>
      ))}
      <CTA
        title="需要定制报价？"
        buttons={[
          { href: "/#contact", text: "扫码微信咨询", variant: "default" },
          { href: siteConfig.links.email, text: "发送邮件", variant: "glow" },
        ]}
      />
      <Footer
        logo={<Zhenhao />}
        name={siteConfig.fullName}
        columns={[
          {
            title: "核心服务",
            links: [
              { text: "企业 API 中转", href: siteConfig.links.byteData },
              { text: "AI 讲课教学", href: "/#services" },
              { text: "本地 Agent 搭建", href: "/#services" },
              { text: "服务价格", href: "/pricing" },
            ],
          },
          {
            title: "价格方案",
            links: [
              { text: "AI 培训 ¥8,000/天", href: "/pricing" },
              { text: "API 中转部署", href: "/pricing" },
              { text: "Agent 定制开发", href: "/pricing" },
              { text: "技术咨询", href: "/pricing" },
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
              { text: "关于我们", href: "/#about" },
            ],
          },
        ]}
        copyright={`© 2026 ${siteConfig.fullName}. 保留所有权利.`}
        policies={[
          { text: "隐私政策", href: "/#contact" },
          { text: "服务条款", href: "/#contact" },
        ]}
      />
    </main>
  );
}
