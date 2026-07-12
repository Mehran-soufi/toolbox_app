"use client";

import { useEffect, useState } from "react";

function HeroDate() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

 const timeFormatter = new Intl.DateTimeFormat("fa-IR", {
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

const timeParts = timeFormatter.formatToParts(now);

const hour = timeParts.find((p) => p.type === "hour")?.value;
const minute = timeParts.find((p) => p.type === "minute")?.value;

const dayPeriod = now.getHours() >= 12 ? "بعدازظهر" : "صبح";

const time = `${hour}:${minute} ${dayPeriod}`;

  const formatter = new Intl.DateTimeFormat("fa-IR", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

const parts = formatter.formatToParts(now);

const weekday = parts.find((p) => p.type === "weekday")?.value;
const day = parts.find((p) => p.type === "day")?.value;
const month = parts.find((p) => p.type === "month")?.value;
const year = parts.find((p) => p.type === "year")?.value;

const inDate = `${weekday} ${day} ${month} ${year}`;

  return (
    <div className="flex flex-col items-center justify-center gap-1 px-1 py-0.5">
      <p className="text-sm text-gray-600 dark:text-gray-200">
        {inDate}
      </p>

      <p className="font-semibold text-zinc-700 dark:text-zinc-300">
        {time}
      </p>
    </div>
  );
}

export default HeroDate;