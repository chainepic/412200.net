/** 醴陵打字列车词条 */
export type TrainWord = {
  text: string;
  /** 带调拼音，按字用空格分隔，与 text 一一对应 */
  pinyin: string;
  /** 无调拼音（小写连写），可用于输入匹配 */
  pinyinPlain: string;
  full: string;
  kind: "街道" | "镇" | "名人" | "村";
};

export type LevelId = 1 | 2 | 3;

export type LevelConfig = {
  id: LevelId;
  title: string;
  shortTitle: string;
  blurb: string;
  seconds: number;
  /** 达到站数即通关，解锁下一关 */
  passStations: number;
  showPinyin: boolean;
  scoreMultiplier: number;
  words: TrainWord[];
};

/** 第一关：现行街道 + 乡镇（去掉后缀） */
export const LILING_TOWNS: TrainWord[] = [
  {
    text: "阳三石",
    pinyin: "yáng sān shí",
    pinyinPlain: "yangsanshi",
    full: "阳三石街道",
    kind: "街道",
  },
  {
    text: "来龙门",
    pinyin: "lái lóng mén",
    pinyinPlain: "lailongmen",
    full: "来龙门街道",
    kind: "街道",
  },
  {
    text: "仙岳山",
    pinyin: "xiān yuè shān",
    pinyinPlain: "xianyueshan",
    full: "仙岳山街道",
    kind: "街道",
  },
  {
    text: "国瓷",
    pinyin: "guó cí",
    pinyinPlain: "guoci",
    full: "国瓷街道",
    kind: "街道",
  },
  {
    text: "长庆",
    pinyin: "cháng qìng",
    pinyinPlain: "changqing",
    full: "长庆街道",
    kind: "街道",
  },
  {
    text: "白兔潭",
    pinyin: "bái tù tán",
    pinyinPlain: "baitutan",
    full: "白兔潭镇",
    kind: "镇",
  },
  {
    text: "浦口",
    pinyin: "pǔ kǒu",
    pinyinPlain: "pukou",
    full: "浦口镇",
    kind: "镇",
  },
  {
    text: "王仙",
    pinyin: "wáng xiān",
    pinyinPlain: "wangxian",
    full: "王仙镇",
    kind: "镇",
  },
  {
    text: "东富",
    pinyin: "dōng fù",
    pinyinPlain: "dongfu",
    full: "东富镇",
    kind: "镇",
  },
  {
    text: "泗汾",
    pinyin: "sì fén",
    pinyinPlain: "sifen",
    full: "泗汾镇",
    kind: "镇",
  },
  {
    text: "沈潭",
    pinyin: "shěn tán",
    pinyinPlain: "shentan",
    full: "沈潭镇",
    kind: "镇",
  },
  {
    text: "船湾",
    pinyin: "chuán wān",
    pinyinPlain: "chuanwan",
    full: "船湾镇",
    kind: "镇",
  },
  {
    text: "均楚",
    pinyin: "jūn chǔ",
    pinyinPlain: "junchu",
    full: "均楚镇",
    kind: "镇",
  },
  {
    text: "石亭",
    pinyin: "shí tíng",
    pinyinPlain: "shiting",
    full: "石亭镇",
    kind: "镇",
  },
  {
    text: "李畋",
    pinyin: "lǐ tián",
    pinyinPlain: "litian",
    full: "李畋镇",
    kind: "镇",
  },
  {
    text: "明月",
    pinyin: "míng yuè",
    pinyinPlain: "mingyue",
    full: "明月镇",
    kind: "镇",
  },
  {
    text: "茶山",
    pinyin: "chá shān",
    pinyinPlain: "chashan",
    full: "茶山镇",
    kind: "镇",
  },
  {
    text: "左权",
    pinyin: "zuǒ quán",
    pinyinPlain: "zuoquan",
    full: "左权镇",
    kind: "镇",
  },
  {
    text: "枫林",
    pinyin: "fēng lín",
    pinyinPlain: "fenglin",
    full: "枫林镇",
    kind: "镇",
  },
  {
    text: "沩山",
    pinyin: "wéi shān",
    pinyinPlain: "weishan",
    full: "沩山镇",
    kind: "镇",
  },
  {
    text: "孙家湾",
    pinyin: "sūn jiā wān",
    pinyinPlain: "sunjiawan",
    full: "孙家湾镇",
    kind: "镇",
  },
  {
    text: "嘉树",
    pinyin: "jiā shù",
    pinyinPlain: "jiashu",
    full: "嘉树镇",
    kind: "镇",
  },
  {
    text: "板杉",
    pinyin: "bǎn shān",
    pinyinPlain: "banshan",
    full: "板杉镇",
    kind: "镇",
  },
  {
    text: "官庄",
    pinyin: "guān zhuāng",
    pinyinPlain: "guanzhuang",
    full: "官庄镇",
    kind: "镇",
  },
];

