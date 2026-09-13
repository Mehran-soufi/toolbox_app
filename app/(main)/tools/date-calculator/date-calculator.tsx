"use client";

import { useMemo, useState } from "react";
import {
  addDays,
  addMonths,
  addYears,
  differenceInDays,
  differenceInMonths,
  differenceInYears,
  format,
  newDate,
} from "date-fns-jalali";
import {
  ArrowLeftRight,
  CalendarDays,
  Calculator,
  Check,
  Copy,
  Minus,
  Plus,
  RefreshCcw,
} from "lucide-react";
import { toast } from "sonner";

type Tab = "difference" | "add-subtract" | "convert";

type Operation = "add" | "subtract";

type Unit = "day" | "month" | "year";

const JALALI_REGEX = /^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/;
const GREGORIAN_REGEX = /^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/;

const jalaliMonths = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

function toEnglishDigits(value: string) {
  return value
    .replace(/[۰-۹]/g, (digit) =>
      String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit))
    )
    .replace(/[٠-٩]/g, (digit) =>
      String("٠١٢٣٤٥٦٧٨٩".indexOf(digit))
    );
}

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function getTodayJalali() {
  return format(new Date(), "yyyy-MM-dd");
}

function parseJalali(value: string): Date | null {
  const normalized = toEnglishDigits(value.trim()).replace(/\//g, "-");
  const match = normalized.match(JALALI_REGEX);

  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  if (
    year < 1 ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31
  ) {
    return null;
  }

  try {
    const date = newDate(year, month - 1, day);

    const check = format(date, "yyyy-MM-dd");

    if (
      check !==
      `${year}-${pad(month)}-${pad(day)}`
    ) {
      return null;
    }

    return date;
  } catch {
    return null;
  }
}

function parseGregorian(value: string): Date | null {
  const normalized = toEnglishDigits(value.trim()).replace(/\//g, "-");
  const match = normalized.match(GREGORIAN_REGEX);

  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  if (
    year < 1 ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31
  ) {
    return null;
  }

  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
}

function formatGregorian(date: Date) {
  return `${date.getFullYear()}-${pad(
    date.getMonth() + 1
  )}-${pad(date.getDate())}`;
}

function formatJalaliLong(date: Date) {
  const year = format(date, "yyyy");
  const month = Number(format(date, "MM"));
  const day = Number(format(date, "dd"));

  return `${day} ${jalaliMonths[month - 1]} ${year}`;
}

function formatGregorianLong(date: Date) {
  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

function normalizeDateInput(value: string) {
  return toEnglishDigits(value).replace(/\//g, "-");
}

function calculateCalendarDifference(
  start: Date,
  end: Date
) {
  let years = differenceInYears(end, start);

  let afterYears = addYears(start, years);

  if (afterYears > end) {
    years -= 1;
    afterYears = addYears(start, years);
  }

  let months = differenceInMonths(end, afterYears);

  let afterMonths = addMonths(afterYears, months);

  if (afterMonths > end) {
    months -= 1;
    afterMonths = addMonths(afterYears, months);
  }

  const days = differenceInDays(end, afterMonths);

  return {
    years,
    months,
    days,
    totalDays: differenceInDays(end, start),
  };
}

function DateInput({
  value,
  onChange,
  placeholder = "۱۴۰۵-۰۱-۰۱",
  label,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium">
        {label}
      </span>

      <input
        type="text"
        dir="ltr"
        value={value}
        onChange={(event) =>
          onChange(
            normalizeDateInput(event.target.value)
          )
        }
        placeholder={placeholder}
        className="h-11 w-full rounded-xl border border-border bg-background px-3 text-center text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
      />
    </label>
  );
}

function ResultCard({
  title,
  children,
  icon: Icon = Check,
}: {
  title: string;
  children: React.ReactNode;
  icon?: React.ElementType;
}) {
  return (
    <div className="rounded-2xl border border-violet-500/20 bg-violet-500/5 p-4">
      <div className="mb-3 flex items-center gap-2 text-violet-600 dark:text-violet-400">
        <Icon className="size-4" />
        <span className="text-sm font-semibold">
          {title}
        </span>
      </div>

      {children}
    </div>
  );
}

export default function DateCalculator() {
  const [activeTab, setActiveTab] =
    useState<Tab>("difference");

  // Difference
  const today = getTodayJalali();

  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  const [differenceResult, setDifferenceResult] =
    useState<ReturnType<
      typeof calculateCalendarDifference
    > | null>(null);

  // Add / subtract
  const [operationDate, setOperationDate] =
    useState(today);

  const [operation, setOperation] =
    useState<Operation>("add");

  const [unit, setUnit] = useState<Unit>("day");

  const [amount, setAmount] = useState("1");

  const [operationResult, setOperationResult] =
    useState<Date | null>(null);

  // Convert
  const [convertType, setConvertType] =
    useState<"jalali-to-gregorian" | "gregorian-to-jalali">(
      "jalali-to-gregorian"
    );

  const [convertValue, setConvertValue] =
    useState(today);

  const [convertedDate, setConvertedDate] =
    useState<Date | null>(null);

  const [conversionError, setConversionError] =
    useState("");

  const tabs = [
    {
      id: "difference" as const,
      title: "فاصله بین دو تاریخ",
      icon: Calculator,
    },
    {
      id: "add-subtract" as const,
      title: "افزودن / کسر تاریخ",
      icon: Plus,
    },
    {
      id: "convert" as const,
      title: "تبدیل تاریخ",
      icon: ArrowLeftRight,
    },
  ];

  const handleDifference = () => {
    const start = parseJalali(startDate);
    const end = parseJalali(endDate);

    if (!start || !end) {
      toast.error(
        "لطفاً تاریخ‌های شمسی را به شکل صحیح وارد کنید."
      );
      return;
    }

    if (start > end) {
      toast.error(
        "تاریخ شروع نمی‌تواند بعد از تاریخ پایان باشد."
      );
      return;
    }

    setDifferenceResult(
      calculateCalendarDifference(start, end)
    );
  };

  const handleOperation = () => {
    const date = parseJalali(operationDate);

    if (!date) {
      toast.error(
        "لطفاً تاریخ پایه را به شکل صحیح وارد کنید."
      );
      return;
    }

    const numericAmount = Number(
      toEnglishDigits(amount)
    );

    if (
      !Number.isFinite(numericAmount) ||
      numericAmount < 0
    ) {
      toast.error("مقدار واردشده معتبر نیست.");
      return;
    }

    const value =
      operation === "add"
        ? numericAmount
        : -numericAmount;

    let result: Date;

    if (unit === "day") {
      result = addDays(date, value);
    } else if (unit === "month") {
      result = addMonths(date, value);
    } else {
      result = addYears(date, value);
    }

    setOperationResult(result);
  };

  const handleConvert = () => {
    setConversionError("");

    if (
      convertType === "jalali-to-gregorian"
    ) {
      const date = parseJalali(convertValue);

      if (!date) {
        setConversionError(
          "تاریخ شمسی واردشده معتبر نیست."
        );
        setConvertedDate(null);
        return;
      }

      setConvertedDate(date);
      return;
    }

    const date = parseGregorian(convertValue);

    if (!date) {
      setConversionError(
        "تاریخ میلادی واردشده معتبر نیست."
      );
      setConvertedDate(null);
      return;
    }

    setConvertedDate(date);
  };

  const operationResultText = useMemo(() => {
    if (!operationResult) return "";

    return format(
      operationResult,
      "yyyy-MM-dd"
    );
  }, [operationResult]);

  const copyResult = async (
    value: string,
    successMessage = "نتیجه کپی شد."
  ) => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success(successMessage);
    } catch {
      toast.error("کپی کردن نتیجه انجام نشد.");
    }
  };

  const resetAll = () => {
    setStartDate(today);
    setEndDate(today);
    setDifferenceResult(null);

    setOperationDate(today);
    setOperation("add");
    setUnit("day");
    setAmount("1");
    setOperationResult(null);

    setConvertType("jalali-to-gregorian");
    setConvertValue(today);
    setConvertedDate(null);
    setConversionError("");
  };

  return (
    <div className="w-full overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
      {/* Tabs */}
      <div className="border-b border-border p-2">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex min-h-11 items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-violet-500 text-white shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon className="size-4" />
                <span>{tab.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-4 sm:p-6">
        {/* Difference */}
        {activeTab === "difference" && (
          <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <DateInput
                label="تاریخ شروع"
                value={startDate}
                onChange={setStartDate}
              />

              <DateInput
                label="تاریخ پایان"
                value={endDate}
                onChange={setEndDate}
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleDifference}
                className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-violet-500 px-5 text-sm font-semibold text-white transition hover:bg-violet-600 sm:flex-none"
              >
                <Calculator className="size-4" />
                محاسبه فاصله
              </button>

              <button
                type="button"
                onClick={() => {
                  setStartDate(today);
                  setEndDate(today);
                  setDifferenceResult(null);
                }}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border px-4 text-sm font-medium transition hover:bg-muted"
              >
                <RefreshCcw className="size-4" />
                پاک کردن
              </button>
            </div>

            {differenceResult && (
              <ResultCard
                title="نتیجه محاسبه"
                icon={CalendarDays}
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl bg-background p-4 text-center">
                    <div className="mb-2 text-xs text-muted-foreground">
                      فاصله دقیق
                    </div>

                    <div className="text-lg font-bold">
                      {differenceResult.years} سال،{" "}
                      {differenceResult.months} ماه و{" "}
                      {differenceResult.days} روز
                    </div>
                  </div>

                  <div className="rounded-xl bg-background p-4 text-center">
                    <div className="mb-2 text-xs text-muted-foreground">
                      مجموع روزها
                    </div>

                    <div className="text-lg font-bold">
                      {differenceResult.totalDays.toLocaleString(
                        "fa-IR"
                      )}{" "}
                      روز
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    copyResult(
                      `${differenceResult.years} سال، ${differenceResult.months} ماه و ${differenceResult.days} روز - مجموع ${differenceResult.totalDays} روز`
                    )
                  }
                  className="mt-3 inline-flex h-10 items-center gap-2 rounded-xl border border-border px-4 text-xs font-medium transition hover:bg-muted"
                >
                  <Copy className="size-3.5" />
                  کپی نتیجه
                </button>
              </ResultCard>
            )}
          </div>
        )}

        {/* Add / Subtract */}
        {activeTab === "add-subtract" && (
          <div className="space-y-5">
            <DateInput
              label="تاریخ پایه"
              value={operationDate}
              onChange={setOperationDate}
            />

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium">
                  عملیات
                </span>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setOperation("add")
                    }
                    className={`flex h-11 items-center justify-center gap-2 rounded-xl border text-sm font-medium transition ${
                      operation === "add"
                        ? "border-violet-500 bg-violet-500/10 text-violet-600 dark:text-violet-400"
                        : "border-border hover:bg-muted"
                    }`}
                  >
                    <Plus className="size-4" />
                    افزودن
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setOperation("subtract")
                    }
                    className={`flex h-11 items-center justify-center gap-2 rounded-xl border text-sm font-medium transition ${
                      operation === "subtract"
                        ? "border-violet-500 bg-violet-500/10 text-violet-600 dark:text-violet-400"
                        : "border-border hover:bg-muted"
                    }`}
                  >
                    <Minus className="size-4" />
                    کسر
                  </button>
                </div>
              </div>

              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium">
                  مقدار
                </span>

                <input
                  type="text"
                  inputMode="numeric"
                  dir="ltr"
                  value={amount}
                  onChange={(event) =>
                    setAmount(
                      toEnglishDigits(
                        event.target.value
                      ).replace(/[^0-9]/g, "")
                    )
                  }
                  className="h-11 w-full rounded-xl border border-border bg-background px-3 text-center text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium">
                  واحد
                </span>

                <select
                  value={unit}
                  onChange={(event) =>
                    setUnit(
                      event.target.value as Unit
                    )
                  }
                  className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                >
                  <option value="day">
                    روز
                  </option>
                  <option value="month">
                    ماه
                  </option>
                  <option value="year">
                    سال
                  </option>
                </select>
              </label>
            </div>

            <div className="rounded-xl bg-muted/50 p-3 text-sm text-muted-foreground">
              {operation === "add"
                ? "تاریخ انتخاب‌شده به اندازه مقدار مشخص‌شده جلو می‌رود."
                : "تاریخ انتخاب‌شده به اندازه مقدار مشخص‌شده به عقب می‌رود."}
            </div>

            <button
              type="button"
              onClick={handleOperation}
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-violet-500 px-5 text-sm font-semibold text-white transition hover:bg-violet-600 sm:w-auto"
            >
              <Calculator className="size-4" />
              محاسبه تاریخ
            </button>

            {operationResult && (
              <ResultCard
                title="تاریخ جدید"
                icon={CalendarDays}
              >
                <div className="rounded-xl bg-background p-5 text-center">
                  <div
                    dir="ltr"
                    className="text-2xl font-bold tracking-wide text-violet-600 dark:text-violet-400"
                  >
                    {operationResultText}
                  </div>

                  <div className="mt-2 text-sm text-muted-foreground">
                    {formatJalaliLong(
                      operationResult
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    copyResult(
                      operationResultText
                    )
                  }
                  className="mt-3 inline-flex h-10 items-center gap-2 rounded-xl border border-border px-4 text-xs font-medium transition hover:bg-muted"
                >
                  <Copy className="size-3.5" />
                  کپی نتیجه
                </button>
              </ResultCard>
            )}
          </div>
        )}

        {/* Conversion */}
        {activeTab === "convert" && (
          <div className="space-y-5">
            <div className="grid gap-2 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => {
                  setConvertType(
                    "jalali-to-gregorian"
                  );
                  setConvertValue(today);
                  setConvertedDate(null);
                  setConversionError("");
                }}
                className={`flex min-h-12 items-center justify-center gap-2 rounded-xl border px-4 text-sm font-medium transition ${
                  convertType ===
                  "jalali-to-gregorian"
                    ? "border-violet-500 bg-violet-500/10 text-violet-600 dark:text-violet-400"
                    : "border-border hover:bg-muted"
                }`}
              >
                شمسی
                <ArrowLeftRight className="size-4" />
                میلادی
              </button>

              <button
                type="button"
                onClick={() => {
                  setConvertType(
                    "gregorian-to-jalali"
                  );
                  setConvertValue(
                    formatGregorian(new Date())
                  );
                  setConvertedDate(null);
                  setConversionError("");
                }}
                className={`flex min-h-12 items-center justify-center gap-2 rounded-xl border px-4 text-sm font-medium transition ${
                  convertType ===
                  "gregorian-to-jalali"
                    ? "border-violet-500 bg-violet-500/10 text-violet-600 dark:text-violet-400"
                    : "border-border hover:bg-muted"
                }`}
              >
                میلادی
                <ArrowLeftRight className="size-4" />
                شمسی
              </button>
            </div>

            <DateInput
              label={
                convertType ===
                "jalali-to-gregorian"
                  ? "تاریخ شمسی"
                  : "تاریخ میلادی"
              }
              value={convertValue}
              onChange={(value) => {
                setConvertValue(value);
                setConvertedDate(null);
                setConversionError("");
              }}
              placeholder={
                convertType ===
                "jalali-to-gregorian"
                  ? "۱۴۰۵-۰۶-۱۱"
                  : "۲۰۲۶-۰۹-۰۲"
              }
            />

            <button
              type="button"
              onClick={handleConvert}
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-violet-500 px-5 text-sm font-semibold text-white transition hover:bg-violet-600 sm:w-auto"
            >
              <ArrowLeftRight className="size-4" />
              تبدیل تاریخ
            </button>

            {conversionError && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-600 dark:text-red-400">
                {conversionError}
              </div>
            )}

            {convertedDate && (
              <ResultCard
                title="نتیجه تبدیل"
                icon={ArrowLeftRight}
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl bg-background p-4 text-center">
                    <div className="mb-2 text-xs text-muted-foreground">
                      تاریخ عددی
                    </div>

                    <div
                      dir="ltr"
                      className="text-xl font-bold"
                    >
                      {convertType ===
                      "jalali-to-gregorian"
                        ? formatGregorian(
                            convertedDate
                          )
                        : format(
                            convertedDate,
                            "yyyy-MM-dd"
                          )}
                    </div>
                  </div>

                  <div className="rounded-xl bg-background p-4 text-center">
                    <div className="mb-2 text-xs text-muted-foreground">
                      تاریخ خوانا
                    </div>

                    <div className="text-lg font-bold">
                      {convertType ===
                      "jalali-to-gregorian"
                        ? formatGregorianLong(
                            convertedDate
                          )
                        : formatJalaliLong(
                            convertedDate
                          )}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    copyResult(
                      convertType ===
                        "jalali-to-gregorian"
                        ? formatGregorian(
                            convertedDate
                          )
                        : format(
                            convertedDate,
                            "yyyy-MM-dd"
                          )
                    )
                  }
                  className="mt-3 inline-flex h-10 items-center gap-2 rounded-xl border border-border px-4 text-xs font-medium transition hover:bg-muted"
                >
                  <Copy className="size-3.5" />
                  کپی نتیجه
                </button>
              </ResultCard>
            )}
          </div>
        )}

        {/* Reset */}
        <div className="mt-6 flex justify-end border-t border-border pt-4">
          <button
            type="button"
            onClick={resetAll}
            className="inline-flex h-10 items-center gap-2 rounded-xl px-3 text-xs font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
          >
            <RefreshCcw className="size-3.5" />
            بازنشانی همه
          </button>
        </div>
      </div>
    </div>
  );
}