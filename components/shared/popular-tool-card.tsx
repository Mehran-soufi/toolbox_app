import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";

interface PopularToolCardProps {
  name: string;
  description: string;
  href: string;
  icon?: LucideIcon;
  isNew?: boolean;
  gradient: string;
  pictior: any;
}

function PopularToolCard({
  name,
  description,
  href,
  icon: Icon,
  isNew,
  gradient,
  pictior,
}: PopularToolCardProps) {
  return (
    <Link
      href={href}
      className={`
        h-44
        group relative
        rounded-3xl
        p-2
        overflow-hidden
        transition-transform duration-300
        hover:-translate-y-1
      `}
    >
      {isNew && (
        <span className="z-10 absolute top-4 left-4 text-xs font-medium bg-white/20 text-white px-2.5 py-1 rounded-full backdrop-blur-sm">
          جدید
        </span>
      )}
      <div className="absolute inset-0">
        <Image
          src={pictior}
          alt={name}
          fill
          className="
      object-cover
      transition-transform
      duration-500
      group-hover:scale-105
    "
        />
      </div>
      <div
        className="w-full absolute bottom-0 right-0 z-10 p-3 overflow-hidden
      bg-linear-to-t
      from-black/85
      via-black/40
      to-transparent
      dark:from-black/90
      dark:via-black/50
      dark:to-transparent
    "
      >
        <div className="flex flex-col items-start  gap-4 mt-6">
          <div>
            <h3 className="text-white  font-bold text-base">{name}</h3>
            <p className="text-slate-300  text-sm mt-1">{description}</p>
          </div>
        </div>

        <div
          className="w-full flex items-center gap-1 mt-6 text-slate-100 text-sm font-medium
         bg-white/10 rounded-xl px-3 py-2 group-hover:bg-white/20 group-hover:dark:bg-purple-900 transition-colors"
        >
          <ChevronLeft size={16} />
          <span>استفاده کنید</span>
        </div>
      </div>
    </Link>
  );
}

export default PopularToolCard;
