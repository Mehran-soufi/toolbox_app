"use client";

import { Pause, Play, RotateCcw } from "lucide-react";

interface TimerControlsProps {
  isRunning: boolean;

  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

export default function TimerControls({
  isRunning,

  onStart,
  onPause,
  onReset,
}: TimerControlsProps) {
  return (
    <div
      className="
      flex
      items-center
      justify-center
      gap-3
      "
    >
      {/* Start / Pause */}

      {isRunning ? (
        <button
          onClick={onPause}
          className="
          flex
          items-center
          gap-2
          rounded-2xl
          bg-purple-500/70
          xl:px-6
          md:px-5
          px-4
          xl:py-3
          md:py-2.5
          py-2
          md:text-sm
          text-xs
          font-semibold
          text-white
          transition
          hover:bg-violet-600
          active:scale-95
          "
        >
          <Pause size={18} />
          توقف
        </button>
      ) : (
        <button
          onClick={onStart}
          className="
          flex
          items-center
          gap-2
          rounded-2xl
          bg-purple-500
          xl:px-6
          md:px-5
          px-4
          xl:py-3
          md:py-2.5
          py-2
          md:text-sm
          text-xs
          font-semibold
          text-white
          transition
          hover:bg-violet-600
          active:scale-95
          "
        >
          <Play size={18} fill="currentColor" />
          شروع
        </button>
      )}

      {/* Reset */}

      <button
        onClick={onReset}
        className="
        flex
        items-center
        gap-2
        rounded-2xl
        border
        bg-background
        xl:px-6
          md:px-5
          px-4
          xl:py-3
          md:py-2.5
          py-2
        md:text-sm
        text-xs
        font-semibold
        text-muted-foreground
        transition
        hover:bg-muted
        active:scale-95
        "
      >
        <RotateCcw size={18} />
        بازنشانی
      </button>
    </div>
  );
}
