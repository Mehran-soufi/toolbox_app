"use client";

import { useRef, useState } from "react";

import { ImagePlus, Settings2, Upload } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import ImageEditor from "./image-editor";
import ImagePreview from "./image-preview";
import ImageSettings from "./image-settings";

import { ImageFormat, ImageItem } from "@/lib/image-converter.types";

import {
  processImage,
  getEditedImageDimensions,
} from "@/lib/image-converter.utils";
import { useToolHistory } from "@/hooks/useToolHistory";

export default function ImageConverter() {
  useToolHistory({
    toolName: "تبدیل تصویر",
    toolSlug: "image-tools",
    toolIcon: "ImageIcon",
  });

  const [images, setImages] = useState<ImageItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [format, setFormat] = useState<ImageFormat>("image/webp");

  const [quality, setQuality] = useState(80);

  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");

  const [keepRatio, setKeepRatio] = useState(true);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedImage = images.find((image) => image.id === selectedId);

  // --------------------------------
  // UPDATE IMAGE
  // --------------------------------

  const updateImage = (id: string, data: Partial<ImageItem>) => {
    setImages((current) =>
      current.map((image) =>
        image.id === id
          ? {
              ...image,
              ...data,
            }
          : image,
      ),
    );
  };

  // --------------------------------
  // EDITOR CHANGE
  // --------------------------------

  const handleEditorChange = (
    data: Pick<
      ImageItem,
      "rotation" | "flipHorizontal" | "flipVertical" | "crop"
    >,
  ) => {
    if (!selectedImage) {
      return;
    }

    updateImage(selectedImage.id, data);
  };

  // --------------------------------
  // FILE SELECT
  // --------------------------------

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files?.length) {
      return;
    }

    const file = files[0];

    const preview = URL.createObjectURL(file);

    const img = new Image();

    img.onload = () => {
      const newImage: ImageItem = {
        id: crypto.randomUUID(),
        file,
        preview,
        width: img.naturalWidth,
        height: img.naturalHeight,
        rotation: 0,
        flipHorizontal: false,
        flipVertical: false,
        status: "idle",
      };

      setImages([newImage]);
      setSelectedId(newImage.id);

      setWidth("");
      setHeight("");

      setFormat("image/webp");
      setQuality(80);
      setKeepRatio(true);
    };

    img.src = preview;

    event.target.value = "";
  };

  // --------------------------------
  // CURRENT DIMENSIONS
  // --------------------------------

  const getCurrentImageDimensions = () => {
    if (!selectedImage) {
      return null;
    }

    return getEditedImageDimensions(
      selectedImage.width,
      selectedImage.height,
      selectedImage.crop,
      selectedImage.rotation,
    );
  };

  // --------------------------------
  // WIDTH
  // --------------------------------

  const handleWidthChange = (value: string) => {
    setWidth(value);

    if (!keepRatio || !selectedImage || !value) {
      return;
    }

    const newWidth = Number(value);

    if (!Number.isFinite(newWidth) || newWidth <= 0) {
      return;
    }

    const dimensions = getCurrentImageDimensions();

    if (!dimensions) {
      return;
    }

    const ratio = dimensions.height / dimensions.width;

    const newHeight = Math.round(newWidth * ratio);

    setHeight(String(newHeight));
  };

  // --------------------------------
  // HEIGHT
  // --------------------------------

  const handleHeightChange = (value: string) => {
    setHeight(value);

    if (!keepRatio || !selectedImage || !value) {
      return;
    }

    const newHeight = Number(value);

    if (!Number.isFinite(newHeight) || newHeight <= 0) {
      return;
    }

    const dimensions = getCurrentImageDimensions();

    if (!dimensions) {
      return;
    }

    const ratio = dimensions.width / dimensions.height;

    const newWidth = Math.round(newHeight * ratio);

    setWidth(String(newWidth));
  };

  // --------------------------------
  // QUICK SIZE
  // --------------------------------

  const handleQuickSize = (value: number) => {
    if (!selectedImage) {
      return;
    }

    const dimensions = getCurrentImageDimensions();

    if (!dimensions) {
      return;
    }

    const targetWidth = Math.min(value, dimensions.width);

    let targetHeight = Math.round(
      (targetWidth / dimensions.width) * dimensions.height,
    );

    if (!keepRatio) {
      targetHeight = dimensions.height;
    }

    setWidth(String(targetWidth));
    setHeight(String(targetHeight));
  };

  // --------------------------------
  // RESET SIZE
  // --------------------------------

  const resetSize = () => {
    if (!selectedImage) {
      return;
    }

    const dimensions = getCurrentImageDimensions();

    if (!dimensions) {
      return;
    }

    setWidth(String(dimensions.width));
    setHeight(String(dimensions.height));
  };

  // --------------------------------
  // CONVERT
  // --------------------------------

  const handleConvert = async () => {
    if (!selectedImage) {
      return;
    }

    updateImage(selectedImage.id, {
      status: "processing",
    });

    try {
      const result = await processImage(selectedImage.file, {
        crop: selectedImage.crop,
        rotation: selectedImage.rotation,
        flipHorizontal: selectedImage.flipHorizontal,
        flipVertical: selectedImage.flipVertical,
        outputWidth: width ? Number(width) : undefined,
        outputHeight: height ? Number(height) : undefined,
        quality: quality / 100,
        format,
      });

      const convertedUrl = URL.createObjectURL(result.blob);

      updateImage(selectedImage.id, {
        convertedUrl,
        convertedSize: result.blob.size,
        convertedWidth: result.width,
        convertedHeight: result.height,
        status: "completed",
      });
    } catch (error) {
      console.error(error);

      updateImage(selectedImage.id, {
        status: "error",
      });
    }
  };

  return (
    <div className="space-y-4">
      {/* =========================
          UPLOAD
      ========================== */}

      {!selectedImage && (
        <Card className="overflow-hidden border-border/60">
          <CardContent className="p-3">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileSelect}
            />

            <div
              role="button"
              tabIndex={0}
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  fileInputRef.current?.click();
                }
              }}
              className="group relative flex min-h-64 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-purple-200 bg-linear-to-br from-purple-50/80 via-background to-violet-50/80 px-6 py-10 transition-all duration-300 hover:border-purple-400 hover:from-purple-100/80 hover:to-violet-100/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 dark:border-purple-900/60 dark:from-purple-950/20 dark:via-background dark:to-violet-950/20 dark:hover:border-violet-700 dark:hover:from-purple-950/40 dark:hover:to-violet-950/40"
            >
              {/* Decorative background */}
              <div className="pointer-events-none absolute inset-0 opacity-40">
                <div className="absolute -right-16 -top-16 size-40 rounded-full bg-purple-400/20 blur-3xl" />
                <div className="absolute -bottom-16 -left-16 size-40 rounded-full bg-violet-400/20 blur-3xl" />
              </div>

              {/* Icon */}
              <div className="relative mb-5 flex size-16 items-center justify-center rounded-2xl bg-linear-to-br from-purple-500 to-violet-500 text-white shadow-lg shadow-purple-500/20 transition-transform duration-300 group-hover:scale-105">
                <ImagePlus className="size-8" />
              </div>

              {/* Text */}
              <div className="relative text-center">
                <h3 className="text-base font-semibold">
                  تصویر خود را اینجا قرار دهید
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  تصویر را بکشید و رها کنید یا برای انتخاب فایل کلیک کنید
                </p>

                <p className="mt-2 text-xs text-muted-foreground/70">
                  JPG، PNG، WebP و AVIF
                </p>
              </div>

              {/* Button */}
              <div className="relative mt-5">
                <Button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  className="bg-linear-to-r from-purple-500 to-violet-500 text-white shadow-md shadow-purple-500/20 transition-all hover:from-purple-600 hover:to-violet-600 hover:shadow-lg hover:shadow-purple-500/25"
                >
                  <Upload className="ml-2 size-4" />
                  انتخاب تصویر
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* =========================
          EDITOR + SETTINGS
      ========================== */}

      {selectedImage && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_340px]">
          {/* Main */}
          <div className="min-w-0 space-y-4">
            <ImageEditor
              src={selectedImage.preview}
              rotation={selectedImage.rotation}
              flipHorizontal={selectedImage.flipHorizontal}
              flipVertical={selectedImage.flipVertical}
              crop={selectedImage.crop}
              onChange={handleEditorChange}
            />

            <ImagePreview image={selectedImage} format={format} />
          </div>

          {/* Settings */}
          <Card className="h-fit sticky top-14">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Settings2 className="size-4 text-purple-500" />
                تنظیمات تبدیل
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              <ImageSettings
                format={format}
                quality={quality}
                width={width}
                height={height}
                keepRatio={keepRatio}
                onFormatChange={(value) => setFormat(value as ImageFormat)}
                onQualityChange={setQuality}
                onWidthChange={handleWidthChange}
                onHeightChange={handleHeightChange}
                onKeepRatioChange={setKeepRatio}
                onQuickSize={handleQuickSize}
                onResetSize={resetSize}
              />

              <Button
                type="button"
                className="h-10 w-full bg-linear-to-r from-purple-500 to-violet-500 text-white shadow-md shadow-purple-500/20 transition-all hover:from-purple-600 hover:to-violet-600 hover:shadow-lg hover:shadow-purple-500/25"
                onClick={handleConvert}
                disabled={selectedImage.status === "processing"}
              >
                {selectedImage.status === "processing"
                  ? "در حال تبدیل..."
                  : "تبدیل تصویر"}
              </Button>

              {selectedImage.status === "error" && (
                <p className="text-center text-xs text-destructive">
                  تبدیل تصویر با خطا مواجه شد.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
