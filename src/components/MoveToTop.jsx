// Functional component named MoveToTop
// This component exports the MoveToTop function as the default export
export default function MoveToTop() {
  // Function to scroll the window to the top with a smooth behavior
  const moveUp = () => {
    window.scrollTo({
      top: 0, // Scroll to the top of the page
      behavior: "smooth", // Use smooth scrolling behavior
    });
  };

  // Render a button labeled "Move Up"
  // When the button is clicked, it triggers the 'moveUp' function
  return <button onClick={moveUp}>Move Up</button>;
}
