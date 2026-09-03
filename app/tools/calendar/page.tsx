import { Metadata } from "next";

import AppBreadcrumb from "@/components/shared/app-breadcrumb";
import ToolContent from "@/components/shared/tool-content";
import ToolTitle from "@/components/shared/tool-title";
import { calendarContent } from "@/lib/tool-content-data";
import { Calendar } from "lucide-react";
import { CalendarEvent } from "@/lib/calendar-types";
import CalendarContainer from "./calendar-container";
import ToolActions from "@/components/shared/tool-actions";

export const metadata: Metadata = {
  title: "تقویم",
};

interface CalendarPageProps {
  events?: CalendarEvent[];
}

export default function CalendarPage({
  events: propsEvents,
}: CalendarPageProps) {
  const events: CalendarEvent[] =
    propsEvents && propsEvents.length > 0
      ? propsEvents
      : [
          { date: "1402/12/25", title: "تست: عید نوروز", isHoliday: true },
          { date: "1402/12/26", title: "تست: جلسه کاری", isHoliday: false },
        ];

  return (
    <div className="my-3 flex flex-col gap-y-3">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between flex-wrap gap-3 mb-3">
        <AppBreadcrumb
          items={[
            { title: "خانه", href: "/" },
            { title: "ابزارها", href: "/tools" },
            { title: "تقویم", href: "#" },
          ]}
        />

        <ToolActions toolName="تقویم" toolSlug="calendar" toolIcon="Calendar" />
      </div>

      <div className="w-full flex flex-col gap-y-2.5">
        {/* Tool Title */}
        <ToolTitle
          icon={Calendar}
          title="تقویم"
          description="مدیریت هوشمند تاریخ‌ها، مناسبت‌ها و برنامه‌ریزی روزانه شما"
          variant="purple"
        />
      </div>

      {/* 1. Main Calendar Section */}
      <div className="w-full">
        <CalendarContainer />
      </div>

      {/* Description Section */}
      <div className="w-full mt-3">
        <ToolContent
          title={calendarContent.title}
          icon={calendarContent.icon}
          items={calendarContent.items}
        />
      </div>
    </div>
  );
}
