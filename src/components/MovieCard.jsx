import { forwardRef } from "react";

const MovieCard = forwardRef(({
  movie,
  favorites,
  toggleFavorite,
}, ref) => {
  const imageUrl =
    `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  const isFavorite = favorites.some(
    (item) => item.id === movie.id
  );

  return (
    <div className="movie-card" ref={ref}>
      <img
        src={imageUrl}
        alt={movie.title}
        className="movie-poster"
        loading="lazy"
      />

      <div className="movie-info">
        <h3>{movie.title}</h3>

        <p>
          {movie.release_date?.slice(0, 4)}
        </p>

        <p>⭐ {movie.vote_average.toFixed(1)}</p>

        <button
          className="favorite-button"
          onClick={() => toggleFavorite(movie)}
        >
          {isFavorite ? "❤️ Remove" : "🤍 Favorite"}
        </button>
      </div>
    </div>
  );
}
);

export default MovieCard;