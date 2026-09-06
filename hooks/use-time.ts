"use client";

import { useEffect, useState } from "react";

interface TimeData {
  hour: number;
  minute: number;
  second: number;
}

export default function useTime() {
  const [time, setTime] = useState<TimeData | null>(null);

  useEffect(() => {
    const fetchTime = async () => {
      try {
        const res = await fetch("/api/time", {
          cache: "no-store",
        });

        const data = await res.json();

        if (data.success) {
          setTime(data.time);
        }
      } catch (error) {
        console.log("TIME FETCH ERROR:", error);
      }
    };

    fetchTime();

    const timer = setInterval(() => {
      setTime((prev) => {
        if (!prev) return prev;

        let second = prev.second + 1;
        let minute = prev.minute;
        let hour = prev.hour;

        if (second >= 60) {
          second = 0;
          minute++;
        }

        if (minute >= 60) {
          minute = 0;
          hour++;
        }

        if (hour >= 24) {
          hour = 0;
        }

        return {
          hour,
          minute,
          second,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return time;
}