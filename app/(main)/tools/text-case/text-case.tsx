"use client";

import { useMemo, useState } from "react";

import {
  CaseUpper,
  Check,
  Clipboard,
  Eraser,
  FileText,
  Languages,
  Type,
} from "lucide-react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { useToolHistory } from "@/hooks/useToolHistory";

type TextOperation =
  | "persian-normalize"
  | "remove-diacritics"
  | "normalize-spaces"
  | "remove-extra-spaces"
  | "english-uppercase"
  | "english-lowercase"
  | "english-title"
  | "english-sentence"
  | "reverse-text";

const operations = [
  {
    id: "persian-normalize",
    label: "یکسان‌سازی حروف فارسی",
    description:
      "حروف عربی مانند ي، ى و ك را به شکل استاندارد فارسی تبدیل می‌کند.",
  },
  {
    id: "remove-diacritics",
    label: "حذف اعراب",
    description:
      "اعراب و نشانه‌های آوایی فارسی و عربی را از متن حذف می‌کند.",
  },
  {
    id: "normalize-spaces",
    label: "اصلاح فاصله‌ها",
    description:
      "فاصله‌های اضافی ابتدا، انتها و بین کلمات را اصلاح می‌کند.",
  },
  {
    id: "remove-extra-spaces",
    label: "حذف فاصله‌های اضافی",
    description:
      "چند فاصله پشت سر هم را به یک فاصله تبدیل می‌کند.",
  },
  {
    id: "english-uppercase",
    label: "حروف انگلیسی بزرگ",
    description:
      "تمام حروف انگلیسی موجود در متن را به حروف بزرگ تبدیل می‌کند.",
  },
  {
    id: "english-lowercase",
    label: "حروف انگلیسی کوچک",
    description:
      "تمام حروف انگلیسی موجود در متن را به حروف کوچک تبدیل می‌کند.",
  },
  {
    id: "english-title",
    label: "حالت عنوان انگلیسی",
    description:
      "حرف اول کلمات انگلیسی را به حروف بزرگ تبدیل می‌کند.",
  },
  {
    id: "english-sentence",
    label: "حالت جمله انگلیسی",
    description:
      "حرف اول جمله‌های انگلیسی را به حروف بزرگ تبدیل می‌کند.",
  },
  {
    id: "reverse-text",
    label: "معکوس کردن متن",
    description:
      "ترتیب کاراکترهای متن را از انتها به ابتدا برمی‌گرداند.",
  },
] as const;

function normalizePersian(text: string) {
  return text
    .replace(/ي/g, "ی")
    .replace(/ى/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/ۀ/g, "ه")
    .replace(/ة/g, "ه")
    .replace(/ؤ/g, "و")
    .replace(/إ/g, "ا")
    .replace(/أ/g, "ا")
    .replace(/ٱ/g, "ا");
}

function removeDiacritics(text: string) {
  return text.replace(
    /[\u064B-\u065F\u0670\u06D6-\u06ED]/g,
    "",
  );
}

function normalizeSpaces(text: string) {
  return text
    .replace(/\s+/g, " ")
    .trim();
}

function removeExtraSpaces(text: string) {
  return text.replace(/[ \t]+/g, " ");
}

function englishUppercase(text: string) {
  return text.toUpperCase();
}

function englishLowercase(text: string) {
  return text.toLowerCase();
}

