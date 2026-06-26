import { cn } from "@/lib/utils";
import { CATEGORY_LABELS, type Category } from "@/data/types";

const ICONS: Record<Category, string> = {
  material: "▣",
  mechanical: "▤",
  environment: "◈",
  electronic: "◇",
  construction: "▥",
  chemical: "◯",
};

export function CategoryChip({
  category,
  active = false,
  onClick,
  className,
}: {
  category: Category;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  const C = CATEGORY_LABELS[category];
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group flex items-center gap-2 border px-3 py-2.5 text-left transition-all",
        active
          ? "border-ink bg-ink text-paper"
          : "border-rule/70 bg-paper-cool hover:-translate-y-[1px] hover:shadow-hard-sm",
        className,
      )}
    >
      <span
        className={cn(
          "font-mono-tight text-[14px] leading-none",
          active ? "text-copper" : "text-rule/70",
        )}
      >
        {ICONS[category]}
      </span>
      <span className="flex flex-col">
        <span className="font-display text-[15px] font-600 leading-tight">
          {C.zh}
        </span>
        <span
          className={cn(
            "font-mono-tight text-[10px] uppercase tracking-wider2",
            active ? "text-paper/60" : "text-rule/50",
          )}
        >
          {C.en}
        </span>
      </span>
    </button>
  );
}
