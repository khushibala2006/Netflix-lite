import MovieGrid from "./MovieGrid";

function Favorites({
  favoriteMovies,
  favorites,
  toggleFavorite,
}) {
  return (
    <div className="favorites">
      <h2>Your Favorites</h2>
      <MovieGrid
        movies={favoriteMovies}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
      />
    </div>
  );
}

export default Favorites;