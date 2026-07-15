import type { Metadata } from "next";

import TypingTrain from "@/components/train/typing-train";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "醴陵打字列车",
  description:
    "醴陵打字列车：乡镇、名人、村名三关挑战。限时打字，开遍醴陵。",
  keywords: [
    "醴陵打字列车",
    "醴陵地名",
    "浦口",
    "王仙",
    "白兔潭",
    "醴陵小游戏",
    ...siteConfig.seo.keywords.slice(0, 6),
  ],
  openGraph: {
    title: "醴陵打字列车",
    description: "打出乡镇地名，载着列车开遍醴陵。",
    url: `${siteConfig.url}/train`,
  },
};

export default function TrainPage() {
  return <TypingTrain />;
}
