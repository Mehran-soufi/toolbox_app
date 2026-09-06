"use client";

import { useEffect, useState } from "react";

import {
  ArrowDown,
  ArrowUp,
  Banknote,
  RefreshCw,
  TrendingUp,
} from "lucide-react";

import { toPersianNumber } from "@/lib/number";
import { useToolHistory } from "@/hooks/useToolHistory";

type CurrencyItem = {
  date: string;
  time: string;
  time_unix: number;
  symbol: string;
  name_en: string;
  name: string;
  price: number;
  change_value: number;
  change_percent: number;
  unit: string;
};

type PricesResponse = {
  currency: CurrencyItem[];
};

const currencySymbols = [
  "USD",
  "EUR",
  "GBP",
  "AED",
  "JPY",
  "CNY",
  "TRY",
  "RUB",
  "AZN",
  "GEL",
  "SAR",
  "KWD",
  "OMR",
  "BHD",
  "INR",
  "PKR",
  "IQD",
  "AFN",
  "CHF",
  "SEK",
  "QAR",
  "MYR",
  "THB",
  "SYP",
  "CAD",
  "AUD",
];

export default function CurrencyPrices() {
  useToolHistory({
    toolName: "ارز",
    toolSlug: "currency",
    toolIcon: "Banknote",
  });

  const [currencies, setCurrencies] = useState<CurrencyItem[]>([]);
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

      const response = await fetch("/api/prices");

      if (!response.ok) {
        throw new Error("خطا در دریافت قیمت ارزها");
      }

      const data: PricesResponse = await response.json();

      const filteredCurrencies = currencySymbols
        .map((symbol) =>
          data.currency?.find(
            (item) => item.symbol === symbol,
          ),
        )
        .filter(
          (item): item is CurrencyItem => Boolean(item),
        );

      setCurrencies(filteredCurrencies);
    } catch (error) {
      console.error("Currency Prices Error:", error);

      setError(
        "دریافت اطلاعات قیمت ارزها با مشکل مواجه شد.",
      );
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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fa-IR").format(price);
  };

  const CurrencyCard = ({
    item,
  }: {
    item: CurrencyItem;
  }) => {
    const isPositive = item.change_percent > 0;
    const isNegative = item.change_percent < 0;

    return (
      <div className="group relative overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/70 p-4 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900/60">
        <div className="absolute -left-10 -top-10 size-24 rounded-full bg-blue-500/5 blur-2xl transition group-hover:bg-blue-500/10" />

        <div className="relative">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <Banknote className="size-5" />
              </div>

              <div>
                <p className="font-semibold">{item.name}</p>

                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                  {item.symbol}
                </p>
              </div>
            </div>

            {/* Change */}
            <div
              dir="ltr"
              className={`flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold ${
                isPositive
                  ? "bg-green-500/10 text-green-600 dark:text-green-400"
                  : isNegative
                    ? "bg-red-500/10 text-red-600 dark:text-red-400"
                    : "bg-zinc-500/10 text-zinc-500"
              }`}
            >
              {isPositive ? (
                <ArrowUp className="size-3.5" />
              ) : isNegative ? (
                <ArrowDown className="size-3.5" />
              ) : null}

              {isPositive ? "+" : ""}
              {item.change_percent}%
            </div>
          </div>

          {/* Price */}
          <div className="mt-6">
            <p className="text-2xl font-bold tracking-tight">
              {formatPrice(item.price)}
            </p>

            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              {item.unit}
            </p>
          </div>

          {/* Footer */}
          <div className="mt-5 flex items-center justify-between border-t border-zinc-200/70 pt-3 text-xs dark:border-zinc-800">
            <span className="text-zinc-500 dark:text-zinc-400">
              بروزرسانی
            </span>

            <span className="font-medium">
              {toPersianNumber(item.time)}
            </span>
          </div>
        </div>
      </div>
    );
  };

  /* Loading */
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, index) => (
          <div
            key={index}
            className="h-44 animate-pulse rounded-2xl border border-zinc-200/70 bg-zinc-100/70 dark:border-zinc-800 dark:bg-zinc-900/60"
          />
        ))}
      </div>
    );
  }

  /* Error */
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-red-200 bg-red-50 p-10 text-center dark:border-red-900/50 dark:bg-red-950/20">
        <p className="text-sm text-red-600 dark:text-red-400">
          {error}
        </p>

        <button
          type="button"
          onClick={() => fetchPrices(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
        >
          <RefreshCw className="size-4" />
          تلاش مجدد
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="size-5 text-blue-500" />

            <h2 className="text-lg font-bold">
              قیمت ارزها
            </h2>
          </div>

          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            آخرین قیمت ارزهای مختلف به تومان
          </p>
        </div>

        <button
          type="button"
          onClick={() => fetchPrices(true)}
          disabled={refreshing}
          className="inline-flex w-fit items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800"
        >
          <RefreshCw
            className={`size-4 ${
              refreshing ? "animate-spin" : ""
            }`}
          />

          بروزرسانی
        </button>
      </div>

      {/* Main currencies */}
      <section>
        <div className="mb-3 flex items-center gap-2">
          <Banknote className="size-4 text-blue-500" />

          <h3 className="font-semibold">ارزهای اصلی</h3>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {currencies
            .filter((item) =>
              ["USD", "EUR", "GBP", "AED"].includes(
                item.symbol,
              ),
            )
            .map((item) => (
              <CurrencyCard
                key={item.symbol}
                item={item}
              />
            ))}
        </div>
      </section>

      {/* Regional currencies */}
      <section>
        <div className="mb-3 flex items-center gap-2">
          <Banknote className="size-4 text-blue-500" />

          <h3 className="font-semibold">
            ارزهای پرکاربرد
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {currencies
            .filter((item) =>
              [
                "TRY",
                "CNY",
                "RUB",
                "AZN",
                "GEL",
                "SAR",
                "PKR",
                "IQD",
                "AFN",
              ].includes(item.symbol),
            )
            .map((item) => (
              <CurrencyCard
                key={item.symbol}
                item={item}
              />
            ))}
        </div>
      </section>

      {/* Other currencies */}
      <section>
        <div className="mb-3 flex items-center gap-2">
          <Banknote className="size-4 text-blue-500" />

          <h3 className="font-semibold">سایر ارزها</h3>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {currencies
            .filter(
              (item) =>
                ![
                  "USD",
                  "EUR",
                  "GBP",
                  "AED",
                  "TRY",
                  "CNY",
                  "RUB",
                  "AZN",
                  "GEL",
                  "SAR",
                  "PKR",
                  "IQD",
                  "AFN",
                ].includes(item.symbol),
            )
            .map((item) => (
              <CurrencyCard
                key={item.symbol}
                item={item}
              />
            ))}
        </div>
      </section>
    </div>
  );
}