"use client";

import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  Bitcoin,
  RefreshCw,
  TrendingUp,
} from "lucide-react";
import { toPersianNumber } from "@/lib/number";
import { useToolHistory } from "@/hooks/useToolHistory";

type CryptocurrencyItem = {
  date: string;
  time: string;
  time_unix: number;
  symbol: string;
  name_en: string;
  name: string;
  price: string;
  change_percent: number;
  market_cap: number;
  unit: string;
  description: string;
};

type PricesResponse = {
  cryptocurrency: CryptocurrencyItem[];
};

const cryptoSymbols = [
  "BTC",
  "ETH",
  "USDT",
  "XRP",
  "BNB",
  "SOL",
  "USDC",
  "TRX",
  "DOGE",
  "ADA",
  "LINK",
  "XLM",
  "AVAX",
  "SHIB",
  "LTC",
  "DOT",
  "UNI",
  "ATOM",
  "FIL",
];

const formatCryptoPrice = (price: string) => {
  const number = Number(price);

  if (Number.isNaN(number)) {
    return price;
  }

  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 8,
  }).format(number);
};

const formatMarketCap = (marketCap: number) => {
  if (marketCap >= 1_000_000_000) {
    return `${(marketCap / 1_000_000_000).toFixed(2)}B`;
  }

  if (marketCap >= 1_000_000) {
    return `${(marketCap / 1_000_000).toFixed(2)}M`;
  }

  if (marketCap >= 1_000) {
    return `${(marketCap / 1_000).toFixed(2)}K`;
  }

  return new Intl.NumberFormat("en-US").format(marketCap);
};

interface CryptoCardProps {
  item: CryptocurrencyItem;
  featured?: boolean;
}

function CryptoCard({ item, featured = false }: CryptoCardProps) {
  const isPositive = item.change_percent > 0;
  const isNegative = item.change_percent < 0;

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border bg-white/70 p-4 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-zinc-900/60 ${
        featured
          ? "border-violet-300/70 dark:border-violet-700/60"
          : "border-zinc-200/70 dark:border-zinc-800"
      }`}
    >
      {/* Glow */}
      <div
        className={`absolute -left-10 -top-10 size-28 rounded-full blur-2xl transition ${
          featured
            ? "bg-violet-500/10 group-hover:bg-violet-500/20"
            : "bg-violet-500/5 group-hover:bg-violet-500/10"
        }`}
      />

      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div
              className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${
                featured
                  ? "bg-orange-500/10 text-orange-500"
                  : "bg-violet-500/10 text-violet-600 dark:text-violet-400"
              }`}
            >
              <Bitcoin className="size-5" />
            </div>

            <div className="min-w-0">
              <p className="truncate font-semibold">{item.name}</p>

              <p
                dir="ltr"
                className="mt-1 text-xs text-zinc-500 dark:text-zinc-400"
              >
                {item.symbol}
              </p>
            </div>
          </div>

          {/* Change */}
          <div
            dir="ltr"
            className={`flex shrink-0 items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold ${
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
          <p dir="ltr" className="text-2xl font-bold tracking-tight">
            ${formatCryptoPrice(item.price)}
          </p>

          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            دلار آمریکا
          </p>
        </div>

        {/* Market Cap */}
        <div className="mt-5 flex items-center justify-between border-t border-zinc-200/70 pt-3 dark:border-zinc-800">
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            ارزش بازار
          </span>

          <span dir="ltr" className="text-sm font-semibold">
            ${formatMarketCap(item.market_cap)}
          </span>
        </div>

        {/* Time */}
        <div className="mt-2 flex items-center justify-between text-xs">
          <span className="text-zinc-500 dark:text-zinc-400">بروزرسانی</span>

          <span className="font-medium">{toPersianNumber(item.time)}</span>
        </div>

        {/* Description */}
        {item.description && (
          <p className="mt-4 line-clamp-2 text-xs leading-6 text-zinc-500 dark:text-zinc-400">
            {item.description}
          </p>
        )}
      </div>
    </div>
  );
}

export default function CryptocurrencyPrices() {
  useToolHistory({
    toolName: "ارز دیجیتال",
    toolSlug: "crypto/currency",
    toolIcon: "Bitcoin",
  });

  const [cryptocurrencies, setCryptocurrencies] = useState<
    CryptocurrencyItem[]
  >([]);
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
        throw new Error("خطا در دریافت قیمت رمزارزها");
      }

      const data: PricesResponse = await response.json();

      const filteredCryptocurrencies = cryptoSymbols
        .map((symbol) =>
          data.cryptocurrency?.find((item) => item.symbol === symbol),
        )
        .filter((item): item is CryptocurrencyItem => Boolean(item));

      setCryptocurrencies(filteredCryptocurrencies);
    } catch (error) {
      console.error("Cryptocurrency Prices Error:", error);

      setError("دریافت اطلاعات ارزهای دیجیتال با مشکل مواجه شد.");
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

  /* Loading */
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, index) => (
          <div
            key={index}
            className="h-60 animate-pulse rounded-2xl border border-zinc-200/70 bg-zinc-100/70 dark:border-zinc-800 dark:bg-zinc-900/60"
          />
        ))}
      </div>
    );
  }

  /* Error */
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-red-200 bg-red-50 p-10 text-center dark:border-red-900/50 dark:bg-red-950/20">
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>

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

  const bitcoin = cryptocurrencies.find((item) => item.symbol === "BTC");

  const ethereum = cryptocurrencies.find((item) => item.symbol === "ETH");

  const otherCryptocurrencies = cryptocurrencies.filter(
    (item) => !["BTC", "ETH"].includes(item.symbol),
  );

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="size-5 text-violet-500" />

            <h2 className="text-lg font-bold">بازار ارز دیجیتال</h2>
          </div>

          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            آخرین قیمت و اطلاعات رمزارزهای پرکاربرد
          </p>
        </div>

        <button
          type="button"
          onClick={() => fetchPrices(true)}
          disabled={refreshing}
          className="inline-flex w-fit items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800"
        >
          <RefreshCw className={`size-4 ${refreshing ? "animate-spin" : ""}`} />
          بروزرسانی
        </button>
      </div>

      {/* Top Cryptocurrencies */}
      <section>
        <div className="mb-3 flex items-center gap-2">
          <Bitcoin className="size-4 text-orange-500" />

          <h3 className="font-semibold">رمزارزهای اصلی</h3>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {bitcoin && <CryptoCard item={bitcoin} featured />}

          {ethereum && <CryptoCard item={ethereum} featured />}
        </div>
      </section>

      {/* Other Cryptocurrencies */}
      <section>
        <div className="mb-3 flex items-center gap-2">
          <Bitcoin className="size-4 text-violet-500" />

          <h3 className="font-semibold">سایر رمزارزها</h3>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {otherCryptocurrencies.map((item) => (
            <CryptoCard key={item.symbol} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
