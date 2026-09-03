"use client";

import { usePrayerTimes } from "@/hooks/use-prayer-times";
import { toPersianNumber } from "@/lib/number";

export default function ReligiousTimes() {
  const { times, loading, error } = usePrayerTimes("1"); // تهران

  return (
    <div
      className="p-4 w-full xl:w-100
        border border-zinc-200 dark:border-zinc-800 bg-white/60
        dark:bg-zinc-900/50 shadow-[0_0_35px_rgba(173,70,255,.12)]
        backdrop-blur-xl rounded-xl"
    >
      <div className="w-full h-full flex flex-col justify-evenly">
        <h2 className="font-semibold">اوقات شرعی به وقت تهران :</h2>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-6 rounded bg-zinc-200 dark:bg-zinc-800 animate-pulse"
              />
            ))}
          </div>
        ) : error || !times ? (
          <p className="text-red-500 text-sm mt-3">
            {error || "خطا در دریافت اوقات شرعی"}
          </p>
        ) : (
          <>
            <ul className="text-sm md:text-base opacity-80 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <li>اذان صبح: {toPersianNumber(times.imsaak)}</li>
              <li>طلوع خورشید: {toPersianNumber(times.sunrise)}</li>
              <li>اذان ظهر: {toPersianNumber(times.noon)}</li>
              <li>غروب خورشید: {toPersianNumber(times.sunset)}</li>
              <li>اذان مغرب: {toPersianNumber(times.maghreb)}</li>
              <li>نیمه شب شرعی: {toPersianNumber(times.midnight)}</li>
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