/** 第二关：醴陵相关历史名人（姓名） */
export const LILING_PEOPLE: TrainWord[] = [
  {
    text: "李畋",
    pinyin: "lǐ tián",
    pinyinPlain: "litian",
    full: "花炮祖师 · 李畋",
    kind: "名人",
  },
  {
    text: "左权",
    pinyin: "zuǒ quán",
    pinyinPlain: "zuoquan",
    full: "抗日将领 · 左权",
    kind: "名人",
  },
  {
    text: "程潜",
    pinyin: "chéng qián",
    pinyinPlain: "chengqian",
    full: "爱国将领 · 程潜",
    kind: "名人",
  },
  {
    text: "李立三",
    pinyin: "lǐ lì sān",
    pinyinPlain: "lilisan",
    full: "工运领袖 · 李立三",
    kind: "名人",
  },
  {
    text: "耿飚",
    pinyin: "gěng biāo",
    pinyinPlain: "gengbiao",
    full: "共和国将军 · 耿飚",
    kind: "名人",
  },
  {
    text: "宋时轮",
    pinyin: "sòng shí lún",
    pinyinPlain: "songshilun",
    full: "开国上将 · 宋时轮",
    kind: "名人",
  },
  {
    text: "蔡申熙",
    pinyin: "cài shēn xī",
    pinyinPlain: "caishenxi",
    full: "红军将领 · 蔡申熙",
    kind: "名人",
  },
  {
    text: "陈明仁",
    pinyin: "chén míng rén",
    pinyinPlain: "chenmingren",
    full: "开国上将 · 陈明仁",
    kind: "名人",
  },
  {
    text: "杨得志",
    pinyin: "yáng dé zhì",
    pinyinPlain: "yangdezhi",
    full: "开国上将 · 杨得志",
    kind: "名人",
  },
  {
    text: "李明灏",
    pinyin: "lǐ míng hào",
    pinyinPlain: "liminghao",
    full: "醴陵籍将领 · 李明灏",
    kind: "名人",
  },
  {
    text: "罗章龙",
    pinyin: "luó zhāng lóng",
    pinyinPlain: "luozhanglong",
    full: "早期革命者 · 罗章龙",
    kind: "名人",
  },
  {
    text: "邓文仪",
    pinyin: "dèng wén yí",
    pinyinPlain: "dengwenyi",
    full: "醴陵籍将领 · 邓文仪",
    kind: "名人",
  },
];

/**
 * 第三关：醴陵村名（纯村名，不含乡镇名后缀）
 */
