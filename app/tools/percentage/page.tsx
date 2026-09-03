import { Metadata } from "next";
import { Percent } from "lucide-react";

import AppBreadcrumb from "@/components/shared/app-breadcrumb";
import ToolTitle from "@/components/shared/tool-title";
import ToolContent from "@/components/shared/tool-content";
import ToolActions from "@/components/shared/tool-actions";

import PercentageCalculator from "./percentage-calculator";
import { PercentageCalculatorContent } from "@/lib/tool-content-data";

export const metadata: Metadata = {
  title: "محاسبه درصد",
  description:
    "محاسبه درصد، درصد یک عدد، افزایش و کاهش درصدی به‌صورت سریع و آنلاین",
};

export default function PercentageCalculatorPage() {
  return (
    <div className="my-3 flex flex-col gap-y-3">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <AppBreadcrumb
          items={[
            { title: "خانه", href: "/" },
            { title: "ابزارها", href: "/tools" },
            { title: "محاسبه درصد" },
          ]}
        />

        <ToolActions
          toolName="محاسبه درصد"
          toolSlug="percentage-calculator"
          toolIcon="Percent"
        />
      </div>

      <div className="flex w-full flex-col gap-y-2.5">
        <ToolTitle
          icon={Percent}
          title="محاسبه درصد"
          description="محاسبه سریع درصد، افزایش و کاهش درصدی"
          variant="violet"
        />
      </div>

      <div className="my-2 w-full">
        <p className="text-sm leading-7 opacity-70">
          با استفاده از این ابزار می‌توانید درصد یک عدد، نسبت درصدی دو عدد و
          همچنین مقدار افزایش یا کاهش درصدی را به‌سرعت محاسبه کنید.
        </p>
      </div>

      <div className="mt-3 w-full">
        <PercentageCalculator />
      </div>

      <div className="mt-3 w-full">
        <ToolContent
          title={PercentageCalculatorContent.title}
          icon={PercentageCalculatorContent.icon}
          items={PercentageCalculatorContent.items}
        />
      </div>
    </div>
  );
}