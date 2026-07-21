import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const variants = {
  emerald: {
    icon: "text-emerald-500",
    bg: "bg-emerald-500/10 dark:bg-emerald-500/15",
  },
  blue: {
    icon: "text-sky-500",
    bg: "bg-sky-500/10 dark:bg-sky-500/15",
  },
  purple: {
    icon: "text-violet-500",
    bg: "bg-violet-500/10 dark:bg-violet-500/15",
  },
};

type Variant = keyof typeof variants;

interface ToolTitleProps {
  icon: LucideIcon;
  title: string;
  description: string;
  variant?: Variant;
}

function ToolTitle({
  icon: Icon,
  title,
  description,
  variant = "purple",
}: ToolTitleProps) {
  return (
    <div className="flex w-full select-none items-center justify-center">
      <div className="flex flex-col items-center gap-y-2">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex xl:h-12 lg:h-11 md:h-10 h-8  xl:w-12 lg:w-11 md:w-10 w-8  items-center justify-center rounded-2xl",
              variants[variant].bg,
              variants[variant].icon,
            )}
          >
            <Icon size={22} strokeWidth={2.2} />
          </div>

          <h1 className="text-lg font-bold md:text-xl lg:text-2xl">{title}</h1>
        </div>

        <p className="text-center md:text-sm text-xs text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}

export default ToolTitle;
