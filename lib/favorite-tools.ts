export type FavoriteTool = {
  toolName: string;
  toolSlug: string;
  toolIcon: string;
  addedAt: number;
};

const STORAGE_KEY = "favorite_tools";
const MAX_FAVORITE_TOOLS = 50;

/**
 * دریافت ابزارهای محبوب
 */
export function getFavoriteTools(): FavoriteTool[] {
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

/**
 * ذخیره ابزارهای محبوب
 */
export function saveFavoriteTools(
  favorites: FavoriteTool[],
): void {
  try {
    const limited = favorites.slice(0, MAX_FAVORITE_TOOLS);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(limited),
    );
  } catch (error) {
    console.error("Error saving favorite tools:", error);
  }
}

/**
 * اضافه کردن ابزار به محبوب‌ها
 */
export function addFavoriteTool(
  toolName: string,
  toolSlug: string,
  toolIcon: string,
): void {
  const favorites = getFavoriteTools();

  // اگر قبلاً وجود دارد، دوباره اضافه نشود
  const exists = favorites.some(
    (item) => item.toolSlug === toolSlug,
  );

  if (exists) {
    return;
  }

  const newFavorite: FavoriteTool = {
    toolName,
    toolSlug,
    toolIcon,
    addedAt: Date.now(),
  };

  favorites.unshift(newFavorite);

  saveFavoriteTools(favorites);
}

/**
 * حذف ابزار از محبوب‌ها
 */
export function removeFavoriteTool(
  toolSlug: string,
): void {
  const favorites = getFavoriteTools();

  const filtered = favorites.filter(
    (item) => item.toolSlug !== toolSlug,
  );

  saveFavoriteTools(filtered);
}

/**
 * بررسی محبوب بودن یک ابزار
 */
export function isFavoriteTool(
  toolSlug: string,
): boolean {
  const favorites = getFavoriteTools();

  return favorites.some(
    (item) => item.toolSlug === toolSlug,
  );
}

/**
 * تغییر وضعیت محبوب بودن ابزار
 */
export function toggleFavoriteTool(
  toolName: string,
  toolSlug: string,
  toolIcon: string,
): boolean {
  const isFavorite = isFavoriteTool(toolSlug);

  if (isFavorite) {
    removeFavoriteTool(toolSlug);
    return false;
  }

  addFavoriteTool(
    toolName,
    toolSlug,
    toolIcon,
  );

  return true;
}

/**
 * پاک کردن تمام محبوب‌ها
 */
export function clearFavoriteTools(): void {
  saveFavoriteTools([]);
}