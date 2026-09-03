"use client";

import { useState } from "react";
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
import { Copy, RotateCcw, Loader2 } from "lucide-react";
import { useToolHistory } from "@/hooks/useToolHistory";

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
    if (!inputText.trim()) return;

    setIsTranslating(true);
    try {
      const response = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(
          inputText,
        )}`,
      );
      const data = await response.json();

      const text = data[0].map((item: any) => item[0]).join("");
      setTranslatedText(text);
      logTranslate(inputText, translatedText, targetLang); 
    } catch (error) {
      console.error("Translation error:", error);
      setTranslatedText("خطا در ترجمه. لطفا دوباره تلاش کنید.");
    } finally {
      setIsTranslating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(translatedText);
  };

  const resetFields = () => {
    setInputText("");
    setTranslatedText("");
  };

  return (
    <Card
      className="my-3  border  border-zinc-200  dark:border-zinc-800  bg-white/60  
      dark:bg-zinc-900/50 shadow-[0_0_35px_rgba(173,70,255,.12)] backdrop-blur-xl rounded-xl"
    >
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 gap-2">
          {/* بخش ورودی */}
          <div className="space-y-3">
            <label className="md:text-sm text-xs font-medium">متن اصلی:</label>
            <Textarea
              placeholder="متن یا پاراگراف خود را اینجا وارد کنید..."
              className="h-48 resize-none text-left"
              dir="auto"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </div>

          {/* بخش خروجی */}
          <div className="space-y-3">
            <label className="md:text-sm text-xs font-medium">ترجمه:</label>
            <div className="relative h-48">
              <Textarea
                readOnly
                placeholder="ترجمه در اینجا ظاهر می‌شود..."
                className="h-full resize-none bg-muted/50 text-left"
                dir="auto"
                value={translatedText}
              />
              {translatedText && (
                <div className="absolute bottom-2 right-2 flex gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={copyToClipboard}
                    title="کپی"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* کنترل‌ها */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-4 border-t">
          <div className="flex items-center gap-4">
            <Select
              value={targetLang}
              onValueChange={(value) => setTargetLang(value)}
            >
              <SelectTrigger className="w-32.5 focus:ring-primary">
                <SelectValue placeholder="زبان" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fa">فارسی</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="ar">العربية</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={resetFields}
              className="flex gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              پاکسازی
            </Button>
            <Button
              onClick={handleTranslate}
              disabled={isTranslating || !inputText}
              className="bg-violet-500 hover:bg-purple-500"
            >
              {isTranslating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  در حال ترجمه...
                </>
              ) : (
                "ترجمه کن"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
