// handleSrcStarChange.test.js
import { expect, test } from "vitest";
import { handleSrcStarChange } from "../helpers/handleSrcStarChange.js";
import star1 from "../assets/star1.png";
import star2 from "../assets/star2.png";

test("handleSrcStarChange", () => {
  // Test that the function correctly returns star1 when the symbol is not in favorites
  expect(handleSrcStarChange("BTC", ["ETH", "LTC"])).toBe(star1);

  // Test that the function correctly returns star2 when the symbol is in favorites
  expect(handleSrcStarChange("BTC", ["BTC", "ETH", "LTC"])).toBe(star2);
});