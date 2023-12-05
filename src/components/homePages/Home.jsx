// Importing necessary dependencies from React and external modules
import { useEffect, useState } from "react";
import { getCoins } from "../../apis/crypto-api";
import { percentChangeApi } from "../../apis/percentChange-api";
import { auth } from "../../config/firebaseInfo";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import useCheckUserLogedIn from "../../hooks/useCheckUserLogedIn";
import { checkUserVerified } from "../../helpers/checkUserVerified.js";

// Importing components
import MoveToTop from "./MoveToTop";
import RenderCoins from "./RenderCoins";
import UpdateLimit from "./UpdateLimit";
import Filters from "./Filters";
import Search from "./Search";

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

  // useNavigate hook for navigating to different routes
  const navigate = useNavigate();

  // Call the useCheckUser hook to check if the user is logged in or not
  useCheckUserLogedIn();

  useEffect(() => {
    // Check if the user is verified; if not, sign out and navigate to the home page
    if (!checkUserVerified()) {
      signOut(auth);
      navigate("/");
    }

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
      {/* Button to sign out the user */}
      <button onClick={() => signOut(auth)}>Sign Out</button>

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
