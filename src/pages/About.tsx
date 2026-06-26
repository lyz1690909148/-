import { Link } from "react-router-dom";
import { ArrowUpRight, Library } from "lucide-react";

export default function About() {
  return (
    <div className="container py-14 max-w-4xl">
      <div className="section-eyebrow">
        <span>About</span>
        <span className="font-mono-tight text-rule/40">Manifesto</span>
      </div>
      <h1 className="font-display text-[clamp(36px,5.5vw,72px)] font-700 leading-[0.95] tracking-tightest text-balance">
        关于
        <span className="italic text-copper">Standardum</span>
        <br />
        <span className="text-rule/55 text-[0.45em]">A small archive for big standards</span>
      </h1>

      <div className="mt-10 grid md:grid-cols-2 gap-10">
        <div className="space-y-5 text-[15px] leading-[1.85] text-rule/85 font-display">
          <p>
            Standardum 是一座试验标准档案馆。
            我们整理来自 GB / ISO / ASTM / IEC / JIS / DIN / BS / EN / NF / GJB 的常用标准，
            将原本散落在 PDF 里的元信息提炼为可即时检索、可对比、可收藏的活档案。
          </p>
          <p>
            在这里，编号、适用范围、试验条件、版本沿革、引用与被引都被组织成一致的结构。
            你可以按领域、机构、年份、状态多维筛选；可以点击任意一条记录查看其原理、
            仪器设备和历史修订。
          </p>
        </div>
        <div className="border border-rule bg-paper-cool p-6">
          <div className="eyebrow mb-3">Field legend</div>
          <dl className="space-y-3 text-[13.5px]">
            <Legend k="Code" v="标准编号，如 GB/T 228.1-2010" />
            <Legend k="Title" v="中英文双标题" />
            <Legend k="Scope" v="适用范围与方法概要" />
            <Legend k="Conditions" v="主要试验条件" />
            <Legend k="Apparatus" v="主要仪器设备" />
            <Legend k="References" v="引用 / 被引标准" />
            <Legend k="Revisions" v="版本沿革（替代关系）" />
          </dl>
        </div>
      </div>

      <div className="mt-12 grid sm:grid-cols-3 gap-3">
        <Kpi label="Records" value="64" suffix="standards" />
        <Kpi label="Issuers" value="10" suffix="GB / ISO / ASTM / IEC / JIS / DIN / BS / EN / NF / GJB" />
        <Kpi label="Categories" value="6" suffix="material · mech · env · ee · build · chem" />
      </div>

      <div className="mt-12 border-t border-rule pt-8 flex flex-wrap items-center gap-3">
        <Link to="/search" className="btn-primary">
          <Library className="h-3.5 w-3.5" />
          开始检索
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
        <a
          href="https://www.iso.org/standards.html"
          target="_blank"
          rel="noreferrer"
          className="btn-ghost"
        >
          参考 · ISO 官方
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}

function Legend({ k, v }: { k: string; v: string }) {
  return (
    <div className="grid grid-cols-[110px,1fr] items-start gap-3 border-b border-rule/15 pb-2 last:border-b-0">
      <dt className="font-mono-tight text-[12px] uppercase tracking-wider2 text-rule/55">
        {k}
      </dt>
      <dd className="text-rule/80">{v}</dd>
    </div>
  );
}

function Kpi({
  label,
  value,
  suffix,
}: {
  label: string;
  value: string;
  suffix: string;
}) {
  return (
    <div className="border border-rule bg-paper-cool p-5">
      <div className="eyebrow">{label}</div>
      <div className="mt-2 font-display text-[40px] font-700 leading-none">
        {value}
      </div>
      <div className="mt-2 text-[12px] text-rule/65 leading-snug">{suffix}</div>
    </div>
  );
}
