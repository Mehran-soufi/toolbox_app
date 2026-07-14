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
];

const linkClasses =
  "w-full flex flex-col items-center gap-2 lg:gap-3 py-3 mx-2 rounded-xl text-zinc-600 dark:text-zinc-300 hover:bg-purple-500/10 hover:text-purple-500 transition-colors";

const activeClasses = "bg-purple-500/10 text-purple-500";

function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col h-screen xl:w-36 lg:w-32 p-3 sticky right-0 top-0 bottom-0">
      <div
        className="flex flex-col items-center justify-between w-full shrink-0 rounded-2xl
        border border-zinc-200 dark:border-zinc-800
        bg-white/60 dark:bg-zinc-900/50
        shadow-[0_0_35px_rgba(173,70,255,.12)]
        backdrop-blur-xl
        py-6
        h-full"
      >
        <div className="flex flex-col items-center justify-center gap-y-2 w-full px-3">
          {navItems.map(({ name, href, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={cn(linkClasses, isActive && activeClasses)}
              >
                <Icon size={20} />
                <span className="text-xs lg:text-sm">{name}</span>
              </Link>
            );
          })}
        </div>
        <div className="w-full flex items-center justify-center">
          <Link
            href="/settings"
            className={cn(
              linkClasses,
              pathname === "/settings" && activeClasses,
            )}
          >
            <Settings size={20} />
            <span className="text-xs lg:text-sm">تنظیمات</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}

export default AppSidebar;
