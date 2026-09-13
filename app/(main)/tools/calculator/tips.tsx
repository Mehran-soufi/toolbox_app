import ToolDesTitle from "@/components/shared/tool-des-title";
import { Zap } from "lucide-react";

function Tips() {
  return (
    <div className="w-full h-full flex flex-col gap-y-1">
      <ToolDesTitle icon={Zap} title="نکات و فرمول های کاربردی" />
      <div className="w-full flex items-center justify-between gap-x-1.5 select-none lg:flex-nowrap flex-wrap">
        <div className="flex lg:w-auto w-full flex-wrap flex-col gap-y-1.5 border-b lg:border-b-0">
          <p className="text-sm text-purple-600">محاسبه درصد</p>
          <span className="opacity-60 text-xs w-full flex items-center justify-center">
            100 × (مقدار کل ÷ مقدار موجود)
          </span>
        </div>
        <div className="flex lg:w-auto w-full  flex-wrap flex-col gap-y-1.5 border-b lg:border-b-0 lg:border-r pr-1.5">
          <p className="text-sm text-purple-600">افزایش درصد</p>
          <span className="opacity-60 text-xs w-full flex items-center justify-center">
            100 × [مقدار اولیه ÷ (مقدار اولیه - مقدار جدید افزایش‌یافته)]
          </span>
        </div>
        <div className="flex lg:w-auto w-full flex-wrap flex-col gap-y-1.5 border-b lg:border-b-0 lg:border-r pr-1.5">
          <p className="text-sm text-purple-600">کاهش درصد</p>
          <span className="opacity-60 text-xs w-full flex items-center justify-center">
            100 × [مقدار اولیه ÷ (مقدار جدید کاهش‌یافته - مقدار اولیه)]
          </span>
        </div>
        <div className="flex lg:w-auto w-full  flex-wrap flex-col gap-y-1.5 border-b-0 lg:border-r pr-1.5">
          <p className="text-sm text-purple-600">تغییر علامت</p>
          <span className="opacity-60 text-xs w-full flex items-center justify-center">
            با دکمه +/- میتوانید علامت را تغییر دهید
          </span>
        </div>
      </div>
    </div>
  );
}

export default Tips;
