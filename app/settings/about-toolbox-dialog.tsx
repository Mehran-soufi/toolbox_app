"use client";

import { Box, ExternalLink, Heart, Link, Sparkles } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AboutToolboxDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AboutToolboxDialog({
  open,
  onOpenChange,
}: AboutToolboxDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        dir="rtl"
        className="max-h-[85vh] overflow-y-auto sm:max-w-lg"
      >
        <DialogHeader className="text-right">
          <div className="mb-2 flex items-center gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-500">
              <Box className="size-6" />
            </div>

            <div>
              <DialogTitle className="text-lg font-bold">
                درباره جعبه ابزار
              </DialogTitle>

              <DialogDescription className="mt-1 text-xs">
                مجموعه‌ای از ابزارهای کاربردی برای استفاده روزمره
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-5">
          {/* Introduction */}
          <div className="rounded-2xl border border-violet-200/60 bg-violet-50/60 p-4 dark:border-violet-900/40 dark:bg-violet-950/20">
            <div className="flex items-start gap-3">
              <Sparkles className="mt-0.5 size-4 shrink-0 text-violet-500" />

              <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                جعبه ابزار با هدف ساخت مجموعه‌ای ساده، سریع و کاربردی از
                ابزارهای روزمره ایجاد شده است؛ تا بتوانید بدون نیاز به نصب
                نرم‌افزارهای مختلف، ابزارهای موردنیازتان را در یک مکان در دسترس
                داشته باشید.
              </p>
            </div>
          </div>

          {/* Features */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Heart className="size-4 text-pink-500" />

              <h3 className="text-sm font-bold">ویژگی‌های جعبه ابزار</h3>
            </div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {[
                "ابزارهای کاربردی و روزمره",
                "طراحی واکنش‌گرا برای موبایل و دسکتاپ",
                "پشتیبانی از حالت روشن و تاریک",
                "ذخیره ابزارهای محبوب",
                "تاریخچه استفاده از ابزارها",
                "تمرکز روی سرعت و سادگی",
              ].map((feature) => (
                <div
                  key={feature}
                  className="rounded-xl border border-zinc-200/70 bg-zinc-50/70 px-3 py-2.5 text-xs text-zinc-600 dark:border-zinc-800 dark:bg-zinc-800/50 dark:text-zinc-300"
                >
                  {feature}
                </div>
              ))}
            </div>
          </div>

          {/* Project info */}
          <div className="divide-y divide-zinc-200/70 overflow-hidden rounded-2xl border border-zinc-200/70 dark:divide-zinc-800 dark:border-zinc-800">
            <div className="flex items-center justify-between gap-4 px-4 py-3">
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                نسخه
              </span>

              <span className="text-sm font-semibold">v1.0.0</span>
            </div>

            <div className="flex items-center justify-between gap-4 px-4 py-3">
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                توسعه‌دهنده
              </span>

              <span className="text-sm font-semibold">Mehran Soufi</span>
            </div>
          </div>

          {/* Source Code */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Link className="size-4 text-zinc-500 dark:text-zinc-400" />

              <h3 className="text-sm font-bold">کد منبع پروژه</h3>
            </div>

            <a
              href="https://github.com/Mehran-soufi/toolbox_app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white px-4 py-3 transition-colors hover:border-violet-300 hover:bg-violet-50/50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-violet-800 dark:hover:bg-violet-950/20"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
                  <Link className="size-4" />
                </div>

                <div>
                  <p className="text-sm font-medium">مشاهده کد منبع</p>

                  <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                    کد پروژه در GitHub
                  </p>
                </div>
              </div>

              <ExternalLink className="size-4 text-zinc-400" />
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
