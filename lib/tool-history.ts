import { toPersianNumber } from "./number";

export type ToolAction =
  | "view"
  | "use"
  | "calculate"
  | "translate"
  | "generate"
  | "fetch"
  | "convert"
  | "scan"
  | "copy";

export type ToolHistoryDetails = {
  input?: string | Record<string, unknown>;
  output?: string | Record<string, unknown>;
  [key: string]: unknown;
};

export type ToolHistoryItem = {
  id: string;
  toolName: string;
  toolSlug: string;
  toolIcon: string;
  action: ToolAction;
  timestamp: number;
  details?: ToolHistoryDetails;
};

export type ToolHistory = ToolHistoryItem[];

const STORAGE_KEY = "tool_history";

const MAX_HISTORY_ITEMS = 50;

/**
 * دریافت تاریخچه ابزارها
 */
export function getToolHistory(): ToolHistory {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored =
      localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed;
  } catch (error) {
    console.error(
      "Error reading tool history:",
      error
    );

    return [];
  }
}

/**
 * ذخیره تاریخچه ابزارها
 */
export function saveToolHistory(
  history: ToolHistory
): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const limitedHistory = history.slice(
      0,
      MAX_HISTORY_ITEMS
    );

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(limitedHistory)
    );
  } catch (error) {
    console.error(
      "Error saving tool history:",
      error
    );
  }
}

/**
 * اضافه کردن یک ابزار به تاریخچه
 *
 * اگر ابزار قبلاً وجود داشته باشد،
 * آیتم قبلی حذف و استفاده جدید در ابتدای لیست قرار می‌گیرد.
 */
export function addToolHistoryItem(
  toolName: string,
  toolSlug: string,
  toolIcon: string,
  action: ToolAction = "use",
  details?: ToolHistoryDetails
): void {
  const history = getToolHistory();

  const existingIndex =
    history.findIndex(
      (item) =>
        item.toolSlug === toolSlug
    );

  const newItem: ToolHistoryItem = {
    id: `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 11)}`,

    toolName,

    toolSlug,

    toolIcon,

    action,

    timestamp: Date.now(),

    details,
  };

  if (existingIndex !== -1) {
    history.splice(existingIndex, 1);
  }

  history.unshift(newItem);

  saveToolHistory(history);
}

/**
 * بررسی اینکه آیا ابزار در تاریخچه وجود دارد
 */
export function isToolInHistory(
  toolSlug: string
): boolean {
  const history = getToolHistory();

  return history.some(
    (item) =>
      item.toolSlug === toolSlug
  );
}

/**
 * دریافت آخرین استفاده از یک ابزار
 */
export function getLastToolUsage(
  toolSlug: string
): ToolHistoryItem | null {
  const history = getToolHistory();

  const found = history.find(
    (item) =>
      item.toolSlug === toolSlug
  );

  return found ?? null;
}

/**
 * حذف یک آیتم از تاریخچه
 */
export function removeToolHistoryItem(
  id: string
): void {
  const history = getToolHistory();

  const filteredHistory =
    history.filter(
      (item) => item.id !== id
    );

  saveToolHistory(filteredHistory);
}

/**
 * پاک کردن کل تاریخچه
 */
export function clearToolHistory(): void {
  saveToolHistory([]);
}

/**
 * دریافت تاریخچه یک ابزار خاص
 */
export function getToolHistoryBySlug(
  slug: string
): ToolHistory {
  const history = getToolHistory();

  return history.filter(
    (item) =>
      item.toolSlug === slug
  );
}

/**
 * فرمت زمان استفاده از ابزار
 */
export function formatToolTime(
  timestamp: number
): string {
  const now = Date.now();

  const diff = Math.max(
    0,
    now - timestamp
  );

  const minutes = Math.floor(
    diff / 60000
  );

  const hours = Math.floor(
    diff / 3600000
  );

  const days = Math.floor(
    diff / 86400000
  );

  if (minutes < 1) {
    return "لحظاتی پیش";
  }

  if (minutes < 60) {
    return `${toPersianNumber(
      minutes
    )} دقیقه پیش`;
  }

  if (hours < 24) {
    return `${toPersianNumber(
      hours
    )} ساعت پیش`;
  }

  if (days < 7) {
    return `${toPersianNumber(
      days
    )} روز پیش`;
  }

  return new Date(
    timestamp
  ).toLocaleDateString("fa-IR");
}

/**
 * نقشه آیکون ابزارها
 *
 * این map زمانی استفاده می‌شود که
 * بخواهیم آیکون را از روی نام ابزار
 * در تاریخچه پیدا کنیم.
 */
export const TOOL_ICONS: Record<
  string,
  string
> = {
  "مترجم متن": "Languages",

  "محاسبه BMI": "Weight",

  "تشخیص رنگ": "Palette",

  "قیمت طلا": "Coins",

  "ماشین حساب": "Calculator",

  "تبدیل تصویر": "Image",

  "تولید QR Code": "QrCode",

  "اسکن QR Code": "ScanLine",

  "رنگ‌ها": "Palette",

  "فاکتور ساز": "ReceiptText",

  "مختصات جغرافیایی": "MapPinned",

  "مترو": "TrainFront",

  "رمزساز": "ShieldCheck",

  "کوتاه کننده لینک": "Link",

  "یادداشت": "FileText",

  "محاسبه تاریخ": "CalendarDays",

  "محاسبه سن": "Cake",

  "اعتبارسنجی کد ملی": "BadgeCheck",
};

/**
 * نقشه slug ابزارها
 */
export const TOOL_SLUGS: Record<
  string,
  string
> = {
  "مترجم متن": "translator",

  "محاسبه BMI": "bmi-calculator",

  "تشخیص رنگ": "image-tools",

  "قیمت طلا": "prices/gold",

  "ماشین حساب": "calculator",

  "تبدیل تصویر": "image-tools",

  "تولید QR Code": "qr-generator",

  "اسکن QR Code": "qr-reader",

  "رنگ‌ها": "colors",

  "فاکتور ساز": "invoice-maker",

  "مختصات جغرافیایی": "coordinates",

  "مترو": "metro",

  "رمزساز": "password-generator",

  "کوتاه کننده لینک": "url-shortener",

  "یادداشت": "notes",

  "محاسبه تاریخ": "date-calculator",

  "محاسبه سن": "age-calculator",

  "اعتبارسنجی کد ملی": "national-code",
};