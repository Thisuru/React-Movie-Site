import "../css/MovieCard.css"
import { useMovieContext } from "../contexts/useMovieContext"

const MovieCards = ({ movie }) => {
  const { title, releaseDate, url } = movie || {}
  const { isFavorite, toggleFavorite } = useMovieContext()
  const isMovieFavorite = isFavorite(movie?.id)

  function onFavoriteClick() {
    toggleFavorite(movie)
  }

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img src={url} alt={title} className="movie-poster-image" />
        <div className="movie-overlay">
          <button
            type="button"
            className={`favorite-button ${isMovieFavorite ? "active" : ""}`}
            onClick={onFavoriteClick}
            aria-label={isMovieFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {isMovieFavorite ? "♥" : "♡"}
          </button>
        </div>
      </div>

      <div className="movie-info">
        <h3>{title}</h3>
        <p>{releaseDate?.split("-")[0]}</p>
      </div>
    </div>
  )
}

export default MovieCards
