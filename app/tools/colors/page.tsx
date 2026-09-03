import { Metadata } from "next";

import AppBreadcrumb from "@/components/shared/app-breadcrumb";
import ToolContent from "@/components/shared/tool-content";
import ToolTitle from "@/components/shared/tool-title";

import { ColorPickerContent } from "@/lib/tool-content-data";

import { Palette } from "lucide-react";
import ColorTools from "./color-tools";
import ToolActions from "@/components/shared/tool-actions";

export const metadata: Metadata = {
  title: "تشخیص رنگ",
};

export default function ColorPickerPage() {
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
              title: "تشخیص رنگ",
            },
          ]}
        />

        <ToolActions toolName="تشخیص رنگ" toolSlug="color" toolIcon="Palette" />
      </div>

      {/* Tool Title */}
      <div className="w-full flex flex-col gap-y-2.5">
        <ToolTitle
          icon={Palette}
          title="تشخیص رنگ"
          description="تشخیص سریع رنگ از دوربین یا تصویر"
          variant="violet"
        />
      </div>

      {/* Main */}
      <div className="w-full my-2">
        <p className="text-sm leading-7 opacity-70">
          با استفاده از این ابزار می‌توانید رنگ موردنظر خود را با دوربین دستگاه
          تشخیص دهید یا یک تصویر انتخاب کنید. رنگ شناسایی‌شده به‌صورت HEX، RGB و
          HSL نمایش داده می‌شود.
        </p>
      </div>

      {/* Color Picker */}
      <div className="w-full mt-3">
        {/* <ColorPicker /> */}
        <ColorTools />
      </div>

      {/* Description */}
      <div className="w-full mt-3">
        <ToolContent
          title={ColorPickerContent.title}
          icon={ColorPickerContent.icon}
          items={ColorPickerContent.items}
        />
      </div>
    </div>
  );
}
