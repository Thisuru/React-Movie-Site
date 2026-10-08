import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { MovieContext } from "./movieContext";

const STORAGE_KEY = "favorite-movies";

const readFavoritesFromStorage = () => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const savedFavorites = window.localStorage.getItem(STORAGE_KEY);

    if (!savedFavorites) {
      return [];
    }

    const parsedFavorites = JSON.parse(savedFavorites);
    return Array.isArray(parsedFavorites) ? parsedFavorites : [];
  } catch (error) {
    console.error("Failed to read favorite movies from localStorage:", error);
    return [];
  }
};

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => readFavoritesFromStorage());

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    }
  }, [favorites]);

  const addFavorite = useCallback((movie) => {
    if (!movie || !movie.id) {
      return;
    }

    setFavorites((currentFavorites) => {
      const alreadyExists = currentFavorites.some(
        (favoriteMovie) => Number(favoriteMovie.id) === Number(movie.id)
      );

      if (alreadyExists) {
        return currentFavorites;
      }

      return [movie, ...currentFavorites];
    });
  }, []);

  const removeFavorite = useCallback((movieId) => {
    setFavorites((currentFavorites) =>
      currentFavorites.filter(
        (favoriteMovie) => Number(favoriteMovie.id) !== Number(movieId)
      )
    );
  }, []);

  const isFavorite = useCallback(
    (movieId) =>
      favorites.some(
        (favoriteMovie) => Number(favoriteMovie.id) === Number(movieId)
      ),
    [favorites]
  );

  const toggleFavorite = useCallback(
    (movie) => {
      if (!movie) {
        return;
      }

      if (isFavorite(movie.id)) {
        removeFavorite(movie.id);
        return;
      }

      addFavorite(movie);
    },
    [addFavorite, isFavorite, removeFavorite]
  );

  const clearFavorites = useCallback(() => {
    setFavorites([]);
  }, []);

  const value = useMemo(
    () => ({
      favorites,
      addFavorite,
      removeFavorite,
      isFavorite,
      toggleFavorite,
      clearFavorites,
    }),
    [addFavorite, clearFavorites, favorites, isFavorite, removeFavorite, toggleFavorite]
  );

  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
};
