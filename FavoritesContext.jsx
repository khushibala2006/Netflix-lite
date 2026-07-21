import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export function useFavorites() {
  return useContext(FavoritesContext);
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    const savedMovies = localStorage.getItem("favorites");
    return savedMovies ? JSON.parse(savedMovies) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return <FavoritesContext.Provider value={{ favorites, setFavorites }}>{children}</FavoritesContext.Provider>;
}