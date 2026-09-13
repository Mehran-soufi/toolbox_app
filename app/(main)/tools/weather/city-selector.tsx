"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Check, MapPin, Search, X } from "lucide-react";

import { cities, defaultCity, type City } from "@/lib/cities";
import { saveCity } from "@/lib/city-storage";

interface CitySelectorProps {
  value?: City;
  onChange?: (city: City) => void;
}

export default function CitySelector({
  value,
  onChange,
}: CitySelectorProps) {
  const [selectedCity, setSelectedCity] = useState<City>(
    value ?? defaultCity,
  );

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const currentCity = value ?? selectedCity;

  // جلوگیری از اسکرول صفحه هنگام باز بودن Modal
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  // فوکوس خودکار روی Input
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);

    return () => clearTimeout(timer);
  }, [isOpen]);

  // بستن با Escape
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const filteredCities = useMemo(() => {
    const search = query.trim().toLowerCase();

    if (!search) {
      return cities;
    }

    return cities.filter((city) => {
      return (
        city.name.toLowerCase().includes(search) ||
        city.province.toLowerCase().includes(search)
      );
    });
  }, [query]);

  function handleOpen() {
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
    setQuery("");
  }

  function handleSelect(city: City) {
    if (city.id === currentCity.id) {
      handleClose();
      return;
    }

    setSelectedCity(city);
    saveCity(city);
    onChange?.(city);

    handleClose();
  }

  return (
    <>
      {/* City Button */}

      <button
        type="button"
        onClick={handleOpen}
        className="
          group
          flex
          items-center
          gap-1.5
          rounded-lg
          px-2
          py-1
          text-sm
          transition-all
          hover:bg-zinc-100
          dark:hover:bg-zinc-800
        "
        aria-label="تغییر شهر"
      >
        <MapPin
          className="
            size-4
            text-violet-500
            transition-transform
            duration-300
            group-hover:-translate-y-0.5
          "
        />

        <span className="font-medium">
          {currentCity.name}
        </span>

        <span className="text-xs text-zinc-400">
          ({currentCity.province})
        </span>
      </button>

      {/* Modal */}

      {isOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="
              fixed
              inset-0
              z-9999
              flex
              items-center
              justify-center
              bg-black/50
              p-4
              backdrop-blur-sm
            "
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                handleClose();
              }
            }}
          >
            {/* Modal Content */}

            <div
              className="
                flex
                w-full
                max-w-lg
                max-h-[calc(100vh-2rem)]
                flex-col
                overflow-hidden
                rounded-3xl
                border
                border-zinc-200
                bg-white
                shadow-2xl
                dark:border-zinc-800
                dark:bg-zinc-950
              "
              onMouseDown={(event) => {
                event.stopPropagation();
              }}
            >
              {/* Header */}

              <div
                className="
                  flex
                  items-start
                  justify-between
                  border-b
                  border-zinc-200
                  p-5
                  dark:border-zinc-800
                "
              >
                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex
                      size-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-violet-100
                      text-violet-600
                      dark:bg-violet-500/10
                      dark:text-violet-400
                    "
                  >
                    <MapPin className="size-5" />
                  </div>

                  <div>
                    <h2 className="text-base font-bold">
                      انتخاب شهر
                    </h2>

                    <p className="mt-0.5 text-xs text-zinc-400">
                      شهر موردنظر را برای نمایش آب‌وهوا انتخاب کنید
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleClose}
                  className="
                    rounded-xl
                    p-2
                    text-zinc-400
                    transition-colors
                    hover:bg-zinc-100
                    hover:text-zinc-700
                    dark:hover:bg-zinc-800
                    dark:hover:text-zinc-200
                  "
                  aria-label="بستن"
                >
                  <X className="size-5" />
                </button>
              </div>

              {/* Search */}

              <div className="p-4 pb-2">
                <div
                  className="
                    flex
                    h-12
                    items-center
                    gap-3
                    rounded-2xl
                    border
                    border-zinc-200
                    bg-zinc-50
                    px-4
                    transition-all
                    focus-within:border-violet-400
                    focus-within:ring-4
                    focus-within:ring-violet-500/10
                    dark:border-zinc-800
                    dark:bg-zinc-900
                  "
                >
                  <Search className="size-5 shrink-0 text-zinc-400" />

                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(event) =>
                      setQuery(event.target.value)
                    }
                    placeholder="جستجوی شهرستان یا استان..."
                    className="
                      min-w-0
                      flex-1
                      bg-transparent
                      text-sm
                      outline-none
                      placeholder:text-zinc-400
                    "
                  />

                  {query && (
                    <button
                      type="button"
                      onClick={() => setQuery("")}
                      className="
                        rounded-lg
                        p-1.5
                        text-zinc-400
                        transition
                        hover:bg-zinc-200
                        dark:hover:bg-zinc-800
                      "
                      aria-label="پاک کردن جستجو"
                    >
                      <X className="size-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Result Count */}

              <div className="px-5 py-2">
                <p className="text-xs text-zinc-400">
                  {query
                    ? `${filteredCities.length} نتیجه`
                    : `${cities.length} شهرستان`}
                </p>
              </div>

              {/* Cities */}

              <div
                className="
                  min-h-0
                  flex-1
                  overflow-y-auto
                  px-3
                  pb-3
                "
              >
                {filteredCities.length > 0 ? (
                  <div className="space-y-1">
                    {filteredCities.map((city) => {
                      const isSelected =
                        currentCity.id === city.id;

                      return (
                        <button
                          key={city.id}
                          type="button"
                          onClick={() => handleSelect(city)}
                          className={`
                            flex
                            w-full
                            items-center
                            gap-3
                            rounded-2xl
                            p-3
                            text-right
                            transition-all
                            ${
                              isSelected
                                ? "bg-violet-50 dark:bg-violet-500/10"
                                : "hover:bg-zinc-100 dark:hover:bg-zinc-900"
                            }
                          `}
                        >
                          {/* Icon */}

                          <div
                            className={`
                              flex
                              size-10
                              shrink-0
                              items-center
                              justify-center
                              rounded-xl
                              ${
                                isSelected
                                  ? "bg-violet-100 text-violet-600 dark:bg-violet-500/20 dark:text-violet-400"
                                  : "bg-zinc-100 text-zinc-400 dark:bg-zinc-800"
                              }
                            `}
                          >
                            <MapPin className="size-4.5" />
                          </div>

                          {/* Info */}

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold">
                              {city.name}
                            </p>

                            <p className="mt-0.5 truncate text-xs text-zinc-400">
                              {city.province}
                            </p>
                          </div>

                          {/* Selected */}

                          {isSelected && (
                            <div
                              className="
                                flex
                                size-7
                                shrink-0
                                items-center
                                justify-center
                                rounded-full
                                bg-violet-500
                                text-white
                              "
                            >
                              <Check className="size-4" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div
                    className="
                      flex
                      min-h-52
                      flex-col
                      items-center
                      justify-center
                      text-center
                    "
                  >
                    <div
                      className="
                        mb-3
                        flex
                        size-14
                        items-center
                        justify-center
                        rounded-2xl
                        bg-zinc-100
                        text-zinc-400
                        dark:bg-zinc-900
                      "
                    >
                      <Search className="size-6" />
                    </div>

                    <p className="text-sm font-semibold">
                      شهرستانی پیدا نشد
                    </p>

                    <p className="mt-1 text-xs text-zinc-400">
                      نام شهرستان یا استان دیگری را امتحان کنید.
                    </p>
                  </div>
                )}
              </div>

              {/* Footer */}

              <div
                className="
                  shrink-0
                  border-t
                  border-zinc-200
                  bg-zinc-50/70
                  px-5
                  py-3
                  dark:border-zinc-800
                  dark:bg-zinc-900/50
                "
              >
                <p className="text-center text-xs text-zinc-400">
                  شهر انتخاب‌شده برای دریافت اطلاعات هواشناسی
                  استفاده می‌شود.
                </p>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}