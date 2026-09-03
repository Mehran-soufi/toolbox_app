import { format } from "date-fns-jalali";

export function normalizeDate(date: string) {
  return date
    .split("/")
    .map((item) => item.padStart(2, "0"))
    .join("/");
}


export function formatJalaliDate(date: Date) {
  return normalizeDate(
    format(date, "yyyy/MM/dd")
  );
}


export function checkHoliday(
  date: Date,
  holidays: string[]
) {
  const currentDate = formatJalaliDate(date);

  return holidays.some(
    (holiday) =>
      normalizeDate(holiday) === currentDate
  );
}

export function createDateKey(
  year: number,
  month: number,
  day: number
) {
  return `${year}/${String(month).padStart(2, "0")}/${String(day).padStart(2, "0")}`;
}