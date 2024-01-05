// Function to format the price of a coin
export function formatPrice(price) {
  // If the price has more than 1 digit before the decimal point, round it to 3 digits
  if (price.toString().split(".")[0] !== "0") {
    return parseFloat(parseFloat(price).toFixed(3));
  }
  // If the price has more than 7 digits after the decimal point, round it to 7 digits
  else if (price.toString().split(".")[1].length > 6) {
    // Loop through the digits after the decimal point and return the index of the first non-zero digit
    let firstNonZeroDigit = price
      .toString()
      .split(".")[1]
      .split("")
      .findIndex((digit) => digit !== "0");

    // If there is a non-zero digit, round the price to 7 digits after the decimal point
    if (firstNonZeroDigit !== -1) {
      if (firstNonZeroDigit >= 5) {
        // If the first non-zero digit is greater than or equal to 5, round to that digit
        return parseFloat(parseFloat(price).toFixed(firstNonZeroDigit + 1));
      } else {
        // If the first non-zero digit is less than 5, round to 3 digits
        return parseFloat(parseFloat(price).toFixed(3));
      }
    }
  } else {
    // If the price doesn't meet the conditions for rounding, return the original price
    return price;
  }
}