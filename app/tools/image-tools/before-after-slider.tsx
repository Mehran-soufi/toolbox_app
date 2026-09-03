"use client";

import { useRef, useState } from "react";

interface BeforeAfterSliderProps {
  before: string;
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export default function BeforeAfterSlider({
  before,
  after,
  beforeLabel = "تصویر اصلی",
  afterLabel = "خروجی",
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [position, setPosition] = useState(50);

  const updatePosition = (clientX: number) => {
    if (!containerRef.current) {
      return;
    }

    const rect = containerRef.current.getBoundingClientRect();

    const x = clientX - rect.left;

    const percentage = (x / rect.width) * 100;

    setPosition(Math.min(100, Math.max(0, percentage)));
  };

  return (
    <div
      ref={containerRef}
      className="relative aspect-video w-full overflow-hidden rounded-2xl bg-muted select-none touch-none"
      onPointerDown={(event) => {
        updatePosition(event.clientX);
      }}
      onPointerMove={(event) => {
        if (event.buttons === 1) {
          updatePosition(event.clientX);
        }
      }}
    >
      {/* =================================
          AFTER IMAGE
      ================================== */}

      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src={after}
          alt={afterLabel}
          draggable={false}
          className="h-full w-full object-contain"
        />
      </div>

      {/* =================================
          BEFORE IMAGE
          فقط clip می‌شود و تغییر اندازه نمی‌دهد
      ================================== */}

      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          clipPath: `inset(0 ${100 - position}% 0 0)`,
        }}
      >
        <img
          src={before}
          alt={beforeLabel}
          draggable={false}
          className="absolute inset-0 h-full w-full object-contain"
        />
      </div>

      {/* =================================
          BEFORE LABEL
      ================================== */}

      <div className="absolute right-3 top-3 z-20">
        <span className="rounded-lg bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-md">
          {beforeLabel}
        </span>
      </div>

      {/* =================================
          AFTER LABEL
      ================================== */}

      <div className="absolute left-3 top-3 z-20">
        <span className="rounded-lg bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-md">
          {afterLabel}
        </span>
      </div>

      {/* =================================
          DIVIDER
      ================================== */}

      <div
        className="pointer-events-none absolute inset-y-0 z-30 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.4)]"
        style={{
          left: `${position}%`,
          transform: "translateX(-50%)",
        }}
      >
        {/* Handle */}

        <div className="pointer-events-auto absolute left-1/2 top-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border-2 border-white bg-linear-to-r from-purple-500 to-violet-500 text-white shadow-xl transition-transform hover:scale-110 active:scale-95">
          <div className="flex items-center gap-0.5 text-sm font-bold">
            <span>‹</span>
            <span>›</span>
          </div>
        </div>
      </div>

      {/* =================================
          HINT
      ================================== */}

      <div className="pointer-events-none absolute bottom-3 left-1/2 z-20 -translate-x-1/2">
        <span className="rounded-full bg-black/55 px-3 py-1.5 text-[10px] text-white backdrop-blur-md">
          برای مقایسه بکشید
        </span>
      </div>
    </div>
  );
}
