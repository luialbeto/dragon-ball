import { createContext, useContext } from "react";
export const FavoritesContext = createContext({
    favorites: [],
    addFavorite: () => { },
    removeFavorite: () => { },
});
export const useFavorites = () => useContext(FavoritesContext);
