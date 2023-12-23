// Importing necessary dependencies from React and external modules
import { useEffect, useState } from "react";
import { getCoins } from "../../apis/crypto-api";
import { percentChangeApi } from "../../apis/percentChange-api";
import useCheckUserLogedIn from "../../hooks/useCheckUserLogedIn";
import filterImg from "../../assets/filter.png";
import searchImg from "../../assets/search.svg";

// Importing components
import MoveToTop from "./MoveToTop";
import RenderCoins from "./RenderCoins";
import UpdateLimit from "./UpdateLimit";
import Filters from "./Filters";
import Search from "./Search";

// Import necessary modules from Redux toolkit
import { useSelector } from "react-redux";

import { palette } from "../../data/colorPalette.js";

// Main functional component for the Home page
export default function Home() {
  // State for the main list of coins
  const [coins, setCoins] = useState("");

  // State to store a copy of the original list of coins
  const [coinsCopy, setCoinsCopy] = useState();

  // State for the search input
  const [searchInput, setSearchInput] = useState("");

  // State to declare the limit of coins to be displayed
  const [limit, setLimit] = useState(20);

  // State to store the favorites
  const [favorites, setFavorites] = useState([]);

  // Redux state hook for theme
  const { value: theme } = useSelector((state) => state.theme);

  const [showFilters, setShowFilters] = useState(false);

  const [loading, setLoading] = useState(false);

  // Call the useCheckUser hook to check if the user is logged in or not
  useCheckUserLogedIn();

  useEffect(() => {
    // Fetch coins data from the API on component mount
    getCoins().then((resultCoins) => {
      percentChangeApi().then((resultPercent) => {
        // Create a new array with modified objects
        const updatedTest = resultPercent.map((coin, index) => ({
          ...coin,
          coin_price: resultCoins[index].coin_price,
        }));
        // Update the coins state with the new array
        setCoins(updatedTest);
        // Also update the coinsCopy state with the new array
        setCoinsCopy(updatedTest);
      });
    });
  }, []);

  return (
    <main
      className="home-main"
      style={{
        backgroundColor: theme === "dark" ? palette.color3 : palette.color5,
      }}
    >
      <div className="search-filters">
        <div className="search-container">
          {/* Component to search for a coin */}
          <div className="search-block">
            <img src={searchImg} alt="search"></img>
            <Search searchInput={searchInput} setSearchInput={setSearchInput} />
          </div>
          <button onClick={() => setShowFilters((val) => !val)}>
            <img src={filterImg} alt="filter" />
            Filters
          </button>
        </div>
        {/* Component to filter the coins based on the current state */}
        <Filters
          coins={coins}
          setCoins={setCoins}
          coinsCopy={coinsCopy}
          favorites={favorites}
          showFilters={showFilters}
        />
      </div>
      {/* Component to render the coins based on the current state */}
      <RenderCoins
        limit={limit}
        coins={coins}
        searchInput={searchInput}
        favorites={favorites}
        setFavorites={setFavorites}
      />

      <footer className="home-footer">
        <div
          style={{ display: loading ? "inline-block" : "none" }}
          className="lds-ellipsis"
        >
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="home-footer-buttons">
          {/* Component to update the limit */}
          <UpdateLimit
            setLimit={setLimit}
            limit={limit}
            coins={coins}
            searchInput={searchInput}
            setLoading={setLoading}
          />
          {/* Component to move to the top */}
          <MoveToTop />
        </div>
      </footer>
    </main>
  );
}
