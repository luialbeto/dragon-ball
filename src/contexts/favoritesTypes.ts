import type { ReactNode } from "react";

export interface FavoritesContextType {
  favorites: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
}

export interface FavoritesProviderProps {
  readonly children: ReactNode;
}