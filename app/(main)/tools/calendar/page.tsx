import { Metadata } from "next";
import AppBreadcrumb from "@/components/shared/app-breadcrumb";
import ToolActions from "@/components/shared/tool-actions";
import ToolContent from "@/components/shared/tool-content";
import ToolTitle from "@/components/shared/tool-title";
import { calendarContent } from "@/lib/tool-content-data";
import { Calendar } from "lucide-react";
import CalendarContainer from "./calendar-container";

export const metadata: Metadata = {
  title: "تقویم",
};

export default function CalendarPage() {
  return (
    <div className="my-3 flex flex-col gap-y-3">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <AppBreadcrumb
          items={[
            { title: "خانه", href: "/" },
            { title: "ابزارها", href: "/tools" },
            { title: "تقویم", href: "#" },
          ]}
        />

        <ToolActions
          toolName="تقویم"
          toolSlug="calendar"
          toolIcon="Calendar"
        />
      </div>

      <div className="flex w-full flex-col gap-y-2.5">
        <ToolTitle
          icon={Calendar}
          title="تقویم"
          description="مدیریت هوشمند تاریخ‌ها، مناسبت‌ها و برنامه‌ریزی روزانه شما"
          variant="purple"
        />
      </div>

      <div className="w-full">
        <CalendarContainer />
      </div>

      <div className="mt-3 w-full">
        <ToolContent
          title={calendarContent.title}
          icon={calendarContent.icon}
          items={calendarContent.items}
        />
      </div>
    </div>
  );
}
