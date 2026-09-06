"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useWorldTime } from "@/hooks/use-world-time";

export default function DigitalTime({
  timeZone,
  fontSize,
  city = "",
}: {
  timeZone?: string;
  fontSize: string;
  city?: string;
}) {
  const { time } = useWorldTime({
    timeZone,
    onError: (message) =>
      toast.error(`خطای اتصال برای ${city || "ساعت"}`, {
        description: message,
      }),
    onSynced: (offset) => {
      if (Math.abs(offset) > 30000) {
        toast("هماهنگی ساعت با سرور", {
          description:
            "ساعت سیستم شما با سرور اختلاف داشت؛ ساعت هماهنگ شد.",
        });
      }
    },
  });

  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const updateTime = () => {
      if (!time) return;

      const hour = time.getHours().toString().padStart(2, "0");
      const minute = time.getMinutes().toString().padStart(2, "0");
      const second = time.getSeconds().toString().padStart(2, "0");

      setTimeStr(`${hour} : ${minute} : ${second}`);
    };

    updateTime();

    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, [time]);

  return (
    <div className="flex items-center justify-center">
      <p
        dir="ltr"
        className={`
          digit-font
          text-violet-600
          tracking-wider
          whitespace-nowrap
          text-center
          ${fontSize}
        `}
      >
        {time && timeStr ? timeStr : "-- : -- : --"}
      </p>
    </div>
  );
}