import {
  eachDayOfInterval,
  endOfMonth,
  format,
  startOfMonth,
} from "date-fns";
import { format as formatJalali } from "date-fns-jalali";

export interface DayData {
  date: Date;
  jalali: string;
  gregorian: string;
  lunar: string;
  isCurrentMonth: boolean;
}

export const getCalendarDays = (viewDate: Date): DayData[] => {
  const start = startOfMonth(viewDate);
  const end = endOfMonth(viewDate);
  const daysInMonth = eachDayOfInterval({
    start,
    end,
  });

  return daysInMonth.map((day) => ({
    date: day,
    jalali: formatJalali(day, "d"),
    gregorian: format(day, "d"),
    lunar: "...",
    isCurrentMonth: true,
  }));
};
