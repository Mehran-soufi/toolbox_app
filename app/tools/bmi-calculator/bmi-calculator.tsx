"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Calculator,
  RotateCcw,
  Copy,
  Activity,
  Scale,
  Ruler,
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  calculateBMI,
  createHistoryItem,
  formatDate,
  validateInputs,
  BMI_CATEGORIES,
  type BMIResult,
  type HistoryItem,
  type BMICategory,
} from "@/lib/bmi-calculator";

import { useToolHistory } from "@/hooks/useToolHistory";

// Map icon names to components
const ICON_MAP = {
  AlertCircle: AlertCircle,
  CheckCircle2: CheckCircle2,
  AlertTriangle: AlertTriangle,
};

export default function BMICalculator() {
  // States
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [result, setResult] = useState<BMIResult | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");

 useToolHistory({
    toolName: "محاسبه BMI",
    toolSlug: "bmi-calculator",
    toolIcon: "Weight",
  });

  // BMI Calculation
  const handleCalculate = () => {
    // Validate inputs
    if (!validateInputs(weight, height)) {
      toast.error("لطفاً مقادیر معتبر برای وزن و قد وارد کنید");
      return;
    }

    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    setIsCalculating(true);

    // Simulate calculation delay for better UX
    setTimeout(() => {
      const {
        bmi,
        category,
        result: bmiResult,
      } = calculateBMI(weightNum, heightNum, unit);

      setResult(bmiResult);

      // Add to history
      const historyItem = createHistoryItem(
        weightNum,
        heightNum,
        bmi,
        BMI_CATEGORIES[category].label,
      );

      setHistory((prev) => [historyItem, ...prev].slice(0, 10));

      toast.success(`BMI شما محاسبه شد: ${bmi}`);

      setIsCalculating(false);
    }, 400);
  };

  // Reset fields
  const resetFields = () => {
    setWeight("");
    setHeight("");
    setResult(null);
    toast.info("فیلدها پاکسازی شدند");
  };

  // Copy result
  const copyResult = async () => {
    if (!result) return;

    const text = `BMI: ${result.value}\nوضعیت: ${result.category}\nمحدوده: ${result.range}\nتوصیه: ${result.advice}`;

    try {
      await navigator.clipboard.writeText(text);
      toast.success("نتیجه BMI کپی شد");
    } catch (error) {
      console.error("Copy error:", error);
      toast.error("کپی کردن نتیجه انجام نشد");
    }
  };

  // Handle Enter key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCalculate();
    }
  };

  // Clear history item
  const clearHistoryItem = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
    toast.success("مورد از تاریخچه حذف شد");
  };

  // Clear all history
  const clearHistory = () => {
    setHistory([]);
    toast.success("تاریخچه محاسبات پاک شد");
  };

  // Get icon component
  const getIcon = (iconName: string) => {
    const IconComponent = ICON_MAP[iconName as keyof typeof ICON_MAP];
    return IconComponent ? <IconComponent className="size-5" /> : null;
  };

  return (
    <Card className="my-3 border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/50 shadow-[0_0_35px_rgba(173,70,255,.12)] backdrop-blur-xl rounded-xl">
      <CardContent className="space-y-6">
        {/* Unit Toggle */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 rounded-lg border border-zinc-200 dark:border-zinc-800 p-1">
            <Button
              variant={unit === "metric" ? "default" : "ghost"}
              size="sm"
              className={cn(
                "h-8 px-3 text-xs",
                unit === "metric" && "bg-violet-500 hover:bg-violet-600",
              )}
              onClick={() => {
                setUnit("metric");
                setResult(null);
                toast.info("واحد به متریک تغییر کرد");
              }}
            >
              متریک (kg/cm)
            </Button>
            <Button
              variant={unit === "imperial" ? "default" : "ghost"}
              size="sm"
              className={cn(
                "h-8 px-3 text-xs",
                unit === "imperial" && "bg-violet-500 hover:bg-violet-600",
              )}
              onClick={() => {
                setUnit("imperial");
                setResult(null);
                toast.info("واحد به اینچی تغییر کرد");
              }}
            >
              اینچی (lb/in)
            </Button>
          </div>
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Weight */}
          <div className="space-y-2">
            <Label htmlFor="weight" className="flex items-center gap-2 text-sm">
              <Scale className="size-4 text-violet-500" />
              وزن
              <span className="text-xs text-zinc-500">
                ({unit === "metric" ? "کیلوگرم" : "پوند"})
              </span>
            </Label>
            <div className="relative">
              <Input
                id="weight"
                type="number"
                placeholder={unit === "metric" ? "مثال: 75" : "مثال: 165"}
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                onKeyDown={handleKeyDown}
                className="h-11 pl-12"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-zinc-400">
                {unit === "metric" ? "kg" : "lb"}
              </span>
            </div>
          </div>

          {/* Height */}
          <div className="space-y-2">
            <Label htmlFor="height" className="flex items-center gap-2 text-sm">
              <Ruler className="size-4 text-violet-500" />
              قد
              <span className="text-xs text-zinc-500">
                ({unit === "metric" ? "سانتی‌متر" : "اینچ"})
              </span>
            </Label>
            <div className="relative">
              <Input
                id="height"
                type="number"
                placeholder={unit === "metric" ? "مثال: 175" : "مثال: 69"}
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                onKeyDown={handleKeyDown}
                className="h-11 pl-12"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-zinc-400">
                {unit === "metric" ? "cm" : "in"}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-zinc-200 dark:border-zinc-800">
          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={resetFields}
              className="flex gap-2"
            >
              <RotateCcw className="size-4" />
              پاکسازی
            </Button>
          </div>

          <Button
            onClick={handleCalculate}
            disabled={isCalculating || !weight || !height}
            className="bg-violet-500 hover:bg-purple-500"
          >
            {isCalculating ? (
              <>
                <div className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                در حال محاسبه...
              </>
            ) : (
              <>
                <Calculator className="size-4" />
                محاسبه BMI
              </>
            )}
          </Button>
        </div>

        {/* Result */}
        {result && (
          <div
            className={cn(
              "rounded-xl border p-4 transition-all",
              result.color,
              BMI_CATEGORIES[
                Object.keys(BMI_CATEGORIES).find(
                  (key) =>
                    BMI_CATEGORIES[key as BMICategory].label ===
                    result.category,
                ) as BMICategory
              ]?.bgColor,
              BMI_CATEGORIES[
                Object.keys(BMI_CATEGORIES).find(
                  (key) =>
                    BMI_CATEGORIES[key as BMICategory].label ===
                    result.category,
                ) as BMICategory
              ]?.borderColor,
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  {getIcon(result.icon)}
                  <h3 className="text-lg font-bold">{result.category}</h3>
                </div>
                <p className="mt-1 text-sm opacity-90">{result.description}</p>
                <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
                  <span className="flex items-center gap-1.5">
                    <span className="opacity-70">BMI:</span>
                    <span className="font-bold">{result.value}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="opacity-70">محدوده:</span>
                    <span className="font-medium">{result.range}</span>
                  </span>
                </div>
                <div className="mt-2 rounded-lg bg-white/50 dark:bg-black/20 p-2.5 text-xs">
                  <span className="opacity-70">توصیه:</span> {result.advice}
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={copyResult}
                className="shrink-0"
                title="کپی نتیجه"
              >
                <Copy className="size-4" />
              </Button>
            </div>
          </div>
        )}

        {/* BMI Scale Visual */}
        {result && (
          <div className="space-y-2">
            <div className="relative h-3 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
              <div
                className="absolute h-full rounded-full transition-all duration-700"
                style={{
                  width: `${Math.min((result.value / 40) * 100, 100)}%`,
                  background: `linear-gradient(to right, #3b82f6, #22c55e, #eab308, #f97316, #ef4444)`,
                }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 size-4 rounded-full border-2 border-white bg-white shadow-lg"
                style={{
                  left: `calc(${Math.min((result.value / 40) * 100, 100)}% - 8px)`,
                }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-zinc-500">
              <span>0</span>
              <span>18.5</span>
              <span>25</span>
              <span>30</span>
              <span>35</span>
              <span>40+</span>
            </div>
          </div>
        )}

        {/* History */}
        {history.length > 0 && (
          <div className="border-t border-zinc-200 dark:border-zinc-800 pt-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Activity className="size-4 text-violet-500" />
                <h4 className="text-sm font-medium">تاریخچه محاسبات</h4>
                <span className="text-xs text-zinc-500">
                  ({history.length} مورد)
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearHistory}
                className="text-xs text-zinc-500 hover:text-red-500"
              >
                پاک کردن همه
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {history.map((item) => {
                const catData = Object.values(BMI_CATEGORIES).find(
                  (c) => c.label === item.category,
                );
                return (
                  <div
                    key={item.id}
                    className="group relative rounded-lg border border-zinc-200 dark:border-zinc-800 p-2.5 text-center hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                  >
                    <button
                      onClick={() => clearHistoryItem(item.id)}
                      className="absolute -right-1 -top-1 opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <span className="flex size-4 items-center justify-center rounded-full bg-zinc-300 text-[8px] text-white hover:bg-red-500">
                        ×
                      </span>
                    </button>
                    <p className="text-xs font-bold">{item.bmi}</p>
                    <p
                      className={cn(
                        "text-[10px] font-medium",
                        catData?.color || "",
                      )}
                    >
                      {item.category}
                    </p>
                    <p className="text-[9px] text-zinc-400">
                      {item.weight}kg / {item.height}cm
                    </p>
                    <p className="text-[8px] text-zinc-400">
                      {formatDate(item.date)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
