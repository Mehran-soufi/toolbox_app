"use client";

import { CalendarOff } from "lucide-react";

import { CalendarEvent } from "@/lib/calendar-types";

import { toPersianNumber } from "@/lib/number";

interface Props {
  events: CalendarEvent[];
}

export default function MonthHolidays({ events }: Props) {
  const holidays = events.filter((item) => item.isHoliday);

  return (
    <div
      className=" w-full p-4 rounded-2xl bg-white/60 dark:bg-zinc-900/50 backdrop-blur-xl border
      border-zinc-200 dark:border-zinc-800 shadow-sm"
    >
      <div className=" flex items-center gap-2 mb-4 ">
        <div className=" p-2 rounded-xl bg-red-100 dark:bg-red-950/30 text-red-500">
          <CalendarOff className="w-5 h-5" />
        </div>
        <h3 className="font-bold text-zinc-800 dark:text-zinc-100">
          تعطیلات این ماه
        </h3>
      </div>

      {holidays.length > 0 ? (
        <div className="flex flex-col gap-y-2 ">
          {holidays.map((item, index) => (
            <div
              key={index}
              className=" flex items-center justify-between p-3 rounded-x bg-red-5 dark:bg-red-950/20 text-sm"
            >
              <span className="text-red-500 font-medium">{item.title}</span>
              <span className="text-zinc-500 text-xs">
                {toPersianNumber(item.date)}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-zinc-400">تعطیلی رسمی وجود ندارد.</p>
      )}
    </div>
  );
}
