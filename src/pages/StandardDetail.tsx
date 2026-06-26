import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  Clock,
  ExternalLink,
  FlaskConical,
  Hash,
  Layers,
  ScrollText,
  Share2,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { getStandardById, STANDARDS } from "@/data/standards";
import { useAppStore } from "@/store/useAppStore";
import { StatusPill } from "@/components/StatusPill";
import { CATEGORY_LABELS, type Standard } from "@/data/types";
import { cn, formatDate, prefixFromCode } from "@/lib/utils";

type Tab = "scope" | "conditions" | "principle" | "apparatus" | "rev" | "ref";

export default function StandardDetail() {
  const { id } = useParams<{ id: string }>();
  const standard = id ? getStandardById(id) : undefined;
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("scope");
  const { favorites, toggleFavorite, isFavorite, pushHistory, setFavoriteNote } =
    useAppStore();

  useEffect(() => {
    if (standard) pushHistory(standard.id);
  }, [standard, pushHistory]);

  if (!standard) {
    return (
      <div className="container py-20">
        <h1 className="font-display text-4xl">未找到该标准</h1>
        <Link to="/search" className="mt-4 inline-flex btn-primary">
          <ArrowLeft className="h-3.5 w-3.5" /> 返回检索
        </Link>
      </div>
    );
  }

  const fav = isFavorite(standard.id);
  const favItem = favorites.find((f) => f.standardId === standard.id);
  const C = CATEGORY_LABELS[standard.category];

  const references = standard.references
    .map((c) => STANDARDS.find((s) => s.code === c) ?? c)
    .filter(Boolean) as Array<Standard | string>;
  const citedBy = standard.referencedBy
    .map((c) => STANDARDS.find((s) => s.code === c) ?? c)
    .filter(Boolean) as Array<Standard | string>;

  return (
    <article>
      {/* ── Top breadcrumb ──────────────── */}
      <div className="container pt-6">
        <div className="flex items-center gap-2 font-mono-tight text-[11px] uppercase tracking-wider2 text-rule/60">
          <Link to="/" className="hover:text-copper">检索台</Link>
          <span>/</span>
          <Link to="/search" className="hover:text-copper">结果</Link>
          <span>/</span>
          <span className="text-rule/85">{C.zh}</span>
        </div>
      </div>

      {/* ── Header ─────────────────────── */}
      <header className="border-b border-rule bg-paper-warm">
        <div className="container py-8 md:py-12">
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-end">
            <div className="lg:col-span-8 order-2 lg:order-1">
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <button
                  onClick={() => navigate(-1)}
                  className="inline-flex items-center gap-1.5 font-mono-tight text-[11px] uppercase tracking-wider2 text-rule/70 hover:text-copper"
                >
                  <ArrowLeft className="h-3.5 w-3.5" /> Back
                </button>
                <span className="hairline w-24 md:w-40" />
                <span className="font-mono-tight text-[11px] uppercase tracking-wider2 text-rule/55">
                  Std-ID · {standard.id}
                </span>
              </div>

              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <span className="flex h-9 items-center border border-rule bg-ink px-3 font-mono-tight text-[13px] text-paper">
                  {prefixFromCode(standard.code)}
                </span>
                <h2 className="font-mono-tight text-[16px] md:text-[20px] text-rule/85">
                  {standard.code}
                </h2>
                <StatusPill status={standard.status} />
              </div>

              <h1 className="font-display text-[clamp(30px,5.5vw,72px)] font-700 leading-[1] tracking-tightest text-balance">
                {standard.titleZh}
              </h1>
              <p className="mt-3 font-display italic text-[clamp(14px,1.5vw,20px)] text-rule/65 leading-relaxed">
                {standard.titleEn}
              </p>
            </div>

            <div className="lg:col-span-4 space-y-3 order-1 lg:order-2">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => toggleFavorite(standard.id)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-sm border px-3.5 py-2 font-mono-tight text-[11.5px] uppercase tracking-wider2 transition-all",
                    fav
                      ? "border-ink bg-ink text-paper hover:bg-copper"
                      : "border-rule bg-paper-cool hover:bg-paper-warm",
                  )}
                >
                  {fav ? (
                    <BookmarkCheck className="h-3.5 w-3.5" />
                  ) : (
                    <Bookmark className="h-3.5 w-3.5" />
                  )}
                  {fav ? "已收藏" : "加入收藏"}
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                  }}
                  className="inline-flex items-center gap-2 rounded-sm border border-rule bg-paper-cool px-3.5 py-2 font-mono-tight text-[11.5px] uppercase tracking-wider2 hover:bg-paper-warm"
                >
                  <Share2 className="h-3.5 w-3.5" /> 复制链接
                </button>
              </div>
              <div className="grid grid-cols-2 border border-rule bg-paper-cool">
                <Field label="Published" value={formatDate(standard.publishDate)} />
                <Field label="Effective" value={formatDate(standard.effectiveDate)} />
                <Field label="Issuer" value={standard.issuer} />
                <Field label="Discipline" value={C.zh} />
              </div>
              <div className="border border-rule bg-paper-cool px-3.5 py-3">
                <div className="eyebrow mb-1">Issuer · 主管部门</div>
                <div className="text-[13.5px]">{standard.issuerName}</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── Tabs + content ──────────────── */}
      <section className="container py-8 md:py-10">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
          <div className="lg:col-span-8 lg:order-1 order-2">
            <div className="flex gap-0 border-b border-rule overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
              {(
                [
                  { key: "scope", label: "适用范围", icon: ScrollText },
                  { key: "conditions", label: "试验条件", icon: ShieldCheck },
                  { key: "principle", label: "试验原理", icon: FlaskConical },
                  { key: "apparatus", label: "主要仪器", icon: Wrench },
                  { key: "rev", label: "版本沿革", icon: Clock },
                  { key: "ref", label: "引用 / 被引", icon: Hash },
                ] as { key: Tab; label: string; icon: React.ComponentType<{ className?: string }> }[]
              ).map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={cn(
                    "group inline-flex shrink-0 items-center gap-1.5 md:gap-2 border-b-2 px-3 md:px-4 py-3 font-mono-tight text-[10.5px] md:text-[11.5px] uppercase tracking-wider2 transition-all -mb-px",
                    tab === t.key
                      ? "border-ink text-ink"
                      : "border-transparent text-rule/55 hover:text-rule",
                  )}
                >
                  <t.icon className="h-3.5 w-3.5" />
                  {t.label}
                </button>
              ))}
            </div>

            <div className="mt-6">
              {tab === "scope" && (
                <div className="space-y-5 animate-rise">
                  <p className="text-[15px] leading-[1.85] text-rule/85 font-display">
                    {standard.scope}
                  </p>
                  <div className="border border-rule/50 bg-paper-cool p-5">
                    <div className="eyebrow mb-2">Keywords · 关键词</div>
                    <div className="flex flex-wrap gap-2">
                      {standard.keywords.map((k) => (
                        <span
                          key={k}
                          className="border border-rule/40 px-2.5 py-1 font-mono-tight text-[11.5px]"
                        >
                          #{k}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {tab === "conditions" && (
                <ul className="space-y-3 animate-rise">
                  {standard.testConditions.map((c, i) => (
                    <li
                      key={i}
                      className="grid grid-cols-[40px,1fr] items-start gap-3 border-b border-rule/15 pb-3"
                    >
                      <span className="font-mono-tight text-[12px] text-copper">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[14.5px] leading-relaxed text-rule/85">
                        {c}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {tab === "principle" && (
                <div className="animate-rise">
                  <p className="text-[15px] leading-[1.85] text-rule/85 font-display">
                    {standard.principle}
                  </p>
                </div>
              )}

              {tab === "apparatus" && (
                <div className="grid sm:grid-cols-2 gap-3 animate-rise">
                  {standard.apparatus.map((a, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 border border-rule bg-paper-cool p-4"
                    >
                      <span className="font-mono-tight text-[11px] text-copper">
                        A{(i + 1).toString().padStart(2, "0")}
                      </span>
                      <span className="text-[13.5px] leading-relaxed">{a}</span>
                    </div>
                  ))}
                </div>
              )}

              {tab === "rev" && (
                <div className="animate-rise">
                  {standard.supersedes && (
                    <div className="mb-5 flex items-center gap-2 border-l-4 border-amber bg-amber/10 px-4 py-3 font-mono-tight text-[12.5px]">
                      <Layers className="h-4 w-4" />
                      替代历史版本 <span className="font-700">{standard.supersedes}</span>
                    </div>
                  )}
                  <ol className="relative border-l border-rule/50 pl-6 space-y-5">
                    {standard.revisions.map((r, i) => (
                      <li key={i} className="relative">
                        <span className="absolute -left-[31px] top-1 h-3 w-3 border-2 border-rule bg-paper-cool" />
                        <div className="font-mono-tight text-[11px] uppercase tracking-wider2 text-rule/55">
                          {formatDate(r.date)}
                        </div>
                        <div className="mt-1 font-display text-[18px] font-600">
                          {r.code}
                        </div>
                        <p className="mt-1 text-[13.5px] text-rule/70 leading-relaxed">
                          {r.note}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {tab === "ref" && (
                <div className="grid sm:grid-cols-2 gap-6 animate-rise">
                  <ReferenceList title="引用标准 · References" items={references} />
                  <ReferenceList title="被引标准 · Cited by" items={citedBy} />
                </div>
              )}
            </div>
          </div>

          {/* ── Side: notes & meta ──────────── */}
          <aside className="lg:col-span-4 lg:order-2 order-1">
            <div className="lg:sticky lg:top-24 space-y-5">
              <div className="border border-rule bg-paper-cool p-5">
                <div className="eyebrow mb-3">My note · 我的笔记</div>
                <textarea
                  rows={5}
                  value={favItem?.note ?? ""}
                  onChange={(e) => setFavoriteNote(standard.id, e.target.value)}
                  placeholder={
                    fav
                      ? "为这条标准记录你的看法、应用场景或配套引用……"
                      : "加入收藏后即可在此记录笔记"
                  }
                  disabled={!fav}
                  className="w-full resize-none border border-rule/30 bg-paper px-3 py-2 text-[13.5px] focus:outline-none focus:border-rule disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              <div className="border border-rule bg-paper-cool p-5">
                <div className="eyebrow mb-3">Identifier</div>
                <dl className="space-y-2 text-[13px]">
                  <Row k="Code" v={standard.code} mono />
                  <Row k="Title (EN)" v={standard.titleEn} />
                  <Row k="Status" v={
                    <StatusPill status={standard.status} />
                  } />
                  <Row k="Category" v={C.zh} />
                  <Row k="Issuer" v={`${standard.issuer} · ${standard.issuerName}`} />
                  <Row k="Effective" v={formatDate(standard.effectiveDate)} mono />
                </dl>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </article>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-3.5 py-2.5 border-r border-rule/30 last:border-r-0">
      <div className="eyebrow">{label}</div>
      <div className="mt-0.5 font-mono-tight text-[14px]">{value}</div>
    </div>
  );
}

function Row({ k, v, mono = false }: { k: string; v: React.ReactNode; mono?: boolean }) {
  return (
    <div className="grid grid-cols-[100px,1fr] items-start gap-3">
      <dt className="eyebrow pt-0.5">{k}</dt>
      <dd className={cn(mono && "font-mono-tight text-[12.5px]")}>{v}</dd>
    </div>
  );
}

function ReferenceList({
  title,
  items,
}: {
  title: string;
  items: Array<Standard | string>;
}) {
  return (
    <div>
      <div className="eyebrow mb-3">{title}</div>
      {items.length === 0 ? (
        <p className="text-[13px] text-rule/50 italic">无关联记录</p>
      ) : (
        <ul className="space-y-2">
          {items.map((it, i) =>
            typeof it === "string" ? (
              <li
                key={i}
                className="font-mono-tight text-[12.5px] text-rule/65 border border-rule/30 px-3 py-2"
              >
                {it}
              </li>
            ) : (
              <li key={i}>
                <Link
                  to={`/standard/${it.id}`}
                  className="block border border-rule/40 bg-paper-cool px-3 py-2 hover:border-rule"
                >
                  <div className="font-mono-tight text-[12px] text-rule/75">
                    {it.code}
                  </div>
                  <div className="text-[12.5px] line-clamp-1">{it.titleZh}</div>
                  <div className="mt-1 flex items-center gap-1 font-mono-tight text-[10.5px] uppercase tracking-wider2 text-rule/55">
                    View
                    <ExternalLink className="h-2.5 w-2.5" />
                  </div>
                </Link>
              </li>
            ),
          )}
        </ul>
      )}
    </div>
  );
}
