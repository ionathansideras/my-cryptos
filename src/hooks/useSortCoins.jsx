// Custom hook for handling sorting logic for an array of coins
export default function useSortCoins({ coins, setCoins, coinsCopy }) {
  // Function to handle sorting by USD price in increasing order
  const handleSortingByUsdPriseIncreasing = () => {
    // Create a shallow copy of the coins array and sort it based on USD price in increasing order
    const sortedCoins = [...coins].sort((a, b) => {
      return a.price_usd - b.price_usd;
    });
    // Update the state with the sorted array
    setCoins(sortedCoins);
  };

  // Function to handle sorting by USD price in decreasing order
  const handleSortingByUsdPriseDecreasing = () => {
    // Create a shallow copy of the coins array and sort it based on USD price in decreasing order
    const sortedCoins = [...coins].sort((a, b) => {
      return b.price_usd - a.price_usd;
    });
    // Update the state with the sorted array
    setCoins(sortedCoins);
  };

  // Function to handle sorting by name
  const handleSortByName = () => {
    // Create a shallow copy of the coins array and sort it based on the coin names
    const sortedCoins = [...coins].sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
    // Update the state with the sorted array
    setCoins(sortedCoins);
  };

  // Function to handle sorting by 24-hour price change in increasing order
  const handleSortByPriceChange24hIncreasing = () => {
    // Create a shallow copy of the coins array and sort it based on 24-hour price change in increasing order
    const sortedCoins = [...coins].sort((a, b) => {
      return b.percent_change_24h - a.percent_change_24h;
    });
    // Update the state with the sorted array
    setCoins(sortedCoins);
  };

  // Function to handle sorting by 24-hour price change in decreasing order
  const handleSortByPriceChange24hDecreasing = () => {
    // Create a shallow copy of the coins array and sort it based on 24-hour price change in decreasing order
    const sortedCoins = [...coins].sort((a, b) => {
      return a.percent_change_24h - b.percent_change_24h;
    });
    // Update the state with the sorted array
    setCoins(sortedCoins);
  };

  // Function to handle sorting by popularity (resetting to the original order)
  const handleSortByPopularity = () => {
    // Reset the state to the original order (coinsCopy)
    setCoins(coinsCopy);
  };

  // Return an object containing all the sorting functions
  return {
    handleSortingByUsdPriseIncreasing,
    handleSortingByUsdPriseDecreasing,
    handleSortByName,
    handleSortByPriceChange24hIncreasing,
    handleSortByPriceChange24hDecreasing,
    handleSortByPopularity,
  };
}
