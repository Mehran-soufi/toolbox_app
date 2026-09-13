import { Metadata } from "next";

import AppBreadcrumb from "@/components/shared/app-breadcrumb";
import ToolTitle from "@/components/shared/tool-title";
import ToolContent from "@/components/shared/tool-content";
import { translatorContent } from "@/lib/tool-content-data";
import Translate from "./translate";
import { Languages } from "lucide-react";
import ToolActions from "@/components/shared/tool-actions";

export const metadata: Metadata = {
  title: "مترجم متن",
};

export default function TranslatorPage() {
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
              title: "مترجم متن",
            },
          ]}
        />
        <ToolActions
          toolName="مترجم متن"
          toolSlug="translator"
          toolIcon="Languages"
        />
      </div>

      <div className="w-full flex flex-col gap-y-2.5">
        {/* Tool Title */}

        <ToolTitle
          icon={Languages}
          title="مترجم متن"
          description="ابزاری هوشمند برای ترجمه سریع و دقیق کلمات، جملات و پاراگراف‌ها در زبان‌های مختلف."
          variant="emerald"
        />
      </div>

      {/* Translate */}
      <Translate />

      {/* Description */}
      <div className="w-full mt-3">
        <ToolContent
          title={translatorContent.title}
          icon={translatorContent.icon}
          items={translatorContent.items}
        />
      </div>
    </div>
  );
}
