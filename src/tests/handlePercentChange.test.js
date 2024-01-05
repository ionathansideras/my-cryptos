// handlePercentChange.test.js
import { expect, test } from "vitest";
import { handlePercentChange } from "../helpers/handlePercentChange.js";

test("handlePercentChange", () => {
  // Test that the function correctly adds a "+" to the start of a positive number
  expect(handlePercentChange("5")).toBe("+5");

  // Test that the function correctly leaves a "-" at the start of a negative number
  expect(handlePercentChange("-5")).toBe("-5");

  // Test that the function correctly converts a number to a string and adds a "+"
  expect(handlePercentChange(5)).toBe("+5");

  // Test that the function correctly converts a negative number to a string and leaves the "-"
  expect(handlePercentChange(-5)).toBe("-5");
});