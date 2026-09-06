"use client";

import { useEffect, useState } from "react";
import {
  isFavoriteTool,
  toggleFavoriteTool,
} from "@/lib/favorite-tools";

export function useToolFavorite(
  toolName: string,
  toolSlug: string,
  toolIcon: string,
) {
  const [isFavorite, setIsFavorite] = useState<boolean>(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return isFavoriteTool(toolSlug);
  });

  const [isReady] = useState(true);

  useEffect(() => {
    const handleFavoritesUpdate = () => {
      setIsFavorite(isFavoriteTool(toolSlug));
    };

    window.addEventListener(
      "favorite-tools-updated",
      handleFavoritesUpdate,
    );

    return () => {
      window.removeEventListener(
        "favorite-tools-updated",
        handleFavoritesUpdate,
      );
    };
  }, [toolSlug]);

  const toggleFavorite = () => {
    const newState = toggleFavoriteTool(
      toolName,
      toolSlug,
      toolIcon,
    );

    setIsFavorite(newState);

    return newState;
  };

  return {
    isFavorite,
    isReady,
    toggleFavorite,
  };
}
