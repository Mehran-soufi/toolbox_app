"use client";

import { useRef, useState } from "react";
import { Download, RefreshCw, MoveHorizontal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

import { ImageItem } from "@/lib/image-converter.types";
import { Button } from "@/components/ui/button";

function formatBytes(bytes?: number) {
  if (!bytes) return "—";

  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

interface ImagePreviewProps {
  image: ImageItem;
  format: string;
}

export default function ImagePreview({ image, format }: ImagePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const convertedWidth = image.convertedWidth ?? image.width;

  const convertedHeight = image.convertedHeight ?? image.height;

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const container = containerRef.current;

    if (!container) return;

    const rect = container.getBoundingClientRect();

    const nextPosition = ((event.clientX - rect.left) / rect.width) * 100;

    setPosition(Math.min(100, Math.max(0, nextPosition)));
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.preventDefault();

    setIsDragging(true);

    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const hasConvertedImage = Boolean(image.convertedUrl);

  const handleDownload = () => {
    if (!image.convertedUrl) {
      return;
    }

    const extensionMap: Record<string, string> = {
      "image/webp": "webp",
      "image/jpeg": "jpg",
      "image/png": "png",
      "image/avif": "avif",
    };

    const extension = extensionMap[format] ?? "webp";

    const originalName = image.file.name.replace(/\.[^/.]+$/, "");

    const link = document.createElement("a");

    link.href = image.convertedUrl;
    link.download = `${originalName}-converted.${extension}`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="overflow-hidden border-border/60">
      <CardContent className="space-y-3 p-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold">پیش‌نمایش</p>

            <p className="mt-0.5 text-xs text-muted-foreground">
              مقایسه تصویر اصلی و نتیجه
            </p>
          </div>

          {hasConvertedImage && (
            <div className="rounded-full bg-purple-100 px-2.5 py-1 text-xs font-medium text-purple-600 dark:bg-purple-950/40 dark:text-violet-400">
              آماده
            </div>
          )}
        </div>

        {/* Before / After */}
        <div
          ref={containerRef}
          className="relative aspect-video select-none overflow-hidden rounded-xl bg-muted touch-none"
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onPointerLeave={() => {
            if (isDragging) {
              setIsDragging(false);
            }
          }}
        >
          {/* Original / Before */}
          <div className="absolute inset-0">
            <img
              src={image.preview}
              alt={image.file.name}
              draggable={false}
              className="absolute inset-0 size-full object-contain"
            />

            <div className="absolute left-3 top-3 rounded-full bg-black/65 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
              قبل
            </div>
          </div>

          {hasConvertedImage ? (
            <>
              {/* Converted / After */}
              <div
                className="absolute inset-y-0 right-0 overflow-hidden"
                style={{
                  width: `${100 - position}%`,
                }}
              >
                <img
                  src={image.convertedUrl}
                  alt="تصویر تبدیل شده"
                  draggable={false}
                  className="absolute inset-y-0 right-0 h-full w-screen max-w-none object-contain"
                  style={{
                    width: containerRef.current
                      ? `${containerRef.current.clientWidth}px`
                      : "100%",
                  }}
                />

                <div className="absolute right-3 top-3 rounded-full bg-purple-600/90 px-2.5 py-1 text-xs font-medium text-white shadow-sm backdrop-blur-sm">
                  بعد
                </div>
              </div>

              {/* Comparison Line */}
              <div
                className="absolute inset-y-0 z-10 w-0.5 bg-white shadow-[0_0_8px_rgba(0,0,0,0.35)]"
                style={{
                  left: `${position}%`,
                  transform: "translateX(-50%)",
                }}
              >
                {/* Handle */}
                <div
                  role="slider"
                  aria-label="مقایسه قبل و بعد"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Math.round(position)}
                  tabIndex={0}
                  onPointerDown={handlePointerDown}
                  onKeyDown={(event) => {
                    if (event.key === "ArrowLeft") {
                      setPosition((value) => Math.max(0, value - 5));
                    }

                    if (event.key === "ArrowRight") {
                      setPosition((value) => Math.min(100, value + 5));
                    }
                  }}
                  className="absolute left-1/2 top-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border-2 border-white bg-linear-to-br from-purple-500 to-violet-500 text-white shadow-lg shadow-purple-500/30 outline-none transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-purple-400"
                >
                  <MoveHorizontal className="size-5" />
                </div>
              </div>
            </>
          ) : (
            /* Empty result */
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/30 backdrop-blur-[1px]">
              <div className="flex size-12 items-center justify-center rounded-xl bg-muted-foreground/10">
                <RefreshCw className="size-6 text-muted-foreground" />
              </div>

              <span className="mt-2 text-xs text-muted-foreground">
                هنوز تبدیل نشده
              </span>
            </div>
          )}
        </div>

        {/* Comparison Hint */}
        {hasConvertedImage && (
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
            <MoveHorizontal className="size-3.5" />
            <span>خط وسط را بکشید تا قبل و بعد را مقایسه کنید</span>
          </div>
        )}

        {/* Information */}
        <div className="grid grid-cols-2 gap-2">
          {/* Original */}
          <div className="rounded-lg border bg-muted/30 p-2.5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-medium">تصویر اصلی</span>

              <span className="text-[11px] text-muted-foreground">
                {formatBytes(image.file.size)}
              </span>
            </div>

            <p className="mt-1 text-[11px] text-muted-foreground">
              {image.width} × {image.height}
            </p>
          </div>

          {/* Converted */}
          <div className="rounded-lg border border-purple-200 bg-purple-50/50 p-2.5 dark:border-purple-900/50 dark:bg-purple-950/20">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-medium text-purple-600 dark:text-violet-400">
                نتیجه
              </span>

              <span className="text-[11px] text-purple-600 dark:text-violet-400">
                {formatBytes(image.convertedSize)}
              </span>
            </div>

            <p className="mt-1 text-[11px] text-muted-foreground">
              {convertedWidth} × {convertedHeight}
            </p>
          </div>
        </div>

        {/* Size Reduction */}
        {hasConvertedImage && image.convertedSize && image.file.size > 0 && (
          <div className="rounded-lg bg-purple-50 px-3 py-2 text-center text-xs dark:bg-purple-950/20">
            {image.convertedSize < image.file.size ? (
              <span className="text-purple-600 dark:text-violet-400">
                حجم فایل{" "}
                {Math.round((1 - image.convertedSize / image.file.size) * 100)}٪
                کاهش یافته است
              </span>
            ) : (
              <span className="text-muted-foreground">
                حجم فایل نسبت به تصویر اصلی افزایش یافته است
              </span>
            )}
          </div>
        )}
        {hasConvertedImage && (
          <Button
            type="button"
            onClick={handleDownload}
            className="h-10 w-full bg-linear-to-r from-purple-500 to-violet-500 text-white shadow-md shadow-purple-500/20 transition-all hover:from-purple-600 hover:to-violet-600 hover:shadow-lg hover:shadow-purple-500/25"
          >
            <Download className="ml-2 size-4" />
            دانلود تصویر
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
