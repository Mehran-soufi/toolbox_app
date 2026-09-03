import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  Snowflake,
  Sun,
} from "lucide-react";

export const weatherCode = {
  0: {
    title: "صاف",
    icon: Sun,
    color: "text-yellow-400",
  },

  1: {
    title: "کمی ابری",
    icon: CloudSun,
    color: "text-orange-300",
  },

  2: {
    title: "نیمه ابری",
    icon: CloudSun,
    color: "text-sky-400",
  },

  3: {
    title: "ابری",
    icon: Cloud,
    color: "text-gray-400",
  },

  45: {
    title: "مه",
    icon: CloudFog,
    color: "text-slate-400",
  },

  48: {
    title: "مه یخ‌زن",
    icon: CloudFog,
    color: "text-slate-300",
  },

  51: {
    title: "نم‌نم باران",
    icon: CloudDrizzle,
    color: "text-blue-300",
  },

  53: {
    title: "نم‌نم باران",
    icon: CloudDrizzle,
    color: "text-blue-400",
  },

  55: {
    title: "نم‌نم باران شدید",
    icon: CloudDrizzle,
    color: "text-blue-500",
  },

  56: {
    title: "نم‌نم باران یخ‌زن",
    icon: CloudDrizzle,
    color: "text-cyan-300",
  },

  57: {
    title: "نم‌نم باران یخ‌زن شدید",
    icon: CloudDrizzle,
    color: "text-cyan-400",
  },

  61: {
    title: "بارانی",
    icon: CloudRain,
    color: "text-blue-400",
  },

  63: {
    title: "باران",
    icon: CloudRain,
    color: "text-blue-500",
  },

  65: {
    title: "باران شدید",
    icon: CloudRain,
    color: "text-blue-600",
  },

  66: {
    title: "باران یخ‌زن",
    icon: CloudRain,
    color: "text-cyan-400",
  },

  67: {
    title: "باران یخ‌زن شدید",
    icon: CloudRain,
    color: "text-cyan-500",
  },

  71: {
    title: "برفی",
    icon: Snowflake,
    color: "text-cyan-300",
  },

  73: {
    title: "برف",
    icon: CloudSnow,
    color: "text-cyan-400",
  },

  75: {
    title: "برف شدید",
    icon: CloudSnow,
    color: "text-cyan-500",
  },

  77: {
    title: "دانه‌های برف",
    icon: Snowflake,
    color: "text-sky-300",
  },

  80: {
    title: "رگبار باران",
    icon: CloudRain,
    color: "text-blue-400",
  },

  81: {
    title: "رگبار باران",
    icon: CloudRain,
    color: "text-blue-500",
  },

  82: {
    title: "رگبار شدید",
    icon: CloudRain,
    color: "text-blue-600",
  },

  85: {
    title: "رگبار برف",
    icon: CloudSnow,
    color: "text-cyan-400",
  },

  86: {
    title: "رگبار شدید برف",
    icon: CloudSnow,
    color: "text-cyan-500",
  },

  95: {
    title: "رعد و برق",
    icon: CloudLightning,
    color: "text-purple-400",
  },

  96: {
    title: "رعد و برق همراه با تگرگ",
    icon: CloudLightning,
    color: "text-purple-500",
  },

  99: {
    title: "رعد و برق شدید همراه با تگرگ",
    icon: CloudLightning,
    color: "text-purple-600",
  },
} as const;