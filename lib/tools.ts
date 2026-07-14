import {
    Calculator,
    Calendar,
    Clock,
    FileText,
    Image,
    Link,
    LucideIcon,
    QrCode,
    ScanLine,
    Timer,
    Type,
    Ruler,
    Palette,
    Languages,
    Hash,
    BadgePercent,
    MapPinned,
    ShieldCheck,
    ReceiptText,
    Binary,
    CaseSensitive,
} from "lucide-react";

export interface ToolsType {
    name: string;
    icon: LucideIcon;
    link: string;
    color: string;
}

export const tools: ToolsType[] = [
    {
        name: "ساعت",
        icon: Clock,
        link: "/clock",
        color: "text-indigo-500",
    },
    {
        name: "تایمر",
        icon: Timer,
        link: "/timer",
        color: "text-rose-500",
    },
    {
        name: "ماشین حساب",
        icon: Calculator,
        link: "/calculator",
        color: "text-emerald-500",
    },
    {
        name: "تقویم",
        icon: Calendar,
        link: "/calendar",
        color: "text-orange-500",
    },
    {
        name: "تبدیل واحد",
        icon: Ruler,
        link: "/unit-converter",
        color: "text-sky-500",
    },
    {
        name: "مترجم متن",
        icon: Languages,
        link: "/translator",
        color: "text-violet-500",
    },
    {
        name: "رمزساز",
        icon: ShieldCheck,
        link: "/password-generator",
        color: "text-indigo-600",
    },
    {
        name: "تبدیل تصویر",
        icon: Image,
        link: "/image-tools",
        color: "text-green-500",
    },
    {
        name: "تولید QR Code",
        icon: QrCode,
        link: "/qr-generator",
        color: "text-fuchsia-500",
    },
    {
        name: "اسکن QR Code",
        icon: ScanLine,
        link: "/qr-scanner",
        color: "text-cyan-500",
    },
    {
        name: "کوتاه کننده لینک",
        icon: Link,
        link: "/url-shortener",
        color: "text-blue-500",
    },
    {
        name: "رنگ‌ها",
        icon: Palette,
        link: "/color-tools",
        color: "text-pink-500",
    },
    {
        name: "ویرایش متن",
        icon: Type,
        link: "/text-tools",
        color: "text-amber-500",
    },
    {
        name: "تبدیل اعداد",
        icon: Hash,
        link: "/number-converter",
        color: "text-lime-500",
    },
    {
        name: "تبدیل دودویی",
        icon: Binary,
        link: "/binary-converter",
        color: "text-teal-500",
    },
    {
        name: "تغییر حروف",
        icon: CaseSensitive,
        link: "/text-case",
        color: "text-purple-500",
    },
    {
        name: "محاسبه درصد",
        icon: BadgePercent,
        link: "/percentage",
        color: "text-red-500",
    },
    {
        name: "مختصات جغرافیایی",
        icon: MapPinned,
        link: "/coordinates",
        color: "text-cyan-600",
    },
    {
        name: "یادداشت",
        icon: FileText,
        link: "/notes",
        color: "text-yellow-600",
    },
    {
        name: "فاکتور ساز",
        icon: ReceiptText,
        link: "/invoice-generator",
        color: "text-green-600",
    },
];