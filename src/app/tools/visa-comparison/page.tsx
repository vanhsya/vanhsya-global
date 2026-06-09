import { AIToolPlaceholder } from "@/components/AIToolPlaceholder";

export default function VisaComparisonPage() {
  return (
    <AIToolPlaceholder
      title="Visa Pathway Comparison"
      description="该功能将提供多路径对比（资格要求、成本、时间线、成功率与风险点），并根据你的目标给出推荐顺序与备选方案。当前版本正在完善可解释的对比模型与数据源。"
      statusLabel="Model tuning"
      progressLabel="Coming soon"
      progressPct={74}
      backHref="/tools"
      backLabel="返回工具中心"
      ctaHref="/contact"
      ctaLabel="获取路径建议"
    />
  );
}

