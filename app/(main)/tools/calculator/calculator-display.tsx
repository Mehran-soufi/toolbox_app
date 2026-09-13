import { formatNumber } from "@/lib/format-number";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface CalculatorDisplayProps {
  expression: string;
  result: string;
  calculated: boolean;
  onClear: () => void;
}

export function formatExpression(value: string) {
  return value.replace(
    /\d+/g,
    (number) => Number(number).toLocaleString()
  );
}

export default function CalculatorDisplay({
  expression,
  result,
  calculated,
  onClear,
}: CalculatorDisplayProps) {
  return (
    <div
      className="
w-full
lg:h-28
md:h-24
h-20
rounded-2xl
border
border-violet-500/20
bg-background
p-4
shadow-[0_0_30px_rgba(139,92,246,.12)]
"
    >
      <div className="flex items-center justify-between">
        <div
          className="
flex-1
h-full
overflow-hidden
flex
flex-col
justify-center
"
        >
       <p className="truncate md:text-sm text-xs text-muted-foreground">
  {calculated ? formatExpression(expression) : ""}
</p>


<h2 className="truncate lg:text-4xl text-3xl font-bold" >
  {
    calculated
      ? formatNumber(result)
      : formatExpression(expression || "0")
  }
</h2>
        </div>
        <Button size="icon" variant="ghost" onClick={onClear}>
          <RotateCcw size={18} />
        </Button>
      </div>
    </div>
  );
}
