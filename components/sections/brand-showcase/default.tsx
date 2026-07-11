import Image from "next/image";
import { ArrowUpRightIcon, ExternalLinkIcon } from "lucide-react";

import { siteConfig } from "@/config/site";

import { LinkButton } from "../../ui/link-button";
import { Reveal } from "../../ui/reveal";
import { Section } from "../../ui/section";

const youxia = siteConfig.brand.youxiaWucai;
const hitoys = siteConfig.brand.hiToys;
const shipinhao = siteConfig.brand.shipinhao;

const youxiaShots = [
  { src: "/brand/youxiawucaici/hero.png", title: "品牌首页", desc: "窑火淬炼 · 东方釉色" },
  {
    src: "/brand/youxiawucaici/civilization.png",
    title: "文明坐标",
    desc: "七大板块数字溯源",
  },
  { src: "/brand/youxiawucaici/origin.png", title: "源起", desc: "百年国瓷历史脉络" },
  { src: "/brand/youxiawucaici/craft.png", title: "造物", desc: "72 道纯手工工序" },
  { src: "/brand/youxiawucaici/masters.png", title: "群星", desc: "大师匠心传承" },
  { src: "/brand/youxiawucaici/city.png", title: "城迹", desc: "醴陵城市文化地图" },
  {
    src: "/brand/youxiawucaici/collection.png",
    title: "典藏",
    desc: "精品瓷器数字展厅",
  },
  { src: "/brand/youxiawucaici/box.png", title: "盲盒", desc: "文创互动体验" },
  { src: "/brand/youxiawucaici/lab.png", title: "捏瓷", desc: "AI 数字捏瓷实验室" },
];

const hitoysShots = [
  { src: "/brand/hitoys/hot.png", title: "热销商品", desc: "高转化商品陈列与定价" },
  { src: "/brand/hitoys/bjd.png", title: "BJD 系列", desc: "品类专题与视觉叙事" },
  { src: "/brand/hitoys/plush.png", title: "毛绒潮玩", desc: "多品类矩阵运营" },
  { src: "/brand/hitoys/products.png", title: "商品目录", desc: "筛选、排序与全球结账" },
];

const shipinhaoShots = [
  {
    src: "/brand/shipinhao/milestone.png",
    title: "累计播放 10 万",
    desc: "视频号官方成就达成",
  },
  {
    src: "/brand/shipinhao/analytics.png",
    title: "单条破 2.3 万",
    desc: "播放量超同类 99.75%",
  },
  {
    src: "/brand/shipinhao/weekly.png",
    title: "近 7 天数据",
    desc: "日更节奏与持续增长",
  },
];

interface BrandShowcaseProps {
  className?: string;
}

