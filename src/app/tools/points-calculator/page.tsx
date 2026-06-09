import { AIToolPlaceholder } from "@/components/AIToolPlaceholder";

export default function PointsCalculatorPage() {
  return (
    <AIToolPlaceholder
      title="Points Calculator (Express Entry)"
      description="该功能将用于计算并解释打分体系（例如CRS），输出可执行的加分策略（语言、学历认证、工作经验、雇主担保等）。当前版本正在对齐最新政策并完善解释性输出。"
      statusLabel="Policy alignment"
      progressLabel="Coming soon"
      progressPct={76}
      backHref="/tools"
      backLabel="返回工具中心"
      ctaHref="/contact"
      ctaLabel="获取加分建议"
    />
  );
}

