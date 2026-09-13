"use client";

import { CalendarDays } from "lucide-react";

import { CalendarEvent } from "@/lib/calendar-types";

interface Props {
  events: CalendarEvent[];
}

export default function MonthEvents({ events }: Props) {
  const occasions = events.filter((item) => !item.isHoliday);

  return (
    <div
      className=" w-full p-4 rounded-2xl bg-white/60 dark:bg-zinc-900/50 backdrop-blur-xl border
    border-zinc-200 dark:border-zinc-800 shadow-sm"
    >
      <div className=" flex items-center gap-2 mb-4">
        <div className="p-2 rounded-x bg-purple-10 dark:bg-purple-950/3 text-purple-500">
          <CalendarDays className="w-5 h-5" />
        </div>

        <h3 className=" font-bol text-zinc-80 dark:text-zinc-100">
          مناسبت‌های این ماه
        </h3>
      </div>

      {occasions.length > 0 ? (
        <div className=" flex flex-col gap-y-2 ">
          {occasions.map((item, index) => (
            <div
              key={index}
              className=" flex justify-between items-center p-3 rounded-x bg-zinc-5 dark:bg-zinc-800/50 text-sm"
            >
              <span>{item.title}</span>
              <span className="text-xs text-zinc-400">{item.date}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-zinc-400">مناسبتی ثبت نشده است.</p>
      )}
    </div>
  );
}
