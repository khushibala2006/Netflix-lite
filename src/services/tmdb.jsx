const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function getPopularMovies(page = 1) {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`
    );

    const data = await response.json();

    return data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
}

export async function searchMovies(searchText) {
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchText}`
    );

    const data = await response.json();

    return data.results;
  } catch (error) {
    console.error("Error searching movies:", error);
    return [];
  }
}