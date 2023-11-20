import { useEffect, useState } from "react";
import { getCoins } from "../apis/crypto-api";
import { percentChangeApi } from "../apis/percentChange-api";
import MoveToTop from "./MoveToTop";
import RenderCoins from "./RenderCoins";
import UpdateLimit from "./UpdateLimit";
import Filters from "./Filters";
import Search from "./Search";
import RenderManyCharts from "./RenderManyCharts";

export default function Home() {
  // State for the main list of coins
  const [coins, setCoins] = useState("");

  // State to store a copy of the original list of coins
  const [coinsCopy, setCoinsCopy] = useState();

  // State for the search input
  const [searchInput, setSearchInput] = useState("");

  // state to declare the limit of coins to be displayed
  const [limit, setLimit] = useState(50);

  // state to store the data for the chart
  const [chartData, setChartData] = useState("");

  useEffect(() => {
    // Fetch coins data from the API on component mount
    getCoins().then((result) => {
      // Set the main coins state
      setCoins(result);
      // Set the copy of coins for later use (resetting to original order)
      setCoinsCopy(result);
    });
    // Fetch chart data from the API on component mount
    percentChangeApi().then((result) => {
      setChartData(result);
    });
  }, []);

  return (
    <div>
      {/* Component to search for a coin */}
      <Search searchInput={searchInput} setSearchInput={setSearchInput} />
      {/* Component to render the chart */}
      <RenderManyCharts chartData={chartData} />
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
