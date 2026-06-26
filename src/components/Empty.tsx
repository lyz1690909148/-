import { Link } from "react-router-dom";
import { Inbox } from "lucide-react";

export function Empty({
  title = "没有找到内容",
  description = "试试调整筛选条件，或返回首页重新搜索。",
  action,
}: {
  title?: string;
  description?: string;
  action?: { to: string; label: string };
}) {
  return (
    <div className="border border-dashed border-rule/50 bg-paper-cool/40 px-8 py-16 text-center">
      <div className="mx-auto h-14 w-14 border border-rule/40 flex items-center justify-center text-rule/40">
        <Inbox className="h-6 w-6" strokeWidth={1.5} />
      </div>
      <h3 className="mt-5 font-display text-[24px] font-600">{title}</h3>
      <p className="mt-2 text-[13.5px] text-rule/65 max-w-md mx-auto leading-relaxed">
        {description}
      </p>
      {action && (
        <Link
          to={action.to}
          className="mt-6 inline-flex btn-primary"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}
