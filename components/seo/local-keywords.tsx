import { siteConfig } from "@/config/site";

/** 仅用于搜索引擎抓取，前端不展示 */
export default function LocalSeoKeywords() {
  const keywords = siteConfig.seo.keywords.slice(0, 20).join("、");

  return (
    <div className="sr-only">
      <p>
        {siteConfig.fullName}，服务区域包括
        {siteConfig.seo.areasServed.join("、")}
        。核心业务：{keywords}。提供企业 API 中转、AI 培训、本地 Agent
        搭建、私有化大模型部署与 RAG 知识库建设，支持全国远程交付与湖南本地上门服务。
      </p>
    </div>
  );
}
