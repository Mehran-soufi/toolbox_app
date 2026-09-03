"use client";

import TimeColumn from "./time-column";

interface TimePickerProps {
  hours: number;
  minutes: number;
  seconds: number;

  onHoursChange: (value: number) => void;
  onMinutesChange: (value: number) => void;
  onSecondsChange: (value: number) => void;
}

export default function TimePicker({
  hours,
  minutes,
  seconds,

  onHoursChange,
  onMinutesChange,
  onSecondsChange,
}: TimePickerProps) {
  return (
    <div
      className="
      flex
      items-center
      justify-center
      gap-2
      border 
            border-zinc-200 
            dark:border-zinc-800 
            bg-white/60 
            dark:bg-zinc-900/50
            shadow-[0_0_35px_rgba(173,70,255,.12)] 
            backdrop-blur-xl 
            rounded-xl
      lg:p-5
      sm:p-3
      p-2
      "
    >
      <TimeColumn
        label="ثانیه"
        value={seconds}
        min={0}
        max={59}
        onChange={onSecondsChange}
      />

      <div
        className="
        lg:text-3xl
        sm:text-2xl
        text-xl
        font-bold
        text-muted-foreground
        "
      >
        :
      </div>

      <TimeColumn
        label="دقیقه"
        value={minutes}
        min={0}
        max={59}
        onChange={onMinutesChange}
      />

      <div
        className="
        lg:text-3xl
        sm:text-2xl
        text-xl
        font-bold
        text-muted-foreground
        "
      >
        :
      </div>

      <TimeColumn
        label="ساعت"
        value={hours}
        min={0}
        max={24}
        onChange={onHoursChange}
      />
    </div>
  );
}
