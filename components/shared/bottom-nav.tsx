"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid2x2, Heart, Clock, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "خانه", href: "/", icon: Home },
  { name: "همه ابزارها", href: "/tools", icon: Grid2x2 },
  { name: "محبوب‌ها", href: "/favorites", icon: Heart },
  { name: "تاریخچه", href: "/history", icon: Clock },
  { name: "تنظیمات", href: "/settings", icon: Settings },
];

const linkClasses =
  "flex flex-col items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400 hover:text-purple-500 transition-colors";

const activeClasses = "text-purple-500";

function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="
        lg:hidden
        sticky bottom-0 inset-x-0 z-50
        w-full shrink-0
        border border-zinc-200 dark:border-zinc-800
        bg-white/60 dark:bg-zinc-900/50
        shadow-[0_0_35px_rgba(173,70,255,.12)]
        backdrop-blur-xl
        flex justify-between items-center
        h-16
        px-2
      "
    >
      {navItems.map(({ name, href, icon: Icon }) => {
        const isActive =
          href === "/" ? pathname === "/" : pathname.startsWith(href);

        return (
          <Link
            key={href}
            href={href}
            className={cn(linkClasses, isActive && activeClasses)}
          >
            <Icon size={20} />
            <span>{name}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export default BottomNav;