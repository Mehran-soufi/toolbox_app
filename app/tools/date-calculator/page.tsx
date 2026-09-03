import { Metadata } from "next";
import { CalendarDays } from "lucide-react";

import AppBreadcrumb from "@/components/shared/app-breadcrumb";
import ToolTitle from "@/components/shared/tool-title";
import ToolContent from "@/components/shared/tool-content";
import ToolActions from "@/components/shared/tool-actions";

import DateCalculator from "./date-calculator";
import { DateCalculatorContent } from "@/lib/tool-content-data";

export const metadata: Metadata = {
  title: "محاسبه تاریخ",
  description:
    "محاسبه فاصله بین تاریخ‌ها، افزودن یا کسر تاریخ و تبدیل تاریخ شمسی و میلادی",
};

export default function DateCalculatorPage() {
  return (
    <div className="my-3 flex flex-col gap-y-3">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <AppBreadcrumb
          items={[
            { title: "خانه", href: "/" },
            { title: "ابزارها", href: "/tools" },
            { title: "محاسبه تاریخ" },
          ]}
        />

        <ToolActions
          toolName="محاسبه تاریخ"
          toolSlug="date-calculator"
          toolIcon="CalendarDays"
        />
      </div>

      <div className="flex w-full flex-col gap-y-2.5">
        <ToolTitle
          icon={CalendarDays}
          title="محاسبه تاریخ"
          description="محاسبه فاصله تاریخ‌ها، افزودن یا کسر تاریخ و تبدیل تقویم‌ها"
          variant="violet"
        />
      </div>

      <div className="my-2 w-full">
        <p className="text-sm leading-7 opacity-70">
          با استفاده از این ابزار می‌توانید فاصله بین دو تاریخ را محاسبه
          کنید، روزها و ماه‌ها را به یک تاریخ اضافه یا از آن کم کنید و
          تاریخ‌های شمسی و میلادی را به یکدیگر تبدیل کنید.
        </p>
      </div>

      <div className="mt-3 w-full">
        <DateCalculator />
      </div>

      <div className="mt-3 w-full">
        <ToolContent
          title={DateCalculatorContent.title}
          icon={DateCalculatorContent.icon}
          items={DateCalculatorContent.items}
        />
      </div>
    </div>
  );
}