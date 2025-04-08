import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  fetchCharacterDetails,
  type DragonBallCharacter,
} from "../services/dragonballApi";
import { Spinner } from "../components/Spinner";
import { useFavorites } from "../contexts/FavoritesContext";
import "./DetailView.scss";

interface Comics {
  available: number;
  items: { name: string }[];
}

interface ExtendedDragonBallCharacter extends DragonBallCharacter {
  comics?: Comics;
}

const DetailView = () => {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] =
    useState<ExtendedDragonBallCharacter | null>(null);
  const [loading, setLoading] = useState(true);
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  useEffect(() => {
    const loadData = async () => {
      try {
        if (id) {
          const data = await fetchCharacterDetails(Number(id));
          const extendedData = data as ExtendedDragonBallCharacter;
          setCharacter({
            ...extendedData,
            comics: extendedData.comics || {
              available: 0,
              items: [],
            },
          });
        }
      } catch (error) {
        console.error("Error loading character details:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  if (loading) return <Spinner />;

  const handleFavoriteToggle = () => {
    if (!character) return;
    const charId = character.id.toString();
    favorites.includes(charId) ? removeFavorite(charId) : addFavorite(charId);
  };

  return (
    <div className="detail-view">
      <Link to="/" className="home-link">
        🏠 Home
      </Link>

      {character && (
        <>
          <div className="character-info">
            <img src={character.image} alt={character.name} />
            <h2>{character.name}</h2>
            <p>{character.description || "No description available"}</p>
            <button
              onClick={handleFavoriteToggle}
              className={`favorite-btn ${
                favorites.includes(character.id.toString()) ? "active" : ""
              }`}
            >
              {favorites.includes(character.id.toString())
                ? "❤️ Remove Favorite"
                : "🤍 Add Favorite"}
            </button>
          </div>

          {character.comics && character.comics.available > 0 && (
            <div className="comics-section">
              <h3>Appears in {character.comics.available} comics:</h3>
              <div className="comics-grid">
                {character.comics.items.slice(0, 5).map((comic) => (
                  <div key={comic.name} className="comic-item">
                    <p>{comic.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DetailView;
