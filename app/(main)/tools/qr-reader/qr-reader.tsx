"use client";

import { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";

import {
  Camera,
  Check,
  Clipboard,
  ExternalLink,
  ImagePlus,
  Mail,
  Phone,
  QrCode,
  RotateCcw,
  ScanLine,
  Square,
  Upload,
  Wifi,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToolHistory } from "@/hooks/useToolHistory";

type ResultType =
  | "text"
  | "url"
  | "phone"
  | "email"
  | "wifi"
  | "unknown";

export default function QRReader() {

    useToolHistory({
      toolName: "خواندن QR Code",
      toolSlug: "qr-reader",
      toolIcon: "ScanLine",
    });

  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scannerRef = useRef<QrScanner | null>(null);

  const [isScanning, setIsScanning] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const [copied, setCopied] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const getResultType = (value: string): ResultType => {
    const content = value.trim();

    if (/^https?:\/\//i.test(content)) {
      return "url";
    }

    if (/^tel:/i.test(content)) {
      return "phone";
    }

    if (/^mailto:/i.test(content)) {
      return "email";
    }

    if (/^WIFI:/i.test(content)) {
      return "wifi";
    }

    if (
      /^(?:\+?[\d\s()-]{7,})$/.test(content)
    ) {
      return "phone";
    }

    return "text";
  };

  const resultType = result
    ? getResultType(result)
    : "unknown";

  const resultTypeInfo = {
    text: {
      title: "متن",
      icon: QrCode,
    },
    url: {
      title: "لینک",
      icon: ExternalLink,
    },
    phone: {
      title: "شماره تلفن",
      icon: Phone,
    },
    email: {
      title: "ایمیل",
      icon: Mail,
    },
    wifi: {
      title: "شبکه Wi-Fi",
      icon: Wifi,
    },
    unknown: {
      title: "QR Code",
      icon: QrCode,
    },
  }[resultType];

  const ResultIcon = resultTypeInfo.icon;

  const stopScanner = () => {
    scannerRef.current?.stop();
    setIsScanning(false);
  };

  const handleScanResult = (data: string) => {
    if (!data) return;

    setResult(data);
    setError("");
    setCopied(false);

    stopScanner();
  };

  const startScanner = async () => {
    if (!videoRef.current || isScanning) return;

    setError("");
    setResult("");
    setCopied(false);

    try {
      if (!scannerRef.current) {
        scannerRef.current = new QrScanner(
          videoRef.current,
          (scanResult) => {
            handleScanResult(scanResult.data);
          },
          {
            preferredCamera: "environment",
            highlightScanRegion: true,
            highlightCodeOutline: true,
            returnDetailedScanResult: true,
          }
        );
      }

      await scannerRef.current.start();

      setIsScanning(true);
    } catch (error) {
      console.error("QR scanner error:", error);

      setError(
        "دسترسی به دوربین امکان‌پذیر نیست. لطفاً مجوز استفاده از دوربین را بررسی کنید."
      );

      setIsScanning(false);
    }
  };

  const scanFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("لطفاً یک فایل تصویری انتخاب کنید.");
      return;
    }

    setIsProcessing(true);
    setError("");
    setResult("");
    setCopied(false);

    stopScanner();

    try {
      const scanResult = await QrScanner.scanImage(file, {
        returnDetailedScanResult: true,
      });

      handleScanResult(scanResult.data);
    } catch (error) {
      console.error("QR image scan error:", error);

      setError(
        "QR Code در تصویر پیدا نشد. لطفاً تصویر واضح‌تری انتخاب کنید."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    await scanFile(file);

    event.target.value = "";
  };

  const handleDrop = async (
    event: React.DragEvent<HTMLDivElement>
  ) => {
    event.preventDefault();

    setIsDragging(false);

    const file = event.dataTransfer.files?.[0];

    if (!file) return;

    await scanFile(file);
  };

  const handleCopy = async () => {
    if (!result) return;

    try {
      await navigator.clipboard.writeText(result);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Copy error:", error);
    }
  };

  const clearResult = () => {
    stopScanner();

    setResult("");
    setError("");
    setCopied(false);
  };

  const openResult = () => {
    if (resultType !== "url") return;

    try {
      const url = new URL(result);

      window.open(
        url.toString(),
        "_blank",
        "noopener,noreferrer"
      );
    } catch {
      setError("لینک موجود در QR Code معتبر نیست.");
    }
  };

  const callNumber = () => {
    if (!result) return;

    const phone = result.replace(/^tel:/i, "");

    window.location.href = `tel:${phone}`;
  };

  const sendEmail = () => {
    if (!result) return;

    const mailto = result.startsWith("mailto:")
      ? result
      : `mailto:${result}`;

    window.location.href = mailto;
  };

  useEffect(() => {
    return () => {
      scannerRef.current?.stop();
      scannerRef.current?.destroy();
    };
  }, []);

  return (
    <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Scanner */}
      <div className="rounded-2xl border border-zinc-200/70 bg-white/60 p-5 shadow-sm backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-900/50">
        <div className="mb-5">
          <h2 className="text-base font-bold md:text-lg">
            خواندن QR Code
          </h2>

          <p className="mt-1 text-xs leading-6 text-zinc-500 dark:text-zinc-400">
            QR Code را با دوربین اسکن کنید یا تصویر آن را
            بارگذاری کنید.
          </p>
        </div>

        {/* Camera */}
        <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-black dark:border-zinc-800">
          <video
            ref={videoRef}
            className={`aspect-square w-full object-cover ${
              isScanning ? "block" : "hidden"
            }`}
            muted
            playsInline
          />

          {!isScanning && (
            <div className="flex aspect-square flex-col items-center justify-center px-6 text-center">
              <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-violet-500/10 text-violet-500">
                <ScanLine className="size-8" />
              </div>

              <p className="text-sm font-medium">
                آماده اسکن QR Code
              </p>

              <p className="mt-1 max-w-xs text-xs leading-5 text-zinc-500 dark:text-zinc-400">
                دوربین را روبه‌روی QR Code قرار دهید.
              </p>
            </div>
          )}
        </div>

        {/* Camera actions */}
        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          {!isScanning ? (
            <Button
              type="button"
              onClick={startScanner}
              disabled={isProcessing}
              className="flex-1"
            >
              <Camera className="size-4" />
              شروع اسکن
            </Button>
          ) : (
            <Button
              type="button"
              variant="destructive"
              onClick={stopScanner}
              className="flex-1"
            >
              <Square className="size-4" />
              توقف اسکن
            </Button>
          )}

          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={isProcessing}
            className="flex-1"
          >
            <ImagePlus className="size-4" />
            انتخاب تصویر
          </Button>

          <Input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* Drag & Drop */}
        <div
          onDragOver={(event) => {
            event.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`mt-4 flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed px-4 py-5 text-center transition ${
            isDragging
              ? "border-violet-500 bg-violet-500/10"
              : "border-zinc-300 bg-zinc-50/50 dark:border-zinc-700 dark:bg-zinc-950/30"
          }`}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="mb-2 size-5 text-zinc-400" />

          <p className="text-xs font-medium">
            تصویر QR را اینجا بکشید
          </p>

          <p className="mt-1 text-[11px] text-zinc-500 dark:text-zinc-400">
            یا برای انتخاب تصویر کلیک کنید
          </p>
        </div>

        {isProcessing && (
          <div className="mt-4 rounded-xl bg-violet-500/5 px-4 py-3 text-center text-xs text-violet-600 dark:text-violet-400">
            در حال بررسی تصویر و پیدا کردن QR Code...
          </div>
        )}
      </div>

      {/* Result */}
      <div className="flex min-h-[420px] flex-col rounded-2xl border border-zinc-200/70 bg-white/60 p-5 shadow-sm backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-900/50">
        <div className="mb-5">
          <h2 className="text-base font-bold md:text-lg">
            نتیجه QR Code
          </h2>

          <p className="mt-1 text-xs leading-6 text-zinc-500 dark:text-zinc-400">
            اطلاعات خوانده‌شده از QR Code در این بخش نمایش داده
            می‌شود.
          </p>
        </div>

        <div className="flex flex-1 flex-col justify-center">
          {!result && !error && (
            <div className="flex flex-col items-center justify-center text-center">
              <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-violet-500/10 text-violet-500">
                <QrCode className="size-8" />
              </div>

              <p className="text-sm font-medium">
                هنوز QR Code خوانده نشده
              </p>

              <p className="mt-1 max-w-xs text-xs leading-5 text-zinc-500 dark:text-zinc-400">
                پس از اسکن موفق، محتوای QR Code در اینجا نمایش
                داده می‌شود.
              </p>
            </div>
          )}

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-600 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-400">
              {error}
            </div>
          )}

          {result && (
            <div className="space-y-4">
              {/* Result type */}
              <div className="flex items-center gap-2 rounded-xl bg-violet-500/5 px-3 py-2.5 text-sm text-violet-600 dark:text-violet-400">
                <ResultIcon className="size-4" />

                <span>
                  نوع محتوا: {resultTypeInfo.title}
                </span>
              </div>

              {/* Content */}
              <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950/50">
                <Label className="mb-2 block text-xs text-zinc-500">
                  محتوای QR Code
                </Label>

                <div
                  dir="auto"
                  className="max-h-48 overflow-auto whitespace-pre-wrap break-words text-sm leading-7"
                >
                  {result}
                </div>
              </div>

              {/* Smart actions */}
              {resultType === "url" && (
                <Button
                  type="button"
                  onClick={openResult}
                  className="w-full"
                >
                  <ExternalLink className="size-4" />
                  باز کردن لینک
                </Button>
              )}

              {resultType === "phone" && (
                <Button
                  type="button"
                  onClick={callNumber}
                  className="w-full"
                >
                  <Phone className="size-4" />
                  تماس با شماره
                </Button>
              )}

              {resultType === "email" && (
                <Button
                  type="button"
                  onClick={sendEmail}
                  className="w-full"
                >
                  <Mail className="size-4" />
                  ارسال ایمیل
                </Button>
              )}

              {/* General actions */}
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCopy}
                  className="flex-1"
                >
                  {copied ? (
                    <>
                      <Check className="size-4" />
                      کپی شد
                    </>
                  ) : (
                    <>
                      <Clipboard className="size-4" />
                      کپی نتیجه
                    </>
                  )}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={clearResult}
                  className="flex-1"
                >
                  <RotateCcw className="size-4" />
                  خواندن مجدد
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}