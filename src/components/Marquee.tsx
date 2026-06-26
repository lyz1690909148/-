import { STANDARDS, STANDARDS_BY_CATEGORY } from "@/data/standards";
import { CATEGORY_LABELS } from "@/data/types";

const items = [
  "ASTM E8/E8M-22 · 金属拉伸",
  "ISO 6892-1:2019 · 室温拉伸",
  "GB/T 228.1-2010 · 金属拉伸",
  "IEC 62368-1:2023 · AV/ICT 安全",
  "GB/T 2423.1-2008 · 低温试验",
  "GJB 150.1A-2009 · 军用环境",
  "ASME Section VIII-2023 · 压力容器",
  "MIL-STD-810H · 美军环境",
  "UN 38.3 · 锂电池运输",
  "GB/T 261-2021 · 闪点闭口",
  "ISO 16750-1:2018 · 车载电气",
  "UL 94-2023 · 塑料可燃性",
];

export function Marquee() {
  return (
    <div className="border-y border-rule bg-ink py-3 overflow-hidden">
      <div className="flex gap-10 whitespace-nowrap animate-marquee mask-fade-r text-paper/80 font-mono-tight text-[12px] uppercase tracking-wider2">
        {[...items, ...items].map((it, i) => (
          <span key={i} className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 bg-copper" />
            {it}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Stats() {
  const total = STANDARDS.length;
  const issuers = new Set(STANDARDS.map((s) => s.issuer)).size;
  const categories = Object.keys(STANDARDS_BY_CATEGORY).length;
  const today = new Date().toISOString().slice(0, 10);
  const updated = STANDARDS.filter((s) => s.publishDate >= "2024-01-01").length;

  const stats = [
    { label: "Total standards", value: total.toString().padStart(3, "0") },
    { label: "Issuers covered", value: issuers.toString().padStart(2, "0") },
    { label: "Categories", value: categories.toString().padStart(2, "0") },
    { label: "Updated since 2024", value: updated.toString().padStart(2, "0") },
    { label: "Today", value: today },
  ];

  return (
    <div className="border border-rule bg-paper-cool">
      <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-rule/30 border-b border-rule/30">
        {stats.map((s) => (
          <div key={s.label} className="p-4 md:p-5">
            <div className="font-mono-tight text-[10.5px] uppercase tracking-wider2 text-rule/55">
              {s.label}
            </div>
            <div className="mt-2 font-display text-[26px] md:text-[34px] font-700 leading-none">
              {s.value}
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 md:grid-cols-6 divide-x divide-rule/20">
        {(Object.keys(STANDARDS_BY_CATEGORY) as Array<
          keyof typeof CATEGORY_LABELS
        >).map((k) => (
          <div
            key={k}
            className="p-3 flex flex-col items-start gap-0.5"
          >
            <span className="font-mono-tight text-[9.5px] md:text-[10px] uppercase tracking-wider2 text-rule/50">
              {CATEGORY_LABELS[k].en}
            </span>
            <span className="font-display text-[16px] md:text-[18px] font-600">
              {STANDARDS_BY_CATEGORY[k].length}
            </span>
            <span className="text-[10.5px] md:text-[11px] text-rule/65">
              {CATEGORY_LABELS[k].zh}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
