// CryptoDetail.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { coinDetailsApi } from "../../apis/coinDetails-api.js";
import { useEffect, useState } from "react";
import useCheckUserLogedIn from "../../hooks/useCheckUserLogedIn";

export default function CoinDetail() {
  const { symbol } = useParams();

  const [coinDetails, setCoinDetails] = useState({});

  // Call the useCheckUser hook to check if the user is logged in or not
  useCheckUserLogedIn();

  useEffect(() => {
    coinDetailsApi(symbol).then((result) => {
      setCoinDetails(result);
    });
  }, []);

  useEffect(() => {
    console.log(coinDetails);
  }, [coinDetails]);

  // Fetch more information about the crypto using the symbol

  return (
    <div>
      <h1>Coin Detail: {symbol}</h1>
    </div>
  );
}
