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
    <footer
      className="w-full select-none rounded-xl xl:py-3 lg:py-2 py-1 xl:px-3 lg:px-2 px-1.5 my-2
    
     border
border-violet-500/20
bg-background
shadow-[0_0_30px_rgba(139,92,246,.12)]"
    >
      <div className="w-full flex xl:flex-row flex-col items-center justify-between gap-x-8">
        {footerItem.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              className="flex w-full xl:w-auto flex-1 items-center justify-between py-3 xl:py-0 xl:pl-4
               border-b xl:border-b-0 xl:border-l border-sky-700 last:border-none"
              key={index}
            >
              <div className="flex flex-col items-center justify-center gap-y-1">
                <p className="md:text-base text-sm">{item.title}</p>
                <span className="md:text-sm text-xs text-gray-500">
                  {item.description}
                </span>
              </div>
              <div className="flex items-center justify-center">
                <Icon size={25} className={`${item.color}`} />
              </div>
            </div>
          );
        })}
      </div>
    </footer>
  );
}

export default Footer;
