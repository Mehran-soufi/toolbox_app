export function normalizeStationName(name: string) {
  return name
    .trim()
    .replace(/\s+/g, " ")
    .replace(/ي/g, "ی")
    .replace(/ك/g, "ک");
}