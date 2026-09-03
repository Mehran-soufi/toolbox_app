"use client";

interface TimerDisplayProps {
  hours: number;
  minutes: number;
  seconds: number;
}

function formatNumber(value: number) {
  return String(value).padStart(2, "0");
}

export default function TimerDisplay({
  hours,
  minutes,
  seconds,
}: TimerDisplayProps) {
  return (
    <div
      className="
      flex
      flex-col
      items-center
      justify-center
      "
    >
      <div
        className="
        flex
        items-center
        gap-2
        rounded-3xl
        bg-muted/40
        xl:px-8
        md:px-7
        px-4
        xl:py-5
        md:py-4
        py-2
        "
      >
        <TimeUnit value={seconds} label="ثانیه" />

        <span
          className="
          xl:text-4xl
          md:text-3xl
          text-2xl
          font-bold
          text-muted-foreground
          "
        >
          :
        </span>

        <TimeUnit value={minutes} label="دقیقه" />

        <span
          className="
          xl:text-4xl
          md:text-3xl
          text-2xl
          font-bold
          text-muted-foreground
          "
        >
          :
        </span>

        <TimeUnit value={hours} label="ساعت" />
      </div>
    </div>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div
      className="
      flex
      min-w-20
      flex-col
      items-center
      "
    >
      <span
        className="
        xl:text-5xl
        md:text-4xl
        text-3xl
        font-bold
        tracking-wider
        text-foreground
        tabular-nums
        "
      >
        {formatNumber(value)}
      </span>

      <span
        className="
        mt-1
        md:text-sm
        text-xs
        text-muted-foreground
        "
      >
        {label}
      </span>
    </div>
  );
}
