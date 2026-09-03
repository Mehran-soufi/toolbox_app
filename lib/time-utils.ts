export function convertTimeZone(
  date: Date,
  timeZone: string
) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);
}


export function getDateInTimeZone(
  date: Date,
  timeZone: string
) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12:false,
  }).formatToParts(date);
}