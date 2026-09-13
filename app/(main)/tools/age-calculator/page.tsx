import { Metadata } from "next";
import { Cake } from "lucide-react";

import AppBreadcrumb from "@/components/shared/app-breadcrumb";
import ToolTitle from "@/components/shared/tool-title";
import ToolContent from "@/components/shared/tool-content";
import ToolActions from "@/components/shared/tool-actions";

import AgeCalculator from "./age-calculator";
import { AgeCalculatorContent } from "@/lib/tool-content-data";

export const metadata: Metadata = {
  title: "محاسبه سن",
  description:
    "محاسبه دقیق سن، تاریخ تولد بعدی، تعداد روزهای زندگی و اطلاعات تولد",
};

export default function AgeCalculatorPage() {
  return (
    <div className="my-3 flex flex-col gap-y-3">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <AppBreadcrumb
          items={[
            { title: "خانه", href: "/" },
            { title: "ابزارها", href: "/tools" },
            { title: "محاسبه سن" },
          ]}
        />

        <ToolActions
          toolName="محاسبه سن"
          toolSlug="age-calculator"
          toolIcon="Cake"
        />
      </div>

      <div className="flex w-full flex-col gap-y-2.5">
        <ToolTitle
          icon={Cake}
          title="محاسبه سن"
          description="محاسبه دقیق سن و اطلاعات مربوط به تاریخ تولد"
          variant="violet"
        />
      </div>

      <div className="my-2 w-full">
        <p className="text-sm leading-7 opacity-70">
          تاریخ تولد خود را وارد کنید تا سن دقیق، تعداد روزهای
          سپری‌شده، تولد بعدی، روز هفته تولد و اطلاعات مربوط
          به سال و ماه تولد شما محاسبه شود.
        </p>
      </div>

      <div className="mt-3 w-full">
        <AgeCalculator />
      </div>

      <div className="mt-3 w-full">
        <ToolContent
          title={AgeCalculatorContent.title}
          icon={AgeCalculatorContent.icon}
          items={AgeCalculatorContent.items}
        />
      </div>
    </div>
  );
}