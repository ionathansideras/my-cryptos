// Import the React library to define React components
import React from "react";

// Functional component named UpdateLimit
// Receives the 'setLimit' function as a prop
export default function UpdateLimit({ setLimit }) {
  // Event handler function triggered when the "Load More" button is clicked
  const handleLoadMore = () => {
    // Update the limit using the 'setLimit' function and the previous limit value
    setLimit((prevLimit) => prevLimit + 50);
  };

  // Render a button that, when clicked, triggers the 'handleLoadMore' function
  return <button onClick={handleLoadMore}>Load More</button>;
}
