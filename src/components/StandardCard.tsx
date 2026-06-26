import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { cn, formatDate, prefixFromCode } from "@/lib/utils";
import { CATEGORY_LABELS, type Standard } from "@/data/types";
import { StatusPill } from "./StatusPill";

export function StandardCard({
  standard: s,
  index = 0,
  compact = false,
}: {
  standard: Standard;
  index?: number;
  compact?: boolean;
}) {
  const C = CATEGORY_LABELS[s.category];

  return (
    <Link
      to={`/standard/${s.id}`}
      className={cn(
        "card card-hover group flex flex-col gap-3 p-5 animate-rise",
        `stagger-${Math.min(index + 1, 6)}`,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-rule bg-ink text-paper font-mono-tight text-[11px]">
            {prefixFromCode(s.code)}
          </span>
          <div>
            <div className="font-mono-tight text-[12px] tracking-wider2 text-rule/80">
              {s.code}
            </div>
            <div className="font-mono-tight text-[10.5px] uppercase tracking-wider2 text-rule/50">
              {C.zh} · {C.en}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <StatusPill status={s.status} />
          <span className="hidden md:inline-flex h-7 w-7 items-center justify-center border border-rule/40 text-rule/50 transition-all group-hover:border-rule group-hover:bg-ink group-hover:text-paper">
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>

      <div>
        <h3 className="font-display text-[20px] font-600 leading-snug text-rule">
          {s.titleZh}
        </h3>
        <p className="mt-1 text-[12.5px] text-rule/60 leading-relaxed italic">
          {s.titleEn}
        </p>
      </div>

      {!compact && (
        <p className="text-[13px] text-rule/75 line-clamp-2 leading-relaxed">
          {s.scope}
        </p>
      )}

      <div className="mt-auto pt-3 flex items-center justify-between gap-3 border-t border-rule/15 font-mono-tight text-[10.5px] uppercase tracking-wider2 text-rule/60">
        <span>发布 {formatDate(s.publishDate)}</span>
        <span>·</span>
        <span>实施 {formatDate(s.effectiveDate)}</span>
        <span>·</span>
        <span>{s.issuerName.split(" ")[0]}</span>
      </div>
    </Link>
  );
}
