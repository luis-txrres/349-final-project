
const SearchBar = ({ setQuery }) => {
  return (
    <div className="book-search-bar">
      <input
        type="search"
        placeholder="Search Books"
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;


