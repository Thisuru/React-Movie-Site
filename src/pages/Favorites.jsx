import "../css/Favorites.css"
import MovieCards from "../components/MovieCards"
import { useMovieContext } from "../contexts/useMovieContext"

const Favorites = () => {
  const { favorites } = useMovieContext()

  if (!favorites.length) {
    return (
      <div className="favorites-empty">
        <h2>No Favorite Movies Yet</h2>
        <p>Start adding movies to your favorites and they will appear here!</p>
      </div>
    )
  }

  return (
    <div className="favorites">
      <h2>Your Favorite Movies</h2>
      <div className="movies-grid">
        {favorites.map((movie) => (
          <MovieCards key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}

export default Favorites