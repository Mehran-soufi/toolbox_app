"use client";

import { useCallback, useEffect, useState } from "react";

import Link from "next/link";

import {
  Clock,
  Trash2,
  X,
  Languages,
  Weight,
  Palette,
  Calculator,
  Coins,
  RefreshCw,
  History,
  Toolbox,
  type LucideIcon,
} from "lucide-react";

import { toast } from "sonner";

import {
  getToolHistory,
  removeToolHistoryItem,
  clearToolHistory,
  formatToolTime,
  type ToolHistoryItem,
} from "@/lib/tool-history";

import { cn } from "@/lib/utils";
import { toPersianNumber } from "@/lib/number";
import MainTools from "@/components/home/mainTools";

// مپ آیکون‌ها
const ICON_MAP: Record<string, LucideIcon> = {
  Languages,
  Weight,
  Palette,
  Calculator,
  Coins,
  History,
  Tool: History,
};

// مپ اکشن‌ها به فارسی
const ACTION_MAP: Record<string, string> = {
  view: "مشاهده",
  use: "استفاده",
  calculate: "محاسبه",
  translate: "ترجمه",
  generate: "تولید",
  fetch: "دریافت قیمت",
};

// مپ اکشن‌ها به رنگ
const ACTION_COLOR: Record<string, string> = {
  view: "text-blue-500",
  use: "text-violet-500",
  calculate: "text-emerald-500",
  translate: "text-amber-500",
  generate: "text-rose-500",
  fetch: "text-amber-500",
};

interface ToolHistoryProps {
  className?: string;
  maxItems?: number;
  showClearButton?: boolean;
  showRefreshButton?: boolean;
}

