export const auraConfig = {
  name: "AURA",
  logo: "AURA PLAN",
  shortName: "AURA 计划",
  byline: "驻留一周",
  organizer: "大胡子出海搞钱",
  path: "/aura",
  url: "https://412200.net/aura",
  ogImage: "/aura/og.png",
  cohort: {
    label: "第一期 · 6 个位子",
    seats: "每期 5 到 7 个人",
    earlyBirdSeats: 3,
  },
  seo: {
    title: "AURA 计划｜住一周，把产品做上线",
    description:
      "第一期只收六个人。住在落地窗对着草地的房子里，七天做成一个别人点得开的产品，并带走照片和短片。",
  },
  navCta: "申请第一期",
  hero: {
    tagline: "AURA RESIDENCY · 第一期 · 七天六晚",
    title: "离开你平时的桌子一周。",
    titles: [
      "离开你平时的桌子一周。",
      "做成别人点得开的产品。",
      "带走照片和一支短片。",
    ],
    subtitle:
      "你会做成一个别人点得开的产品，再带走一套照片和一支短片。住的地方对着草地，吃住都包，人不多。",
    cta: "申请第一期",
    note: "早鸟价 ¥9,800，学员价 ¥16,800。早鸟只有前 3 个位子。",
  },
  photos: [
    {
      src: "/aura/window-lawn.png",
      alt: "客厅落地窗对着草地，桌上有咖啡",
      label: "落地窗",
      tag: "space",
    },
    {
      src: "/aura/interior-soft.jpg",
      alt: "大平层客厅，玻璃门开向室外",
      label: "客厅",
      tag: "space",
    },
    {
      src: "/aura/villa-glass.jpg",
      alt: "白色房子，一层几乎全是玻璃",
      label: "独栋",
      tag: "space",
    },
    {
      src: "/aura/desk-window.png",
      alt: "窗边工作位，外面是草地",
      label: "工作位",
      tag: "work",
    },
    {
      src: "/aura/coffee.jpg",
      alt: "桌上的咖啡",
      label: "咖啡",
      tag: "daily",
    },
    {
      src: "/aura/house-lawn.jpg",
      alt: "房子外的空地和光线",
      label: "草地",
      tag: "space",
    },
  ],
  deliverables: [
    {
      title: "一个别人点得开的产品",
      body: "七天结束，你有一个网上能打开、带你名字的东西。",
    },
    {
      title: "一套你自己能接着用的做法",
      body: "哪些事交给模型，哪些自己拍板，你当场做完一遍。回去还能自己做。",
    },
    {
      title: "照片和一支短片",
      body: "这周会拍、会剪。走的时候带着能发的照片，和一支产品或人物短片。",
    },
    {
      title: "一起做完的几个人",
      body: "每期五到七个人。做完还在一个小群里。",
    },
  ],
  days: [
    {
      day: "第一天",
      title: "摊开你正在做的事",
      body: "先看你每天在重复什么。当天下午交一批能用的东西。",
    },
    {
      day: "第二天",
      title: "留下你的口味和规矩",
      body: "同一件事，做出来要像你。这些规矩以后不用从头说。",
    },
    {
      day: "第三天",
      title: "把一件完整的任务做完",
      body: "你交代任务，按你的规矩做完。带走一条能反复用的做法。",
    },
    {
      day: "第四天",
      title: "做成能转发的链接",
      body: "到这一天结束，别人点开就能用。",
    },
    {
      day: "第五天",
      title: "接上收款，让人看见",
      body: "先跑通一条：有人能找到它，也能付钱。",
    },
    {
      day: "第六天",
      title: "上线，拍照，出片",
      body: "产品发布。我们拍人和空间，剪一支短片，照片一并给你。",
    },
    {
      day: "第七天",
      title: "想清楚回去之后一个月",
      body: "回去之后一个月做什么，当天说完。",
    },
  ],
  experience: [
    {
      title: "大平层，窗子很大",
      body: "白天不用开灯也能做事。窗子对着草地。",
    },
    {
      title: "有咖啡，有饭",
      body: "吃住都包。想坐一会儿，桌上会有咖啡。",
    },
    {
      title: "账号和额度都备好",
      body: "你不用先买会员。来了就能开始做。",
    },
  ],
  pricing: {
    seats: "每期 5 到 7 个人",
    earlyBird: {
      label: "早鸟价",
      price: "¥9,800",
      note: "前 3 个通过面试的位子",
    },
    standard: {
      label: "学员价",
      price: "¥16,800",
      note: "早鸟满了之后",
    },
    includes: [
      "7 天 6 晚单人住宿",
      "餐饮和咖啡",
      "账号与额度",
      "窗边工作位",
      "有人盯着你做完",
      "照片和视频出片",
    ],
    process: ["提交申请", "一天内看材料", "聊十五分钟", "发确认，定位子"],
  },
  form: {
    submit: "提交申请",
    success: "收到了。确认信已发到邮箱。我们会在一天内看材料，再微信约十五分钟。",
  },
} as const;
