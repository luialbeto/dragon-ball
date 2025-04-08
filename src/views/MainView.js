var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFavorites } from "../contexts/FavoritesContext";
import { fetchCharacters, } from "../services/dragonballApi";
import CharacterCard from "../components/CharacterCard";
import { Spinner } from "../components/Spinner";
import "./MainView.scss";
import dragon from "../assets/dragonBallTitle.png";
var MainView = function () {
    var _a = useState([]), characters = _a[0], setCharacters = _a[1];
    var _b = useState(true), loading = _b[0], setLoading = _b[1];
    var _c = useState(""), searchTerm = _c[0], setSearchTerm = _c[1];
    var _d = useState(false), showFavorites = _d[0], setShowFavorites = _d[1];
    var favorites = useFavorites().favorites;
    var loadCharacters = useCallback(function () {
        var args_1 = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args_1[_i] = arguments[_i];
        }
        return __awaiter(void 0, __spreadArray([], args_1, true), void 0, function (page) {
            var result;
            if (page === void 0) { page = 1; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setLoading(true);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, , 3, 4]);
                        return [4 /*yield*/, fetchCharacters(searchTerm, page, {
                                race: "",
                                gender: "",
                                affiliation: "",
                            })];
                    case 2:
                        result = _a.sent();
                        setCharacters(result.characters);
                        return [3 /*break*/, 4];
                    case 3:
                        setLoading(false);
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }, [searchTerm]);
    useEffect(function () {
        loadCharacters();
    }, [loadCharacters]);
    var filteredCharacters = useMemo(function () {
        return showFavorites
            ? characters.filter(function (c) { return favorites.includes(c.id.toString()); })
            : characters;
    }, [showFavorites, characters, favorites]);
    return (_jsxs("div", { className: "desktop-container", children: [_jsx(motion.header, { initial: { y: -100 }, animate: { y: 0 }, transition: { type: "spring", stiffness: 100, damping: 15, mass: 1 }, children: _jsxs("div", { className: "header-content", children: [_jsx("img", { src: dragon, alt: "dragon-ball-title", className: "header-logo" }), _jsxs("div", { className: "header-controls", children: [_jsx("div", { className: "search-wrapper", children: _jsxs("div", { className: "search-container", children: [_jsx("input", { type: "text", placeholder: "Search characters...", value: searchTerm, onChange: function (e) { return setSearchTerm(e.target.value); }, className: "search-input", "aria-label": "Search characters" }), _jsx("button", { className: "search-button", onClick: function () { return loadCharacters(); }, "aria-label": "Submit search", children: "\uD83D\uDD0D" })] }) }), _jsxs("button", { className: "favorites-toggle ".concat(showFavorites ? "active" : ""), onClick: function () { return setShowFavorites(!showFavorites); }, children: ["\u2764\uFE0F ", favorites.length] })] })] }) }), _jsx("main", { className: "main-content", children: _jsx(AnimatePresence, { mode: "wait", children: loading ? (_jsx(Spinner, {})) : (_jsx(motion.div, { className: "character-grid-container", initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, children: _jsx("div", { className: "character-grid", children: filteredCharacters.map(function (character) { return (_jsx(CharacterCard, { character: character }, character.id)); }) }) })) }) })] }));
};
export default MainView;
