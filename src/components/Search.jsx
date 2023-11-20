import React from "react";

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
