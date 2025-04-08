import { useFavorites } from "../contexts/FavoritesContext";
import { Link } from "react-router-dom";
import { DragonBallCharacter } from "../services/dragonballApi";
import "./CharacterCard.scss";

interface CharacterCardProps {
  character: DragonBallCharacter;
}

const CharacterCard = ({ character }: CharacterCardProps) => {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const isFavorite = favorites.includes(character.id.toString());

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isFavorite) {
      removeFavorite(character.id.toString());
    } else {
      addFavorite(character.id.toString());
    }
  };

  return (
    <Link to={`/character/${character.id}`} className="character-card">
      <img
        src={character.image}
        alt={character.name}
        className="character-image"
        loading="lazy"
        onError={(e) => {
          e.currentTarget.src = "/path-to-fallback-image.jpg";
        }}
      />
      <div className="character-info">
        <h3 className="character-name">{character.name}</h3>
        <p className="character-ki">KI: {character.ki}</p>
      </div>
      <button
        onClick={handleFavorite}
        className={`favorite-btn ${isFavorite ? "active" : ""}`}
        aria-label={isFavorite ? "Remove favorite" : "Add favorite"}
      >
        {isFavorite ? "❤️" : "🤍"}
      </button>
    </Link>
  );
};

export default CharacterCard;
