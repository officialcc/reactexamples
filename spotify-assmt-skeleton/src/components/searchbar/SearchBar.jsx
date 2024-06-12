import React, { useState } from 'react'
import "./SearchBar.css"
function SearchBar({onSearch}) {

  // Create a state to store what the user is searching for
  const [searchedTerm, setSearchedTerm] = useState("");
  
  // Function handleSearch will trigger onSearch
  function handleSearch(event) {
    event.preventDefault();
    event.stopPropagation();
    onSearch(searchedTerm);
  }
  
  // Function that passes the value from the input to onSearch
  function handleSearchChange(event) {
    setSearchedTerm(event.target.value);
  }

  return (
    <div className="SearchBar">
      <input placeholder="Enter A Song, Album, or Artist" onChange={handleSearchChange} />
      <button className="SearchButton" onClick={handleSearch}>SEARCH</button>
    </div>
  )
}

export default SearchBar