"use client";

import { useEffect, useState } from "react";
import {
  MapPin,
  Thermometer,
  Monitor,
  Sun,
  Moon,
  History,
  Heart,
  Trash2,
  Settings,
  Info,
  ChevronLeft,
  RotateCcw,
} from "lucide-react";
import { useTheme } from "next-themes";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { clearFavoriteTools, getFavoriteTools } from "@/lib/favorite-tools";
import { toPersianNumber } from "@/lib/number";
import { clearToolHistory, getToolHistory } from "@/lib/tool-history";

import CitySelector from "../../app/tools/weather/city-selector";
import { defaultCity as fallbackCity, type City } from "@/lib/cities";
import { clearSavedCity, getSavedCity } from "@/lib/city-storage";
import {
  clearTemperatureUnit,
  getTemperatureUnit,
  saveTemperatureUnit,
  type TemperatureUnit,
} from "@/lib/temperature-storage";

// ------------------------------------
// Page
// ------------------------------------

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  const [selectedCity, setSelectedCity] = useState<City>(fallbackCity);

  const [temperatureUnit, setTemperatureUnit] =
    useState<TemperatureUnit>("celsius");

  const [favoriteCount, setFavoriteCount] = useState(0);
  const [historyCount, setHistoryCount] = useState(0);

  // ------------------------------------
  // Load settings
  // ------------------------------------

  useEffect(() => {
    setMounted(true);

    const savedCity = getSavedCity();

    if (savedCity) {
      setSelectedCity(savedCity);
    }

    setTemperatureUnit(getTemperatureUnit());

    setFavoriteCount(getFavoriteTools().length);
    setHistoryCount(getToolHistory().length);
  }, []);

  // ------------------------------------
  // Data counts
  // ------------------------------------

  const loadDataCounts = () => {
    try {
      const history = getToolHistory();
      const favorites = getFavoriteTools();

      setHistoryCount(history.length);
      setFavoriteCount(favorites.length);
    } catch (error) {
      console.error("Error loading settings data:", error);

      setHistoryCount(0);
      setFavoriteCount(0);
    }
  };

  // ------------------------------------
  // City
  // ------------------------------------

  const handleCityChange = (city: City) => {
    setSelectedCity(city);
    toast.success(`شهر پیش‌فرض روی ${city.name} تنظیم شد`);
  };

  // ------------------------------------
  // Temperature
  // ------------------------------------

  const handleTemperatureChange = (unit: TemperatureUnit) => {
    setTemperatureUnit(unit);
    saveTemperatureUnit(unit);

    toast.success(
      unit === "celsius"
        ? "واحد دما روی سانتی‌گراد قرار گرفت"
        : "واحد دما روی فارنهایت قرار گرفت",
    );
  };

  // ------------------------------------
  // Clear history
  // ------------------------------------

  const handleClearHistory = () => {
    clearToolHistory();

    setHistoryCount(0);

    toast.success("تاریخچه ابزارها پاک شد");
  };

  // ------------------------------------
  // Clear favorites
  // ------------------------------------

  const handleClearFavorites = () => {
    clearFavoriteTools();

    setFavoriteCount(0);

    toast.success("محبوب‌ها پاک شدند");
  };

  // ------------------------------------
  // Clear all local data
  // ------------------------------------

  const handleClearAllData = () => {
    const confirmed = window.confirm(
      "آیا مطمئن هستید که تمام داده‌های ذخیره‌شده جعبه ابزار پاک شوند؟",
    );

    if (!confirmed) return;

    clearToolHistory();
    clearFavoriteTools();
    clearSavedCity();
    clearTemperatureUnit();

    setSelectedCity(fallbackCity);
    setHistoryCount(0);
    setFavoriteCount(0);
    setTemperatureUnit("celsius");

    toast.success("تمام داده‌های جعبه ابزار پاک شدند");
  };

  // ------------------------------------
  // Theme
  // ------------------------------------

  const themeOptions = [
    {
      value: "light",
      label: "روشن",
      icon: Sun,
    },
    {
      value: "dark",
      label: "تاریک",
      icon: Moon,
    },
    {
      value: "system",
      label: "سیستم",
      icon: Monitor,
    },
  ];

  // ------------------------------------
  // Render
  // ------------------------------------

  return (
    <main className="mx-auto w-full max-w-4xl px-3 pb-12">
      {/* Header */}

      <div className="mb-6 flex items-center gap-3">
        <div className="flex size-11 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-500">
          <Settings className="size-5" />
        </div>

        <div>
          <h1 className="text-xl font-bold">تنظیمات</h1>

          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            تنظیمات و شخصی‌سازی جعبه ابزار
          </p>
        </div>
      </div>

      <div className="space-y-5">
        {/* -------------------------------- */}
        {/* Location */}
        {/* -------------------------------- */}

        <SettingsSection
          icon={MapPin}
          title="موقعیت و آب‌وهوا"
          description="تنظیمات مربوط به نمایش اطلاعات آب‌وهوا و موقعیت"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium">شهر پیش‌فرض</p>

              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                برای نمایش وضعیت آب‌وهوا و در آینده اوقات شرعی
              </p>
            </div>

            <CitySelector value={selectedCity} onChange={handleCityChange} />
          </div>

          {/* Temperature */}

          <div className="mt-5 border-t border-zinc-200/70 pt-5 dark:border-zinc-800">
            <div className="mb-3 flex items-center gap-2">
              <Thermometer className="size-4 text-sky-500" />

              <div>
                <p className="text-sm font-medium">واحد دما</p>

                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                  واحد نمایش دمای هوا
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:w-80">
              <button
                type="button"
                onClick={() => handleTemperatureChange("celsius")}
                className={cn(
                  "rounded-xl border px-4 py-3 text-sm transition",
                  temperatureUnit === "celsius"
                    ? "border-violet-400 bg-violet-500/10 text-violet-600 dark:text-violet-400"
                    : "border-zinc-200 bg-zinc-50 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-800/60 dark:hover:bg-zinc-800",
                )}
              >
                سانتی‌گراد
                <span className="mr-1 text-xs">°C</span>
              </button>

              <button
                type="button"
                onClick={() => handleTemperatureChange("fahrenheit")}
                className={cn(
                  "rounded-xl border px-4 py-3 text-sm transition",
                  temperatureUnit === "fahrenheit"
                    ? "border-violet-400 bg-violet-500/10 text-violet-600 dark:text-violet-400"
                    : "border-zinc-200 bg-zinc-50 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-800/60 dark:hover:bg-zinc-800",
                )}
              >
                فارنهایت
                <span className="mr-1 text-xs">°F</span>
              </button>
            </div>
          </div>
        </SettingsSection>

        {/* -------------------------------- */}
        {/* Appearance */}
        {/* -------------------------------- */}

        <SettingsSection
          icon={Sun}
          title="ظاهر سایت"
          description="نحوه نمایش جعبه ابزار را انتخاب کنید"
        >
          {mounted && (
            <div className="grid grid-cols-3 gap-2">
              {themeOptions.map((option) => {
                const Icon = option.icon;

                const active = theme === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setTheme(option.value)}
                    className={cn(
                      "flex flex-col items-center justify-center gap-2 rounded-xl border px-3 py-4 transition",
                      active
                        ? "border-violet-400 bg-violet-500/10 text-violet-600 dark:text-violet-400"
                        : "border-zinc-200 bg-zinc-50 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-800/60 dark:hover:bg-zinc-800",
                    )}
                  >
                    <Icon className="size-5" />

                    <span className="text-xs font-medium">{option.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </SettingsSection>

        {/* -------------------------------- */}
        {/* User Data */}
        {/* -------------------------------- */}

        <SettingsSection
          icon={History}
          title="داده‌های شما"
          description="مدیریت تاریخچه و ابزارهای محبوب"
        >
          {/* History */}

          <DataRow
            icon={History}
            title="تاریخچه ابزارها"
            description={`${toPersianNumber(historyCount)} ابزار در تاریخچه شما قرار دارد`}
            action={
              <button
                type="button"
                disabled={historyCount === 0}
                onClick={handleClearHistory}
                className={cn(
                  "inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs transition",
                  "border-zinc-200 bg-white",
                  "hover:bg-zinc-50",
                  "disabled:cursor-not-allowed disabled:opacity-40",
                  "dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800",
                )}
              >
                <Trash2 className="size-3.5" />
                پاک کردن
              </button>
            }
          />

          <div className="my-4 h-px bg-zinc-200/70 dark:bg-zinc-800" />

          {/* Favorites */}

          <DataRow
            icon={Heart}
            title="ابزارهای محبوب"
            description={`${toPersianNumber(favoriteCount)} ابزار در لیست محبوب‌های شماست`}
            action={
              <button
                type="button"
                disabled={favoriteCount === 0}
                onClick={handleClearFavorites}
                className={cn(
                  "inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs transition",
                  "border-zinc-200 bg-white",
                  "hover:bg-zinc-50",
                  "disabled:cursor-not-allowed disabled:opacity-40",
                  "dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800",
                )}
              >
                <Trash2 className="size-3.5" />
                پاک کردن
              </button>
            }
          />

          <div className="mt-5 rounded-xl border border-red-200/70 bg-red-50/60 p-4 dark:border-red-900/40 dark:bg-red-950/20">
            <div className="flex items-start gap-3">
              <Trash2 className="mt-0.5 size-4 shrink-0 text-red-500" />

              <div className="flex-1">
                <p className="text-sm font-medium text-red-700 dark:text-red-400">
                  پاک کردن تمام داده‌ها
                </p>

                <p className="mt-1 text-xs leading-5 text-red-600/80 dark:text-red-400/70">
                  تمام تنظیمات، تاریخچه و ابزارهای محبوب از این دستگاه حذف
                  خواهند شد.
                </p>

                <button
                  type="button"
                  onClick={handleClearAllData}
                  className="mt-3 inline-flex items-center gap-2 rounded-lg bg-red-500 px-3 py-2 text-xs font-medium text-white transition hover:bg-red-600"
                >
                  <RotateCcw className="size-3.5" />
                  پاک کردن همه داده‌ها
                </button>
              </div>
            </div>
          </div>
        </SettingsSection>

        {/* -------------------------------- */}
        {/* About */}
        {/* -------------------------------- */}

        <SettingsSection
          icon={Info}
          title="درباره جعبه ابزار"
          description="اطلاعات مربوط به سایت"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">نسخه جعبه ابزار</p>

              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                نسخه اولیه
              </p>
            </div>

            <span className="rounded-lg bg-zinc-100 px-3 py-1.5 text-xs font-medium dark:bg-zinc-800">
              v1.0.0
            </span>
          </div>

          <button
            type="button"
            className="mt-4 flex w-full items-center justify-between rounded-xl border border-zinc-200 px-4 py-3 text-sm transition hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800"
          >
            <span>درباره جعبه ابزار</span>

            <ChevronLeft className="size-4 text-zinc-400" />
          </button>
        </SettingsSection>
      </div>
    </main>
  );
}

// ------------------------------------
// Settings Section
// ------------------------------------

interface SettingsSectionProps {
  icon: React.ElementType;
  title: string;
  description: string;
  children: React.ReactNode;
}

function SettingsSection({
  icon: Icon,
  title,
  description,
  children,
}: SettingsSectionProps) {
  return (
    <section className="rounded-2xl border border-zinc-200/70 bg-white/70 p-4 shadow-sm backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-5">
      <div className="mb-5 flex items-start gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500">
          <Icon className="size-4" />
        </div>

        <div>
          <h2 className="text-sm font-bold">{title}</h2>

          <p className="mt-1 text-xs leading-5 text-zinc-500 dark:text-zinc-400">
            {description}
          </p>
        </div>
      </div>

      {children}
    </section>
  );
}

// ------------------------------------
// Data Row
// ------------------------------------

interface DataRowProps {
  icon: React.ElementType;
  title: string;
  description: string;
  action: React.ReactNode;
}

function DataRow({ icon: Icon, title, description, action }: DataRowProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
          <Icon className="size-4" />
        </div>

        <div className="min-w-0">
          <p className="text-sm font-medium">{title}</p>

          <p className="mt-1 truncate text-xs text-zinc-500 dark:text-zinc-400">
            {description}
          </p>
        </div>
      </div>

      {action}
    </div>
  );
}
