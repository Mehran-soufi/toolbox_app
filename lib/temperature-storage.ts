"use client";

export type TemperatureUnit = "celsius" | "fahrenheit";

const STORAGE_KEY = "toolbox-temperature-unit";

const DEFAULT_UNIT: TemperatureUnit = "celsius";

export function getTemperatureUnit(): TemperatureUnit {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored === "celsius" || stored === "fahrenheit") {
      return stored;
    }

    return DEFAULT_UNIT;
  } catch {
    return DEFAULT_UNIT;
  }
}

export function saveTemperatureUnit(unit: TemperatureUnit) {
  try {
    localStorage.setItem(STORAGE_KEY, unit);

    window.dispatchEvent(
      new CustomEvent("temperature-unit-change", {
        detail: unit,
      }),
    );
  } catch (error) {
    console.error("Error saving temperature unit:", error);
  }
}

export function clearTemperatureUnit() {
  try {
    localStorage.removeItem(STORAGE_KEY);

    window.dispatchEvent(new Event("temperature-unit-change"));
  } catch (error) {
    console.error("Error clearing temperature unit:", error);
  }
}

export function convertTemperature(
  celsius: number,
  unit: TemperatureUnit,
): number {
  if (unit === "fahrenheit") {
    return (celsius * 9) / 5 + 32;
  }

  return celsius;
}

export function formatTemperature(
  celsius: number,
  unit: TemperatureUnit,
): string {
  const temperature = Math.round(convertTemperature(celsius, unit));

  return `${temperature}°${unit === "fahrenheit" ? "F" : "C"}`;
}