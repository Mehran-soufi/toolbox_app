"use client";

import type { City } from "./cities";

const STORAGE_KEY = "weather_city";

export function getSavedCity(): City | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) return null;

    return JSON.parse(stored) as City;
  } catch {
    return null;
  }
}

export function saveCity(city: City) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(city));

    window.dispatchEvent(
      new CustomEvent("weather-city-change", {
        detail: city,
      }),
    );
  } catch (error) {
    console.error("Error saving weather city:", error);
  }
}

export function clearSavedCity() {
  try {
    localStorage.removeItem(STORAGE_KEY);

    window.dispatchEvent(new Event("weather-city-change"));
  } catch (error) {
    console.error("Error clearing weather city:", error);
  }
}