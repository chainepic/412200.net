export interface PricingItem {
  name: string;
  price: string;
  unit?: string;
  description: string;
  features?: string[];
  highlight?: boolean;
  invoice?: boolean;
}

export interface PricingCategory {
  title: string;
  description: string;
  titleHref?: string;
  items: PricingItem[];
}

export const pricingCategories: PricingCategory[] = [
  {
    title: "AI 讲课培训",
    description: "面向企业与个人的实战培训，支持线上、线下及上门授课。",
    items: [
      {
        name: "企业 AI 内训",
        price: "¥8,000",
        unit: "/天",
        description: "全天授课，含课程定制与实操演练",
        features: [
          "大模型应用与 Prompt 工程",
          "Agent 开发与工作流实战",
          "支持开发票",
          "培训后 7 天答疑",
        ],
        highlight: true,
        invoice: true,
      },
      {
        name: "半天精品课",
        price: "¥5,000",
        unit: "/半天",
        description: "适合部门级快速入门与专题分享",
        features: ["3 小时集中授课", "支持开发票", "可按主题定制"],
        invoice: true,
      },
      {
        name: "公开课席位",
        price: "¥500",
        unit: "/人",
        description: "定期举办的 AI 实战公开课",
        features: ["小班教学"],
      },
    ],
  },
  {
    title: "企业 API 中转",
    titleHref: "https://bytedata.ai",
    description: "多模型统一接入，稳定高可用，API 调用按量计费，部署与运维按需计费。",
    items: [
      {
        name: "API 调用",
        price: "按量计费",
        description: "按实际调用量结算，透明账单",
        features: ["GPT / Claude / 国产大模型", "统一接入网关", "用量优化建议"],
        highlight: true,
      },
      {
        name: "基础部署",
        price: "按需计费",
        description: "网关部署与多模型接入配置",
        features: ["多模型接入", "密钥管理", "基础监控"],
      },
      {
        name: "运维服务",
        price: "按需计费",
        description: "运维响应、故障处理与版本升级",
        features: ["用量报表", "告警通知", "技术支持"],
      },
    ],
  },
  {
    title: "本地 Agent 与 AI 部署",
    description: "私有化部署，数据自主可控，项目制交付。",
    items: [
      {
        name: "Agent 标准版",
        price: "¥50,000",
        unit: "起",
        description: "单场景智能体，含知识库接入",
        features: ["私有化部署", "RAG 知识库", "1 个月技术支持"],
        highlight: true,
      },
      {
        name: "Agent 企业版",
        price: "¥120,000",
        unit: "起",
        description: "多 Agent 协作与工作流编排",
        features: ["多工具链集成", "权限管理", "3 个月技术支持"],
      },
      {
        name: "RAG 知识库建设",
        price: "¥20,000",
        unit: "起",
        description: "企业文档智能问答系统",
        features: ["数据清洗入库", "检索优化", "管理后台"],
      },
    ],
  },
  {
    title: "定制开发与咨询",
    description: "软件开发、AI 应用定制及技术顾问服务。",
    items: [
      {
        name: "AI 应用定制",
        price: "¥30,000",
        unit: "起",
        description: "智能客服、文档分析等场景开发",
        features: ["需求分析", "原型设计", "上线部署"],
      },
      {
        name: "网站 / 小程序开发",
        price: "¥2,000",
        unit: "起",
        description: "企业官网、管理系统、小程序",
        features: ["响应式设计", "后台管理", "SEO 优化"],
      },
      {
        name: "技术咨询",
        price: "免费",
        unit: "10 分钟",
        description: "初步需求沟通与方案建议",
        features: ["线上/线下均可", "深度咨询 ¥500/小时"],
      },
    ],
  },
];