export const LILING_VILLAGES: TrainWord[] = [
  { text: "三狮", pinyin: "sān shī", pinyinPlain: "sanshi", full: "醴陵村庄 · 三狮", kind: "村" },
  { text: "双江", pinyin: "shuāng jiāng", pinyinPlain: "shuangjiang", full: "醴陵村庄 · 双江", kind: "村" },
  { text: "双井", pinyin: "shuāng jǐng", pinyinPlain: "shuangjing", full: "醴陵村庄 · 双井", kind: "村" },
  { text: "双塘", pinyin: "shuāng táng", pinyinPlain: "shuangtang", full: "醴陵村庄 · 双塘", kind: "村" },
  { text: "三铺", pinyin: "sān pù", pinyinPlain: "sanpu", full: "醴陵村庄 · 三铺", kind: "村" },
  { text: "三星里", pinyin: "sān xīng lǐ", pinyinPlain: "sanxingli", full: "醴陵村庄 · 三星里", kind: "村" },
  { text: "四塘", pinyin: "sì táng", pinyinPlain: "sitang", full: "醴陵村庄 · 四塘", kind: "村" },
  { text: "四方", pinyin: "sì fāng", pinyinPlain: "sifang", full: "醴陵村庄 · 四方", kind: "村" },
  { text: "五里牌", pinyin: "wǔ lǐ pái", pinyinPlain: "wulipai", full: "醴陵村庄 · 五里牌", kind: "村" },
  { text: "五里墩", pinyin: "wǔ lǐ dūn", pinyinPlain: "wulidun", full: "醴陵村庄 · 五里墩", kind: "村" },
  { text: "五石", pinyin: "wǔ shí", pinyinPlain: "wushi", full: "醴陵村庄 · 五石", kind: "村" },
  { text: "七星", pinyin: "qī xīng", pinyinPlain: "qixing", full: "醴陵村庄 · 七星", kind: "村" },
  { text: "七里山", pinyin: "qī lǐ shān", pinyinPlain: "qilishan", full: "醴陵村庄 · 七里山", kind: "村" },
  { text: "八步桥", pinyin: "bā bù qiáo", pinyinPlain: "babuqiao", full: "醴陵村庄 · 八步桥", kind: "村" },
  { text: "八里庵", pinyin: "bā lǐ ān", pinyinPlain: "balian", full: "醴陵村庄 · 八里庵", kind: "村" },
  { text: "万宜", pinyin: "wàn yí", pinyinPlain: "wanyi", full: "醴陵村庄 · 万宜", kind: "村" },
  { text: "汪家桥", pinyin: "wāng jiā qiáo", pinyinPlain: "wangjiaqiao", full: "醴陵村庄 · 汪家桥", kind: "村" },
  { text: "蒋家桥", pinyin: "jiǎng jiā qiáo", pinyinPlain: "jiangjiaqiao", full: "醴陵村庄 · 蒋家桥", kind: "村" },
  { text: "金桥", pinyin: "jīn qiáo", pinyinPlain: "jinqiao", full: "醴陵村庄 · 金桥", kind: "村" },
  { text: "樟桥", pinyin: "zhāng qiáo", pinyinPlain: "zhangqiao", full: "醴陵村庄 · 樟桥", kind: "村" },
  { text: "龙虎湾", pinyin: "lóng hǔ wān", pinyinPlain: "longhuwan", full: "醴陵村庄 · 龙虎湾", kind: "村" },
  { text: "文家湾", pinyin: "wén jiā wān", pinyinPlain: "wenjiawan", full: "醴陵村庄 · 文家湾", kind: "村" },
  { text: "盐山", pinyin: "yán shān", pinyinPlain: "yanshan", full: "醴陵村庄 · 盐山", kind: "村" },
  { text: "水口山", pinyin: "shuǐ kǒu shān", pinyinPlain: "shuikoushan", full: "醴陵村庄 · 水口山", kind: "村" },
  { text: "档梓山", pinyin: "dàng zǐ shān", pinyinPlain: "dangzishan", full: "醴陵村庄 · 档梓山", kind: "村" },
  { text: "青山", pinyin: "qīng shān", pinyinPlain: "qingshan", full: "醴陵村庄 · 青山", kind: "村" },
  { text: "军山", pinyin: "jūn shān", pinyinPlain: "junshan", full: "醴陵村庄 · 军山", kind: "村" },
  { text: "金山", pinyin: "jīn shān", pinyinPlain: "jinshan", full: "醴陵村庄 · 金山", kind: "村" },
  { text: "老鸦山", pinyin: "lǎo yā shān", pinyinPlain: "laoyashan", full: "醴陵村庄 · 老鸦山", kind: "村" },
  { text: "李山", pinyin: "lǐ shān", pinyinPlain: "lishan", full: "醴陵村庄 · 李山", kind: "村" },
  { text: "大屏山", pinyin: "dà píng shān", pinyinPlain: "dapingshan", full: "醴陵村庄 · 大屏山", kind: "村" },
  { text: "竹花山", pinyin: "zhú huā shān", pinyinPlain: "zhuhuashan", full: "醴陵村庄 · 竹花山", kind: "村" },
  { text: "山水", pinyin: "shān shuǐ", pinyinPlain: "shanshui", full: "醴陵村庄 · 山水", kind: "村" },
  { text: "荷田", pinyin: "hé tián", pinyinPlain: "hetian", full: "醴陵村庄 · 荷田", kind: "村" },
  { text: "峤岭", pinyin: "qiáo lǐng", pinyinPlain: "qiaoling", full: "醴陵村庄 · 峤岭", kind: "村" },
  { text: "汆溪", pinyin: "cuān xī", pinyinPlain: "cuanxi", full: "醴陵村庄 · 汆溪", kind: "村" },
  { text: "洙塘", pinyin: "zhū táng", pinyinPlain: "zhutang", full: "醴陵村庄 · 洙塘", kind: "村" },
  { text: "金阳", pinyin: "jīn yáng", pinyinPlain: "jinyang", full: "醴陵村庄 · 金阳", kind: "村" },
  { text: "金狮", pinyin: "jīn shī", pinyinPlain: "jinshi", full: "醴陵村庄 · 金狮", kind: "村" },
  { text: "金石", pinyin: "jīn shí", pinyinPlain: "jinshicun", full: "醴陵村庄 · 金石", kind: "村" },
  { text: "金牛", pinyin: "jīn niú", pinyinPlain: "jinniu", full: "醴陵村庄 · 金牛", kind: "村" },
  { text: "玉瓷", pinyin: "yù cí", pinyinPlain: "yuci", full: "醴陵村庄 · 玉瓷", kind: "村" },
  { text: "玉屏", pinyin: "yù píng", pinyinPlain: "yuping", full: "醴陵村庄 · 玉屏", kind: "村" },
  { text: "玉堂", pinyin: "yù táng", pinyinPlain: "yutang", full: "醴陵村庄 · 玉堂", kind: "村" },
  { text: "玉茶", pinyin: "yù chá", pinyinPlain: "yucha", full: "醴陵村庄 · 玉茶", kind: "村" },
  { text: "玉皇阁", pinyin: "yù huáng gé", pinyinPlain: "yuhuangge", full: "醴陵村庄 · 玉皇阁", kind: "村" },
  { text: "彰仙", pinyin: "zhāng xiān", pinyinPlain: "zhangxian", full: "醴陵村庄 · 彰仙", kind: "村" },
  { text: "姞仙", pinyin: "jí xiān", pinyinPlain: "jixian", full: "醴陵村庄 · 姞仙", kind: "村" },
  { text: "杉仙", pinyin: "shān xiān", pinyinPlain: "shanxian", full: "醴陵村庄 · 杉仙", kind: "村" },
  { text: "鳌仙", pinyin: "áo xiān", pinyinPlain: "aoxian", full: "醴陵村庄 · 鳌仙", kind: "村" },
  { text: "裕民", pinyin: "yù mín", pinyinPlain: "yumin", full: "醴陵村庄 · 裕民", kind: "村" },
  { text: "车上", pinyin: "chē shàng", pinyinPlain: "cheshang", full: "醴陵村庄 · 车上", kind: "村" },
  { text: "渔潭洲", pinyin: "yú tán zhōu", pinyinPlain: "yutanzhou", full: "醴陵村庄 · 渔潭洲", kind: "村" },
  { text: "下三洲", pinyin: "xià sān zhōu", pinyinPlain: "xiasanzhou", full: "醴陵村庄 · 下三洲", kind: "村" },
  { text: "花桥", pinyin: "huā qiáo", pinyinPlain: "huaqiao", full: "醴陵村庄 · 花桥", kind: "村" },
  { text: "东岗", pinyin: "dōng gǎng", pinyinPlain: "donggang", full: "醴陵村庄 · 东岗", kind: "村" },
  { text: "梅霞", pinyin: "méi xiá", pinyinPlain: "meixia", full: "醴陵村庄 · 梅霞", kind: "村" },
];

