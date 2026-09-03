"use client";

import { useMemo, useState } from "react";
import {
  Calculator,
  Percent,
  RotateCcw,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type CalculationType =
  | "percentage-of"
  | "what-percentage"
  | "increase"
  | "decrease";

const CALCULATION_OPTIONS: {
  value: CalculationType;
  title: string;
  description: string;
}[] = [
  {
    value: "percentage-of",
    title: "درصد یک عدد",
    description: "مثلاً ۲۰٪ از ۵۰۰ چقدر است؟",
  },
  {
    value: "what-percentage",
    title: "چند درصد است؟",
    description: "مثلاً ۱۰۰ چند درصد ۵۰۰ است؟",
  },
  {
    value: "increase",
    title: "افزایش درصدی",
    description: "مثلاً ۵۰۰ با ۲۰٪ افزایش چقدر می‌شود؟",
  },
  {
    value: "decrease",
    title: "کاهش درصدی",
    description: "مثلاً ۵۰۰ با ۲۰٪ کاهش چقدر می‌شود؟",
  },
];

function normalizeNumber(value: string) {
  return value
    .trim()
    .replace(/[۰-۹]/g, (digit) =>
      String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit))
    )
    .replace(/[٠-٩]/g, (digit) =>
      String("٠١٢٣٤٥٦٧٨٩".indexOf(digit))
    )
    .replace(/,/g, "")
    .replace(/٬/g, "")
    .replace(/٫/g, ".");
}

function parseInput(value: string) {
  const normalized = normalizeNumber(value);

  if (!normalized) {
    return null;
  }

  const number = Number(normalized);

  return Number.isFinite(number) ? number : null;
}

function formatNumber(value: number) {
  if (!Number.isFinite(value)) {
    return "";
  }

  return new Intl.NumberFormat("fa-IR", {
    maximumFractionDigits: 10,
  }).format(value);
}

export default function PercentageCalculator() {
  const [type, setType] =
    useState<CalculationType>("percentage-of");

  const [firstValue, setFirstValue] = useState("20");
  const [secondValue, setSecondValue] = useState("500");

  const calculation = useMemo(() => {
    const first = parseInput(firstValue);
    const second = parseInput(secondValue);

    if (first === null || second === null) {
      return {
        result: "",
        error: "لطفاً هر دو مقدار را به‌درستی وارد کنید.",
      };
    }

    let result = 0;

    switch (type) {
      case "percentage-of":
        result = (first / 100) * second;
        break;

      case "what-percentage":
        if (second === 0) {
          return {
            result: "",
            error: "عدد دوم نمی‌تواند صفر باشد.",
          };
        }

        result = (first / second) * 100;
        break;

      case "increase":
        result = second + (second * first) / 100;
        break;

      case "decrease":
        result = second - (second * first) / 100;
        break;
    }

    if (!Number.isFinite(result)) {
      return {
        result: "",
        error: "امکان محاسبه این مقدار وجود ندارد.",
      };
    }

    return {
      result: formatNumber(result),
      error: "",
    };
  }, [firstValue, secondValue, type]);

  const clear = () => {
    setFirstValue("");
    setSecondValue("");

    toast.success("مقادیر پاک شدند.");
  };

  const reset = () => {
    setType("percentage-of");
    setFirstValue("20");
    setSecondValue("500");

    toast.success("ابزار به حالت اولیه بازگشت.");
  };

  const currentOption = CALCULATION_OPTIONS.find(
    (option) => option.value === type
  );

  const getFirstLabel = () => {
    switch (type) {
      case "percentage-of":
      case "increase":
      case "decrease":
        return "درصد";

      case "what-percentage":
        return "مقدار اول";
    }
  };

  const getSecondLabel = () => {
    switch (type) {
      case "percentage-of":
        return "عدد";

      case "what-percentage":
        return "عدد کل";

      case "increase":
        return "عدد پایه";

      case "decrease":
        return "عدد پایه";
    }
  };

  return (
    <div className="w-full rounded-2xl border bg-card/60 p-4 shadow-sm backdrop-blur-sm sm:p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500">
            <Percent className="size-5" />
          </div>

          <div>
            <h2 className="font-semibold">محاسبه درصد</h2>

            <p className="text-xs text-muted-foreground">
              {currentOption?.description}
            </p>
          </div>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={reset}
          title="بازنشانی"
          className="self-end sm:self-auto"
        >
          <RotateCcw className="size-4" />
        </Button>
      </div>

      {/* Calculation types */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {CALCULATION_OPTIONS.map((option) => {
          const isActive = type === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => setType(option.value)}
              className={`rounded-xl border p-3 text-right transition-all ${
                isActive
                  ? "border-violet-500/50 bg-violet-500/10 text-violet-600 dark:text-violet-400"
                  : "bg-background/50 hover:bg-muted/50"
              }`}
            >
              <div className="text-sm font-medium">
                {option.title}
              </div>

              <div className="mt-1 text-xs leading-5 text-muted-foreground">
                {option.description}
              </div>
            </button>
          );
        })}
      </div>

      {/* Inputs */}
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">
            {getFirstLabel()}
          </label>

          <div className="relative">
            <Input
              value={firstValue}
              onChange={(event) =>
                setFirstValue(event.target.value)
              }
              placeholder="مثلاً 20"
              dir="ltr"
              inputMode="decimal"
              className="h-12 pl-12 text-base"
            />

            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              {type === "what-percentage" ? "" : "%"}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            {getSecondLabel()}
          </label>

          <Input
            value={secondValue}
            onChange={(event) =>
              setSecondValue(event.target.value)
            }
            placeholder="مثلاً 500"
            dir="ltr"
            inputMode="decimal"
            className="h-12 text-base"
          />
        </div>
      </div>

      {/* Result */}
      <div className="mt-6">
        <div className="mb-2 flex items-center gap-2">
          <Calculator className="size-4 text-muted-foreground" />

          <label className="text-sm font-medium">نتیجه</label>
        </div>

        <div
          className={`min-h-24 rounded-2xl border p-5 ${
            calculation.error
              ? "border-destructive/30 bg-destructive/5"
              : "bg-muted/30"
          }`}
        >
          {calculation.error ? (
            <div className="flex min-h-14 items-center">
              <p className="text-sm leading-7 text-destructive">
                {calculation.error}
              </p>
            </div>
          ) : calculation.result ? (
            <div className="flex min-h-14 flex-col justify-center">
              <span className="text-xs text-muted-foreground">
                {currentOption?.title}
              </span>

              <strong
                dir="ltr"
                className="mt-1 break-all text-2xl font-bold tracking-wide"
              >
                {calculation.result}
                {type === "what-percentage" && "٪"}
              </strong>
            </div>
          ) : (
            <div className="flex min-h-14 items-center">
              <p className="text-sm text-muted-foreground">
                نتیجه اینجا نمایش داده می‌شود.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-5 flex justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={clear}
          disabled={!firstValue && !secondValue}
        >
          <Trash2 className="size-4" />
          پاک کردن
        </Button>
      </div>
    </div>
  );
}