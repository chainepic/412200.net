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
 * 第三关：代表性行政村名（去掉「村」后缀）
 * 选自白兔潭、浦口、王仙等地，可后续继续扩充。
 */
export const LILING_VILLAGES: TrainWord[] = [
  {
    text: "田心",
    pinyin: "tián xīn",
    pinyinPlain: "tianxin",
    full: "白兔潭 · 田心村",
    kind: "村",
  },
  {
    text: "洙塘",
    pinyin: "zhū táng",
    pinyinPlain: "zhutang",
    full: "白兔潭 · 洙塘村",
    kind: "村",
  },
  {
    text: "黄甲",
    pinyin: "huáng jiǎ",
    pinyinPlain: "huangjia",
    full: "白兔潭 · 黄甲村",
    kind: "村",
  },
  {
    text: "峤岭",
    pinyin: "qiáo lǐng",
    pinyinPlain: "qiaoling",
    full: "白兔潭 · 峤岭村",
    kind: "村",
  },
  {
    text: "山水",
    pinyin: "shān shuǐ",
    pinyinPlain: "shanshui",
    full: "白兔潭 · 山水村",
    kind: "村",
  },
  {
    text: "泉沅",
    pinyin: "quán yuán",
    pinyinPlain: "quanyuan",
    full: "白兔潭 · 泉沅村",
    kind: "村",
  },
  {
    text: "荷田",
    pinyin: "hé tián",
    pinyinPlain: "hetian",
    full: "白兔潭 · 荷田村",
    kind: "村",
  },
  {
    text: "柏大",
    pinyin: "bǎi dà",
    pinyinPlain: "baida",
    full: "白兔潭 · 柏大村",
    kind: "村",
  },
  {
    text: "保丰",
    pinyin: "bǎo fēng",
    pinyinPlain: "baofeng",
    full: "浦口 · 保丰村",
    kind: "村",
  },
  {
    text: "三铺",
    pinyin: "sān pù",
    pinyinPlain: "sanpu",
    full: "浦口 · 三铺村",
    kind: "村",
  },
  {
    text: "李洲",
    pinyin: "lǐ zhōu",
    pinyinPlain: "lizhou",
    full: "浦口 · 李洲村",
    kind: "村",
  },
  {
    text: "荣坪",
    pinyin: "róng píng",
    pinyinPlain: "rongping",
    full: "浦口 · 荣坪村",
    kind: "村",
  },
  {
    text: "河泉",
    pinyin: "hé quán",
    pinyinPlain: "hequan",
    full: "浦口 · 河泉村",
    kind: "村",
  },
  {
    text: "花椒",
    pinyin: "huā jiāo",
    pinyinPlain: "huajiao",
    full: "浦口 · 花椒村",
    kind: "村",
  },
  {
    text: "茅坪",
    pinyin: "máo píng",
    pinyinPlain: "maoping",
    full: "浦口 · 茅坪村",
    kind: "村",
  },
  {
    text: "仙石",
    pinyin: "xiān shí",
    pinyinPlain: "xianshi",
    full: "浦口 · 仙石村",
    kind: "村",
  },
  {
    text: "合水",
    pinyin: "hé shuǐ",
    pinyinPlain: "heshui",
    full: "浦口 · 合水村",
    kind: "村",
  },
  {
    text: "荷花",
    pinyin: "hé huā",
    pinyinPlain: "hehua",
    full: "浦口 · 荷花村",
    kind: "村",
  },
  {
    text: "泮川",
    pinyin: "pàn chuān",
    pinyinPlain: "panchuan",
    full: "浦口 · 泮川村",
    kind: "村",
  },
  {
    text: "书堂",
    pinyin: "shū táng",
    pinyinPlain: "shutang",
    full: "王仙 · 书堂村",
    kind: "村",
  },
  {
    text: "司徒",
    pinyin: "sī tú",
    pinyinPlain: "situ",
    full: "王仙 · 司徒村",
    kind: "村",
  },
  {
    text: "香水",
    pinyin: "xiāng shuǐ",
    pinyinPlain: "xiangshui",
    full: "王仙 · 香水村",
    kind: "村",
  },
  {
    text: "灌冲",
    pinyin: "guàn chōng",
    pinyinPlain: "guanchong",
    full: "王仙 · 灌冲村",
    kind: "村",
  },
  {
    text: "温泉",
    pinyin: "wēn quán",
    pinyinPlain: "wenquan",
    full: "王仙 · 温泉村",
    kind: "村",
  },
  {
    text: "大屏山",
    pinyin: "dà píng shān",
    pinyinPlain: "dapingshan",
    full: "王仙 · 大屏山村",
    kind: "村",
  },
  {
    text: "李山",
    pinyin: "lǐ shān",
    pinyinPlain: "lishan",
    full: "王仙 · 李山村",
    kind: "村",
  },
  {
    text: "观口",
    pinyin: "guān kǒu",
    pinyinPlain: "guankou",
    full: "王仙 · 观口村",
    kind: "村",
  },
  {
    text: "三狮",
    pinyin: "sān shī",
    pinyinPlain: "sanshi",
    full: "王仙 · 三狮村",
    kind: "村",
  },
  {
    text: "申熙",
    pinyin: "shēn xī",
    pinyinPlain: "shenxi",
    full: "王仙 · 申熙村",
    kind: "村",
  },
  {
    text: "黄猫岭",
    pinyin: "huáng māo lǐng",
    pinyinPlain: "huangmaoling",
    full: "左权故里 · 黄猫岭",
    kind: "村",
  },
  {
    text: "立三",
    pinyin: "lì sān",
    pinyinPlain: "lisan",
    full: "阳三石 · 立三村",
    kind: "村",
  },
  {
    text: "洪源",
    pinyin: "hóng yuán",
    pinyinPlain: "hongyuan",
    full: "陈明仁故里 · 洪源",
    kind: "村",
  },
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
    passStations: 8,
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
    passStations: 8,
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
