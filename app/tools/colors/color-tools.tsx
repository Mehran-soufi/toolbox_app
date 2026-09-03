"use client";

import {
  ChangeEvent,
  DragEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Camera,
  Check,
  Copy,
  ImagePlus,
  Palette,
  Play,
  Square,
  Upload,
  X,
} from "lucide-react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  getPixelColor,
  hexToRgb,
  rgbToCss,
  rgbToHex,
  rgbToHsl,
  rgbToHslCss,
  type RGB,
} from "@/lib/color-tools";
import { useToolHistory } from "@/hooks/useToolHistory";

type ColorHistoryItem = {
  id: string;
  hex: string;
  rgb: RGB;
};

export default function ColorTools() {

        useToolHistory({
            toolName: "تشخیص رنگ",
            toolSlug: "color-tools",
            toolIcon: "Palette",
          });

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageCanvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationRef = useRef<number | null>(null);

  const [hex, setHex] = useState("#8B5CF6");

  const [rgb, setRgb] = useState<RGB>({
    r: 139,
    g: 92,
    b: 246,
  });

  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState("");

  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [isDragging, setIsDragging] = useState(false);

  const [copied, setCopied] = useState("");

  const [isLocked, setIsLocked] = useState(false);

  const [history, setHistory] = useState<ColorHistoryItem[]>([]);

  // حالت‌های نشانگر روی عکس
  const [mousePosition, setMousePosition] = useState<{
    x: number;
    y: number;
    isVisible: boolean;
  }>({
    x: 0,
    y: 0,
    isVisible: false,
  });

  // رنگ زیر نشانگر (پیش‌نمایش)
  const [hoverColor, setHoverColor] = useState<RGB | null>(null);

  const hsl = rgbToHsl(rgb);

  /**
   * تغییر رنگ اصلی
   */
  const updateColor = (newRgb: RGB) => {
    if (isLocked) return;

    setRgb(newRgb);
    setHex(rgbToHex(newRgb));
  };

  /**
   * تغییر دستی HEX
   */
  const handleColorInput = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toUpperCase();

    setHex(value);

    const parsed = hexToRgb(value);

    if (parsed) {
      setRgb(parsed);
    }
  };

  /**
   * انتخاب رنگ از Color Picker مرورگر
   */
  const handleNativeColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toUpperCase();

    const parsed = hexToRgb(value);

    if (parsed) {
      updateColor(parsed);
    }
  };

  /**
   * کپی مقدار
   */
  const copyValue = async (value: string, type: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value);

      setCopied(type);

      toast.success(`${label} کپی شد`);

      setTimeout(() => {
        setCopied("");
      }, 1800);
    } catch (error) {
      console.error("Copy error:", error);

      toast.error("کپی کردن مقدار انجام نشد");
    }
  };

  /**
   * افزودن رنگ به تاریخچه
   */
  const addToHistory = (newRgb: RGB) => {
    const newHex = rgbToHex(newRgb);

    setHistory((previous) => {
      const filtered = previous.filter((item) => item.hex !== newHex);

      return [
        {
          id: `${Date.now()}-${Math.random()}`,
          hex: newHex,
          rgb: newRgb,
        },
        ...filtered,
      ].slice(0, 12);
    });
  };

  /**
   * ثابت کردن رنگ
   */
  const toggleLock = () => {
    setIsLocked((previous) => {
      const next = !previous;

      if (!previous) {
        addToHistory(rgb);
        toast.success("رنگ فعلی ثابت شد");
      } else {
        toast.success("رنگ از حالت ثابت خارج شد");
      }

      return next;
    });
  };

  /**
   * شروع دوربین
   */
  const startCamera = async () => {
    setCameraError("");

    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error("Camera API is not supported");
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: {
            ideal: "environment",
          },
          width: {
            ideal: 1280,
          },
          height: {
            ideal: 720,
          },
        },
        audio: false,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;

        await videoRef.current.play();

        setIsCameraActive(true);

        animationRef.current = requestAnimationFrame(scanCameraColor);
      }
    } catch (error) {
      console.error("Camera error:", error);

      setCameraError(
        "دسترسی به دوربین امکان‌پذیر نیست. لطفاً دسترسی دوربین را بررسی کنید."
      );

      setIsCameraActive(false);
    }
  };

  /**
   * توقف دوربین
   */
  const stopCamera = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }

    streamRef.current?.getTracks().forEach((track) => {
      track.stop();
    });

    streamRef.current = null;

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setIsCameraActive(false);
  };

  /**
   * تشخیص رنگ از مرکز دوربین
   */
  const scanCameraColor = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) {
      return;
    }

    if (video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
      animationRef.current = requestAnimationFrame(scanCameraColor);

      return;
    }

    const width = video.videoWidth;
    const height = video.videoHeight;

    if (!width || !height) {
      animationRef.current = requestAnimationFrame(scanCameraColor);

      return;
    }

    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext("2d", {
      willReadFrequently: true,
    });

    if (!context) {
      return;
    }

    context.drawImage(video, 0, 0, width, height);

    const centerX = Math.floor(width / 2);
    const centerY = Math.floor(height / 2);

    const color = getPixelColor(context, centerX, centerY);

    updateColor(color);

    animationRef.current = requestAnimationFrame(scanCameraColor);
  };

  /**
   * انتخاب فایل
   */
  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    processImage(file);
  };

  /**
   * پردازش فایل تصویر
   */
  const processImage = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("لطفاً یک فایل تصویری انتخاب کنید");
      return;
    }

    if (isCameraActive) {
      stopCamera();
    }

    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
    }

    const url = URL.createObjectURL(file);

    setImageFile(file);
    setImageUrl(url);

    toast.success("تصویر با موفقیت انتخاب شد");
  };

  /**
   * Drag Enter
   */
  const handleDragEnter = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setIsDragging(true);
  };

  /**
   * Drag Leave
   */
  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setIsDragging(false);
  };

  /**
   * Drag Over
   */
  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    event.dataTransfer.dropEffect = "copy";

    setIsDragging(true);
  };

  /**
   * Drop
   */
  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    setIsDragging(false);

    const file = event.dataTransfer.files?.[0];

    if (!file) return;

    processImage(file);
  };

  /**
   * حذف تصویر
   */
  const clearImage = () => {
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
    }

    setImageUrl("");
    setImageFile(null);
    setHoverColor(null);
    setMousePosition({ x: 0, y: 0, isVisible: false });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  /**
   * حرکت موس روی تصویر
   */
  const handleImageMouseMove = (event: React.MouseEvent<HTMLImageElement>) => {
    if (!imageCanvasRef.current || !imageUrl) {
      return;
    }

    const image = event.currentTarget;
    const rect = image.getBoundingClientRect();

    // محاسبه موقعیت موس نسبت به تصویر
    const x = ((event.clientX - rect.left) / rect.width) * image.naturalWidth;
    const y = ((event.clientY - rect.top) / rect.height) * image.naturalHeight;

    const clampedX = Math.max(0, Math.min(image.naturalWidth - 1, Math.floor(x)));
    const clampedY = Math.max(0, Math.min(image.naturalHeight - 1, Math.floor(y)));

    setMousePosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      isVisible: true,
    });

    // تشخیص رنگ زیر موس
    const canvas = imageCanvasRef.current;
    const context = canvas.getContext("2d", {
      willReadFrequently: true,
    });

    if (!context) return;

    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;

    context.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight);

    const color = getPixelColor(context, clampedX, clampedY);
    setHoverColor(color);
  };

  /**
   * خروج موس از تصویر
   */
  const handleImageMouseLeave = () => {
    setMousePosition({ x: 0, y: 0, isVisible: false });
    setHoverColor(null);
  };

  /**
   * کلیک روی تصویر برای انتخاب رنگ
   */
  const handleImageClick = (event: React.MouseEvent<HTMLImageElement>) => {
    if (!imageCanvasRef.current || !imageUrl) {
      return;
    }

    if (isLocked) {
      toast.info("ابتدا رنگ را از حالت ثابت خارج کنید");
      return;
    }

    const image = event.currentTarget;
    const canvas = imageCanvasRef.current;

    const context = canvas.getContext("2d", {
      willReadFrequently: true,
    });

    if (!context) return;

    const naturalWidth = image.naturalWidth;
    const naturalHeight = image.naturalHeight;

    if (!naturalWidth || !naturalHeight) {
      return;
    }

    canvas.width = naturalWidth;
    canvas.height = naturalHeight;

    context.drawImage(image, 0, 0, naturalWidth, naturalHeight);

    const rect = image.getBoundingClientRect();

    const x = ((event.clientX - rect.left) / rect.width) * naturalWidth;
    const y = ((event.clientY - rect.top) / rect.height) * naturalHeight;

    const color = getPixelColor(
      context,
      Math.max(0, Math.min(naturalWidth - 1, Math.floor(x))),
      Math.max(0, Math.min(naturalHeight - 1, Math.floor(y)))
    );

    updateColor(color);

    toast.success(`رنگ ${rgbToHex(color)} انتخاب شد`);
  };

  /**
   * انتخاب رنگ از تاریخچه
   */
  const selectHistoryColor = (item: ColorHistoryItem) => {
    setRgb(item.rgb);
    setHex(item.hex);

    setIsLocked(false);

    toast.success("رنگ از تاریخچه انتخاب شد");
  };

  /**
   * حذف یک رنگ از تاریخچه
   */
  const removeHistoryColor = (id: string) => {
    setHistory((previous) => previous.filter((item) => item.id !== id));
  };

  /**
   * پاک کردن تاریخچه
   */
  const clearHistory = () => {
    setHistory([]);

    toast.success("تاریخچه رنگ‌ها پاک شد");
  };

  /**
   * Cleanup
   */
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      streamRef.current?.getTracks().forEach((track) => track.stop());

      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  return (
    <div className="w-full space-y-6">
      {/* Main Tools */}
      <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Color Information */}
        <div className="rounded-2xl border border-zinc-200/70 bg-white/60 p-5 shadow-sm backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-900/50">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500">
              <Palette className="size-5" />
            </div>

            <div>
              <h2 className="text-base font-bold md:text-lg">
                اطلاعات رنگ
              </h2>

              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                مشخصات رنگ انتخاب‌شده را مشاهده و کپی کنید.
              </p>
            </div>
          </div>

          {/* Preview */}
          <div
            className="mb-5 h-40 w-full rounded-2xl border border-zinc-200 shadow-inner dark:border-zinc-800"
            style={{
              backgroundColor: hex,
            }}
          />

          {/* HEX */}
          <div className="space-y-2">
            <Label htmlFor="hex-color">HEX</Label>

            <div className="flex gap-2">
              <Input
                id="hex-color"
                dir="ltr"
                value={hex}
                onChange={handleColorInput}
                placeholder="#8B5CF6"
                className="h-11"
              />

              <Button
                type="button"
                variant="outline"
                size="icon"
                className="size-11 shrink-0"
                onClick={() => copyValue(hex, "hex", "HEX")}
              >
                {copied === "hex" ? (
                  <Check className="size-4" />
                ) : (
                  <Copy className="size-4" />
                )}
              </Button>
            </div>
          </div>

          {/* RGB / HSL */}
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <ColorValue
              label="RGB"
              value={rgbToCss(rgb)}
              copied={copied === "rgb"}
              onCopy={() => copyValue(rgbToCss(rgb), "rgb", "RGB")}
            />

            <ColorValue
              label="HSL"
              value={rgbToHslCss(rgb)}
              copied={copied === "hsl"}
              onCopy={() => copyValue(rgbToHslCss(rgb), "hsl", "HSL")}
            />
          </div>

          {/* RGB Values */}
          <div className="mt-4 rounded-xl bg-zinc-50 p-4 dark:bg-zinc-950/50">
            <div className="grid grid-cols-3 gap-3 text-center">
              <ColorNumber label="R" value={rgb.r} />

              <ColorNumber label="G" value={rgb.g} />

              <ColorNumber label="B" value={rgb.b} />
            </div>
          </div>

          {/* Lock */}
          <Button
            type="button"
            variant={isLocked ? "default" : "outline"}
            className="mt-4 w-full"
            onClick={toggleLock}
          >
            {isLocked ? (
              <>
                <Check className="size-4" />
                رنگ ثابت شده است
              </>
            ) : (
              <>
                <Palette className="size-4" />
                ثابت کردن رنگ
              </>
            )}
          </Button>
        </div>

        {/* Camera + Image */}
        <div className="rounded-2xl border border-zinc-200/70 bg-white/60 p-5 shadow-sm backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-900/50">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500">
              <Camera className="size-5" />
            </div>

            <div>
              <h2 className="text-base font-bold md:text-lg">
                تشخیص رنگ
              </h2>

              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                با دوربین یا تصویر، رنگ موردنظر را انتخاب کنید.
              </p>
            </div>
          </div>

          {/* نمایش دوربین یا تصویر */}
          <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-black dark:border-zinc-800">
            {/* دوربین */}
            <video
              ref={videoRef}
              muted
              playsInline
              className={`aspect-video w-full object-cover ${
                isCameraActive && !imageUrl ? "block" : "hidden"
              }`}
            />

            {/* تصویر آپلود شده */}
            {imageUrl && (
              <div className="relative aspect-video w-full">
                <img
                  src={imageUrl}
                  alt="تصویر انتخاب‌شده برای تشخیص رنگ"
                  onClick={handleImageClick}
                  onMouseMove={handleImageMouseMove}
                  onMouseLeave={handleImageMouseLeave}
                  className="h-full w-full cursor-crosshair object-contain bg-zinc-950"
                />

                {/* نشانگر موس */}
                {mousePosition.isVisible && hoverColor && (
                  <>
                    {/* مربع نشانگر */}
                    <div
                      className="pointer-events-none absolute z-10"
                      style={{
                        left: mousePosition.x - 25,
                        top: mousePosition.y - 25,
                        width: 50,
                        height: 50,
                        border: "2px solid white",
                        borderRadius: "4px",
                        boxShadow: "0 0 0 1px rgba(0,0,0,0.3), 0 0 20px rgba(0,0,0,0.5)",
                        background: "transparent",
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      {/* خطوط کراس‌هیر */}
                      <div className="absolute left-1/2 top-0 h-full w-px bg-white/60" />
                      <div className="absolute left-0 top-1/2 h-px w-full bg-white/60" />

                      {/* نقطه مرکزی */}
                      <div
                        className="absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white"
                        style={{
                          backgroundColor: rgbToHex(hoverColor),
                          boxShadow: "0 0 10px rgba(0,0,0,0.5)",
                        }}
                      />

                      {/* برچسب رنگ */}
                      <div
                        className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md px-2 py-0.5 text-[10px] font-bold text-white"
                        style={{
                          backgroundColor: "rgba(0,0,0,0.75)",
                          backdropFilter: "blur(4px)",
                        }}
                      >
                        {rgbToHex(hoverColor)}
                      </div>
                    </div>

                    {/* دایره بزرگتر برای افکت */}
                    <div
                      className="pointer-events-none absolute z-0 rounded-full border border-white/20"
                      style={{
                        left: mousePosition.x,
                        top: mousePosition.y,
                        width: 100,
                        height: 100,
                        transform: "translate(-50%, -50%)",
                        boxShadow: "0 0 40px rgba(0,0,0,0.3)",
                        background: `radial-gradient(circle, ${rgbToHex(hoverColor)}33 0%, transparent 70%)`,
                      }}
                    />
                  </>
                )}
              </div>
            )}

            {/* حالت پیش‌فرض (هیچکدام فعال نیست) */}
            {!isCameraActive && !imageUrl && (
              <div
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`flex aspect-video cursor-pointer flex-col items-center justify-center px-6 text-center transition-all ${
                  isDragging ? "bg-violet-500/10" : "hover:bg-white/5"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileSelect}
                />

                <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-violet-500/10 text-violet-500">
                  {isDragging ? (
                    <Upload className="size-8" />
                  ) : (
                    <ImagePlus className="size-8" />
                  )}
                </div>

                <p className="text-sm font-medium text-white">
                  {isDragging ? "تصویر را اینجا رها کنید" : "برای شروع کلیک کنید"}
                </p>

                <p className="mt-1 max-w-xs text-xs leading-5 text-zinc-400">
                  {isDragging
                    ? "فایل تصویر را رها کنید"
                    : "دوربین را فعال کنید یا یک تصویر آپلود کنید"}
                </p>
              </div>
            )}

            {/* نشانگر مرکز - فقط برای دوربین */}
            {isCameraActive && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="relative size-14 rounded-full border-2 border-white shadow-[0_0_0_1px_rgba(0,0,0,.4)]">
                  <div className="absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow" />
                </div>
              </div>
            )}

            {/* دکمه حذف تصویر روی تصویر */}
            {imageUrl && (
              <button
                type="button"
                onClick={clearImage}
                className="absolute right-2 top-2 z-20 flex size-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition-colors hover:bg-black/80"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          <canvas ref={canvasRef} className="hidden" />
          <canvas ref={imageCanvasRef} className="hidden" />

          {/* دکمه‌های کنترل */}
          <div className="mt-4 flex flex-wrap gap-2">
            {!isCameraActive ? (
              <Button
                type="button"
                onClick={startCamera}
                className="flex-1"
                disabled={!!imageUrl}
              >
                <Play className="size-4" />
                شروع تشخیص با دوربین
              </Button>
            ) : (
              <Button
                type="button"
                variant="destructive"
                onClick={stopCamera}
                className="flex-1"
              >
                <Square className="size-4" />
                توقف دوربین
              </Button>
            )}

            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="flex-1"
              disabled={isCameraActive}
            >
              <Upload className="size-4" />
              انتخاب تصویر
            </Button>
          </div>

          {/* توضیحات */}
          {imageUrl && (
            <div className="mt-3 rounded-xl bg-violet-50 px-4 py-2 text-center text-xs text-violet-700 dark:bg-violet-950/30 dark:text-violet-300">
              💡 روی هر نقطه از تصویر کلیک کنید تا رنگ آن نقطه انتخاب شود.
              <br />
              <span className="text-[10px] opacity-75">
                برای دقت بیشتر، موس را روی تصویر حرکت دهید.
              </span>
            </div>
          )}

          {cameraError && (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-600 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-400">
              {cameraError}
            </div>
          )}
        </div>
      </div>

      {/* History */}
      {history.length > 0 && (
        <div className="rounded-2xl border border-zinc-200/70 bg-white/60 p-5 shadow-sm backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-900/50">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold md:text-lg">
                تاریخچه رنگ‌ها
              </h2>

              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                رنگ‌های انتخاب‌شده اخیر
              </p>
            </div>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={clearHistory}
            >
              پاک کردن تاریخچه
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {history.map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"
              >
                <button
                  type="button"
                  onClick={() => selectHistoryColor(item)}
                  className="w-full text-right"
                >
                  <div
                    className="h-20 w-full"
                    style={{
                      backgroundColor: item.hex,
                    }}
                  />

                  <div className="p-3">
                    <p dir="ltr" className="text-center text-xs font-bold">
                      {item.hex}
                    </p>

                    <p
                      dir="ltr"
                      className="mt-1 text-center text-[10px] text-zinc-500"
                    >
                      {item.rgb.r}, {item.rgb.g}, {item.rgb.b}
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => removeHistoryColor(item.id)}
                  className="absolute right-2 top-2 flex size-7 items-center justify-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100"
                  aria-label="حذف رنگ"
                >
                  <X className="size-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ColorValue({
  label,
  value,
  copied,
  onCopy,
}: {
  label: string;
  value: string;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-950/50">
      <div className="mb-2 flex items-center justify-between">
        <Label className="text-xs text-zinc-500">{label}</Label>

        <button
          type="button"
          onClick={onCopy}
          className="text-zinc-400 transition-colors hover:text-violet-500"
          aria-label={`کپی ${label}`}
        >
          {copied ? (
            <Check className="size-3.5" />
          ) : (
            <Copy className="size-3.5" />
          )}
        </button>
      </div>

      <p dir="ltr" className="truncate text-sm font-medium">
        {value}
      </p>
    </div>
  );
}

function ColorNumber({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <p className="text-xs text-zinc-500 dark:text-zinc-400">{label}</p>

      <p dir="ltr" className="mt-1 text-sm font-bold">
        {value}
      </p>
    </div>
  );
}