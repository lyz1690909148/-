import { Outlet, NavLink, Link } from "react-router-dom";
import { Search, Bookmark, BookOpen, Info, Library } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", label: "检索台", icon: Search, end: true },
  { to: "/search", label: "结果", icon: Library },
  { to: "/favorites", label: "收藏夹", icon: Bookmark },
  { to: "/about", label: "关于", icon: Info },
];

export default function Shell() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* ── Header ──────────────────────────────────── */}
      <header className="sticky top-0 z-30 border-b border-rule bg-paper/85 backdrop-blur-md">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="group flex items-center gap-3">
            <div className="relative h-9 w-9 border border-rule bg-ink text-paper flex items-center justify-center transition-all group-hover:bg-copper">
              <BookOpen className="h-4 w-4" strokeWidth={1.75} />
              <span className="absolute -right-1 -bottom-1 h-2 w-2 bg-copper" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display text-[20px] font-700 tracking-tight">
                Standardum
              </span>
              <span className="font-mono-tight text-[10px] uppercase tracking-wider2 text-rule/60">
                试验标准档案库 · v0.1
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  cn(
                    "group flex items-center gap-2 px-3.5 py-2 font-mono-tight text-[11.5px] uppercase tracking-wider2 border border-transparent",
                    isActive
                      ? "bg-ink text-paper border-rule"
                      : "text-rule/80 hover:bg-paper-warm",
                  )
                }
              >
                <item.icon className="h-3.5 w-3.5" strokeWidth={1.75} />
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <span className="eyebrow">No.024 · MMXXVI</span>
            <span className="h-4 w-px bg-rule/30" />
            <span className="font-mono-tight text-[11px] text-rule/60">
              Last sync · 26.06.2026
            </span>
          </div>
        </div>
        {/* mobile nav */}
        <nav className="md:hidden flex overflow-x-auto border-t border-rule/30 px-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  "flex shrink-0 items-center gap-1.5 px-3 py-2 font-mono-tight text-[10.5px] uppercase tracking-wider2",
                  isActive ? "text-copper" : "text-rule/60",
                )
              }
            >
              <item.icon className="h-3 w-3" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      {/* ── Footer ──────────────────────────────────── */}
      <footer className="border-t border-rule bg-ink text-paper">
        <div className="container py-8 grid gap-6 md:grid-cols-3 text-[12.5px]">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="h-4 w-4" />
              <span className="font-display text-[18px]">Standardum</span>
            </div>
            <p className="text-paper/70 leading-relaxed">
              为工程师、检测人员与研究者整理的试验标准档案库。
              收录的元信息均来自公开标准，文档以可检索、可对比、可收藏的方式呈现。
            </p>
          </div>
          <div>
            <h4 className="font-mono-tight text-[10.5px] uppercase tracking-wider2 text-paper/50 mb-3">
              索引范围
            </h4>
            <ul className="space-y-1 text-paper/80">
              <li>材料 / 机械 / 建筑工程</li>
              <li>电子电气 / EMC</li>
              <li>环境与可靠性 / 化工</li>
            </ul>
          </div>
          <div>
            <h4 className="font-mono-tight text-[10.5px] uppercase tracking-wider2 text-paper/50 mb-3">
              收录机构
            </h4>
            <ul className="space-y-1 text-paper/80 font-mono-tight text-[11.5px]">
              <li>GB · ISO · ASTM · IEC · JIS</li>
              <li>DIN · BS · EN · NF · GJB</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-paper/15">
          <div className="container py-4 flex flex-wrap items-center justify-between gap-2 font-mono-tight text-[10.5px] uppercase tracking-wider2 text-paper/50">
            <span>© 2026 Standardum · Made for engineers</span>
            <span>数据 · mock · for demo only</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
