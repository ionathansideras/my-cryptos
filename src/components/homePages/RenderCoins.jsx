import RenderManyCharts from "../RenderManyCharts";
import { formatPrice } from "../../helpers/formatPrice";
import star1 from "../../assets/star1.png";
import star2 from "../../assets/star2.png";
import { getFavorites } from "../../helpers/getFavorites";
import { useEffect, useState } from "react";
import { addFavorites } from "../../helpers/addFavorites.js";
import { auth } from "../../config/firebaseInfo";
import { onAuthStateChanged } from "firebase/auth";
import { useRef } from "react";
// React component for rendering a list of coins
// This component exports the RenderCoins function as the default export
export default function RenderCoins({
  limit,
  coins,
  searchInput,
  setFavorites,
  favorites,
}) {
  // Reference to the image element
  const imgSrc = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        getFavorites().then((result) => {
          setFavorites(result);
        });
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Add the symbol to the favorites once the favorites state is updated
    addFavorites(favorites);
  }, [favorites]);

  function handleAddRemove(symbol) {
    if (handleSrc(symbol) === star1) {
      // add symbol to favorites
      setFavorites([...favorites, symbol]);
    } else {
      // remove symbol from favorites
      setFavorites(favorites.filter((val) => val !== symbol));
    }
  }

  // Function to handle the image source
  const handleSrc = (symbol) => {
    // If the symbol is in the favorites, display the filled star
    if (!favorites.includes(symbol)) {
      return star1;
    }
    // If the symbol is not in the favorites, display the empty star
    else {
      return star2;
    }
  };
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
                      onClick={() => handleAddRemove(coin.coin_symbol)}
                      src={handleSrc(coin.coin_symbol)}
                      ref={imgSrc}
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
