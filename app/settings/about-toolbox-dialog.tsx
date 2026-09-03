"use client";

import { ExternalLink, Heart, Info, Sparkles, Wrench } from "lucide-react";

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

const features = [
  "مجموعه‌ای از ابزارهای کاربردی و روزمره",
  "طراحی واکنش‌گرا برای موبایل، تبلت و دسکتاپ",
  "پشتیبانی از حالت روشن و تاریک",
  "ذخیره تنظیمات شخصی کاربر",
  "تاریخچه استفاده از ابزارها",
  "مدیریت ابزارهای محبوب",
];

const technologies = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "shadcn/ui",
];

export default function AboutToolboxDialog({
  open,
  onOpenChange,
}: AboutToolboxDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-3xl border-zinc-200/70 bg-white/95 p-0 shadow-2xl backdrop-blur-xl dark:border-zinc-800/70 dark:bg-zinc-950/95 sm:max-w-lg">
        <div className="p-5 sm:p-7">
          <DialogHeader className="text-right">
            <div className="mb-5 flex items-center gap-4">
              <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-500">
                <Wrench className="size-7" />
              </div>

              <div className="min-w-0">
                <DialogTitle className="text-xl font-bold">
                  درباره جعبه ابزار
                </DialogTitle>

                <DialogDescription className="mt-1 text-sm leading-6">
                  مجموعه‌ای از ابزارهای کاربردی در یک مکان
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-5">
            {/* Introduction */}

            <div className="rounded-2xl border border-zinc-200/70 bg-zinc-50/80 p-4 dark:border-zinc-800/70 dark:bg-zinc-900/50">
              <div className="mb-2 flex items-center gap-2">
                <Sparkles className="size-4 text-violet-500" />

                <h3 className="text-sm font-semibold">جعبه ابزار چیست؟</h3>
              </div>

              <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                جعبه ابزار مجموعه‌ای از ابزارهای آنلاین کاربردی است که با هدف
                دسترسی سریع، ساده و راحت به ابزارهای موردنیاز روزمره طراحی شده
                است.
              </p>
            </div>

            {/* Features */}

            <div>
              <div className="mb-3 flex items-center gap-2">
                <Info className="size-4 text-violet-500" />

                <h3 className="text-sm font-semibold">امکانات</h3>
              </div>

              <div className="space-y-1">
                {features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-start gap-3 rounded-xl px-2 py-2"
                  >
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-violet-500" />

                    <span className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies */}

            <div>
              <h3 className="mb-3 text-sm font-semibold">
                تکنولوژی‌های استفاده‌شده
              </h3>

              <div className="flex flex-wrap gap-2">
                {technologies.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </div>

            {/* Version */}

            <div className="flex items-center justify-between rounded-2xl border border-zinc-200/70 bg-zinc-50/80 px-4 py-3 dark:border-zinc-800/70 dark:bg-zinc-900/50">
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                نسخه جعبه ابزار
              </span>

              <span className="rounded-lg bg-violet-500/10 px-3 py-1.5 text-xs font-semibold text-violet-600 dark:text-violet-400">
                v1.0.0
              </span>
            </div>

            {/* GitHub */}

            <a
              href="https://github.com/Mehran-soufi/toolbox_app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white text-sm font-medium transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800"
            >
              <ExternalLink className="size-4" />
              مشاهده پروژه در GitHub
            </a>

            {/* Footer */}

            <div className="flex items-center justify-center gap-1.5 pt-1 text-xs text-zinc-400">
              <span>ساخته شده با</span>

              <Heart className="size-3.5 fill-current text-rose-500" />

              <span>برای استفاده ساده‌تر و سریع‌تر</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
