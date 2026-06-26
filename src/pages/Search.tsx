import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search as SearchIcon, X, SlidersHorizontal } from "lucide-react";
import { StandardCard } from "@/components/StandardCard";
import { Empty } from "@/components/Empty";
import { STANDARDS } from "@/data/standards";
import {
  CATEGORY_LABELS,
  ISSUER_LABELS,
  STATUS_LABELS,
  type Category,
  type Issuer,
  type StandardStatus,
} from "@/data/types";
import { cn } from "@/lib/utils";

type SortKey = "recent" | "code" | "title" | "status";

export default function Search() {
  const [params, setParams] = useSearchParams();
  const [view, setView] = useState<"grid" | "list">("grid");
  const [showFilter, setShowFilter] = useState(true);

  const q = params.get("q") ?? "";
  const cat = (params.get("category") as Category | null) ?? null;
  const issuers = (params.getAll("issuer") as Issuer[]) ?? [];
  const statuses = (params.getAll("status") as StandardStatus[]) ?? [];
  const yearFrom = Number(params.get("yf") ?? 0) || 0;
  const yearTo = Number(params.get("yt") ?? 9999) || 9999;
  const sort = (params.get("sort") as SortKey) ?? "recent";

  const setParam = (key: string, value: string | null) => {
    const next = new URLSearchParams(params);
    if (value === null || value === "" || value === "0") next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  };

  const toggleListParam = (key: string, value: string) => {
    const list = new Set(params.getAll(key));
    if (list.has(value)) list.delete(value);
    else list.add(value);
    const next = new URLSearchParams(params);
    next.delete(key);
    list.forEach((v) => next.append(key, v));
    setParams(next, { replace: true });
  };

  const clearAll = () => setParams(new URLSearchParams(), { replace: true });

  // Debounce-free, since the data set is small
  const results = useMemo(() => {
    let list = STANDARDS.slice();
    if (q.trim()) {
      const needle = q.trim().toLowerCase();
      list = list.filter(
        (s) =>
          s.code.toLowerCase().includes(needle) ||
          s.titleZh.toLowerCase().includes(needle) ||
          s.titleEn.toLowerCase().includes(needle) ||
          s.keywords.some((k) => k.toLowerCase().includes(needle)),
      );
    }
    if (cat) list = list.filter((s) => s.category === cat);
    if (issuers.length) list = list.filter((s) => issuers.includes(s.issuer));
    if (statuses.length) list = list.filter((s) => statuses.includes(s.status));
    if (yearFrom)
      list = list.filter((s) => Number(s.publishDate.slice(0, 4)) >= yearFrom);
    if (yearTo && yearTo < 9999)
      list = list.filter((s) => Number(s.publishDate.slice(0, 4)) <= yearTo);

    switch (sort) {
      case "code":
        list.sort((a, b) => a.code.localeCompare(b.code));
        break;
      case "title":
        list.sort((a, b) => a.titleZh.localeCompare(b.titleZh, "zh"));
        break;
      case "status":
        list.sort((a, b) => a.status.localeCompare(b.status));
        break;
      default:
        list.sort((a, b) => b.publishDate.localeCompare(a.publishDate));
    }
    return list;
  }, [q, cat, issuers.join(","), statuses.join(","), yearFrom, yearTo, sort]);

  // Lock scroll on top when filter changes
  useEffect(() => {
    // no-op for now
  }, [params]);

  const allIssuers = Object.keys(ISSUER_LABELS) as Issuer[];
  const allStatuses = Object.keys(STATUS_LABELS) as StandardStatus[];

  return (
    <div className="container py-10">
      {/* ── Search bar ──────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="section-eyebrow">
            <span>Search results</span>
            <span className="font-mono-tight text-rule/40">
              {results.length.toString().padStart(3, "0")} hits
            </span>
          </div>
          <h1 className="font-display text-[clamp(36px,5vw,64px)] font-700 leading-[0.95] tracking-tightest">
            {q ? (
              <>
                搜索
                <span className="italic text-copper">「{q}」</span>
              </>
            ) : cat ? (
              <>
                浏览
                <span className="italic text-copper">
                  {CATEGORY_LABELS[cat].zh}
                </span>
              </>
            ) : (
              <>
                全部
                <span className="italic text-copper">标准</span>
              </>
            )}
          </h1>
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex items-center gap-2 border border-rule bg-paper-cool px-3 py-2 md:w-[360px]"
        >
          <SearchIcon className="h-4 w-4 text-rule/55" />
          <input
            defaultValue={q}
            onChange={(e) => setParam("q", e.target.value || null)}
            placeholder="编号 / 关键词"
            className="flex-1 bg-transparent text-[14px] focus:outline-none placeholder:text-rule/40"
          />
          {q && (
            <button
              type="button"
              onClick={() => setParam("q", null)}
              className="text-rule/50 hover:text-rule"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </form>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* ── Sidebar filters ─────────────── */}
        {showFilter && (
          <aside className="lg:col-span-3 animate-rise">
            <div className="sticky top-24 space-y-6">
              <FilterGroup title="Discipline">
                <div className="grid grid-cols-1 gap-2">
                  {(Object.keys(CATEGORY_LABELS) as Category[]).map((c) => (
                    <button
                      key={c}
                      onClick={() =>
                        setParam("category", cat === c ? null : c)
                      }
                      className={cn(
                        "flex items-center justify-between border px-3 py-2 text-left text-[13px] transition-all",
                        cat === c
                          ? "border-ink bg-ink text-paper"
                          : "border-rule/40 bg-paper-cool hover:border-rule",
                      )}
                    >
                      <span>{CATEGORY_LABELS[c].zh}</span>
                      <span className="font-mono-tight text-[10.5px] uppercase tracking-wider2 opacity-70">
                        {c}
                      </span>
                    </button>
                  ))}
                </div>
              </FilterGroup>

              <FilterGroup title="Issuer">
                <div className="space-y-1.5">
                  {allIssuers.map((i) => (
                    <label
                      key={i}
                      className="flex items-center gap-2.5 text-[13px] cursor-pointer hover:text-copper"
                    >
                      <input
                        type="checkbox"
                        checked={issuers.includes(i)}
                        onChange={() => toggleListParam("issuer", i)}
                        className="h-3.5 w-3.5 accent-copper"
                      />
                      <span className="font-mono-tight text-[12px] tracking-wider2">
                        {i}
                      </span>
                      <span className="text-rule/60 truncate">
                        {ISSUER_LABELS[i]}
                      </span>
                    </label>
                  ))}
                </div>
              </FilterGroup>

              <FilterGroup title="Status">
                <div className="space-y-1.5">
                  {allStatuses.map((st) => (
                    <label
                      key={st}
                      className="flex items-center gap-2.5 text-[13px] cursor-pointer hover:text-copper"
                    >
                      <input
                        type="checkbox"
                        checked={statuses.includes(st)}
                        onChange={() => toggleListParam("status", st)}
                        className="h-3.5 w-3.5 accent-copper"
                      />
                      <span className={cn("pill", STATUS_LABELS[st].color)}>
                        {STATUS_LABELS[st].zh}
                      </span>
                    </label>
                  ))}
                </div>
              </FilterGroup>

              <FilterGroup title="Year published">
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={yearFrom || ""}
                    placeholder="From"
                    onChange={(e) =>
                      setParam("yf", e.target.value || null)
                    }
                    className="w-1/2 border border-rule/50 bg-paper-cool px-2 py-1.5 text-[12.5px] font-mono-tight focus:outline-none focus:border-rule"
                  />
                  <span className="text-rule/40">—</span>
                  <input
                    type="number"
                    value={yearTo || ""}
                    placeholder="To"
                    onChange={(e) =>
                      setParam("yt", e.target.value || null)
                    }
                    className="w-1/2 border border-rule/50 bg-paper-cool px-2 py-1.5 text-[12.5px] font-mono-tight focus:outline-none focus:border-rule"
                  />
                </div>
              </FilterGroup>

              <button
                onClick={clearAll}
                className="w-full btn-ghost"
                type="button"
              >
                <X className="h-3 w-3" /> 清除全部筛选
              </button>
            </div>
          </aside>
        )}

        {/* ── Result list ──────────────────── */}
        <section
          className={cn(
            "animate-rise",
            showFilter ? "lg:col-span-9" : "lg:col-span-12",
          )}
        >
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-rule/20 pb-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilter((s) => !s)}
                className="inline-flex items-center gap-1.5 font-mono-tight text-[11px] uppercase tracking-wider2 text-rule/70 hover:text-rule"
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                {showFilter ? "隐藏筛选" : "显示筛选"}
              </button>
              <span className="hairline w-12" />
              <span className="font-mono-tight text-[11px] uppercase tracking-wider2 text-rule/60">
                {results.length} results
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="eyebrow">Sort</span>
              <select
                value={sort}
                onChange={(e) => setParam("sort", e.target.value)}
                className="border border-rule/50 bg-paper-cool px-2.5 py-1.5 text-[12px] focus:outline-none focus:border-rule"
              >
                <option value="recent">最新发布</option>
                <option value="code">编号</option>
                <option value="title">名称</option>
                <option value="status">状态</option>
              </select>
            </div>
          </div>

          {results.length === 0 ? (
            <Empty
              title="未找到匹配的标准"
              description="试着调整关键词、修改筛选条件，或返回首页重新搜索。"
              action={{ to: "/", label: "返回首页" }}
            />
          ) : (
            <div
              className={cn(
                view === "grid"
                  ? "grid sm:grid-cols-2 xl:grid-cols-3 gap-4"
                  : "flex flex-col gap-3",
              )}
            >
              {results.map((s, i) => (
                <StandardCard
                  key={s.id}
                  standard={s}
                  index={i}
                  compact={view === "list"}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="eyebrow mb-3">{title}</div>
      {children}
    </div>
  );
}
