import React, { useState, useEffect } from "react";
import useSortCoins from "../../hooks/useSortCoins";

export default function Filters({ coins, setCoins, coinsCopy, favorites, showFilters }) {
  const {
    handleSortingByUsdPriseIncreasing,
    handleSortingByUsdPriseDecreasing,
    handleSortByName,
    handleSortByPriceChange5MinIncreasing,
    handleSortByPriceChange5MinDecreasing,
    handleSortByPopularity,
    handleSortByFavorites,
  } = useSortCoins({ coins, setCoins, coinsCopy, favorites });

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sortingOptions = [
    { name: 'Sort price Increasing', handler: handleSortingByUsdPriseIncreasing },
    { name: 'Sort price Decreasing', handler: handleSortingByUsdPriseDecreasing },
    { name: 'Sort by name', handler: handleSortByName },
    { name: 'Sort 24h Increasing', handler: handleSortByPriceChange5MinIncreasing },
    { name: 'Sort 24h Decreasing', handler: handleSortByPriceChange5MinDecreasing },
    { name: 'Sort by Popularity', handler: handleSortByPopularity },
    { name: 'Sort by Favorites', handler: handleSortByFavorites },
  ];

  return (
    <div className="filters" style={{ height: showFilters ? (windowWidth < 600 ? "17vh" : "13vh") : "0px" }}>
      {sortingOptions.map((option, index) => (
        <button key={index} onClick={option.handler}>
          {option.name}
        </button>
      ))}
    </div>
  );
}