"use client";

import { CalendarDays, PartyPopper, XCircle } from "lucide-react";

import { format } from "date-fns-jalali";

import { CalendarEvent } from "@/lib/calendar-types";

import { cn } from "@/lib/utils";

import { toPersianNumber } from "@/lib/number";

interface SelectedDayEventsProps {
  date: Date;

  events: CalendarEvent[];
}

export default function SelectedDayEvents({
  date,

  events,
}: SelectedDayEventsProps) {
  const formattedDate = new Intl.DateTimeFormat("fa-IR", {
    dateStyle: "full",
  }).format(date);

  return (
    <div
      className="
      w-full
      p-4
      rounded-2xl
      bg-white/60
      dark:bg-zinc-900/50
      backdrop-blur-xl
      border
      border-zinc-200
      dark:border-zinc-800
      shadow-sm
      flex
      flex-col
      gap-y-4
      "
    >
      {/* Header */}

      <div className=" flex items-center gap-x-2 ">
        <div className=" p-2 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
          <CalendarDays className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold text-zinc-800 dark:text-zinc-100">
            مناسبت‌های روز
          </h3>

          <p className=" text-x text-zinc-500 mt-0.5 ">{formattedDate}</p>
        </div>
      </div>
      {/* Events */}
      {events.length > 0 ? (
        <div className=" flex flex-col gap-y-2">
          {events.map((event, index) => (
            <div
              key={`${event.date}-${index}`}
              className={cn(
                "flex items-center justify-bet rounde border ",
                event.isHoliday
                  ? "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900/40"
                  : " bg-zinc-50 dark:bg-zinc-80 border-zinc-200 dark:border-zinc-700                ",
              )}
            >
              <div className=" flex items-center gap-x-2 ">
                {event.isHoliday ? (
                  <XCircle className=" w-4 h- text-red-500 " />
                ) : (
                  <PartyPopper className=" w-4 h-4 text-purple-500" />
                )}
                <span
                  className={cn(
                    "text-sm font-medium ",
                    event.isHoliday && "text-red-500",
                  )}
                >
                  {event.title}
                </span>
              </div>

              <span
                className="text-xs text-zinc-400
                  "
              >
                {toPersianNumber(format(date, "dd"))}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className=" flex flex-col items-center justify-center py-6 text-center">
          <CalendarDays className=" w-8 h-8 text-zinc-300 mb-2" />
          <p className=" text-s text-zinc-400">
            مناسبتی برای این روز ثبت نشده است
          </p>
        </div>
      )}
    </div>
  );
}
