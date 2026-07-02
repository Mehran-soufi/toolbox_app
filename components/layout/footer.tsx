import {
  BanknoteCheck,
  LockKeyhole,
  LucideIcon,
  Smartphone,
  Zap,
} from "lucide-react";

interface footerItemType {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

const footerItem: footerItemType[] = [
  {
    title: "دسترسی در همه جا",
    description: "روی همه دستگاه ها",
    icon: Smartphone,
    color: "text-violet-800",
  },
  {
    title: "امن و خصوصی",
    description: "اطلاعات شما محفوظ است",
    icon: LockKeyhole,
    color: "text-orange-400",
  },
  {
    title: "سریع و کاربردی",
    description: "ابزارهایی برای زندگی بهتر",
    icon: Zap,
    color: "text-red-600",
  },
  {
    title: "رایگان و بدون محدودیت",
    description: "همه ابزارها رایگان هستند",
    icon: BanknoteCheck,
    color: "text-sky-500",
  },
];

function Footer() {
  return (
    <footer className="w-full select-none rounded-xl py-4 px-3 bg-linear-to-b from-violet-600 to-purple-700  ">
      <div className="w-full flex items-center justify-between">
        {footerItem.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              className="flex items-center justify-between gap-x-4 px-1"
              key={index}
            >
              <div className="flex flex-col items-center justify-center gap-y-1">
                <p className="text-white">{item.title}</p>
                <span className="text-sm text-gray-300">
                  {" "}
                  {item.description}
                </span>
              </div>
              <div className="flex items-center justify-center">
                <Icon size={36} className={`${item.color}`} />
              </div>
            </div>
          );
        })}
      </div>
    </footer>
  );
}

export default Footer;
