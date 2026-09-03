"use client";

import { useEffect, useRef, useState } from "react";
import {
  Calculator,
  CloudSun,
  Coins,
  FileText,
  Image,
  MapPinned,
  Sparkles,
  Timer,
} from "lucide-react";

import {
  tools,
  type Tool,
  type ToolCategory,
} from "@/lib/tools";

import ToolCard from "./tool-card";
import { toPersianNumber } from "@/lib/number";

const TOOLS_PER_LOAD = 8;

type Filter = "all" | "popular" | ToolCategory;

const filters: {
  id: Filter;
  label: string;
  icon: typeof Calculator;
}[] = [
  {
    id: "all",
    label: "همه",
    icon: Calculator,
  },
  {
    id: "popular",
    label: "پرکاربرد",
    icon: Sparkles,
  },
  {
    id: "time",
    label: "زمان و تاریخ",
    icon: Timer,
  },
  {
    id: "calculation",
    label: "محاسبات و تبدیل",
    icon: Calculator,
  },
  {
    id: "text",
    label: "متن و زبان",
    icon: FileText,
  },
  {
    id: "media",
    label: "تصویر و کد",
    icon: Image,
  },
  {
    id: "finance",
    label: "مالی",
    icon: Coins,
  },
  {
    id: "location",
    label: "مکان و مسیر",
    icon: MapPinned,
  },
  {
    id: "utility",
    label: "ابزارهای کاربردی",
    icon: CloudSun,
  },
];

function ToolCardSkeleton() {
  return (
    <div
      className="
        min-h-44
        animate-pulse
        rounded-2xl
        border
        border-zinc-200/70
        bg-white/70
        p-5
        shadow-sm
        dark:border-zinc-800/80
        dark:bg-zinc-900/60
      "
    >
      <div className="flex items-start justify-between gap-3">
        <div
          className="
            size-12
            rounded-xl
            bg-zinc-200
            dark:bg-zinc-800
          "
        />

        <div
          className="
            h-6
            w-16
            rounded-lg
            bg-zinc-200
            dark:bg-zinc-800
          "
        />
      </div>

      <div className="mt-5 space-y-3">
        <div
          className="
            h-4
            w-28
            rounded
            bg-zinc-200
            dark:bg-zinc-800
          "
        />

        <div className="space-y-2">
          <div
            className="
              h-3
              w-full
              rounded
              bg-zinc-200
              dark:bg-zinc-800
            "
          />

          <div
            className="
              h-3
              w-3/4
              rounded
              bg-zinc-200
              dark:bg-zinc-800
            "
          />
        </div>
      </div>

      <div
        className="
          mt-8
          border-t
          border-zinc-200/70
          pt-4
          dark:border-zinc-800
        "
      >
        <div
          className="
            ml-auto
            h-3
            w-24
            rounded
            bg-zinc-200
            dark:bg-zinc-800
          "
        />
      </div>
    </div>
  );
}

function getFilteredTools(filter: Filter): Tool[] {
  if (filter === "all") {
    return tools;
  }

  if (filter === "popular") {
    return tools.filter((tool) => tool.isPopular);
  }

  return tools.filter((tool) => tool.category === filter);
}

