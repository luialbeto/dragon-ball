import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchCharacterDetails, } from "../services/dragonballApi";
import { Spinner } from "../components/Spinner";
import { useFavorites } from "../contexts/FavoritesContext";
import "./DetailView.scss";
const DetailView = () => {
    const { id } = useParams();
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);
    const { favorites, addFavorite, removeFavorite } = useFavorites();
    useEffect(() => {
        const loadData = async () => {
            try {
                if (id) {
                    const data = await fetchCharacterDetails(Number(id));
                    const extendedData = data;
                    setCharacter({
                        ...extendedData,
                        comics: extendedData.comics || {
                            available: 0,
                            items: [],
                        },
                    });
                }
            }
            catch (error) {
                console.error("Error loading character details:", error);
            }
            finally {
                setLoading(false);
            }
        };
        loadData();
    }, [id]);
    if (loading)
        return _jsx(Spinner, {});
    const handleFavoriteToggle = () => {
        if (!character)
            return;
        const charId = character.id.toString();
        favorites.includes(charId) ? removeFavorite(charId) : addFavorite(charId);
    };
    return (_jsxs("div", { className: "detail-view", children: [_jsx(Link, { to: "/", className: "home-link", children: "\uD83C\uDFE0 Home" }), character && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "character-info", children: [_jsx("img", { src: character.image, alt: character.name }), _jsx("h2", { children: character.name }), _jsx("p", { children: character.description || "No description available" }), _jsx("button", { onClick: handleFavoriteToggle, className: `favorite-btn ${favorites.includes(character.id.toString()) ? "active" : ""}`, children: favorites.includes(character.id.toString())
                                    ? "❤️ Remove Favorite"
                                    : "🤍 Add Favorite" })] }), character.comics && character.comics.available > 0 && (_jsxs("div", { className: "comics-section", children: [_jsxs("h3", { children: ["Appears in ", character.comics.available, " comics:"] }), _jsx("div", { className: "comics-grid", children: character.comics.items.slice(0, 5).map((comic) => (_jsx("div", { className: "comic-item", children: _jsx("p", { children: comic.name }) }, comic.name))) })] }))] }))] }));
};
export default DetailView;
