// Function to scroll the window to the top with a smooth behavior
export const moveUp = () => {
  window.scrollTo({
    top: 0, // Scroll to the top of the page
    behavior: "smooth", // Use smooth scrolling behavior
  });
};
