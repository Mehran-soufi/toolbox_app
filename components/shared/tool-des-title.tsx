import { LucideIcon } from "lucide-react";

interface TooDesTitleProps {
  icon: LucideIcon;
  title: string;
}

export default function ToolDesTitle({
  icon: Icon,
  title,
}: TooDesTitleProps) {
  return (
    <div
      className="w-full flex items-center justify-start gap-x-2 select-none text-violet-600
      border-b pb-1 mb-2"
    >
      <Icon size={16} />
      <p>{title}</p>
    </div>
  );
}
