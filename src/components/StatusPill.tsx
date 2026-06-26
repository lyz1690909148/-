import { cn } from "@/lib/utils";
import {
  STATUS_LABELS,
  type StandardStatus,
} from "@/data/types";

const ICONS: Record<StandardStatus, string> = {
  active: "●",
  recommended: "◆",
  pending: "◐",
  withdrawn: "✕",
};

export function StatusPill({
  status,
  className,
}: {
  status: StandardStatus;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "pill",
        STATUS_LABELS[status].color,
        className,
      )}
    >
      <span className="text-[10px] leading-none">{ICONS[status]}</span>
      {STATUS_LABELS[status].zh}
    </span>
  );
}
