import React from "react";
import useSortCoins from "../../hooks/useSortCoins";

// component to filter the coins based on the current state
export default function Filters({ coins, setCoins, coinsCopy }) {
  // Destructuring the sorting functions from the custom hook
  const {
    handleSortingByUsdPriseIncreasing,
    handleSortingByUsdPriseDecreasing,
    handleSortByName,
    handleSortByPriceChange5MinIncreasing,
    handleSortByPriceChange5MinDecreasing,
    handleSortByPopularity,
  } = useSortCoins({ coins, setCoins, coinsCopy });

  return (
    <div>
      {/* Buttons for sorting */}
      <button onClick={handleSortingByUsdPriseIncreasing}>
        sort usd prise Increasing
      </button>
      <button onClick={handleSortingByUsdPriseDecreasing}>
        sort usd prise Decreasing
      </button>
      <button onClick={handleSortByName}>sort by name</button>
      <button onClick={handleSortByPriceChange5MinIncreasing}>
        sort by 24h Increasing
      </button>
      <button onClick={handleSortByPriceChange5MinDecreasing}>
        sort by 24h Decreasing
      </button>
      <button onClick={handleSortByPopularity}>sort by Popularity</button>
    </div>
  );
}
