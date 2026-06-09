import { AIToolPlaceholder } from "@/components/AIToolPlaceholder";

export default function ApplicationTrackerPage() {
  return (
    <AIToolPlaceholder
      title="Application Status Tracker"
      description="该功能将用于追踪申请阶段（材料、递交、补料、面试、体检、批签等），并提供每一步的注意事项与风险提醒。当前版本正在完善阶段模型与提醒机制。"
      statusLabel="Feature build"
      progressLabel="Coming soon"
      progressPct={79}
      backHref="/tools"
      backLabel="返回工具中心"
      ctaHref="/contact"
      ctaLabel="申请开通追踪"
    />
  );
}

