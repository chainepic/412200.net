import { type LevelId } from "./words";

export type ShareCardData = {
  levelTitle: string;
  stations: number;
  score: number;
  accuracy: number;
  maxCombo: number;
  unlockedNext: string | null;
  dateStr: string;
};

/**
 * 极简、现代、高质感的 SVG 成绩海报生成器 (醴陵真好主题色)
 * 纯前端 SVG -> Canvas -> PNG 转换，不依赖任何第三方重量级库，保证移动端 100% 兼容。
 */
export function generateShareCardSvg(data: ShareCardData): string {
  const { levelTitle, stations, score, accuracy, maxCombo, unlockedNext, dateStr } = data;

  const titleText = "醴陵打字列车 · 挑战成绩";
  const passStatusText = unlockedNext ? `通关！解锁 ${unlockedNext}` : "挑战完成";

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 960" width="640" height="960" style="background: #e7f4ee; font-family: 'Songti SC', 'STSong', 'Noto Serif SC', 'Source Han Serif SC', 'SimSun', system-ui, sans-serif;">
    <!-- 渐变背景与纹理 -->
    <defs>
      <linearGradient id="bg-grad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#e7f4ee" />
        <stop offset="50%" stop-color="#cfe4d8" />
        <stop offset="100%" stop-color="#b7d2c4" />
      </linearGradient>
      <radialGradient id="glow" cx="50%" cy="30%" r="60%">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.6" />
        <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
      </radialGradient>
      <clipPath id="avatar-clip">
        <circle cx="320" cy="180" r="40" />
      </clipPath>
    </defs>

    <!-- 背景 -->
    <rect width="640" height="960" fill="url(#bg-grad)" />
    <rect width="640" height="960" fill="url(#glow)" />

    <!-- 边框装饰 -->
    <rect x="24" y="24" width="592" height="912" fill="none" stroke="#102820" stroke-width="1.5" stroke-opacity="0.12" rx="24" />
    <rect x="28" y="28" width="584" height="904" fill="none" stroke="#102820" stroke-width="0.5" stroke-opacity="0.08" rx="20" />

    <!-- 顶部徽标与日期 -->
    <g transform="translate(0, 75)">
      <text x="320" y="0" text-anchor="middle" font-size="13" font-weight="600" letter-spacing="4" fill="#0f6b57" opacity="0.85">LILING TYPING TRAIN</text>
      <text x="320" y="28" text-anchor="middle" font-size="28" font-weight="bold" letter-spacing="2" fill="#102820">${titleText}</text>
      <line x1="280" y1="48" x2="360" y2="48" stroke="#0f6b57" stroke-width="2" stroke-linecap="round" opacity="0.6" />
    </g>

    <!-- 主卡片 (暗色陶瓷质感) -->
    <g transform="translate(48, 190)">
      <rect width="544" height="520" fill="#102820" rx="32" filter="drop-shadow(0 20px 40px rgba(16,40,32,0.18))" />
      
      <!-- 卡片内部边框 -->
      <rect x="16" y="16" width="512" height="488" fill="none" stroke="#9fcdb8" stroke-width="1" stroke-opacity="0.15" rx="20" />

      <!-- 关卡标签 -->
      <rect x="212" y="45" width="120" height="32" fill="#1f8f74" rx="16" />
      <text x="272" y="65" text-anchor="middle" font-size="14" font-weight="bold" fill="#ffffff" letter-spacing="1">${levelTitle}</text>

      <!-- 核心成绩：到站数 -->
      <text x="272" y="195" text-anchor="middle" font-size="96" font-weight="bold" fill="#f3faf6" letter-spacing="-2">${stations}</text>
      <text x="272" y="235" text-anchor="middle" font-size="15" font-weight="500" fill="#9fcdb8" letter-spacing="6">到达站点 (STATIONS)</text>

      <!-- 状态文字 -->
      <text x="272" y="285" text-anchor="middle" font-size="20" font-weight="bold" fill="#f0c36a" letter-spacing="1">${passStatusText}</text>

      <!-- 细分割线 -->
      <line x1="60" y1="320" x2="484" y2="320" stroke="#9fcdb8" stroke-width="1" stroke-opacity="0.12" />

      <!-- 详细指标三列 -->
      <!-- 第一列: 得分 -->
      <g transform="translate(110, 355)">
        <text x="0" y="35" text-anchor="middle" font-size="32" font-weight="bold" fill="#ffffff">${score}</text>
        <text x="0" y="65" text-anchor="middle" font-size="12" fill="#9fcdb8" opacity="0.8" letter-spacing="1">总得分</text>
      </g>

      <!-- 第二列: 正确率 -->
      <g transform="translate(272, 355)">
        <text x="0" y="35" text-anchor="middle" font-size="32" font-weight="bold" fill="#ffffff">${accuracy}%</text>
        <text x="0" y="65" text-anchor="middle" font-size="12" fill="#9fcdb8" opacity="0.8" letter-spacing="1">正确率</text>
      </g>

      <!-- 第三列: 最大连击 -->
      <g transform="translate(434, 355)">
        <text x="0" y="35" text-anchor="middle" font-size="32" font-weight="bold" fill="#ffffff">${maxCombo}</text>
        <text x="0" y="65" text-anchor="middle" font-size="12" fill="#9fcdb8" opacity="0.8" letter-spacing="1">最高连击</text>
      </g>

      <!-- 底部装饰轨道 -->
      <path d="M 40,460 L 504,460" stroke="#3d6b58" stroke-width="2" stroke-dasharray="4 4" opacity="0.4" />
    </g>

    <!-- 底部品牌与引导扫码区 -->
    <g transform="translate(48, 760)">
      <!-- 左侧：品牌文案 -->
      <g transform="translate(20, 30)">
        <text x="0" y="0" font-size="13" font-weight="bold" fill="#0f6b57" letter-spacing="3">醴陵真好 · 412200.net</text>
        <text x="0" y="26" font-size="20" font-weight="bold" fill="#102820" letter-spacing="1">AI 软件与应用定制开发</text>
        <text x="0" y="50" font-size="13" fill="#1a2e28" opacity="0.7">微信搜一搜「醴陵真好」· 扫码挑战打字列车</text>
        <text x="0" y="72" font-size="11" fill="#1a2e28" opacity="0.5">生成时间：${dateStr}</text>
      </g>

      <!-- 右侧：极简二维码视觉占位 (经典定位角) -->
      <g transform="translate(430, 10)">
        <rect width="90" height="90" fill="#ffffff" rx="16" filter="drop-shadow(0 8px 20px rgba(16,40,32,0.08))" />
        <!-- 极简二维码微缩图样 -->
        <rect x="8" y="8" width="74" height="74" fill="none" stroke="#102820" stroke-width="1" opacity="0.1" />
        
        <!-- 四个角的定位块 -->
        <rect x="14" y="14" width="20" height="20" fill="#0f6b57" rx="4" />
        <rect x="18" y="18" width="12" height="12" fill="#ffffff" rx="2" />
        <rect x="21" y="21" width="6" height="6" fill="#0f6b57" rx="1" />

        <rect x="56" y="14" width="20" height="20" fill="#0f6b57" rx="4" />
        <rect x="60" y="18" width="12" height="12" fill="#ffffff" rx="2" />
        <rect x="63" y="21" width="6" height="6" fill="#0f6b57" rx="1" />

        <rect x="14" y="56" width="20" height="20" fill="#0f6b57" rx="4" />
        <rect x="18" y="60" width="12" height="12" fill="#ffffff" rx="2" />
        <rect x="21" y="63" width="6" height="6" fill="#0f6b57" rx="1" />

        <!-- 内部随机像素点装饰 -->
        <rect x="42" y="20" width="6" height="12" fill="#102820" rx="1" />
        <rect x="42" y="38" width="12" height="6" fill="#102820" rx="1" />
        <rect x="56" y="42" width="14" height="6" fill="#102820" rx="1" />
        <rect x="56" y="56" width="6" height="14" fill="#102820" rx="1" />
        <rect x="38" y="56" width="12" height="6" fill="#102820" rx="1" />
        <rect x="38" y="68" width="18" height="8" fill="#102820" rx="1" />
        <rect x="20" y="42" width="12" height="6" fill="#102820" rx="1" />
        <circle cx="32" cy="32" r="4" fill="#102820" />
      </g>
    </g>
  </svg>`;
}

/**
 * 将 SVG 字符串安全转换为可长按保存的 Base64 PNG 图片
 */
export function convertSvgToPng(svgStr: string): Promise<string> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      resolve("");
      return;
    }

    try {
      const svgBlob = new Blob([svgStr], { type: "image/svg+xml;charset=utf-8" });
      const URL = window.URL || window.webkitURL || window;
      const blobUrl = URL.createObjectURL(svgBlob);

      const img = new Image();
      img.src = blobUrl;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = 640;
        canvas.height = 960;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Canvas context is null"));
          return;
        }

        // 渲染高画质
        ctx.drawImage(img, 0, 0, 640, 960);
        const pngUrl = canvas.toDataURL("image/png");
        URL.revokeObjectURL(blobUrl);
        resolve(pngUrl);
      };
      img.onerror = (err) => {
        URL.revokeObjectURL(blobUrl);
        reject(err);
      };
    } catch (e) {
      reject(e);
    }
  });
}
