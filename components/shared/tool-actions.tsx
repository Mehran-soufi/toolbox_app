"use client";

import { useEffect, useState } from "react";

import {
  Check,
  Heart,
  Share2,
} from "lucide-react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import {
  isToolFavorite,
  toggleFavoriteTool,
  FAVORITES_EVENT,
} from "@/lib/tool-favorites";

interface ToolActionsProps {
  toolName: string;
  toolSlug: string;
  toolIcon: string;
}

export default function ToolActions({
  toolName,
  toolSlug,
  toolIcon,
}: ToolActionsProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  useEffect(() => {
    setIsFavorite(isToolFavorite(toolSlug));

    const handleFavoritesUpdate = () => {
      setIsFavorite(isToolFavorite(toolSlug));
    };

    window.addEventListener(
      FAVORITES_EVENT,
      handleFavoritesUpdate
    );

    return () => {
      window.removeEventListener(
        FAVORITES_EVENT,
        handleFavoritesUpdate
      );
    };
  }, [toolSlug]);

  const handleFavorite = () => {
    const newState = toggleFavoriteTool({
      toolName,
      toolSlug,
      toolIcon,
    });

    setIsFavorite(newState);

    if (newState) {
      toast.success("ابزار به محبوب‌ها اضافه شد");
    } else {
      toast.success("ابزار از محبوب‌ها حذف شد");
    }
  };

  const handleShare = async () => {
  const url = window.location.href;

  try {
    // موبایل / مرورگرهایی که Web Share API را پشتیبانی می‌کنند
    if (
      typeof navigator.share === "function" &&
      /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
    ) {
      await navigator.share({
        title: toolName,
        text: `مشاهده ابزار ${toolName}`,
        url,
      });

      toast.success("ابزار با موفقیت به اشتراک گذاشته شد");
      return;
    }

    // دسکتاپ و مرورگرهای بدون Share مناسب
    await navigator.clipboard.writeText(url);

    toast.success("لینک ابزار کپی شد");
  } catch (error) {
    // اگر کاربر پنجره Share را بست
    if (
      error instanceof DOMException &&
      error.name === "AbortError"
    ) {
      return;
    }

    // روش جایگزین برای Clipboard API
    try {
      const textarea = document.createElement("textarea");

      textarea.value = url;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      textarea.style.pointerEvents = "none";

      document.body.appendChild(textarea);

      textarea.focus();
      textarea.select();

      const copied = document.execCommand("copy");

      document.body.removeChild(textarea);

      if (copied) {
        toast.success("لینک ابزار کپی شد");
      } else {
        toast.error("کپی لینک امکان‌پذیر نبود");
      }
    } catch {
      toast.error("کپی لینک امکان‌پذیر نبود");
    }
  }
};

  return (
    <div className="flex items-center gap-2">
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleFavorite}
        className={
          isFavorite
            ? "border-rose-200 bg-rose-50 text-rose-500 hover:bg-rose-100 hover:text-rose-600 dark:border-rose-900/50 dark:bg-rose-950/20 dark:text-rose-400 dark:hover:bg-rose-950/40"
            : ""
        }
      >
        {isFavorite ? (
          <Check className="size-4" />
        ) : (
          <Heart className="size-4" />
        )}

        <span className="hidden sm:inline">
          {isFavorite
            ? "در محبوب‌ها"
            : "افزودن به محبوب‌ها"}
        </span>
      </Button>

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleShare}
        disabled={isSharing}
      >
        <Share2 className="size-4" />

        <span className="hidden sm:inline">
          اشتراک‌گذاری
        </span>
      </Button>
    </div>
  );
}