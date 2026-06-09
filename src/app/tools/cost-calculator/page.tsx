import { AIToolPlaceholder } from "@/components/AIToolPlaceholder";

export default function CostCalculatorPage() {
  return (
    <AIToolPlaceholder
      title="Immigration Cost Calculator"
      description="该功能用于拆解移民/签证全流程成本（官方费用、材料、公证翻译、体检、语言考试、服务费用等），并提供预算方案与时间线建议。当前版本正在进行数据校验与地区差异适配。"
      statusLabel="Data validation"
      progressLabel="Coming soon"
      progressPct={78}
      backHref="/tools"
      backLabel="返回工具中心"
      ctaHref="/contact"
      ctaLabel="获取预算评估"
    />
  );
}

