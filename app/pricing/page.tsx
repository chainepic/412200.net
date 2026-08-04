import type { Metadata } from "next";

import { buildFooterColumns } from "@/components/articles/site-chrome";
import CompanyNav from "@/components/navigation/company-nav";
import CTA from "@/components/sections/cta/default";
import Footer from "@/components/sections/footer/default";
import Navbar from "@/components/sections/navbar/default";
import {
  PricingCard,
  PricingCategorySection,
  PricingPageHeader,
} from "@/components/sections/pricing/pricing-page";
import LocalSeoKeywords from "@/components/seo/local-keywords";
import { AmbientBackground } from "@/components/ui/ambient-background";
import { pricingCategories } from "@/config/pricing";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "服务价格",
  description: `AI讲课培训、企业API中转、本地Agent部署、FDE驻场交付与RAG知识库建设报价一览。培训支持开票，FDE入场常驻¥50,000/月起。`,
  keywords: [
    "AI培训费用",
    "企业API中转价格",
    "Agent部署报价",
    "FDE驻场交付",
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
          { text: "文章", href: "/articles" },
          { text: "品牌与案例", href: "/#brand" },
          { text: "服务价格", href: "/pricing" },
          { text: "釉下五彩瓷", href: "https://youxiawucaici.com" },
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
