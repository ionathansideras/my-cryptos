import axios from "axios";

async function cryptoApi(start) {
  const response = await axios.get(
    `https://api.coinlore.net/api/tickers/?start=${start}&limit=100`
  );
  return response.data.data;
}

// gets the first 200 coins from the api
export async function getCoins() {
  const first100 = await cryptoApi(0);
  const second100 = await cryptoApi(101);
  // and sets the state to with the first 200 coins
  return [...first100, ...second100];
}
