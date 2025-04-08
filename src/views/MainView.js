import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFavorites } from "../contexts/FavoritesContext";
import { fetchCharacters, } from "../services/dragonballApi";
import CharacterCard from "../components/CharacterCard";
import { Spinner } from "../components/Spinner";
import "./MainView.scss";
import dragon from "../assets/dragonBallTitle.png";
const MainView = () => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [showFavorites, setShowFavorites] = useState(false);
    const { favorites } = useFavorites();
    const loadCharacters = useCallback(async (page = 1) => {
        setLoading(true);
        try {
            const result = await fetchCharacters(searchTerm, page, {
                race: "",
                gender: "",
                affiliation: "",
            });
            setCharacters(result.characters);
        }
        finally {
            setLoading(false);
        }
    }, [searchTerm]);
    useEffect(() => {
        loadCharacters();
    }, [loadCharacters]);
    const filteredCharacters = useMemo(() => {
        return showFavorites
            ? characters.filter((c) => favorites.includes(c.id.toString()))
            : characters;
    }, [showFavorites, characters, favorites]);
    return (_jsxs("div", { className: "desktop-container", children: [_jsx(motion.header, { initial: { y: -100 }, animate: { y: 0 }, transition: { type: "spring", stiffness: 100, damping: 15, mass: 1 }, children: _jsxs("div", { className: "header-content", children: [_jsx("img", { src: dragon, alt: "dragon-ball-title", className: "header-logo" }), _jsxs("div", { className: "header-controls", children: [_jsx("div", { className: "search-wrapper", children: _jsxs("div", { className: "search-container", children: [_jsx("input", { type: "text", placeholder: "Search characters...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "search-input", "aria-label": "Search characters" }), _jsx("button", { className: "search-button", onClick: () => loadCharacters(), "aria-label": "Submit search", children: "\uD83D\uDD0D" })] }) }), _jsxs("button", { className: `favorites-toggle ${showFavorites ? "active" : ""}`, onClick: () => setShowFavorites(!showFavorites), children: ["\u2764\uFE0F ", favorites.length] })] })] }) }), _jsx("main", { className: "main-content", children: _jsx(AnimatePresence, { mode: "wait", children: loading ? (_jsx(Spinner, {})) : (_jsx(motion.div, { className: "character-grid-container", initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, children: _jsx("div", { className: "character-grid", children: filteredCharacters.map((character) => (_jsx(CharacterCard, { character: character }, character.id))) }) })) }) })] }));
};
export default MainView;
