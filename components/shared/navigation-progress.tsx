"use client";

import { useEffect } from "react";
import NProgress from "nprogress";
import { usePathname } from "next/navigation";

import "@/app/nprogress.css";

export default function NavigationProgress() {
  const pathname = usePathname();

  useEffect(() => {
    NProgress.done();
  }, [pathname]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      const link = target.closest("a");

      if (!link) return;

      const href = link.getAttribute("href");

      if (href && href.startsWith("/") && href !== pathname) {
        NProgress.start();
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [pathname]);

  return null;
}
