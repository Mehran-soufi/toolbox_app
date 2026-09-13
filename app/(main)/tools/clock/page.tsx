import { Metadata } from "next";

import AppBreadcrumb from "@/components/shared/app-breadcrumb";
import ToolContent from "@/components/shared/tool-content";
import ToolTitle from "@/components/shared/tool-title";
import { clockContent } from "@/lib/tool-content-data";
import { Clock } from "lucide-react";
import ClockContainer from "./clock-container";
import ToolActions from "@/components/shared/tool-actions";

export const metadata: Metadata = {
  title: "ساعت",
};

export default function ClockPage() {
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
              title: "ساعت",
            },
          ]}
        />

        <ToolActions toolName="ساعت" toolSlug="clock" toolIcon="Clock" />
      </div>

      <div className="w-full flex flex-col gap-y-2.5">
        {/* Tool Title */}

        <ToolTitle
          icon={Clock}
          title="ساعت"
          description="مدیریت زمان با دقیق ترین ابزار"
          variant="emerald"
        />
      </div>
      {/* Main Body */}
      <ClockContainer />

      {/* Description */}
      <div className="w-full mt-3">
        <ToolContent
          title={clockContent.title}
          icon={clockContent.icon}
          items={clockContent.items}
        />
      </div>
    </div>
  );
}
