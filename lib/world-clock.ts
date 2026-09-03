export interface WorldClockItem {
  id: number;
  city: string;
  country: string;
  flag: string;
  timeZone: string;
}

export const worldClocks: WorldClockItem[] = [
  {
    id: 1,
    city: "تهران",
    country: "ایران",
    flag: "🇮🇷",
    timeZone: "Asia/Tehran",
  },
  {
    id: 2,
    city: "دبی",
    country: "امارات",
    flag: "🇦🇪",
    timeZone: "Asia/Dubai",
  },
  {
    id: 3,
    city: "استانبول",
    country: "ترکیه",
    flag: "🇹🇷",
    timeZone: "Europe/Istanbul",
  },
  {
    id: 4,
    city: "لندن",
    country: "انگلیس",
    flag: "🇬🇧",
    timeZone: "Europe/London",
  },
  {
    id: 5,
    city: "نیویورک",
    country: "آمریکا",
    flag: "🇺🇸",
    timeZone: "America/New_York",
  },
  {
    id: 6,
    city: "توکیو",
    country: "ژاپن",
    flag: "🇯🇵",
    timeZone: "Asia/Tokyo",
  },
];