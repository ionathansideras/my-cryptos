// CryptoDetail.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { coinDetailsApi } from "../../apis/coinDetails-api.js";
import { useEffect, useState } from "react";
import useCheckUserLogedIn from "../../hooks/useCheckUserLogedIn";
import RenderManyCharts from "../RenderManyCharts";
import { coinThumbApi } from "../../apis/coin-thumb-api.js";
import { addFavorites } from "../../helpers/addFavorites.js";
import { handleSrcStarChange } from "../../helpers/handleSrcStarChange.js";
import { getFavorites } from "../../helpers/getFavorites.js";
import RenderLoading from "../RenderLoading.jsx";

// Import necessary modules from Redux toolkit
import { useSelector } from "react-redux";

import { palette } from "../../data/colorPalette.js";

export default function CoinDetail() {
  const { symbol } = useParams();

  const [coinThumb, setCoinThumb] = useState();

  const [coinDetails, setCoinDetails] = useState("");

  // Redux state hook for theme
  const { value: theme } = useSelector((state) => state.theme);

  const [favorites, setFavorites] = useState([]);

  // Call the useCheckUser hook to check if the user is logged in or not
  useCheckUserLogedIn();

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

  // Use useEffect to add the favorites to the local storage when the favorites state changes
  useEffect(() => {
    // Call the addFavorites function with the favorites state
    // This function adds the favorites to the local storage
    addFavorites(favorites);
  }, [favorites]); // This effect runs whenever the favorites state changes

  useEffect(() => {
    coinDetailsApi(symbol).then((result) => {
      setCoinDetails(result);
    });

    coinThumbApi(symbol).then((result) => {
      setCoinThumb(result[0].large);
    });

    getFavorites().then((result) => {
      // Update the favorites state with the result
      setFavorites(result);
    });
  }, []);

  return !coinDetails ? (
    <RenderLoading />
  ) : (
    <main
      className="coin-detail-main"
      style={{
        backgroundColor: theme === "dark" ? palette.color2 : palette.color5,
      }}
    >
      <div
        className="crypto-info"
        style={{ color: theme === "dark" ? palette.color4 : "black" }}
      >
        <div className="crypto-info-head">
          <img src={coinThumb} alt="coin thumb" />
          <h1>{coinDetails.coin_name}</h1>
          <h2>{coinDetails.coin_symbol}</h2>
          <img
            className="info-set-favorites"
            src={handleSrcStarChange(coinDetails.coin_symbol, favorites)}
            alt="favorites"
            onClick={() => handleAddRemove(coinDetails.coin_symbol)}
          />
        </div>

        <div className="crypto-info-content">
          <div className="info-container">
            <h3>Price:</h3>
            <p>${coinDetails.coin_price}</p>
          </div>
          <div className="info-container">
            <h3>Rank:</h3>
            <p>{coinDetails.rank}</p>
          </div>
          <div className="info-container">
            <h3>Market Cap:</h3>
            <p>${coinDetails.marketcap}</p>
          </div>
          <div className="info-container">
            <h3>Market Cap BTC:</h3>
            <p>{coinDetails.coin_price_btc}</p>
          </div>
        </div>
      </div>

      <div className="detail-chart">
        <RenderManyCharts coinDetails={coinDetails} />
      </div>
    </main>
  );
}
