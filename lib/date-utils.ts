// lib/date-utils.ts
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import { format as formatJalali } from 'date-fns-jalali';

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
  
  const firstDayOfMonth = startOfMonth(viewDate);
  const daysInMonth = eachDayOfInterval({ start: firstDayOfMonth, end: endOfMonth(viewDate) });
  
  const startOfGrid = subMonths(start, 0); 
  

  return daysInMonth.map(day => ({
    date: day,
    jalali: formatJalali(day, 'd'),
    gregorian: format(day, 'd'),
    lunar: "...",
    isCurrentMonth: true
  }));
};
