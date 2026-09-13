"use client";

import { useMemo, useState } from "react";
import {
  ArrowLeftRight,
  Binary,
  Check,
  Clipboard,
  RotateCcw,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type BaseType = "2" | "8" | "10" | "16";

const BASE_OPTIONS: {
  value: BaseType;
  label: string;
  shortLabel: string;
}[] = [
  {
    value: "2",
    label: "دودویی (Binary)",
    shortLabel: "دودویی",
  },
  {
    value: "8",
    label: "اکتال (Octal)",
    shortLabel: "اکتال",
  },
  {
    value: "10",
    label: "ده‌دهی (Decimal)",
    shortLabel: "ده‌دهی",
  },
  {
    value: "16",
    label: "هگزادسیمال (Hexadecimal)",
    shortLabel: "هگزادسیمال",
  },
];

function normalizeNumber(value: string) {
  return value
    .trim()
    .replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)))
    .replace(/,/g, "");
}

function isValidForBase(value: string, base: number) {
  if (!value) return false;

  const normalized = normalizeNumber(value);

  if (!/^[+-]?[0-9a-fA-F]+$/.test(normalized)) {
    return false;
  }

  const unsigned = normalized.replace(/^[+-]/, "");

  switch (base) {
    case 2:
      return /^[01]+$/.test(unsigned);

    case 8:
      return /^[0-7]+$/.test(unsigned);

    case 10:
      return /^[0-9]+$/.test(unsigned);

    case 16:
      return /^[0-9a-fA-F]+$/.test(unsigned);

    default:
      return false;
  }
}

function formatBinaryResult(value: string, base: BaseType) {
  if (base === "16") {
    return value.toUpperCase();
  }

  return value;
}

export default function BinaryConverter() {
  const [value, setValue] = useState("1010");
  const [fromBase, setFromBase] = useState<BaseType>("2");
  const [toBase, setToBase] = useState<BaseType>("10");
  const [copied, setCopied] = useState(false);

  const conversion = useMemo(() => {
    const normalized = normalizeNumber(value);

    if (!normalized) {
      return {
        result: "",
        error: "",
      };
    }

    const sourceBase = Number(fromBase);
    const targetBase = Number(toBase);

    if (!isValidForBase(normalized, sourceBase)) {
      return {
        result: "",
        error: `مقدار واردشده برای مبنای ${sourceBase} معتبر نیست.`,
      };
    }

    try {
      const decimalValue = parseInt(normalized, sourceBase);

      if (Number.isNaN(decimalValue)) {
        return {
          result: "",
          error: "امکان تبدیل این مقدار وجود ندارد.",
        };
      }

      const result = decimalValue.toString(targetBase);

      return {
        result: formatBinaryResult(result, toBase),
        error: "",
      };
    } catch {
      return {
        result: "",
        error: "خطایی هنگام تبدیل عدد رخ داد.",
      };
    }
  }, [value, fromBase, toBase]);

  const swapBases = () => {
    setFromBase(toBase);
    setToBase(fromBase);

    if (conversion.result) {
      setValue(conversion.result);
    }

    setCopied(false);
  };

  const copyResult = async () => {
    if (!conversion.result) return;

    try {
      await navigator.clipboard.writeText(conversion.result);

      setCopied(true);

      toast.success("نتیجه با موفقیت کپی شد.");

      setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      toast.error("کپی کردن نتیجه انجام نشد.");
    }
  };

  const clear = () => {
    setValue("");
    setCopied(false);

    toast.success("مقدار پاک شد.");
  };

  const reset = () => {
    setValue("1010");
    setFromBase("2");
    setToBase("10");
    setCopied(false);

    toast.success("ابزار به حالت اولیه بازگشت.");
  };

  const fromLabel =
    BASE_OPTIONS.find((item) => item.value === fromBase)?.shortLabel ?? "";

  const toLabel =
    BASE_OPTIONS.find((item) => item.value === toBase)?.shortLabel ?? "";

  return (
    <div className="w-full rounded-2xl border bg-card/60 p-4 shadow-sm backdrop-blur-sm sm:p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <div className="flex size-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500">
            <Binary className="size-5" />
          </div>

          <div>
            <h2 className="font-semibold">تبدیل مبنا</h2>
            <p className="text-xs text-muted-foreground">
              تبدیل اعداد بین مبناهای مختلف
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

      {/* Input */}
      <div className="space-y-2">
        <label className="text-sm font-medium">مقدار</label>

        <Input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="مثلاً 1010"
          dir="ltr"
          inputMode="text"
          className="h-12 text-base"
        />
      </div>

      {/* Base Selectors */}
      <div className="mt-5 grid grid-cols-1 items-end gap-4 md:grid-cols-[1fr_auto_1fr]">
        <div className="space-y-2">
          <label className="text-sm font-medium">از مبنای</label>

          <Select
            value={fromBase}
            onValueChange={(value) => {
              setFromBase(value as BaseType);
              setCopied(false);
            }}
          >
            <SelectTrigger className="h-12">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              {BASE_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={swapBases}
          title="جابجایی مبناها"
          className="mx-auto size-11 rounded-xl"
        >
          <ArrowLeftRight className="size-4" />
        </Button>

        <div className="space-y-2">
          <label className="text-sm font-medium">به مبنای</label>

          <Select
            value={toBase}
            onValueChange={(value) => {
              setToBase(value as BaseType);
              setCopied(false);
            }}
          >
            <SelectTrigger className="h-12">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              {BASE_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Result */}
      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between">
          <label className="text-sm font-medium">نتیجه</label>

          {conversion.result && (
            <span className="text-xs text-muted-foreground">
              {fromLabel} ← {toLabel}
            </span>
          )}
        </div>

        <div
          className={`relative min-h-20 rounded-2xl border p-4 ${
            conversion.error
              ? "border-destructive/30 bg-destructive/5"
              : "bg-muted/30"
          }`}
        >
          {conversion.error ? (
            <p className="text-sm leading-7 text-destructive">
              {conversion.error}
            </p>
          ) : conversion.result ? (
            <div className="flex min-h-12 items-center justify-between gap-3">
              <code
                dir="ltr"
                className="break-all text-lg font-semibold tracking-wide"
              >
                {conversion.result}
              </code>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={copyResult}
                title="کپی نتیجه"
                className="shrink-0"
              >
                {copied ? (
                  <Check className="size-4 text-green-500" />
                ) : (
                  <Clipboard className="size-4" />
                )}
              </Button>
            </div>
          ) : (
            <p className="flex min-h-12 items-center text-sm text-muted-foreground">
              نتیجه اینجا نمایش داده می‌شود.
            </p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-5 flex flex-wrap justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={clear}
          disabled={!value}
        >
          <Trash2 className="size-4" />
          پاک کردن
        </Button>

        <Button
          type="button"
          onClick={copyResult}
          disabled={!conversion.result}
        >
          {copied ? (
            <Check className="size-4" />
          ) : (
            <Clipboard className="size-4" />
          )}

          کپی نتیجه
        </Button>
      </div>
    </div>
  );
}