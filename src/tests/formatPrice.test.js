// Import the necessary functions from "vitest" for testing
import { expect, test } from "vitest";

// Import the function to be tested
import { formatPrice } from "../helpers/formatPrice.js";

// Define a test suite for the "formatPrice" function
test("formatPrice", () => {
  // Test that the function correctly formats a number with 7 digits after the decimal point
  expect(formatPrice(0.0000012)).toBe(0.000001);

  // Test that the function correctly formats a number with more than 1 digit before the decimal point
  expect(formatPrice(152.4523)).toBe(152.452);

  // Test that the function correctly formats a number with 3 digits after the decimal point
  expect(formatPrice(0.034000)).toBe(0.034);
});