import clockImg from "@/assets/toolbox_img/clock.webp";
import calcImg from "@/assets/toolbox_img/calculator.webp";
import gold from "@/assets/toolbox_img/gold.webp";
import health from "@/assets/toolbox_img/health.webp";
import currency from "@/assets/toolbox_img/currency.webp";
import stopwatch from "@/assets/toolbox_img/stopwatch.webp";
import weather from "@/assets/toolbox_img/weather.webp";
import calendar from "@/assets/toolbox_img/calendar.webp";
import qr from "@/assets/toolbox_img/qr.webp";
import unit from "@/assets/toolbox_img/unit-converted.webp";
import percentage from "@/assets/toolbox_img/percentage.webp";

export const popularTools = [
  {
    id: "calculator",
    name: "ماشین حساب",
    description: "محاسبات سریع و پیشرفته",
    href: "/tools/calculator",
    isNew: true,
    pictior: calcImg,
  },

  {
    id: "weather",
    name: "هواشناسی",
    description: "مشاهده وضعیت فعلی و پیش‌بینی آب‌وهوا",
    href: "/tools/weather",
    isNew: false,
    pictior: weather,
  },

  {
    id: "prices",
    name: "قیمت‌ها",
    description: "قیمت لحظه‌ای ارز، طلا و ارز دیجیتال",
    href: "/tools/prices",
    isNew: false,
    pictior: gold,
  },

  {
    id: "unit-converter",
    name: "تبدیل واحد",
    description: "تبدیل سریع انواع واحدها",
    href: "/tools/unit-converter",
    isNew: false,
    pictior: unit,
  },

  {
    id: "timer",
    name: "تایمر",
    description: "تنظیم زمان برای کارهای روزانه",
    href: "/tools/timer",
    isNew: false,
    pictior: clockImg,
  },

  {
    id: "calendar",
    name: "تقویم",
    description: "نمایش تقویم و مناسبت‌ها",
    href: "/tools/calendar",
    isNew: false,
    pictior: calendar,
  },

  {
    id: "stopwatch",
    name: "کرنومتر",
    description: "اندازه‌گیری دقیق زمان",
    href: "/tools/stopwatch",
    isNew: true,
    pictior: stopwatch,
  },

  {
    id: "percentage",
    name: "محاسبه درصد",
    description: "محاسبه سریع درصد و تخفیف",
    href: "/tools/percentage",
    isNew: false,
    pictior: percentage,
  },

  {
    id: "bmi-calculator",
    name: "محاسبه BMI",
    description: "محاسبه شاخص توده بدنی",
    href: "/tools/bmi-calculator",
    isNew: true,
    pictior: health,
  },

  {
    id: "date-calculator",
    name: "محاسبه تاریخ",
    description: "محاسبه فاصله بین تاریخ‌ها",
    href: "/tools/date-calculator",
    isNew: false,
    pictior: calendar,
  },

  {
    id: "currency-prices",
    name: "قیمت ارز",
    description: "قیمت دقیق و لحظه‌ای ارز",
    href: "/tools/prices-currency",
    isNew: false,
    pictior: currency,
  },

  {
    id: "qr-generator",
    name: "تولید QR Code",
    description: "ساخت سریع کد QR",
    href: "/tools/qr-generator",
    isNew: false,
    pictior: qr,
  },
];