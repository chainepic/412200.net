import {
  BotIcon,
  BrainCircuitIcon,
  Building2Icon,
  CloudCogIcon,
  FactoryIcon,
  GraduationCapIcon,
  HeartPulseIcon,
  NetworkIcon,
  SearchIcon,
  ServerIcon,
  ShieldCheckIcon,
  ShoppingCartIcon,
  SparklesIcon,
  UserCogIcon,
  WorkflowIcon,
} from "lucide-react";

import BrandShowcase from "../components/sections/brand-showcase/default";
import CaseStudy from "../components/sections/case-study/default";
import Contact from "../components/sections/contact/default";
import CoreServices from "../components/sections/core-services/default";
import CTA from "../components/sections/cta/default";
import FAQ from "../components/sections/faq/default";
import Footer from "../components/sections/footer/default";
import Hero from "../components/sections/hero/default";
import Industries from "../components/sections/industries/default";
import Items from "../components/sections/items/default";
import Navbar from "../components/sections/navbar/default";
import Pricing from "../components/sections/pricing/default";
import Stats from "../components/sections/stats/default";
import Timeline from "../components/sections/timeline/default";
import Zhenhao from "../components/logos/zhenhao";
import CompanyNav from "../components/navigation/company-nav";
import { AmbientBackground } from "../components/ui/ambient-background";
import LocalSeoKeywords from "../components/seo/local-keywords";
import { Badge } from "../components/ui/badge";
import { siteConfig } from "../config/site";

