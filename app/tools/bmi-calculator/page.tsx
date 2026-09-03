// app/tools/bmi/page.tsx
import { Metadata } from "next";

import AppBreadcrumb from "@/components/shared/app-breadcrumb";
import ToolTitle from "@/components/shared/tool-title";
import ToolContent from "@/components/shared/tool-content";
import { bmiContent } from "@/lib/tool-content-data";
import BMICalculator from "./bmi-calculator";
import { Weight } from "lucide-react";
import ToolActions from "@/components/shared/tool-actions";

export const metadata: Metadata = {
  title: "محاسبه BMI | شاخص توده بدنی",
  description: "ابزار محاسبه BMI برای بررسی وضعیت وزنی بر اساس قد و وزن",
};

export default function BMIPage() {
  return (
    <div className="my-3 flex flex-col gap-y-3">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between flex-wrap gap-3 mb-3">
        <AppBreadcrumb
          items={[
            {
              title: "خانه",
              href: "/",
            },
            {
              title: "ابزارها",
              href: "/tools",
            },
            {
              title: "محاسبه BMI",
            },
          ]}
        />
        <ToolActions
          toolName="محاسبه BMI"
          toolSlug="bmi-calculator"
          toolIcon="Weight"
        />
      </div>

      <div className="w-full flex flex-col gap-y-2.5">
        {/* Tool Title */}
        <ToolTitle
          icon={Weight}
          title="محاسبه BMI"
          description="شاخص توده بدنی (BMI) خود را بر اساس قد و وزن محاسبه کرده و وضعیت وزنی خود را بررسی کنید."
          variant="emerald"
        />
      </div>

      {/* BMI Calculator */}
      <BMICalculator />

      {/* Description */}
      <div className="w-full mt-3">
        <ToolContent
          title={bmiContent.title}
          icon={bmiContent.icon}
          items={bmiContent.items}
        />
      </div>
    </div>
  );
}
