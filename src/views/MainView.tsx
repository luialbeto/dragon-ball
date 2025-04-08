import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFavorites } from "../contexts/FavoritesContext";
import {
  fetchCharacters,
  type DragonBallCharacter,
} from "../services/dragonballApi";
import CharacterCard from "../components/CharacterCard";
import { Spinner } from "../components/Spinner";
import "./MainView.scss";
import dragon from "../assets/dragonBallTitle.png";

const MainView = () => {
  const [characters, setCharacters] = useState<DragonBallCharacter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);
  const { favorites } = useFavorites();

  const loadCharacters = useCallback(
    async (page = 1) => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchCharacters(searchTerm, page, {
          race: "",
          gender: "",
          affiliation: "",
        });
        setCharacters(result.characters);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load characters. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    },
    [searchTerm]
  );

  useEffect(() => {
    loadCharacters();
  }, [loadCharacters]);

  const filteredCharacters = useMemo(() => {
    return showFavorites
      ? characters.filter((c) => favorites.includes(c.id.toString()))
      : characters;
  }, [showFavorites, characters, favorites]);

  return (
    <div className="desktop-container">
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 15, mass: 1 }}
      >
        <div className="header-content">
          <img src={dragon} alt="dragon-ball-title" className="header-logo" />
          <div className="header-controls">
            <div className="search-wrapper">
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search characters..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                  aria-label="Search characters"
                />
                <button
                  className="search-button"
                  onClick={() => loadCharacters()}
                  aria-label="Submit search"
                >
                  🔍
                </button>
              </div>
            </div>
            <button
              className={`favorites-toggle ${showFavorites ? "active" : ""}`}
              onClick={() => setShowFavorites(!showFavorites)}
            >
              ❤️ {favorites.length}
            </button>
          </div>
        </div>
      </motion.header>

      <main className="main-content">
        <AnimatePresence mode="wait">
          {loading ? (
            <Spinner />
          ) : error ? (
            <div className="error-message">
              {error}
              <button onClick={() => loadCharacters()}>Retry</button>
            </div>
          ) : (
            <motion.div
              className="character-grid-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="character-grid">
                {filteredCharacters.map((character) => (
                  <CharacterCard key={character.id} character={character} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default MainView;
