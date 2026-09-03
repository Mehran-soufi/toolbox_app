// components/WorldClock.tsx
"use client";

import { toast } from "sonner";
import { useWorldTime } from "@/hooks/use-world-time";
import { convertTimeZone } from "@/lib/time-utils";
import WorldAnalogClock from "./world-analog-clock";

interface Props {
  clock: {
    city: string;
    country: string;
    flag: string;
    timeZone: string;
  };
}

export default function WorldClock({ clock }: Props) {
  const { time, synced } = useWorldTime({
    onError: (message) =>
      toast.error(`خطای اتصال برای ${clock.city}`, {
        description: message,
      }),
    onSynced: (offset) => {
      if (Math.abs(offset) > 30000) {
        toast("هماهنگی ساعت با سرور", {
          description: `ساعت ${clock.city} هماهنگ شد.`,
        });
      }
    },
  });

  if (!time) {
    return (
      <div className="h-60 rounded-xl bg-zinc-100 dark:bg-zinc-900 animate-pulse" />
    );
  }

  const localTime = convertTimeZone(time, clock.timeZone);

  return (
    <div
      className="
        rounded-xl
        border
        border-zinc-200
        dark:border-zinc-800
        p-3
        flex
        flex-col
        items-center
        gap-2
      "
    >
      <h2 className="xl:text-2xl md:text-xl text-lg">{clock.flag}</h2>
      <div className="flex items-center gap-x-1">
        <h3 className="md:font-bold font-semibold">{clock.city}</h3>
        <span>-</span>
        <p className="text-zinc-500">{clock.country}</p>
      </div>

      <WorldAnalogClock timeZone={clock.timeZone} />

      <div dir="ltr" className="xl:text-2xl md:text-xl text-lg digit-font">
        {localTime}
      </div>
    </div>
  );
}