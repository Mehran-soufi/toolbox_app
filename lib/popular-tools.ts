import clockImg from "@/assets/toolbox_img/clock.png";
import calcImg from "@/assets/toolbox_img/calculator.png";
import gold from "@/assets/toolbox_img/gold.png";
import health from "@/assets/toolbox_img/health.png";
import age from "@/assets/toolbox_img/age.png";
import currency from "@/assets/toolbox_img/currency.png";

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
    id: "stopwatch",
    name: "کرنومتر",
    description: "اندازه‌گیری دقیق زمان",
    href: "/tools/stopwatch",
    isNew: true,
    pictior: clockImg,
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
    id: "unit-converter",
    name: "تبدیل واحد",
    description: "تبدیل سریع انواع واحدها",
    href: "/tools/unit-converter",
    isNew: false,
    pictior: calcImg,
  },

  {
    id: "percentage",
    name: "قیمت طلا",
    description: "قیمت لحظه ای طلا",
    href: "/tools/gold-price",
    isNew: false,
    pictior: gold,
  },

  {
    id: "age-calculator",
    name: "قیمت ارز",
    description: "قیمت دقیق و لحظه ای ارز",
    href: "/tools/age-calculator",
    isNew: false,
    pictior: currency,
  },

  {
    id: "date-calculator",
    name: "محاسبه تاریخ",
    description: "محاسبه فاصله بین تاریخ‌ها",
    href: "/tools/date-calculator",
    isNew: false,
    pictior: clockImg,
  },

  {
    id: "bmi-calculator",
    name: "محاسبه BMI",
    description: "بررسی شاخص توده بدنی",
    href: "/tools/bmi-calculator",
    isNew: true,
    pictior: health,
  },
];