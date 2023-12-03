import React from "react";
// this is the search component that will be used to search for coins
export default function Search({ searchInput, setSearchInput }) {
  return (
    <input
      className="inputSearch"
      placeholder="Search for a coin..."
      value={searchInput}
      onChange={(e) => setSearchInput(e.target.value)}
      type="text"
    />
  );
}
