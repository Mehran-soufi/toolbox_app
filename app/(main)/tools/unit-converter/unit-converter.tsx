"use client";

import { useMemo, useState } from "react";

import { ArrowLeftRight, Check, Clipboard, Eraser, Ruler } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  convertUnit,
  unitCategories,
  type UnitCategory,
} from "@/lib/unit-converter";

import { toPersianNumber } from "@/lib/number";
import { useToolHistory } from "@/hooks/useToolHistory";

export default function UnitConverter() {
  useToolHistory({
    toolName: "تبدیل واحد",
    toolSlug: "unit-converter",
    toolIcon: "Ruler",
  });

  const [category, setCategory] = useState<UnitCategory>("length");

  const [value, setValue] = useState("1");

  const [fromUnit, setFromUnit] = useState("meter");

  const [toUnit, setToUnit] = useState("centimeter");

  const [copied, setCopied] = useState(false);

  const currentCategory = useMemo(
    () => unitCategories.find((item) => item.id === category),
    [category],
  );

  const units = currentCategory?.units ?? [];

  const normalizeNumber = (input: string) => {
    return input
      .replace(/[۰-۹]/g, (char) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(char)))
      .replace(/٫/g, ".")
      .replace(/٬/g, "")
      .replace(/,/g, "");
  };

  const numericValue = Number(normalizeNumber(value));

  const result = useMemo(() => {
    if (!value || !Number.isFinite(numericValue)) {
      return "";
    }

    const converted = convertUnit(numericValue, category, fromUnit, toUnit);

    return formatResult(converted);
  }, [value, category, fromUnit, toUnit, numericValue]);

  const handleCategoryChange = (newCategory: UnitCategory) => {
    setCategory(newCategory);

    const newCategoryData = unitCategories.find(
      (item) => item.id === newCategory,
    );

    if (!newCategoryData) return;

    setFromUnit(newCategoryData.units[0]?.id ?? "");

    setToUnit(
      newCategoryData.units[1]?.id ?? newCategoryData.units[0]?.id ?? "",
    );

    setValue("1");
    setCopied(false);
  };

  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setCopied(false);
  };

  const handleClear = () => {
    setValue("");
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!result) return;

    const text = `${value} ${getUnitLabel(
      fromUnit,
    )} = ${result} ${getUnitLabel(toUnit)}`;

    try {
      await navigator.clipboard.writeText(text);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Copy result error:", error);
    }
  };

  const getUnitLabel = (unitId: string) => {
    return units.find((unit) => unit.id === unitId)?.label ?? "";
  };

  const getUnitSymbol = (unitId: string) => {
    return units.find((unit) => unit.id === unitId)?.symbol ?? "";
  };

  return (
    <div className="w-full rounded-2xl border border-zinc-200/70 bg-white/60 p-5 shadow-sm backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-900/50">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500">
            <Ruler className="size-5" />
          </div>

          <div>
            <h2 className="text-base font-bold md:text-lg">تبدیل واحد</h2>

            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              مقدار و واحد موردنظر خود را انتخاب کنید.
            </p>
          </div>
        </div>
      </div>

      {/* Category */}
      <div className="space-y-2">
        <Label htmlFor="unit-category">دسته‌بندی واحد</Label>

        <Select
          value={category}
          onValueChange={(value) => handleCategoryChange(value as UnitCategory)}
        >
          <SelectTrigger id="unit-category" className="h-11 w-full" dir="rtl">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            {unitCategories.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Converter */}
      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_auto_1fr] lg:items-end">
        {/* From */}
        <div className="space-y-2">
          <Label htmlFor="unit-value">مقدار</Label>

          <Input
            id="unit-value"
            type="text"
            inputMode="decimal"
            dir="ltr"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="مثلاً 100"
            className="h-11"
          />

          <Select
            value={fromUnit}
            onValueChange={(value) => {
              setFromUnit(value);
              setCopied(false);
            }}
          >
            <SelectTrigger className="h-11 w-full" dir="rtl">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              {units.map((unit) => (
                <SelectItem key={unit.id} value={unit.id}>
                  {unit.label} ({unit.symbol})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Swap */}
        <div className="flex justify-center lg:pb-0">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={handleSwap}
            className="size-11 rounded-xl"
            aria-label="جابه‌جایی واحدها"
            title="جابه‌جایی واحدها"
          >
            <ArrowLeftRight className="size-4" />
          </Button>
        </div>

        {/* To */}
        <div className="space-y-2">
          <Label>نتیجه</Label>

          <div
            dir="ltr"
            className="flex h-11 items-center justify-between gap-2 overflow-hidden rounded-md border border-zinc-200 bg-zinc-50 px-3 text-sm dark:border-zinc-800 dark:bg-zinc-950/50"
          >
            <span className="truncate font-medium">
              {toPersianNumber(result) || "—"}
            </span>

            {result && (
              <span className="shrink-0 text-xs text-zinc-500 dark:text-zinc-400">
                {getUnitSymbol(toUnit)}
              </span>
            )}
          </div>

          <Select
            value={toUnit}
            onValueChange={(value) => {
              setToUnit(value);
              setCopied(false);
            }}
          >
            <SelectTrigger className="h-11 w-full" dir="rtl">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              {units.map((unit) => (
                <SelectItem key={unit.id} value={unit.id}>
                  {unit.label} ({unit.symbol})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Result */}
      {result && (
        <div className="mt-6 rounded-xl border border-violet-500/10 bg-violet-500/5 p-4">
          <div className="text-center text-sm leading-7">
            <span className="text-zinc-500 dark:text-zinc-400">
              {toPersianNumber(value)} {getUnitLabel(fromUnit)}
            </span>

            <span className="mx-2 text-violet-500">=</span>

            <span className="font-semibold text-violet-600 dark:text-violet-400">
              {toPersianNumber(result)} {getUnitLabel(toUnit)}
            </span>
          </div>

          {/* Actions */}
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              onClick={handleCopy}
              className="flex-1"
            >
              {copied ? (
                <>
                  <Check className="size-4" />
                  کپی شد
                </>
              ) : (
                <>
                  <Clipboard className="size-4" />
                  کپی نتیجه
                </>
              )}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={handleClear}
              className="flex-1"
            >
              <Eraser className="size-4" />
              پاک کردن
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function formatResult(value: number): string {
  if (!Number.isFinite(value)) {
    return "";
  }

  if (value === 0) {
    return "0";
  }

  const absoluteValue = Math.abs(value);

  // اعداد بسیار کوچک
  if (absoluteValue > 0 && absoluteValue < 0.00000001) {
    return value.toExponential(6);
  }

  // اعداد بسیار بزرگ
  if (absoluteValue >= 1e12) {
    return value.toExponential(6);
  }

  // جلوگیری از نمایش اعشارهای اضافی
  return value.toLocaleString("en-US", {
    maximumFractionDigits: 10,
  });
}
