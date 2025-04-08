import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect, useMemo } from "react";
import { FavoritesContext } from "./FavoritesContext";
export default function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem("favorites");
        return saved ? JSON.parse(saved) : [];
    });
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);
    const value = useMemo(() => ({
        favorites,
        addFavorite: (id) => setFavorites((prev) => [...prev, id]),
        removeFavorite: (id) => setFavorites((prev) => prev.filter((fId) => fId !== id)),
    }), [favorites]);
    return (_jsx(FavoritesContext.Provider, { value: value, children: children }));
}
