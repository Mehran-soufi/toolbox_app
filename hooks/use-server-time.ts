"use client";

import { useEffect, useState } from "react";

export function useServerTime() {
  const [serverTime, setServerTime] = useState<Date | null>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    async function fetchTime() {
      try {
        const res = await fetch("/api/time");
        const data = await res.json();

        if (!data.success) {
          throw new Error("Failed to fetch server time");
        }

        // ساخت Date از روی ساعت میلادی API
        const serverDate = new Date();
        serverDate.setHours(
          data.time.hour,
          data.time.minute,
          data.time.second,
          0
        );

        const difference = serverDate.getTime() - Date.now();

        setOffset(difference);
        setServerTime(new Date(Date.now() + difference));
      } catch (error) {
        console.error("Failed to fetch server time:", error);
      }
    }

    fetchTime();
  }, []);

  useEffect(() => {
    if (!offset) return;

    const timer = setInterval(() => {
      setServerTime(new Date(Date.now() + offset));
    }, 1000);

    return () => clearInterval(timer);
  }, [offset]);

  return serverTime;
}