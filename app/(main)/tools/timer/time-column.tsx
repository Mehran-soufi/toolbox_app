"use client";

import { useEffect, useRef } from "react";
import clsx from "clsx";

interface TimeColumnProps {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}

const ITEM_HEIGHT = 52;

export default function TimeColumn({
  label,
  value,
  min,
  max,
  onChange,
}: TimeColumnProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);

  const items = Array.from(
    { length: max - min + 1 },
    (_, i) => min + i,
  );

  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.scrollTop = (value - min) * ITEM_HEIGHT;
  }, [value, min]);

  const handleScroll = () => {
    if (!containerRef.current) return;
    if (isScrolling.current) return;

    window.requestAnimationFrame(() => {
      if (!containerRef.current) return;

      const index = Math.round(
        containerRef.current.scrollTop / ITEM_HEIGHT,
      );

      const newValue = min + index;

      if (
        newValue >= min &&
        newValue <= max &&
        newValue !== value
      ) {
        onChange(newValue);
      }
    });
  };

  return (
    <div className="flex flex-col items-center">
      <span className="lg:mb-3 sm:mb-2 mb-1.5 text-sm text-muted-foreground">
        {label}
      </span>

      <div
        className="
          relative
          xl:h-65
          md:h-60
          h-50
          xl:w-24
          md:w-20
          w-16
          overflow-hidden
        "
      >
        <div
          className="
            absolute
            inset-x-0
            top-0
            z-20
            xl:h-20
            md:h-18
            h-15
            bg-linear-to-b
            from-background
            to-transparent
          "
        />

        <div
          className="
            absolute
            inset-x-0
            bottom-0
            z-20
            xl:h-20
            md:h-18
            h-15
            bg-linear-to-t
            from-background
            to-transparent
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            left-2
            right-2
            top-1/2
            z-10
            xl:h-13
            md:h-11
            h-10
            -translate-y-1/2
            rounded-md
            border
            border-purple-500/30
            bg-purple-500/10
          "
        />

        <div
          ref={containerRef}
          onScroll={handleScroll}
          className="
            h-full
            overflow-y-auto
            snap-y
            snap-mandatory
            scrollbar-none
          "
          style={{
            scrollBehavior: "smooth",
          }}
        >
          <div
            style={{
              height: ITEM_HEIGHT * 2,
            }}
          />

          {items.map((item) => {
            const active = item === value;

            return (
              <div
                key={item}
                className="
                  flex
                  items-center
                  justify-center
                  snap-center
                  transition-all
                  duration-200
                "
                style={{
                  height: ITEM_HEIGHT,
                  transform: active ? "scale(1)" : "scale(.75)",
                  opacity: active ? 1 : 0.35,
                }}
              >
                <span
                  className={clsx(
                    "font-semibold",
                    active
                      ? "xl:text-3xl md:text-2xl text-xl text-foreground"
                      : "md:text-xl text-lg text-muted-foreground",
                  )}
                >
                  {String(item).padStart(2, "0")}
                </span>
              </div>
            );
          })}

          <div
            style={{
              height: ITEM_HEIGHT * 2,
            }}
          />
        </div>
      </div>
    </div>
  );
}
