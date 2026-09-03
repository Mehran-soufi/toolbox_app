// components/day-details-panel.tsx
"use client";

import type { DayData } from "@/lib/date-utils";
import { isInHolidayList } from "@/lib/calendar-utils";
import { toPersianNumber } from "@/lib/calendar-utils";

interface Props {
  day: Date;
  data?: DayData;
  isHoliday: boolean;
}

export function DayDetailsPanel({ day, data, isHoliday }: Props) {
  if (!data) {
    return (
      <div className="mt-4 rounded-lg border border-gray-200 bg-white p-4">
        <p className="text-sm text-gray-500">برای این روز داده‌ای یافت نشد.</p>
      </div>
    );
  }

  return (
    <div className="mt-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">
          {toPersianNumber(data.dayNumber)} {data.jalali}
        </h3>
        {isHoliday && (
          <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-600">
            تعطیل
          </span>
        )}
      </div>

      <div className="mt-2 space-y-1 text-sm text-gray-600">
        <p>🕌 قمری: {toPersianNumber(data.lunar)}</p>
        <p>🌍 میلادی: {toPersianNumber(data.gregorian)}</p>
      </div>

      {data.events.length > 0 && (
        <ul className="mt-3 list-disc space-y-1 pr-5 text-sm text-gray-700">
          {data.events.map((ev, i) => (
            <li key={i}>{ev}</li>
          ))}
        </ul>
      )}
    </div>
  );
}