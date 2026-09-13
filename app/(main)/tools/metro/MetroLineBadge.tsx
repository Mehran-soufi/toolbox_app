import { metroLines } from "@/lib/metro/lines";
import { cn } from "@/lib/utils";

interface MetroLineBadgeProps {
  lineId: number;
}

export default function MetroLineBadge({
  lineId,
}: MetroLineBadgeProps) {
  const line = metroLines.find((item) => item.id === lineId);

  if (!line) return null;

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center",
        "rounded-full",
        "px-2 py-0.5",
        "text-[10px] font-medium",
        "text-white",

      )}
      style={{
    backgroundColor: line.color
}}
    >
      {line.name}
    </span>
  );
}