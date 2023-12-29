// CryptoDetail.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { coinDetailsApi } from "../../apis/coinDetails-api.js";
import { useEffect, useState } from "react";
import useCheckUserLogedIn from "../../hooks/useCheckUserLogedIn";
import RenderManyCharts from "../RenderManyCharts";
import {coinThumbApi} from "../../apis/coin-thumb-api.js";

// Import necessary modules from Redux toolkit
import { useSelector } from "react-redux";

import { palette } from "../../data/colorPalette.js";

export default function CoinDetail() {
  const { symbol } = useParams();

  const [coinThumb, setCoinThumb] = useState();

  const [coinDetails, setCoinDetails] = useState({});

  // Redux state hook for theme
  const { value: theme } = useSelector((state) => state.theme);

  // Call the useCheckUser hook to check if the user is logged in or not
  useCheckUserLogedIn();

  useEffect(() => {
    console.log('on')
    coinDetailsApi(symbol).then((result) => {
      console.log(result);
      setCoinDetails(result);
    });

    coinThumbApi(symbol).then((result) => {
      console.log(result[0]);
      setCoinThumb(result[0].large);
    });
  }, []);

  return (
    <main
      className="coin-detail-main"
      style={{
        backgroundColor: theme === "dark" ? palette.color2 : palette.color4,
      }}
    >
      
      <img src={coinThumb} alt="coin thumb" />
      <h1>Coin Detail: {symbol}</h1>
      <div className="detail-chart">
        <RenderManyCharts coinDetails={coinDetails} />
      </div>
    </main>
  );
}
