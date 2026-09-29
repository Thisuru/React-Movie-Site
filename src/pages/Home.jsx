import { useState } from "react";
import MovieCards from "../components/MovieCards";
import "../css/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const movies = [
    {
      id: 1,
      title: "The Shawshank Redemption",
      releaseDate: "1994-09-23",
      url: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    },
    {
      id: 2,
      title: "The Godfather",
      releaseDate: "1972-03-14",
      url: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    },
    {
      id: 3,
      title: "The Dark Knight",
      releaseDate: "2008-07-16",
      url: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    },
    {
      id: 4,
      title: "Forrest Gump",
      releaseDate: "1994-07-06",
      url: "https://image.tmdb.org/t/p/w500/saHP97rTPS5eLmrLQEcANmKrsFl.jpg",
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality here
    setSearchQuery("");
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
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      <div className="movies-grid">
        {movies.map(
          (movie) =>
            movie.title.toLowerCase().includes(searchQuery.toLowerCase()) && (
              <MovieCards key={movie.id} movie={movie} />
            ),
        )}
      </div>
    </div>
  );
}

export default Home;
