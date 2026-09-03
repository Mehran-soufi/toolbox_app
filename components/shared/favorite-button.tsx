"use client";

import { Heart } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { useToolFavorite } from "@/hooks/use-tool-favorite";

type FavoriteButtonProps = {
  toolName: string;
  toolSlug: string;
  toolIcon: string;
  className?: string;
};

export default function FavoriteButton({
  toolName,
  toolSlug,
  toolIcon,
  className,
}: FavoriteButtonProps) {
  const {
    isFavorite,
    isReady,
    toggleFavorite,
  } = useToolFavorite(
    toolName,
    toolSlug,
    toolIcon,
  );

  const handleToggle = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    event.stopPropagation();

    const newState = toggleFavorite();

    if (newState) {
      toast.success("ابزار به محبوب‌ها اضافه شد");
    } else {
      toast.success("ابزار از محبوب‌ها حذف شد");
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={!isReady}
      aria-label={
        isFavorite
          ? "حذف از محبوب‌ها"
          : "افزودن به محبوب‌ها"
      }
      title={
        isFavorite
          ? "حذف از محبوب‌ها"
          : "افزودن به محبوب‌ها"
      }
      className={cn(
        "flex size-9 shrink-0 items-center justify-center",
        "rounded-xl border transition-all duration-200",
        "disabled:cursor-default disabled:opacity-50",
        isFavorite
          ? [
              "border-rose-200",
              "bg-rose-50",
              "text-rose-500",
              "hover:bg-rose-100",
              "dark:border-rose-900/50",
              "dark:bg-rose-950/30",
              "dark:text-rose-400",
              "dark:hover:bg-rose-950/50",
            ]
          : [
              "border-zinc-200",
              "bg-white/70",
              "text-zinc-400",
              "hover:border-rose-200",
              "hover:bg-rose-50",
              "hover:text-rose-500",
              "dark:border-zinc-800",
              "dark:bg-zinc-900/70",
              "dark:hover:border-rose-900/50",
              "dark:hover:bg-rose-950/30",
              "dark:hover:text-rose-400",
            ],
        className,
      )}
    >
      <Heart
        className={cn(
          "size-4 transition-all duration-200",
          isFavorite && "fill-current",
        )}
      />
    </button>
  );
}