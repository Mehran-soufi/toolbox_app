import ToolDesTitle from "@/components/shared/tool-des-title";
import { Info, ShieldCheck } from "lucide-react";

export default function About() {
  return (
    <div className="w-full h-full flex flex-col gap-y-1 select-none">
      <ToolDesTitle icon={Info} title="درباره ماشین حساب" />
      <div className="flex items-center text-justify p-2">
        <p className="text-xs md:text-sm">این ماشین حساب به شما امکان محاسبات پایه ای شامل: جمع، تفریق، ضرب، تقسیم و درصد را به صورت دقیق و سریع انجام میدهد.</p>
      </div>
      <div className="flex flex-col gap-y-1.5 mt-3">
        <p className="text-xs md:text-sm text-purple-600 font-semibold w-full flex justify-center">عملیات قابل انجام</p>
      <ul className="flex flex-col gap-y-1 p-2">
        <li className="flex items-center gap-x-1.5">
          <ShieldCheck size={16} className="text-violet-600" />
          <span className="text-xs md:text-sm">جمع و تفریق</span>
        </li>
          <li className="flex items-center gap-x-1.5">
          <ShieldCheck size={16} className="text-violet-600" />
          <span className="text-xs md:text-sm">ضرب و تقسیم</span>
        </li>
          <li className="flex items-center gap-x-1.5">
          <ShieldCheck size={16} className="text-violet-600" />
          <span className="text-xs md:text-sm">درصد (%)</span>
        </li>
          <li className="flex items-center gap-x-1.5">
          <ShieldCheck size={16} className="text-violet-600" />
          <span className="text-xs md:text-sm">تغییر علامت (+/-)</span>
        </li>
          <li className="flex items-center gap-x-1.5">
          <ShieldCheck size={16} className="text-violet-600" />
          <span className="text-xs md:text-sm">اعداد اعشاری</span>
        </li>
      </ul>
      </div>
    </div>
  );
}
