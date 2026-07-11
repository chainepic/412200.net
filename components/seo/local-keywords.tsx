import { siteConfig } from "@/config/site";

/** 仅用于搜索引擎抓取，前端不展示 */
export default function LocalSeoKeywords() {
  return (
    <div className="sr-only">
      <p>
        {siteConfig.fullName}
        提供企业 AI 培训、API 中转、本地 Agent 搭建、私有化大模型部署与 RAG
        知识库建设，支持全国远程交付与本地上门服务。服务区域包括
        {siteConfig.seo.areasServed.join("、")}。
      </p>
    </div>
  );
}
