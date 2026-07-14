"use client";

import ThemeToggle from "../shared/theme-toggle";

import logo from "../../assets/logo/logo.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  const showLogo = !isHome || scrolled;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`px-1 py-1.5 flex items-center justify-between transition-all duration-500 ease-out sticky top-0.5 z-40
    ${
      showLogo
        ? "rounded-xl border-b border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/50 shadow-[0_0_35px_rgba(173,70,255,.12)] backdrop-blur-xl"
        : "bg-transparent"
    }`}
    >
    <div
  className={`
    transition-all
    duration-500
    ease-[cubic-bezier(0.22,1,0.36,1)]

    ${
      showLogo
        ? "opacity-100 translate-y-0 scale-100"
        : "opacity-0 translate-y-3 scale-95 pointer-events-none"
    }
  `}
>
        {/* Logo */}
        <Link className="w-full flex items-center gap-x-1" href="/">
          <Image src={logo} alt="logo" width={50} height={50} />
          <p>جعبه ابزار</p>
        </Link>
      </div>
      <div className="flex items-center z-50">
        {/* Button */}
        <ThemeToggle />
      </div>
    </header>
  );
}

export default Header;
