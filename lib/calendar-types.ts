import { DayData } from "./date-utils";

export interface HolidayData {
  date: string; 
  title: string; 
  type: 'holiday' | 'event' | 'lunar'; 
  lunarDate?: string; 
}

export interface CalendarDayExtended extends DayData {
  holiday?: HolidayData;
}

export type CalendarEventType =
  | "holiday"
  | "occasion"
  | "personal";


export interface CalendarEvent {
  date: string;
  title: string;
  isHoliday: boolean;
  type?: CalendarEventType;
}


export interface CalendarDay {
  date: Date;
  events: CalendarEvent[];
  isHoliday: boolean;
}
