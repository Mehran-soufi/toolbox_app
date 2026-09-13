"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  clearFavoriteTools,
  getFavoriteTools,
  removeFavoriteTool,
  type FavoriteTool,
} from "@/lib/favorite-tools";
import { cn } from "@/lib/utils";
import MainTools from "@/components/home/mainTools";
import type { LucideIcon } from "lucide-react";
import {
  Languages,
  Weight,
  Palette,
  Calculator,
  Coins,
  Bitcoin,
  DollarSign,
  ShoppingBasket,
  Heart,
  History,
  RefreshCw,
  Toolbox,
  ReceiptCent,
  Trash2,
  X,
} from "lucide-react";
import { toPersianNumber } from "@/lib/number";

const ICON_MAP: Record<string, LucideIcon> = {
  Languages,
  Weight,
  Palette,
  Calculator,
  Coins,
  Bitcoin,
  DollarSign,
  ShoppingBasket,
  Heart,
  History,
  RefreshCw,
  ReceiptCent,
  Tool: History,
};

const SLUG_ICON_MAP: Record<string, LucideIcon> = {
  translate: Languages,
  "bmi-calculator": Weight,
  bmi: Weight,
  "color-tools": Palette,
  calculator: Calculator,
  gold: Coins,
  "gold-prices": Coins,
  currency: DollarSign,
  "currency-prices": DollarSign,
  "crypto-currency": Bitcoin,
  "crypto-prices": Bitcoin,
  commodities: ShoppingBasket,
  "commodity-prices": ShoppingBasket,
  prices: ReceiptCent,
};

interface FavoriteToolsProps {
  className?: string;
  maxItems?: number;
  showClearButton?: boolean;
  showRefreshButton?: boolean;
}

export default function FavoriteTools({
  className,
  maxItems = 50,
  showClearButton = true,
  showRefreshButton = true,
}: FavoriteToolsProps) {
  const [favorites, setFavorites] = useState<FavoriteTool[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadFavorites = useCallback(() => {
    const items = getFavoriteTools();
    setFavorites(items.slice(0, maxItems));
    setIsLoading(false);
  }, [maxItems]);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadFavorites();
    }, 0);

    return () => clearTimeout(timer);
  }, [loadFavorites]);

  const handleRefresh = () => {
    setIsRefreshing(true);

    setTimeout(() => {
      loadFavorites();
      setIsRefreshing(false);
      toast.success("محبوب‌ها بروزرسانی شدند");
    }, 400);
  };

  const handleRemove = (toolSlug: string) => {
    removeFavoriteTool(toolSlug);

    setFavorites((prev) =>
      prev.filter((item) => item.toolSlug !== toolSlug)
    );

    toast.success("ابزار از محبوب‌ها حذف شد");
  };

  const handleClearAll = () => {
    clearFavoriteTools();
    setFavorites([]);
    toast.success("محبوب‌ها با موفقیت پاک شدند");
  };

  const getIcon = (iconName: string, toolSlug: string) => {
    const SlugIcon = SLUG_ICON_MAP[toolSlug];

    if (SlugIcon) {
      return <SlugIcon className="size-5" />;
    }

    const IconComponent = ICON_MAP[iconName];

    if (IconComponent) {
      return <IconComponent className="size-5" />;
    }

    return <History className="size-5" />;
  };

  const getToolPath = (slug: string) => `/tools/${slug}`;

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-40 animate-pulse rounded-2xl border border-zinc-200/70 bg-zinc-100/70 dark:border-zinc-800 dark:bg-zinc-900/60"
          />
        ))}
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="my-3 flex min-h-100 w-full flex-col items-center gap-6">
        <div
          className={cn(
            "w-full rounded-2xl border border-zinc-200/70",
            "bg-white/60 p-8 text-center backdrop-blur-xl",
            "dark:border-zinc-800 dark:bg-zinc-900/50",
            className
          )}
        >
          <div className="flex flex-col items-center justify-center py-8">
            <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-rose-500/10">
              <Heart className="size-7 text-rose-500" />
            </div>

            <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              هنوز ابزاری به محبوب‌ها اضافه نکرده‌اید
            </p>

            <p className="mt-2 max-w-md text-xs leading-6 text-zinc-500 dark:text-zinc-400">
              ابزارهای مورد علاقه خود را با انتخاب گزینه
              «افزودن به محبوب‌ها» ذخیره کنید تا دسترسی
              سریع‌تری به آن‌ها داشته باشید.
            </p>
          </div>
        </div>

        <div className="flex w-full flex-col items-center justify-between gap-3">
          <div className="flex w-full items-center justify-start gap-x-2">
            <Toolbox size={16} />
            <p className="text-xs font-semibold md:text-sm">
              ابزارهای پیشنهادی
            </p>
          </div>

          <MainTools />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-100 flex-col gap-6">
      <div className="mb-2 flex flex-col gap-3 sm:mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Heart className="size-5 fill-rose-500 text-rose-500" />

            <h2 className="text-lg font-bold">
              ابزارهای محبوب
            </h2>
          </div>

          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            ابزارهای ذخیره‌شده در لیست محبوب‌ها (
            {toPersianNumber(favorites.length)} مورد)
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
                className={cn(
                  "size-4",
                  isRefreshing && "animate-spin"
                )}
              />

              بروزرسانی
            </button>
          )}

          {showClearButton && favorites.length > 0 && (
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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {favorites.map((item) => (
          <div
            key={item.toolSlug}
            className="group relative overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/70 p-4 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900/60"
          >
            <div className="pointer-events-none absolute -left-10 -top-10 size-24 rounded-full bg-rose-500/5 blur-2xl transition group-hover:scale-110 group-hover:bg-rose-500/10" />

            <div className="relative">
              <div className="flex items-start justify-between gap-3">
                <Link
                  href={getToolPath(item.toolSlug)}
                  className="min-w-0 flex-1"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-rose-500/10 text-rose-500">
                      {getIcon(item.toolIcon, item.toolSlug)}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-semibold transition-colors hover:text-rose-500">
                        {item.toolName}
                      </p>

                      <div className="mt-1 flex items-center gap-1.5">
                        <Heart className="size-3 fill-rose-500 text-rose-500" />

                        <span className="text-xs text-zinc-500 dark:text-zinc-400">
                          محبوب
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>

                <button
                  type="button"
                  onClick={() => handleRemove(item.toolSlug)}
                  className="flex size-7 shrink-0 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-red-100 hover:text-red-500 dark:hover:bg-red-950/50"
                  title="حذف از محبوب‌ها"
                  aria-label="حذف از محبوب‌ها"
                >
                  <X className="size-3.5" />
                </button>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-zinc-200/70 pt-3 text-xs dark:border-zinc-800">
                <span className="text-zinc-500 dark:text-zinc-400">
                  اضافه شده
                </span>

                <span className="font-medium">
                  {formatFavoriteTime(item.addedAt)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function formatFavoriteTime(timestamp: number) {
  if (
    typeof timestamp !== "number" ||
    !Number.isFinite(timestamp) ||
    timestamp <= 0
  ) {
    return "زمان نامشخص";
  }

  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) {
    return "لحظاتی پیش";
  }

  if (minutes < 60) {
    return `${toPersianNumber(minutes)} دقیقه پیش`;
  }

  if (hours < 24) {
    return `${toPersianNumber(hours)} ساعت پیش`;
  }

  if (days < 7) {
    return `${toPersianNumber(days)} روز پیش`;
  }

  return toPersianNumber(
    new Date(timestamp).toLocaleDateString("fa-IR")
  );
}