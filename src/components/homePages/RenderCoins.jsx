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
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { palette } from "../../data/colorPalette.js";
// React component for rendering a list of coins
// This component exports the RenderCoins function as the default export
export default function RenderCoins({
  limit,
  coins,
  searchInput,
  setFavorites,
  favorites,
}) {
  const theme = useSelector((state) => state.theme.value);
  // Reference to the image element
  const imgSrc = useRef(null);

  const navigate = useNavigate();

  // Function to handle the navigation to the coin page
  function handleNavigation(e, symbol) {
    if (e.target.className === imgSrc.current.className) {
      return;
    }
    navigate(`/coin/${symbol}`);
  }

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
      <div
        className="loading-container"
        style={{
          backgroundColor: theme === "dark" ? palette.color2 : palette.color4,
        }}
      >
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  };

  function handlePercentChange(percentChange) {
    // Ensure percentChange is a string
    if (typeof percentChange !== "string") {
      percentChange = percentChange.toString();
    }

    const percentChangeArray = percentChange.split("");
    if (percentChangeArray[0] !== "-") {
      percentChangeArray.unshift("+");
      return percentChangeArray.join("");
    } else {
      return percentChange;
    }
  }

  function handleAddRemove(symbol) {
    const isFavorite = favorites.includes(symbol);

    if (isFavorite) {
      // remove symbol from favorites
      setFavorites(favorites.filter((val) => val !== symbol));
    } else {
      // add symbol to favorites
      setFavorites([...favorites, symbol]);
    }
  }

  // Function to render the coin table
  const RenderCoinTable = () => {
    return (
      <table
        className="coins-table"
        style={{
          color: theme === "dark" ? palette.color4 : "black",
        }}
      >
        <thead className="coins-head-table">
          <tr>
            <th>Favorites</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Price usd</th>
            <th className="percent15-title">Percent change 15min</th>
            <th>Percent change 5min</th>
            <th className="chart-title">Chart</th>
          </tr>
        </thead>
        <tbody className="coins-body-table">
          {filterAndMapCoins().map(
            (coin, index) =>
              // Conditional rendering to limit based on the index
              index <= limit && (
                <tr
                  onClick={(e) => handleNavigation(e, coin.coin_symbol)}
                  className="coin"
                  key={coin.id}
                  style={{
                    borderBottom:
                      theme === "dark"
                        ? " 1px solid #636363"
                        : "1px solid #d2d2d2",
                  }}
                >
                  <td>
                    <img
                      onClick={() => handleAddRemove(coin.coin_symbol)}
                      src={handleSrc(coin.coin_symbol)}
                      ref={imgSrc}
                      className="favorite-star"
                    ></img>
                  </td>
                  <td>{coin.coin_name}</td>
                  <td>{coin.coin_symbol}</td>
                  <td>{formatPrice(coin.coin_price)}$</td>
                  <td
                    className="percent15-body"
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
                        coin.percent_change_5min > coin.percent_change_15min
                          ? "#39FF14"
                          : "#FF3131",
                    }}
                  >
                    {handlePercentChange(coin.percent_change_5min)}%
                  </td>
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
  return (
    <article className="all-coins">
      {!coins ? <RenderLoading /> : <RenderCoinTable />}
    </article>
  );
}
