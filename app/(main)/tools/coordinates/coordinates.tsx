"use client";

import { useMemo, useState } from "react";
import {
  ArrowLeftRight,
  Check,
  Clipboard,
  Copy,
  MapPin,
  RotateCcw,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ConversionType = "decimal-to-dms" | "dms-to-decimal";
type CoordinateType = "latitude" | "longitude";

function normalizeNumber(value: string) {
  return value
    .trim()
    .replace(/[۰-۹]/g, (digit) =>
      String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit))
    )
    .replace(/[٠-٩]/g, (digit) =>
      String("٠١٢٣٤٥٦٧٨٩".indexOf(digit))
    )
    .replace(/,/g, "")
    .replace(/٬/g, "")
    .replace(/٫/g, ".");
}

function parseNumber(value: string) {
  const normalized = normalizeNumber(value);

  if (!normalized) {
    return null;
  }

  const number = Number(normalized);

  return Number.isFinite(number) ? number : null;
}

function formatDecimal(value: number) {
  return new Intl.NumberFormat("en-US", {
    useGrouping: false,
    maximumFractionDigits: 8,
  }).format(value);
}

function formatDms(value: number) {
  const absolute = Math.abs(value);

  const degrees = Math.floor(absolute);
  const minutesFloat = (absolute - degrees) * 60;
  const minutes = Math.floor(minutesFloat);
  const seconds = (minutesFloat - minutes) * 60;

  return {
    degrees,
    minutes,
    seconds: Number(seconds.toFixed(4)),
  };
}

function decimalToDmsString(value: number, type: CoordinateType) {
  const dms = formatDms(value);

  let direction = "";

  if (type === "latitude") {
    direction = value >= 0 ? "N" : "S";
  } else {
    direction = value >= 0 ? "E" : "W";
  }

  return `${dms.degrees}° ${dms.minutes}' ${dms.seconds}" ${direction}`;
}

function dmsToDecimal(
  degrees: number,
  minutes: number,
  seconds: number,
  direction: string
) {
  const decimal =
    Math.abs(degrees) + minutes / 60 + seconds / 3600;

  return ["S", "W"].includes(direction)
    ? -decimal
    : decimal;
}

function isValidDms(
  degrees: number,
  minutes: number,
  seconds: number,
  type: CoordinateType
) {
  const maxDegrees = type === "latitude" ? 90 : 180;

  if (degrees < 0 || degrees > maxDegrees) {
    return false;
  }

  if (minutes < 0 || minutes >= 60) {
    return false;
  }

  if (seconds < 0 || seconds >= 60) {
    return false;
  }

  if (
    degrees === maxDegrees &&
    (minutes > 0 || seconds > 0)
  ) {
    return false;
  }

  return true;
}

