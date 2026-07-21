import { LucideIcon } from "lucide-react";
import ToolDesTitle from "./tool-des-title";

export interface ToolContentItem {
  title: string;

  content: string;

  icon: LucideIcon;
}

interface ToolContentProps {
  title: string;

  icon: LucideIcon;

  items: ToolContentItem[];
}

export default function ToolContent({
  title,

  icon,

  items,
}: ToolContentProps) {
  return (
    <div className="w-full flex flex-col gap-4">
      <ToolDesTitle icon={icon} title={title} />

      <div
        className="
        grid
        md:grid-cols-2
        grid-cols-1
        gap-3
        "
      >
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="
                rounded-xl
                border
                border-violet-500/20
                bg-background
                p-4
                shadow-[0_0_25px_rgba(139,92,246,.08)]
                "
            >
              <div
                className="
                  flex
                  items-center
                  gap-2
                  mb-3
                  text-violet-600
                  "
              >
                <Icon size={20} />

                <h3
                  className="
                    font-bold
                  "
                >
                  {item.title}
                </h3>
              </div>

              <p
                className="
                  text-sm
                  leading-7
                  text-muted-foreground
                  "
              >
                {item.content}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
