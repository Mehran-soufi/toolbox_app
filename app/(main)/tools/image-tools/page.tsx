import { Metadata } from "next";

import AppBreadcrumb from "@/components/shared/app-breadcrumb";
import ToolContent from "@/components/shared/tool-content";
import ToolTitle from "@/components/shared/tool-title";
import { imageContent } from "@/lib/tool-content-data";
import { Image as ImageIcon } from "lucide-react";
import ImageConverter from "./image-converter";
import ToolActions from "@/components/shared/tool-actions";

export const metadata: Metadata = {
  title: "تبدیل تصویر",
};

export default function ImageToolsPage() {
  return (
    <div className="w-full">
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
              title: "تبدیل تصویر",
            },
          ]}
        />
        <ToolActions
          toolName="تبدیل تصویر"
          toolSlug="image-tools"
          toolIcon="ImageIcon"
        />
      </div>

      <div className="w-full flex flex-col gap-y-2.5 my-3">
        {/* Tool Title */}
        <ToolTitle
          icon={ImageIcon}
          title="تبدیل تصویر"
          description="تبدیل، فشرده‌سازی و تغییر اندازه تصاویر"
          variant="emerald"
        />

        {/* Tool */}
        <div className="w-full mt-1">
          <ImageConverter />
        </div>

        {/* Description */}
        <div className="w-full mt-3">
          <ToolContent
            title="تبدیل تصویر"
            icon={ImageIcon}
            items={imageContent.items}
          />
        </div>
      </div>
    </div>
  );
}
