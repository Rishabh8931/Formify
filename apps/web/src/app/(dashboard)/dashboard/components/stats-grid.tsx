import { FileText, MessageSquare, Send, BarChart3 } from "lucide-react";

import { StatCard } from "./stat-card";

export function StatsGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        label="Total forms"
        value="0"
        description="Forms created in your workspace"
        icon={FileText}
      />

      <StatCard
        label="Total responses"
        value="0"
        description="Responses collected across forms"
        icon={MessageSquare}
      />

      <StatCard
        label="Published forms"
        value="0"
        description="Forms currently accepting responses"
        icon={Send}
      />

      <StatCard
        label="Response rate"
        value="0%"
        description="Average completion rate"
        icon={BarChart3}
      />
    </div>
  );
}
