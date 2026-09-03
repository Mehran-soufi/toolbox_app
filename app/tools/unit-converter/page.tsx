import { Metadata } from "next";

import UnitConverter from "./unit-converter";

import AppBreadcrumb from "@/components/shared/app-breadcrumb";
import ToolTitle from "@/components/shared/tool-title";
import ToolContent from "@/components/shared/tool-content";

import { UnitConverterContent } from "@/lib/tool-content-data";

import { Ruler } from "lucide-react";
import ToolActions from "@/components/shared/tool-actions";

export const metadata: Metadata = {
  title: "تبدیل واحد",
};

export default function UnitConvertPage() {
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
              title: "تبدیل واحد",
            },
          ]}
        />

        <ToolActions
          toolName="تبدیل واحد"
          toolSlug="unit-converter"
          toolIcon="Ruler"
        />
      </div>

      {/* Tool Title */}
      <div className="w-full flex flex-col gap-y-2.5">
        <ToolTitle
          icon={Ruler}
          title="تبدیل واحد"
          description="تبدیل سریع و آسان واحدهای مختلف"
          variant="violet"
        />
      </div>

      {/* Main */}
      <div className="w-full my-2">
        <p className="text-sm leading-7 opacity-70">
          با استفاده از این ابزار می‌توانید مقدار موردنظر خود را بین واحدهای
          مختلف طول، وزن، دما، حجم، زمان، مساحت، سرعت و حافظه دیجیتال به‌صورت
          سریع و لحظه‌ای تبدیل کنید.
        </p>
      </div>

      {/* Unit Converter */}
      <div className="w-full mt-3">
        <UnitConverter />
      </div>

      {/* Description */}
      <div className="w-full mt-3">
        <ToolContent
          title={UnitConverterContent.title}
          icon={UnitConverterContent.icon}
          items={UnitConverterContent.items}
        />
      </div>
    </div>
  );
}
