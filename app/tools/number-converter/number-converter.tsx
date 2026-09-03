"use client";

import { useState } from "react";

import {
  Check,
  Clipboard,
  Eraser,
  Hash,
  Languages,
} from "lucide-react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useToolHistory } from "@/hooks/useToolHistory";

type ConversionType =
  | "fa-to-en"
  | "en-to-fa"
  | "ar-to-fa"
  | "fa-to-ar"
  | "ar-to-en"
  | "en-to-ar";

const conversionOptions = [
  {
    id: "fa-to-en",
    label: "فارسی به انگلیسی",
  },
  {
    id: "en-to-fa",
    label: "انگلیسی به فارسی",
  },
  {
    id: "ar-to-fa",
    label: "عربی به فارسی",
  },
  {
    id: "fa-to-ar",
    label: "فارسی به عربی",
  },
  {
    id: "ar-to-en",
    label: "عربی به انگلیسی",
  },
  {
    id: "en-to-ar",
    label: "انگلیسی به عربی",
  },
];

function convertNumbers(text: string, type: ConversionType): string {
  const persianNumbers = "۰۱۲۳۴۵۶۷۸۹";
  const arabicNumbers = "٠١٢٣٤٥٦٧٨٩";
  const englishNumbers = "0123456789";

  switch (type) {
    case "fa-to-en":
      return text.replace(/[۰-۹]/g, (char) => {
        return englishNumbers[persianNumbers.indexOf(char)];
      });

    case "en-to-fa":
      return text.replace(/[0-9]/g, (char) => {
        return persianNumbers[englishNumbers.indexOf(char)];
      });

    case "ar-to-fa":
      return text.replace(/[٠-٩]/g, (char) => {
        return persianNumbers[arabicNumbers.indexOf(char)];
      });

    case "fa-to-ar":
      return text.replace(/[۰-۹]/g, (char) => {
        return arabicNumbers[persianNumbers.indexOf(char)];
      });

    case "ar-to-en":
      return text.replace(/[٠-٩]/g, (char) => {
        return englishNumbers[arabicNumbers.indexOf(char)];
      });

    case "en-to-ar":
      return text.replace(/[0-9]/g, (char) => {
        return arabicNumbers[englishNumbers.indexOf(char)];
      });

    default:
      return text;
  }
}

export default function NumberConverter() {
  useToolHistory({
    toolName: "تبدیل اعداد",
    toolSlug: "number-converter",
    toolIcon: "Hash",
  });

  const [text, setText] = useState("");
  const [conversionType, setConversionType] =
    useState<ConversionType>("fa-to-en");
  const [copied, setCopied] = useState(false);

  const result = text
    ? convertNumbers(text, conversionType)
    : "";

  const handleConversionChange = (value: ConversionType) => {
    setConversionType(value);
    setCopied(false);
  };

  const handleClear = () => {
    setText("");
    setCopied(false);

    toast.success("متن پاک شد");
  };

 const handleCopy = async () => {
  if (!result) return;

  try {
    await navigator.clipboard.writeText(result);

    setCopied(true);

    toast.success("نتیجه با موفقیت کپی شد");

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  } catch (error) {
    console.error("Copy result error:", error);

    toast.error("کپی نتیجه انجام نشد");
  }
};

  return (
    <div className="w-full rounded-2xl border border-zinc-200/70 bg-white/60 p-5 shadow-sm backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-900/50">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500">
            <Hash className="size-5" />
          </div>

          <div>
            <h2 className="text-base font-bold md:text-lg">
              تبدیل اعداد
            </h2>

            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              اعداد فارسی، عربی و انگلیسی را به یکدیگر تبدیل کنید.
            </p>
          </div>
        </div>
      </div>

      {/* Conversion Type */}
      <div className="space-y-2">
        <Label htmlFor="number-conversion-type">
          نوع تبدیل
        </Label>

        <Select
          value={conversionType}
          onValueChange={(value) =>
            handleConversionChange(value as ConversionType)
          }
        >
          <SelectTrigger
            id="number-conversion-type"
            className="h-11 w-full"
            dir="rtl"
          >
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            {conversionOptions.map((option) => (
              <SelectItem
                key={option.id}
                value={option.id}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Converter */}
      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Input */}
        <div className="space-y-2">
          <Label htmlFor="number-input">
            متن ورودی
          </Label>

          <Textarea
            id="number-input"
            value={text}
            onChange={(event) => {
              setText(event.target.value);
              setCopied(false);
            }}
            placeholder="مثلاً: شماره تماس من ۰۹۱۲۱۲۳۴۵۶۷ است."
            dir="auto"
            className="min-h-52 resize-none"
          />

          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
            <span>
              {text.length.toLocaleString("fa-IR")} کاراکتر
            </span>

            <span>
              ورودی
            </span>
          </div>
        </div>

        {/* Result */}
        <div className="space-y-2">
          <Label htmlFor="number-result">
            نتیجه
          </Label>

          <div className="relative">
            <Textarea
              id="number-result"
              value={result}
              readOnly
              placeholder="نتیجه تبدیل اینجا نمایش داده می‌شود."
              dir="auto"
              className="min-h-52 resize-none bg-zinc-50 dark:bg-zinc-950/50"
            />
          </div>

          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
            <span>
              {result.length.toLocaleString("fa-IR")} کاراکتر
            </span>

            <span>
              نتیجه
            </span>
          </div>
        </div>
      </div>

      {/* Result Summary */}
      {result && (
        <div className="mt-6 rounded-xl border border-violet-500/10 bg-violet-500/5 p-4">
          <div className="flex items-center justify-center gap-2 text-sm">
            <Languages className="size-4 text-violet-500" />

            <span className="font-medium text-violet-600 dark:text-violet-400">
              تبدیل اعداد با موفقیت انجام شد
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

      {/* Empty State Actions */}
      {!result && text && (
        <div className="mt-6 rounded-xl border border-zinc-200/70 bg-zinc-50/70 p-4 text-center text-sm text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950/40 dark:text-zinc-400">
          در متن واردشده عدد قابل تبدیل وجود ندارد.
        </div>
      )}
    </div>
  );
}
