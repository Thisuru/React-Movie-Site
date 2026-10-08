import { Link } from "react-router-dom";
import { useMovieContext } from "../contexts/useMovieContext";
import "../css/Navbar.css";

function NavBar() {
  const { favorites } = useMovieContext();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Movie App</Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/favorites" className="nav-link favorites-link">
          Favorites
          {favorites.length > 0 && (
            <span className="favorites-count" aria-label={`${favorites.length} favorite movies`}>
              {favorites.length}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}

export default NavBar