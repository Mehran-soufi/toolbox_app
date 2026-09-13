import { Metadata } from "next";

import NumberConverter from "./number-converter";

import AppBreadcrumb from "@/components/shared/app-breadcrumb";
import ToolTitle from "@/components/shared/tool-title";
import ToolContent from "@/components/shared/tool-content";
import ToolActions from "@/components/shared/tool-actions";

import { NumberConverterContent } from "@/lib/tool-content-data";

import { Hash } from "lucide-react";

export const metadata: Metadata = {
  title: "تبدیل اعداد",
};

export default function NumberConverterPage() {
  return (
    <div className="my-3 flex flex-col gap-y-3">
      {/* Breadcrumb */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
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
              title: "تبدیل اعداد",
            },
          ]}
        />

        <ToolActions
          toolName="تبدیل اعداد"
          toolSlug="number-converter"
          toolIcon="Hash"
        />
      </div>

      {/* Tool Title */}
      <div className="flex w-full flex-col gap-y-2.5">
        <ToolTitle
          icon={Hash}
          title="تبدیل اعداد"
          description="تبدیل سریع اعداد فارسی، عربی و انگلیسی"
          variant="emerald"
        />
      </div>

      {/* Main Description */}
      <div className="my-2 w-full">
        <p className="text-sm leading-7 opacity-70">
          با استفاده از این ابزار می‌توانید اعداد فارسی، عربی و
          انگلیسی را به‌صورت سریع و لحظه‌ای به یکدیگر تبدیل کنید.
          متن‌های معمولی نیز حفظ می‌شوند و فقط اعداد موجود در متن
          تغییر خواهند کرد.
        </p>
      </div>

      {/* Number Converter */}
      <div className="mt-3 w-full">
        <NumberConverter />
      </div>

      {/* Description */}
      <div className="mt-3 w-full">
        <ToolContent
          title={NumberConverterContent.title}
          icon={NumberConverterContent.icon}
          items={NumberConverterContent.items}
        />
      </div>
    </div>
  );
}
