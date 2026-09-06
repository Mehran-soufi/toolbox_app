"use client";

import ThemeToggle from "../shared/theme-toggle";
import ToolSearch from "../shared/tool-search";

import logo from "../../assets/logo/logo.png";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

function Header() {
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();
  const isHome = pathname === "/";

  const showHeaderContent = !isHome || scrolled;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`
        sticky top-0.5 z-40
        mb-2 px-1 py-1.5
        flex items-center justify-between
        transition-all duration-500 ease-out
        ${
          showHeaderContent
            ? "rounded-xl border-b border-zinc-200 bg-white/60 shadow-[0_0_35px_rgba(173,70,255,.12)] backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-900/50"
            : "bg-transparent"
        }
      `}
    >
      {/*
       ========================================
          سمت راست - لوگو
       ========================================
      */}

      <div
        className={`
          min-w-0 flex-1
          transition-all duration-500
          ease-[cubic-bezier(0.22,1,0.36,1)]
          ${
            showHeaderContent
              ? "translate-y-0 scale-100 opacity-100"
              : "pointer-events-none translate-y-3 scale-95 opacity-0"
          }
        `}
      >
        <Link href="/" className="flex w-fit items-center gap-x-1">
          <Image src={logo} alt="جعبه ابزار" width={50} height={50} />

          <p className="whitespace-nowrap">جعبه ابزار</p>
        </Link>
      </div>

      {/*
       ========================================
          سمت چپ - جستجو + تغییر تم
       ========================================
       */}

      <div className="relative z-50 flex items-center gap-2">
        {/* 
          ToolSearch خودش:
          lg به بالا → Input
          پایین lg → دکمه Search
        */}

        <div
          className={`
            transition-all duration-500
            ${
              showHeaderContent
                ? "translate-y-0 opacity-100"
                : "pointer-events-none translate-y-2 opacity-0"
            }
          `}
        >
          <ToolSearch />
        </div>

        {/* Theme Toggle
            همیشه نمایش داده می‌شود */}
        <div className="relative z-50">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

export default Header;
