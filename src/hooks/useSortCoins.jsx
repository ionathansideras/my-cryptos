// Custom hook for handling sorting logic for an array of coins
export default function useSortCoins({
  coins,
  setCoins,
  coinsCopy,
  favorites,
}) {
  // Function to handle sorting by USD price in increasing order
  const handleSortingByUsdPriseIncreasing = () => {
    // Create a shallow copy of the coins array and sort it based on USD price in increasing order
    const sortedCoins = [...coins].sort((a, b) => {
      return a.coin_price - b.coin_price;
    });
    // Update the state with the sorted array
    setCoins(sortedCoins);
  };

  // function to handle sorting by favorites
  const handleSortByFavorites = () => {
    // filters the coins array and returns only the coins that are in the favorites array
    const sortedCoins = [...coins].filter((coin) =>
      favorites.includes(coin.coin_symbol)
    );
    // Update the state with the sorted array
    setCoins(sortedCoins);
  };

  // Function to handle sorting by USD price in decreasing order
  const handleSortingByUsdPriseDecreasing = () => {
    // Create a shallow copy of the coins array and sort it based on USD price in decreasing order
    const sortedCoins = [...coins].sort((a, b) => {
      return b.coin_price - a.coin_price;
    });
    // Update the state with the sorted array
    setCoins(sortedCoins);
  };

  // Function to handle sorting by name
  const handleSortByName = () => {
    // Create a shallow copy of the coins array and sort it based on the coin names
    const sortedCoins = [...coins].sort((a, b) => {
      return a.coin_name.localeCompare(b.coin_name);
    });
    // Update the state with the sorted array
    setCoins(sortedCoins);
  };

  // Function to handle sorting by 24-hour price change in increasing order
  const handleSortByPriceChange5MinIncreasing = () => {
    // Create a shallow copy of the coins array and sort it based on 24-hour price change in increasing order
    const sortedCoins = [...coins].sort((a, b) => {
      return b.percent_change_5min - a.percent_change_5min;
    });
    // Update the state with the sorted array
    setCoins(sortedCoins);
  };

  // Function to handle sorting by 24-hour price change in decreasing order
  const handleSortByPriceChange5MinDecreasing = () => {
    // Create a shallow copy of the coins array and sort it based on 24-hour price change in decreasing order
    const sortedCoins = [...coins].sort((a, b) => {
      return a.percent_change_5min - b.percent_change_5min;
    });
    // Update the state with the sorted array
    setCoins(sortedCoins);
  };

  // Function to handle sorting by removeFilters (resetting to the original order)
  const removeFilters = () => {
    // Reset the state to the original order (coinsCopy)
    setCoins(coinsCopy);
  };

  // Return an object containing all the sorting functions
  return {
    handleSortingByUsdPriseIncreasing,
    handleSortingByUsdPriseDecreasing,
    handleSortByName,
    handleSortByPriceChange5MinDecreasing,
    handleSortByPriceChange5MinIncreasing,
    removeFilters,
    handleSortByFavorites,
  };
}
