import { createContext, useContext } from "react";
import type { FavoritesContextType } from "./favoritesTypes";

export const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
});

export const useFavorites = () => useContext(FavoritesContext);
