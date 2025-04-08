import { BrowserRouter, Route, Routes } from "react-router-dom";
import FavoritesProvider from "@/contexts/FavoritesProvider";
import MainView from "@/views/MainView";
import DetailView from "@/views/DetailView";
import ErrorBoundary from "@/components/ErrorBoundary";

export default function App() {
  return (
    <ErrorBoundary>
      <FavoritesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainView />} />
            <Route path="/character/:id" element={<DetailView />} />
          </Routes>
        </BrowserRouter>
      </FavoritesProvider>
    </ErrorBoundary>
  );
}
