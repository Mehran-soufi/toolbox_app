import { Metadata } from "next";

import AppBreadcrumb from "@/components/shared/app-breadcrumb";
import ToolTitle from "@/components/shared/tool-title";
import { Timer } from "lucide-react";
import ToolContent from "@/components/shared/tool-content";
import { stopwatchContent } from "@/lib/tool-content-data";
import StopWatch from "./stop-watch";
import ToolActions from "@/components/shared/tool-actions";

export const metadata: Metadata = {
  title: "کرونومتر",
};

export default function StopwatchPage() {
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
              title: "کرونومتر",
            },
          ]}
        />

        <ToolActions
          toolName="کرونومتر"
          toolSlug="stopwatch"
          toolIcon="Timer"
        />
      </div>

      <div className="w-full flex flex-col gap-y-2.5">
        {/* Tool Title */}

        <ToolTitle
          icon={Timer}
          title="کرونومتر"
          description="زمان‌سنج دقیق برای تمرینات، آشپزی یا مدیریت پروژه‌ها"
          variant="blue"
        />
      </div>

      {/* Stop Watch */}
      <StopWatch />
      {/* Description */}
      <div className="w-full mt-3">
        <ToolContent
          title={stopwatchContent.title}
          icon={stopwatchContent.icon}
          items={stopwatchContent.items}
        />
      </div>
    </div>
  );
}