export default function Coordinates() {
  const [conversionType, setConversionType] =
    useState<ConversionType>("decimal-to-dms");

  const [coordinateType, setCoordinateType] =
    useState<CoordinateType>("latitude");

  const [decimal, setDecimal] = useState("35.6892");

  const [degrees, setDegrees] = useState("35");
  const [minutes, setMinutes] = useState("41");
  const [seconds, setSeconds] = useState("21.12");

  const [direction, setDirection] = useState("N");

  const [copied, setCopied] = useState(false);

  const conversion = useMemo(() => {
    if (conversionType === "decimal-to-dms") {
      const value = parseNumber(decimal);

      if (value === null) {
        return {
          result: "",
          error: "لطفاً یک مختصات معتبر وارد کنید.",
        };
      }

      const max =
        coordinateType === "latitude" ? 90 : 180;

      if (value < -max || value > max) {
        return {
          result: "",
          error: `مقدار باید بین ${-max} و ${max} باشد.`,
        };
      }

      return {
        result: decimalToDmsString(
          value,
          coordinateType
        ),
        error: "",
      };
    }

    const d = parseNumber(degrees);
    const m = parseNumber(minutes);
    const s = parseNumber(seconds);

    if (d === null || m === null || s === null) {
      return {
        result: "",
        error: "لطفاً درجه، دقیقه و ثانیه را وارد کنید.",
      };
    }

    if (!isValidDms(d, m, s, coordinateType)) {
      return {
        result: "",
        error: "مقادیر DMS واردشده معتبر نیستند.",
      };
    }

    const result = dmsToDecimal(
      d,
      m,
      s,
      direction
    );

    return {
      result: formatDecimal(result),
      error: "",
    };
  }, [
    conversionType,
    coordinateType,
    decimal,
    degrees,
    minutes,
    seconds,
    direction,
  ]);

  const copyResult = async () => {
    if (!conversion.result) return;

    try {
      await navigator.clipboard.writeText(
        conversion.result
      );

      setCopied(true);

      toast.success("مختصات با موفقیت کپی شد.");

      setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      toast.error("کپی کردن مختصات انجام نشد.");
    }
  };

  const clear = () => {
    setDecimal("");
    setDegrees("");
    setMinutes("");
    setSeconds("");

    setCopied(false);

    toast.success("مقادیر پاک شدند.");
  };

  const reset = () => {
    setConversionType("decimal-to-dms");
    setCoordinateType("latitude");

    setDecimal("35.6892");

    setDegrees("35");
    setMinutes("41");
    setSeconds("21.12");

    setDirection("N");

    setCopied(false);

    toast.success("ابزار به حالت اولیه بازگشت.");
  };

  const swapConversion = () => {
    if (conversionType === "decimal-to-dms") {
      if (conversion.result) {
        const match = conversion.result.match(
          /^(\d+)°\s+(\d+)'\s+([\d.]+)"\s+([NSWE])$/
        );

        if (match) {
          setDegrees(match[1]);
          setMinutes(match[2]);
          setSeconds(match[3]);
          setDirection(match[4]);
        }
      }

      setConversionType("dms-to-decimal");
    } else {
      if (conversion.result) {
        setDecimal(conversion.result);
      }

      setConversionType("decimal-to-dms");
    }

    setCopied(false);
  };

  const directionOptions =
    coordinateType === "latitude"
      ? [
          { value: "N", label: "شمالی (N)" },
          { value: "S", label: "جنوبی (S)" },
        ]
      : [
          { value: "E", label: "شرقی (E)" },
          { value: "W", label: "غربی (W)" },
        ];

  return (
    <div className="w-full rounded-2xl border bg-card/60 p-4 shadow-sm backdrop-blur-sm sm:p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500">
            <MapPin className="size-5" />
          </div>

          <div>
            <h2 className="font-semibold">
              مختصات جغرافیایی
            </h2>

            <p className="text-xs text-muted-foreground">
              تبدیل Decimal و DMS
            </p>
          </div>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={reset}
          title="بازنشانی"
          className="self-end sm:self-auto"
        >
          <RotateCcw className="size-4" />
        </Button>
      </div>

      {/* Conversion type */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <button
          type="button"
          onClick={() =>
            setConversionType("decimal-to-dms")
          }
          className={`rounded-xl border p-3 text-right transition-all ${
            conversionType === "decimal-to-dms"
              ? "border-violet-500/50 bg-violet-500/10 text-violet-600 dark:text-violet-400"
              : "bg-background/50 hover:bg-muted/50"
          }`}
        >
          <div className="text-sm font-medium">
            اعشاری به DMS
          </div>

          <div className="mt-1 text-xs text-muted-foreground">
            Decimal → درجه، دقیقه و ثانیه
          </div>
        </button>

        <button
          type="button"
          onClick={() =>
            setConversionType("dms-to-decimal")
          }
          className={`rounded-xl border p-3 text-right transition-all ${
            conversionType === "dms-to-decimal"
              ? "border-violet-500/50 bg-violet-500/10 text-violet-600 dark:text-violet-400"
              : "bg-background/50 hover:bg-muted/50"
          }`}
        >
          <div className="text-sm font-medium">
            DMS به اعشاری
          </div>

          <div className="mt-1 text-xs text-muted-foreground">
            درجه، دقیقه و ثانیه → Decimal
          </div>
        </button>
      </div>

      {/* Coordinate type */}
      <div className="mt-6 space-y-2">
        <label className="text-sm font-medium">
          نوع مختصات
        </label>

        <Select
          value={coordinateType}
          onValueChange={(value) => {
            const newType = value as CoordinateType;

            setCoordinateType(newType);

            setDirection(
              newType === "latitude" ? "N" : "E"
            );

            setCopied(false);
          }}
        >
          <SelectTrigger className="h-12">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="latitude">
              عرض جغرافیایی (Latitude)
            </SelectItem>

            <SelectItem value="longitude">
              طول جغرافیایی (Longitude)
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Decimal */}
      {conversionType === "decimal-to-dms" ? (
        <div className="mt-5 space-y-2">
          <label className="text-sm font-medium">
            مختصات اعشاری
          </label>

          <Input
            value={decimal}
            onChange={(event) =>
              setDecimal(event.target.value)
            }
            placeholder={
              coordinateType === "latitude"
                ? "مثلاً 35.6892"
                : "مثلاً 51.3890"
            }
            dir="ltr"
            inputMode="decimal"
            className="h-12 text-base"
          />

          <p className="text-xs leading-6 text-muted-foreground">
            محدوده مجاز:{" "}
            {coordinateType === "latitude"
              ? "-90 تا 90"
              : "-180 تا 180"}
          </p>
        </div>
      ) : (
        <>
          {/* DMS inputs */}
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                درجه
              </label>

              <Input
                value={degrees}
                onChange={(event) =>
                  setDegrees(event.target.value)
                }
                placeholder="35"
                dir="ltr"
                inputMode="decimal"
                className="h-12 text-base"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                دقیقه
              </label>

              <Input
                value={minutes}
                onChange={(event) =>
                  setMinutes(event.target.value)
                }
                placeholder="41"
                dir="ltr"
                inputMode="decimal"
                className="h-12 text-base"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                ثانیه
              </label>

              <Input
                value={seconds}
                onChange={(event) =>
                  setSeconds(event.target.value)
                }
                placeholder="21.12"
                dir="ltr"
                inputMode="decimal"
                className="h-12 text-base"
              />
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <label className="text-sm font-medium">
              جهت
            </label>

            <Select
              value={direction}
              onValueChange={(value) => {
                setDirection(value);
                setCopied(false);
              }}
            >
              <SelectTrigger className="h-12">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                {directionOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </>
      )}

      {/* Result */}
      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between">
          <label className="text-sm font-medium">
            نتیجه
          </label>

          <span className="text-xs text-muted-foreground">
            {conversionType === "decimal-to-dms"
              ? "DMS"
              : "Decimal"}
          </span>
        </div>

        <div
          className={`min-h-24 rounded-2xl border p-5 ${
            conversion.error
              ? "border-destructive/30 bg-destructive/5"
              : "bg-muted/30"
          }`}
        >
          {conversion.error ? (
            <div className="flex min-h-14 items-center">
              <p className="text-sm leading-7 text-destructive">
                {conversion.error}
              </p>
            </div>
          ) : conversion.result ? (
            <div className="flex min-h-14 items-center justify-between gap-3">
              <code
                dir="ltr"
                className="break-all text-lg font-semibold tracking-wide"
              >
                {conversion.result}
              </code>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={copyResult}
                title="کپی نتیجه"
                className="shrink-0"
              >
                {copied ? (
                  <Check className="size-4 text-green-500" />
                ) : (
                  <Copy className="size-4" />
                )}
              </Button>
            </div>
          ) : (
            <div className="flex min-h-14 items-center">
              <p className="text-sm text-muted-foreground">
                نتیجه اینجا نمایش داده می‌شود.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-5 flex flex-wrap justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={clear}
          disabled={
            !decimal &&
            !degrees &&
            !minutes &&
            !seconds
          }
        >
          <Trash2 className="size-4" />
          پاک کردن
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={swapConversion}
        >
          <ArrowLeftRight className="size-4" />
          جابجایی
        </Button>

        <Button
          type="button"
          onClick={copyResult}
          disabled={!conversion.result}
        >
          {copied ? (
            <Check className="size-4" />
          ) : (
            <Clipboard className="size-4" />
          )}

          کپی نتیجه
        </Button>
      </div>
    </div>
  );
}