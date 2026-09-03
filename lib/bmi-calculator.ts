
export type BMIResult = {
  value: number;
  category: string;
  color: string;
  icon: string; // name of icon to use
  description: string;
  advice: string;
  range: string;
};

export type BMICategory =
  | "underweight"
  | "normal"
  | "overweight"
  | "obese"
  | "severelyObese";

export type HistoryItem = {
  id: string;
  weight: number;
  height: number;
  bmi: number;
  category: string;
  date: Date;
};

export const BMI_CATEGORIES: Record<
  BMICategory,
  {
    label: string;
    color: string;
    bgColor: string;
    borderColor: string;
    iconName: string;
    description: string;
    advice: string;
    range: string;
  }
> = {
  underweight: {
    label: "کمبود وزن",
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
    borderColor: "border-blue-200 dark:border-blue-800",
    iconName: "AlertCircle",
    description: "وزن شما کمتر از محدوده نرمال است.",
    advice:
      "برای افزایش وزن، مصرف مواد غذایی مغذی و پرکالری را افزایش دهید و با پزشک مشورت کنید.",
    range: "کمتر از 18.5",
  },
  normal: {
    label: "وزن نرمال",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
    borderColor: "border-emerald-200 dark:border-emerald-800",
    iconName: "CheckCircle2",
    description: "وزن شما در محدوده نرمال و سالم قرار دارد.",
    advice: "با ادامه رژیم غذایی متعادل و ورزش منظم، این وضعیت را حفظ کنید.",
    range: "18.5 - 24.9",
  },
  overweight: {
    label: "اضافه وزن",
    color: "text-amber-600",
    bgColor: "bg-amber-50 dark:bg-amber-950/30",
    borderColor: "border-amber-200 dark:border-amber-800",
    iconName: "AlertTriangle",
    description: "وزن شما بیشتر از محدوده نرمال است.",
    advice:
      "کاهش وزن تدریجی با اصلاح رژیم غذایی و افزایش فعالیت بدنی توصیه می‌شود.",
    range: "25 - 29.9",
  },
  obese: {
    label: "چاقی",
    color: "text-orange-600",
    bgColor: "bg-orange-50 dark:bg-orange-950/30",
    borderColor: "border-orange-200 dark:border-orange-800",
    iconName: "AlertTriangle",
    description: "وزن شما در محدوده چاقی قرار دارد.",
    advice:
      "برای کاهش وزن و بهبود سلامتی، با پزشک یا متخصص تغذیه مشورت کنید.",
    range: "30 - 34.9",
  },
  severelyObese: {
    label: "چاقی شدید",
    color: "text-red-600",
    bgColor: "bg-red-50 dark:bg-red-950/30",
    borderColor: "border-red-200 dark:border-red-800",
    iconName: "AlertCircle",
    description: "وزن شما در محدوده چاقی شدید قرار دارد.",
    advice:
      "حتماً با پزشک متخصص مشورت کنید. تغییرات اساسی در سبک زندگی و رژیم غذایی ضروری است.",
    range: "بالای 35",
  },
};

/**
 * محاسبه BMI بر اساس وزن و قد
 */
export function calculateBMI(
  weight: number,
  height: number,
  unit: "metric" | "imperial"
): {
  bmi: number;
  category: BMICategory;
  result: BMIResult;
} {
  let bmi: number;

  if (unit === "metric") {
    // وزن به کیلوگرم، قد به متر
    bmi = weight / (height / 100) ** 2;
  } else {
    // وزن به پوند، قد به اینچ
    bmi = (weight / height ** 2) * 703;
  }

  bmi = Math.round(bmi * 10) / 10;

  // Determine category
  let category: BMICategory;
  if (bmi < 18.5) {
    category = "underweight";
  } else if (bmi < 25) {
    category = "normal";
  } else if (bmi < 30) {
    category = "overweight";
  } else if (bmi < 35) {
    category = "obese";
  } else {
    category = "severelyObese";
  }

  const catData = BMI_CATEGORIES[category];

  const result: BMIResult = {
    value: bmi,
    category: catData.label,
    color: catData.color,
    icon: catData.iconName,
    description: catData.description,
    advice: catData.advice,
    range: catData.range,
  };

  return {
    bmi,
    category,
    result,
  };
}

/**
 * ایجاد آیتم تاریخچه
 */
export function createHistoryItem(
  weight: number,
  height: number,
  bmi: number,
  category: string
): HistoryItem {
  return {
    id: `${Date.now()}-${Math.random()}`,
    weight,
    height,
    bmi,
    category,
    date: new Date(),
  };
}

/**
 * فرمت کردن تاریخ
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

/**
 * اعتبارسنجی ورودی‌ها
 */
export function validateInputs(weight: string, height: string): boolean {
  const weightNum = parseFloat(weight);
  const heightNum = parseFloat(height);

  if (!weightNum || !heightNum || weightNum <= 0 || heightNum <= 0) {
    return false;
  }

  return true;
}