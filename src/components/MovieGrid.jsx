import MovieCard from "./MovieCard";

function MovieGrid({
  movies,
  lastMovieRef,
  favorites,
  toggleFavorite,
}) {
  if (movies.length === 0) {
    return <h2>No movies found.</h2>;
  }

  return (
    <div className="movie-grid">
      {movies.map((movie, index) => {
        const isLastElement = index === movies.length - 1;
        return <MovieCard
          key={movie.id}
          ref={isLastElement ? lastMovieRef : null}
          movie={movie}
          favorites={favorites}
          toggleFavorite={toggleFavorite} />;
      })}
    </div>
  );
}

export default MovieGrid;