// Import the React library to define React components
import React, { useState, useEffect } from "react";
import { filterAndMapCoins } from "../../helpers/filterAndMapCoins.js";
// Import necessary modules from Redux toolkit
import { useSelector } from "react-redux";
import { palette } from "../../data/colorPalette.js";
// Functional component named UpdateLimit
// Receives the 'setLimit' function as a prop
export default function UpdateLimit({ setLimit, limit, coins, searchInput, setLoading }) {
  // Redux state hook for theme
  const { value: theme } = useSelector((state) => state.theme);
  // State variable to control the visibility of the "Load More" button
  const [showLoadMore, setShowLoadMore] = useState(true);

  // Use useEffect to update the visibility of the "Load More" button
  useEffect(() => {
    // Call the filterAndMapCoins function with the current coins and search input
    // If the length of the result is greater than the limit, show the "Load More" button
    if (filterAndMapCoins(coins, searchInput).length > limit) {
      setShowLoadMore(true);
    } else {
      // If the length of the result is not greater than the limit, hide the "Load More" button
      setShowLoadMore(false);
    }
  }, [coins, limit, searchInput]); // This effect runs whenever the coins, limit, or searchInput state changes

  // Event handler function triggered when the "Load More" button is clicked
  const handleLoadMore = () => {
    // Set loading to true for 2 seconds
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
       // Update the limit using the 'setLimit' function and the previous limit value
      setLimit((prevLimit) => prevLimit + 20);
    }, 3000); 

  };

  // Render a button that, when clicked, triggers the 'handleLoadMore' function
  return (
    <button
      className="glow-on-hover"
      style={{
        display: showLoadMore ? "inline-block" : "none",
        background: theme === 'dark' ? palette.color2 : 'rgb(75 141 255)',
      }}
      onClick={handleLoadMore}
    >
      Load more
    </button>
  );
}
