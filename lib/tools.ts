import {
  BadgePercent,
  Binary,
  Calculator,
  Calendar,
  CaseSensitive,
  Clock,
  Coins,
  FileText,
  Hash,
  Image,
  Languages,
  Link,
  MapPinned,
  Palette,
  QrCode,
  ReceiptText,
  Ruler,
  Scale,
  ScanLine,
  ShieldCheck,
  Timer,
  TrainFront,
  Type,
  CloudSun,
  CalendarDays,
  Cake,
  BadgeCheck,
} from "lucide-react";

export type ToolCategory =
  | "time"
  | "calculation"
  | "text"
  | "media"
  | "finance"
  | "location"
  | "utility";

export interface Tool {
  id: string;
  name: string;
  description: string;
  href: string;
  icon: typeof Calculator;
  color: string;
  category: ToolCategory;
  isNew?: boolean;
  isPopular?: boolean;
}

export const tools: Tool[] = [
  // ⭐ پرکاربرد
  {
    id: "weather",
    name: "هواشناسی",
    description: "مشاهده وضعیت فعلی و پیش‌بینی آب‌وهوا",
    href: "/tools/weather",
    icon: CloudSun,
    color: "text-sky-500",
    category: "location",
    isPopular: true,
  },

  {
    id: "calculator",
    name: "ماشین حساب",
    description: "محاسبات سریع و پیشرفته",
    href: "/tools/calculator",
    icon: Calculator,
    color: "text-emerald-500",
    category: "calculation",
    isNew: true,
    isPopular: true,
  },

  {
    id: "prices",
    name: "قیمت",
    description: "قیمت لحظه‌ای ارز، طلا، ارز دیجیتال و کالا",
    href: "/tools/prices",
    icon: Coins,
    color: "text-yellow-500",
    category: "finance",
    isPopular: true,
  },

  {
    id: "unit-converter",
    name: "تبدیل واحد",
    description: "تبدیل سریع انواع واحدها",
    href: "/tools/unit-converter",
    icon: Ruler,
    color: "text-sky-500",
    category: "calculation",
    isPopular: true,
  },

  {
    id: "calendar",
    name: "تقویم",
    description: "نمایش تقویم و مناسبت‌ها",
    href: "/tools/calendar",
    icon: Calendar,
    color: "text-orange-500",
    category: "time",
    isPopular: true,
  },

  {
    id: "timer",
    name: "تایمر",
    description: "تنظیم زمان برای کارهای روزانه",
    href: "/tools/timer",
    icon: Timer,
    color: "text-rose-500",
    category: "time",
    isPopular: true,
  },

  // 🕐 زمان و تاریخ
  {
    id: "clock",
    name: "ساعت",
    description: "نمایش ساعت و زمان",
    href: "/tools/clock",
    icon: Clock,
    color: "text-indigo-500",
    category: "time",
  },

  {
    id: "stopwatch",
    name: "کرنومتر",
    description: "اندازه‌گیری دقیق زمان",
    href: "/tools/stopwatch",
    icon: Clock,
    color: "text-blue-500",
    category: "time",
  },

  // 🧮 محاسبات و تبدیل
  {
    id: "percentage",
    name: "محاسبه درصد",
    description: "محاسبه سریع درصد",
    href: "/tools/percentage",
    icon: BadgePercent,
    color: "text-red-500",
    category: "calculation",
  },

  {
    id: "bmi-calculator",
    name: "محاسبه BMI",
    description: "محاسبه شاخص توده بدنی",
    href: "/tools/bmi-calculator",
    icon: Scale,
    color: "text-green-500",
    category: "calculation",
  },

  {
    id: "number-converter",
    name: "تبدیل اعداد",
    description: "تبدیل و پردازش اعداد",
    href: "/tools/number-converter",
    icon: Hash,
    color: "text-lime-500",
    category: "calculation",
  },

  {
    id: "binary-converter",
    name: "تبدیل دودویی",
    description: "تبدیل اعداد به مبنای دودویی",
    href: "/tools/binary-converter",
    icon: Binary,
    color: "text-teal-500",
    category: "calculation",
  },

  // 📝 متن و زبان
  {
    id: "translator",
    name: "مترجم متن",
    description: "ترجمه سریع متن",
    href: "/tools/translator",
    icon: Languages,
    color: "text-violet-500",
    category: "text",
  },

  {
    id: "text-editor",
    name: "ویرایش متن",
    description: "ابزارهای کاربردی ویرایش متن",
    href: "/tools/text-editor",
    icon: Type,
    color: "text-amber-500",
    category: "text",
  },

  {
    id: "text-case",
    name: "تغییر حروف",
    description: "تغییر حالت حروف متن",
    href: "/tools/text-case",
    icon: CaseSensitive,
    color: "text-purple-500",
    category: "text",
  },

  // 🖼️ تصویر و کد
  {
    id: "image-tools",
    name: "تبدیل تصویر",
    description: "تبدیل فرمت تصاویر",
    href: "/tools/image-tools",
    icon: Image,
    color: "text-green-500",
    category: "media",
  },

  {
    id: "qr-generator",
    name: "تولید QR Code",
    description: "ساخت کد QR",
    href: "/tools/qr-generator",
    icon: QrCode,
    color: "text-fuchsia-500",
    category: "media",
  },

  {
    id: "qr-reader",
    name: "اسکن QR Code",
    description: "خواندن کد QR",
    href: "/tools/qr-reader",
    icon: ScanLine,
    color: "text-cyan-500",
    category: "media",
  },

  {
    id: "colors",
    name: "رنگ‌ها",
    description: "انتخاب و تشخیص رنگ",
    href: "/tools/colors",
    icon: Palette,
    color: "text-pink-500",
    category: "media",
  },

  // 💰 مالی
  {
    id: "invoice-maker",
    name: "فاکتور ساز",
    description: "ساخت و مدیریت فاکتور",
    href: "/tools/invoice-maker",
    icon: ReceiptText,
    color: "text-green-600",
    category: "finance",
  },

  // 📍 مکان و مسیر
  {
    id: "coordinates",
    name: "مختصات جغرافیایی",
    description: "دریافت و تبدیل مختصات جغرافیایی",
    href: "/tools/coordinates",
    icon: MapPinned,
    color: "text-cyan-600",
    category: "location",
  },

  {
    id: "metro",
    name: "مترو",
    description: "مشاهده نقشه و مسیرهای مترو",
    href: "/tools/metro",
    icon: TrainFront,
    color: "text-cyan-500",
    category: "location",
  },

  // 🛠️ ابزارهای کاربردی
  {
    id: "password-generator",
    name: "رمزساز",
    description: "تولید رمز عبور امن",
    href: "/tools/password-generator",
    icon: ShieldCheck,
    color: "text-indigo-600",
    category: "utility",
  },

  {
    id: "url-shortener",
    name: "کوتاه کننده لینک",
    description: "کوتاه کردن لینک‌های طولانی",
    href: "/tools/url-shortener",
    icon: Link,
    color: "text-blue-500",
    category: "utility",
  },

  {
    id: "notes",
    name: "یادداشت",
    description: "ثبت و مدیریت یادداشت‌ها",
    href: "/tools/notes",
    icon: FileText,
    color: "text-yellow-600",
    category: "utility",
  },
  {
    id: "date-calculator",
    name: "محاسبه تاریخ",
    description: "محاسبه فاصله، افزودن و تبدیل تاریخ",
    href: "/tools/date-calculator",
    icon: CalendarDays,
    color: "text-violet-500",
    category: "utility",
  },
  {
    id: "age-calculator",
    name: "محاسبه سن",
    description: "محاسبه دقیق سن و اطلاعات تولد",
    href: "/tools/age-calculator",
    icon: Cake,
    color: "text-pink-500",
    category: "utility",
  },
  {
  id: "national-code",
  name: "اعتبارسنجی کد ملی",
  description: "بررسی معتبر بودن کد ملی",
  href: "/tools/national-code",
  icon: BadgeCheck,
  color: "text-violet-500",
  category: "utility",
},
];
