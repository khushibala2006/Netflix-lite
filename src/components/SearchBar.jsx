function SearchBar({ searchTerm, onSearch }) {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search for a movie..."
        value={searchTerm}
        onChange={onSearch}
        className="search-input"
      />
    </div>
  );
}

export default SearchBar;