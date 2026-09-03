"use client";

import React, { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Field } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy, RefreshCw, Check } from "lucide-react";
import { toast } from "sonner";
import { useToolHistory } from "@/hooks/useToolHistory";

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

  // کاراکترهای پایه
  const charSets = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+~`|}{[]:;?><,./-=",
  };

  // 2. تابع اصلی تولید رمز
  const generatePassword = () => {
    let characters = charSets.lowercase; // پیش‌فرض حروف کوچک
    if (options.uppercase) characters += charSets.uppercase;
    if (options.numbers) characters += charSets.numbers;
    if (options.symbols) characters += charSets.symbols;

    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      generatedPassword += characters.charAt(randomIndex);
    }
    setPassword(generatedPassword);
    setCopied(false);
  };

  useEffect(() => {
    generatePassword();
  }, []);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(password);

      toast.success("کپی شد!", {
        description: "رمز عبور در حافظه کپی گردید.",
      });
    } catch (err) {
      toast.error("خطا در کپی", {
        description: "لطفاً دوباره تلاش کنید.",
      });
    }
  };

  // مدیریت تغییر چک‌باکس‌ها
  const handleCheckboxChange = (key: keyof typeof options) => {
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="w-full my-3 flex flex-col gap-y-4">
      {/* بخش نمایش رمز ساخته شده */}
      <div
        className="w-full p-4 border 
                border-zinc-200 
                dark:border-zinc-800
                bg-white/60 
                dark:bg-zinc-900/50
                shadow-[0_0_35px_rgba(173,70,255,.12)] 
                backdrop-blur-xl
                rounded-xl flex items-center justify-between gap-x-4"
      >
        <div className="flex-1 overflow-hidden">
          <p className="text-xs opacity-50 mb-1">رمز تولید شده:</p>
          <p className="text-lg md:text-xl font-mono font-bold truncate tracking-wider">
            {password}
          </p>
        </div>
        <div className="flex gap-x-2">
          <Button variant="outline" size="icon" onClick={generatePassword}>
            <RefreshCw className="w-4 h-4" />
          </Button>
          <Button variant="secondary" size="icon" onClick={copyToClipboard}>
            {copied ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      {/* تنظیمات (Grid شما) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
        {/* طول رمز */}
        <div className="rounded-lg flex items-center justify-center flex-col gap-2 p-2 border dark:bg-zinc-900/50 backdrop-blur-xl shadow-[0_0_30px_rgba(173,70,255,.15)]">
          <div className="w-full flex items-center justify-center gap-x-1">
            <Input
              type="number"
              min={4}
              max={32}
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value) || 4)}
              className="w-14 text-center"
            />
            <span className="text-sm">طول</span>
          </div>
          <span className="text-[10px] opacity-60">محدوده: 4-32</span>
        </div>

        {/* حروف بزرگ */}
        <div className="rounded-lg flex items-center justify-center flex-col gap-2 p-2 border dark:bg-zinc-900/50 backdrop-blur-xl shadow-[0_0_30px_rgba(173,70,255,.15)]">
          <Field
            orientation="horizontal"
            dir="rtl"
            className="w-full flex items-center justify-center"
          >
            <Checkbox
              id="upper"
              checked={options.uppercase}
              onCheckedChange={() => handleCheckboxChange("uppercase")}
            />
            <Label htmlFor="upper" className="mr-2 cursor-pointer">
              حروف بزرگ
            </Label>
          </Field>
          <span className="text-[10px] opacity-60">مثال: ABC</span>
        </div>

        {/* اعداد */}
        <div className="rounded-lg flex items-center justify-center flex-col gap-2 p-2 border dark:bg-zinc-900/50 backdrop-blur-xl shadow-[0_0_30px_rgba(173,70,255,.15)]">
          <Field
            orientation="horizontal"
            dir="rtl"
            className="w-full flex items-center justify-center"
          >
            <Checkbox
              id="number"
              checked={options.numbers}
              onCheckedChange={() => handleCheckboxChange("numbers")}
            />
            <Label htmlFor="number" className="mr-2 cursor-pointer">
              اعداد
            </Label>
          </Field>
          <span className="text-[10px] opacity-60">مثال: 123</span>
        </div>

        {/* کاراکترهای خاص */}
        <div className="rounded-lg flex items-center justify-center flex-col gap-2 p-2 border dark:bg-zinc-900/50 backdrop-blur-xl shadow-[0_0_30px_rgba(173,70,255,.15)]">
          <Field
            orientation="horizontal"
            dir="rtl"
            className="w-full flex items-center justify-center"
          >
            <Checkbox
              id="symbol"
              checked={options.symbols}
              onCheckedChange={() => handleCheckboxChange("symbols")}
            />
            <Label htmlFor="symbol" className="mr-2 cursor-pointer">
              نمادها
            </Label>
          </Field>
          <span className="text-[10px] opacity-60">مثال: @#$</span>
        </div>

        {/* دکمه تولید مجدد */}
        <div className="rounded-lg flex items-center justify-center p-2 sm:col-span-full lg:col-span-1">
          <Button
            className="w-full min-h-14 h-full"
            variant={"outline"}
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
