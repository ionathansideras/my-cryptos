// CryptoDetail.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { coinDetailsApi } from "../../apis/coinDetails-api.js";
import { useEffect, useState } from "react";
import useCheckUserLogedIn from "../../hooks/useCheckUserLogedIn";
import RenderManyCharts from "../RenderManyCharts";

// Import necessary modules from Redux toolkit
import { useSelector } from "react-redux";

import { palette } from "../../data/colorPalette.js";

export default function CoinDetail() {
  const { symbol } = useParams();

  const [coinDetails, setCoinDetails] = useState({});

  // Redux state hook for theme
  const { value: theme } = useSelector((state) => state.theme);

  // Call the useCheckUser hook to check if the user is logged in or not
  useCheckUserLogedIn();

  useEffect(() => {
    coinDetailsApi(symbol).then((result) => {
      setCoinDetails(result);
    });
  }, []);

  return (
    <main
      className="coin-detail-main"
      style={{
        backgroundColor: theme === "dark" ? palette.color3 : palette.color4,
      }}
    >
      <h1>Coin Detail: {symbol}</h1>
      <div className="detail-chart">
        <RenderManyCharts coinDetails={coinDetails} />
      </div>
    </main>
  );
}
