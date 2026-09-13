"use client";

import {
  RotateCcw,
  Lock,
  Unlock,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Slider } from "@/components/ui/slider";

import { Switch } from "@/components/ui/switch";

import { Button } from "@/components/ui/button";

interface ImageSettingsProps {
  format: string;
  quality: number;
  width: string;
  height: string;
  keepRatio: boolean;

  onFormatChange: (
    value: string
  ) => void;

  onQualityChange: (
    value: number
  ) => void;

  onWidthChange: (
    value: string
  ) => void;

  onHeightChange: (
    value: string
  ) => void;

  onKeepRatioChange: (
    value: boolean
  ) => void;

  onQuickSize?: (
    value: number
  ) => void;

  onResetSize?: () => void;
}

export default function ImageSettings({
  format,
  quality,
  width,
  height,
  keepRatio,
  onFormatChange,
  onQualityChange,
  onWidthChange,
  onHeightChange,
  onKeepRatioChange,
  onQuickSize,
  onResetSize,
}: ImageSettingsProps) {
  return (
    <div className="space-y-6">
      {/* =========================
          FORMAT
      ========================== */}

      <div className="space-y-2">
        <Label>فرمت خروجی</Label>

        <Select
          value={format}
          onValueChange={
            onFormatChange
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="image/webp">
              WebP
            </SelectItem>

            <SelectItem value="image/jpeg">
              JPG
            </SelectItem>

            <SelectItem value="image/png">
              PNG
            </SelectItem>

            <SelectItem value="image/avif">
              AVIF
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* =========================
          QUALITY
      ========================== */}

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>کیفیت</Label>

          <span className="rounded-md bg-purple-500/10 px-2 py-1 text-xs font-semibold text-purple-600 dark:text-violet-400">
            {quality}٪
          </span>
        </div>

        <Slider
          value={[quality]}
          min={1}
          max={100}
          step={1}
          onValueChange={(
            values
          ) => {
            const value =
              values[0];

            if (
              typeof value ===
              "number"
            ) {
              onQualityChange(
                value
              );
            }
          }}
        />

        <div className="flex justify-between text-[10px] text-muted-foreground">
          <span>حجم کمتر</span>
          <span>کیفیت بیشتر</span>
        </div>
      </div>

      {/* =========================
          RESIZE
      ========================== */}

      <div className="space-y-4">
        <div>
          <Label>تغییر اندازه</Label>

          <p className="mt-1 text-[10px] text-muted-foreground">
            ابعاد خروجی تصویر را مشخص کنید.
          </p>
        </div>

        <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-2">
          <div className="space-y-2">
            <Label className="text-xs">
              عرض
            </Label>

            <Input
              type="number"
              min={1}
              placeholder="خودکار"
              value={width}
              onChange={(event) =>
                onWidthChange(
                  event.target.value
                )
              }
            />
          </div>

          <button
            type="button"
            title={
              keepRatio
                ? "نسبت تصویر فعال است"
                : "نسبت تصویر غیرفعال است"
            }
            onClick={() =>
              onKeepRatioChange(
                !keepRatio
              )
            }
            className={`mb-1 flex size-8 shrink-0 items-center justify-center rounded-md border transition-colors ${
              keepRatio
                ? "border-purple-300 bg-purple-500/10 text-purple-600 dark:border-purple-800 dark:text-violet-400"
                : "border-border text-muted-foreground"
            }`}
          >
            {keepRatio ? (
              <Lock className="size-3.5" />
            ) : (
              <Unlock className="size-3.5" />
            )}
          </button>

          <div className="space-y-2">
            <Label className="text-xs">
              ارتفاع
            </Label>

            <Input
              type="number"
              min={1}
              placeholder="خودکار"
              value={height}
              onChange={(event) =>
                onHeightChange(
                  event.target.value
                )
              }
            />
          </div>
        </div>
      </div>

      {/* =========================
          KEEP RATIO
      ========================== */}

      <div className="flex items-center justify-between rounded-xl border bg-muted/30 p-3">
        <div>
          <p className="text-sm font-medium">
            حفظ نسبت تصویر
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            هنگام تغییر عرض یا ارتفاع، نسبت تصویر حفظ می‌شود.
          </p>
        </div>

        <Switch
          dir="ltr"
          checked={keepRatio}
          onCheckedChange={
            onKeepRatioChange
          }
        />
      </div>

      {/* =========================
          QUICK SIZES
      ========================== */}

      <div className="space-y-3">
        <div>
          <Label>اندازه‌های سریع</Label>

          <p className="mt-1 text-[10px] text-muted-foreground">
            انتخاب سریع عرض خروجی
          </p>
        </div>

        <div className="grid grid-cols-4 gap-1.5">
          {[1920, 1280, 1080, 720].map(
            (size) => (
              <Button
                key={size}
                type="button"
                size="sm"
                variant="outline"
                className="px-1 text-xs"
                onClick={() =>
                  onQuickSize?.(
                    size
                  )
                }
              >
                {size}
              </Button>
            )
          )}
        </div>
      </div>

      {/* =========================
          RESET
      ========================== */}

      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="w-full text-muted-foreground hover:text-foreground"
        onClick={onResetSize}
      >
        <RotateCcw className="ml-2 size-3.5" />
        بازگردانی اندازه اصلی
      </Button>
    </div>
  );
}