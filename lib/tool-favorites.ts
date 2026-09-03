export type FavoriteTool = {
  toolName: string;
  toolSlug: string;
  toolIcon: string;
  addedAt: number;
};

const STORAGE_KEY = "favorite_tools";
const FAVORITES_EVENT = "favorite-tools-updated";

export function getFavoriteTools(): FavoriteTool[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed;
  } catch (error) {
    console.error("Error reading favorite tools:", error);
    return [];
  }
}

export function isToolFavorite(toolSlug: string): boolean {
  return getFavoriteTools().some(
    (tool) => tool.toolSlug === toolSlug
  );
}

export function addFavoriteTool(
  tool: Omit<FavoriteTool, "addedAt">
): void {
  const favorites = getFavoriteTools();

  const exists = favorites.some(
    (item) => item.toolSlug === tool.toolSlug
  );

  if (exists) {
    return;
  }

  const newFavorite: FavoriteTool = {
    ...tool,
    addedAt: Date.now(),
  };

  favorites.unshift(newFavorite);

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(favorites)
  );

  window.dispatchEvent(new Event(FAVORITES_EVENT));
}

export function removeFavoriteTool(toolSlug: string): void {
  const favorites = getFavoriteTools();

  const updated = favorites.filter(
    (tool) => tool.toolSlug !== toolSlug
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updated)
  );

  window.dispatchEvent(new Event(FAVORITES_EVENT));
}

export function toggleFavoriteTool(
  tool: Omit<FavoriteTool, "addedAt">
): boolean {
  const isFavorite = isToolFavorite(tool.toolSlug);

  if (isFavorite) {
    removeFavoriteTool(tool.toolSlug);
    return false;
  }

  addFavoriteTool(tool);

  return true;
}

export { FAVORITES_EVENT };