// filterAndMapCoins.test.js
import { expect, test } from "vitest";
import { filterAndMapCoins } from "../helpers/filterAndMapCoins.js";

test("filterAndMapCoins", () => {
  const coins = [
    { coin_name: "Bitcoin", coin_symbol: "BTC" },
    { coin_name: "Ethereum", coin_symbol: "ETH" },
    { coin_name: "Litecoin", coin_symbol: "LTC" },
  ];

  // Test that the function correctly returns all coins when the search input is empty
  expect(filterAndMapCoins(coins, "")).toEqual(coins);

  // Test that the function correctly filters coins by name
  expect(filterAndMapCoins(coins, "BIT")).toEqual([{ coin_name: "Bitcoin", coin_symbol: "BTC" }]);

  // Test that the function correctly filters coins by name
  expect(filterAndMapCoins(coins, "Bitcoin")).toEqual([{ coin_name: "Bitcoin", coin_symbol: "BTC" }]);

  // Test that the function correctly filters coins by symbol
  expect(filterAndMapCoins(coins, "ETH")).toEqual([{ coin_name: "Ethereum", coin_symbol: "ETH" }]);

  // Test that the function correctly returns an empty array when no coins match the search input
  expect(filterAndMapCoins(coins, "NonexistentCoin")).toEqual([]);
});