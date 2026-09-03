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
  const [isFavorite, setIsFavorite] =
    useState(false);

  const [isReady, setIsReady] =
    useState(false);

  useEffect(() => {
    setIsFavorite(isFavoriteTool(toolSlug));
    setIsReady(true);
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