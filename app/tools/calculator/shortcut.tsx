import ToolDesTitle from "@/components/shared/tool-des-title";
import { Keyboard } from "lucide-react";

function Shortcut() {
  return (
    <div className="w-full h-full flex flex-col gap-y-1 select-none">
      <ToolDesTitle icon={Keyboard} title="میانبر های صفحه کلید" />
      <div className="w-full flex flex-col gap-y-2">
        <div className="flex items-center justify-between md:text-sm text-xs">
            <p>حذف آخرین رقم</p>
            <span className="p-1 dark:bg-zinc-600/60 bg-zinc-400/60 rounded-lg">backspace</span>
        </div>
          <div className="flex items-center justify-between md:text-sm text-xs">
            <p>پاک کردن همه</p>
            <span className="p-1 dark:bg-zinc-600/60 bg-zinc-400/60 rounded-lg">esc</span>
        </div>
           <div className="flex items-center justify-between md:text-sm text-xs">
            <p>محاسبه نتیجه</p>
            <span className="p-1 dark:bg-zinc-600/60 bg-zinc-400/60 rounded-lg">enter</span>
        </div>
           <div className="flex items-center justify-between md:text-sm text-xs">
            <p>چهار عمل اصلی</p>
            <span className="p-1 dark:bg-zinc-600/60 bg-zinc-400/60 rounded-lg">+ - / *</span>
        </div>
          <div className="flex items-center justify-between md:text-sm text-xs">
            <p>درصد</p>
            <span className="p-1 dark:bg-zinc-600/60 bg-zinc-400/60 rounded-lg">%</span>
        </div>
      </div>
    </div>
  );
}

export default Shortcut;
