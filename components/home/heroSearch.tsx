"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";

import { tools } from "@/lib/tools";
import { cn } from "@/lib/utils";

export default function HeroSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredTools =
    query.trim().length > 0
      ? tools.filter((tool) =>
          tool.name.toLowerCase().includes(query.trim().toLowerCase()),
        )
      : [];

  /* ==========================================
     بستن با کلیک بیرون
     ========================================== */

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /* ==========================================
     بستن با Escape
     ========================================== */

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        setQuery("");
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  /* ==========================================
     فوکوس روی Input
     ========================================== */

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    setQuery("");
  };

  return (
    <div ref={containerRef} className="relative w-full p-2">
      {/* ========================================
          Search Input
          ======================================== */}

      <div
        className={cn(
          "relative flex items-center justify-between gap-x-2",
          "lg:w-11/12 w-full",
          "rounded-xl p-2 py-2",
          "isolate",
          "bg-white/20 dark:bg-neutral-900/30",
          "shadow-lg",
          "ring-1 ring-black/5 dark:ring-white/10",
          "backdrop-blur-lg",
          "transition-all duration-200",
          "hover:bg-white/30 dark:hover:bg-black/40",
          "focus-within:ring-2 focus-within:ring-purple-500/60",
        )}
      >
        {/* Search Icon */}

        <div className="flex shrink-0 items-center justify-center text-gray-600 dark:text-gray-300">
          <Search size={16} />
        </div>

        {/* Input */}

        <div className="flex-1">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => {
              if (query.trim()) {
                setIsOpen(true);
              }
            }}
            placeholder="جستجو ابزار مورد نظر..."
            className="
              w-full
              bg-transparent
              border-none
              outline-none
              text-gray-800 dark:text-gray-100
              placeholder:text-gray-500 dark:placeholder:text-gray-400
              md:placeholder:text-base
              placeholder:text-sm
            "
            aria-label="جستجوی ابزار"
          />
        </div>

        {/* Clear */}

        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            className="
              shrink-0
              rounded-md
              p-1
              text-gray-500
              transition
              hover:bg-black/5
              hover:text-gray-700
              dark:text-gray-400
              dark:hover:bg-white/10
              dark:hover:text-gray-200
            "
            aria-label="پاک کردن جستجو"
          >
            <X size={15} />
          </button>
        )}
      </div>

      {/* ========================================
          Search Results
          ======================================== */}

      {isOpen && query.trim() && (
        <HeroSearchResults results={filteredTools} onSelect={handleClose} />
      )}
    </div>
  );
}

/* ==========================================
   Results
   ========================================== */

interface HeroSearchResultsProps {
  results: typeof tools;
  onSelect: () => void;
}

function HeroSearchResults({ results, onSelect }: HeroSearchResultsProps) {
  return (
    <div
      className={cn(
        "absolute left-2 top-[calc(100%-2px)] z-50",
        "lg:w-[calc(91.666667%-8px)] w-[calc(100%-16px)]",
        "overflow-hidden rounded-2xl border",
        "border-zinc-200/70",
        "bg-white/95 shadow-xl backdrop-blur-xl",
        "dark:border-zinc-800",
        "dark:bg-zinc-900/95",
      )}
    >
      {results.length > 0 ? (
        <div className="max-h-80 overflow-y-auto p-2">
          {results.map((tool) => {
            const Icon = tool.icon;

            return (
              <Link
                key={tool.href}
                href={tool.href}
                onClick={onSelect}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5",
                  "transition-colors",
                  "hover:bg-zinc-100 dark:hover:bg-zinc-800",
                )}
              >
                {/* Icon */}

                <div
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-lg",
                    "bg-zinc-100 dark:bg-zinc-800",
                  )}
                >
                  <Icon className={cn("size-4.5", tool.color)} />
                </div>

                {/* Name */}

                <span className="truncate text-sm font-medium">
                  {tool.name}
                </span>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="px-4 py-8 text-center">
          <Search className="mx-auto mb-2 size-7 text-zinc-300 dark:text-zinc-700" />

          <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
            ابزاری پیدا نشد
          </p>

          <p className="mt-1 text-xs text-zinc-400">
            نام ابزار دیگری را امتحان کنید.
          </p>
        </div>
      )}
    </div>
  );
}
