"use client";

import {
  format,
  addMonths,
  subMonths,
  addYears,
  isSameDay,
  getDate,
  isSameMonth,
} from "date-fns-jalali";

import {
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  RotateCcw,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toPersianNumber } from "@/lib/number";
import { checkHoliday } from "@/lib/calendar-utils";
import { Dispatch, SetStateAction } from "react";
import { CalendarEvent } from "@/lib/calendar-types";

interface JalaliCalendarProps {
  viewDate: Date;

  setViewDate: React.Dispatch<
    React.SetStateAction<Date>
  >;

  selectedDate: Date;

  setSelectedDate: React.Dispatch<
    React.SetStateAction<Date>
  >;

  viewMode: "days" | "years";

  setViewMode: React.Dispatch<
    React.SetStateAction<"days" | "years">
  >;

  daysOfWeek: string[];

  calendarDays: (Date | null)[];

  yearsList: number[];

  isShowingToday: boolean;

  holidayDates: string[];

  selectedDayEvents: CalendarEvent[];

  getEventsForDay: (date: Date) => CalendarEvent[];

  isLoading: boolean;

  hasError: boolean;
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

  selectedDayEvents,

  getEventsForDay,

  isLoading,
  hasError,
}: JalaliCalendarProps) {
  const gregorianFormatter = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
  });

  const islamicFormatter = new Intl.DateTimeFormat("fa-IR-u-ca-islamic", {
    day: "numeric",
  });
  return (
    <div className="w-full xl:p-4 lg:p-3 flex flex-col gap-y-3">
      <div
        className=" bg-white/60 dark:bg-zinc-900/50 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800
        rounded-3xl shadow-2xl overflow-hidden "
      >
        {/* Header */}
        <div className=" flex items-center justify-between p-5 sm:p-6 border-b border-zinc-200 dark:border-zinc-800 ">
          {viewMode === "days" && (
            <button
              onClick={() => setViewDate(subMonths(viewDate, 1))}
              className=" p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition "
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
          <div className="flex-1 text-center">
            {viewMode === "days" ? (
              <>
                <h2 className=" text-lg sm:text-xl lg:text-2xl font-bold text-zinc-800 dark:text-zinc-100">
                  {format(viewDate, "MMMM yyyy")}
                </h2>
                <button
                  onClick={() => setViewMode("years")}
                  className=" mt-1 text-xs text-zinc-500 hover:text-purple-500 flex items-center justify-center
                mx-auto gap-1"
                >
                  {format(viewDate, "yyyy")}
                  <ChevronDown className="w-3 h-3" />
                </button>
              </>
            ) : (
              <h2 className="text-xl font-bold">انتخاب سال</h2>
            )}
          </div>
          {viewMode === "days" && (
            <button
              onClick={() => setViewDate(addMonths(viewDate, 1))}
              className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
        </div>
        {/* Selected Date */}
        <div className="bg-zinc-50/50 dark:bg-zinc-800/30 p-3 text-center text-xs sm:text-sm border- border-zinc-20 dark:border-zinc-800 ">
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

        {/* Calendar Body */}

        <div className=" p-2 sm:p-4 ">
          {viewMode === "days" ? (
            <>
              <div className="grid grid-cols-7 mb-3">
                {daysOfWeek.map((day) => (
                  <div
                    key={day}
                    className=" text-center text-xs font-bold text-zinc-400 "
                  >
                    {day}
                  </div>
                ))}
              </div>
              <div className=" grid grid-cols-7 gap-1">
                {calendarDays.map((day, index) => {
                  if (!day) return <div key={index} />;
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
                        " relative aspect-square rounded-lg border flex flex-col items-center justify-center transition ",

                        !currentMonth && "opacity-30",

                        isSameDay(day, selectedDate)
                          ? "bg-purple-600 text-white border-purple-600"
                          : holiday
                            ? "bg-red-50 dark:bg-red-950/20 border-red-200 text-red-500"
                            : " hover:bg-zinc-100 dark:hover:bg-zinc-800 border-transparent ",
                      )}
                    >
                      <span className=" text-base sm:text-lg font-bold ">
                        {toPersianNumber(getDate(day))}
                      </span>

                      {(holiday || hasEvent) && (
                        <span className=" absolute bottom-1 w-1 h-1 rounded-full bg-current" />
                      )}

                      <div className=" absolute bottom-0.5 px-1 w-full flex justify-between text-[8px] text-zinc-400">
                        <span>{gregorianFormatter.format(day)}</span>

                        <span>{islamicFormatter.format(day)}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            <div className=" grid grid-cols-3 gap-3 ">
              {yearsList.map((year) => (
                <button
                  key={year}
                  onClick={() => {
                    const current = Number(format(viewDate, "yyyy"));

                    setViewDate(addYears(viewDate, year - current));

                    setViewMode("days");
                  }}
                  className=" py-4 rounded-xl hover:bg-purple-600 hover:text-white transition"
                >
                  {year}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {!isShowingToday && (
        <div className=" border border-zinc-20 dark:border-zinc-80 bg-white/6 dark:bg-zinc-900/50 rounded-xl">
          <Button
            variant="outline"
            onClick={() => {
              const today = new Date();

              setViewDate(today);
              setSelectedDate(today);
            }}
            className=" w-full h-11 bg-transparent hover:bg-purple-600 hover:text-white transition"
          >
            <RotateCcw className="w-4 h-4" />
            برگشت به امروز
          </Button>
        </div>
      )}
    </div>
  );
}