export const LEVELS: Record<LevelId, LevelConfig> = {
  1: {
    id: 1,
    title: "第一关 · 乡镇",
    shortTitle: "乡镇",
    blurb: "醴陵街道与乡镇地名",
    seconds: 60,
    passStations: 10,
    showPinyin: true,
    scoreMultiplier: 1,
    words: LILING_TOWNS,
  },
  2: {
    id: 2,
    title: "第二关 · 名人",
    shortTitle: "名人",
    blurb: "醴陵历史名人（限时更紧）",
    seconds: 50,
    passStations: 10,
    showPinyin: true,
    scoreMultiplier: 1.5,
    words: LILING_PEOPLE,
  },
  3: {
    id: 3,
    title: "第三关 · 村名",
    shortTitle: "村名",
    blurb: "各乡镇代表性村名（最难）",
    seconds: 45,
    passStations: 10,
    showPinyin: true,
    scoreMultiplier: 2,
    words: LILING_VILLAGES,
  },
};

export const LEVEL_LIST: LevelConfig[] = [LEVELS[1], LEVELS[2], LEVELS[3]];

/** @deprecated 兼容旧引用 */
export const LILING_PLACES = LILING_TOWNS;
export type PlaceWord = TrainWord;

export function shuffleWords(source: TrainWord[]): TrainWord[] {
  const list = [...source];
  for (let i = list.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
}

export function shufflePlaces(source = LILING_TOWNS): TrainWord[] {
  return shuffleWords(source);
}
