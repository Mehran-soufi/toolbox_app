import { Calculator, Timer, Hourglass, Clock, TrendingUp, Coins, Ruler, FileText } from "lucide-react";

export const popularTools = [
  {
    id: "calculator",
    name: "ماشین حساب",
    description: "محاسبات سریع و پیشرفته",
    href: "/tools/calculator",
    icon: Calculator,
    isNew: true,
    gradient: "from-purple-600 to-indigo-700",
  },
  {
    id: "stopwatch",
    name: "کرنومتر",
    description: "اندازه‌گیری دقیق زمان",
    href: "/tools/stopwatch",
    icon: Timer,
    isNew: true,
    gradient: "from-emerald-600 to-teal-700",
  },
  // ... بقیه ابزارها
];