function englishTitleCase(text: string) {
  return text.replace(
    /\b([a-zA-Z][a-zA-Z'-]*)\b/g,
    (word) => {
      return (
        word.charAt(0).toUpperCase() +
        word.slice(1).toLowerCase()
      );
    },
  );
}

function englishSentenceCase(text: string) {
  const lowerText = text.toLowerCase();

  return lowerText.replace(
    /(^|[.!?؟]\s+)([a-zA-Z])/g,
    (_, separator, letter) => {
      return separator + letter.toUpperCase();
    },
  );
}

function reverseText(text: string) {
  return Array.from(text).reverse().join("");
}

function processText(
  text: string,
  operation: TextOperation,
) {
  switch (operation) {
    case "persian-normalize":
      return normalizePersian(text);

    case "remove-diacritics":
      return removeDiacritics(text);

    case "normalize-spaces":
      return normalizeSpaces(text);

    case "remove-extra-spaces":
      return removeExtraSpaces(text);

    case "english-uppercase":
      return englishUppercase(text);

    case "english-lowercase":
      return englishLowercase(text);

    case "english-title":
      return englishTitleCase(text);

    case "english-sentence":
      return englishSentenceCase(text);

    case "reverse-text":
      return reverseText(text);

    default:
      return text;
  }
}

export default function TextCase() {
  useToolHistory({
    toolName: "تغییر حروف و پردازش متن",
    toolSlug: "text-case",
    toolIcon: "CaseUpper",
  });

  const [text, setText] = useState("");
  const [operation, setOperation] =
    useState<TextOperation>("persian-normalize");
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    if (!text) {
      return "";
    }

    return processText(text, operation);
  }, [text, operation]);

  const selectedOperation = operations.find(
    (item) => item.id === operation,
  );

  const wordCount = text
    .trim()
    ? text.trim().split(/\s+/).length
    : 0;

  const lineCount = text
    ? text.split(/\r?\n/).length
    : 0;

  const handleOperationChange = (
    value: TextOperation,
  ) => {
    setOperation(value);
    setCopied(false);
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

  const handleClear = () => {
    setText("");
    setCopied(false);

    toast.success("متن پاک شد");
  };

  return (
    <div className="w-full rounded-2xl border border-zinc-200/70 bg-white/60 p-5 shadow-sm backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-900/50">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500">
            <CaseUpper className="size-5" />
          </div>

          <div>
            <h2 className="text-base font-bold md:text-lg">
              تغییر حروف و پردازش متن
            </h2>

            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              عملیات موردنظر را انتخاب کنید و متن خود را وارد کنید.
            </p>
          </div>
        </div>
      </div>

      {/* Operation */}
      <div className="space-y-2">
        <Label htmlFor="text-operation">
          نوع عملیات
        </Label>

        <Select
          value={operation}
          onValueChange={(value) =>
            handleOperationChange(
              value as TextOperation,
            )
          }
        >
          <SelectTrigger
            id="text-operation"
            className="h-11 w-full"
            dir="rtl"
          >
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            {operations.map((item) => (
              <SelectItem
                key={item.id}
                value={item.id}
              >
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {selectedOperation && (
          <p className="pt-1 text-xs leading-6 text-zinc-500 dark:text-zinc-400">
            {selectedOperation.description}
          </p>
        )}
      </div>

      {/* Text Areas */}
      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Input */}
        <div className="space-y-2">
          <Label htmlFor="text-input">
            متن ورودی
          </Label>

          <Textarea
            id="text-input"
            value={text}
            onChange={(event) => {
              setText(event.target.value);
              setCopied(false);
            }}
            placeholder="متن خود را اینجا وارد کنید..."
            dir="auto"
            className="min-h-60 resize-none"
          />

          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-500 dark:text-zinc-400">
            <span>
              {text.length.toLocaleString("fa-IR")} کاراکتر
            </span>

            <span>
              {wordCount.toLocaleString("fa-IR")} کلمه
              {" • "}
              {lineCount.toLocaleString("fa-IR")} خط
            </span>
          </div>
        </div>

        {/* Result */}
        <div className="space-y-2">
          <Label htmlFor="text-result">
            نتیجه
          </Label>

          <Textarea
            id="text-result"
            value={result}
            readOnly
            placeholder="نتیجه عملیات اینجا نمایش داده می‌شود."
            dir="auto"
            className="min-h-60 resize-none bg-zinc-50 dark:bg-zinc-950/50"
          />

          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-500 dark:text-zinc-400">
            <span>
              {result.length.toLocaleString("fa-IR")} کاراکتر
            </span>

            <span>
              نتیجه
            </span>
          </div>
        </div>
      </div>

      {/* Result */}
      {result && (
        <div className="mt-6 rounded-xl border border-violet-500/10 bg-violet-500/5 p-4">
          <div className="flex items-center justify-center gap-2 text-center text-sm leading-7">
            <Languages className="size-4 shrink-0 text-violet-500" />

            <span className="text-zinc-500 dark:text-zinc-400">
              عملیات
            </span>

            <span className="font-semibold text-violet-600 dark:text-violet-400">
              {selectedOperation?.label}
            </span>

            <Check className="size-4 text-violet-500" />
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

      {/* Empty State */}
      {!result && text && (
        <div className="mt-6 rounded-xl border border-zinc-200/70 bg-zinc-50/70 p-4 text-center text-sm leading-7 text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950/40 dark:text-zinc-400">
          برای عملیات انتخاب‌شده تغییری در متن ایجاد نشد.
        </div>
      )}

      {/* Helper */}
      {!text && (
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-zinc-200/70 bg-zinc-50/70 p-4 text-center dark:border-zinc-800 dark:bg-zinc-950/40">
            <Type className="mx-auto mb-2 size-5 text-violet-500" />

            <p className="text-xs font-medium">
              مناسب متن فارسی
            </p>
          </div>

          <div className="rounded-xl border border-zinc-200/70 bg-zinc-50/70 p-4 text-center dark:border-zinc-800 dark:bg-zinc-950/40">
            <Languages className="mx-auto mb-2 size-5 text-violet-500" />

            <p className="text-xs font-medium">
              پشتیبانی از انگلیسی
            </p>
          </div>

          <div className="rounded-xl border border-zinc-200/70 bg-zinc-50/70 p-4 text-center dark:border-zinc-800 dark:bg-zinc-950/40">
            <FileText className="mx-auto mb-2 size-5 text-violet-500" />

            <p className="text-xs font-medium">
              پردازش لحظه‌ای متن
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
