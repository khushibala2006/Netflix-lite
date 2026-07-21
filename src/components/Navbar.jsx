function Navbar({ showFavorites, setShowFavorites }) {
  return (
    <header className="navbar">
      <h1 className="logo">🎬 Netflix Lite</h1>

      <button
        className="favorite-btn"
        onClick={() => setShowFavorites(!showFavorites)}
      >
        {showFavorites ? "🎬 Home" : "❤️ Favorites"}
      </button>
    </header>
  );
}

export default Navbar;