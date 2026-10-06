import { useCallback, useEffect, useState } from "react";
import MovieCards from "../components/MovieCards";
import { getPopularMovies, searchMovies } from "../services/api";
import "../css/Home.css";

const normalizeMovie = (movie) => ({
  id: movie.id,
  title: movie.title || movie.original_title || "Untitled",
  releaseDate: movie.release_date || "N/A",
  url: movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "",
});

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMovies = useCallback(async (query = "") => { 
    setLoading(true);
    setError("");

    try {
      const results = query.trim()
        ? await searchMovies(query)
        : await getPopularMovies();

      setMovies(results.map(normalizeMovie));
    } catch (err) {
      console.error(err);
      setError("Unable to load movies right now. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void (async () => {
      await fetchMovies();
    })();
  }, [fetchMovies]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    await fetchMovies(searchQuery);
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button" disabled={loading}>
          {loading ? "Loading..." : "Search"}
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}

      {!loading && !error && (
        <div className="movies-grid">
          {movies.length > 0 ? (
            movies.map((movie) => <MovieCards key={movie.id} movie={movie} />)
          ) : (
            <p>No movies found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
