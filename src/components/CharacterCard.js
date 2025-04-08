import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useFavorites } from "../contexts/FavoritesContext";
import { Link } from "react-router-dom";
import "./CharacterCard.scss";
const CharacterCard = ({ character }) => {
    const { favorites, addFavorite, removeFavorite } = useFavorites();
    const isFavorite = favorites.includes(character.id.toString());
    const handleFavorite = (e) => {
        e.preventDefault();
        if (isFavorite) {
            removeFavorite(character.id.toString());
        }
        else {
            addFavorite(character.id.toString());
        }
    };
    return (_jsxs(Link, { to: `/character/${character.id}`, className: "character-card", children: [_jsx("img", { src: character.image, alt: character.name, className: "character-image", loading: "lazy", onError: (e) => {
                    e.currentTarget.src = "/path-to-fallback-image.jpg";
                } }), _jsxs("div", { className: "character-info", children: [_jsx("h3", { className: "character-name", children: character.name }), _jsxs("p", { className: "character-ki", children: ["KI: ", character.ki] })] }), _jsx("button", { onClick: handleFavorite, className: `favorite-btn ${isFavorite ? "active" : ""}`, "aria-label": isFavorite ? "Remove favorite" : "Add favorite", children: isFavorite ? "❤️" : "🤍" })] }));
};
export default CharacterCard;
