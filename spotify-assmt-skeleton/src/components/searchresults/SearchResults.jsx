import React from 'react';
import Tracklist from '../tracklist/Tracklist';
import "./SearchResults.css";

// Instead of using props, use unwrapped operation to obtain individual parameters passed in
function SearchResults({searchResults, onAdd}) {
  
  return (
    <div className="SearchResults">
      <h2>Search Results</h2>      
          <Tracklist 
          searchResults={searchResults}
          isRemoval={false}
          onAdd={onAdd}
          />
    </div>
  )
}

export default SearchResults