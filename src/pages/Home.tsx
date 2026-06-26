import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ArrowRight, Sparkles } from "lucide-react";
import { CategoryChip } from "@/components/CategoryChip";
import { StandardCard } from "@/components/StandardCard";
import { Marquee, Stats } from "@/components/Marquee";
import { STANDARDS } from "@/data/standards";
import { CATEGORY_LABELS, type Category } from "@/data/types";
import { useAppStore } from "@/store/useAppStore";

const SUGGESTIONS = [
  "GB/T 228",
  "ISO 6892",
  "冲击",
  "硬度",
  "ESD",
  "压力容器",
  "混凝土",
  "锂电池",
];

export default function Home() {
  const [q, setQ] = useState("");
  const [activeCat, setActiveCat] = useState<Category | null>(null);
  const navigate = useNavigate();
  const history = useAppStore((s) => s.history);

  const submit = (value?: string) => {
    const v = (value ?? q).trim();
    const params = new URLSearchParams();
    if (v) params.set("q", v);
    if (activeCat) params.set("category", activeCat);
    navigate(`/search?${params.toString()}`);
  };

  const recent = history
    .map((h) => STANDARDS.find((s) => s.id === h.standardId))
    .filter(Boolean)
    .slice(0, 3);

  const featured = STANDARDS.slice(0, 6);
  const categories = Object.keys(CATEGORY_LABELS) as Category[];

  return (
    <div>
      <Marquee />

      {/* ── Hero ─────────────────────────────── */}
      <section className="border-b border-rule">
        <div className="container py-10 md:py-20">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-6 animate-rise">
                <span className="flex h-6 items-center gap-1.5 border border-rule/60 px-2 font-mono-tight text-[10.5px] uppercase tracking-wider2 text-rule/70">
                  <Sparkles className="h-3 w-3" />
                  New · 64 records
                </span>
                <span className="hairline flex-1" />
                <span className="font-mono-tight text-[10.5px] uppercase tracking-wider2 text-rule/55 hidden sm:inline">
                  Issue 24 / 26.06.2026
                </span>
              </div>
              <h1 className="font-display text-[clamp(40px,9vw,108px)] font-700 leading-[0.95] tracking-tightest text-balance animate-rise stagger-1">
                Standards,
                <br />
                <span className="italic text-copper">indexed.</span>
              </h1>
              <p className="mt-6 max-w-xl text-[15px] md:text-[16px] leading-relaxed text-rule/75 animate-rise stagger-2">
                一座为工程师与检测人搭建的试验标准档案库。
                在这里，<span className="font-display italic">{`{GB / ISO / ASTM / IEC / GJB}`}</span> {" "}
                不再是散落在桌面上的 PDF，而是可即时检索、可对比、可收藏的活档案。
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  submit();
                }}
                className="mt-7 md:mt-9 flex items-center gap-2 md:gap-3 border-b-2 border-rule pb-2 animate-rise stagger-3"
              >
                <Search className="h-5 w-5 md:h-6 md:w-6 text-rule/55 shrink-0" strokeWidth={1.6} />
                <span className="font-mono-tight text-[12px] md:text-[14px] text-rule/45 shrink-0 select-none">
                  query&gt;
                </span>
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="编号 / 关键词……"
                  className="input-search !text-lg md:!text-2xl min-w-0 flex-1"
                />
                <button
                  type="submit"
                  className="ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-sm border border-rule bg-ink px-3 py-1.5 font-mono-tight text-[11px] uppercase tracking-wider2 text-paper hover:bg-copper"
                >
                  <span className="hidden sm:inline">Search</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </form>

              <div className="mt-5 flex flex-wrap items-center gap-2 animate-rise stagger-4">
                <span className="eyebrow mr-1">Try</span>
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => submit(s)}
                    className="chip"
                    type="button"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 animate-rise stagger-3 order-first lg:order-last">
              <Stats />
            </div>
          </div>

          {/* ── Categories ─────────────────── */}
          <div className="mt-10 md:mt-12">
            <div className="section-eyebrow">
              <span>Browse by discipline</span>
              <span className="ml-2 font-mono-tight text-rule/40">
                0{Object.keys(CATEGORY_LABELS).length}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {categories.map((c) => (
                <CategoryChip
                  key={c}
                  category={c}
                  active={activeCat === c}
                  onClick={() =>
                    setActiveCat((p) => (p === c ? null : c))
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Recent / Featured ───────────────────── */}
      <section className="container py-12 md:py-14">
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 order-2 lg:order-1">
            <div className="lg:sticky lg:top-24 space-y-5">
              <div>
                <div className="section-eyebrow">
                  <span>Editor's pick</span>
                </div>
                <h2 className="font-display text-[32px] md:text-[40px] font-700 leading-tight">
                  本月新发布与
                  <br />
                  <span className="italic text-copper">推荐阅读</span>
                </h2>
                <p className="mt-3 text-[14px] text-rule/70 leading-relaxed">
                  来自 GB / ISO / IEC 等机构的最新发布与值得关注的修订，
                  由档案馆编辑手工筛选。
                </p>
              </div>
              {recent.length > 0 && (
                <div className="border border-rule bg-paper-cool p-4">
                  <div className="eyebrow mb-3">最近查看</div>
                  <ul className="space-y-2">
                    {recent.map((s) => s && (
                      <li
                        key={s.id}
                        className="text-[12.5px] flex items-start gap-2"
                      >
                        <span className="mt-1.5 h-1 w-1 bg-copper shrink-0" />
                        <a
                          href={`/standard/${s.id}`}
                          className="hover:text-copper line-clamp-1"
                        >
                          {s.code} · {s.titleZh}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-8 order-1 lg:order-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {featured.map((s, i) => (
                <StandardCard key={s.id} standard={s} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
