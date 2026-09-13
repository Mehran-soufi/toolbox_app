"use client";

import { useMemo } from "react";

import { toPersianNumber } from "@/lib/number";
import {
  convertTemperature,
  type TemperatureUnit,
} from "@/lib/temperature-storage";

interface WeatherChartProps {
  times: string[];
  temperatures: number[];
  temperatureUnit: TemperatureUnit;
}

export default function WeatherChart({
  times,
  temperatures,
  temperatureUnit,
}: WeatherChartProps) {
  const points = useMemo(() => {
    if (!temperatures.length) return [];

    const min = Math.min(...temperatures);
    const max = Math.max(...temperatures);
    const range = Math.max(max - min, 1);

    const width = 1000;
    const height = 280;

    const horizontalPadding = 75;

    const chartWidth = width - horizontalPadding * 2;

    return temperatures.map((temperature, index) => {
      const x =
        temperatures.length === 1
          ? width / 2
          : horizontalPadding +
            (index / (temperatures.length - 1)) * chartWidth;

      const y = height - 55 - ((temperature - min) / range) * (height - 105);

      return {
        x,
        y,
        temperature,
        time: times[index],
      };
    });
  }, [temperatures, times]);

  if (!points.length) return null;

  const linePath = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

  const areaPath = `
    ${linePath}
    L ${points[points.length - 1].x} 225
    L ${points[0].x} 225
    Z
  `;

  const visiblePoints = points.filter(
    (_, index) => index === 0 || index === points.length - 1 || index % 3 === 0,
  );

  return (
    <div dir="rtl" className="w-full overflow-x-auto">
      <div className="min-w-162.5">
        <svg
          viewBox="0 0 1000 280"
          className="h-72 w-full overflow-visible"
          preserveAspectRatio="none"
        >
          {/* Grid */}
          {[65, 105, 145, 185, 225].map((y) => (
            <line
              key={y}
              x1="0"
              x2="1000"
              y1={y}
              y2={y}
              stroke="currentColor"
              strokeOpacity="0.08"
              strokeDasharray="4 6"
            />
          ))}

          {/* Area */}
          <path d={areaPath} fill="url(#weatherGradient)" opacity="0.25" />

          <defs>
            <linearGradient id="weatherGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="rgb(139 92 246)" />

              <stop offset="100%" stopColor="rgb(139 92 246)" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Line */}
          <path
            d={linePath}
            fill="none"
            stroke="rgb(139 92 246)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Points */}
          {visiblePoints.map((point) => (
            <g key={`${point.time}-${point.x}`}>
              <circle
                cx={point.x}
                cy={point.y}
                r="6"
                className="fill-white dark:fill-zinc-900"
                stroke="rgb(139 92 246)"
                strokeWidth="3"
              />

              {/* Temperature */}
              <text
                x={point.x}
                y={point.y - 16}
                textAnchor="middle"
                className="fill-zinc-700 text-[18px] font-medium dark:fill-zinc-200"
              >
                {toPersianNumber(
                  Math.round(
                    convertTemperature(point.temperature, temperatureUnit),
                  ),
                )}
                °{temperatureUnit === "fahrenheit" ? "F" : "C"}
              </text>

              {/* Time */}
              <text
                x={point.x}
                y="258"
                textAnchor="middle"
                className="fill-zinc-400 text-[15px]"
              >
                {new Date(point.time).toLocaleTimeString("fa-IR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
