"use client";

import { useState } from "react";
import {
  ArrowRight,
  Check,
  Copy,
  Languages,
  Loader2,
  RotateCcw,
  Sparkles,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useToolHistory } from "@/hooks/useToolHistory";

type TranslationSegment = [string, ...unknown[]];

type TranslationResponse = [
  TranslationSegment[],
  ...unknown[],
];

const MAX_CHARACTERS = 5000;

export default function Translate() {
  const { logTranslate } = useToolHistory({
    toolName: "مترجم متن",
    toolSlug: "translator",
  });

  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [targetLang, setTargetLang] = useState("fa");

  const handleTranslate = async () => {
    const text = inputText.trim();

    if (!text) {
      toast.error("لطفاً متنی برای ترجمه وارد کنید.");
      return;
    }

    if (text.length > MAX_CHARACTERS) {
      toast.error(`متن نمی‌تواند بیشتر از ${MAX_CHARACTERS} کاراکتر باشد.`);
      return;
    }

    setIsTranslating(true);

    try {
      const response = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(
          text,
        )}`,
      );

      if (!response.ok) {
        throw new Error("Translation request failed");
      }

      const data = (await response.json()) as TranslationResponse;

      const result = Array.isArray(data[0])
        ? data[0]
            .map((item) => item[0])
            .filter(Boolean)
            .join("")
        : "";

      if (!result) {
        throw new Error("Empty translation result");
      }

      setTranslatedText(result);

      // از result استفاده می‌کنیم، نه translatedText،
      // چون state در همین لحظه هنوز مقدار جدید را نگرفته است.
      logTranslate(text, result, targetLang);

      toast.success("ترجمه با موفقیت انجام شد.");
    } catch (error) {
      console.error("Translation error:", error);

      setTranslatedText("");
      toast.error("ترجمه انجام نشد. لطفاً دوباره تلاش کنید.");
    } finally {
      setIsTranslating(false);
    }
  };

  const copyToClipboard = async () => {
    if (!translatedText) return;

    try {
      await navigator.clipboard.writeText(translatedText);
      toast.success("ترجمه کپی شد.");
    } catch (error) {
      console.error("Copy error:", error);
      toast.error("کپی کردن متن انجام نشد.");
    }
  };

  const resetFields = () => {
    setInputText("");
    setTranslatedText("");

    toast.success("متن‌ها پاک شدند.");
  };

  const handleInputChange = (value: string) => {
    if (value.length <= MAX_CHARACTERS) {
      setInputText(value);
    }
  };

  return (
    <Card className="my-3 overflow-hidden rounded-2xl border border-zinc-200/80 bg-white/70 shadow-[0_0_35px_rgba(173,70,255,.10)] backdrop-blur-xl dark:border-zinc-800/80 dark:bg-zinc-900/50">
      <CardContent className="p-3 sm:p-5">
        {/* Header */}
        <div className="mb-5 flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 dark:bg-violet-500/15 dark:text-violet-400">
            <Languages className="size-5" />
          </div>

          <div>
            <h2 className="flex items-center gap-2 text-sm font-semibold sm:text-base">
              مترجم متن
              <Sparkles className="size-3.5 text-violet-500" />
            </h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              متن خود را وارد کنید و ترجمه را دریافت کنید.
            </p>
          </div>
        </div>

        {/* Translation panels */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Input */}
          <div className="group relative rounded-xl border border-zinc-200 bg-zinc-50/70 p-3 transition-colors focus-within:border-violet-400/70 focus-within:bg-white dark:border-zinc-800 dark:bg-zinc-950/30 dark:focus-within:border-violet-500/50 dark:focus-within:bg-zinc-950/50">
            <div className="mb-2.5 flex items-center justify-between">
              <label className="text-xs font-medium sm:text-sm">
                متن اصلی
              </label>

              <span className="text-[11px] text-muted-foreground">
                {inputText.length.toLocaleString("fa-IR")} /{" "}
                {MAX_CHARACTERS.toLocaleString("fa-IR")}
              </span>
            </div>

            <Textarea
              placeholder="متن یا پاراگراف خود را اینجا وارد کنید..."
              className="min-h-48 resize-none border-0 bg-transparent p-0 text-left text-sm leading-7 shadow-none focus-visible:ring-0 dark:bg-transparent"
              dir="auto"
              value={inputText}
              maxLength={MAX_CHARACTERS}
              onChange={(event) => handleInputChange(event.target.value)}
            />
          </div>

          {/* Output */}
          <div className="relative rounded-xl border border-zinc-200 bg-zinc-100/60 p-3 dark:border-zinc-800 dark:bg-zinc-950/50">
            <div className="mb-2.5 flex items-center justify-between">
              <label className="text-xs font-medium sm:text-sm">
                ترجمه
              </label>

              {translatedText && (
                <button
                  type="button"
                  onClick={copyToClipboard}
                  className="flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
                  title="کپی ترجمه"
                >
                  <Copy className="size-3.5" />
                  کپی
                </button>
              )}
            </div>

            <Textarea
              readOnly
              placeholder="ترجمه در اینجا ظاهر می‌شود..."
              className="min-h-48 resize-none border-0 bg-transparent p-0 text-left text-sm leading-7 shadow-none focus-visible:ring-0 dark:bg-transparent"
              dir="auto"
              value={translatedText}
            />

            {isTranslating && (
              <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-background/60 backdrop-blur-[2px]">
                <div className="flex items-center gap-2 rounded-lg border bg-background px-4 py-2.5 text-xs font-medium shadow-sm">
                  <Loader2 className="size-4 animate-spin text-violet-500" />
                  در حال ترجمه...
                </div>
              </div>
            )}

            {translatedText && !isTranslating && (
              <div className="pointer-events-none absolute bottom-3 left-3 flex items-center gap-1.5 text-[10px] text-emerald-600 dark:text-emerald-400">
                <Check className="size-3" />
                ترجمه آماده است
              </div>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="mt-4 flex flex-col gap-3 border-t border-zinc-200/80 pt-4 dark:border-zinc-800/80 sm:flex-row sm:items-center sm:justify-between">
          {/* Language */}
          <div className="flex items-center gap-2">
            <span className="hidden text-xs text-muted-foreground sm:block">
              زبان مقصد:
            </span>

            <Select
              value={targetLang}
              onValueChange={setTargetLang}
              disabled={isTranslating}
            >
              <SelectTrigger className="h-9 w-full min-w-32.5 rounded-lg bg-background text-xs focus:ring-1 focus:ring-violet-500 sm:w-36">
                <SelectValue placeholder="زبان" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="fa">🇮🇷 فارسی</SelectItem>
                <SelectItem value="en">🇬🇧 English</SelectItem>
                <SelectItem value="ar">🇸🇦 العربية</SelectItem>
                <SelectItem value="de">🇩🇪 Deutsch</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Actions */}
          <div className="flex w-full gap-2 sm:w-auto">
            <Button
              type="button"
              variant="ghost"
              onClick={resetFields}
              disabled={!inputText && !translatedText}
              className="h-9 flex-1 gap-2 rounded-lg text-xs sm:flex-none"
            >
              <RotateCcw className="size-4" />
              پاکسازی
            </Button>

            <Button
              type="button"
              onClick={handleTranslate}
              disabled={isTranslating || !inputText.trim()}
              className="h-9 flex-1 gap-2 rounded-lg bg-violet-500 px-5 text-xs text-white shadow-sm transition-all hover:bg-violet-600 hover:shadow-md hover:shadow-violet-500/20 sm:flex-none"
            >
              {isTranslating ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  در حال ترجمه...
                </>
              ) : (
                <>
                  ترجمه کن
                  <ArrowRight className="size-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
