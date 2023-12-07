import RenderManyCharts from "../RenderManyCharts";
import { formatPrice } from "../../helpers/formatPrice";
import star1 from "../../assets/star1.png";
import star2 from "../../assets/star2.png";
import { getFavorites } from "../../helpers/getFavorites";
import { useEffect, useState } from "react";
import { addFavorites } from "../../helpers/addFavorites.js";
// React component for rendering a list of coins
// This component exports the RenderCoins function as the default export
export default function RenderCoins({ limit, coins, searchInput }) {
  // State to store the favorites
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Get favorites from local storage
    getFavorites().then((results) => {
      // Update the favorites state with the results
      setFavorites(results);
      console.log(results);
    });
  }, []);

  function handleAdd(symbol) {
    // Add the symbol to the favorites
    addFavorites(symbol);
    // // Update the favorites state
    // setFavorites([...favorites, symbol]);
  }
  // Function to render the loading section
  const RenderLoading = () => {
    return (
      <div className="loading-container">
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  };

  // Function to render the coin table
  const RenderCoinTable = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>Favorites</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Price usd</th>
            <th>Percent change 15min</th>
            <th>Percent change 5min</th>
            <th>Chart</th>
          </tr>
        </thead>
        <tbody>
          {filterAndMapCoins().map(
            (coin, index) =>
              // Conditional rendering to limit based on the index
              index <= limit && (
                <tr className="coin" key={coin.id}>
                  <td>
                    <img
                      onClick={() => handleAdd(coin.coin_symbol)}
                      src={
                        favorites[index] === coin.coin_symbol ? star2 : star1
                      }
                    ></img>
                  </td>
                  <td>{coin.coin_name}</td>
                  <td>{coin.coin_symbol}</td>
                  <td>{formatPrice(coin.coin_price)}</td>
                  <td>{coin.percent_change_15min}</td>
                  <td>{coin.percent_change_5min}</td>
                  <td>
                    <RenderManyCharts chartData={coin} />
                  </td>
                </tr>
              )
          )}
        </tbody>
      </table>
    );
  };

  // Function to filter and map coins based on the search input
  const filterAndMapCoins = () => {
    return coins.filter(
      (val) =>
        // Display all coins if search input is empty
        searchInput === "" ||
        // Filter coins by name or symbol, case-insensitive
        val.coin_name.toLowerCase().includes(searchInput.toLowerCase()) ||
        val.coin_symbol.toLowerCase().includes(searchInput.toLowerCase())
    );
  };
  // Render the component
  return <div>{!coins ? <RenderLoading /> : <RenderCoinTable />}</div>;
}
