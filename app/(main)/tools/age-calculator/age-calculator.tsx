"use client";

import { useMemo, useState } from "react";
import {
  addMonths,
  addYears,
  differenceInDays,
  differenceInYears,
  format,
  newDate,
} from "date-fns-jalali";
import {
  Cake,
  CalendarDays,
  CalendarHeart,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Copy,
  Gift,
  RotateCcw,
  Sparkles,
  Star,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

type AgeResult = {
  years: number;
  months: number;
  days: number;
  totalDays: number;
};

type JalaliParts = {
  year: number;
  month: number;
  day: number;
};

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

const weekdays = [
  "شنبه",
  "یکشنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنجشنبه",
  "جمعه",
];

const animals = [
  { name: "موش", icon: "🐀" },
  { name: "گاو", icon: "🐂" },
  { name: "ببر", icon: "🐅" },
  { name: "خرگوش", icon: "🐇" },
  { name: "اژدها", icon: "🐉" },
  { name: "مار", icon: "🐍" },
  { name: "اسب", icon: "🐎" },
  { name: "بز", icon: "🐐" },
  { name: "میمون", icon: "🐒" },
  { name: "خروس", icon: "🐓" },
  { name: "سگ", icon: "🐕" },
  { name: "خوک", icon: "🐖" },
];

const monthSymbols = [
  { name: "فروردین", symbol: "قوچ", icon: "♈" },
  { name: "اردیبهشت", symbol: "گاو", icon: "♉" },
  { name: "خرداد", symbol: "دوقلوها", icon: "♊" },
  { name: "تیر", symbol: "خرچنگ", icon: "♋" },
  { name: "مرداد", symbol: "شیر", icon: "♌" },
  { name: "شهریور", symbol: "خوشه", icon: "♍" },
  { name: "مهر", symbol: "ترازو", icon: "♎" },
  { name: "آبان", symbol: "عقرب", icon: "♏" },
  { name: "آذر", symbol: "کماندار", icon: "♐" },
  { name: "دی", symbol: "بز", icon: "♑" },
  { name: "بهمن", symbol: "دلو", icon: "♒" },
  { name: "اسفند", symbol: "ماهی", icon: "♓" },
];

function toPersianDigits(value: number | string) {
  return String(value).replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)]);
}

function getTodayJalali(): JalaliParts {
  const today = new Date();

  return {
    year: Number(format(today, "yyyy")),
    month: Number(format(today, "MM")),
    day: Number(format(today, "dd")),
  };
}

function getJalaliParts(date: Date): JalaliParts {
  return {
    year: Number(format(date, "yyyy")),
    month: Number(format(date, "MM")),
    day: Number(format(date, "dd")),
  };
}

function getDaysInJalaliMonth(year: number, month: number) {
  if (month <= 6) {
    return 31;
  }

  if (month <= 11) {
    return 30;
  }

  const start = newDate(year, 11, 1);
  const nextYear = newDate(year + 1, 0, 1);

  return differenceInDays(nextYear, start);
}

function getWeekdayIndex(date: Date) {
  const nativeDay = date.getDay();

  // JavaScript:
  // Sunday = 0
  // Saturday = 6
  //
  // Our array:
  // Saturday = 0
  // Sunday = 1
  return (nativeDay + 1) % 7;
}

function calculateAge(birthDate: Date, today: Date): AgeResult {
  let years = differenceInYears(today, birthDate);

  let afterYears = addYears(birthDate, years);

  if (afterYears > today) {
    years -= 1;

    afterYears = addYears(birthDate, years);
  }

  let months = 0;
  let afterMonths = afterYears;

  while (months < 11) {
    const nextMonth = addMonths(afterMonths, 1);

    if (nextMonth > today) {
      break;
    }

    afterMonths = nextMonth;
    months += 1;
  }

  const days = differenceInDays(today, afterMonths);

  return {
    years,
    months,
    days,
    totalDays: differenceInDays(today, birthDate),
  };
}

function getAnimalByYear(year: number) {
  // ۱۴۰۳ = اژدها
  const index = (((year - 1403 + 4) % 12) + 12) % 12;

  return animals[index];
}

function getMonthSymbol(month: number) {
  return monthSymbols[month - 1];
}

function formatJalaliLong(date: Date) {
  const parts = getJalaliParts(date);

  return `${toPersianDigits(parts.day)} ${
    jalaliMonths[parts.month - 1]
  } ${toPersianDigits(parts.year)}`;
}

