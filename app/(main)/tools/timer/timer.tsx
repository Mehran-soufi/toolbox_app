"use client";

import { useState } from "react";

import TimePicker from "./time-picker";
import TimerDisplay from "./timer-display";
import TimerControls from "./timer-controls";
import CircularProgress from "./circular-progress";

import useTimer from "@/hooks/use-timer";

import { playAlarm, stopAlarm } from "@/lib/alarm-sound";
import { useToolHistory } from "@/hooks/useToolHistory";

export default function TimerComponent() {
  useToolHistory({
    toolName: "تایمر",
    toolSlug: "timer",
    toolIcon: "Timer",
  });

  const [selectedTime, setSelectedTime] = useState({
    hours: 0,
    minutes: 5,
    seconds: 0,
  });

  const [hasStarted, setHasStarted] = useState(false);

  const {
    time,
    remaining,
    isRunning,

    start,
    pause,
    reset,
  } = useTimer({
    ...selectedTime,

    onComplete() {
      playAlarm();
    },
  });

  const totalSeconds =
    selectedTime.hours * 3600 +
    selectedTime.minutes * 60 +
    selectedTime.seconds;

  const progress =
    totalSeconds > 0 ? ((totalSeconds - remaining) / totalSeconds) * 100 : 0;

  const handleStart = () => {
    if (totalSeconds <= 0) return;

    setHasStarted(true);

    start();
  };

  const handleReset = () => {
    stopAlarm();
    reset(selectedTime);
    setHasStarted(false);
  };

  return (
    <div
      className="
      flex
      flex-col
      items-center
      gap-8
       border 
            border-zinc-200 
            dark:border-zinc-800 
            bg-white/60 
            dark:bg-zinc-900/50
            shadow-[0_0_35px_rgba(173,70,255,.12)] 
            backdrop-blur-xl 
            rounded-xl
      p-6
      "
    >
      {!hasStarted && (
        <TimePicker
          hours={selectedTime.hours}
          minutes={selectedTime.minutes}
          seconds={selectedTime.seconds}
          onHoursChange={(value) =>
            setSelectedTime((prev) => ({
              ...prev,
              hours: value,
            }))
          }
          onMinutesChange={(value) =>
            setSelectedTime((prev) => ({
              ...prev,
              minutes: value,
            }))
          }
          onSecondsChange={(value) =>
            setSelectedTime((prev) => ({
              ...prev,
              seconds: value,
            }))
          }
        />
      )}

      {hasStarted && (
        <div
          className="
            relative
            flex
            items-center
            justify-center
            "
        >
          <CircularProgress progress={progress} />

          <div
            className="
              absolute
              "
          >
            <TimerDisplay
              hours={time.hours}
              minutes={time.minutes}
              seconds={time.seconds}
            />
          </div>
        </div>
      )}

      <TimerControls
        isRunning={isRunning}
        onStart={handleStart}
        onPause={pause}
        onReset={handleReset}
      />
    </div>
  );
}
