"use client";

import { useEffect, useMemo, useState } from "react";

import { Droplets, Sunrise, Sunset, Wind } from "lucide-react";

import { defaultCity, type City } from "@/lib/cities";
import { getSavedCity, saveCity } from "@/lib/city-storage";
import { weatherCode } from "@/lib/weather-code";
import { toPersianNumber } from "@/lib/number";

import CitySelector from "./city-selector";
import WeatherChart from "./weather-chart";
import WeatherForecast from "./weather-forecast";

import {
  convertTemperature,
  getTemperatureUnit,
  type TemperatureUnit,
} from "@/lib/temperature-storage";

type WeatherData = {
  current: {
    temperature_2m: number;
    weather_code: number;
    relative_humidity_2m?: number;
    wind_speed_10m?: number;
  };

  hourly: {
    time: string[];
    temperature_2m: number[];
  };

  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: number[];
    wind_speed_10m_max: number[];
    sunrise: string[];
    sunset: string[];
  };
};

export default function ShowWeather() {
  const [city, setCity] = useState<City>(() => {
    if (typeof window === "undefined") {
      return defaultCity;
    }

    return getSavedCity() ?? defaultCity;
  });

  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [temperatureUnit, setTemperatureUnit] =
    useState<TemperatureUnit>(() => {
      if (typeof window === "undefined") {
        return "celsius";
      }

      return getTemperatureUnit();
    });

  useEffect(() => {
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

  useEffect(() => {
    const controller = new AbortController();

    async function fetchWeather() {
      setLoading(true);
      setError(false);

      try {
        const response = await fetch(
          `/api/weather?lat=${city.lat}&lon=${city.lon}`,
          {
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          throw new Error("Weather fetch failed");
        }

        const result: WeatherData = await response.json();

        setData(result);
      } catch (error) {
        if (
          error instanceof DOMException &&
          error.name === "AbortError"
        ) {
          return;
        }

        console.error("Weather error:", error);

        setError(true);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchWeather();

    return () => {
      controller.abort();
    };
  }, [city.lat, city.lon]);

  function handleCityChange(newCity: City) {
    if (newCity.id === city.id) {
      return;
    }

    saveCity(newCity);
    setCity(newCity);
  }

  const hourlyData = useMemo(() => {
    if (!data) return null;

    const now = new Date();

    const currentHour = new Date(now);

    currentHour.setMinutes(0, 0, 0);

    const startIndex = data.hourly.time.findIndex(
      (time) => new Date(time) >= currentHour,
    );

    if (startIndex === -1) {
      return null;
    }

    const times = data.hourly.time.slice(
      startIndex,
      startIndex + 24,
    );

    const temperatures = data.hourly.temperature_2m.slice(
      startIndex,
      startIndex + 24,
    );

    return {
      times,
      temperatures,
    };
  }, [data]);

  if (loading && !data) {
    return (
      <div
        className="
          flex
          min-h-80
          items-center
          justify-center
          rounded-2xl
          border
          border-zinc-200
          bg-white/50
          dark:border-zinc-800
          dark:bg-zinc-900/50
        "
      >
        <div className="flex flex-col items-center gap-3">
          <div
            className="
              size-8
              animate-spin
              rounded-full
              border-2
              border-zinc-200
              border-t-violet-500
              dark:border-zinc-700
              dark:border-t-violet-400
            "
          />

          <p className="text-sm text-zinc-500">
            در حال دریافت اطلاعات هواشناسی...
          </p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div
        className="
          flex
          min-h-80
          flex-col
          items-center
          justify-center
          gap-3
          rounded-2xl
          border
          border-zinc-200
          dark:border-zinc-800
        "
      >
        <p className="text-sm text-red-500">
          دریافت اطلاعات هواشناسی با خطا مواجه شد.
        </p>

        <button
          type="button"
          onClick={() => {
            setError(false);
            setData(null);
            setCity({ ...city });
          }}
          className="
            rounded-xl
            bg-violet-500
            px-4
            py-2
            text-sm
            text-white
            transition
            hover:bg-violet-600
          "
        >
          تلاش مجدد
        </button>
      </div>
    );
  }

  const current = data.current;
  const daily = data.daily;

  const weather =
    weatherCode[current.weather_code as keyof typeof weatherCode] ??
    weatherCode[0];

  const WeatherIcon = weather.icon;

  return (
    <div dir="rtl" className="relative w-full space-y-4">
      {/* Header */}

      <div
        className="
          flex
          flex-wrap
          items-center
          justify-between
          gap-3
          rounded-2xl
          border
          border-zinc-200
          bg-white/60
          p-4
          shadow-sm
          backdrop-blur-xl
          dark:border-zinc-800
          dark:bg-zinc-900/50
        "
      >
        <span className="text-sm text-zinc-500 dark:text-zinc-400">
          شهر فعلی:
        </span>

        <CitySelector
          value={city}
          onChange={handleCityChange}
        />
      </div>

      {/* Current Weather */}

      <div
        className="
          relative
          overflow-hidden
          rounded-2xl
          border
          border-zinc-200
          bg-white/60
          p-5
          shadow-sm
          backdrop-blur-xl
          dark:border-zinc-800
          dark:bg-zinc-900/50
        "
      >
        {/* Loading Overlay */}

        {loading && (
          <div
            className="
              absolute
              inset-0
              z-10
              flex
              items-center
              justify-center
              rounded-2xl
              bg-white/40
              backdrop-blur-sm
              dark:bg-zinc-950/40
            "
          >
            <div
              className="
                size-7
                animate-spin
                rounded-full
                border-2
                border-zinc-300
                border-t-violet-500
                dark:border-zinc-700
                dark:border-t-violet-400
              "
            />
          </div>
        )}

        <div className="space-y-6">
          {/* City */}

          <div>
            <p className="text-xs text-zinc-400">
              وضعیت فعلی
            </p>

            <h2 className="mt-1 text-xl font-bold">
              {city.name}
            </h2>

            <p className="mt-0.5 text-sm text-zinc-400">
              {city.province}
            </p>
          </div>

          {/* Temperature */}

          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="flex items-start">
                <span className="mt-1 text-2xl">
                  °{temperatureUnit === "fahrenheit" ? "F" : "C"}
                </span>

                <span className="text-5xl font-bold">
                  {toPersianNumber(
                    Math.round(
                      convertTemperature(
                        current.temperature_2m,
                        temperatureUnit,
                      ),
                    ),
                  )}
                </span>
              </div>

              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                {weather.title}
              </p>
            </div>

            <div className={weather.color}>
              <WeatherIcon
                className="size-20"
                strokeWidth={1.5}
              />
            </div>
          </div>

          {/* Min / Max */}

          <div
            className="
              grid
              grid-cols-2
              gap-3
              border-t
              border-zinc-200
              pt-4
              dark:border-zinc-800
            "
          >
            <WeatherInfo
              title="کمینه امروز"
              value={`${toPersianNumber(
                Math.round(
                  convertTemperature(
                    daily.temperature_2m_min[0],
                    temperatureUnit,
                  ),
                ),
              )}°${temperatureUnit === "fahrenheit" ? "F" : "C"}`}
            />

            <WeatherInfo
              title="بیشینه امروز"
              value={`${toPersianNumber(
                Math.round(
                  convertTemperature(
                    daily.temperature_2m_max[0],
                    temperatureUnit,
                  ),
                ),
              )}°${temperatureUnit === "fahrenheit" ? "F" : "C"}`}
            />
          </div>

          {/* Extra Information */}

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {current.relative_humidity_2m !== undefined && (
              <WeatherInfo
                icon={Droplets}
                title="رطوبت"
                value={`${toPersianNumber(
                  Math.round(
                    current.relative_humidity_2m,
                  ),
                )}%`}
              />
            )}

            {current.wind_speed_10m !== undefined && (
              <WeatherInfo
                icon={Wind}
                title="سرعت باد"
                value={`${toPersianNumber(
                  Math.round(current.wind_speed_10m),
                )} کیلومتر/ساعت`}
              />
            )}

            <WeatherInfo
              icon={WeatherIcon}
              title="وضعیت"
              value={weather.title}
              iconClassName={weather.color}
            />
          </div>
        </div>
      </div>

      {/* Hourly Chart */}

      {hourlyData && (
        <div
          className="
            rounded-2xl
            border
            border-zinc-200
            bg-white/60
            p-5
            shadow-sm
            backdrop-blur-xl
            dark:border-zinc-800
            dark:bg-zinc-900/50
          "
        >
          <div className="mb-5">
            <h3 className="text-base font-bold">
              پیش‌بینی دمای ساعتی
            </h3>

            <p className="mt-1 text-xs text-zinc-400">
              تغییرات دما در ۲۴ ساعت آینده
            </p>
          </div>

          <WeatherChart
            times={hourlyData.times}
            temperatures={hourlyData.temperatures}
            temperatureUnit={temperatureUnit}
          />
        </div>
      )}

      {/* 7 Day Forecast */}

      <WeatherForecast
        dates={daily.time}
        weatherCodes={daily.weather_code}
        minTemperatures={daily.temperature_2m_min}
        maxTemperatures={daily.temperature_2m_max}
        precipitationProbabilities={
          daily.precipitation_probability_max
        }
        windSpeeds={daily.wind_speed_10m_max}
        temperatureUnit={temperatureUnit}
      />

      {/* Sunrise / Sunset */}

      {(daily.sunrise?.[0] || daily.sunset?.[0]) && (
        <div className="grid grid-cols-2 gap-3">
          {daily.sunrise?.[0] && (
            <WeatherInfo
              icon={Sunrise}
              title="طلوع خورشید"
              value={new Date(
                daily.sunrise[0],
              ).toLocaleTimeString("fa-IR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            />
          )}

          {daily.sunset?.[0] && (
            <WeatherInfo
              icon={Sunset}
              title="غروب خورشید"
              value={new Date(
                daily.sunset[0],
              ).toLocaleTimeString("fa-IR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            />
          )}
        </div>
      )}
    </div>
  );
}

interface WeatherInfoProps {
  icon?: typeof Wind;
  title: string;
  value: string;
  iconClassName?: string;
}

function WeatherInfo({
  icon: Icon,
  title,
  value,
  iconClassName = "text-violet-500",
}: WeatherInfoProps) {
  return (
    <div
      className="
        flex
        items-center
        gap-2
        rounded-xl
        border
        border-zinc-200
        bg-white/40
        p-3
        dark:border-zinc-800
        dark:bg-zinc-900/40
      "
    >
      {Icon && (
        <Icon
          className={`size-5 ${iconClassName}`}
          strokeWidth={1.8}
        />
      )}

      <div className="min-w-0">
        <p className="text-[11px] text-zinc-400">
          {title}
        </p>

        <p className="truncate text-sm font-medium">
          {value}
        </p>
      </div>
    </div>
  );
}