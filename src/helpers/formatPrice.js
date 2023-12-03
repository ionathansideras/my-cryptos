// function to format the price of a coin
export function formatPrice(price) {
  // if price has more than 1 digit before the decimal point, round it to 3 digits
  if (price.toString().split(".")[0] !== "0") {
    return parseFloat(price).toFixed(3);
  }
  // if price has more that 7 digits after the decimal point, round it to 7 digits
  else if (price.toString().split(".")[1].length > 6) {
    // loops through the digits after the decimal point and returns the index of the first non-zero digit
    let firstNonZeroDigit = price
      .toString()
      .split(".")[1]
      .split("")
      .findIndex((digit) => digit !== "0");
    // if there is a non-zero digit, round the price to 7 digits after the decimal point
    if (firstNonZeroDigit !== -1) {
      if (firstNonZeroDigit >= 5) {
        return parseFloat(price).toFixed(firstNonZeroDigit + 1);
      } else {
        return parseFloat(price).toFixed(3);
      }
    }
  } else {
    return price;
  }
}
