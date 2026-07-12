export function toPersianNumber(value: number | string) {
  return value
    .toString()
    .replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)]);
}