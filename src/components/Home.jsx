import { useEffect, useState } from "react";
import { getCoins } from "../apis/crypto-api";
import MoveToTop from "./MoveToTop";
import RenderCoins from "./RenderCoins";
import useSortCoins from "../hooks/useSortCoins";
import UpdateLimit from "./UpdateLimit";

export default function Home() {
  // State for the main list of coins
  const [coins, setCoins] = useState("");

  // State to store a copy of the original list of coins
  const [coinsCopy, setCoinsCopy] = useState();

  // State for the search input
  const [searchInput, setSearchInput] = useState("");

  // state to declare the limit of coins to be displayed
  const [limit, setLimit] = useState(50);

  // Destructuring the sorting functions from the custom hook
  const {
    handleSortingByUsdPriseIncreasing,
    handleSortingByUsdPriseDecreasing,
    handleSortByName,
    handleSortByPriceChange24hIncreasing,
    handleSortByPriceChange24hDecreasing,
    handleSortByPopularity,
  } = useSortCoins({ coins, setCoins, coinsCopy });

  useEffect(() => {
    // Fetch coins data from the API on component mount
    getCoins().then((result) => {
      // Set the main coins state
      setCoins(result);
      // Set the copy of coins for later use (resetting to original order)
      setCoinsCopy(result);
    });
  }, []);

  return (
    <div>
      {/* Input for searching */}
      <input
        className="inputSearch"
        placeholder="Search for a coin..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        type="text"
      />
      {/* Buttons for sorting */}
      <button onClick={handleSortingByUsdPriseIncreasing}>
        sort usd prise Increasing
      </button>
      <button onClick={handleSortingByUsdPriseDecreasing}>
        sort usd prise Decreasing
      </button>
      <button onClick={handleSortByName}>sort by name</button>
      <button onClick={handleSortByPriceChange24hIncreasing}>
        sort by 24h Increasing
      </button>
      <button onClick={handleSortByPriceChange24hDecreasing}>
        sort by 24h Decreasing
      </button>
      <button onClick={handleSortByPopularity}>sort by Popularity</button>
      {/* Component to render the coins based on the current state */}
      <RenderCoins limit={limit} coins={coins} searchInput={searchInput} />
      {/* Component to update the limit */}
      <UpdateLimit setLimit={setLimit} />
      {/* Component to move to the top */}
      <MoveToTop />
    </div>
  );
}
