import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container py-16 md:py-20 text-center">
      <div className="font-mono-tight text-[12px] uppercase tracking-wider2 text-rule/60">
        Error · 404
      </div>
      <h1 className="mt-4 font-display text-[clamp(40px,9vw,96px)] font-700 leading-[0.95] tracking-tightest">
        Not <span className="italic text-copper">indexed</span>.
      </h1>
      <p className="mt-4 text-[14.5px] text-rule/65 max-w-md mx-auto">
        这条记录尚未收录，或编号路径不存在。回到首页继续检索。
      </p>
      <Link to="/" className="mt-8 inline-flex btn-primary">
        返回首页
      </Link>
    </div>
  );
}
