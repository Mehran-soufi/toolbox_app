import Link from "next/link";
import {
  Boxes,
  CalendarDays,
  ExternalLink,
  Percent,
  Toolbox,
  User,
} from "lucide-react";
import ToolDesTitle from "@/components/shared/tool-des-title";

function RelatedTools() {
  return (
    <div className="w-full h-full flex flex-col gap-y-1 select-none">
      {/* title */}
      <ToolDesTitle icon={ExternalLink} title="ابزارهای مرتبط" />
      {/* body */}
      <div className="w-full h-full py-2 flex flex-col justify-between">
        <div className="w-full flex flex-col gap-1.5">
          <Link
            href="/tool/percent"
            className="flex items-center gap-x-2 hover:opacity-70 md:text-sm text-xs"
          >
            <Percent size={16} className="text-purple-700" />
            <span className="opacity-70">درصد</span>
          </Link>
          <Link
            href="/tool/percent"
            className="flex items-center gap-x-2 hover:opacity-70 md:text-sm text-xs"
          >
            <CalendarDays size={16} className="text-purple-700" />
            <span className="opacity-70">محاسبه تاریخ</span>
          </Link>
          <Link
            href="/tool/percent"
            className="flex items-center gap-x-2 hover:opacity-70 md:text-sm text-xs"
          >
            <User size={16} className="text-purple-700" />
            <span className="opacity-70">محاسبه سن</span>
          </Link>
          <Link
            href="/tool/percent"
            className="flex items-center gap-x-2 hover:opacity-70 md:text-sm text-xs"
          >
            <Boxes size={16} className="text-purple-700" />
            <span className="opacity-70">تبدیل واحد</span>
          </Link>
        </div>
        <div className="w-full flex items-center justify-center">
          <Link
            href="/tools"
            className="flex items-center justify-center gap-x-2"
          >
            <Toolbox size={16} className="text-violet-600" />
            <span className="md:text-sm text-xs text-violet-600/70 dark:text-violet-600/90">
              مشاهده همه ابزارها
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RelatedTools;
