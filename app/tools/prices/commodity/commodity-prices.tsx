"use client";

import { useEffect, useState } from "react";

import {
  Activity,
  CircleDollarSign,
  Clock3,
  Fuel,
  Loader2,
  RefreshCw,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { toPersianNumber } from "@/lib/number";
import { useToolHistory } from "@/hooks/useToolHistory";

type CommodityItem = {
  date: string;
  time: string;
  time_unix: number;
  symbol: string;
  name: string;
  price: number;
  change_value: number;
  change_percent: number;
  unit: string;
};

type CommodityResponse = {
  metal_precious: CommodityItem[];
  metal_base: CommodityItem[];
  energy: CommodityItem[];
};

const sections = [
  {
    key: "metal_precious" as const,
    title: "فلزات گران‌بها",
    description: "قیمت فلزات گران‌بها",
    icon: CircleDollarSign,
  },
  {
    key: "metal_base" as const,
    title: "فلزات پایه",
    description: "قیمت فلزات پایه",
    icon: Activity,
  },
  {
    key: "energy" as const,
    title: "انرژی",
    description: "قیمت حامل‌های انرژی",
    icon: Fuel,
  },
];

export default function CommodityPrices() {
  useToolHistory({
    toolName: "کالاهای جهانی",
    toolSlug: "commodity",
    toolIcon: "Globe2",
  });

  const [data, setData] = useState<CommodityResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const fetchPrices = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const response = await fetch("/api/prices/commodity", {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch commodity prices");
      }

      const result: CommodityResponse = await response.json();

      setData(result);
    } catch (error) {
      console.error("Commodity prices error:", error);
      setError("دریافت قیمت کالاها با مشکل مواجه شد.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPrices();
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-72 w-full items-center justify-center rounded-2xl border border-zinc-200/70 bg-white/60 p-5 shadow-sm backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-900/50">
        <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
          <Loader2 className="size-4 animate-spin" />
          در حال دریافت قیمت کالاها...
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex min-h-40 w-full flex-col items-center justify-center gap-4 rounded-2xl border border-red-200 bg-red-50 p-5 text-center text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-400">
        <p>{error || "اطلاعاتی برای نمایش وجود ندارد."}</p>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => fetchPrices()}
        >
          <RefreshCw className="size-4" />
          تلاش مجدد
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-bold md:text-lg">
            قیمت کالاها
          </h2>

          <p className="mt-1 text-xs leading-6 text-zinc-500 dark:text-zinc-400">
            آخرین قیمت کالاهای منتخب بازار و میزان تغییرات آن‌ها
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => fetchPrices(true)}
          disabled={refreshing}
          className="w-full sm:w-auto"
        >
          <RefreshCw
            className={`size-4 ${
              refreshing ? "animate-spin" : ""
            }`}
          />

          {refreshing
            ? "در حال بروزرسانی..."
            : "بروزرسانی"}
        </Button>
      </div>

      {/* Sections */}
      {sections.map((section) => {
        const Icon = section.icon;
        const items = data[section.key];

        if (!items?.length) {
          return null;
        }

        return (
          <div
            key={section.key}
            className="overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/60 shadow-sm backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-900/50"
          >
            {/* Section Header */}
            <div className="flex items-center justify-between gap-3 border-b border-zinc-200/70 px-5 py-4 dark:border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500">
                  <Icon className="size-5" />
                </div>

                <div>
                  <h2 className="text-sm font-bold md:text-base">
                    {section.title}
                  </h2>

                  <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                    {section.description}
                  </p>
                </div>
              </div>

              <div className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                {toPersianNumber(items.length)} مورد
              </div>
            </div>

            {/* Items */}
            <div className="divide-y divide-zinc-200/70 dark:divide-zinc-800">
              {items.map((item) => {
                const isPositive = item.change_percent > 0;
                const isNegative = item.change_percent < 0;

                return (
                  <div
                    key={item.symbol}
                    className="px-5 py-4 transition-colors hover:bg-zinc-50/70 dark:hover:bg-zinc-800/30"
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                      {/* Name */}
                      <div className="flex items-center gap-3">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-zinc-100 text-[10px] font-bold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                          {item.symbol}
                        </div>

                        <div>
                          <p className="text-sm font-semibold">
                            {item.name}
                          </p>

                          <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                            واحد: {item.unit}
                          </p>
                        </div>
                      </div>

                      {/* Information */}
                      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:min-w-130">
                        {/* Price */}
                        <div
                          className="text-right sm:text-left"
                          dir="ltr"
                        >
                          <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            قیمت
                          </p>

                          <p className="mt-1 text-sm font-bold">
                            {formatNumber(item.price)}
                          </p>
                        </div>

                        {/* Change Value */}
                        <div
                          className="text-right sm:text-left"
                          dir="ltr"
                        >
                          <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            تغییر قیمت
                          </p>

                          <p
                            className={`mt-1 text-sm font-semibold ${
                              isPositive
                                ? "text-emerald-600 dark:text-emerald-400"
                                : isNegative
                                  ? "text-red-600 dark:text-red-400"
                                  : "text-zinc-500"
                            }`}
                          >
                            {isPositive ? "+" : ""}
                            {formatNumber(item.change_value)}
                          </p>
                        </div>

                        {/* Percentage */}
                        <div className="col-span-2 flex items-center justify-between sm:col-span-1 sm:justify-start">
                          <div>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">
                              تغییرات
                            </p>

                            <div
                              dir="ltr"
                              className={`mt-1 flex items-center gap-1.5 text-sm font-semibold ${
                                isPositive
                                  ? "text-emerald-600 dark:text-emerald-400"
                                  : isNegative
                                    ? "text-red-600 dark:text-red-400"
                                    : "text-zinc-500"
                              }`}
                            >
                              {isPositive && (
                                <TrendingUp className="size-4" />
                              )}

                              {isNegative && (
                                <TrendingDown className="size-4" />
                              )}

                              <span>
                                {isPositive ? "+" : ""}
                                {formatNumber(
                                  item.change_percent,
                                )}
                                %
                              </span>
                            </div>
                          </div>

                          {/* Time */}
                          <div className="flex items-center gap-1.5 text-xs text-zinc-400 sm:hidden">
                            <Clock3 className="size-3.5" />

                            <span dir="ltr">{item.time}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Date / Time */}
                    <div className="mt-4 hidden items-center justify-end gap-1.5 text-xs text-zinc-400 sm:flex">
                      <Clock3 className="size-3.5" />

                      <span>آخرین بروزرسانی:</span>

                      <span dir="ltr">
                        {item.date} - {item.time}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function formatNumber(value: number) {
  if (!Number.isFinite(value)) {
    return "—";
  }

  return toPersianNumber(
    new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 4,
    }).format(value),
  );
}