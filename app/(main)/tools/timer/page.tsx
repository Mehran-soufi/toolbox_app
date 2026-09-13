import { Metadata } from "next";

import AppBreadcrumb from "@/components/shared/app-breadcrumb";
import ToolContent from "@/components/shared/tool-content";
import ToolTitle from "@/components/shared/tool-title";
import { timerContent } from "@/lib/tool-content-data";
import { Timer } from "lucide-react";
import TimerComponent from "./timer";
import ToolActions from "@/components/shared/tool-actions";

export const metadata: Metadata = {
  title: "تایمر",
};

export default function TimerPage() {
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
              title: "تایمر",
            },
          ]}
        />

        <ToolActions toolName="تایمر" toolSlug="timer" toolIcon="Timer" />
      </div>

      <div className="w-full flex flex-col gap-y-2.5">
        {/* Tool Title */}

        <ToolTitle
          icon={Timer}
          title="تایمر"
          description="مدیریت زمان با دقیق ترین ابزار"
          variant="rose"
        />
      </div>
      <div className="w-full my-3">
        <TimerComponent />
      </div>
      {/* Description */}
      <div className="w-full mt-3">
        <ToolContent
          title={timerContent.title}
          icon={timerContent.icon}
          items={timerContent.items}
        />
      </div>
    </div>
  );
}
