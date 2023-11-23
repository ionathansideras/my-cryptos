import { useEffect, useState } from "react";
import { getCoins } from "../apis/crypto-api";
import { percentChangeApi } from "../apis/percentChange-api";
import MoveToTop from "./MoveToTop";
import RenderCoins from "./RenderCoins";
import UpdateLimit from "./UpdateLimit";
import Filters from "./Filters";
import Search from "./Search";

export default function Home() {
  // State for the main list of coins
  const [coins, setCoins] = useState("");

  // State to store a copy of the original list of coins
  const [coinsCopy, setCoinsCopy] = useState();

  // State for the search input
  const [searchInput, setSearchInput] = useState("");

  // state to declare the limit of coins to be displayed
  const [limit, setLimit] = useState(20);

  useEffect(() => {
    // Fetch coins data from the API on component mount
    getCoins().then((resultCoins) => {
      percentChangeApi().then((resultPercent) => {
        // Create a new array with modified objects
        const updatedTest = resultPercent.map((coin, index) => ({
          ...coin,
          coin_price: resultCoins[index].coin_price,
        }));
        // Update the test state with the new array
        setCoins(updatedTest);
        setCoinsCopy(updatedTest);
      });
    });
  }, []);

  return (
    <div>
      {/* Component to search for a coin */}
      <Search searchInput={searchInput} setSearchInput={setSearchInput} />
      {/* Component to filter the coins based on the current state */}
      <Filters coins={coins} setCoins={setCoins} coinsCopy={coinsCopy} />
      {/* Component to render the coins based on the current state */}
      <RenderCoins limit={limit} coins={coins} searchInput={searchInput} />
      {/* Component to update the limit */}
      <UpdateLimit setLimit={setLimit} />
      {/* Component to move to the top */}
      <MoveToTop />
    </div>
  );
}
