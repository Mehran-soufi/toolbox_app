"use client";

import { useEffect, useState } from "react";
import {
  Bitcoin,
  Coins,
  DollarSign,
  Euro,
  Loader2,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

type PriceItem = {
  symbol: string;
  name: string;
  price: number | string;
  change_percent?: number;
  unit: string;
};

type PricesResponse = {
  gold: PriceItem[];
  currency: PriceItem[];
  cryptocurrency: PriceItem[];
};

const priceConfig = [
  {
    symbol: "USD",
    label: "دلار آمریکا",
    icon: DollarSign,
    iconClass: "bg-emerald-500/15 text-emerald-500",
  },
  {
    symbol: "EUR",
    label: "یورو اروپا",
    icon: Euro,
    iconClass: "bg-blue-500/15 text-blue-500",
  },
  {
    symbol: "IR_GOLD_18K",
    label: "طلای ۱۸ عیار",
    icon: Coins,
    iconClass: "bg-amber-500/15 text-amber-500",
  },
  {
    symbol: "IR_COIN_EMAMI",
    label: "سکه امامی",
    icon: Coins,
    iconClass: "bg-yellow-500/15 text-yellow-500",
  },
  {
    symbol: "BTC",
    label: "بیت‌کوین",
    icon: Bitcoin,
    iconClass: "bg-orange-500/15 text-orange-500",
  },
  {
    symbol: "USDT",
    label: "تتر",
    icon: DollarSign,
    iconClass: "bg-cyan-500/15 text-cyan-500",
  },
];

const formatPrice = (price: number | string) => {
  return Number(price).toLocaleString("fa-IR");
};

export default function HomPrice() {
  const [prices, setPrices] = useState<PricesResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch("/api/prices");

        if (!response.ok) {
          throw new Error("خطا در دریافت قیمت‌ها");
        }

        const data: PricesResponse = await response.json();

        setPrices(data);
      } catch (error) {
        console.error("Prices fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, []);

  const getPriceItem = (symbol: string) => {
    if (!prices) return null;

    return (
      prices.gold.find((item) => item.symbol === symbol) ||
      prices.currency.find((item) => item.symbol === symbol) ||
      prices.cryptocurrency.find((item) => item.symbol === symbol)
    );
  };

  return (
    <div className="w-full my-5">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 md:gap-3">
        {priceConfig.map((item) => {
          const Icon = item.icon;
          const price = getPriceItem(item.symbol);

          const change = price?.change_percent ?? 0;
          const isPositive = change > 0;
          const isNegative = change < 0;

          return (
            <div
              key={item.symbol}
              className="
                group
                min-w-0
                rounded-2xl
                border border-zinc-200/70 dark:border-zinc-800
                bg-white/70 dark:bg-zinc-900/60
                backdrop-blur-xl
                shadow-[0_0_30px_rgba(173,70,255,.08)]
                hover:shadow-[0_0_30px_rgba(173,70,255,.16)]
                hover:-translate-y-0.5
                transition-all duration-300
                p-3
              "
            >
              <div className="flex flex-col gap-3">
                {/* Header */}
                <div className="flex items-center justify-between gap-2">
                  <div
                    className={`
                      shrink-0
                      flex items-center justify-center
                      size-9
                      rounded-xl
                      ${item.iconClass}
                      transition-transform duration-300
                      group-hover:scale-105
                    `}
                  >
                    <Icon className="size-4.75" />
                  </div>

                  {!loading && price && (
                    <div
                      className={`
                        flex items-center gap-0.5
                        text-[10px] sm:text-xs
                        font-medium
                        ${
                          isPositive
                            ? "text-emerald-500"
                            : isNegative
                              ? "text-red-500"
                              : "text-zinc-500"
                        }
                      `}
                    >
                      {isPositive && <TrendingUp className="size-3" />}
                      {isNegative && <TrendingDown className="size-3" />}

                      <span dir="ltr">
                        {change > 0 ? "+" : ""}
                        {change}%
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="min-w-0">
                  <p className="truncate text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-400">
                    {item.label}
                  </p>
                  <div className="w-full flex items-center justify-between">

                  <div className="mt-1.5 min-h-7 flex items-center">
                    {loading ? (
                      <Loader2 className="size-4 animate-spin text-zinc-400" />
                    ) : price ? (
                      <p className="truncate text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100">
                        {formatPrice(price.price)}
                      </p>
                    ) : (
                      <p className="text-xs text-red-500">
                        دریافت نشد
                      </p>
                    )}
                  </div>

                  {!loading && price && (
                    <p className="mt-0.5 text-[10px] sm:text-xs text-zinc-400">
                      {price.unit}
                    </p>
                  )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}