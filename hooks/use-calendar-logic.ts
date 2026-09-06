"use client";

import { useEffect, useMemo, useState } from "react";
import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getMonth,
  getYear,
  isSameDay,
  startOfMonth,
  startOfWeek,
} from "date-fns-jalali";
import { CalendarEvent } from "@/lib/calendar-types";
import { createDateKey, normalizeDate } from "@/lib/calendar-utils";

interface CalendarApiItem {
  solar?: {
    year: number;
    month: number;
    day: number;
  };
  event?: string[];
  holiday?: boolean;
}

interface CalendarApiResponse {
  result?: Record<string, CalendarApiItem>;
}

export const useCalendarLogic = () => {
  const [viewDate, setViewDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<"days" | "years">("days");
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [eventsCache, setEventsCache] = useState<
    Record<string, CalendarEvent[]>
  >({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const daysOfWeek = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

  const getEventsForDay = (date: Date) => {
    const currentDate = normalizeDate(format(date, "yyyy/MM/dd"));

    return events.filter(
      (event) => normalizeDate(event.date) === currentDate,
    );
  };

  useEffect(() => {
    let isMounted = true;

    const fetchEvents = async () => {
      const year = getYear(viewDate);
      const month = getMonth(viewDate) + 1;
      const cacheKey = `${year}-${month}`;

      if (eventsCache[cacheKey]) {
        if (isMounted) {
          setEvents(eventsCache[cacheKey]);
          setHasError(false);
        }

        return;
      }

      try {
        if (isMounted) {
          setIsLoading(true);
          setHasError(false);
        }

        const response = await fetch(
          `https://pnldev.com/api/calender?year=${year}&month=${month}`,
        );

        if (!response.ok) {
          throw new Error(`Calendar API Error: ${response.status}`);
        }

        const data: CalendarApiResponse = await response.json();
        const formattedEvents: CalendarEvent[] = [];

        if (data.result) {
          Object.values(data.result).forEach((item) => {
            const solar = item.solar;

            if (!solar) return;

            const date = createDateKey(
              solar.year,
              solar.month,
              solar.day,
            );

            if (Array.isArray(item.event) && item.event.length > 0) {
              item.event.forEach((title) => {
                if (!title?.trim()) return;

                const isHoliday = Boolean(item.holiday);

                formattedEvents.push({
                  date,
                  title: title.trim(),
                  isHoliday,
                  type: isHoliday ? "holiday" : "occasion",
                });
              });
            }
          });
        }

        if (isMounted) {
          setEvents(formattedEvents);

          setEventsCache((previous) => ({
            ...previous,
            [cacheKey]: formattedEvents,
          }));
        }
      } catch (error) {
        console.error("Calendar events error:", error);

        if (isMounted) {
          setHasError(true);
          setEvents([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchEvents();

    return () => {
      isMounted = false;
    };
  }, [viewDate, eventsCache]);

  const calendarDays = useMemo(() => {
    const start = startOfWeek(startOfMonth(viewDate), {
      weekStartsOn: 6,
    });

    const end = endOfWeek(endOfMonth(viewDate), {
      weekStartsOn: 6,
    });

    return eachDayOfInterval({ start, end });
  }, [viewDate]);

  const holidayDates = useMemo(() => {
    const dates = new Set<string>();

    events
      .filter((event) => event.isHoliday)
      .forEach((event) => {
        dates.add(normalizeDate(event.date));
      });

    calendarDays.forEach((date) => {
      if (date.getDay() === 5) {
        dates.add(normalizeDate(format(date, "yyyy/MM/dd")));
      }
    });

    return Array.from(dates);
  }, [events, calendarDays]);

  const selectedDayEvents = useMemo(() => {
    const selected = normalizeDate(
      format(selectedDate, "yyyy/MM/dd"),
    );

    return events.filter(
      (event) => normalizeDate(event.date) === selected,
    );
  }, [selectedDate, events]);

  const yearsList = useMemo(() => {
    const currentYear = Number(format(viewDate, "yyyy"));

    return Array.from(
      { length: 18 },
      (_, index) => currentYear - 10 + index,
    );
  }, [viewDate]);

  const isShowingToday = isSameDay(viewDate, new Date());

  return {
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
    events,
    selectedDayEvents,
    holidayDates,
    getEventsForDay,
    isLoading,
    hasError,
  };
};
