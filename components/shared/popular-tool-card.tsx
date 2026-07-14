import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface PopularToolCardProps {
  name: string;
  description: string;
  href: string;
  icon: LucideIcon;
  isNew?: boolean;
  gradient: string;
}

function PopularToolCard({
  name,
  description,
  href,
  icon: Icon,
  isNew,
  gradient,
}: PopularToolCardProps) {
  return (
    <Link
      href={href}
      className={`
        w-[22%]
        h-48
        group relative
        rounded-3xl
        p-5
        overflow-hidden
        bg-linear-to-br ${gradient}
        transition-transform duration-300
        hover:-translate-y-1
      `}
    >
      {isNew && (
        <span className="absolute top-4 right-4 text-xs font-medium bg-white/20 text-white px-2.5 py-1 rounded-full backdrop-blur-sm">
          جدید
        </span>
      )}

      <div className="flex flex-col items-start gap-4 mt-6">
        <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center backdrop-blur-sm">
          <Icon size={28} className="text-white" />
        </div>

        <div>
          <h3 className="text-white font-bold text-base">{name}</h3>
          <p className="text-white/70 text-sm mt-1">{description}</p>
        </div>
      </div>

      <div className="flex items-center gap-1 mt-6 text-white/90 text-sm font-medium bg-white/10 rounded-xl px-3 py-2 w-fit group-hover:bg-white/20 transition-colors">
        <ChevronLeft size={16} />
        <span>استفاده کنید</span>
      </div>
    </Link>
  );
}

export default PopularToolCard;