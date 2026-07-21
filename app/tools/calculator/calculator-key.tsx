import { Button } from "@/components/ui/button";
import { Delete } from "lucide-react";
import { CalculatorKey } from "@/lib/calculator-data";
import { cn } from "@/lib/utils";

interface Props {
  item: CalculatorKey;
  onClick: (value: string) => void;
}

export default function CalculatorKeyButton({ item, onClick }: Props) {
  return (
    <Button
      variant="outline"
      onClick={() => onClick(item.value)}
      className={cn(
        "h-full rounded-xl transition-all duration-200 active:scale-95",

        item.type === "number" && "hover:bg-muted",

        item.type === "operator" &&
          "bg-violet-500/10 text-violet-500 hover:bg-violet-500/20",

        item.type === "equal" && "bg-violet-600 text-white hover:bg-violet-700",

        item.type === "action" &&
          "bg-orange-500/10 text-orange-500 hover:bg-orange-500/20",
      )}
    >
      {item.value === "backspace" ? <Delete size={18} /> : item.label}
    </Button>
  );
}
