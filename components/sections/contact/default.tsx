"use client";

import Image from "next/image";
import { MailIcon, MapPinIcon } from "lucide-react";

import { siteConfig } from "@/config/site";

import { Section } from "../../ui/section";

interface ContactProps {
  title?: string;
  description?: string;
  className?: string;
}

export default function Contact({
  title = "联系我们",
  description = "专业团队随时为您提供技术咨询和解决方案设计。",
  className,
}: ContactProps) {
  return (
    <Section className={className}>
      <div className="max-w-container mx-auto flex flex-col items-center gap-10 sm:gap-16">
        <div className="flex max-w-[720px] flex-col items-center gap-4 text-center">
          <h2 className="text-3xl leading-tight font-semibold sm:text-5xl sm:leading-tight">
            {title}
          </h2>
          <p className="text-muted-foreground text-md max-w-[600px] font-medium sm:text-xl">
            {description}
          </p>
        </div>
        <div className="grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="bg-muted/15 flex flex-col items-center gap-4 rounded-2xl p-6 text-center sm:col-span-3">
            <div className="text-brand text-sm font-medium">微信咨询</div>
            <Image
              src={siteConfig.contact.wechatQrcode}
              alt={`微信搜一搜 ${siteConfig.contact.wechatSearch}`}
              width={280}
              height={120}
              className="h-auto w-full max-w-[280px] rounded-lg"
            />
            <p className="text-muted-foreground text-sm">
              微信搜一搜：
              <strong className="text-foreground ml-1">
                {siteConfig.contact.wechatSearch}
              </strong>
            </p>
            <p className="text-muted-foreground text-xs">
              扫码或搜索关注我们，备注「AI咨询」，我们将在 24 小时内回复
            </p>
          </div>
          <div className="bg-muted/15 flex flex-col items-center gap-3 rounded-2xl p-6 text-center">
            <MailIcon className="text-brand size-5" />
            <div className="text-sm font-medium">邮箱</div>
            <a
              href={siteConfig.links.email}
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              {siteConfig.contact.email}
            </a>
          </div>
          <div className="bg-muted/15 flex flex-col items-center gap-3 rounded-2xl p-6 text-center">
            <MapPinIcon className="text-brand size-5" />
            <div className="text-sm font-medium">地址</div>
            <p className="text-muted-foreground text-sm">
              {siteConfig.contact.location}
            </p>
          </div>
          <div className="bg-muted/15 flex flex-col items-center gap-3 rounded-2xl p-6 text-center">
            <div className="text-brand text-lg font-bold">
              {siteConfig.stats.years}年
            </div>
            <div className="text-sm font-medium">行业经验</div>
            <p className="text-muted-foreground text-xs">稳定运营，值得信赖</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
