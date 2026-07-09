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
  WorkflowIcon,
} from "lucide-react";

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
import { Badge } from "../components/ui/badge";
import { LayoutLines } from "../components/ui/layout-lines";
import { siteConfig } from "../config/site";

export default function Home() {
  return (
    <main className="bg-background text-foreground min-h-screen w-full">
      <LayoutLines />
      <Navbar
        logo={<Zhenhao />}
        name={siteConfig.name}
        homeUrl="/"
        showNavigation
        customNavigation={<CompanyNav />}
        mobileLinks={[
          { text: "解决方案", href: "#services" },
          { text: "成功案例", href: "#cases" },
          { text: "关于我们", href: "#about" },
          { text: "联系我们", href: "#contact" },
        ]}
        actions={[
          {
            text: `微信：${siteConfig.contact.wechat}`,
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
        title="湖南醴陵 AI 培训与本地化部署专家"
        description={`${siteConfig.fullName}，立足湖南醴陵，13年专注醴陵AI培训、湖南AI部署与企业智能化。提供企业 API 中转、醴陵AI培训、本地 Agent 搭建、私有化大模型部署，服务醴陵、株洲、长沙及湖南全省。`}
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
      <Stats
        items={[
          {
            value: siteConfig.stats.clients,
            description: "企业客户",
          },
          {
            value: siteConfig.stats.years,
            suffix: "年",
            description: "行业深耕经验",
          },
          {
            value: siteConfig.stats.projects,
            description: "成功交付项目",
          },
          {
            value: siteConfig.stats.satisfaction,
            description: "客户满意度",
          },
        ]}
      />
      <div id="services">
        <CoreServices
          title="醴陵 AI 三大核心服务"
          description="湖南醴陵本地团队交付，覆盖 AI 培训、本地化部署与 Agent 搭建，支持醴陵、株洲、长沙企业上门与远程服务。"
          services={[
            {
              title: "企业 API 中转",
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
              title: "醴陵 AI 讲课教学",
              description:
                "湖南醴陵本地 AI 实战培训，面向企业与个人，覆盖大模型应用、Prompt 工程、Agent 开发与 AI 产品设计。",
              icon: <GraduationCapIcon className="size-6" />,
              highlights: [
                "企业内训与公开课",
                "分层课程体系",
                "培训后持续答疑",
              ],
            },
            {
              title: "醴陵 AI 本地部署",
              description:
                "湖南企业私有化 Agent 部署，支持知识库 RAG、工具调用与工作流编排，数据完全自主可控。",
              icon: <BotIcon className="size-6" />,
              highlights: [
                "数据不出企业内网",
                "开源可审计框架",
                "全流程交付运维",
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
              title: "电商代运营",
              description:
                "店铺运营、数据分析、营销优化，提升电商业务转化与复购。",
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
        title="湖南本地行业 AI 解决方案"
        description="深耕醴陵、株洲、长沙及湖南全省，为金融、医疗、制造、电商等行业提供可落地的 AI 部署与培训服务。"
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
            name: "电商零售",
            description:
              "智能客服、推荐系统、运营分析，全面提升电商转化效率。",
            icon: <ShoppingCartIcon className="size-6" />,
          },
        ]}
      />
      <div id="cases">
        <CaseStudy
          industry="金融"
          client="某大型金融机构"
          challenge="传统风控系统无法及时识别新型欺诈模式，人工审核效率低下，误报率高达 30%，严重影响业务流程和客户体验。"
          solution="基于多年金融行业经验，训练定制化 AI 风控模型，结合实时数据流处理和智能决策引擎，实现秒级风险评估与自动化审核。"
          quote="真好网络的 AI 风控系统不仅提升了我们的风险识别能力，更重要的是节省了大量人力成本，真正实现了智能化运营。"
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
              description: "立足醴陵，专注软件开发",
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
          title="灵活的 AI 服务方案"
          description="根据企业规模和需求，提供从入门到企业级的 AI 解决方案，均支持定制开发与长期技术支持。"
          plans={[
            {
              name: "API 中转服务",
              description: "适合需要稳定接入多家大模型的中小企业",
              price: 0,
              priceText: "按需报价",
              priceNote:
                "按调用量计费，支持 GPT、Claude、国产大模型等多渠道接入。",
              cta: {
                variant: "glow",
                label: "咨询 API 方案",
                href: "#contact",
              },
              features: [
                "多模型统一接入网关",
                "密钥管理与权限控制",
                "实时用量监控与告警",
                "高可用负载均衡",
              ],
              variant: "default",
            },
            {
              name: "AI 培训服务",
              description: "适合希望快速提升团队 AI 能力的企业",
              price: 0,
              priceText: "课程定制",
              priceNote: "线上/线下授课，支持企业内训与公开课多种形式。",
              cta: {
                variant: "default",
                label: "预约 AI 课程",
                href: "#contact",
              },
              features: [
                "大模型应用实战培训",
                "Prompt 工程与 Agent 开发",
                "AI 产品设计工作坊",
                "培训后持续答疑支持",
              ],
              variant: "glow-brand",
            },
            {
              name: "Agent 定制开发",
              description: "适合需要私有化部署智能体的中大型企业",
              price: 0,
              priceText: "项目制",
              priceNote: "从需求调研到部署上线，提供全流程交付与运维保障。",
              cta: {
                variant: "default",
                label: "获取定制方案",
                href: "#contact",
              },
              features: [
                "私有化本地 Agent 部署",
                "企业知识库 RAG 接入",
                "多工具链与工作流编排",
                "持续迭代与技术支持",
              ],
              variant: "glow",
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
            question: "如何联系你们？",
            answer: (
              <p className="text-muted-foreground mb-4 max-w-[640px] text-balance">
                您可以通过微信{" "}
                <strong className="text-foreground">
                  {siteConfig.contact.wechat}
                </strong>{" "}
                联系我们（添加时备注「AI咨询」），或发送邮件至{" "}
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
                周完成从需求调研到上线交付。我们提供 30
                分钟免费咨询，帮您评估项目周期和预算。
              </p>
            ),
          },
        ]}
      />
      <div id="contact">
        <Contact
          title="联系醴陵真好网络"
          description={`${siteConfig.fullName}，湖南醴陵本地 AI 服务商。醴陵AI培训、湖南AI部署咨询，欢迎添加微信或发送邮件。`}
        />
        <CTA
          title="准备好开启您的智能转型之旅了吗？"
          buttons={[
            {
              href: "#contact",
              text: "添加微信咨询",
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
              { text: "企业 API 中转", href: "#services" },
              { text: "AI 讲课教学", href: "#services" },
              { text: "本地 Agent 搭建", href: "#services" },
              { text: "RAG 知识库建设", href: "#services" },
            ],
          },
          {
            title: "解决方案",
            links: [
              { text: "金融服务", href: "#services" },
              { text: "医疗健康", href: "#services" },
              { text: "智能制造", href: "#services" },
              { text: "电商零售", href: "#services" },
            ],
          },
          {
            title: "联系我们",
            links: [
              { text: `微信：${siteConfig.contact.wechat}`, href: "#contact" },
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
