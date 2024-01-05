// Import necessary modules from React and custom hooks
import React, { useState, useEffect } from "react";
import useSortCoins from "../../hooks/useSortCoins";

// Define the Filters component
export default function Filters({ coins, setCoins, coinsCopy, favorites, showFilters }) {
  // Destructure the sorting handlers from the useSortCoins hook
  const {
    handleSortingByUsdPriseIncreasing,
    handleSortingByUsdPriseDecreasing,
    handleSortByName,
    handleSortByPriceChange5MinIncreasing,
    handleSortByPriceChange5MinDecreasing,
    removeFilters,
    handleSortByFavorites,
  } = useSortCoins({ coins, setCoins, coinsCopy, favorites });

  // State for storing the window width
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Effect for updating the window width state when the window is resized
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Define the sorting options
  const sortingOptions = [
    { name: 'Sort price Increasing', handler: handleSortingByUsdPriseIncreasing },
    { name: 'Sort price Decreasing', handler: handleSortingByUsdPriseDecreasing },
    { name: 'Sort by name', handler: handleSortByName },
    { name: 'Sort 5min Increasing', handler: handleSortByPriceChange5MinIncreasing },
    { name: 'Sort 5min Decreasing', handler: handleSortByPriceChange5MinDecreasing },
    { name: 'Sort by Favorites', handler: handleSortByFavorites },
    { name: 'Remove filters', handler: removeFilters },
  ];

  // Render the Filters component
  return (
    <div className="filters" style={{ height: showFilters ? (windowWidth < 600 ? "17vh" : "7vh") : "0px" }}>
      {sortingOptions.map((option, index) => (
        <button key={index} onClick={option.handler}>
          {option.name}
        </button>
      ))}
    </div>
  );
}