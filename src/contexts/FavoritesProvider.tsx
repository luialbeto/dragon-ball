import { useState, useEffect, useMemo } from "react";
import { FavoritesContext } from "./FavoritesContext";
import type {
  FavoritesContextType,
  FavoritesProviderProps,
} from "./favoritesTypes.ts";

export default function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const value = useMemo<FavoritesContextType>(
    () => ({
      favorites,
      addFavorite: (id: string) => setFavorites((prev) => [...prev, id]),
      removeFavorite: (id: string) =>
        setFavorites((prev) => prev.filter((fId) => fId !== id)),
    }),
    [favorites]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}
