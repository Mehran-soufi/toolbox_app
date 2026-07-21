"use client";

import ToolDesTitle from "@/components/shared/tool-des-title";
import { Button } from "@/components/ui/button";
import { HistoryIcon, Trash2 } from "lucide-react";
import { HistoryItem } from "@/lib/calculator-history";

interface HistoryProps {
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  onClear: () => void;
}

export default function History({ history, onSelect, onClear }: HistoryProps) {
  const clearHistory = () => {
    localStorage.removeItem("calculator-history");
  };

  return (
    <div className="flex h-full flex-col gap-3 select-none">
      <ToolDesTitle icon={HistoryIcon} title="تاریخچه محاسبات" />

      {history.length === 0 ? (
        <div className="flex flex-1 items-center justify-center">
          <p className="text-sm text-violet-500 md:text-base lg:text-lg">
            هنوز محاسباتی انجام نداده‌اید.
          </p>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto pr-1">
            <ul className="flex flex-col gap-2">
              {history.map((item) => (
                <li
                  key={item.id}
                  onClick={() => onSelect(item)}
                  className="
                    cursor-pointer
                    rounded-xl
                    border
                    border-violet-500/20
                    bg-background
                    p-3
                    shadow-[0_0_20px_rgba(139,92,246,.10)]
                    transition-all
                    hover:border-violet-500/40
                    hover:shadow-[0_0_30px_rgba(139,92,246,.18)]
                  "
                >
                  <div className="flex items-center justify-between">
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">
                        {item.expression}
                      </p>

                      <p className="mt-1 text-lg font-bold text-violet-600">
                        = {item.result}
                      </p>
                    </div>

                    <div className="text-[10px] text-muted-foreground">
                      {item.createdAt}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <Button
            variant="outline"
            className="w-full text-violet-600"
            onClick={onClear}
          >
            <Trash2 className="ml-2 h-4 w-4" />
            پاک کردن تاریخچه
          </Button>
        </>
      )}
    </div>
  );
}
