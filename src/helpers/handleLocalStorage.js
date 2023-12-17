// Function to retrieve the theme color from local storage
export function getThemeColor() {
  // Returns the value of the item in local storage with the key "theme"
  return localStorage.getItem("theme");
}

// Function to set the theme color in local storage
export function setThemeColor(theme) {
  // Sets the value of the item in local storage with the key "theme" to the provided theme
  return localStorage.setItem("theme", theme);
}
