function SearchBar( {searchText, handleSearch} ) {
    return (
      <div className="search flex justify-end">
        <input 
          type="text" 
          value={searchText}
          className="searchTerm"
          placeholder="Search by title..."
          onChange={(e) => handleSearch(e.target.value)} />
      </div>
    );
  }
  
  export default SearchBar;

