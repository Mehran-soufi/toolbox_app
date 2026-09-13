"use client";

import { useMemo } from "react";
import { CalendarDays, Droplets, Wind } from "lucide-react";

import { weatherCode } from "@/lib/weather-code";
import { toPersianNumber } from "@/lib/number";

import {
  convertTemperature,
  type TemperatureUnit,
} from "@/lib/temperature-storage";

interface WeatherForecastProps {
  dates: string[];
  weatherCodes: number[];
  minTemperatures: number[];
  maxTemperatures: number[];
  precipitationProbabilities: number[];
  windSpeeds: number[];
  temperatureUnit: TemperatureUnit;
}

export default function WeatherForecast({
  dates,
  weatherCodes,
  minTemperatures,
  maxTemperatures,
  precipitationProbabilities,
  windSpeeds,
  temperatureUnit,
}: WeatherForecastProps) {
  const days = useMemo(() => {
    return dates.map((date, index) => {
      const weather =
        weatherCode[weatherCodes[index] as keyof typeof weatherCode] ??
        weatherCode[0];

      const dateObject = new Date(`${date}T12:00:00`);

      return {
        date,
        weather,
        dayName: dateObject.toLocaleDateString("fa-IR", {
          weekday: "long",
        }),
        formattedDate: dateObject.toLocaleDateString("fa-IR", {
          day: "numeric",
          month: "long",
        }),
        min: minTemperatures[index],
        max: maxTemperatures[index],
        precipitation: precipitationProbabilities[index],
        wind: windSpeeds[index],
      };
    });
  }, [
    dates,
    weatherCodes,
    minTemperatures,
    maxTemperatures,
    precipitationProbabilities,
    windSpeeds,
  ]);

  if (!days.length) {
    return null;
  }

  return (
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
      dir="rtl"
    >
      {/* Header */}
      <div className="mb-5 flex items-center gap-2">
        <div
          className="
            flex
            size-9
            items-center
            justify-center
            rounded-xl
            bg-violet-100
            text-violet-500
            dark:bg-violet-500/10
            dark:text-violet-400
          "
        >
          <CalendarDays className="size-5" strokeWidth={1.8} />
        </div>

        <div>
          <h3 className="text-sm font-bold">پیش‌بینی روزهای آینده</h3>

          <p className="mt-0.5 text-xs text-zinc-400">
            وضعیت آب‌وهوا در ۷ روز آینده
          </p>
        </div>
      </div>

      {/* Forecast */}
      <div
        className="
          grid
          gap-3
          sm:grid-cols-2
          lg:grid-cols-4
          xl:grid-cols-7
        "
      >
        {days.map((day, index) => {
          const WeatherIcon = day.weather.icon;

          const isToday = index === 0;

          return (
            <div
              key={day.date}
              className={`
                relative
                overflow-hidden
                rounded-2xl
                border
                p-4
                transition-all
                ${
                  isToday
                    ? `
                      border-violet-200
                      bg-violet-50/70
                      dark:border-violet-500/20
                      dark:bg-violet-500/10
                    `
                    : `
                      border-zinc-200
                      bg-white/50
                      hover:border-violet-200
                      hover:bg-violet-50/40
                      dark:border-zinc-800
                      dark:bg-zinc-900/40
                      dark:hover:border-violet-500/20
                      dark:hover:bg-violet-500/5
                    `
                }
              `}
            >
              {/* Today badge */}
              {isToday && (
                <span
                  className="
                    absolute
                    left-3
                    top-3
                    rounded-full
                    bg-violet-500
                    px-2
                    py-0.5
                    text-[10px]
                    font-medium
                    text-white
                  "
                >
                  امروز
                </span>
              )}

              {/* Day */}
              <div className="text-center">
                <p className="text-sm font-bold">{day.dayName}</p>

                <p className="mt-1 text-[11px] text-zinc-400">
                  {toPersianNumber(day.formattedDate)}
                </p>
              </div>

              {/* Weather icon */}
              <div className="my-5 flex justify-center">
                <div className={day.weather.color}>
                  <WeatherIcon className="size-12" strokeWidth={1.6} />
                </div>
              </div>

              {/* Weather status */}
              <p className="mb-4 text-center text-xs font-medium">
                {day.weather.title}
              </p>

              {/* Temperature */}
              <div className="flex items-center justify-center gap-3">
                <div className="text-center">
                  <p className="text-[10px] text-zinc-400">کمینه</p>

                  <p className="mt-1 text-sm font-semibold">
                    {toPersianNumber(
                      Math.round(convertTemperature(day.min, temperatureUnit)),
                    )}
                    °{temperatureUnit === "fahrenheit" ? "F" : "C"}
                  </p>
                </div>

                <div className="h-7 w-px bg-zinc-200 dark:bg-zinc-800" />

                <div className="text-center">
                  <p className="text-[10px] text-zinc-400">بیشینه</p>

                  <p className="mt-1 text-sm font-semibold">
                    {toPersianNumber(
                      Math.round(convertTemperature(day.max, temperatureUnit)),
                    )}
                    °{temperatureUnit === "fahrenheit" ? "F" : "C"}
                  </p>
                </div>
              </div>

              {/* Extra information */}
              <div
                className="
                  mt-4
                  space-y-2
                  border-t
                  border-zinc-200
                  pt-3
                  dark:border-zinc-800
                "
              >
                {/* Rain */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Droplets
                      className="size-3.5 text-blue-400"
                      strokeWidth={1.8}
                    />

                    <span className="text-[10px] text-zinc-400">
                      احتمال بارش
                    </span>
                  </div>

                  <span className="text-[11px] font-medium">
                    {toPersianNumber(Math.round(day.precipitation))}٪
                  </span>
                </div>

                {/* Wind */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Wind className="size-3.5 text-sky-400" strokeWidth={1.8} />

                    <span className="text-[10px] text-zinc-400">باد</span>
                  </div>

                  <span className="text-[11px] font-medium">
                    {toPersianNumber(Math.round(day.wind))} km/h
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
