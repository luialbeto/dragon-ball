import { createContext, useContext } from "react";
export var FavoritesContext = createContext({
    favorites: [],
    addFavorite: function () { },
    removeFavorite: function () { },
});
export var useFavorites = function () { return useContext(FavoritesContext); };
