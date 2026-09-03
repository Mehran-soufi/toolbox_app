"use client";

import JalaliCalendar from "./jalali-calendar";
import { useCalendarLogic } from "@/hooks/use-calendar-logic";
import MonthEvents from "./month-events";
import MonthHolidays from "./month-holidays";
import { useToolHistory } from "@/hooks/useToolHistory";

export default function CalendarContainer() {
  useToolHistory({
      toolName: "تقویم",
      toolSlug: "calendar",
      toolIcon: "Calendar",
    });

  const {
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
    isLoading,
    hasError,
    events,
    getEventsForDay,
  } = useCalendarLogic();

  return (
    <div className=" w-full flex flex-col lg:flex-row gap-6 items-start">
      {/* Calendar */}

      <div className=" w-full lg:w-1/2 sticky top-14">
        <JalaliCalendar
          viewDate={viewDate}
          setViewDate={setViewDate}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          viewMode={viewMode}
          setViewMode={setViewMode}
          daysOfWeek={daysOfWeek}
          calendarDays={calendarDays}
          yearsList={yearsList}
          isShowingToday={isShowingToday}
          holidayDates={holidayDates}
          selectedDayEvents={selectedDayEvents}
          isLoading={isLoading}
          hasError={hasError}
          getEventsForDay={getEventsForDay}
        />
      </div>

      {/* Events */}

      <div className=" w-full lg:w-1/2 flex flex-col gap-y-4 xl:p-4 lg:p-3">
        <MonthHolidays events={events} />
        <MonthEvents events={events} />
      </div>
    </div>
  );
}