export default function AllTools() {
  const [activeFilter, setActiveFilter] =
    useState<Filter>("all");

  const [visibleCount, setVisibleCount] = useState(
    TOOLS_PER_LOAD,
  );

  const [isLoadingMore, setIsLoadingMore] =
    useState(false);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const filteredTools = getFilteredTools(activeFilter);

  const isAllFilter = activeFilter === "all";

  const visibleTools = isAllFilter
    ? filteredTools.slice(0, visibleCount)
    : filteredTools;

  const hasMore =
    isAllFilter &&
    visibleCount < filteredTools.length;

  // تغییر دسته
  function handleFilterChange(filter: Filter) {
    setActiveFilter(filter);
    setVisibleCount(TOOLS_PER_LOAD);
    setIsLoadingMore(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // Infinite Scroll
  useEffect(() => {
    if (!isAllFilter || !hasMore) {
      return;
    }

    const target = loadMoreRef.current;

    if (!target) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (!entry.isIntersecting) {
          return;
        }

        setIsLoadingMore((loading) => {
          if (loading) {
            return true;
          }

          return true;
        });

        const timer = window.setTimeout(() => {
          setVisibleCount((current) =>
            Math.min(
              current + TOOLS_PER_LOAD,
              filteredTools.length,
            ),
          );

          setIsLoadingMore(false);
        }, 450);

        return () => {
          window.clearTimeout(timer);
        };
      },
      {
        rootMargin: "300px",
      },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [
    activeFilter,
    filteredTools.length,
    hasMore,
    isAllFilter,
  ]);

  const count = filteredTools.length;

  return (
    <section className="w-full">
      {/* Section Header */}
      <div className="mb-6 flex flex-col gap-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div
                className="
                  flex size-9
                  items-center justify-center
                  rounded-xl
                  bg-violet-500/10
                  text-violet-500
                "
              >
                <Calculator className="size-5" />
              </div>

              <h2
                className="
                  text-lg
                  font-bold
                  text-zinc-800
                  dark:text-zinc-100
                "
              >
                همه ابزارها
              </h2>
            </div>

            <p
              className="
                mt-2
                text-xs
                text-zinc-500
                dark:text-zinc-400
              "
            >
              ابزار موردنظر خود را از میان دسته‌بندی‌های مختلف
              پیدا کنید.
            </p>
          </div>

          {/* Tool Count */}
          <div
            className="
              shrink-0
              rounded-xl
              border
              border-zinc-200/70
              bg-white/60
              px-3 py-2
              text-xs
              text-zinc-500
              backdrop-blur-xl
              dark:border-zinc-800
              dark:bg-zinc-900/50
              dark:text-zinc-400
            "
          >
            {toPersianNumber(count)} ابزار
          </div>
        </div>

        {/* Filters */}
        <div
          className="
            flex
            gap-2
            overflow-x-auto
            pb-1
            scrollbar-none
          "
        >
          {filters.map((filter) => {
            const Icon = filter.icon;
            const isActive = activeFilter === filter.id;

            return (
              <button
                key={filter.id}
                type="button"
                onClick={() =>
                  handleFilterChange(filter.id)
                }
                className={`
                  inline-flex
                  shrink-0
                  items-center
                  gap-2
                  rounded-xl
                  border
                  px-3.5
                  py-2.5
                  text-xs
                  font-medium
                  transition-all
                  duration-200

                  ${
                    isActive
                      ? `
                        border-violet-500
                        bg-violet-500
                        text-white
                        shadow-sm
                      `
                      : `
                        border-zinc-200/70
                        bg-white/60
                        text-zinc-500
                        hover:border-violet-200
                        hover:bg-violet-50
                        hover:text-violet-600
                        dark:border-zinc-800
                        dark:bg-zinc-900/50
                        dark:text-zinc-400
                        dark:hover:border-violet-900
                        dark:hover:bg-violet-500/10
                        dark:hover:text-violet-400
                      `
                  }
                `}
              >
                <Icon className="size-4" />
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tools Grid */}
      <div
        className="
          grid
          grid-cols-1
          gap-4
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
        "
      >
        {visibleTools.map((tool) => (
          <ToolCard
            key={tool.id}
            tool={tool}
          />
        ))}

        {/* Skeleton */}
        {isLoadingMore &&
          Array.from({
            length: Math.min(
              TOOLS_PER_LOAD,
              filteredTools.length - visibleCount,
            ),
          }).map((_, index) => (
            <ToolCardSkeleton
              key={`skeleton-${index}`}
            />
          ))}
      </div>

      {/* Infinite Scroll Trigger */}
      {hasMore && (
        <div
          ref={loadMoreRef}
          className="
            flex
            min-h-20
            items-center
            justify-center
          "
          aria-hidden="true"
        />
      )}

      {/* End Message */}
      {!hasMore && filteredTools.length > TOOLS_PER_LOAD && (
        <div
          className="
            mt-8
            flex
            items-center
            justify-center
          "
        >
          <p
            className="
              text-xs
              text-zinc-400
              dark:text-zinc-500
            "
          >
            همه ابزارها نمایش داده شدند
          </p>
        </div>
      )}

      {/* Empty State */}
      {filteredTools.length === 0 && (
        <div
          className="
            flex
            min-h-52
            items-center
            justify-center
            rounded-2xl
            border
            border-dashed
            border-zinc-200
            text-sm
            text-zinc-400
            dark:border-zinc-800
          "
        >
          ابزاری در این دسته وجود ندارد.
        </div>
      )}
    </section>
  );
}
