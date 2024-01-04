import RenderManyCharts from "../RenderManyCharts";
import { formatPrice } from "../../helpers/formatPrice";
import { getFavorites } from "../../helpers/getFavorites";
import { useEffect } from "react";
import { addFavorites } from "../../helpers/addFavorites.js";
import { auth } from "../../config/firebaseInfo";
import { onAuthStateChanged } from "firebase/auth";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { palette } from "../../data/colorPalette.js";
import RenderLoading from "../RenderLoading.jsx";
import { handlePercentChange } from "../../helpers/handlePercentChange.js";
import { filterAndMapCoins } from "../../helpers/filterAndMapCoins.js";
import { handleSrcStarChange } from "../../helpers/handleSrcStarChange.js";

// React component for rendering a list of coins
// This component exports the RenderCoins function as the default export
export default function RenderCoins({
  limit,
  coins,
  searchInput,
  setFavorites,
  favorites,
}) {
  // Redux state hook for theme
  const theme = useSelector((state) => state.theme.value);

  // Reference to the image element
  const imgSrc = useRef(null);

  // React router hook to navigate to a different page
  const navigate = useNavigate();

  // Function to handle the navigation to the coin page
  function handleNavigation(e, symbol) {
    // If the clicked element is the image, don't navigate
    // This is done by comparing the className of the clicked element with the className of the image
    if (e.target.className === imgSrc.current.className) {
      return;
    }
    // If the clicked element is not the image, navigate to the coin page
    // The symbol of the coin is used to generate the URL
    navigate(`/coin/${symbol}`);
  }

  // Use useEffect to subscribe to the auth state changes when the component mounts
  useEffect(() => {
    // Subscribe to the auth state changes
    // The onAuthStateChanged function returns a function that can be used to unsubscribe
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // If the user is logged in, get the favorites from the database
      if (user) {
        getFavorites().then((result) => {
          // Update the favorites state with the result
          setFavorites(result);
        });
      }
    });
    // Return a cleanup function to unsubscribe from the auth state changes when the component unmounts
    return () => unsubscribe();
  }, []);

  // Use useEffect to add the favorites to the local storage when the favorites state changes
  useEffect(() => {
    // Call the addFavorites function with the favorites state
    // This function adds the favorites to the local storage
    addFavorites(favorites);
  }, [favorites]); // This effect runs whenever the favorites state changes

  // Function to handle adding and removing favorites
  function handleAddRemove(symbol) {
    // Check if the coin is already a favorite
    const isFavorite = favorites.includes(symbol);

    // If the coin is a favorite
    if (isFavorite) {
      // Remove the coin from the favorites array
      // The filter method creates a new array with all elements that pass the test
      // In this case, the test is whether the coin symbol is not equal to the symbol to be removed
      setFavorites(favorites.filter((val) => val !== symbol));
    } else {
      // If the coin is not a favorite
      // Add the coin to the favorites array
      // The spread operator (...) is used to create a new array that includes all existing favorites plus the new symbol
      setFavorites([...favorites, symbol]);
    }
  }

  // Function to render the coin table
  const RenderCoinTable = () => {
    return (
      // Create a table with a dynamic color based on the theme
      <table
        className="coins-table"
        style={{
          color: theme === "dark" ? palette.color4 : "black",
        }}
      >
        <thead className="coins-head-table">
          <tr>
            {/* // Define the table headers */}
            <th>Favorites</th>
            <th className="name-title">Name</th>
            <th>Symbol</th>
            <th>Price usd</th>
            <th>Percent change 15min</th>
            <th>Percent change 5min</th>
            <th className="chart-title">Percent change chart</th>
          </tr>
        </thead>
        <tbody className="coins-body-table">
          {/* // Map over the coins returned by the filterAndMapCoins function */}
          {filterAndMapCoins(coins, searchInput).map(
            (coin, index) =>
              // Render a row for each coin, but only if the index is less than or equal to the limit
              index <= limit && (
                <tr
                  // When a row is clicked, navigate to the coin page
                  onClick={(e) => handleNavigation(e, coin.coin_symbol)}
                  className="coin"
                  key={coin.id}
                  style={{
                    // Set a dynamic border color based on the theme
                    borderBottom:
                      theme === "dark"
                        ? " 1px solid #636363"
                        : "1px solid #d2d2d2",
                  }}
                >
                  <td>
                    {/* // Render an image for the favorite star // When the image
                    is clicked, add or remove the coin from the favorites */}
                    <img
                      onClick={() => handleAddRemove(coin.coin_symbol)}
                      src={handleSrcStarChange(coin.coin_symbol, favorites)}
                      ref={imgSrc}
                      className="favorite-star"
                    ></img>
                  </td>
                  {/* // Render the coin name, symbol, and price */}
                  <td className="name-body">{coin.coin_name}</td>
                  <td>{coin.coin_symbol}</td>
                  <td>${formatPrice(coin.coin_price)}</td>
                  {/* // Render the percent change for 15min and 5min with dynamic
                  color based on the change */}
                  <td
                    style={{
                      color:
                        coin.percent_change_15min > coin.percent_change_5min
                          ? "#39FF14"
                          : "#FF3131",
                    }}
                  >
                    {handlePercentChange(coin.percent_change_15min)}%
                  </td>
                  <td
                    style={{
                      color:
                        coin.percent_change_15min < coin.percent_change_5min
                          ? "#39FF14"
                          : "#FF3131",
                    }}
                  >
                    {handlePercentChange(coin.percent_change_5min)}%
                  </td>
                  {/* // Render the chart for the coin */}
                  <td className="home-charts">
                    <RenderManyCharts chartData={coin} />
                  </td>
                </tr>
              )
          )}
        </tbody>
      </table>
    );
  };

  // Render the component
  return (
    <article className="all-coins">
      {!coins ? <RenderLoading /> : <RenderCoinTable />}
    </article>
  );
}
