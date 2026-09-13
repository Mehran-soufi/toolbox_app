"use client";

import Link from "next/link";

import { ArrowLeft, Sparkles, TrendingUp } from "lucide-react";

import type { Tool } from "@/lib/tools";
import { cn } from "@/lib/utils";

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const Icon = tool.icon;

  return (
    <Link
      href={tool.href}
      className={cn(
        "group relative flex min-h-44 flex-col overflow-hidden",
        "rounded-2xl border",
        "border-zinc-200/70 bg-white/70",
        "p-5 shadow-sm backdrop-blur-xl",

        // ورود کارت
        "animate-tool-card",

        // Hover
        "transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-xl",
        "hover:border-violet-200",
        "dark:border-zinc-800/80 dark:bg-zinc-900/60",
        "dark:hover:border-violet-900/70",
      )}
    >
      {/* Background Glow */}
      <div
        className={cn(
          "pointer-events-none absolute -right-10 -top-10",
          "size-28 rounded-full blur-3xl",
          "opacity-0 transition-opacity duration-300",
          "group-hover:opacity-100",
          "bg-violet-500/10",
        )}
      />

      <div className="relative flex flex-1 flex-col">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          {/* Icon */}
          <div
            className={cn(
              "flex size-12 shrink-0 items-center justify-center",
              "rounded-xl",
              "bg-zinc-100 dark:bg-zinc-800/80",
              "transition-transform duration-300",
              "group-hover:scale-105",
            )}
          >
            <Icon className={cn("size-6", tool.color)} />
          </div>

          {/* Badges */}
          <div className="flex items-center gap-1.5">
            {tool.isNew && (
              <span
                className="
                  inline-flex items-center gap-1
                  rounded-lg
                  bg-violet-500/10
                  px-2 py-1
                  text-[10px] font-semibold
                  text-violet-600
                  dark:text-violet-400
                "
              >
                <Sparkles className="size-3" />
                جدید
              </span>
            )}

            {tool.isPopular && (
              <span
                className="
                  inline-flex items-center gap-1
                  rounded-lg
                  bg-amber-500/10
                  px-2 py-1
                  text-[10px] font-semibold
                  text-amber-600
                  dark:text-amber-400
                "
              >
                <TrendingUp className="size-3" />
                محبوب
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="mt-5">
          <h3
            className="
              text-base font-bold
              text-zinc-800
              transition-colors
              group-hover:text-violet-600
              dark:text-zinc-100
              dark:group-hover:text-violet-400
            "
          >
            {tool.name}
          </h3>

          <p
            className="
              mt-2
              line-clamp-2
              text-xs leading-6
              text-zinc-500
              dark:text-zinc-400
            "
          >
            {tool.description}
          </p>
        </div>

        {/* Footer */}
        <div
          className="
            mt-auto
            flex items-center justify-end
            border-t
            border-zinc-200/70
            pt-4
            dark:border-zinc-800
          "
        >
          <span
            className="
              flex items-center gap-1
              text-xs font-medium
              text-zinc-400
              transition-colors
              group-hover:text-violet-500
            "
          >
            استفاده از ابزار
            <ArrowLeft
              className="
                size-3.5
                transition-transform
                duration-300
                group-hover:-translate-x-1
              "
            />
          </span>
        </div>
      </div>
    </Link>
  );
}
