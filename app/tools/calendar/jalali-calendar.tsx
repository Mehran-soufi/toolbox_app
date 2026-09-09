"use client";

import {
  addMonths,
  addYears,
  format,
  getDate,
  isSameDay,
  isSameMonth,
  subMonths,
} from "date-fns-jalali";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toPersianNumber } from "@/lib/number";
import { checkHoliday } from "@/lib/calendar-utils";
import { CalendarEvent } from "@/lib/calendar-types";

interface JalaliCalendarProps {
  viewDate: Date;
  setViewDate: React.Dispatch<React.SetStateAction<Date>>;
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
  viewMode: "days" | "years";
  setViewMode: React.Dispatch<React.SetStateAction<"days" | "years">>;
  daysOfWeek: string[];
  calendarDays: (Date | null)[];
  yearsList: number[];
  isShowingToday: boolean;
  holidayDates: string[];
  selectedDayEvents: CalendarEvent[];
  isLoading: boolean;
  hasError: boolean;
  getEventsForDay: (date: Date) => CalendarEvent[];
}

export default function JalaliCalendar({
  viewDate,
  setViewDate,
  selectedDate,
  setSelectedDate,
  viewMode,
  setViewMode,
  daysOfWeek,
  calendarDays,
  yearsList,
  isShowingToday,
  holidayDates,
  getEventsForDay,
}: JalaliCalendarProps) {
  const gregorianFormatter = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
  });

  const islamicFormatter = new Intl.DateTimeFormat("fa-IR-u-ca-islamic", {
    day: "numeric",
  });

  return (
    <div className="flex w-full flex-col gap-y-3 xl:p-4 lg:p-3">
      <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white/60 shadow-2xl backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-900/50">
        <div className="flex items-center justify-between border-b border-zinc-200 p-5 dark:border-zinc-800 sm:p-6">
          {viewMode === "days" && (
            <button
              onClick={() => setViewDate(subMonths(viewDate, 1))}
              className="rounded-full p-2 transition hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}

          <div className="flex-1 text-center">
            {viewMode === "days" ? (
              <>
                <h2 className="text-lg font-bold text-zinc-800 dark:text-zinc-100 sm:text-xl lg:text-2xl">
                  {format(viewDate, "MMMM yyyy")}
                </h2>

                <button
                  onClick={() => setViewMode("years")}
                  className="mx-auto mt-1 flex items-center justify-center gap-1 text-xs text-zinc-500 hover:text-purple-500"
                >
                  {format(viewDate, "yyyy")}
                  <ChevronDown className="h-3 w-3" />
                </button>
              </>
            ) : (
              <h2 className="text-xl font-bold">انتخاب سال</h2>
            )}
          </div>

          {viewMode === "days" && (
            <button
              onClick={() => setViewDate(addMonths(viewDate, 1))}
              className="rounded-full p-2 transition hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}
        </div>

        <div className="border-b border-zinc-200 bg-zinc-50/50 p-3 text-center text-xs dark:border-zinc-800 dark:bg-zinc-800/30 sm:text-sm">
          <span className="font-semibold text-purple-600 dark:text-purple-400">
            {new Intl.DateTimeFormat("fa-IR").format(selectedDate)}
          </span>

          <span className="mx-2 text-zinc-300">|</span>

          <span className="text-zinc-500">
            {new Intl.DateTimeFormat("en-US").format(selectedDate)}
          </span>

          <span className="mx-2 text-zinc-300">|</span>

          <span className="text-zinc-500">
            {new Intl.DateTimeFormat("fa-IR-u-ca-islamic").format(selectedDate)}
          </span>
        </div>

        <div className="p-2 sm:p-4">
          {viewMode === "days" ? (
            <>
              <div className="mb-3 grid grid-cols-7">
                {daysOfWeek.map((day) => (
                  <div
                    key={day}
                    className="text-center text-xs font-bold text-zinc-400"
                  >
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, index) => {
                  if (!day) {
                    return <div key={index} />;
                  }

                  const currentMonth = isSameMonth(day, viewDate);
                  const holiday = checkHoliday(day, holidayDates);
                  const dayEvents = getEventsForDay(day);
                  const hasEvent = dayEvents.length > 0;

                  return (
                    <button
                      key={index}
                      disabled={!currentMonth}
                      onClick={() => setSelectedDate(day)}
                      className={cn(
                        "relative flex aspect-square flex-col items-center justify-center rounded-lg border transition",
                        !currentMonth && "opacity-30",
                        isSameDay(day, selectedDate)
                          ? "border-purple-600 bg-purple-600 text-white"
                          : holiday
                            ? "border-red-200 bg-red-50 text-red-500 dark:border-red-900 dark:bg-red-950/20"
                            : "border-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800",
                      )}
                    >
                      <span className="text-base font-bold sm:text-lg">
                        {toPersianNumber(getDate(day))}
                      </span>

                      {(holiday || hasEvent) && (
                        <span className="absolute bottom-1 h-1 w-1 rounded-full bg-current" />
                      )}

                      <div className="absolute bottom-0.5 flex w-full justify-between px-1 text-[8px] text-zinc-400">
                        <span>{gregorianFormatter.format(day)}</span>
                        <span>{islamicFormatter.format(day)}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="grid grid-cols-3 gap-3">
              {yearsList.map((year) => (
                <button
                  key={year}
                  onClick={() => {
                    const current = Number(format(viewDate, "yyyy"));
                    setViewDate(addYears(viewDate, year - current));
                    setViewMode("days");
                  }}
                  className="rounded-xl py-4 transition hover:bg-purple-600 hover:text-white"
                >
                  {year}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {!isShowingToday && (
        <div className="rounded-xl border border-zinc-200 bg-white/60 dark:border-zinc-800 dark:bg-zinc-900/50">
          <Button
            variant="outline"
            onClick={() => {
              const today = new Date();
              setViewDate(today);
              setSelectedDate(today);
            }}
            className="h-11 w-full bg-transparent transition hover:bg-purple-600 hover:text-white"
          >
            <RotateCcw className="h-4 w-4" />
            برگشت به امروز
          </Button>
        </div>
      )}
    </div>
  );
}
