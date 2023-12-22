export function handlePercentChange(percentChange) {
  // Ensure percentChange is a string
  // If percentChange is not a string, convert it to a string using toString()
  if (typeof percentChange !== "string") {
    percentChange = percentChange.toString();
  }

  // Split the percentChange string into an array of characters
  const percentChangeArray = percentChange.split("");

  // If the first character of percentChange is not "-", it means the change is positive
  if (percentChangeArray[0] !== "-") {
    // So, add a "+" at the start of the array
    percentChangeArray.unshift("+");
    // Join the array back into a string and return it
    return percentChangeArray.join("");
  } else {
    // If the first character is "-", the change is negative
    // So, return the percentChange string as is
    return percentChange;
  }
}
