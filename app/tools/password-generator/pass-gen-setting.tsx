"use client";

import { useCallback, useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Field } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy, RefreshCw, Check } from "lucide-react";
import { toast } from "sonner";
import { useToolHistory } from "@/hooks/useToolHistory";

const CHAR_SETS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+~`|}{[]:;?><,./-=",
};

function PassGenSetting() {
  useToolHistory({
    toolName: "رمزساز",
    toolSlug: "password-generator",
    toolIcon: "LockKeyhole",
  });

  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);
  const [options, setOptions] = useState({
    uppercase: true,
    numbers: true,
    symbols: true,
    lowercase: true,
  });
  const [copied, setCopied] = useState(false);

  const generatePassword = useCallback(() => {
    let characters = options.lowercase
      ? CHAR_SETS.lowercase
      : "";

    if (options.uppercase) {
      characters += CHAR_SETS.uppercase;
    }

    if (options.numbers) {
      characters += CHAR_SETS.numbers;
    }

    if (options.symbols) {
      characters += CHAR_SETS.symbols;
    }

    if (!characters) {
      setPassword("");
      setCopied(false);
      return;
    }

    let generatedPassword = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(
        Math.random() * characters.length,
      );

      generatedPassword += characters.charAt(randomIndex);
    }

    setPassword(generatedPassword);
    setCopied(false);
  }, [
    length,
    options.lowercase,
    options.numbers,
    options.symbols,
    options.uppercase,
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      generatePassword();
    }, 0);

    return () => clearTimeout(timer);
  }, [generatePassword]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(password);

      toast.success("کپی شد!", {
        description: "رمز عبور در حافظه کپی گردید.",
      });

      setCopied(true);
    } catch {
      toast.error("خطا در کپی", {
        description: "لطفاً دوباره تلاش کنید.",
      });
    }
  };

  const handleCheckboxChange = (
    key: keyof typeof options,
  ) => {
    setOptions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="my-3 flex w-full flex-col gap-y-4">
      <div className="flex w-full items-center justify-between gap-x-4 rounded-xl border border-zinc-200 bg-white/60 p-4 shadow-[0_0_35px_rgba(173,70,255,.12)] backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-900/50">
        <div className="flex-1 overflow-hidden">
          <p className="mb-1 text-xs opacity-50">
            رمز تولید شده:
          </p>

          <p className="truncate font-mono text-lg font-bold tracking-wider md:text-xl">
            {password}
          </p>
        </div>

        <div className="flex gap-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={generatePassword}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>

          <Button
            variant="secondary"
            size="icon"
            onClick={copyToClipboard}
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5">
        <div className="flex flex-col items-center justify-center gap-2 rounded-lg border p-2 shadow-[0_0_30px_rgba(173,70,255,.15)] backdrop-blur-xl dark:bg-zinc-900/50">
          <div className="flex w-full items-center justify-center gap-x-1">
            <Input
              type="number"
              min={4}
              max={32}
              value={length}
              onChange={(event) =>
                setLength(
                  Math.min(
                    32,
                    Math.max(
                      4,
                      parseInt(event.target.value, 10) || 4,
                    ),
                  ),
                )
              }
              className="w-14 text-center"
            />

            <span className="text-sm">طول</span>
          </div>

          <span className="text-[10px] opacity-60">
            محدوده: 4-32
          </span>
        </div>

        <div className="flex flex-col items-center justify-center gap-2 rounded-lg border p-2 shadow-[0_0_30px_rgba(173,70,255,.15)] backdrop-blur-xl dark:bg-zinc-900/50">
          <Field
            orientation="horizontal"
            dir="rtl"
            className="flex w-full items-center justify-center"
          >
            <Checkbox
              id="upper"
              checked={options.uppercase}
              onCheckedChange={() =>
                handleCheckboxChange("uppercase")
              }
            />

            <Label
              htmlFor="upper"
              className="mr-2 cursor-pointer"
            >
              حروف بزرگ
            </Label>
          </Field>

          <span className="text-[10px] opacity-60">
            مثال: ABC
          </span>
        </div>

        <div className="flex flex-col items-center justify-center gap-2 rounded-lg border p-2 shadow-[0_0_30px_rgba(173,70,255,.15)] backdrop-blur-xl dark:bg-zinc-900/50">
          <Field
            orientation="horizontal"
            dir="rtl"
            className="flex w-full items-center justify-center"
          >
            <Checkbox
              id="number"
              checked={options.numbers}
              onCheckedChange={() =>
                handleCheckboxChange("numbers")
              }
            />

            <Label
              htmlFor="number"
              className="mr-2 cursor-pointer"
            >
              اعداد
            </Label>
          </Field>

          <span className="text-[10px] opacity-60">
            مثال: 123
          </span>
        </div>

        <div className="flex flex-col items-center justify-center gap-2 rounded-lg border p-2 shadow-[0_0_30px_rgba(173,70,255,.15)] backdrop-blur-xl dark:bg-zinc-900/50">
          <Field
            orientation="horizontal"
            dir="rtl"
            className="flex w-full items-center justify-center"
          >
            <Checkbox
              id="symbol"
              checked={options.symbols}
              onCheckedChange={() =>
                handleCheckboxChange("symbols")
              }
            />

            <Label
              htmlFor="symbol"
              className="mr-2 cursor-pointer"
            >
              نمادها
            </Label>
          </Field>

          <span className="text-[10px] opacity-60">
            مثال: @#$
          </span>
        </div>

        <div className="flex items-center justify-center rounded-lg p-2 sm:col-span-full lg:col-span-1">
          <Button
            className="h-full min-h-14 w-full"
            variant="outline"
            onClick={generatePassword}
          >
            ایجاد رمز جدید
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PassGenSetting;
