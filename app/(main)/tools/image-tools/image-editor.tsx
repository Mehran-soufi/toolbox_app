"use client";

import {
  PointerEvent as ReactPointerEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Check,
  Crop,
  FlipHorizontal,
  FlipVertical,
  RotateCcw,
  RotateCw,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

type AspectRatio = "free" | "1:1" | "4:3" | "3:4" | "16:9" | "9:16";

interface CropData {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ImageEditorProps {
  src: string;
  rotation: 0 | 90 | 180 | 270;
  flipHorizontal: boolean;
  flipVertical: boolean;
  crop?: CropData;
  onChange: (data: {
    rotation: 0 | 90 | 180 | 270;
    flipHorizontal: boolean;
    flipVertical: boolean;
    crop?: CropData;
  }) => void;
}

type DragMode = "move" | "nw" | "ne" | "sw" | "se" | null;

interface DragState {
  mode: DragMode;
  startX: number;
  startY: number;
  startCrop: CropData;
}

const DEFAULT_CROP: CropData = {
  x: 0,
  y: 0,
  width: 100,
  height: 100,
};

const MIN_CROP_SIZE = 8;

export default function ImageEditor({
  src,
  rotation,
  flipHorizontal,
  flipVertical,
  crop,
  onChange,
}: ImageEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const dragRef = useRef<DragState | null>(null);

  const [mode, setMode] = useState<"preview" | "crop">("preview");
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>("free");
  const [localCrop, setLocalCrop] = useState<CropData>(crop ?? DEFAULT_CROP);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLocalCrop(crop ?? DEFAULT_CROP);
    }, 0);

    return () => clearTimeout(timer);
  }, [crop]);

  const update = (
    values: Partial<{
      rotation: 0 | 90 | 180 | 270;
      flipHorizontal: boolean;
      flipVertical: boolean;
      crop?: CropData;
    }>,
  ) => {
    onChange({
      rotation,
      flipHorizontal,
      flipVertical,
      crop: values.crop !== undefined ? values.crop : localCrop,
      ...values,
    });
  };

  const rotateLeft = () => {
    const next = ((rotation - 90 + 360) % 360) as 0 | 90 | 180 | 270;

    update({
      rotation: next,
    });
  };

  const rotateRight = () => {
    const next = ((rotation + 90) % 360) as 0 | 90 | 180 | 270;

    update({
      rotation: next,
    });
  };

  const toggleFlipHorizontal = () => {
    update({
      flipHorizontal: !flipHorizontal,
    });
  };

  const toggleFlipVertical = () => {
    update({
      flipVertical: !flipVertical,
    });
  };

  const resetEditor = () => {
    setLocalCrop(DEFAULT_CROP);
    setAspectRatio("free");

    onChange({
      rotation: 0,
      flipHorizontal: false,
      flipVertical: false,
      crop: undefined,
    });

    setMode("preview");
  };

  const getPointerPosition = (event: ReactPointerEvent) => {
    const container = containerRef.current;

    if (!container) {
      return null;
    }

    const rect = container.getBoundingClientRect();

    return {
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    };
  };

  const startDrag = (event: ReactPointerEvent, dragMode: DragMode) => {
    if (mode !== "crop") {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    const position = getPointerPosition(event);

    if (!position) {
      return;
    }

    dragRef.current = {
      mode: dragMode,
      startX: position.x,
      startY: position.y,
      startCrop: {
        ...localCrop,
      },
    };

    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: ReactPointerEvent) => {
    const drag = dragRef.current;

    if (!drag || !drag.mode) {
      return;
    }

    const position = getPointerPosition(event);

    if (!position) {
      return;
    }

    const deltaX = position.x - drag.startX;
    const deltaY = position.y - drag.startY;

    let nextCrop = {
      ...drag.startCrop,
    };

    if (drag.mode === "move") {
      nextCrop.x = Math.min(
        Math.max(0, drag.startCrop.x + deltaX),
        100 - drag.startCrop.width,
      );

      nextCrop.y = Math.min(
        Math.max(0, drag.startCrop.y + deltaY),
        100 - drag.startCrop.height,
      );
    }

    if (drag.mode === "nw") {
      const right = drag.startCrop.x + drag.startCrop.width;
      const bottom = drag.startCrop.y + drag.startCrop.height;

      let x = Math.max(0, Math.min(position.x, right - MIN_CROP_SIZE));

      let y = Math.max(0, Math.min(position.y, bottom - MIN_CROP_SIZE));

      let width = right - x;
      let height = bottom - y;

      if (aspectRatio !== "free") {
        const ratio = getAspectRatio(aspectRatio);

        if (width / height > ratio) {
          width = height * ratio;
          x = right - width;
        } else {
          height = width / ratio;
          y = bottom - height;
        }
      }

      nextCrop = {
        x,
        y,
        width,
        height,
      };
    }

    if (drag.mode === "ne") {
      const left = drag.startCrop.x;
      const bottom = drag.startCrop.y + drag.startCrop.height;
      const x = drag.startCrop.x;

      let y = Math.max(0, Math.min(position.y, bottom - MIN_CROP_SIZE));

      let width = Math.max(
        MIN_CROP_SIZE,
        Math.min(100 - left, position.x - left),
      );

      let height = bottom - y;

      if (aspectRatio !== "free") {
        const ratio = getAspectRatio(aspectRatio);

        if (width / height > ratio) {
          width = height * ratio;
        } else {
          height = width / ratio;
          y = bottom - height;
        }

        width = Math.min(width, 100 - left);
      }

      nextCrop = {
        x,
        y,
        width,
        height,
      };
    }

    if (drag.mode === "sw") {
      const right = drag.startCrop.x + drag.startCrop.width;
      const top = drag.startCrop.y;

      let x = Math.max(0, Math.min(position.x, right - MIN_CROP_SIZE));

      const y = top;

      let width = right - x;

      let height = Math.max(
        MIN_CROP_SIZE,
        Math.min(100 - top, position.y - top),
      );

      if (aspectRatio !== "free") {
        const ratio = getAspectRatio(aspectRatio);

        if (width / height > ratio) {
          width = height * ratio;
          x = right - width;
        } else {
          height = width / ratio;
        }

        height = Math.min(height, 100 - top);
      }

      nextCrop = {
        x,
        y,
        width,
        height,
      };
    }

    if (drag.mode === "se") {
      const left = drag.startCrop.x;
      const top = drag.startCrop.y;

      let width = Math.max(
        MIN_CROP_SIZE,
        Math.min(100 - left, position.x - left),
      );

      let height = Math.max(
        MIN_CROP_SIZE,
        Math.min(100 - top, position.y - top),
      );

      if (aspectRatio !== "free") {
        const ratio = getAspectRatio(aspectRatio);

        if (width / height > ratio) {
          width = height * ratio;
        } else {
          height = width / ratio;
        }

        width = Math.min(width, 100 - left);
        height = Math.min(height, 100 - top);
      }

      nextCrop = {
        x: left,
        y: top,
        width,
        height,
      };
    }

    setLocalCrop(nextCrop);
  };

  const endDrag = () => {
    if (!dragRef.current) {
      return;
    }

    dragRef.current = null;

    update({
      crop: localCrop,
    });
  };

  const applyAspectRatio = (ratio: AspectRatio) => {
    setAspectRatio(ratio);

    if (ratio === "free") {
      return;
    }

    const aspect = getAspectRatio(ratio);

    let width = localCrop.width;
    let height = width / aspect;

    if (height > 100) {
      height = 100;
      width = height * aspect;
    }

    const nextCrop = {
      x: (100 - width) / 2,
      y: (100 - height) / 2,
      width,
      height,
    };

    setLocalCrop(nextCrop);

    update({
      crop: nextCrop,
    });
  };

  const applyCrop = () => {
    update({
      crop: localCrop,
    });

    setMode("preview");
  };

  const cancelCrop = () => {
    setLocalCrop(crop ?? DEFAULT_CROP);
    setMode("preview");
  };

  return (
    <Card className="overflow-hidden border-border/60">
      <CardContent className="space-y-3 p-3">
        <div
          ref={containerRef}
          className="relative flex aspect-video items-center justify-center overflow-hidden rounded-xl bg-muted select-none touch-none"
          onPointerMove={handlePointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          <Image
            ref={imageRef}
            src={src}
            alt="ویرایش تصویر"
            width={0}
            height={0}
            unoptimized
            draggable={false}
            className="max-h-full max-w-full object-contain transition-transform duration-200"
            style={{
              width: "auto",
              height: "auto",
              transform: `
      rotate(${rotation}deg)
      scaleX(${flipHorizontal ? -1 : 1})
      scaleY(${flipVertical ? -1 : 1})
    `,
            }}
          />

          {mode === "crop" && (
            <>
              <div className="pointer-events-none absolute inset-0 bg-black/45" />

              <div
                className="absolute border-2 border-white bg-transparent shadow-[0_0_0_9999px_rgba(0,0,0,0.45)]"
                style={{
                  left: `${localCrop.x}%`,
                  top: `${localCrop.y}%`,
                  width: `${localCrop.width}%`,
                  height: `${localCrop.height}%`,
                  cursor: "move",
                }}
                onPointerDown={(event) => startDrag(event, "move")}
              >
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute left-1/3 top-0 h-full w-px bg-white/40" />
                  <div className="absolute left-2/3 top-0 h-full w-px bg-white/40" />
                  <div className="absolute left-0 top-1/3 h-px w-full bg-white/40" />
                  <div className="absolute left-0 top-2/3 h-px w-full bg-white/40" />
                </div>

                <CropHandle
                  position="nw"
                  onPointerDown={(event) => startDrag(event, "nw")}
                />

                <CropHandle
                  position="ne"
                  onPointerDown={(event) => startDrag(event, "ne")}
                />

                <CropHandle
                  position="sw"
                  onPointerDown={(event) => startDrag(event, "sw")}
                />

                <CropHandle
                  position="se"
                  onPointerDown={(event) => startDrag(event, "se")}
                />
              </div>
            </>
          )}
        </div>

        {mode === "preview" && (
          <div className="flex flex-wrap items-center justify-center gap-2 rounded-xl border bg-muted/30 p-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={rotateLeft}
              title="چرخش به چپ"
            >
              <RotateCcw className="size-4" />
            </Button>

            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={rotateRight}
              title="چرخش به راست"
            >
              <RotateCw className="size-4" />
            </Button>

            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={toggleFlipHorizontal}
              title="Flip افقی"
            >
              <FlipHorizontal className="size-4" />
            </Button>

            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={toggleFlipVertical}
              title="Flip عمودی"
            >
              <FlipVertical className="size-4" />
            </Button>

            <Button
              type="button"
              variant="outline"
              className="h-9"
              onClick={() => setMode("crop")}
            >
              <Crop className="size-4" />
              برش تصویر
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={resetEditor}
              title="بازنشانی"
            >
              <X className="size-4" />
            </Button>
          </div>
        )}

        {mode === "crop" && (
          <div className="space-y-3 rounded-xl border bg-muted/30 p-3">
            <div>
              <p className="text-xs font-semibold">برش تصویر</p>
              <p className="mt-1 text-[10px] text-muted-foreground">
                محدوده را جابه‌جا کنید یا گوشه‌های آن را بکشید.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-6">
              {(
                [
                  ["free", "آزاد"],
                  ["1:1", "1:1"],
                  ["4:3", "4:3"],
                  ["3:4", "3:4"],
                  ["16:9", "16:9"],
                  ["9:16", "9:16"],
                ] as [AspectRatio, string][]
              ).map(([value, label]) => (
                <Button
                  key={value}
                  type="button"
                  size="sm"
                  variant={aspectRatio === value ? "default" : "outline"}
                  className={
                    aspectRatio === value
                      ? "bg-linear-to-r from-purple-500 to-violet-500 text-white hover:from-purple-600 hover:to-violet-600"
                      : ""
                  }
                  onClick={() => applyAspectRatio(value)}
                >
                  {label}
                </Button>
              ))}
            </div>

            <div className="flex gap-2">
              <Button
                type="button"
                className="flex-1 bg-linear-to-r from-purple-500 to-violet-500 text-white hover:from-purple-600 hover:to-violet-600"
                onClick={applyCrop}
              >
                <Check className="size-4" />
                اعمال برش
              </Button>

              <Button type="button" variant="outline" onClick={cancelCrop}>
                <X className="size-4" />
                لغو
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function CropHandle({
  position,
  onPointerDown,
}: {
  position: "nw" | "ne" | "sw" | "se";
  onPointerDown: (event: ReactPointerEvent<HTMLDivElement>) => void;
}) {
  const positionClass = {
    nw: "-left-1.5 -top-1.5 cursor-nwse-resize",
    ne: "-right-1.5 -top-1.5 cursor-nesw-resize",
    sw: "-bottom-1.5 -left-1.5 cursor-nesw-resize",
    se: "-bottom-1.5 -right-1.5 cursor-nwse-resize",
  }[position];

  return (
    <div
      onPointerDown={onPointerDown}
      className={`absolute z-20 size-3 rounded-sm border border-white bg-linear-to-br from-purple-500 to-violet-500 shadow-md ${positionClass}`}
    />
  );
}

function getAspectRatio(ratio: AspectRatio) {
  switch (ratio) {
    case "1:1":
      return 1;
    case "4:3":
      return 4 / 3;
    case "3:4":
      return 3 / 4;
    case "16:9":
      return 16 / 9;
    case "9:16":
      return 9 / 16;
    default:
      return 1;
  }
}
