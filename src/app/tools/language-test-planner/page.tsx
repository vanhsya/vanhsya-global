import { AIToolPlaceholder } from "@/components/AIToolPlaceholder";

export default function LanguageTestPlannerPage() {
  return (
    <AIToolPlaceholder
      title="Language Test Planner"
      description="该功能将提供语言考试规划（目标分数、考试选择、备考节奏、材料清单、时间线），并与签证/移民路径联动给出优先级建议。当前版本正在完善题型与地区考试规则映射。"
      statusLabel="Planner build"
      progressLabel="Coming soon"
      progressPct={80}
      backHref="/tools"
      backLabel="返回工具中心"
      ctaHref="/contact"
      ctaLabel="获取备考规划"
    />
  );
}

