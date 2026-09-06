import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
  getYear,
} from "date-fns-jalali";

export interface CalendarData {
  calendarDays: Date[];
  yearsList: number[];
}

export const calculateCalendarDays = (
  viewDate: Date,
): Date[] => {
  const start = startOfWeek(startOfMonth(viewDate));
  const end = endOfWeek(endOfMonth(viewDate));

  return eachDayOfInterval({ start, end });
};

export const calculateYearsList = (
  baseDate: Date,
): number[] => {
  const currentYear = getYear(baseDate);
  const years: number[] = [];

  for (
    let i = currentYear - 10;
    i <= currentYear + 10;
    i++
  ) {
    years.push(i);
  }

  return years;
};

export const checkIsSameDay = (
  date1: Date,
  date2: Date,
): boolean => {
  return isSameDay(date1, date2);
};
