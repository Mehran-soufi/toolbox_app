import Link from "next/link";

import {
  ArrowLeft,
  Bitcoin,
  CircleDollarSign,
  Coins,
  DollarSign,
} from "lucide-react";

const categories = [
  {
    title: "قیمت طلا و سکه",
    description: "مشاهده آخرین قیمت طلا، انواع سکه و انس جهانی طلا",
    href: "/tools/prices/gold",
    icon: Coins,
    iconClass: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    hoverClass: "group-hover:bg-amber-500 group-hover:text-white",
  },
  {
    title: "قیمت ارز",
    description: "مشاهده قیمت دلار، یورو، پوند، درهم و سایر ارزهای پرکاربرد",
    href: "/tools/prices/currency",
    icon: DollarSign,
    iconClass: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    hoverClass: "group-hover:bg-blue-500 group-hover:text-white",
  },
  {
    title: "قیمت ارز دیجیتال",
    description: "مشاهده آخرین قیمت بیت‌کوین، اتریوم و سایر رمزارزهای محبوب",
    href: "/tools/prices/crypto-currency",
    icon: Bitcoin,
    iconClass: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
    hoverClass: "group-hover:bg-violet-500 group-hover:text-white",
  },
  {
    title: "قیمت کالاها",
    description:
      "مشاهده آخرین قیمت فلزات گران‌بها، فلزات پایه و حامل‌های انرژی",
    href: "/tools/prices/commodity",
    icon: CircleDollarSign,
    iconClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    hoverClass: "group-hover:bg-emerald-500 group-hover:text-white",
  },
];

export default function PricesCategories() {
  return (
    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
      {categories.map((category) => {
        const Icon = category.icon;

        return (
          <Link key={category.href} href={category.href} className="group">
            <div className="relative flex h-full min-h-56 flex-col overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/60 p-5 shadow-[0_0_35px_rgba(173,70,255,.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_35px_rgba(173,70,255,.15)] dark:border-zinc-800 dark:bg-zinc-900/50">
              {/* Background glow */}
              <div className="pointer-events-none absolute -right-10 -top-10 size-28 rounded-full bg-violet-500/5 blur-3xl transition-all duration-300 group-hover:bg-violet-500/10" />

              {/* Icon */}
              <div
                className={`relative flex size-12 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${category.iconClass} ${category.hoverClass}`}
              >
                <Icon className="size-6" />
              </div>

              {/* Content */}
              <div className="relative mt-5 flex flex-1 flex-col">
                <h3 className="text-base font-bold md:text-lg">
                  {category.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                  {category.description}
                </p>

                {/* Link */}
                <div className="mt-auto flex items-center justify-between pt-5">
                  <span className="text-sm font-medium text-zinc-700 transition-colors group-hover:text-violet-600 dark:text-zinc-300 dark:group-hover:text-violet-400">
                    مشاهده قیمت‌ها
                  </span>

                  <div className="flex size-8 items-center justify-center rounded-full bg-zinc-100 transition-all duration-300 group-hover:bg-violet-500 group-hover:text-white dark:bg-zinc-800">
                    <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
