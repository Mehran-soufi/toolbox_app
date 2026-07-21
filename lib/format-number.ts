export function formatNumber(value: string) {
  if (!value) return "0";

  const parts = value.split(".");

  const integerPart = Number(parts[0]);

  if (parts.length > 1) {
    return `${integerPart}.${parts[1]}`;
  }

  return integerPart;
}