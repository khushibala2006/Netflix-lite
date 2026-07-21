import useDebounce from "./hooks/useDebounce";
import { useEffect, useState, useRef, useCallback } from "react";

import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import MovieGrid from "./components/MovieGrid";
import Loader from "./components/Loader";
import Footer from "./components/Footer";
import Favorites from "./components/Favorites";
import {
  getPopularMovies,
  searchMovies,
} from "./services/tmdb";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

  const observer = useRef(null);
  const debouncedSearch = useDebounce(searchTerm, 500);

  const [favorites, setFavorites] = useState(() => {
  const savedMovies = localStorage.getItem("favorites");
  return savedMovies ? JSON.parse(savedMovies) : [];
  });
  useEffect(() => {
  localStorage.setItem(
    "favorites",
    JSON.stringify(favorites)
  );
}, [favorites]);

  useEffect(() => {
    loadPopularMovies(1);
  }, []);

  useEffect(() => {
    if (debouncedSearch.trim() === "") {
      setMovies([]); 
      setPage(1);
      loadPopularMovies(1);
    } else {
      searchMovieList();
    }
  }, [debouncedSearch]);

  async function loadPopularMovies(pageNumber) {
    setLoading(true);

    const data = await getPopularMovies(pageNumber);

    if (pageNumber === 1) {
      setMovies(data);
    } else {
      setMovies((previousMovies) => {
        const existingMovieIds = new Set(previousMovies.map((movie) => movie.id));
        const newUniqueMovies = data.filter((movie) => !existingMovieIds.has(movie.id));
        return [...previousMovies, ...newUniqueMovies];
      });
    }

    setLoading(false);
  }

  async function searchMovieList() {
    setLoading(true);

    const data = await searchMovies(debouncedSearch);

    setMovies(data);

    setLoading(false);
  }

  function handleSearch(event) {
    setSearchTerm(event.target.value);
  }

  function loadNextPage() {
    if (loading || searchTerm.trim() !== "") {
      return;
    }

    setPage((previousPage) => {
      const nextPage = previousPage + 1;

      loadPopularMovies(nextPage);

      return nextPage;
    });
  }
 const lastMovieRef = useCallback(
  (node) => {
    if (loading) return;

    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver((entries) => {
      if (
        entries[0].isIntersecting &&
        searchTerm.trim() === ""
      ) {
        loadNextPage();
      }
    });

    if (node) {
      observer.current.observe(node);
    }
  },
  [loading, searchTerm, page]
);

function toggleFavorite(movie) {
  const isFavorite = favorites.some((item) => item.id === movie.id);
  if (isFavorite) {
    setFavorites(favorites.filter((item) => item.id !== movie.id));
  } else {
    setFavorites((prevFavorites) => [...prevFavorites, movie]);
  }
}

  return (
    <div className="app">
      <Navbar
        showFavorites={showFavorites}
        setShowFavorites={setShowFavorites}
      />

      <SearchBar
        searchTerm={searchTerm}
        onSearch={handleSearch}
      />

      {showFavorites ? (
        <Favorites
          favoriteMovies={favorites}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
        />
      ) : (
        <>
          <MovieGrid
            movies={movies}
            lastMovieRef={lastMovieRef}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
          {loading && <Loader />}
        </>
      )}

      <Footer />
    </div>
  );
}

export default App;