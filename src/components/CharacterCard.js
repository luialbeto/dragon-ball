import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useFavorites } from "../contexts/FavoritesContext";
import { Link } from "react-router-dom";
import "./CharacterCard.scss";
var CharacterCard = function (_a) {
    var character = _a.character;
    var _b = useFavorites(), favorites = _b.favorites, addFavorite = _b.addFavorite, removeFavorite = _b.removeFavorite;
    var isFavorite = favorites.includes(character.id.toString());
    var handleFavorite = function (e) {
        e.preventDefault();
        if (isFavorite) {
            removeFavorite(character.id.toString());
        }
        else {
            addFavorite(character.id.toString());
        }
    };
    return (_jsxs(Link, { to: "/character/".concat(character.id), className: "character-card", children: [_jsx("img", { src: character.image, alt: character.name, className: "character-image", loading: "lazy", onError: function (e) {
                    e.currentTarget.src = "/path-to-fallback-image.jpg";
                } }), _jsxs("div", { className: "character-info", children: [_jsx("h3", { className: "character-name", children: character.name }), _jsxs("p", { className: "character-ki", children: ["KI: ", character.ki] })] }), _jsx("button", { onClick: handleFavorite, className: "favorite-btn ".concat(isFavorite ? "active" : ""), "aria-label": isFavorite ? "Remove favorite" : "Add favorite", children: isFavorite ? "❤️" : "🤍" })] }));
};
export default CharacterCard;
