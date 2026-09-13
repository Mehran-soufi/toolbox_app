"use client";

import { useEffect, useState } from "react";
import HeroAnalogClock from "@/components/home/heroAnalogClock";
import DigitalTime from "./digital-time";

interface PersianDate {
  day: string;
  month: string;
  year: string;
  dayName: string;
}

export default function Time() {
  const [persian, setPersian] = useState<PersianDate>({
    day: "۱۵",
    month: "مرداد",
    year: "۱۴۰۵",
    dayName: "پنجشنبه",
  });

  useEffect(() => {
    async function fetchPersianDate() {
      try {
        const res = await fetch("/api/time");
        const data = await res.json();

        if (data.success) {
          setPersian(data.persianDate);
        }
      } catch (error) {
        console.error("Failed to fetch persian date:", error);
      }
    }

    fetchPersianDate();
  }, []);

  return (
    <div
      className="
        flex-1
        min-w-0
        lg:flex-row
        flex-col-reverse
        flex
        items-center
        p-4
        border
        border-zinc-200
        dark:border-zinc-800
        bg-white/60
        dark:bg-zinc-900/50
        shadow-[0_0_35px_rgba(173,70,255,.12)]
        backdrop-blur-xl
        rounded-xl
      "
    >
      <div
        className="
          flex
          lg:flex-row
          flex-col-reverse
          w-full
          items-center
          justify-between
          xl:gap-6
          md:gap-5
          gap-3
        "
      >
        <div
          className="
            flex-1
            flex
            items-center
            flex-col
            gap-y-1
            shrink-0
          "
        >
          <DigitalTime fontSize="text-5xl sm:text-6xl lg:text-7xl xl:text-9xl" />

          <div className="flex items-center justify-center">
            <p className="text-zinc-500 dark:text-zinc-400 text-base lg:text-lg">
              {persian.dayName} {persian.day} {persian.month} {persian.year}
            </p>
          </div>
        </div>

        <div className="shrink-0 flex items-center justify-center">
          <HeroAnalogClock />
        </div>
      </div>
    </div>
  );
}