function getNextBirthday(birthDate: Date, today: Date) {
  const birth = getJalaliParts(birthDate);
  const current = getJalaliParts(today);

  let nextBirthday = newDate(current.year, birth.month - 1, birth.day);

  if (nextBirthday < today) {
    nextBirthday = newDate(current.year + 1, birth.month - 1, birth.day);
  }

  return nextBirthday;
}

function InfoCard({
  icon: Icon,
  title,
  value,
  subtitle,
}: {
  icon: React.ElementType;
  title: string;
  value: React.ReactNode;
  subtitle?: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-background p-4">
      <div className="mb-3 flex items-center gap-2 text-violet-600 dark:text-violet-400">
        <Icon className="size-4" />

        <span className="text-xs font-medium">{title}</span>
      </div>

      <div className="text-lg font-bold">{value}</div>

      {subtitle && (
        <div className="mt-1 text-xs text-muted-foreground">{subtitle}</div>
      )}
    </div>
  );
}

export default function AgeCalculator() {
  const today = useMemo(() => getTodayJalali(), []);

  const [selectedDate, setSelectedDate] = useState<JalaliParts | null>(null);

  const [calendarYear, setCalendarYear] = useState(today.year);

  const [calendarMonth, setCalendarMonth] = useState(today.month);

  const [showCalendar, setShowCalendar] = useState(false);

  const [result, setResult] = useState<{
    birthDate: Date;
    today: Date;
  } | null>(null);

  const daysInMonth = getDaysInJalaliMonth(calendarYear, calendarMonth);

  const firstDay = newDate(calendarYear, calendarMonth - 1, 1);

  const firstWeekday = getWeekdayIndex(firstDay);

  const calendarDays = Array.from(
    { length: firstWeekday + daysInMonth },
    (_, index) => {
      if (index < firstWeekday) {
        return null;
      }

      return index - firstWeekday + 1;
    },
  );

  const selectDate = (day: number) => {
    const date: JalaliParts = {
      year: calendarYear,
      month: calendarMonth,
      day,
    };

    setSelectedDate(date);
    setShowCalendar(false);
    setResult(null);
  };

  const goToPreviousMonth = () => {
    if (calendarMonth === 1) {
      setCalendarMonth(12);
      setCalendarYear((current) => current - 1);
    } else {
      setCalendarMonth((current) => current - 1);
    }
  };

  const goToNextMonth = () => {
    if (calendarMonth === 12) {
      setCalendarMonth(1);
      setCalendarYear((current) => current + 1);
    } else {
      setCalendarMonth((current) => current + 1);
    }
  };

  const goToToday = () => {
    setCalendarYear(today.year);
    setCalendarMonth(today.month);
  };

  const calculate = () => {
    if (!selectedDate) {
      toast.error("لطفاً ابتدا تاریخ تولد را انتخاب کنید.");

      setShowCalendar(true);
      return;
    }

    const birthDate = newDate(
      selectedDate.year,
      selectedDate.month - 1,
      selectedDate.day,
    );

    const currentDate = new Date();

    if (birthDate > currentDate) {
      toast.error("تاریخ تولد نمی‌تواند در آینده باشد.");

      return;
    }

    setResult({
      birthDate,
      today: currentDate,
    });
  };

  const data = useMemo(() => {
    if (!result) {
      return null;
    }

    const age = calculateAge(result.birthDate, result.today);

    const birthParts = getJalaliParts(result.birthDate);

    const animal = getAnimalByYear(birthParts.year);

    const monthSymbol = getMonthSymbol(birthParts.month);

    const nextBirthday = getNextBirthday(result.birthDate, result.today);

    const daysUntilBirthday = differenceInDays(nextBirthday, result.today);

    const weekday = getWeekdayIndex(result.birthDate);

    return {
      age,
      birthParts,
      animal,
      monthSymbol,
      nextBirthday,
      daysUntilBirthday,
      weekday,
    };
  }, [result]);

  const copyResult = async () => {
    if (!data || !result) {
      return;
    }

    const text = [
      `سن: ${toPersianDigits(data.age.years)} سال، ${toPersianDigits(
        data.age.months,
      )} ماه و ${toPersianDigits(data.age.days)} روز`,

      `تاریخ تولد: ${formatJalaliLong(result.birthDate)}`,

      `تعداد روزهای سپری‌شده: ${toPersianDigits(
        data.age.totalDays.toLocaleString("en-US"),
      )} روز`,

      `تولد بعدی: ${formatJalaliLong(data.nextBirthday)}`,

      `فاصله تا تولد بعدی: ${toPersianDigits(
        data.daysUntilBirthday.toLocaleString("en-US"),
      )} روز`,

      `روز تولد: ${weekdays[data.weekday]}`,

      `حیوان سال: ${data.animal.name} ${data.animal.icon}`,

      `نماد ماه تولد: ${data.monthSymbol.symbol} ${data.monthSymbol.icon}`,
    ].join("\n");

    try {
      await navigator.clipboard.writeText(text);

      toast.success("نتیجه با موفقیت کپی شد.");
    } catch {
      toast.error("کپی نتیجه انجام نشد.");
    }
  };

  const reset = () => {
    setSelectedDate(null);
    setResult(null);
    setCalendarYear(today.year);
    setCalendarMonth(today.month);
    setShowCalendar(false);
  };

  return (
    <div className="w-full overflow-visible rounded-3xl border border-border bg-card shadow-sm">
      <div className="p-4 sm:p-6">
        {/* Header */}
        <div className="mb-6 flex items-start gap-3 rounded-2xl border border-violet-500/20 bg-violet-500/5 p-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400">
            <Cake className="size-5" />
          </div>

          <div>
            <h2 className="font-semibold">تاریخ تولد خود را انتخاب کنید</h2>

            <p className="mt-1 text-xs leading-6 text-muted-foreground">
              از تقویم شمسی زیر تاریخ تولد خود را انتخاب کنید.
            </p>
          </div>
        </div>

        {/* Date Picker */}
        <div className="relative mx-auto max-w-xl">
          <label className="mb-2 block text-sm font-medium">تاریخ تولد</label>

          <button
            type="button"
            onClick={() => setShowCalendar((current) => !current)}
            className="flex h-12 w-full items-center justify-between rounded-xl border border-border bg-background px-4 text-sm transition hover:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
          >
            <span
              className={selectedDate ? "font-medium" : "text-muted-foreground"}
            >
              {selectedDate
                ? `${toPersianDigits(selectedDate.year)} / ${toPersianDigits(
                    String(selectedDate.month).padStart(2, "0"),
                  )} / ${toPersianDigits(
                    String(selectedDate.day).padStart(2, "0"),
                  )}`
                : "انتخاب تاریخ تولد"}
            </span>

            <CalendarDays className="size-5 text-violet-500" />
          </button>

          {/* Calendar */}
          {showCalendar && (
            <div className="absolute inset-x-0 top-[calc(100%+8px)] z-50 rounded-2xl border border-border bg-card p-4 shadow-xl">
              {/* Calendar header */}
              <div className="mb-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={goToPreviousMonth}
                  className="flex size-9 items-center justify-center rounded-xl border border-border transition hover:bg-muted"
                  aria-label="ماه قبل"
                >
                  <ChevronRight className="size-4" />
                </button>

                <div className="text-center">
                  <div className="font-bold">
                    {jalaliMonths[calendarMonth - 1]}
                  </div>

                  <div className="mt-0.5 text-xs text-muted-foreground">
                    {toPersianDigits(calendarYear)}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={goToNextMonth}
                  className="flex size-9 items-center justify-center rounded-xl border border-border transition hover:bg-muted"
                  aria-label="ماه بعد"
                >
                  <ChevronLeft className="size-4" />
                </button>
              </div>

              {/* Year controls */}
              <div className="mb-4 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCalendarYear((current) => current - 1)}
                  className="h-9 flex-1 rounded-lg border border-border text-xs transition hover:bg-muted"
                >
                  سال قبل
                </button>

                <button
                  type="button"
                  onClick={goToToday}
                  className="h-9 flex-1 rounded-lg bg-violet-500/10 text-xs font-medium text-violet-600 transition hover:bg-violet-500/20 dark:text-violet-400"
                >
                  امروز
                </button>

                <button
                  type="button"
                  onClick={() => setCalendarYear((current) => current + 1)}
                  className="h-9 flex-1 rounded-lg border border-border text-xs transition hover:bg-muted"
                >
                  سال بعد
                </button>
              </div>

              {/* Weekdays */}
              <div className="mb-2 grid grid-cols-7 gap-1">
                {weekdays.map((weekday) => (
                  <div
                    key={weekday}
                    className="py-2 text-center text-[11px] font-medium text-muted-foreground"
                  >
                    {weekday}
                  </div>
                ))}
              </div>

              {/* Days */}
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, index) => {
                  if (day === null) {
                    return (
                      <div key={`empty-${index}`} className="aspect-square" />
                    );
                  }

                  const isSelected =
                    selectedDate?.year === calendarYear &&
                    selectedDate?.month === calendarMonth &&
                    selectedDate?.day === day;

                  const isToday =
                    today.year === calendarYear &&
                    today.month === calendarMonth &&
                    today.day === day;

                  const isFuture =
                    newDate(calendarYear, calendarMonth - 1, day) > new Date();

                  return (
                    <button
                      key={day}
                      type="button"
                      disabled={isFuture}
                      onClick={() => selectDate(day)}
                      className={[
                        "aspect-square rounded-lg text-sm transition",
                        isSelected
                          ? "bg-violet-500 font-bold text-white"
                          : "hover:bg-violet-500/10",
                        isToday && !isSelected
                          ? "ring-1 ring-violet-500 text-violet-600 dark:text-violet-400"
                          : "",
                        isFuture ? "cursor-not-allowed opacity-25" : "",
                      ].join(" ")}
                    >
                      {toPersianDigits(day)}
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 border-t border-border pt-3 text-center text-[11px] text-muted-foreground">
                برای انتخاب تاریخ تولد، روز موردنظر را انتخاب کنید.
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="mx-auto mt-4 flex max-w-xl flex-col gap-2 sm:flex-row">
          <Button
            size={"lg"}
            type="button"
            onClick={calculate}
            className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-violet-500 px-5 text-sm font-semibold text-white transition hover:bg-violet-600"
          >
            <Cake className="size-4" />
            محاسبه سن
          </Button>

          <button
            type="button"
            onClick={reset}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border px-4 text-sm font-medium transition hover:bg-muted"
          >
            <RotateCcw className="size-4" />
            پاک کردن
          </button>
        </div>

        {/* Results */}
        {data && result && (
          <div className="mt-8 space-y-4">
            {/* Main age */}
            <div className="rounded-2xl border border-violet-500/20 bg-violet-500/5 p-5 text-center">
              <div className="mb-3 flex items-center justify-center gap-2 text-violet-600 dark:text-violet-400">
                <Cake className="size-5" />

                <span className="text-sm font-medium">سن دقیق شما</span>
              </div>

              <div className="text-2xl font-black sm:text-3xl">
                {toPersianDigits(data.age.years)} سال،{" "}
                {toPersianDigits(data.age.months)} ماه و{" "}
                {toPersianDigits(data.age.days)} روز
              </div>
            </div>

            {/* Information cards */}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <InfoCard
                icon={Clock3}
                title="روزهای سپری‌شده"
                value={
                  <>
                    {toPersianDigits(
                      data.age.totalDays.toLocaleString("en-US"),
                    )}{" "}
                    روز
                  </>
                }
              />

              <InfoCard
                icon={CalendarHeart}
                title="تولد بعدی"
                value={formatJalaliLong(data.nextBirthday)}
              />

              <InfoCard
                icon={Gift}
                title="تا تولد بعدی"
                value={
                  <>
                    {toPersianDigits(
                      data.daysUntilBirthday.toLocaleString("en-US"),
                    )}{" "}
                    روز
                  </>
                }
              />

              <InfoCard
                icon={CalendarDays}
                title="روز تولد"
                value={weekdays[data.weekday]}
              />

              <InfoCard
                icon={Sparkles}
                title="حیوان سال تولد"
                value={
                  <span className="flex items-center gap-2">
                    <span className="text-2xl">{data.animal.icon}</span>

                    <span>{data.animal.name}</span>
                  </span>
                }
                subtitle={`سال ${toPersianDigits(data.birthParts.year)}`}
              />

              <InfoCard
                icon={Star}
                title="نماد ماه تولد"
                value={
                  <span className="flex items-center gap-2">
                    <span className="text-2xl">{data.monthSymbol.icon}</span>

                    <span>{data.monthSymbol.symbol}</span>
                  </span>
                }
                subtitle={jalaliMonths[data.birthParts.month - 1]}
              />
            </div>

            {/* Summary */}
            <div className="rounded-2xl border border-border bg-muted/30 p-4">
              <div className="flex flex-wrap items-center justify-center gap-3 text-center text-sm">
                <span>
                  متولد <strong>{formatJalaliLong(result.birthDate)}</strong>
                </span>

                <span className="hidden text-muted-foreground sm:inline">
                  •
                </span>

                <span>
                  سال{" "}
                  <strong>
                    {data.animal.icon} {data.animal.name}
                  </strong>
                </span>

                <span className="hidden text-muted-foreground sm:inline">
                  •
                </span>

                <span>
                  ماه{" "}
                  <strong>
                    {data.monthSymbol.icon} {data.monthSymbol.symbol}
                  </strong>
                </span>
              </div>
            </div>

            {/* Copy */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={copyResult}
                className="inline-flex h-10 items-center gap-2 rounded-xl border border-border px-4 text-xs font-medium transition hover:bg-muted"
              >
                <Copy className="size-3.5" />
                کپی نتیجه
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
