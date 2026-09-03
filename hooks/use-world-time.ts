// hooks/use-world-time.ts
"use client";

import { useEffect, useState, useRef } from "react";

interface WorldTimeOptions {
  timeZone?: string;
  onError?: (message: string) => void;
  onSynced?: (offset: number) => void;
}

interface WorldTimeResult {
  time: Date | null;
  offset: number;
  synced: boolean;
  loading: boolean;
}

export function useWorldTime({
  timeZone,
  onError,
  onSynced,
}: WorldTimeOptions = {}): WorldTimeResult {
  const [time, setTime] = useState<Date | null>(null);
  const [offset, setOffset] = useState(0);
  const [synced, setSynced] = useState(false);
  const [loading, setLoading] = useState(true);

  const offsetRef = useRef(0);
  const hasFetchedRef = useRef(false);
  const onErrorRef = useRef(onError);
  const onSyncedRef = useRef(onSynced);

  useEffect(() => {
    onErrorRef.current = onError;
    onSyncedRef.current = onSynced;
  }, [onError, onSynced]);

  useEffect(() => {
    const getNowWithZone = (): Date => {
      const baseDate = new Date(Date.now() + offsetRef.current);

      if (!timeZone) {
        return baseDate;
      }

      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });

      const parts = formatter.formatToParts(baseDate);

      const hour = Number(parts.find((p) => p.type === "hour")?.value);
      const minute = Number(parts.find((p) => p.type === "minute")?.value);
      const second = Number(parts.find((p) => p.type === "second")?.value);

      const fakeDate = new Date();
      fakeDate.setHours(hour, minute, second, 0);

      return fakeDate;
    };

    const update = () => {
      setTime(getNowWithZone());
    };

    update();
    const interval = setInterval(update, 1000);

    if (!hasFetchedRef.current) {
      hasFetchedRef.current = true;

      fetch("/api/time")
        .then((res) => res.json())
        .then((data) => {
          if (!data.success) {
            throw new Error("Invalid server response");
          }

          const serverDate = new Date();
          serverDate.setHours(
            data.time.hour,
            data.time.minute,
            data.time.second,
            0
          );

          offsetRef.current = serverDate.getTime() - Date.now();

          setOffset(offsetRef.current);
          setSynced(true);

          onSyncedRef.current?.(offsetRef.current);

          update();
        })
        .catch((error) => {
          console.error("Failed to sync time:", error);
          setSynced(false);
          onErrorRef.current?.(
            "عدم دسترسی به سرور برای هماهنگی ساعت؛ ساعت از سیستم شما نمایش داده می‌شود."
          );
        })
        .finally(() => {
          setLoading(false);
        });
    }

    return () => clearInterval(interval);
  }, [timeZone]);

  return { time, offset, synced, loading };
}