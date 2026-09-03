"use client";

import { useEffect, useState } from "react";

import { getWeather } from "@/lib/weather";
import { defaultCity, type City } from "@/lib/cities";
import { weatherCode } from "@/lib/weather-code";
import { toPersianNumber } from "@/lib/number";
import { getSavedCity } from "@/lib/city-storage";

import {
  getTemperatureUnit,
  convertTemperature,
  type TemperatureUnit,
} from "@/lib/temperature-storage";

function HeroWeather() {
  const [city, setCity] = useState<City>(defaultCity);
  const [weatherData, setWeatherData] = useState<Awaited<
    ReturnType<typeof getWeather>
  > | null>(null);
  const [temperatureUnit, setTemperatureUnit] =
    useState<TemperatureUnit>("celsius");

  useEffect(() => {
    const savedCity = getSavedCity();

    if (savedCity) {
      setCity(savedCity);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function fetchWeather() {
      try {
        const data = await getWeather(city.lat, city.lon);

        if (!cancelled) {
          setWeatherData(data);
        }
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    }

    fetchWeather();

    return () => {
      cancelled = true;
    };
  }, [city]);

  useEffect(() => {
    function handleCityChange(event: Event) {
      const customEvent = event as CustomEvent<City>;

      if (customEvent.detail) {
        setCity(customEvent.detail);
      } else {
        setCity(getSavedCity() ?? defaultCity);
      }
    }

    window.addEventListener("weather-city-change", handleCityChange);

    return () => {
      window.removeEventListener("weather-city-change", handleCityChange);
    };
  }, []);

  useEffect(() => {
    setTemperatureUnit(getTemperatureUnit());

    function handleTemperatureUnitChange(event: Event) {
      const customEvent = event as CustomEvent<TemperatureUnit>;

      if (customEvent.detail) {
        setTemperatureUnit(customEvent.detail);
      } else {
        setTemperatureUnit(getTemperatureUnit());
      }
    }

    window.addEventListener(
      "temperature-unit-change",
      handleTemperatureUnitChange,
    );

    return () => {
      window.removeEventListener(
        "temperature-unit-change",
        handleTemperatureUnitChange,
      );
    };
  }, []);

  if (!weatherData) {
    return (
      <div className="w-full flex flex-col gap-y-2 px-2">
        <div className="flex items-center justify-end">
          <p>{city.name}</p>
        </div>

        <div className="flex items-center justify-center py-2">
          <div className="size-6 animate-spin rounded-full border-2 border-zinc-200 border-t-violet-500 dark:border-zinc-700 dark:border-t-violet-400" />
        </div>
      </div>
    );
  }

  const current = weatherData.current;
  const daily = weatherData.daily;

  const weather =
    weatherCode[current.weather_code as keyof typeof weatherCode] ??
    weatherCode[0];

  const WeatherIcon = weather.icon;

  return (
    <div className="w-full flex flex-col gap-y-0.5 px-2">
      {/* city */}
      <div className="flex items-center justify-end">
        <p>{city.name}</p>
      </div>

      {/* temperature */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-0.5 items-center">
          <p
            className="
              xl:text-3xl
              lg:text-2xl
              text-xl
              font-bold
            "
          >
            {toPersianNumber(
              Math.round(
                convertTemperature(current.temperature_2m, temperatureUnit),
              ),
            )}
            °{temperatureUnit === "fahrenheit" ? "F" : "C"}
          </p>

          <span>{weather.title}</span>
        </div>

        <div className={weather.color}>
          <WeatherIcon size={40} strokeWidth={1.8} />
        </div>
      </div>

      {/* min max */}
      <div
        className="
          flex
          items-center
          justify-between
          text-sm
          text-gray-500
          dark:text-gray-400
        "
      >
        <div className="flex gap-x-1.5">
          <span>کمینه:</span>

          <span>
            {toPersianNumber(
              Math.round(
                convertTemperature(
                  daily.temperature_2m_min[0],
                  temperatureUnit,
                ),
              ),
            )}
            °{temperatureUnit === "fahrenheit" ? "F" : "C"}
          </span>
        </div>

        <div className="flex gap-1">
          <span>بیشینه:</span>

          <span>
            {toPersianNumber(
              Math.round(
                convertTemperature(
                  daily.temperature_2m_max[0],
                  temperatureUnit,
                ),
              ),
            )}
            °{temperatureUnit === "fahrenheit" ? "F" : "C"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default HeroWeather;
