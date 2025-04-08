var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchCharacterDetails, } from "../services/dragonballApi";
import { Spinner } from "../components/Spinner";
import { useFavorites } from "../contexts/FavoritesContext";
import "./DetailView.scss";
var DetailView = function () {
    var _a, _b;
    var id = useParams().id;
    var _c = useState(null), character = _c[0], setCharacter = _c[1];
    var _d = useState(true), loading = _d[0], setLoading = _d[1];
    var _e = useFavorites(), favorites = _e.favorites, addFavorite = _e.addFavorite, removeFavorite = _e.removeFavorite;
    useEffect(function () {
        var loadData = function () { return __awaiter(void 0, void 0, void 0, function () {
            var data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, 4, 5]);
                        if (!id) return [3 /*break*/, 2];
                        return [4 /*yield*/, fetchCharacterDetails(Number(id))];
                    case 1:
                        data = _a.sent();
                        setCharacter(__assign(__assign({}, data), { comics: data.comics || { available: 0, items: [] } }));
                        _a.label = 2;
                    case 2: return [3 /*break*/, 5];
                    case 3:
                        error_1 = _a.sent();
                        console.error("Error loading character details:", error_1);
                        return [3 /*break*/, 5];
                    case 4:
                        setLoading(false);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        loadData();
    }, [id]);
    if (loading)
        return _jsx(Spinner, {});
    var handleFavoriteToggle = function () {
        if (!character)
            return;
        var charId = character.id.toString();
        favorites.includes(charId) ? removeFavorite(charId) : addFavorite(charId);
    };
    return (_jsxs("div", { className: "detail-view", children: [_jsx(Link, { to: "/", className: "home-link", children: "\uD83C\uDFE0 Home" }), character && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "character-info", children: [_jsx("img", { src: character.image, alt: character.name }), _jsx("h2", { children: character.name }), _jsx("p", { children: character.description || "No description available" }), _jsx("button", { onClick: handleFavoriteToggle, className: "favorite-btn ".concat(favorites.includes(character.id.toString()) ? "active" : ""), children: favorites.includes(character.id.toString())
                                    ? "❤️ Remove Favorite"
                                    : "🤍 Add Favorite" })] }), (((_a = character.comics) === null || _a === void 0 ? void 0 : _a.available) || 0) > 0 && (_jsxs("div", { className: "comics-section", children: [_jsxs("h3", { children: ["Appears in ", character.comics.available, " comics:"] }), _jsx("div", { className: "comics-grid", children: (_b = character.comics.items) === null || _b === void 0 ? void 0 : _b.slice(0, 5).map(function (comic) { return (_jsxs("div", { className: "comic-item", children: [_jsx("p", { children: comic.name }), comic.date && (_jsx("span", { children: new Date(comic.date).getFullYear() }))] }, comic.name)); }) })] }))] }))] }));
};
export default DetailView;
