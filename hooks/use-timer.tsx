"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface TimeData {
  hours: number;
  minutes: number;
  seconds: number;
}

interface TimerOptions {
  hours?: number;
  minutes?: number;
  seconds?: number;
  onComplete?: () => void;
}

const DEFAULT_TIME: TimeData = { hours: 0, minutes: 5, seconds: 0 };

export default function useTimer(options: TimerOptions = {}) {
  const { hours = 0, minutes = 5, seconds = 0, onComplete } = options;

  const [time, setTime] = useState<TimeData>(DEFAULT_TIME);
  const [remaining, setRemaining] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const maxSecondsRef = useRef<number>(0);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const toSeconds = useCallback(
    (t: TimeData) => t.hours * 3600 + t.minutes * 60 + t.seconds,
    []
  );

  const start = useCallback(() => {
    if (isRunning) return;
    if (timerRef.current) clearInterval(timerRef.current);

    const total = hours * 3600 + minutes * 60 + seconds;
    if (total <= 0) return;

    maxSecondsRef.current = total;
    setRemaining(total);
    setTime({ hours, minutes, seconds });
    setIsRunning(true);

    const startTimestamp = Date.now();

    timerRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTimestamp) / 1000);
      const left = Math.max(0, total - elapsed);

      setRemaining(left);

      const h = Math.floor(left / 3600);
      const m = Math.floor((left % 3600) / 60);
      const s = left % 60;
      setTime({ hours: h, minutes: m, seconds: s });

      if (left <= 0) {
        if (timerRef.current) clearInterval(timerRef.current);
        setIsRunning(false);
        onCompleteRef.current?.();
      }
    }, 250);
  }, [hours, minutes, seconds, isRunning]);

  const pause = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsRunning(false);
  }, []);

  const reset = useCallback(
    (newTime?: TimeData) => {
      const t = newTime ?? DEFAULT_TIME;
      if (timerRef.current) clearInterval(timerRef.current);
      setTime(t);
      setRemaining(toSeconds(t));
      setIsRunning(false);
    },
    [toSeconds]
  );

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return { time, remaining, isRunning, start, pause, reset, setTime };
}