export default function BrandShowcase({ className }: BrandShowcaseProps) {
  return (
    <Section className={className}>
      <div className="max-w-container mx-auto flex flex-col gap-12 sm:gap-16">
        <Reveal className="max-w-[720px]">
          <p className="text-brand mb-3 text-sm font-medium tracking-wide">
            品牌建设 · 跨境电商 · 新媒体营销
          </p>
          <h2 className="text-3xl leading-tight font-semibold tracking-tight sm:text-4xl">
            业务范围与代表案例
          </h2>
          <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
            覆盖品牌策略与视觉体系、文化 IP
            官网、跨境电商独立站，以及视频号等内容营销。从定位、建站到选题创作与传播增长，为传统企业与出海品牌提供完整数字化交付。
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="bg-muted/15 grid gap-8 rounded-3xl p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-10 lg:p-10">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <span className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                  {youxia.tagline}
                </span>
                <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  <a
                    href={youxia.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand inline-flex items-center gap-2 transition-colors"
                  >
                    {youxia.name}
                    <ExternalLinkIcon className="size-4" />
                  </a>
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  我们为醴陵釉下五彩瓷打造国家级非遗数字化品牌官网
                  youxiawucaici.com，涵盖源起、造物、群星、城迹、典藏、盲盒、捏瓷七大沉浸式板块，并运营「
                  {youxia.wechatAccount}」微信公众号，实现文化传播与品牌声量的持续增长。
                </p>
              </div>

              <ul className="flex flex-col gap-2">
                {[
                  "非遗文化 IP 品牌定位与视觉体系",
                  "中英文双语响应式官网建设",
                  "七大板块沉浸式数字叙事",
                  "微信公众号内容运营与传播",
                ].map((item) => (
                  <li
                    key={item}
                    className="text-muted-foreground flex items-center gap-2 text-sm"
                  >
                    <span className="bg-brand size-1.5 shrink-0 rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-3">
                <LinkButton
                  href={youxia.url}
                  variant="default"
                  iconRight={<ArrowUpRightIcon />}
                >
                  访问 youxiawucaici.com
                </LinkButton>
                <LinkButton href="#contact" variant="glow">
                  咨询品牌服务
                </LinkButton>
              </div>

              <p className="text-muted-foreground text-sm">
                微信公众号：微信搜索「
                <strong className="text-foreground">
                  {youxia.wechatAccount}
                </strong>
                」关注我们
              </p>
            </div>

            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
              <Image
                src="/brand/youxiawucaici/hero.png"
                alt={`${youxia.name} 品牌官网首页`}
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 55vw"
                priority
              />
            </div>
          </div>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {youxiaShots.slice(1).map((shot, index) => (
            <Reveal key={shot.title} delay={0.04 * index}>
              <a
                href={youxia.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-muted/15 hover:bg-muted/25 block overflow-hidden rounded-2xl transition-colors"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={shot.src}
                    alt={`${youxia.name} · ${shot.title}`}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="flex items-start justify-between gap-3 p-4">
                  <div>
                    <h4 className="font-medium">{shot.title}</h4>
                    <p className="text-muted-foreground mt-1 text-sm">
                      {shot.desc}
                    </p>
                  </div>
                  <ExternalLinkIcon className="text-muted-foreground group-hover:text-brand mt-0.5 size-4 shrink-0 transition-colors" />
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.06}>
          <div className="bg-muted/15 grid gap-8 rounded-3xl p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-10 lg:p-10">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <span className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                  {hitoys.tagline}
                </span>
                <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  <a
                    href={hitoys.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand inline-flex items-center gap-2 transition-colors"
                  >
                    {hitoys.name}
                    <ExternalLinkIcon className="size-4" />
                  </a>
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  我们为潮玩品牌打造并持续运营跨境电商独立站 hi.toys，面向全球收藏爱好者销售
                  BJD、盲盒与毛绒潮玩。覆盖独立站搭建、多币种多语言、跨境支付物流，以及商品上架、活动策划与日常转化运营。
                </p>
              </div>

              <ul className="flex flex-col gap-2">
                {[
                  "Shopify 跨境独立站搭建与主题定制",
                  "多币种 / 多语言与全球结账体验",
                  "商品矩阵、活动页与转化路径优化",
                  "独立站日常运营与增长支持",
                ].map((item) => (
                  <li
                    key={item}
                    className="text-muted-foreground flex items-center gap-2 text-sm"
                  >
                    <span className="bg-brand size-1.5 shrink-0 rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-3">
                <LinkButton
                  href={hitoys.url}
                  variant="default"
                  iconRight={<ArrowUpRightIcon />}
                >
                  访问 hi.toys
                </LinkButton>
                <LinkButton href="#contact" variant="glow">
                  咨询跨境电商
                </LinkButton>
              </div>
            </div>

            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
              <Image
                src="/brand/hitoys/hero.png"
                alt={`${hitoys.name} 跨境独立站首页`}
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
            </div>
          </div>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {hitoysShots.map((shot, index) => (
            <Reveal key={shot.title} delay={0.04 * index}>
              <a
                href={hitoys.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-muted/15 hover:bg-muted/25 block overflow-hidden rounded-2xl transition-colors"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={shot.src}
                    alt={`${hitoys.name} · ${shot.title}`}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="flex items-start justify-between gap-3 p-4">
                  <div>
                    <h4 className="font-medium">{shot.title}</h4>
                    <p className="text-muted-foreground mt-1 text-sm">
                      {shot.desc}
                    </p>
                  </div>
                  <ExternalLinkIcon className="text-muted-foreground group-hover:text-brand mt-0.5 size-4 shrink-0 transition-colors" />
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.06}>
          <div className="bg-muted/15 grid gap-8 rounded-3xl p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-10 lg:p-10">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <span className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                  {shipinhao.tagline}
                </span>
                <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  {shipinhao.name}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  7
                  天打造醴陵地区知名视频号：从选题、文案、配图到配音一站式交付。聚焦本土文化、文旅与硬核制造，单条播放破
                  2.3 万（超同类 99.75%），累计播放突破 10 万。
                </p>
              </div>

              <ul className="flex flex-col gap-2">
                {[
                  "选题策划：本土文化、文旅与人物故事",
                  "文案撰写与分镜脚本",
                  "配图 / 画面制作与配音成片",
                  "账号定位、发布节奏与数据复盘",
                ].map((item) => (
                  <li
                    key={item}
                    className="text-muted-foreground flex items-center gap-2 text-sm"
                  >
                    <span className="bg-brand size-1.5 shrink-0 rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {[
                  { value: "7 天", label: "从 0 到破圈" },
                  { value: "10 万+", label: "累计播放" },
                  { value: "2.3 万", label: "单条峰值" },
                ].map((stat) => (
                  <div key={stat.label} className="flex flex-col gap-0.5">
                    <span className="text-xl font-semibold tracking-tight sm:text-2xl">
                      {stat.value}
                    </span>
                    <span className="text-muted-foreground text-xs sm:text-sm">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <LinkButton href="#contact" variant="default">
                  咨询新媒体营销
                </LinkButton>
                <p className="text-muted-foreground flex items-center text-sm">
                  微信搜一搜「
                  <strong className="text-foreground">
                    {shipinhao.wechatSearch}
                  </strong>
                  」看视频号
                </p>
              </div>
            </div>

            <div className="bg-muted/30 relative mx-auto aspect-[9/16] w-full max-w-[320px] overflow-hidden rounded-2xl lg:mx-0 lg:max-w-none">
              <Image
                src="/brand/shipinhao/profile.png"
                alt={`${shipinhao.name} 主页`}
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 320px, 40vw"
              />
            </div>
          </div>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-3">
          {shipinhaoShots.map((shot, index) => (
            <Reveal key={shot.title} delay={0.04 * index}>
              <div className="bg-muted/15 overflow-hidden rounded-2xl">
                <div className="bg-muted/20 relative aspect-[9/16] max-h-[420px] overflow-hidden sm:aspect-[3/4]">
                  <Image
                    src={shot.src}
                    alt={`${shipinhao.name} · ${shot.title}`}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-medium">{shot.title}</h4>
                  <p className="text-muted-foreground mt-1 text-sm">
                    {shot.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
