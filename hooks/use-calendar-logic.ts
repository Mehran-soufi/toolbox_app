"use client";
import { useEffect, useMemo, useState } from "react";
import {
  eachDayOfInterval, endOfMonth, endOfWeek, format,
  getMonth, getYear, isSameDay, startOfMonth, startOfWeek,
} from "date-fns-jalali";
import { CalendarEvent } from "@/lib/calendar-types";
import { createDateKey, normalizeDate, } from "@/lib/calendar-utils";


export const useCalendarLogic = () => {

  const [viewDate, setViewDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<"days" | "years">("days");
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [eventsCache, setEventsCache] = useState<Record<string, CalendarEvent[]>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  /*  Days of week  */
  const daysOfWeek = ["ش", "ی", "د", "س", "چ", "پ", "ج",];

  /*  Get events for specific day   */
  const getEventsForDay = (date: Date) => {
    const currentDate = normalizeDate(format(date, "yyyy/MM/dd"));
    return events.filter((event) => normalizeDate(event.date) === currentDate);
  };

  /*  Fetch calendar events  */
  useEffect(() => {
    let isMounted = true;
    const fetchEvents = async () => {
      const year = getYear(viewDate);
      const month = getMonth(viewDate) + 1; const cacheKey = `${year}-${month}`;

      /* Use cached data  */
      if (eventsCache[cacheKey]) {
        if (isMounted) {
          setEvents(eventsCache[cacheKey]);
          setHasError(false);
        } return;
      }
      try {
        if (isMounted) {
          setIsLoading(true);
          setHasError(false);
        }
        const response = await fetch(`https://pnldev.com/api/calender?year=${year}&month=${month}`);
        if (!response.ok) { throw new Error(`Calendar API Error: ${response.status}`); }
        const data = await response.json();
        const formattedEvents: CalendarEvent[] = [];

        /*  Validate API response */
        Object.values(data.result).forEach((item: any) => {
          const solar = item?.solar;
          if (!solar) return;
          const date = createDateKey(
            solar.year,
            solar.month,
            solar.day
          );
          const hasEvents =
            Array.isArray(item.event) &&
            item.event.length > 0;
          if (hasEvents) {
            item.event.forEach((title: string) => {
              if (!title?.trim()) return;

              const isHoliday = Boolean(item.holiday);

              formattedEvents.push({
                date,
                title: title.trim(),
                isHoliday,
                type: isHoliday
                  ? "holiday"
                  : "occasion",
              });
            });
          }
        });

        /*  Update state  */
        if (isMounted) {
          setEvents(formattedEvents);
          setEventsCache((previous) => ({ ...previous, [cacheKey]: formattedEvents, }));
        }
      }
      catch (error) {
        console.error("Calendar events error:", error);
        if (isMounted) {
          setHasError(true); setEvents([]);

        }
      }
      finally { if (isMounted) { setIsLoading(false); } }
    }; fetchEvents(); return () => { isMounted = false; };
  }, [viewDate, eventsCache]);

  /*  Calendar days  */
  const calendarDays = useMemo(() => {
    const start = startOfWeek(startOfMonth(viewDate),
      { weekStartsOn: 6, }); const end = endOfWeek(endOfMonth(viewDate),
        { weekStartsOn: 6, }); return eachDayOfInterval({ start, end, });
  },
    [viewDate]);

  /*  Holiday dates */
const holidayDates = useMemo(() => {
  const dates = new Set<string>();
  events
    .filter((event) => event.isHoliday)
    .forEach((event) => {
      dates.add(
        normalizeDate(event.date)
      );
    });
  calendarDays.forEach((date) => {
    if (!date) return;

    if (date.getDay() === 5) {
      dates.add(
        normalizeDate(
          format(date, "yyyy/MM/dd")
        )
      );
    }
  });
  return Array.from(dates);
}, [events, calendarDays]);

  /*  * Selected day events */
  const selectedDayEvents = useMemo(() => {
    const selected = normalizeDate(format(selectedDate, "yyyy/MM/dd"));
    return events.filter((event) => normalizeDate(event.date) === selected);
  },
    [selectedDate, events]);

  /* Years list */
  const yearsList = useMemo(() => {
    const currentYear = Number(format(viewDate, "yyyy"));
    return Array.from({ length: 18, }, (_, index) => currentYear - 10 + index);
  },
    [viewDate]); /* Today state  */
  const isShowingToday = isSameDay(viewDate, new Date());

  /*  Return  */
  return {
    viewDate, setViewDate, selectedDate,
    setSelectedDate, viewMode, setViewMode,
    daysOfWeek, calendarDays, yearsList,
    isShowingToday, events, selectedDayEvents,
    holidayDates, getEventsForDay, isLoading,
    hasError,
  };
};