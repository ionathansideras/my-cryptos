// validation.test.js
import { expect, test } from "vitest";
import { validation } from "../helpers/validation.js";

test("validation", () => {
  // Test that the function correctly returns the error message for "auth/invalid-email"
  expect(validation({ code: "auth/invalid-email" })).toBe("Invalid email address. Please check your email and try again.");

  // Test that the function correctly returns the error message for "auth/id-token-expired"
  expect(validation({ code: "auth/id-token-expired" })).toBe("Your login session has expired. Please log in again.");

  // Test that the function correctly returns the error message for "auth/weak-password"
  expect(validation({ code: "auth/weak-password" })).toBe("Password is too weak. It must be more than 6 characters.");

  // Test that the function correctly returns the default error message for an unknown error code
  expect(validation({ code: "unknown-error-code" })).toBe("Oops! Something went wrong. Please try again.");
});