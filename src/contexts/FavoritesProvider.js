var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect, useMemo } from "react";
import { FavoritesContext } from "./FavoritesContext";
export function FavoritesProvider(_a) {
    var children = _a.children;
    var _b = useState(function () {
        var saved = localStorage.getItem("favorites");
        return saved ? JSON.parse(saved) : [];
    }), favorites = _b[0], setFavorites = _b[1];
    useEffect(function () {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);
    var value = useMemo(function () { return ({
        favorites: favorites,
        addFavorite: function (id) { return setFavorites(function (prev) { return __spreadArray(__spreadArray([], prev, true), [id], false); }); },
        removeFavorite: function (id) {
            return setFavorites(function (prev) { return prev.filter(function (fId) { return fId !== id; }); });
        },
    }); }, [favorites]);
    return (_jsx(FavoritesContext.Provider, { value: value, children: children }));
}