export default function Home() {
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
          { text: "解决方案", href: "#services" },
          { text: "品牌与案例", href: "#brand" },
          { text: "服务价格", href: "/pricing" },
          { text: "釉下五彩瓷", href: "https://youxiawucaici.com" },
          { text: "成功案例", href: "#cases" },
          { text: "关于我们", href: "#about" },
          { text: "联系我们", href: "#contact" },
        ]}
        actions={[
          {
            text: "微信咨询",
            href: "#contact",
            isButton: false,
          },
          {
            text: "获取咨询",
            href: "#contact",
            isButton: true,
            variant: "default",
          },
        ]}
      />
      <Hero
        badge={
          <Badge variant="outline" className="animate-appear">
            <span className="text-muted-foreground">
              {siteConfig.stats.years}年经验 × AI 创新
            </span>
          </Badge>
        }
        title="经验驱动创新，构筑智能未来"
        description={`${siteConfig.stats.years}年行业深耕，为企业打造可信赖的 AI 解决方案。涵盖企业 API 中转、AI 教学培训、本地 Agent 搭建、FDE 驻场交付与私有化部署，支持全国远程交付与上门实施。`}
        mockup={false}
        buttons={[
          {
            href: "#services",
            text: "探索 AI 解决方案",
            variant: "default",
          },
          {
            href: "#about",
            text: "了解我们的故事",
            variant: "glow",
          },
        ]}
      />
      <div id="services">
        <CoreServices
          title="四大核心 AI 服务"
          description="从模型接入、团队培训、私有化落地到 FDE 驻场交付，覆盖企业智能化全流程，支持远程与上门实施。"
          services={[
            {
              title: "企业 API 中转",
              titleHref: siteConfig.links.byteData,
              description:
                "统一接入 GPT、Claude、国产大模型等多家 API，提供网关、密钥管理、用量监控与故障切换。",
              icon: <NetworkIcon className="size-6" />,
              highlights: [
                "多模型统一接入",
                "按量计费，成本可控",
                "1-2 周快速部署",
              ],
            },
            {
              title: "AI 讲课教学",
              description:
                "面向企业与个人的实战培训，覆盖大模型应用、Prompt 工程、Agent 开发与 AI 产品设计。",
              icon: <GraduationCapIcon className="size-6" />,
              highlights: [
                "¥8,000/天，支持开票",
                "企业内训与公开课",
                "培训后持续答疑",
              ],
            },
            {
              title: "本地 Agent 部署",
              description:
                "私有化部署 AI Agent，支持知识库 RAG、工具调用与工作流编排，数据完全自主可控。",
              icon: <BotIcon className="size-6" />,
              highlights: [
                "数据不出企业内网",
                "开源可审计框架",
                "全流程交付运维",
              ],
            },
            {
              title: "FDE 驻场交付",
              description:
                "Forward Deployed Engineer 前线工程师常驻客户现场，深度对接业务，端到端推进 AI 产品落地与持续迭代。",
              icon: <UserCogIcon className="size-6" />,
              highlights: [
                "入场常驻 ¥200,000/月起",
                "驻场全职，贴合业务现场",
                "交付可用系统并赋能团队",
              ],
            },
          ]}
        />
        <Items
          title="全栈能力，覆盖 AI 与传统数字化"
          items={[
            {
              title: "RAG 知识库建设",
              description:
                "企业文档智能问答与内部 Copilot，让知识资产真正可用。",
              icon: <BrainCircuitIcon className="size-5 stroke-1" />,
            },
            {
              title: "AI 工作流自动化",
              description:
                "基于 n8n、Dify、Coze 等平台的业务流程智能化编排与落地。",
              icon: <WorkflowIcon className="size-5 stroke-1" />,
            },
            {
              title: "AI 应用开发",
              description:
                "智能客服、文档分析、图像识别等多场景 AI 应用定制开发。",
              icon: <SparklesIcon className="size-5 stroke-1" />,
            },
            {
              title: "定制 AI 模型",
              description:
                "基于行业数据训练专属模型，提供精准预测与智能决策支持。",
              icon: <BrainCircuitIcon className="size-5 stroke-1" />,
            },
            {
              title: "互联网产品开发",
              description:
                "网站、App、小程序定制开发，从需求到上线全流程交付。",
              icon: <ServerIcon className="size-5 stroke-1" />,
            },
            {
              title: "产业深度调研",
              description:
                "行业分析、竞品研究、可行性评估，为决策提供数据支撑。",
              icon: <SearchIcon className="size-5 stroke-1" />,
            },
            {
              title: "品牌打造和运营",
              description:
                "品牌策略、视觉设计、新媒体运营，助力企业建立市场影响力。",
              icon: <Building2Icon className="size-5 stroke-1" />,
            },
            {
              title: "新媒体营销",
              description:
                "视频号选题、文案、配图、配音一站式交付，快速打造内容影响力。",
              icon: <SparklesIcon className="size-5 stroke-1" />,
            },
            {
              title: "跨境电商与独立站",
              description:
                "独立站搭建、多币种结账、跨境物流与日常运营，助力品牌出海增长。",
              icon: <ShoppingCartIcon className="size-5 stroke-1" />,
            },
            {
              title: "数据安全与治理",
              description:
                "数据治理体系搭建，确保资产安全可控、合规运营。",
              icon: <ShieldCheckIcon className="size-5 stroke-1" />,
            },
            {
              title: "智能运维平台",
              description:
                "AI 驱动自动化运维，故障预测、快速响应、降本增效。",
              icon: <CloudCogIcon className="size-5 stroke-1" />,
            },
          ]}
        />
      </div>
      <Industries
        title="行业 AI 解决方案"
        description="覆盖金融、医疗、制造、电商等行业，提供可落地的 AI 部署与培训服务。"
        industries={[
          {
            name: "金融服务",
            description:
              "智能风控、反欺诈、客户画像，助力金融机构降本增效。",
            icon: <Building2Icon className="size-6" />,
          },
          {
            name: "医疗健康",
            description:
              "辅助诊断、病历分析、智能问诊，提升医疗服务效率。",
            icon: <HeartPulseIcon className="size-6" />,
          },
          {
            name: "智能制造",
            description:
              "质量检测、预测性维护、生产优化，推动工业智能化升级。",
            icon: <FactoryIcon className="size-6" />,
          },
          {
            name: "跨境电商",
            description:
              "独立站搭建与运营、智能客服与转化分析，助力品牌出海增长。",
            icon: <ShoppingCartIcon className="size-6" />,
          },
        ]}
      />
      <div id="brand">
        <BrandShowcase />
      </div>
      <div id="cases">
        <CaseStudy
          industry="金融"
          client="某大型金融机构"
          challenge="传统风控系统无法及时识别新型欺诈模式，人工审核效率低下，误报率高达 30%，严重影响业务流程和客户体验。"
          solution="基于多年金融行业经验，训练定制化 AI 风控模型，结合实时数据流处理和智能决策引擎，实现秒级风险评估与自动化审核。"
          quote="我们的 AI 风控系统不仅提升了风险识别能力，更重要的是节省了大量人力成本，真正实现了智能化运营。"
          metrics={[
            { label: "处理效率提升", value: "300%" },
            { label: "识别准确率", value: "92%" },
            { label: "成本降低", value: "40%" },
            { label: "部署周期", value: "8周" },
          ]}
        />
      </div>
      <div id="about">
        <Timeline
          items={[
            {
              year: "2011",
              title: "公司成立",
              description: "立足本地，专注软件开发",
            },
            {
              year: "2015",
              title: "技术突破",
              description: "首个大型企业系统交付",
            },
            {
              year: "2018",
              title: "数据驱动",
              description: "大数据分析平台上线",
            },
            {
              year: "2020",
              title: "AI 实验室",
              description: "人工智能研发中心成立",
            },
            {
              year: "2024",
              title: "智能未来",
              description: "全栈 AI 解决方案正式上线",
            },
          ]}
        />
      </div>
      <div id="plans">
        <Pricing
          title="服务价格一览"
          description="透明定价，培训及企业服务支持开具正规发票。查看完整价格表获取详细报价。"
          plans={[
            {
              name: "AI 讲课培训",
              description: "企业内训 / 公开课，全天实战授课",
              price: 8000,
              priceText: "¥8,000",
              priceNote: "每天，含课程定制与实操。支持开发票。",
              cta: {
                variant: "glow",
                label: "查看培训价格",
                href: "/pricing",
              },
              features: [
                "大模型应用实战",
                "Prompt 与 Agent 开发",
                "半天课 ¥5,000 起",
                "培训后答疑支持",
              ],
              variant: "glow-brand",
            },
            {
              name: "API 中转服务",
              description: "多模型统一接入网关",
              price: 0,
              priceText: "按量计费",
              priceNote: "API 调用按实际用量结算，部署与运维按需计费。",
              cta: {
                variant: "default",
                label: "查看 API 价格",
                href: "/pricing",
              },
              features: [
                "按量透明计费",
                "密钥与权限管理",
                "实时用量监控",
              ],
              variant: "default",
            },
            {
              name: "Agent 定制开发",
              description: "私有化智能体部署",
              price: 0,
              priceText: "按需计费",
              priceNote: "项目制交付，含 RAG 知识库接入与技术支持。",
              cta: {
                variant: "default",
                label: "查看部署价格",
                href: "/pricing",
              },
              features: [
                "私有化本地部署",
                "工作流编排",
                "持续迭代支持",
              ],
              variant: "glow",
            },
            {
              name: "FDE 驻场交付",
              description: "前线工程师入场常驻",
              price: 200000,
              priceText: "¥200,000",
              priceNote: "每月起，资深工程师驻场全职投入，端到端推进 AI 落地。",
              cta: {
                variant: "default",
                label: "查看 FDE 价格",
                href: "/pricing",
              },
              features: [
                "驻场全职投入",
                "方案设计与快速验证",
                "交付上线与团队赋能",
              ],
              variant: "default",
            },
          ]}
        />
      </div>
      <FAQ
        title="常见问题"
        items={[
          {
            question: "企业 API 中转服务支持哪些大模型？",
            answer: (
              <p className="text-muted-foreground mb-4 max-w-[640px] text-balance">
                我们支持 OpenAI GPT 系列、Anthropic Claude、Google Gemini
                以及主流国产大模型（通义千问、文心一言、DeepSeek
                等）的统一接入。通过 API
                网关，您可以用一套接口调用多家模型，并享受负载均衡、故障切换和用量统计等企业级能力。
              </p>
            ),
          },
          {
            question: "AI 培训课程适合什么水平的学员？",
            answer: (
              <p className="text-muted-foreground mb-4 max-w-[640px] text-balance">
                我们提供从入门到高级的分层课程体系。零基础学员可从 AI
                基础概念和工具使用学起；有技术背景的学员可深入学习 Prompt
                工程、RAG 架构和 Agent
                开发。所有课程均支持根据企业实际业务场景定制案例和练习。
              </p>
            ),
          },
          {
            question: "本地 Agent 部署如何保障数据安全？",
            answer: (
              <p className="text-muted-foreground mb-4 max-w-[640px] text-balance">
                本地 Agent
                方案支持完全私有化部署，数据不出企业内网。我们采用开源可审计的框架，支持本地大模型推理，企业知识库加密存储，并提供完善的访问权限管理和操作审计日志。
              </p>
            ),
          },
          {
            question: "FDE 驻场交付适合什么场景？",
            answer: (
              <p className="text-muted-foreground mb-4 max-w-[640px] text-balance">
                适合需要资深工程师常驻现场、快速推进 AI
                落地的企业：业务场景复杂、内部研发带宽不足，或希望一边交付可用系统、一边完成知识转移与团队赋能。入场常驻费用从
                ¥200,000/月起，支持开票与签约合同。
              </p>
            ),
          },
          {
            question: "如何联系你们？",
            answer: (
              <p className="text-muted-foreground mb-4 max-w-[640px] text-balance">
                您可以扫描页面底部微信二维码，或在微信搜一搜搜索「
                <strong className="text-foreground">
                  {siteConfig.contact.wechatSearch}
                </strong>
                」联系我们（添加时备注「AI咨询」），也可发送邮件至{" "}
                {siteConfig.contact.email}。我们的技术专家将在 24
                小时内回复，并为您安排免费的需求沟通会议。
              </p>
            ),
          },
          {
            question: "项目交付周期一般多长？",
            answer: (
              <p className="text-muted-foreground mb-4 max-w-[640px] text-balance">
                API 中转服务通常 1-2 周可完成部署；AI 培训课程可按 1-5
                天集中授课安排；Agent 定制开发项目根据复杂度，一般 4-12
                周完成从需求调研到上线交付。我们提供 10
                分钟免费咨询，帮您评估项目周期和预算。
              </p>
            ),
          },
        ]}
      />
      <div id="contact">
        <Contact
          title="联系我们"
          description="专业 AI 服务团队，随时为您提供技术咨询与方案设计。欢迎扫码微信或发送邮件。"
        />
        <CTA
          title="准备好开启您的智能转型之旅了吗？"
          buttons={[
            {
              href: "#contact",
              text: "扫码微信咨询",
              variant: "default",
            },
            {
              href: siteConfig.links.email,
              text: "发送邮件",
              variant: "glow",
            },
          ]}
        />
      </div>
      <Footer
        logo={<Zhenhao />}
        name={siteConfig.fullName}
        columns={[
          {
            title: "核心服务",
            links: [
              { text: "企业 API 中转", href: siteConfig.links.byteData },
              { text: "AI 讲课教学", href: "#services" },
              { text: "本地 Agent 搭建", href: "#services" },
              { text: "FDE 驻场交付", href: "#services" },
            ],
          },
          {
            title: "服务价格",
            links: [
              { text: "AI 培训 ¥8,000/天", href: "/pricing" },
              { text: "API 中转部署", href: "/pricing" },
              { text: "FDE ¥200,000/月起", href: "/pricing" },
              { text: "完整价格表", href: "/pricing" },
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
              { text: "视频号新媒体营销", href: "#brand" },
              { text: "品牌与电商案例", href: "#brand" },
            ],
          },
          {
            title: "解决方案",
            links: [
              { text: "金融服务", href: "#services" },
              { text: "医疗健康", href: "#services" },
              { text: "智能制造", href: "#services" },
              { text: "跨境电商", href: "#brand" },
            ],
          },
          {
            title: "联系我们",
            links: [
              { text: `微信搜：${siteConfig.contact.wechatSearch}`, href: "#contact" },
              { text: siteConfig.contact.email, href: siteConfig.links.email },
              { text: siteConfig.location, href: "#contact" },
              { text: "关于我们", href: "#about" },
            ],
          },
        ]}
        copyright={`© 2026 ${siteConfig.fullName}. 保留所有权利.`}
        policies={[
          { text: "隐私政策", href: "#contact" },
          { text: "服务条款", href: "#contact" },
        ]}
      />
    </main>
  );
}