export default function ToolHistory({
  className,
  maxItems = 10,
  showClearButton = true,
  showRefreshButton = true,
}: ToolHistoryProps) {
  const [history, setHistory] = useState<ToolHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadHistory = useCallback(() => {
    setIsLoading(true);

    const items = getToolHistory();

    setHistory(items.slice(0, maxItems));
    setIsLoading(false);
  }, [maxItems]);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadHistory();
    }, 0);

    return () => clearTimeout(timer);
  }, [loadHistory]);

  const handleRefresh = () => {
    setIsRefreshing(true);

    setTimeout(() => {
      loadHistory();
      setIsRefreshing(false);

      toast.success("تاریخچه بروزرسانی شد");
    }, 400);
  };

  const handleRemove = (id: string) => {
    removeToolHistoryItem(id);

    setHistory((prev) => prev.filter((item) => item.id !== id));

    toast.success("مورد از تاریخچه حذف شد");
  };

  const handleClearAll = () => {
    clearToolHistory();
    setHistory([]);

    toast.success("تاریخچه با موفقیت پاک شد");
  };

  const getIcon = (iconName: string) => {
    const IconComponent = ICON_MAP[iconName] || History;

    return <IconComponent className="size-5" />;
  };

  const getToolPath = (slug: string): string => {
    return `/tools/${slug}`;
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-36 animate-pulse rounded-2xl border border-zinc-200/70 bg-zinc-100/70 dark:border-zinc-800 dark:bg-zinc-900/60"
          />
        ))}
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="my-3 flex w-full flex-col items-center justify-between gap-6">
        <div
          className={cn(
            "w-full rounded-2xl border border-zinc-200/70 bg-white/60 p-8 text-center backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-900/50",
            className,
          )}
        >
          <div className="flex flex-col items-center justify-center py-8">
            <div className="mb-3 flex size-14 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
              <Clock className="size-7 text-zinc-400" />
            </div>

            <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
              تاریخچه خالی است
            </p>

            <p className="mt-1 text-xs text-zinc-500">
              با استفاده از ابزارها، تاریخچه شما در اینجا نمایش داده می‌شود.
            </p>
          </div>
        </div>

        <div className="flex w-full flex-col items-center justify-between gap-3">
          <div className="flex w-full items-center justify-start gap-x-2">
            <Toolbox size={16} />

            <p className="text-xs font-semibold md:text-sm">
              ابزار های پیشنهادی
            </p>
          </div>

          <MainTools />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-100 flex-col gap-6">
      {/* Header */}
      <div className="mb-2 flex flex-col gap-3 sm:mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <History className="size-5 text-violet-500" />

            <h2 className="text-lg font-bold">تاریخچه استفاده</h2>
          </div>

          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            آخرین ابزارهای استفاده شده (
            {toPersianNumber(history.length)} مورد)
          </p>
        </div>

        <div className="flex items-center gap-2">
          {showRefreshButton && (
            <button
              type="button"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="inline-flex w-fit items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800"
            >
              <RefreshCw
                className={cn("size-4", isRefreshing && "animate-spin")}
              />

              بروزرسانی
            </button>
          )}

          {showClearButton && history.length > 0 && (
            <button
              type="button"
              onClick={handleClearAll}
              className="inline-flex w-fit items-center gap-2 rounded-xl border border-red-200 bg-white px-3 py-2 text-sm text-red-600 transition hover:bg-red-50 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-400 dark:hover:bg-red-950/40"
            >
              <Trash2 className="size-4" />

              پاک کردن همه
            </button>
          )}
        </div>
      </div>

      {/* Grid کارت‌ها */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {history.map((item, index) => {
          const isFirst = index === 0;
          const IconComponent = getIcon(item.toolIcon);
          const actionLabel = ACTION_MAP[item.action] || item.action;
          const actionColor =
            ACTION_COLOR[item.action] || "text-zinc-500";

          return (
            <div
              key={item.id}
              className={cn(
                "group relative overflow-hidden rounded-2xl border p-4 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
                isFirst
                  ? "border-violet-200/80 bg-violet-50/60 dark:border-violet-800/60 dark:bg-violet-950/20"
                  : "border-zinc-200/70 bg-white/70 dark:border-zinc-800 dark:bg-zinc-900/60",
              )}
            >
              {/* افکت پس‌زمینه */}
              <div
                className={cn(
                  "absolute -left-10 -top-10 size-24 rounded-full blur-2xl transition group-hover:scale-110",
                  isFirst
                    ? "bg-violet-500/10 group-hover:bg-violet-500/20"
                    : "bg-zinc-500/5 group-hover:bg-zinc-500/10",
                )}
              />

              <div className="relative">
                {/* هدر کارت */}
                <div className="flex items-start justify-between gap-3">
                  <Link
                    href={getToolPath(item.toolSlug)}
                    className="min-w-0 flex-1"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "flex size-11 shrink-0 items-center justify-center rounded-xl",
                          isFirst
                            ? "bg-violet-500/10 text-violet-600 dark:text-violet-400"
                            : "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400",
                        )}
                      >
                        {IconComponent}
                      </div>

                      <div className="min-w-0">
                        <p
                          className={cn(
                            "truncate font-semibold transition-colors hover:text-violet-500",
                            isFirst &&
                              "text-violet-700 dark:text-violet-400",
                          )}
                        >
                          {item.toolName}
                        </p>

                        <div className="mt-1 flex flex-wrap items-center gap-2">
                          <span
                            className={cn(
                              "text-xs font-medium",
                              actionColor,
                            )}
                          >
                            {actionLabel}
                          </span>

                          {isFirst && (
                            <span className="whitespace-nowrap rounded bg-emerald-50 px-1.5 py-0.5 text-[8px] font-medium text-emerald-500 dark:bg-emerald-950/30">
                              آخرین استفاده
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>

                  {/* دکمه حذف */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(item.id);
                    }}
                    className="flex size-7 shrink-0 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-red-100 hover:text-red-500 dark:hover:bg-red-950/50"
                    title="حذف از تاریخچه"
                  >
                    <X className="size-3.5" />
                  </button>
                </div>

                {/* فوتر کارت - زمان */}
                <div className="mt-5 flex items-center justify-between border-t border-zinc-200/70 pt-3 text-xs dark:border-zinc-800">
                  <span className="text-zinc-500 dark:text-zinc-400">
                    {isFirst ? "آخرین استفاده" : "زمان استفاده"}
                  </span>

                  <span className="font-medium">
                    {formatToolTime(item.timestamp)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}