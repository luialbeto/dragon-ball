import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FavoritesProvider from "@/contexts/FavoritesProvider";
import MainView from "@/views/MainView";
import DetailView from "@/views/DetailView";
import ErrorBoundary from "@/components/ErrorBoundary";
export default function App() {
    return (_jsx(ErrorBoundary, { children: _jsx(FavoritesProvider, { children: _jsx(BrowserRouter, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(MainView, {}) }), _jsx(Route, { path: "/character/:id", element: _jsx(DetailView, {}) })] }) }) }) }));
}
