import { Metadata } from "next";

import ToolContent from "@/components/shared/tool-content";
import { calculatorContent } from "@/lib/tool-content-data";
import AppBreadcrumb from "@/components/shared/app-breadcrumb";
import ToolTitle from "@/components/shared/tool-title";
import { Calculator } from "lucide-react";
import CalculatorOption from "./calculatorOption";
import ToolActions from "@/components/shared/tool-actions";

export const metadata: Metadata = {
  title: "ماشین حساب",
};

function CalculatorPage() {
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
            title: "ماشین حساب",
          },
        ]}
      />
        <ToolActions
          toolName="ماشین حساب"
          toolSlug="calculator"
          toolIcon="Calculator"
        />
      </div>


      <div className="w-full flex flex-col gap-y-2.5">
        {/* Tool Title */}

        <ToolTitle
          icon={Calculator}
          title="ماشین حساب"
          description="محاسبات دقیق و پیشرفته برای نیازهای شما"
          variant="emerald"
        />
        {/* Main */}
        <CalculatorOption />
        {/* Description */}
        <div className="w-full mt-3">
          <ToolContent
            title={calculatorContent.title}
            icon={calculatorContent.icon}
            items={calculatorContent.items}
          />
        </div>
      </div>
    </div>
  );
}

export default CalculatorPage;
