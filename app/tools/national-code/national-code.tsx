"use client";

import { useState } from "react";
import {
  BadgeCheck,
  Building2,
  Loader2,
  RotateCcw,
  Search,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type NationalCodeResponse = {
  ok: boolean;
  result?: {
    status?: string;
    province?: string;
    city?: string;
    [key: string]: unknown;
  };
  message?: string;
};

export default function NationalCode() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState<NationalCodeResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (value: string) => {
    const numbersOnly = value.replace(/\D/g, "").slice(0, 10);

    setCode(numbersOnly);

    if (result) {
      setResult(null);
    }
  };

  const handleSubmit = async () => {
    if (code.length !== 10) {
      toast.error("کد ملی باید ۱۰ رقم باشد.");
      return;
    }

    try {
      setLoading(true);
      setResult(null);

      const response = await fetch(
        `/api/national-code?code=${encodeURIComponent(code)}`
      );

      const data: NationalCodeResponse = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "خطایی هنگام بررسی کد ملی رخ داد."
        );
      }

      setResult(data);

      if (data.ok) {
        toast.success("کد ملی معتبر است.");
      } else {
        toast.error("کد ملی نامعتبر است.");
      }
    } catch (error) {
      console.error(error);

      toast.error(
        error instanceof Error
          ? error.message
          : "خطایی هنگام بررسی کد ملی رخ داد."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setCode("");
    setResult(null);
  };

  const isValid = result?.ok === true;
  const isInvalid = result?.ok === false;

  return (
    <div className="w-full rounded-2xl border border-violet-500/20 bg-background p-4 shadow-[0_0_30px_rgba(139,92,246,.08)] sm:p-6">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-5">
        {/* Header */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-500">
            <ShieldCheck size={28} />
          </div>

          <div>
            <h2 className="text-lg font-bold sm:text-xl">
              اعتبارسنجی کد ملی
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              کد ملی ۱۰ رقمی را وارد کنید تا اعتبار آن بررسی شود.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-3">
          <div className="relative">
            <Input
              value={code}
              onChange={(event) => handleChange(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSubmit();
                }
              }}
              inputMode="numeric"
              maxLength={10}
              dir="ltr"
              placeholder="مثلاً 0012345678"
              className="h-12 pr-4 text-center text-lg tracking-[0.15em]"
              aria-label="کد ملی"
            />
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Button
              onClick={handleSubmit}
              disabled={loading || code.length !== 10}
              className="h-11 flex-1"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" />
                  در حال بررسی...
                </>
              ) : (
                <>
                  <Search />
                  بررسی کد ملی
                </>
              )}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              disabled={loading || (!code && !result)}
              className="h-11 sm:w-28"
            >
              <RotateCcw />
              پاک کردن
            </Button>
          </div>
        </div>

        {/* Result */}
        {result && (
          <div
            className={`overflow-hidden rounded-xl border ${
              isValid
                ? "border-emerald-500/20 bg-emerald-500/5"
                : "border-destructive/20 bg-destructive/5"
            }`}
          >
            <div className="flex items-center gap-3 p-4">
              {isValid ? (
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                  <BadgeCheck size={22} />
                </div>
              ) : (
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                  <XCircle size={22} />
                </div>
              )}

              <div>
                <p className="font-semibold">
                  {isValid
                    ? "کد ملی معتبر است"
                    : "کد ملی نامعتبر است"}
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  {result.result?.status ||
                    result.message ||
                    (isInvalid
                      ? "کد ملی وارد شده صحیح نمی‌باشد."
                      : "")}
                </p>
              </div>
            </div>

            {/* Additional information */}
            {isValid &&
              (result.result?.province || result.result?.city) && (
                <div className="grid gap-3 border-t border-border/50 p-4 sm:grid-cols-2">
                  {result.result?.province && (
                    <div className="flex items-center gap-3 rounded-lg border bg-background/50 p-3">
                      <Building2
                        size={20}
                        className="text-violet-500"
                      />

                      <div>
                        <p className="text-xs text-muted-foreground">
                          استان
                        </p>

                        <p className="font-medium">
                          {String(result.result.province)}
                        </p>
                      </div>
                    </div>
                  )}

                  {result.result?.city && (
                    <div className="flex items-center gap-3 rounded-lg border bg-background/50 p-3">
                      <Building2
                        size={20}
                        className="text-violet-500"
                      />

                      <div>
                        <p className="text-xs text-muted-foreground">
                          شهر
                        </p>

                        <p className="font-medium">
                          {String(result.result.city)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
          </div>
        )}
      </div>
    </div>
  );
}