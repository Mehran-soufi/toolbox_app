"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Search, X } from "lucide-react";

import { tools } from "@/lib/tools";
import { cn } from "@/lib/utils";

interface ToolSearchProps {
  visible?: boolean;
}

export default function ToolSearch({ visible = true }: ToolSearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);
  const desktopInputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);

  const filteredTools =
    query.trim().length > 0
      ? tools.filter((tool) =>
          tool.name.toLowerCase().includes(query.trim().toLowerCase()),
        )
      : [];

  /* بستن با کلیک بیرون */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        containerRef.current?.contains(target) ||
        mobilePanelRef.current?.contains(target)
      ) {
        return;
      }

      setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /* بستن با Escape */
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

  /* فوکوس روی Input */
  useEffect(() => {
    if (!isOpen) return;

    requestAnimationFrame(() => {
      if (window.innerWidth >= 1024) {
        desktopInputRef.current?.focus();
      } else {
        mobileInputRef.current?.focus();
      }
    });
  }, [isOpen]);

  if (!visible) return null;

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setQuery("");
  };

  return (
    <div ref={containerRef} className="relative">
      {/* ==========================================
          Desktop
          ========================================== */}

      <div className="hidden lg:block">
        <div
          className={cn(
            "relative flex h-10 w-64 items-center gap-2 rounded-xl border px-3",
            "border-zinc-200 bg-white/70",
            "dark:border-zinc-800 dark:bg-zinc-900/60",
            "transition-all duration-300",
            "focus-within:border-violet-400",
            "focus-within:ring-2 focus-within:ring-violet-500/10",
          )}
        >
          <Search className="size-4 shrink-0 text-zinc-400" />

          <input
            ref={desktopInputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder="جستجوی ابزار..."
            className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-400"
            aria-label="جستجوی ابزار"
          />

          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                desktopInputRef.current?.focus();
              }}
              className={cn(
                "rounded-md p-1 text-zinc-400",
                "transition hover:bg-zinc-100 hover:text-zinc-600",
                "dark:hover:bg-zinc-800 dark:hover:text-zinc-300",
              )}
              aria-label="پاک کردن جستجو"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>

        {isOpen && query.trim() && (
          <SearchResults results={filteredTools} onSelect={handleClose} />
        )}
      </div>

      {/* ==========================================
          Tablet / Mobile
          ========================================== */}

      <div className="lg:hidden">
        {/* Search Button */}

        <button
          type="button"
          onClick={handleOpen}
          className={cn(
            "relative z-50 flex size-10 items-center justify-center rounded-xl border",
            "border-zinc-200 bg-white/70",
            "text-zinc-600 transition-all duration-200",
            "hover:border-violet-300 hover:bg-white hover:text-violet-500",
            "dark:border-zinc-800 dark:bg-zinc-900/60",
            "dark:text-zinc-300 dark:hover:border-violet-700",
            "dark:hover:bg-zinc-800",
          )}
          aria-label="جستجوی ابزار"
          aria-expanded={isOpen}
        >
          <Search className="size-5" />
        </button>

        {/* Mobile Search Panel */}

        {isOpen &&
          typeof document !== "undefined" &&
          createPortal(
            <div
              ref={mobilePanelRef}
              className={cn(
                "fixed inset-x-3 top-16 z-100",
                "rounded-2xl border p-3",
                "border-zinc-200 bg-white/95",
                "shadow-[0_12px_40px_rgba(0,0,0,0.12)]",
                "backdrop-blur-xl",
                "dark:border-zinc-800 dark:bg-zinc-900/95",
                "dark:shadow-[0_12px_40px_rgba(0,0,0,0.35)]",
              )}
            >
              {/* Input */}
              <div
                className={cn(
                  "flex h-12 w-full items-center gap-2 rounded-xl border px-3",
                  "border-zinc-200 bg-zinc-50",
                  "dark:border-zinc-700 dark:bg-zinc-800/70",
                  "focus-within:border-violet-400",
                  "focus-within:ring-2 focus-within:ring-violet-500/10",
                )}
              >
                <Search className="size-4 shrink-0 text-zinc-400" />

                <input
                  ref={mobileInputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="نام ابزار را جستجو کنید..."
                  className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-400"
                  aria-label="جستجوی ابزار"
                />

                {query && (
                  <button
                    type="button"
                    onClick={() => {
                      setQuery("");
                      mobileInputRef.current?.focus();
                    }}
                    className="rounded-md p-1.5 text-zinc-400 transition hover:bg-zinc-200 dark:hover:bg-zinc-700"
                    aria-label="پاک کردن"
                  >
                    <X className="size-4" />
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleClose}
                  className="rounded-md p-1.5 text-zinc-400 transition hover:bg-zinc-200 hover:text-zinc-700 dark:hover:bg-zinc-700 dark:hover:text-zinc-200"
                  aria-label="بستن جستجو"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* Results */}
              {query.trim() && (
                <SearchResults
                  results={filteredTools}
                  onSelect={handleClose}
                  mobile
                />
              )}
            </div>,
            document.body,
          )}
      </div>
    </div>
  );
}

/* ==========================================
   Search Results
   ========================================== */

interface SearchResultsProps {
  results: typeof tools;
  onSelect: () => void;
  mobile?: boolean;
}

function SearchResults({
  results,
  onSelect,
  mobile = false,
}: SearchResultsProps) {
  return (
    <div
      className={cn(
        mobile
          ? "relative mt-3 w-full"
          : "absolute left-0 top-[calc(100%+8px)] w-full",
        "z-50 overflow-hidden rounded-2xl border",
        "border-zinc-200 bg-white/95 shadow-xl backdrop-blur-xl",
        "dark:border-zinc-800 dark:bg-zinc-900/95",
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
                <div
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-lg",
                    "bg-zinc-100 dark:bg-zinc-800",
                  )}
                >
                  <Icon className={cn("size-4.5", tool.color)} />
                </div>

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
