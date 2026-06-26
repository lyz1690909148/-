import { Link } from "react-router-dom";
import { Trash2, Bookmark } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { STANDARDS } from "@/data/standards";
import { StatusPill } from "@/components/StatusPill";
import { CATEGORY_LABELS } from "@/data/types";
import { Empty } from "@/components/Empty";
import { formatDate } from "@/lib/utils";

export default function Favorites() {
  const { favorites, toggleFavorite, setFavoriteNote, clearHistory } =
    useAppStore();

  const items = favorites
    .map((f) => ({
      fav: f,
      standard: STANDARDS.find((s) => s.id === f.standardId),
    }))
    .filter((x): x is { fav: typeof favorites[0]; standard: NonNullable<typeof x.standard> } => Boolean(x.standard));

  return (
    <div className="container py-8 md:py-12">
      <div className="section-eyebrow">
        <span>Bookmarks</span>
        <span className="font-mono-tight text-rule/40">
          {items.length.toString().padStart(3, "0")} saved
        </span>
      </div>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 md:mb-8">
        <h1 className="font-display text-[clamp(32px,7vw,64px)] font-700 leading-[0.95] tracking-tightest">
          收藏<span className="italic text-copper">.</span>
          <br />
          <span className="text-rule/55 text-[0.55em]">your private archive</span>
        </h1>
        <div className="flex items-center gap-2">
          <button
            onClick={clearHistory}
            className="btn-ghost"
            type="button"
          >
            <Trash2 className="h-3 w-3" /> 清空浏览历史
          </button>
        </div>
      </div>

      {items.length === 0 ? (
        <Empty
          title="收藏夹还是空的"
          description="在标准详情页点击「加入收藏」按钮，可以将常用标准收进这里，并附上你的笔记。"
          action={{ to: "/search", label: "去检索标准" }}
        />
      ) : (
        <ul className="space-y-4">
          {items.map(({ fav, standard: s }, i) => (
            <li
              key={s.id}
              className={cnx(
                "card animate-rise",
                `stagger-${Math.min(i + 1, 6)}`,
              )}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 p-4 md:p-5">
                <div className="lg:col-span-3 lg:border-r lg:border-rule/15 lg:pr-5">
                  <div className="font-mono-tight text-[12px] tracking-wider2 text-rule/70">
                    {s.code}
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    <StatusPill status={s.status} />
                  </div>
                  <div className="mt-3 font-mono-tight text-[10.5px] uppercase tracking-wider2 text-rule/55">
                    {CATEGORY_LABELS[s.category].zh} · {CATEGORY_LABELS[s.category].en}
                  </div>
                  <div className="mt-1 font-mono-tight text-[10.5px] text-rule/55">
                    Saved · {formatDate(fav.createdAt.slice(0, 10))}
                  </div>
                </div>
                <div className="lg:col-span-6">
                  <Link
                    to={`/standard/${s.id}`}
                    className="block hover:text-copper"
                  >
                    <h3 className="font-display text-[18px] md:text-[20px] font-600 leading-snug">
                      {s.titleZh}
                    </h3>
                    <p className="mt-1 text-[12.5px] italic text-rule/60 line-clamp-1">
                      {s.titleEn}
                    </p>
                  </Link>
                  <textarea
                    value={fav.note}
                    onChange={(e) => setFavoriteNote(s.id, e.target.value)}
                    rows={2}
                    placeholder="添加笔记 / 关联项目 / 内部编号……"
                    className="mt-3 w-full resize-none border border-rule/30 bg-paper px-3 py-2 text-[13px] focus:outline-none focus:border-rule"
                  />
                </div>
                <div className="lg:col-span-3 flex flex-col items-stretch justify-between gap-2">
                  <Link
                    to={`/standard/${s.id}`}
                    className="btn-primary justify-center"
                  >
                    打开详情
                  </Link>
                  <button
                    onClick={() => toggleFavorite(s.id)}
                    className="btn-ghost justify-center"
                    type="button"
                  >
                    <Bookmark className="h-3 w-3" /> 取消收藏
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function cnx(...args: (string | false | undefined | null)[]) {
  return args.filter(Boolean).join(" ");
}
